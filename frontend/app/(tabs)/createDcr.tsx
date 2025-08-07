import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, TextInput, Alert, Modal } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/header';
import Drawer from '../../components/drawer';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);
const StyledModal = styled(Modal);

export default function CreateDCRPage(): JSX.Element {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskDropdown, setShowTaskDropdown] = useState<boolean>(false);
  const [productsPromoted, setProductsPromoted] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

  // Updated sample tasks data with better structure
  const sampleTasks = [
    {
      id: 1,
      type: 'Doctor Visit',
      name: 'Dr. Rajesh Sharma',
      address: 'Apollo Hospital, Sarita Vihar, New Delhi',
      time: '09:00 AM - 10:00 AM',
      category: 'visit'
    },
    {
      id: 2,
      type: 'Chemist Meeting',
      name: 'Apollo Pharmacy',
      address: 'Sarita Vihar, New Delhi - 110076',
      time: '11:30 AM - 12:15 PM',
      category: 'meeting'
    },
    {
      id: 3,
      type: 'RCPA Audit',
      name: 'MedPlus Pharmacy',
      address: 'Lajpat Nagar, New Delhi - 110024',
      time: '02:00 PM - 03:00 PM',
      category: 'audit'
    },
    {
      id: 4,
      type: 'Doctor Visit',
      name: 'Dr. Priya Mehta',
      address: 'Max Healthcare, Patparganj, New Delhi',
      time: '03:30 PM - 04:30 PM',
      category: 'visit'
    },
    {
      id: 5,
      type: 'Chemist Meeting',
      name: 'Guardian Pharmacy',
      address: 'Connaught Place, New Delhi - 110001',
      time: '05:00 PM - 05:45 PM',
      category: 'meeting'
    },
    {
      id: 6,
      type: 'Hospital Visit',
      name: 'Fortis Hospital',
      address: 'Shalimar Bagh, New Delhi - 110088',
      time: '10:30 AM - 11:30 AM',
      category: 'visit'
    },
    {
      id: 7,
      type: 'Chemist Meeting',
      name: 'Wellness Pharmacy',
      address: 'Karol Bagh, New Delhi - 110005',
      time: '12:30 PM - 01:15 PM',
      category: 'meeting'
    },
    {
      id: 8,
      type: 'Doctor Visit',
      name: 'Dr. Amit Kumar',
      address: 'Safdarjung Hospital, New Delhi',
      time: '08:30 AM - 09:30 AM',
      category: 'visit'
    }
  ];

  const handleMenuPress = (): void => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = (): void => {
    setIsDrawerOpen(false);
  };

  const handleBackPress = (): void => {
    router.back();
  };

  const handleGoToDCRList = (): void => {
    console.log('Going to DCR list...');
    router.push('/(tabs)/dcr');
  };

  const handleTaskSelect = (task: any): void => {
    setSelectedTask(task);
    setShowTaskDropdown(false);
    // Reset form fields when new task is selected
    setProductsPromoted('');
    setComments('');
  };

  const handleSubmit = (): void => {
    // Validation: At least one field must be filled
    if (!productsPromoted.trim() && !comments.trim()) {
      Alert.alert(
        'Validation Error',
        'Please fill in at least one field - either Products Promoted or Comments.',
        [{ text: 'OK' }]
      );
      return;
    }

    // If validation passes, proceed with submission
    console.log('Submitting DCR...');
    console.log('Selected Task:', selectedTask);
    console.log('Products Promoted:', productsPromoted);
    console.log('Comments:', comments);
    
    // Show success dialog
    setShowSuccessDialog(true);
  };

  const handleCloseSuccessDialog = (): void => {
    setShowSuccessDialog(false);
    router.push('/(tabs)/dcr'); 
  };

  const isFormValid = selectedTask && (productsPromoted.trim() || comments.trim());

  return (
    <StyledSafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

      {/* Create DCR Title Bar */}
      <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
        <StyledView className="flex-row items-center gap-3">
          <StyledTouchableOpacity
            className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
            onPress={handleBackPress}
          >
            <Ionicons name="arrow-back" size={18} color="#6C757D" />
          </StyledTouchableOpacity>

          <StyledText className="text-xl font-semibold text-gray-900">
            Create DCR
          </StyledText>
        </StyledView>

        {/* DCR List Button */}
        <StyledTouchableOpacity
          className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
          onPress={handleGoToDCRList}
        >
          <Ionicons name="list-outline" size={18} color="#6C757D" />
        </StyledTouchableOpacity>
      </StyledView>

      {/* Main Content Area */}
      <StyledScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >

        {/* Introduction Section */}
        <StyledView className="bg-[#E6F3FA] px-5 py-6">
          <StyledText className="text-xl font-semibold text-[#003D58]">
            Every interaction counts. Capture your impact, one call at a time.
          </StyledText>
          <StyledText className="text-base text-[#005A87] mt-1">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </StyledText>
          
          <StyledView className="flex-row items-center justify-center gap-2 mt-4">
            <StyledText className="text-base text-[#005A87] font-medium">
              Employee ID:
            </StyledText>
            <StyledView className="bg-white px-4 py-2 rounded-full border border-blue-200 shadow-sm">
              <StyledText className="text-base text-[#0077B6] font-semibold">
                EMP-2024-1001
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Form Content */}
        <StyledView className="flex-1 px-5 py-6">
          {/* Task Selection */}
          <StyledView className={`mb-6 ${showTaskDropdown ? 'mb-80' : 'mb-6'}`}>
            <StyledText className="text-base font-medium text-gray-900 mb-2">
              Select Task <StyledText className="text-red-500">*</StyledText>
            </StyledText>
            <StyledTouchableOpacity 
              className="w-full p-4 border border-gray-200 rounded-lg bg-white flex-row justify-between items-center relative z-50"
              onPress={() => setShowTaskDropdown(!showTaskDropdown)}
            >
              <StyledText className={`text-base ${selectedTask ? 'text-gray-900' : 'text-gray-500'}`}>
                {selectedTask ? `${selectedTask.type} - ${selectedTask.name}` : 'Choose a task from today...'}
              </StyledText>
              <Ionicons 
                name={showTaskDropdown ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#6C757D" 
              />
            </StyledTouchableOpacity>

            {/* Dropdown Menu with proper positioning */}
            {showTaskDropdown && (
              <StyledView 
                className="absolute top-20 left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg"
                style={{ 
                  zIndex: 1000, 
                  elevation: 1000,
                  maxHeight: 240 
                }}
              >
                <StyledScrollView 
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                  style={{ maxHeight: 240 }}
                >
                  {sampleTasks.map((task, index) => (
                    <StyledTouchableOpacity
                      key={task.id}
                      className={`p-4 ${index < sampleTasks.length - 1 ? 'border-b border-gray-100' : ''}`}
                      onPress={() => handleTaskSelect(task)}
                    >
                      <StyledText className="text-sm font-semibold text-gray-900 mb-1">
                        {task.type}
                      </StyledText>
                      <StyledText className="text-xs text-gray-600 mb-1">
                        {task.name}
                      </StyledText>
                      <StyledText className="text-xs text-gray-500">
                        {task.address} • {task.time}
                      </StyledText>
                    </StyledTouchableOpacity>
                  ))}
                </StyledScrollView>
              </StyledView>
            )}
          </StyledView>

          {/* Dynamic Form Section - Only show when task is selected */}
          {selectedTask && (
            <StyledView className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
              <StyledText className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Call Details
              </StyledText>
              
              {/* Selected Task Info - Updated format */}
              <StyledView className="bg-gray-50 p-4 rounded-lg mb-6 border-l-4 border-[#0077B6]">
                {/* Row 1: Task Type */}
                <StyledText className="text-base font-semibold text-gray-900 mb-2">
                  {selectedTask.type}
                </StyledText>
                
                {/* Row 2: Name and Address */}
                <StyledText className="text-sm text-gray-700 mb-2 leading-5">
                  {selectedTask.name}
                </StyledText>
                <StyledText className="text-sm text-gray-700 mb-2 leading-5">
                  {selectedTask.address}
                </StyledText>
                
                {/* Row 3: Timings */}
                <StyledText className="text-sm text-gray-600 font-medium">
                  {selectedTask.time}
                </StyledText>
              </StyledView>

              {/* Products Promoted - Larger input area */}
              <StyledView className="mb-4">
                <StyledText className="text-base font-medium text-gray-900 mb-2">
                  Products Promoted
                </StyledText>
                <StyledTextInput
                  className="w-full p-4 border border-gray-200 rounded-lg bg-white text-base min-h-[120px]"
                  placeholder="List the products you promoted during this activity..."
                  multiline={true}
                  textAlignVertical="top"
                  value={productsPromoted}
                  onChangeText={setProductsPromoted}
                />
              </StyledView>

              {/* Comments - Larger input area */}
              <StyledView className="mb-4">
                <StyledText className="text-base font-medium text-gray-900 mb-2">
                  Comments
                </StyledText>
                <StyledTextInput
                  className="w-full p-4 border border-gray-200 rounded-lg bg-white text-base min-h-[120px]"
                  placeholder="Add any additional comments or observations..."
                  multiline={true}
                  textAlignVertical="top"
                  value={comments}
                  onChangeText={setComments}
                />
              </StyledView>

              {/* Validation Message */}
              <StyledText className="text-sm text-gray-600 italic">
                * Please fill in at least one field above
              </StyledText>
            </StyledView>
          )}
        </StyledView>
        
      </StyledScrollView>

      {/* Bottom Submit Button */}
      <StyledView className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-gray-200">
        <StyledTouchableOpacity
          className={`w-full py-4 rounded-lg items-center justify-center ${
            isFormValid ? 'bg-[#0077B6]' : 'bg-gray-300'
          }`}
          disabled={!isFormValid}
          onPress={handleSubmit}
        >
          <StyledText className={`text-base font-semibold ${
            isFormValid ? 'text-white' : 'text-gray-500'
          }`}>
            Submit DCR
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Reuse existing Drawer component */}
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />

      {/* Success Dialog */}
      <StyledModal
        visible={showSuccessDialog}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseSuccessDialog}
      >
        <StyledView className="flex-1 bg-black/50 justify-center items-center px-6">
          <StyledView className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
            {/* Success Icon */}
            <StyledView className="items-center mb-4">
              <StyledView className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="checkmark-circle" size={32} color="#10B981" />
              </StyledView>
              <StyledText className="text-xl font-semibold text-gray-900 text-center">
                DCR Submitted Successfully!
              </StyledText>
            </StyledView>

            {/* Message */}
            <StyledView className="mb-6">
              <StyledText className="text-base text-gray-600 text-center leading-6">
                Your Daily Call Report has been submitted successfully.
              </StyledText>
            </StyledView>

            {/* OK Button */}
            <StyledTouchableOpacity
              className="w-full py-3 px-4 bg-[#0077B6] rounded-lg items-center justify-center"
              onPress={handleCloseSuccessDialog}
            >
              <StyledText className="text-base font-medium text-white">
                OK
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledModal>
    </StyledSafeAreaView>
  );
}