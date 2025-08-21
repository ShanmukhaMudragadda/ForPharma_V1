import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import TaskCard, { TaskData } from '../../../components/createTaskPlannerCard';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTextInput = styled(TextInput);

export default function CreateTaskPlan() {
    const router = useRouter();

    // Date range state
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)); // 2 days later
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [dateConflict, setDateConflict] = useState(false);

    // Tasks state
    const [tasks, setTasks] = useState<TaskData[]>([
        {
            id: 'task-001',
            type: 'doctor',
            entityId: 'doc-001',
            entityName: 'Dr. Rajesh Sharma',
            entityDetails: 'Cardiologist • Apollo Hospital',
            date: format(startDate, 'yyyy-MM-dd'),
            startTime: '09:00',
            endTime: '10:00',
            location: 'Mathura Road, Delhi',
            hasConflict: false,
            status: 'draft',
        },
        {
            id: 'task-002',
            type: 'doctor',
            entityId: 'doc-002',
            entityName: 'Dr. Priya Mehta',
            entityDetails: 'Pediatrician • Max Hospital',
            date: format(startDate, 'yyyy-MM-dd'),
            startTime: '11:00',
            endTime: '12:00',
            location: 'Sector 19, Noida',
            hasConflict: true,
            status: 'draft',
        },
        {
            id: 'task-003',
            type: 'chemist',
            entityId: 'chem-001',
            entityName: 'MedPlus Pharmacy',
            entityDetails: 'Mr. Suresh Kumar',
            date: format(new Date(startDate.getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
            startTime: '14:00',
            endTime: '15:00',
            location: 'Connaught Place, Delhi',
            hasConflict: false,
            status: 'draft',
        },
    ]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showDateConflictModal, setShowDateConflictModal] = useState(false);

    useEffect(() => {
        checkDateConflict();
    }, [startDate, endDate]);

    const checkDateConflict = () => {
        // Mock existing task plans - in production, check against API
        const existingTaskPlans = [
            { start: new Date('2025-08-16'), end: new Date('2025-08-18') },
            { start: new Date('2025-08-20'), end: new Date('2025-08-22') },
        ];

        const hasConflict = existingTaskPlans.some(plan => {
            return (startDate <= plan.end && endDate >= plan.start);
        });

        setDateConflict(hasConflict);
        if (hasConflict && !showDateConflictModal) {
            setShowDateConflictModal(true);
        }
    };

    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
            // Ensure end date is after start date
            if (selectedDate > endDate) {
                setEndDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
            }
        }
    };

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndDatePicker(false);
        if (selectedDate) {
            if (selectedDate < startDate) {
                Alert.alert('Invalid Date', 'End date must be after start date');
                return;
            }
            setEndDate(selectedDate);
        }
    };

    const addTask = () => {
        // Navigate to Create Task page
        // In production, this would pass the date range and return with a new task
        router.push({
            pathname: '/dailyPlaner/createTasks',
            params: {
                returnTo: 'createTaskPlanner',
                startDate: format(startDate, 'yyyy-MM-dd'),
                endDate: format(endDate, 'yyyy-MM-dd'),
            }
        });
    };

    const editTask = (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            router.push({
                pathname: '/screens/createTask',
                params: {
                    returnTo: 'createTaskPlan',
                    taskId: taskId,
                    editMode: 'true',
                }
            });
        }
    };

    const deleteTask = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const getTaskCounts = () => {
        const counts = {
            total: tasks.length,
            doctors: tasks.filter(t => t.type === 'doctor').length,
            chemists: tasks.filter(t => t.type === 'chemist').length,
            tours: tasks.filter(t => t.type === 'tour').length,
        };
        return counts;
    };

    const saveDraft = () => {
        const taskPlanData = {
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd'),
            tasks: tasks,
            status: 'draft',
            hasDateConflict: dateConflict,
        };

        console.log('Saving task plan as draft:', taskPlanData);

        // In production, save to API
        Alert.alert(
            'Success',
            'Task plan saved as draft successfully!',
            [{ text: 'OK', onPress: () => router.back() }]
        );
    };

    const submitForApproval = () => {
        if (tasks.length === 0) {
            Alert.alert('No Tasks', 'Please add at least one task before submitting');
            return;
        }

        const taskPlanData = {
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd'),
            tasks: tasks,
            status: 'pending',
            hasDateConflict: dateConflict,
        };

        console.log('Submitting task plan for approval:', taskPlanData);

        // In production, submit to API
        Alert.alert(
            'Success',
            'Task plan submitted for approval successfully!',
            [{ text: 'OK', onPress: () => router.back() }]
        );
    };

    const cancelTaskPlan = () => {
        Alert.alert(
            'Cancel Task Plan',
            'Are you sure you want to cancel? All entered data will be lost.',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => router.back() }
            ]
        );
    };

    const renderSectionNumber = (number: string) => (
        <StyledView className="w-5 h-5 bg-[#0077B6] rounded-full items-center justify-center">
            <StyledText className="text-xs font-semibold text-white">{number}</StyledText>
        </StyledView>
    );

    const renderTaskSummary = () => {
        const counts = getTaskCounts();

        return (
            <StyledView className="flex-row items-center gap-2">
                {counts.doctors > 0 && (
                    <StyledView className="bg-blue-600 px-2 py-1 rounded-full flex-row items-center">
                        <StyledText className="text-xs text-white mr-1">👨‍⚕️</StyledText>
                        <StyledText className="text-xs font-semibold text-white">{counts.doctors}</StyledText>
                    </StyledView>
                )}
                {counts.chemists > 0 && (
                    <StyledView className="bg-purple-600 px-2 py-1 rounded-full flex-row items-center">
                        <StyledText className="text-xs text-white mr-1">💊</StyledText>
                        <StyledText className="text-xs font-semibold text-white">{counts.chemists}</StyledText>
                    </StyledView>
                )}
                {counts.tours > 0 && (
                    <StyledView className="bg-green-600 px-2 py-1 rounded-full flex-row items-center">
                        <StyledText className="text-xs text-white mr-1">🗺️</StyledText>
                        <StyledText className="text-xs font-semibold text-white">{counts.tours}</StyledText>
                    </StyledView>
                )}
            </StyledView>
        );
    };

    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50">
            <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

            {/* Header */}
            <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                <StyledView className="flex-row items-center gap-3">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-xl font-semibold text-gray-900">
                        Create Task Plan
                    </StyledText>
                </StyledView>
            </StyledView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <StyledScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {/* Success Message */}
                    {showSuccessMessage && (
                        <StyledView className="mx-5 mt-4 bg-green-100 border border-green-300 rounded-lg p-3 flex-row items-center">
                            <StyledText className="text-green-800 text-sm mr-2">✅</StyledText>
                            <StyledText className="text-green-800 text-sm">
                                Task added successfully!
                            </StyledText>
                        </StyledView>
                    )}

                    {/* Step 1: Date Selection */}
                    <StyledView className="bg-white mx-5 mt-5 p-4 rounded-lg">
                        <StyledView className="flex-row items-center gap-2 mb-4">
                            {renderSectionNumber('1')}
                            <StyledText className="text-base font-semibold text-gray-900">
                                Choose Date Range
                            </StyledText>
                        </StyledView>

                        <StyledText className="text-sm font-medium text-gray-700 mb-3">
                            Task Plan Duration <StyledText className="text-red-500">*</StyledText>
                        </StyledText>

                        <StyledView className="flex-row items-center justify-between">
                            <StyledView className="flex-1 mr-2">
                                <StyledText className="text-xs text-gray-500 mt-1">Start Date</StyledText>
                                <StyledTouchableOpacity
                                    onPress={() => setShowStartDatePicker(true)}
                                    className="border border-gray-200 rounded-lg p-3"
                                >
                                    <StyledText className="text-sm text-gray-900">
                                        {format(startDate, 'MMM dd, yyyy')}
                                    </StyledText>
                                </StyledTouchableOpacity>

                            </StyledView>

                            <StyledText className="text-gray-600 font-semibold mt-[-20px]">to</StyledText>

                            <StyledView className="flex-1 ml-2">
                                <StyledText className="text-xs text-gray-500 mt-1">End Date</StyledText>
                                <StyledTouchableOpacity
                                    onPress={() => setShowEndDatePicker(true)}
                                    className="border border-gray-200 rounded-lg p-3"
                                >
                                    <StyledText className="text-sm text-gray-900">
                                        {format(endDate, 'MMM dd, yyyy')}
                                    </StyledText>
                                </StyledTouchableOpacity>

                            </StyledView>
                        </StyledView>

                        {/* Date Conflict Warning */}
                        {dateConflict && (
                            <StyledView className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 flex-row items-center">
                                <StyledText className="text-red-600 text-xs mr-2">⚠️</StyledText>
                                <StyledText className="text-red-700 text-xs flex-1">
                                    This date range overlaps with an existing task plan. Please choose different dates.
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledView>

                    {/* Step 2: Add Tasks */}
                    <StyledView className="bg-white mx-5 mt-4 p-4 rounded-lg">
                        <StyledView className="flex-row items-center gap-2 mb-4">
                            {renderSectionNumber('2')}
                            <StyledText className="text-base font-semibold text-gray-900">
                                Add Tasks
                            </StyledText>
                        </StyledView>

                        {/* Add Task Button */}
                        <StyledTouchableOpacity
                            onPress={addTask}
                            className="border-2 border-dashed border-[#0077B6] bg-blue-50 rounded-lg p-4 mb-4 flex-row items-center justify-center"
                        >
                            <Ionicons name="add" size={20} color="#0077B6" />
                            <StyledText className="text-[#0077B6] font-medium ml-2">
                                Add Task
                            </StyledText>
                        </StyledTouchableOpacity>

                        {/* Tasks List */}
                        {tasks.length > 0 ? (
                            <>
                                {/* Task Summary */}
                                <StyledView className="flex-row justify-between items-center mb-3">
                                    <StyledText className="text-sm font-semibold text-gray-900">
                                        {tasks.length} task{tasks.length > 1 ? 's' : ''} added
                                    </StyledText>
                                    {renderTaskSummary()}
                                </StyledView>

                                {/* Task Legend */}
                                <StyledView className="bg-gray-50 rounded-lg p-3 mb-3 flex-row justify-center gap-4">
                                    <StyledView className="flex-row items-center">
                                        <StyledView className="w-2 h-2 bg-blue-600 rounded-full mr-1" />
                                        <StyledText className="text-xs text-gray-600">Doctor Visit</StyledText>
                                    </StyledView>
                                    <StyledView className="flex-row items-center">
                                        <StyledView className="w-2 h-2 bg-purple-600 rounded-full mr-1" />
                                        <StyledText className="text-xs text-gray-600">Chemist Visit</StyledText>
                                    </StyledView>
                                    <StyledView className="flex-row items-center">
                                        <StyledView className="w-2 h-2 bg-green-600 rounded-full mr-1" />
                                        <StyledText className="text-xs text-gray-600">Tour Plan</StyledText>
                                    </StyledView>
                                </StyledView>

                                {/* Task Cards */}
                                {tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onEdit={editTask}
                                        onDelete={deleteTask}
                                    />
                                ))}
                            </>
                        ) : (
                            /* Empty State */
                            <StyledView className="py-8 items-center">
                                <StyledText className="text-4xl mb-3 opacity-50">📋</StyledText>
                                <StyledText className="text-base font-semibold text-gray-700 mb-2">
                                    No tasks added yet
                                </StyledText>
                                <StyledText className="text-sm text-gray-500 text-center">
                                    Add your first task to get started with your task plan.
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledView>
                </StyledScrollView>

                {/* Bottom Actions */}
                <StyledView className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-gray-200 flex-row gap-3">
                    <StyledTouchableOpacity
                        onPress={cancelTaskPlan}
                        className="flex-1 bg-white border border-gray-300 py-3 rounded-lg items-center"
                    >
                        <StyledText className="text-sm font-semibold text-gray-600">
                            Cancel
                        </StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        onPress={saveDraft}
                        className="flex-1 bg-gray-600 py-3 rounded-lg items-center"
                        disabled={tasks.length === 0}
                        style={{ opacity: tasks.length === 0 ? 0.5 : 1 }}
                    >
                        <StyledText className="text-sm font-semibold text-white">
                            Save Draft
                        </StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        onPress={submitForApproval}
                        className="flex-1 bg-green-500 py-3 rounded-lg items-center"
                        disabled={tasks.length === 0}
                        style={{ opacity: tasks.length === 0 ? 0.5 : 1 }}
                    >
                        <StyledText className="text-sm font-semibold text-white">
                            Submit
                        </StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </KeyboardAvoidingView>

            {/* Date Pickers */}
            {showStartDatePicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={handleStartDateChange}
                />
            )}

            {showEndDatePicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={handleEndDateChange}
                    minimumDate={startDate}
                />
            )}

            {/* Date Conflict Modal */}
            <Modal
                visible={showDateConflictModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowDateConflictModal(false)}
            >
                <StyledView className="flex-1 bg-black/50 justify-center items-center">
                    <StyledView className="bg-white rounded-xl p-6 mx-5 max-w-xs">
                        <StyledText className="text-lg font-semibold text-gray-900 mb-3">
                            Date Conflict
                        </StyledText>
                        <StyledText className="text-sm text-gray-600 mb-5">
                            The selected date range overlaps with an existing task plan:{'\n\n'}
                            <StyledText className="font-semibold">Mumbai Region Tour</StyledText>{'\n'}
                            Aug 16-18, 2025
                        </StyledText>
                        <StyledView className="flex-row gap-3">
                            <StyledTouchableOpacity
                                onPress={() => setShowDateConflictModal(false)}
                                className="flex-1 bg-gray-100 py-2 rounded-lg items-center"
                            >
                                <StyledText className="text-sm font-semibold text-gray-600">
                                    Choose Different
                                </StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                onPress={() => {
                                    setShowDateConflictModal(false);
                                    // Allow to proceed with conflict
                                }}
                                className="flex-1 bg-[#0077B6] py-2 rounded-lg items-center"
                            >
                                <StyledText className="text-sm font-semibold text-white">
                                    Proceed Anyway
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </Modal>
        </StyledSafeAreaView>
    );
}