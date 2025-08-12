import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card } from 'react-native-paper';
import Drawer from '../../components/drawer';
import DCRService, { DCRDetails } from '../../services/dcrService';
import PDFService from '../../services/pdfService';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export default function DCRDetailsPage(): JSX.Element {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);
  const [isSharing, setIsSharing] = useState<boolean>(false);

  // Backend data states
  const [dcrDetails, setDcrDetails] = useState<DCRDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dcrId = params.dcrId as string;

  // Load DCR details from backend
  const loadDCRDetails = async () => {
    try {
      setError(null);
      const details = await DCRService.getDCRDetails(dcrId);
      setDcrDetails(details);
    } catch (error: any) {
      console.error('Error loading DCR details:', error);
      setError(error.message || 'Failed to load DCR details');
      Alert.alert('Error', 'Failed to load DCR details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load details on component mount
  useEffect(() => {
    if (dcrId) {
      loadDCRDetails();
    } else {
      setError('DCR ID not provided');
      setLoading(false);
    }
  }, [dcrId]);

  // Get the appropriate label based on task type
  const getCustomerLabel = (taskType?: string) => {
    switch (taskType) {
      case 'DOCTOR_TASK':
        return 'Doctor';
      case 'CHEMIST_TASK':
        return 'Chemist';
      case 'TOUR_PLAN_TASK':
        return 'Tour';
      default:
        return 'Customer';
    }
  };

  // Get customer name and address from task details
  const getCustomerInfo = (taskType?: string, taskDetails?: any) => {
    if (!taskDetails) {
      return { name: 'Unknown', address: 'Address not available' };
    }

    switch (taskType) {
      case 'DOCTOR_TASK':
        const hospital = taskDetails.doctor?.hospitalAssociations?.[0]?.hospital;
        return {
          name: taskDetails.doctor?.name || 'Unknown Doctor',
          address: hospital
            ? `${hospital.name}, ${hospital.address}, ${hospital.city || ''}, ${hospital.state || ''}`.replace(/, ,/g, ',').replace(/,$/, '')
            : 'Hospital address not available'
        };

      case 'CHEMIST_TASK':
        return {
          name: taskDetails.chemist?.name || 'Unknown Chemist',
          address: taskDetails.chemist
            ? `${taskDetails.chemist.address || ''}, ${taskDetails.chemist.city || ''}, ${taskDetails.chemist.state || ''}`.replace(/^, |, ,|,$/, '').replace(/^,/, '') || 'Address not available'
            : 'Chemist address not available'
        };

      case 'TOUR_PLAN_TASK':
        return {
          name: taskDetails.tourPlan?.name || 'Tour Plan',
          address: taskDetails.location || 'Location not specified'
        };

      default:
        return { name: 'Unknown', address: 'Address not available' };
    }
  };

  // Get task timings from task details - FIXED
  const getTaskTimings = (taskType?: string, taskDetails?: any) => {
    if (!taskDetails) {
      return 'Not specified';
    }

    const formatTime = (timeStr: string) => {
      try {
        // Handle different time formats
        let timeToFormat = timeStr;

        // If it's an ISO string, extract just the time part
        if (timeStr.includes('T')) {
          timeToFormat = timeStr.split('T')[1].substring(0, 5);
        }

        const [hours, minutes] = timeToFormat.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes} ${ampm}`;
      } catch (error) {
        console.warn('Error formatting time:', timeStr, error);
        return timeStr; // Return original if formatting fails
      }
    };

    try {
      // The task details now include startTime and endTime directly
      if (taskDetails.startTime && taskDetails.endTime) {
        const startTime = formatTime(taskDetails.startTime);
        const endTime = formatTime(taskDetails.endTime);
        return `${startTime} - ${endTime}`;
      }
    } catch (error) {
      console.warn('Error formatting task timings:', error);
    }

    return 'Time not available';
  };

  const handleMenuPress = (): void => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = (): void => {
    setIsDrawerOpen(false);
  };

  const handleBackPress = (): void => {
    router.push('/(tabs)/dcr'); // Navigate back to DCR list
  };

  const handleSharePress = async (): void => {
    if (!dcrDetails || isSharing) return;

    try {
      setIsSharing(true);

      const customerInfo = getCustomerInfo(dcrDetails.taskType, dcrDetails.taskDetails);
      const taskTimings = getTaskTimings(dcrDetails.taskType, dcrDetails.taskDetails);
      const customerLabel = getCustomerLabel(dcrDetails.taskType);

      // Generate and share PDF
      await PDFService.generateAndShareDcrPDF({
        dcrDetails,
        customerInfo,
        taskTimings,
        customerLabel
      });

      console.log('DCR PDF shared successfully');
    } catch (error: any) {
      console.error('Error sharing DCR:', error);
      Alert.alert(
        'Share Failed',
        error.message || 'Failed to generate or share the DCR PDF. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSharing(false);
    }
  };

  const handleCustomerPress = (): void => {
    if (dcrDetails) {
      const customerInfo = getCustomerInfo(dcrDetails.taskType, dcrDetails.taskDetails);
      Alert.alert(`${getCustomerLabel(dcrDetails.taskType)} Details`, `Opening details for ${customerInfo.name}`);
    }
  };

  const handleEdit = (): void => {
    setShowOptionsMenu(false);
    if (dcrDetails) {
      const customerInfo = getCustomerInfo(dcrDetails.taskType, dcrDetails.taskDetails);
      const taskTimings = getTaskTimings(dcrDetails.taskType, dcrDetails.taskDetails);

      // Navigate to create DCR page with edit mode and all necessary data
      router.push({
        pathname: '/createDcr',
        params: {
          editMode: 'true',
          dcrId: dcrDetails.dcrId,
          taskId: dcrDetails.taskId || '',
          taskType: dcrDetails.taskType || '',
          customerName: customerInfo.name,
          customerAddress: customerInfo.address,
          taskDate: dcrDetails.reportDate,
          taskTimings: taskTimings,
          productsPromoted: dcrDetails.productsDiscussed || '',
          comments: dcrDetails.comments || ''
        }
      });
    }
  };

  const handleDelete = (): void => {
    setShowOptionsMenu(false);

    Alert.alert(
      'Delete DCR',
      'Are you sure you want to delete this DCR report? This action will permanently remove the report and cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              if (dcrDetails) {
                await DCRService.deleteDCR(dcrDetails.dcrId);
                Alert.alert('Success', 'DCR deleted successfully', [
                  {
                    text: 'OK',
                    onPress: () => router.push('/(tabs)/dcr')
                  }
                ]);
              }
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete DCR. Please try again.');
            }
          }
        }
      ]
    );
  };

  const getDisplayStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Completed';
      case 'draft':
        return 'Draft';
      default:
        return 'Draft';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-600';
      case 'draft': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100';
      case 'draft': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  // Loading state
  if (loading) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

        {/* Title Bar */}
        <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
          <StyledView className="flex-row items-center gap-3">
            <StyledTouchableOpacity
              className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
              onPress={handleBackPress}
            >
              <Ionicons name="arrow-back" size={18} color="#6C757D" />
            </StyledTouchableOpacity>

            <StyledText className="text-xl font-semibold text-gray-900">
              DCR Details
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Loading Indicator */}
        <StyledView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0077B6" />
          <StyledText className="text-gray-600 mt-4">Loading DCR details...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }

  // Error state
  if (error || !dcrDetails) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

        {/* Title Bar */}
        <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
          <StyledView className="flex-row items-center gap-3">
            <StyledTouchableOpacity
              className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
              onPress={handleBackPress}
            >
              <Ionicons name="arrow-back" size={18} color="#6C757D" />
            </StyledTouchableOpacity>

            <StyledText className="text-xl font-semibold text-gray-900">
              DCR Details
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Error State */}
        <StyledView className="flex-1 justify-center items-center px-5">
          <StyledText className="text-5xl mb-4">⚠️</StyledText>
          <StyledText className="text-lg font-semibold text-gray-900 mb-2 text-center">
            Error Loading DCR Details
          </StyledText>
          <StyledText className="text-sm text-gray-600 text-center mb-4">
            {error || 'DCR details not found'}
          </StyledText>
          <StyledTouchableOpacity
            className="bg-[#0077B6] px-6 py-3 rounded-lg"
            onPress={loadDCRDetails}
          >
            <StyledText className="text-white font-semibold">
              Try Again
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledSafeAreaView>
    );
  }

  const customerInfo = getCustomerInfo(dcrDetails.taskType, dcrDetails.taskDetails);
  const displayStatus = getDisplayStatus(dcrDetails.status);
  const taskTimings = getTaskTimings(dcrDetails.taskType, dcrDetails.taskDetails);

  return (
    <StyledSafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

      {/* Title Bar */}
      <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200 z-50">
        <StyledView className="flex-row items-center gap-3">
          <StyledTouchableOpacity
            className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
            onPress={handleBackPress}
          >
            <Ionicons name="arrow-back" size={18} color="#6C757D" />
          </StyledTouchableOpacity>

          <StyledText className="text-xl font-semibold text-gray-900">
            DCR Details
          </StyledText>
        </StyledView>

        {/* Conditional Options Menu */}
        <StyledView className="flex-row gap-2">
          {/* Share button with loading state */}
          <StyledTouchableOpacity
            className={`w-9 h-9 rounded-lg ${isSharing ? 'bg-blue-100' : 'bg-gray-100'} items-center justify-center`}
            onPress={handleSharePress}
            disabled={isSharing}
          >
            {isSharing ? (
              <ActivityIndicator size="small" color="#0077B6" />
            ) : (
              <Ionicons name="share-outline" size={18} color="#6C757D" />
            )}
          </StyledTouchableOpacity>

          {/* Ellipsis button and dropdown only for Draft status */}
          {displayStatus === 'Draft' ? (
            <StyledView className="relative">
              <StyledTouchableOpacity
                className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                onPress={() => setShowOptionsMenu(!showOptionsMenu)}
              >
                <Ionicons name="ellipsis-vertical" size={18} color="#6C757D" />
              </StyledTouchableOpacity>
              {showOptionsMenu && (
                <>
                  <StyledTouchableOpacity
                    className="absolute -top-24 -left-96 w-screen h-screen z-40"
                    onPress={() => setShowOptionsMenu(false)}
                    activeOpacity={1}
                  />
                  <StyledView
                    className="absolute top-10 right-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[150px] z-[9999]"
                    style={{ elevation: 10 }}
                  >
                    <StyledTouchableOpacity
                      className="flex-row items-center px-4 py-3 border-b border-gray-100"
                      onPress={handleEdit}
                    >
                      <Ionicons name="create-outline" size={18} color="#0077B6" />
                      <StyledText className="ml-3 text-sm text-gray-900">Edit</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                      className="flex-row items-center px-4 py-3"
                      onPress={handleDelete}
                    >
                      <Ionicons name="trash-outline" size={18} color="#DC3545" />
                      <StyledText className="ml-3 text-sm text-red-600">Delete DCR</StyledText>
                    </StyledTouchableOpacity>
                  </StyledView>
                </>
              )}
            </StyledView>
          ) : null}
        </StyledView>
      </StyledView>

      {/* Scrollable Content */}
      <StyledScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* DCR ID Section */}
        <StyledView className="bg-white px-5 py-6 border-b border-gray-200">
          <StyledView className="items-center">
            <StyledText className="text-2xl font-bold text-[#0077B6] mb-1">
              {dcrDetails.dcrId}
            </StyledText>
            <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              DCR ID
            </StyledText>
          </StyledView>
        </StyledView>

        {/* DCR Details Section */}
        <StyledView className="bg-white px-5 py-6 mb-5">
          <StyledView className="space-y-4">
            <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
              <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">
                {getCustomerLabel(dcrDetails.taskType)}
              </StyledText>
              <StyledTouchableOpacity className="flex-1 ml-4" onPress={handleCustomerPress}>
                <StyledText className="text-base font-semibold text-[#0077B6] text-right underline" numberOfLines={1} ellipsizeMode="tail">
                  {customerInfo.name}
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>

            <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
              <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Created By</StyledText>
              <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={1} ellipsizeMode="tail">
                {dcrDetails.createdBy.name}
              </StyledText>
            </StyledView>

            <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
              <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Task Date & Time</StyledText>
              <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={2} ellipsizeMode="tail">
                {dcrDetails.reportDate} • {taskTimings}
              </StyledText>
            </StyledView>

            <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
              <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Location</StyledText>
              <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={2} ellipsizeMode="tail">
                {customerInfo.address}
              </StyledText>
            </StyledView>

            <StyledView className="flex-row justify-between items-center py-4">
              <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Status</StyledText>
              <StyledView className={`px-3 py-1 rounded-full ${getStatusBgColor(displayStatus)}`}>
                <StyledText className={`text-sm font-semibold ${getStatusColor(displayStatus)}`}>
                  {displayStatus}
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Activity Details Section */}
        <StyledView className="mx-5 mb-5">
          <Card style={{ backgroundColor: '#ffffff' }}>
            <Card.Content style={{ padding: 20 }}>
              <StyledText className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Activity Details
              </StyledText>

              {/* Products Promoted */}
              <StyledView className="mb-5">
                <StyledText className="text-sm text-gray-600 font-medium mb-2 uppercase">
                  Products Promoted
                </StyledText>
                <StyledView className="bg-gray-50 p-3 rounded-lg border-l-4 border-[#0077B6]">
                  <StyledText className="text-sm text-gray-900 leading-6">
                    {dcrDetails.productsDiscussed || 'No products discussed recorded.'}
                  </StyledText>
                </StyledView>
              </StyledView>

              {/* Comments & Observations */}
              <StyledView>
                <StyledText className="text-sm text-gray-600 font-medium mb-2 uppercase">
                  Comments & Observations
                </StyledText>
                <StyledView className="bg-gray-50 p-3 rounded-lg border-l-4 border-[#0077B6]">
                  <StyledText className="text-sm text-gray-900 leading-6">
                    {dcrDetails.comments || 'No additional comments recorded.'}
                  </StyledText>
                </StyledView>
              </StyledView>
            </Card.Content>
          </Card>
        </StyledView>
      </StyledScrollView>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </StyledSafeAreaView>
  );
}