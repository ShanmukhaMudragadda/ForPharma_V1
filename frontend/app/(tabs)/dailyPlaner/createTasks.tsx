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
    Modal,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    FlatList,
} from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTextInput = styled(TextInput);

const { width: screenWidth } = Dimensions.get('window');

// Types
interface Entity {
    id: string;
    name: string;
    subtitle: string;
}

interface TimeSlot {
    time: string;
    task?: {
        type: string;
        title: string;
        subtitle: string;
        hasConflict?: boolean;
    };
}

interface TaskData {
    type: 'doctor' | 'chemist' | 'tour' | null;
    entity: Entity | null;
    date: string | null;
    startTime: string | null;
    endTime: string | null;
    location: string | null;
    hasConflict: boolean;
}

export default function CreateTask() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [taskData, setTaskData] = useState<TaskData>({
        type: null,
        entity: null,
        date: null,
        startTime: null,
        endTime: null,
        location: null,
        hasConflict: false,
    });

    // UI States
    const [searchQuery, setSearchQuery] = useState('');
    const [showEntityDropdown, setShowEntityDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showTaskPlanModal, setShowTaskPlanModal] = useState(false);
    const [showConflictModal, setShowConflictModal] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [markedDates, setMarkedDates] = useState({});

    // Sample data
    const doctorsList: Entity[] = [
        { id: 'dr1', name: 'Dr. Rajesh Sharma', subtitle: 'Cardiologist • Apollo Hospital' },
        { id: 'dr2', name: 'Dr. Priya Patel', subtitle: 'Neurologist • Fortis Hospital' },
        { id: 'dr3', name: 'Dr. Amit Kumar', subtitle: 'Orthopedic • Max Hospital' },
        { id: 'dr4', name: 'Dr. Neha Gupta', subtitle: 'Pediatrician • AIIMS' },
    ];

    const chemistsList: Entity[] = [
        { id: 'ch1', name: 'Apollo Pharmacy', subtitle: 'Connaught Place • Delhi' },
        { id: 'ch2', name: 'MedPlus', subtitle: 'Karol Bagh • Delhi' },
        { id: 'ch3', name: 'Guardian Pharmacy', subtitle: 'Lajpat Nagar • Delhi' },
    ];

    const tourPlansList: Entity[] = [
        { id: 'tp1', name: 'North Delhi Tour', subtitle: 'Hospital Coverage Plan' },
        { id: 'tp2', name: 'South Delhi Route', subtitle: 'Pharmacy Visit Plan' },
        { id: 'tp3', name: 'Central Delhi Circuit', subtitle: 'Mixed Visit Plan' },
    ];

    const locationSuggestions = [
        'Connaught Place, Delhi',
        'Khan Market, Delhi',
        'India Gate, Delhi',
        'Karol Bagh, Delhi',
        'Lajpat Nagar, Delhi',
    ];

    const existingTaskPlanDates = [
        '2025-08-15', '2025-08-16', '2025-08-17',
        '2025-08-25', '2025-08-26', '2025-08-27'
    ];

    const repSchedule: TimeSlot[] = [
        { time: '09:00' },
        {
            time: '10:00',
            task: {
                type: 'meeting',
                title: 'Team Meeting',
                subtitle: '10:00 AM - 11:00 AM',
            }
        },
        { time: '11:00' },
        { time: '12:00' },
        { time: '13:00' },
        {
            time: '14:00',
            task: {
                type: 'chemist',
                title: 'Apollo Pharmacy Visit',
                subtitle: '2:00 PM - 3:00 PM',
            }
        },
        { time: '15:00' },
        { time: '16:00' },
        { time: '17:00' },
        { time: '18:00' },
    ];

    useEffect(() => {
        // Initialize marked dates for calendar
        const marked = {};
        existingTaskPlanDates.forEach(date => {
            marked[date] = { marked: true, dotColor: '#28A745' };
        });
        setMarkedDates(marked);
    }, []);

    // Get entities based on task type
    const getEntitiesList = () => {
        switch (taskData.type) {
            case 'doctor': return doctorsList;
            case 'chemist': return chemistsList;
            case 'tour': return tourPlansList;
            default: return [];
        }
    };

    // Filter entities based on search
    const filteredEntities = getEntitiesList().filter(entity =>
        entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entity.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter locations based on search
    const filteredLocations = locationSuggestions.filter(location =>
        location.toLowerCase().includes(taskData.location?.toLowerCase() || '')
    );

    // Navigation functions
    const goToNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Task type selection
    const selectTaskType = (type: 'doctor' | 'chemist' | 'tour') => {
        setTaskData({ ...taskData, type });
        setTimeout(() => goToNextStep(), 300);
    };

    // Entity selection
    const selectEntity = (entity: Entity) => {
        setTaskData({ ...taskData, entity });
        setShowEntityDropdown(false);
        setSearchQuery('');
        setTimeout(() => goToNextStep(), 300);
    };

    // Date selection
    const selectDate = (date: string) => {
        setTaskData({ ...taskData, date });

        // Check if task plan exists
        if (existingTaskPlanDates.includes(date)) {
            setTimeout(() => goToNextStep(), 300);
        } else {
            setShowTaskPlanModal(true);
        }
    };

    // Time selection
    const handleStartTimeChange = (event: any, selectedDate?: Date) => {
        setShowStartTimePicker(false);
        if (selectedDate) {
            const time = format(selectedDate, 'HH:mm');
            setTaskData({ ...taskData, startTime: time });
            checkTimeConflict(time, taskData.endTime);
        }
    };

    const handleEndTimeChange = (event: any, selectedDate?: Date) => {
        setShowEndTimePicker(false);
        if (selectedDate) {
            const time = format(selectedDate, 'HH:mm');
            setTaskData({ ...taskData, endTime: time });
            checkTimeConflict(taskData.startTime, time);
        }
    };

    const checkTimeConflict = (start: string | null, end: string | null) => {
        if (start && end) {
            // Simple conflict check - in real app would check against actual schedule
            const conflictTimes = ['10:00', '10:30', '11:00', '14:00', '14:30'];
            const hasConflict = conflictTimes.includes(start);
            setTaskData(prev => ({ ...prev, hasConflict }));
        }
    };

    // Location selection
    const selectLocation = (location: string) => {
        setTaskData({ ...taskData, location });
        setShowLocationDropdown(false);
    };

    // Submit functions
    const saveDraft = () => {
        Alert.alert('Success', 'Task saved as draft successfully!', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    const submitTask = () => {
        Alert.alert('Success', 'Task submitted successfully!', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    const cancelTask = () => {
        Alert.alert(
            'Cancel Task Creation',
            'Are you sure you want to cancel?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => router.back() }
            ]
        );
    };

    // Check if current step is valid
    const isStepValid = () => {
        switch (currentStep) {
            case 1: return taskData.type !== null;
            case 2: return taskData.entity !== null;
            case 3: return taskData.date !== null;
            case 4:
                const hasTime = taskData.startTime && taskData.endTime;
                const hasLocation = taskData.type === 'tour' ? taskData.location : true;
                return hasTime && hasLocation;
            default: return false;
        }
    };

    // Render progress indicator
    const renderProgressIndicator = () => (
        <StyledView className="bg-white px-5 py-4 border-b border-gray-200">
            <StyledView className="flex-row justify-between items-center relative">
                {/* Progress line */}
                <StyledView className="absolute left-0 right-0 h-0.5 bg-gray-300 top-4" />

                {[1, 2, 3, 4].map((step) => (
                    <StyledView
                        key={step}
                        className={`w-8 h-8 rounded-full items-center justify-center z-10 ${step === currentStep
                            ? 'bg-[#0077B6] border-2 border-[#0077B6]'
                            : step < currentStep
                                ? 'bg-green-500 border-2 border-green-500'
                                : 'bg-white border-2 border-gray-300'
                            }`}
                    >
                        <StyledText className={`text-xs font-bold ${step <= currentStep ? 'text-white' : 'text-gray-500'
                            }`}>
                            {step < currentStep ? '✓' : step}
                        </StyledText>
                    </StyledView>
                ))}
            </StyledView>
        </StyledView>
    );

    // Render Step 1: Task Type Selection
    const renderTaskTypeSelection = () => (
        <StyledView className="p-5">
            <StyledText className="text-base font-semibold text-gray-900 mb-4">
                Select Task Type
            </StyledText>

            <StyledView className="flex-row justify-between">
                <StyledTouchableOpacity
                    onPress={() => selectTaskType('doctor')}
                    className={`flex-1 bg-white border-2 rounded-xl p-4 mr-2 items-center ${taskData.type === 'doctor' ? 'border-[#0077B6] bg-blue-50' : 'border-gray-200'
                        }`}
                >
                    <StyledText className="text-2xl mb-2">👨‍⚕️</StyledText>
                    <StyledText className="text-xs font-semibold text-gray-900">Doctor Visit</StyledText>
                </StyledTouchableOpacity>

                <StyledTouchableOpacity
                    onPress={() => selectTaskType('chemist')}
                    className={`flex-1 bg-white border-2 rounded-xl p-4 mx-1 items-center ${taskData.type === 'chemist' ? 'border-[#0077B6] bg-blue-50' : 'border-gray-200'
                        }`}
                >
                    <StyledText className="text-2xl mb-2">💊</StyledText>
                    <StyledText className="text-xs font-semibold text-gray-900">Chemist Visit</StyledText>
                </StyledTouchableOpacity>

                <StyledTouchableOpacity
                    onPress={() => selectTaskType('tour')}
                    className={`flex-1 bg-white border-2 rounded-xl p-4 ml-2 items-center ${taskData.type === 'tour' ? 'border-[#0077B6] bg-blue-50' : 'border-gray-200'
                        }`}
                >
                    <StyledText className="text-2xl mb-2">🗺️</StyledText>
                    <StyledText className="text-xs font-semibold text-gray-900">Tour Plan</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );

    // Render Step 2: Entity Selection
    const renderEntitySelection = () => (
        <StyledView className="p-5">
            <StyledText className="text-base font-semibold text-gray-900 mb-4">
                {taskData.type === 'doctor' ? 'Select Doctor' :
                    taskData.type === 'chemist' ? 'Select Chemist' :
                        'Select Tour Plan'}
            </StyledText>

            {taskData.entity ? (
                <StyledView className="bg-blue-50 border border-[#0077B6] rounded-lg p-3 mb-4 flex-row justify-between items-center">
                    <StyledView className="flex-1">
                        <StyledText className="text-sm font-semibold text-gray-900">
                            {taskData.entity.name}
                        </StyledText>
                        <StyledText className="text-xs text-gray-600">
                            {taskData.entity.subtitle}
                        </StyledText>
                    </StyledView>
                    <StyledTouchableOpacity
                        onPress={() => {
                            setTaskData({ ...taskData, entity: null });
                            setShowEntityDropdown(true);
                        }}
                    >
                        <StyledText className="text-xs font-semibold text-[#0077B6]">Change</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            ) : (
                <StyledView>
                    <StyledTextInput
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-base"
                        placeholder={`Search for a ${taskData.type}...`}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFocus={() => setShowEntityDropdown(true)}
                    />

                    {showEntityDropdown && (
                        <StyledView className="bg-white border border-gray-200 rounded-lg mt-2 max-h-48">
                            <ScrollView>
                                {filteredEntities.map(entity => (
                                    <StyledTouchableOpacity
                                        key={entity.id}
                                        onPress={() => selectEntity(entity)}
                                        className="p-3 border-b border-gray-100"
                                    >
                                        <StyledText className="text-sm font-semibold text-gray-900">
                                            {entity.name}
                                        </StyledText>
                                        <StyledText className="text-xs text-gray-600">
                                            {entity.subtitle}
                                        </StyledText>
                                    </StyledTouchableOpacity>
                                ))}
                                {filteredEntities.length === 0 && (
                                    <StyledView className="p-3">
                                        <StyledText className="text-sm text-gray-500 text-center">
                                            No results found
                                        </StyledText>
                                    </StyledView>
                                )}
                            </ScrollView>
                        </StyledView>
                    )}
                </StyledView>
            )}
        </StyledView>
    );

    // Render Step 3: Date Selection
    const renderDateSelection = () => (
        <StyledView className="p-5">
            <StyledText className="text-base font-semibold text-gray-900 mb-4">
                Select Date
            </StyledText>

            <Calendar
                onDayPress={(day) => selectDate(day.dateString)}
                markedDates={{
                    ...markedDates,
                    [taskData.date || '']: {
                        selected: true,
                        selectedColor: '#0077B6',
                        marked: markedDates[taskData.date || '']?.marked
                    }
                }}
                theme={{
                    selectedDayBackgroundColor: '#0077B6',
                    todayTextColor: '#0077B6',
                    arrowColor: '#0077B6',
                }}
            />
        </StyledView>
    );

    // Render Step 4: Time Selection
    const renderTimeSelection = () => (
        <StyledScrollView className="p-5">
            <StyledText className="text-base font-semibold text-gray-900 mb-4">
                Select Time
            </StyledText>

            {/* Time Inputs */}
            <StyledView className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <StyledText className="text-sm font-semibold text-gray-900 mb-3">
                    Meeting Duration
                </StyledText>

                <StyledView className="flex-row justify-between">
                    <StyledView className="flex-1 mr-2">
                        <StyledText className="text-xs font-medium text-gray-700 mb-2">
                            Start Time *
                        </StyledText>
                        <StyledTouchableOpacity
                            onPress={() => setShowStartTimePicker(true)}
                            className="border border-gray-200 rounded-lg px-3 py-2"
                        >
                            <StyledText className="text-sm text-gray-900">
                                {taskData.startTime || 'Select time'}
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    <StyledView className="flex-1 ml-2">
                        <StyledText className="text-xs font-medium text-gray-700 mb-2">
                            End Time *
                        </StyledText>
                        <StyledTouchableOpacity
                            onPress={() => setShowEndTimePicker(true)}
                            className="border border-gray-200 rounded-lg px-3 py-2"
                        >
                            <StyledText className="text-sm text-gray-900">
                                {taskData.endTime || 'Select time'}
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>

            {/* Rep Schedule */}
            <StyledView className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
                <StyledView className="bg-gray-50 p-3 border-b border-gray-200">
                    <StyledText className="text-sm font-semibold text-gray-900">Your Schedule</StyledText>
                    <StyledText className="text-xs text-gray-600">
                        {taskData.date ? format(new Date(taskData.date), 'EEEE, MMMM d, yyyy') : ''}
                    </StyledText>
                </StyledView>

                <StyledView className="p-3">
                    {repSchedule.map((slot, index) => (
                        <StyledView key={index} className="flex-row mb-3">
                            <StyledText className="text-xs font-medium text-gray-600 w-14">
                                {slot.time}
                            </StyledText>
                            <StyledView className="flex-1 ml-3">
                                {slot.task ? (
                                    <StyledView className={`bg-white border rounded-lg p-2 border-l-4 ${slot.task.type === 'meeting' ? 'border-l-blue-500' :
                                        slot.task.type === 'chemist' ? 'border-l-purple-500' :
                                            'border-l-green-500'
                                        }`}>
                                        <StyledText className="text-xs font-semibold text-gray-900">
                                            {slot.task.title}
                                        </StyledText>
                                        <StyledText className="text-xs text-gray-600">
                                            {slot.task.subtitle}
                                        </StyledText>
                                    </StyledView>
                                ) : (
                                    <StyledView className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-2">
                                        <StyledText className="text-xs text-gray-500 text-center">
                                            Available
                                        </StyledText>
                                    </StyledView>
                                )}
                            </StyledView>
                        </StyledView>
                    ))}
                </StyledView>
            </StyledView>

            {/* Location Input (for tours) */}
            {taskData.type === 'tour' && (
                <StyledView className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                    <StyledText className="text-xs font-medium text-gray-700 mb-2">
                        Meeting Location *
                    </StyledText>
                    <StyledTextInput
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        placeholder="Enter location..."
                        value={taskData.location || ''}
                        onChangeText={(text) => {
                            setTaskData({ ...taskData, location: text });
                            setShowLocationDropdown(true);
                        }}
                    />

                    {showLocationDropdown && taskData.location && (
                        <StyledView className="bg-white border border-gray-200 rounded-lg mt-2">
                            {filteredLocations.map((location, index) => (
                                <StyledTouchableOpacity
                                    key={index}
                                    onPress={() => selectLocation(location)}
                                    className="p-3 border-b border-gray-100 flex-row items-center"
                                >
                                    <Ionicons name="location-outline" size={16} color="#6C757D" />
                                    <StyledText className="text-sm text-gray-900 ml-2">
                                        {location}
                                    </StyledText>
                                </StyledTouchableOpacity>
                            ))}
                        </StyledView>
                    )}
                </StyledView>
            )}

            {/* Conflict Warning */}
            {taskData.hasConflict && (
                <StyledView className="bg-red-50 border border-red-200 rounded-lg p-3 flex-row items-center">
                    <Ionicons name="alert-circle" size={20} color="#DC3545" />
                    <StyledText className="text-xs text-red-700 ml-2 flex-1">
                        This time slot conflicts with an existing appointment. You can still create the task, but conflicts should be resolved manually.
                    </StyledText>
                </StyledView>
            )}
        </StyledScrollView>
    );

    // Render current step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return renderTaskTypeSelection();
            case 2: return renderEntitySelection();
            case 3: return renderDateSelection();
            case 4: return renderTimeSelection();
            default: return null;
        }
    };

    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50">
            <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

            {/* Header */}
            <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                <StyledView className="flex-row items-center gap-3">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                        onPress={currentStep > 1 ? goToPreviousStep : () => router.back()}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-xl font-semibold text-gray-900">
                        Create Task
                    </StyledText>
                </StyledView>
            </StyledView>

            {/* Progress Indicator */}
            {renderProgressIndicator()}

            {/* Main Content */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                {renderStepContent()}
            </KeyboardAvoidingView>

            {/* Bottom Actions */}
            <StyledView className="bg-white px-5 py-4 border-t border-gray-200">
                <StyledView className="flex-row gap-3">
                    <StyledTouchableOpacity
                        onPress={cancelTask}
                        className="flex-1 bg-gray-100 py-3 rounded-lg items-center"
                    >
                        <StyledText className="text-sm font-semibold text-gray-600">Cancel</StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        onPress={saveDraft}
                        disabled={currentStep !== 4 || !isStepValid()}
                        className={`flex-1 py-3 rounded-lg items-center ${currentStep === 4 && isStepValid()
                            ? 'bg-gray-600'
                            : 'bg-gray-300'
                            }`}
                    >
                        <StyledText className="text-sm font-semibold text-white">Save Draft</StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        onPress={submitTask}
                        disabled={currentStep !== 4 || !isStepValid()}
                        className={`flex-1 py-3 rounded-lg items-center ${currentStep === 4 && isStepValid()
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                            }`}
                    >
                        <StyledText className="text-sm font-semibold text-white">Submit</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Time Pickers */}
            {showStartTimePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={handleStartTimeChange}
                />
            )}

            {showEndTimePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={handleEndTimeChange}
                />
            )}

            {/* Task Plan Modal */}
            <Modal
                visible={showTaskPlanModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowTaskPlanModal(false)}
            >
                <StyledView className="flex-1 bg-black/50 justify-center items-center">
                    <StyledView className="bg-white rounded-xl p-6 mx-5 max-w-xs">
                        <StyledText className="text-lg font-semibold text-gray-900 mb-3">
                            Task Plan Not Found
                        </StyledText>
                        <StyledText className="text-sm text-gray-600 mb-5">
                            No task plan exists for the selected date. You need to create a task plan first before adding tasks.
                        </StyledText>
                        <StyledView className="flex-row gap-3">
                            <StyledTouchableOpacity
                                onPress={() => {
                                    setShowTaskPlanModal(false);
                                    setTaskData({ ...taskData, date: null });
                                }}
                                className="flex-1 bg-gray-100 py-2 rounded-lg items-center"
                            >
                                <StyledText className="text-sm font-semibold text-gray-600">
                                    Choose Different
                                </StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                onPress={() => {
                                    setShowTaskPlanModal(false);
                                    Alert.alert('Navigate', 'Navigate to Create Task Plan');
                                }}
                                className="flex-1 bg-[#0077B6] py-2 rounded-lg items-center"
                            >
                                <StyledText className="text-sm font-semibold text-white">
                                    Create Plan
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </Modal>

            {/* Conflict Modal */}
            <Modal
                visible={showConflictModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowConflictModal(false)}
            >
                <StyledView className="flex-1 bg-black/50 justify-center items-center">
                    <StyledView className="bg-white rounded-xl p-6 mx-5 max-w-xs">
                        <StyledText className="text-lg font-semibold text-gray-900 mb-3">
                            Scheduling Conflict
                        </StyledText>
                        <StyledText className="text-sm text-gray-600 mb-5">
                            The selected time conflicts with:{'\n\n'}
                            <StyledText className="font-semibold">Team Meeting</StyledText>{'\n'}
                            11:00 AM - 12:00 PM
                        </StyledText>
                        <StyledView className="flex-row gap-3">
                            <StyledTouchableOpacity
                                onPress={() => setShowConflictModal(false)}
                                className="flex-1 bg-gray-100 py-2 rounded-lg items-center"
                            >
                                <StyledText className="text-sm font-semibold text-gray-600">
                                    Different Time
                                </StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                onPress={() => {
                                    setShowConflictModal(false);
                                    setTaskData({ ...taskData, hasConflict: true });
                                }}
                                className="flex-1 bg-[#0077B6] py-2 rounded-lg items-center"
                            >
                                <StyledText className="text-sm font-semibold text-white">
                                    Create Anyway
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </Modal>
        </StyledSafeAreaView>
    );
}