import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, TextInput, Alert, Modal, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../components/header';
import Drawer from '../../components/drawer';
import DCRService, { TaskDetail } from '../../services/dcrService';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);
const StyledModal = styled(Modal);

export default function CreateDCRPage(): JSX.Element {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Check if we're in edit mode
  const isEditMode = params.editMode === 'true';
  const editDcrId = params.dcrId as string;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskDetail | null>(null);
  const [showTaskDropdown, setShowTaskDropdown] = useState<boolean>(false);
  const [productsPromoted, setProductsPromoted] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Backend data states
  const [tasks, setTasks] = useState<TaskDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize component - runs once
  useEffect(() => {
    if (initialized) return;

    if (isEditMode) {
      // Pre-populate form with edit data
      setProductsPromoted(params.productsPromoted as string || '');
      setComments(params.comments as string || '');

      // Create a mock task object for edit mode
      const editTask: TaskDetail = {
        taskId: params.taskId as string,
        taskType: params.taskType as string,
        name: params.customerName as string,
        date: params.taskDate as string,
        address: params.customerAddress as string,
        timings: params.taskTimings as string
      };

      setSelectedTask(editTask);
      setLoading(false);
    } else {
      // Load tasks for create mode
      loadTasks();
    }

    setInitialized(true);
  }, [initialized]);

  // Load tasks from backend (only for create mode)
  const loadTasks = async () => {
    try {
      setError(null);
      setLoading(true);
      const tasksData = await DCRService.getTasksForDCR();
      setTasks(tasksData);
    } catch (error: any) {
      console.error('Error loading tasks:', error);
      setError(error.message || 'Failed to load tasks');
      Alert.alert('Error', 'Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMenuPress = (): void => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = (): void => {
    setIsDrawerOpen(false);
  };

  const handleBackPress = (): void => {
    if (isEditMode) {
      // Go back to DCR details page
      router.back();
    } else {
      router.back();
    }
  };

  const handleGoToDCRList = (): void => {
    console.log('Going to DCR list...');
    router.push('/(tabs)/dcr');
  };

  const handleTaskSelect = (task: TaskDetail): void => {
    setSelectedTask(task);
    setShowTaskDropdown(false);
    // Reset form fields when new task is selected (only in create mode)
    if (!isEditMode) {
      setProductsPromoted('');
      setComments('');
    }
  };

  const handleSubmit = async (isDraft: boolean): Promise<void> => {
    if (!selectedTask) {
      Alert.alert('Error', 'Please select a task first.');
      return;
    }

    // Validation: At least one field must be filled
    if (!productsPromoted.trim() && !comments.trim()) {
      Alert.alert(
        'Validation Error',
        'Please fill in at least one field - either Products Promoted or Comments.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      setSubmitting(true);

      if (isEditMode) {
        // Update existing DCR
        const updateData = {
          productsDiscussed: productsPromoted.trim(),
          comments: comments.trim(),
          isDraft: isDraft
        };

        await DCRService.updateDCR(editDcrId, updateData);

        // Set success message based on draft status
        setSuccessMessage(isDraft
          ? 'DCR updated and saved as draft successfully!'
          : 'DCR updated and submitted successfully!'
        );
      } else {
        // Create new DCR
        const dcrData = {
          taskId: selectedTask.taskId,
          taskType: selectedTask.taskType,
          productsDiscussed: productsPromoted.trim(),
          comments: comments.trim(),
          isDraft: isDraft
        };

        const result = await DCRService.createDCR(dcrData);

        // Set success message based on draft status
        setSuccessMessage(isDraft
          ? 'DCR saved as draft successfully!'
          : 'DCR submitted successfully!'
        );
      }

      // Show success dialog
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error('Error saving DCR:', error);
      Alert.alert('Error', error.message || 'Failed to save DCR. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSuccessDialog = (): void => {
    setShowSuccessDialog(false);
    router.push('/(tabs)/dcr');
  };

  const isFormValid = selectedTask && (productsPromoted.trim() || comments.trim());

  // Get task heading based on task type
  const getTaskHeading = (taskType: string) => {
    switch (taskType) {
      case 'DOCTOR_TASK':
        return 'Doctor Visit';
      case 'CHEMIST_TASK':
        return 'Chemist Visit';
      case 'TOUR_PLAN_TASK':
        return 'Tour Visit';
      default:
        return 'Visit';
    }
  };

  // Loading state (only for create mode)
  if (loading && !isEditMode) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
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
              {isEditMode ? 'Edit DCR' : 'Create DCR'}
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Loading Indicator */}
        <StyledView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0077B6" />
          <StyledText className="text-gray-600 mt-4">Loading tasks...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }

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
            {isEditMode ? 'Edit DCR' : 'Create DCR'}
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
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >

        {/* Introduction Section */}
        <StyledView className="bg-[#E6F3FA] px-5 py-6">
          <StyledText className="text-xl font-semibold text-[#003D58]">
            {isEditMode
              ? 'Update your DCR details and submit your changes.'
              : 'Every interaction counts. Capture your impact, one call at a time.'
            }
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

        {/* Error State - Only for create mode */}
        {error && !isEditMode && (
          <StyledView className="mx-5 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <StyledText className="text-red-700 text-base font-medium mb-2">
              Error Loading Tasks
            </StyledText>
            <StyledText className="text-red-600 text-sm mb-3">
              {error}
            </StyledText>
            <StyledTouchableOpacity
              className="bg-red-600 px-4 py-2 rounded-lg self-start"
              onPress={loadTasks}
            >
              <StyledText className="text-white font-semibold text-sm">
                Try Again
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        )}

        {/* Form Content */}
        <StyledView className="flex-1 px-5 py-6">
          {/* Task Selection - Different behavior for edit vs create mode */}
          {isEditMode ? (
            // Edit Mode - Show selected task as read-only
            <StyledView className="mb-6">
              <StyledText className="text-base font-medium text-gray-900 mb-2">
                Selected Task
              </StyledText>
              <StyledView className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50">
                <StyledText className="text-base font-semibold text-gray-700 mb-1">
                  {getTaskHeading(selectedTask?.taskType || '')} - {selectedTask?.name}
                </StyledText>
                <StyledText className="text-sm text-gray-600 mb-1">
                  {selectedTask?.date}
                </StyledText>
                <StyledText className="text-sm text-gray-600 mb-1">
                  {selectedTask?.address}
                </StyledText>
                <StyledText className="text-sm text-gray-600">
                  {selectedTask?.timings}
                </StyledText>
                <StyledText className="text-xs text-orange-600 font-medium mt-2 italic">
                  * Task cannot be changed in edit mode
                </StyledText>
              </StyledView>
            </StyledView>
          ) : (
            // Create Mode - Show task dropdown
            <StyledView className={`mb-6 ${showTaskDropdown ? 'mb-80' : 'mb-6'}`}>
              <StyledText className="text-base font-medium text-gray-900 mb-2">
                Select Task <StyledText className="text-red-500">*</StyledText>
              </StyledText>
              <StyledTouchableOpacity
                className="w-full p-4 border border-gray-200 rounded-lg bg-white flex-row justify-between items-center relative z-50"
                onPress={() => setShowTaskDropdown(!showTaskDropdown)}
              >
                <StyledText className={`text-base flex-1 ${selectedTask ? 'text-gray-900' : 'text-gray-500'}`}>
                  {selectedTask
                    ? `${getTaskHeading(selectedTask.taskType)} - ${selectedTask.name}`
                    : tasks.length > 0
                      ? 'Choose a completed task...'
                      : 'No completed tasks available'
                  }
                </StyledText>
                {tasks.length > 0 && (
                  <Ionicons
                    name={showTaskDropdown ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#6C757D"
                  />
                )}
              </StyledTouchableOpacity>

              {/* Dropdown Menu with proper positioning */}
              {showTaskDropdown && tasks.length > 0 && (
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
                    {tasks.map((task, index) => (
                      <StyledTouchableOpacity
                        key={task.taskId}
                        className={`p-4 ${index < tasks.length - 1 ? 'border-b border-gray-100' : ''}`}
                        onPress={() => handleTaskSelect(task)}
                      >
                        <StyledText className="text-sm font-semibold text-gray-900 mb-1">
                          {getTaskHeading(task.taskType)}
                        </StyledText>
                        <StyledText className="text-xs text-gray-600 mb-1">
                          {task.name} • {task.date}
                        </StyledText>
                        <StyledText className="text-xs text-gray-500 mb-1">
                          {task.address}
                        </StyledText>
                        <StyledText className="text-xs text-gray-500">
                          {task.timings}
                        </StyledText>
                      </StyledTouchableOpacity>
                    ))}
                  </StyledScrollView>
                </StyledView>
              )}
            </StyledView>
          )}

          {/* No Tasks Available Message - Only for create mode */}
          {tasks.length === 0 && !loading && !error && !isEditMode && (
            <StyledView className="items-center py-12">
              <StyledText className="text-5xl mb-4">📅</StyledText>
              <StyledText className="text-lg font-semibold text-gray-900 mb-2">
                No Completed Tasks Available
              </StyledText>
              <StyledText className="text-sm text-gray-600 text-center">
                You don't have any completed tasks. DCR reports can only be created for completed or rescheduled tasks.
              </StyledText>
            </StyledView>
          )}

          {/* Dynamic Form Section - Show when task is selected */}
          {selectedTask && (
            <StyledView className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
              <StyledText className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Call Details
              </StyledText>

              {/* Selected Task Info - Only show in create mode or as summary in edit mode */}
              {!isEditMode && (
                <StyledView className="bg-gray-50 p-4 rounded-lg mb-6 border-l-4 border-[#0077B6]">
                  {/* Row 1: Task Type and Date */}
                  <StyledView className="flex-row justify-between items-center mb-2">
                    <StyledText className="text-base font-semibold text-gray-900">
                      {getTaskHeading(selectedTask.taskType)}
                    </StyledText>
                    <StyledText className="text-sm text-gray-600 font-medium">
                      {selectedTask.date}
                    </StyledText>
                  </StyledView>

                  {/* Row 2: Name */}
                  <StyledText className="text-sm text-gray-700 mb-2 leading-5 font-medium">
                    {selectedTask.name}
                  </StyledText>

                  {/* Row 3: Address */}
                  <StyledText className="text-sm text-gray-700 mb-2 leading-5">
                    {selectedTask.address}
                  </StyledText>

                  {/* Row 4: Timings */}
                  <StyledText className="text-sm text-gray-600 font-medium">
                    {selectedTask.timings}
                  </StyledText>
                </StyledView>
              )}

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

      {/* Bottom Action Buttons - Updated with two buttons */}
      {selectedTask && (
        <StyledView className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-gray-200">
          <StyledView className="flex-row gap-3">
            {/* Save as Draft Button */}
            <StyledTouchableOpacity
              className={`flex-1 py-4 rounded-lg items-center justify-center border ${isFormValid
                ? 'bg-gray-100 border-gray-300'
                : 'bg-gray-100 border-gray-200'
                }`}
              disabled={!isFormValid || submitting}
              onPress={() => handleSubmit(true)}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#6C757D" />
              ) : (
                <StyledText className={`text-base font-semibold ${isFormValid ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                  {isEditMode ? 'Save as Draft' : 'Save as Draft'}
                </StyledText>
              )}
            </StyledTouchableOpacity>

            {/* Submit Button */}
            <StyledTouchableOpacity
              className={`flex-1 py-4 rounded-lg items-center justify-center ${isFormValid ? 'bg-[#0077B6]' : 'bg-gray-300'
                }`}
              disabled={!isFormValid || submitting}
              onPress={() => handleSubmit(false)}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <StyledText className={`text-base font-semibold ${isFormValid ? 'text-white' : 'text-gray-500'
                  }`}>
                  {isEditMode ? 'Update DCR' : 'Submit DCR'}
                </StyledText>
              )}
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      )}

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
                {successMessage}
              </StyledText>
            </StyledView>

            {/* Message */}
            <StyledView className="mb-6">
              <StyledText className="text-base text-gray-600 text-center leading-6">
                Your Daily Call Report has been {successMessage.includes('draft') ? 'saved as draft' : isEditMode ? 'updated' : 'submitted'} successfully.
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