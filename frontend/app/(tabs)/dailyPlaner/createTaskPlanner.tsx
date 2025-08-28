import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import TaskCard, { TaskData } from '../../../components/createTaskPlannerCard';
import taskPlannerService from '../../../services/taskPlannerService';
import taskService from '../../../services/taskService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const PLANNER_STORAGE_KEY = 'currentTaskPlannerState';

export default function CreateTaskPlan() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // State management
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [dateConflict, setDateConflict] = useState(false);

    // Task planner state - properly declared
    const [currentPlannerId, setCurrentPlannerId] = useState<string | null>(null);
    const [isTaskPlannerCreated, setTaskPlannerCreated] = useState(false);
    const [tasks, setTasks] = useState<TaskData[]>([]);

    // UI state
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [showDateConflictModal, setShowDateConflictModal] = useState(false);

    // Save planner state to AsyncStorage
    const savePlannerState = async (plannerId: string, isCreated: boolean) => {
        try {
            console.log("Saving planner state:", { plannerId, isCreated });
            const stateToSave = {
                currentPlannerId: plannerId,
                taskPlannerCreated: isCreated,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            };
            await AsyncStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(stateToSave));
            console.log("Successfully saved planner state");
        } catch (error) {
            console.error("Error saving planner state:", error);
        }
    };

    // Load planner state from AsyncStorage
    const loadPlannerState = async () => {
        try {
            console.log("Loading planner state from AsyncStorage");
            const saved = await AsyncStorage.getItem(PLANNER_STORAGE_KEY);

            if (saved) {
                const state = JSON.parse(saved);
                console.log("Loaded state:", state);

                if (state.currentPlannerId) {
                    setCurrentPlannerId(state.currentPlannerId);
                }
                if (typeof state.taskPlannerCreated === 'boolean') {
                    setTaskPlannerCreated(state.taskPlannerCreated);
                }
                if (state.startDate) {
                    setStartDate(new Date(state.startDate));
                }
                if (state.endDate) {
                    setEndDate(new Date(state.endDate));
                }

                return state;
            }
            return null;
        } catch (error) {
            console.error("Error loading planner state:", error);
            return null;
        }
    };

    // Clear planner state from AsyncStorage
    const clearPlannerState = async () => {
        try {
            await AsyncStorage.removeItem(PLANNER_STORAGE_KEY);
            console.log("Cleared planner state");
        } catch (error) {
            console.error("Error clearing planner state:", error);
        }
    };

    // Load existing tasks - FIXED to match API response structure
    const loadExistingTasks = async (plannerId: string) => {
        try {
            setLoading(true);
            console.log("Loading tasks for planner:", plannerId);
            const response = await taskService.getTasksOfPlannerId(plannerId);

            const transformedTasks: TaskData[] = [];

            // The API returns response.data.tasks based on the service and controller
            if (response && response.data && response.data.tasks && Array.isArray(response.data.tasks)) {
                response.data.tasks.forEach((task: any) => {
                    // Map the task type - API returns 'tourplan' but TaskData expects 'tour'
                    let taskType: 'doctor' | 'chemist' | 'tour' = 'doctor';
                    if (task.type === 'chemist') {
                        taskType = 'chemist';
                    } else if (task.type === 'tourplan') {
                        taskType = 'tour';
                    } else if (task.type === 'doctor') {
                        taskType = 'doctor';
                    }

                    transformedTasks.push({
                        id: task.id,
                        type: taskType,
                        entityId: task.typeId,
                        entityName: task.name || `Unknown ${task.type}`,
                        entityDetails: task.details || '',
                        date: task.date,
                        startTime: task.startTime,
                        endTime: task.endTime,
                        location: task.location || '',
                        hasConflict: false,
                        status: (task.approvalStatus?.toLowerCase() || 'draft') as 'draft' | 'pending' | 'approved' | 'rejected',
                    });
                });
            }

            console.log("Transformed tasks:", transformedTasks);
            console.log("Loaded tasks count:", transformedTasks.length);
            setTasks(transformedTasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    // Initial load when component mounts
    useEffect(() => {
        const initializeComponent = async () => {
            setInitialLoading(true);
            const state = await loadPlannerState();

            if (state && state.currentPlannerId && state.taskPlannerCreated) {
                // If we have a saved state, load tasks
                await loadExistingTasks(state.currentPlannerId);
            }

            setInitialLoading(false);
        };

        initializeComponent();
    }, []);

    // Use focus effect to reload tasks when returning to this screen
    useFocusEffect(
        useCallback(() => {
            const reloadTasks = async () => {
                if (currentPlannerId && isTaskPlannerCreated) {
                    console.log("Screen focused, reloading tasks for planner:", currentPlannerId);
                    await loadExistingTasks(currentPlannerId);
                }
            };

            reloadTasks();
        }, [currentPlannerId, isTaskPlannerCreated])
    );

    const checkDateConflict = async () => {
        try {
            const planners = await taskPlannerService.getTaskPlanners();
            const hasConflict = planners.some(planner => {
                if (planner.id === currentPlannerId) return false;
                const pStart = new Date(planner.startDate);
                const pEnd = new Date(planner.endDate);
                return (startDate <= pEnd && endDate >= pStart);
            });
            setDateConflict(hasConflict);
        } catch (error) {
            console.error('Error checking date conflict:', error);
        }
    };

    useEffect(() => {
        if (isTaskPlannerCreated) {
            checkDateConflict();
        }
    }, [startDate, endDate, isTaskPlannerCreated]);

    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
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

    const createTaskPlanner = async () => {
        try {
            setLoading(true);
            const response = await taskPlannerService.createTaskPlanner({
                startDate: format(startDate, 'yyyy-MM-dd'),
                endDate: format(endDate, 'yyyy-MM-dd'),
            });

            if (response.success && response.taskPlanner) {
                const plannerId = response.taskPlanner.id;
                setCurrentPlannerId(plannerId);
                setTaskPlannerCreated(true);

                // Save state to AsyncStorage
                await savePlannerState(plannerId, true);

                Alert.alert('Success', 'Task planner created successfully');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to create task planner');
        } finally {
            setLoading(false);
        }
    };

    const addTask = () => {
        if (!currentPlannerId || !isTaskPlannerCreated) {
            Alert.alert('Error', 'Please create task planner first');
            return;
        }

        router.push({
            pathname: '/dailyPlaner/createTasks',
            params: {
                returnTo: 'createTaskPlanner',
                taskPlannerId: currentPlannerId,
                startDate: format(startDate, 'yyyy-MM-dd'),
                endDate: format(endDate, 'yyyy-MM-dd'),
            }
        });
    };

    const editTask = (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (task && currentPlannerId) {
            router.push({
                pathname: '/dailyPlaner/createTasks',
                params: {
                    returnTo: 'createTaskPlanner',
                    taskPlannerId: currentPlannerId,
                    taskId: taskId,
                    editMode: 'true',
                    startDate: format(startDate, 'yyyy-MM-dd'),
                    endDate: format(endDate, 'yyyy-MM-dd'),
                }
            });
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            const task = tasks.find(t => t.id === taskId);
            if (!task) return;

            // Map task type for API call
            let apiTaskType = task.type;
            if (task.type === 'tour') {
                apiTaskType = 'tourplan';
            }

            await taskService.deleteTask(apiTaskType, taskId);

            setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
            Alert.alert('Success', 'Task deleted successfully');

            // Reload tasks to ensure sync
            if (currentPlannerId) {
                await loadExistingTasks(currentPlannerId);
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to delete task');
        }
    };

    const saveDraft = async () => {
        await clearPlannerState();
        Alert.alert('Success', 'Task plan saved as draft');
        router.back();
    };

    const submitForApproval = async () => {
        if (tasks.length === 0) {
            Alert.alert('No Tasks', 'Please add at least one task before submitting');
            return;
        }

        try {
            // You can update planner status to PENDING via API if needed
            // if (currentPlannerId) {
            //     await taskPlannerService.updateTaskPlannerStatus(currentPlannerId, 'PENDING');
            // }

            await clearPlannerState();
            Alert.alert('Success', 'Task plan submitted for approval!');
            router.back();
        } catch (error) {
            Alert.alert('Error', 'Failed to submit task plan');
        }
    };

    const cancelTaskPlan = async () => {
        Alert.alert(
            'Cancel Task Plan',
            'Are you sure you want to cancel? All entered data will be lost.',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        if (currentPlannerId) {
                            try {
                                await taskPlannerService.deleteTaskPlanner(currentPlannerId);
                            } catch (error) {
                                console.error('Error deleting task planner:', error);
                            }
                        }
                        await clearPlannerState();
                        router.back();
                    }
                }
            ]
        );
    };

    const renderSectionNumber = (number: string) => (
        <StyledView className="w-5 h-5 bg-[#0077B6] rounded-full items-center justify-center">
            <StyledText className="text-xs font-semibold text-white">{number}</StyledText>
        </StyledView>
    );

    const getTaskCounts = () => {
        return {
            total: tasks.length,
            doctors: tasks.filter(t => t.type === 'doctor').length,
            chemists: tasks.filter(t => t.type === 'chemist').length,
            tours: tasks.filter(t => t.type === 'tour').length,
        };
    };

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

    if (initialLoading) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StatusBar backgroundColor="#0077B6" barStyle="light-content" />
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-3">Loading...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

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
                                    onPress={() => !isTaskPlannerCreated && setShowStartDatePicker(true)}
                                    className="border border-gray-200 rounded-lg p-3"
                                    disabled={isTaskPlannerCreated}
                                >
                                    <StyledText className={`text-sm ${isTaskPlannerCreated ? 'text-gray-500' : 'text-gray-900'}`}>
                                        {format(startDate, 'MMM dd, yyyy')}
                                    </StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>

                            <StyledText className="text-gray-600 font-semibold mt-[-20px]">to</StyledText>

                            <StyledView className="flex-1 ml-2">
                                <StyledText className="text-xs text-gray-500 mt-1">End Date</StyledText>
                                <StyledTouchableOpacity
                                    onPress={() => !isTaskPlannerCreated && setShowEndDatePicker(true)}
                                    className="border border-gray-200 rounded-lg p-3"
                                    disabled={isTaskPlannerCreated}
                                >
                                    <StyledText className={`text-sm ${isTaskPlannerCreated ? 'text-gray-500' : 'text-gray-900'}`}>
                                        {format(endDate, 'MMM dd, yyyy')}
                                    </StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>
                        </StyledView>

                        {dateConflict && (
                            <StyledView className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 flex-row items-center">
                                <StyledText className="text-red-600 text-xs mr-2">⚠️</StyledText>
                                <StyledText className="text-red-700 text-xs flex-1">
                                    This date range overlaps with an existing task plan.
                                </StyledText>
                            </StyledView>
                        )}

                        {isTaskPlannerCreated && (
                            <StyledView className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 flex-row items-center">
                                <StyledText className="text-green-600 text-xs mr-2">✓</StyledText>
                                <StyledText className="text-green-700 text-xs flex-1">
                                    Task planner created successfully
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledView>

                    {/* Step 2: Add Tasks - Only show after planner is created */}
                    {isTaskPlannerCreated && (
                        <StyledView className="bg-white mx-5 mt-4 p-4 rounded-lg">
                            <StyledView className="flex-row items-center gap-2 mb-4">
                                {renderSectionNumber('2')}
                                <StyledText className="text-base font-semibold text-gray-900">
                                    Add Tasks
                                </StyledText>
                            </StyledView>

                            <StyledTouchableOpacity
                                onPress={addTask}
                                className="border-2 border-dashed border-[#0077B6] bg-blue-50 rounded-lg p-4 mb-4 flex-row items-center justify-center"
                            >
                                <Ionicons name="add" size={20} color="#0077B6" />
                                <StyledText className="text-[#0077B6] font-medium ml-2">
                                    Add Task
                                </StyledText>
                            </StyledTouchableOpacity>

                            {tasks.length > 0 ? (
                                <>
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
                    )}
                </StyledScrollView>

                {/* Bottom Actions */}
                <StyledView className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-gray-200">
                    {!isTaskPlannerCreated ? (
                        // Initial state - only show Create Task Plan button
                        <StyledView className="flex-row gap-3">
                            <StyledTouchableOpacity
                                onPress={cancelTaskPlan}
                                className="flex-1 bg-white border border-gray-300 py-3 rounded-lg items-center"
                            >
                                <StyledText className="text-sm font-semibold text-gray-600">
                                    Cancel
                                </StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                onPress={createTaskPlanner}
                                className="flex-1 bg-[#0077B6] py-3 rounded-lg items-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <StyledText className="text-sm font-semibold text-white">
                                        Create Task Plan
                                    </StyledText>
                                )}
                            </StyledTouchableOpacity>
                        </StyledView>
                    ) : (
                        // After planner created - show Save Draft and Submit buttons
                        <StyledView className="flex-row gap-3">
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
                    )}
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
                            The selected date range overlaps with an existing task plan. You can proceed with caution.
                        </StyledText>
                        <StyledTouchableOpacity
                            onPress={() => setShowDateConflictModal(false)}
                            className="bg-[#0077B6] py-2 rounded-lg items-center"
                        >
                            <StyledText className="text-sm font-semibold text-white">
                                OK
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </Modal>
        </StyledSafeAreaView>
    );
}