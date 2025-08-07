import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Modal, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card } from 'react-native-paper';
import Drawer from '../../components/drawer';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledModal = styled(Modal);

export default function DCRDetailsPage(): JSX.Element {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);

  // Get data from route params or use defaults
  const dcrData = {
    id: params.dcrId ? `${params.dcrId}` : 'DCR-2024-1201',
    customer: params.customerName?.toString().split(' - ')[0] || 'Dr. Rajesh Sharma',
    createdBy: 'Rajesh Kumar',
    visitDate: params.date?.toString() || 'December 18, 2024',
    timings: params.timings?.toString() || '09:00 AM - 10:15 AM',
    location: params.customerName?.toString().includes(' - ') 
      ? params.customerName?.toString().split(' - ')[1] || 'Apollo Hospital, Sarita Vihar, New Delhi'
      : 'Apollo Hospital, Sarita Vihar, New Delhi',
    status: params.status?.toString() || 'Completed',
    productsPromoted: `1. Amlodipine 5mg Tablets - Cardiovascular medication for hypertension management
2. Atorvastatin 20mg Tablets - Cholesterol management and heart disease prevention
3. Metformin 500mg Tablets - Diabetes management supplement`,
    comments: `Dr. ${params.customerName?.toString().split(' - ')[0]?.split(' ')[1] || 'Sharma'} showed great interest in our new Amlodipine formulation. He mentioned that his current patients are responding well to similar medications but is looking for better compliance options. Discussed the once-daily dosing advantage and cost-effectiveness. He agreed to try prescribing it for 5-10 new hypertensive patients next month.

He also requested clinical trial data for the Atorvastatin combination therapy. Promised to send detailed literature by end of week. Overall very productive meeting - doctor is receptive to our products and sees value in the therapeutic benefits we discussed.`
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

  const handleSharePress = (): void => {
    setShowShareDialog(true);
  };

  const handleCloseShareDialog = (): void => {
    setShowShareDialog(false);
  };

  const handleShareOption = (method: string): void => {
    setShowShareDialog(false);
    
    switch(method) {
      case 'email':
        Alert.alert('Email', 'Opening email client...');
        break;
      case 'whatsapp':
        Alert.alert('WhatsApp', 'Sharing via WhatsApp...');
        break;
      case 'pdf':
        Alert.alert('PDF Export', 'Generating PDF...');
        break;
      case 'link':
        Alert.alert('Link Copied', 'Link copied to clipboard!');
        break;
    }
  };

  const handleCustomerPress = (): void => {
    Alert.alert('Customer Details', `Opening details for ${dcrData.customer}`);
  };

  const handleEdit = (): void => {
    setShowOptionsMenu(false);
    // Navigate to create DCR page with edit data
    router.push({
      pathname: '/createDcr',
      params: {
        editMode: 'true',
        dcrId: dcrData.id,
        customerName: params.customerName?.toString() || `${dcrData.customer} - ${dcrData.location}`,
        date: dcrData.visitDate,
        timings: dcrData.timings,
        status: dcrData.status,
        productsPromoted: dcrData.productsPromoted,
        comments: dcrData.comments
      }
    });
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
              // Add your delete API call here
              console.log('Deleting DCR:', dcrData.id);
              Alert.alert('Success', 'DCR deleted successfully', [
                {
                  text: 'OK',
                  onPress: () => router.push('/(tabs)/dcr')
                }
              ]);
            } catch (error: any) {
              Alert.alert('Error', 'Failed to delete DCR. Please try again.');
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
      case 'pending':
        return 'Pending';
      case 'draft':
        return 'Draft';
      default:
        return 'Draft';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-orange-600';
      case 'draft': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100';
      case 'pending': return 'bg-orange-100';
      case 'draft': return 'bg-gray-100';
      default: return 'bg-gray-100';
    }
  };

  const displayStatus = getDisplayStatus(dcrData.status);

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
          {/* Share Button */}
          <StyledTouchableOpacity
            className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
            onPress={handleSharePress}
          >
            <Ionicons name="share-outline" size={18} color="#6C757D" />
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
              {dcrData.id}
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
              <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Customer</StyledText>
              <StyledTouchableOpacity className="flex-1 ml-4" onPress={handleCustomerPress}>
                <StyledText className="text-base font-semibold text-[#0077B6] text-right underline" numberOfLines={1} ellipsizeMode="tail">
                  {dcrData.customer}
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>

            <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
              <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Created By</StyledText>
              <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={1} ellipsizeMode="tail">
                {dcrData.createdBy}
              </StyledText>
            </StyledView>

            <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
              <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Visit Date & Time</StyledText>
              <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={2} ellipsizeMode="tail">
                {dcrData.visitDate} • {dcrData.timings}
              </StyledText>
            </StyledView>

            <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
              <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Location</StyledText>
              <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={2} ellipsizeMode="tail">
                {dcrData.location}
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
                    {dcrData.productsPromoted}
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
                    {dcrData.comments}
                  </StyledText>
                </StyledView>
              </StyledView>
            </Card.Content>
          </Card>
        </StyledView>
      </StyledScrollView>

      {/* Share Dialog */}
      <StyledModal
        visible={showShareDialog}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseShareDialog}
      >
        <StyledView className="flex-1 bg-black/50 justify-center items-center px-6">
          <StyledView className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
            <StyledText className="text-lg font-semibold text-gray-900 text-center mb-4">
              Share DCR Report
            </StyledText>

            {/* Share Options */}
            <StyledView className="gap-2 mb-4">
              <StyledTouchableOpacity
                className="flex-row items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                onPress={() => handleShareOption('email')}
              >
                <StyledText className="text-xl mr-3">📧</StyledText>
                <StyledText className="text-sm font-medium text-gray-900">Email</StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className="flex-row items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                onPress={() => handleShareOption('whatsapp')}
              >
                <StyledText className="text-xl mr-3">💬</StyledText>
                <StyledText className="text-sm font-medium text-gray-900">WhatsApp</StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className="flex-row items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                onPress={() => handleShareOption('pdf')}
              >
                <StyledText className="text-xl mr-3">📄</StyledText>
                <StyledText className="text-sm font-medium text-gray-900">Export as PDF</StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className="flex-row items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                onPress={() => handleShareOption('link')}
              >
                <StyledText className="text-xl mr-3">🔗</StyledText>
                <StyledText className="text-sm font-medium text-gray-900">Copy Link</StyledText>
              </StyledTouchableOpacity>
            </StyledView>

            {/* Close Button */}
            <StyledTouchableOpacity
              className="w-full py-3 bg-gray-600 rounded-lg items-center justify-center"
              onPress={handleCloseShareDialog}
            >
              <StyledText className="text-white font-semibold">Close</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledModal>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </StyledSafeAreaView>
  );
}