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
    ActivityIndicator,
} from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import taskPlannerService from '../../../services/taskPlannerService';
import taskService from '../../../services/taskService';
import doctorService from '../../../services/doctorService';
import chemistService from '../../../services/chemistService';

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
    const params = useLocalSearchParams();

    // Get params
    const initialPlannerId = params.taskPlannerId as string;
    const returnTo = params.returnTo as string;

    // State
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [currentPlannerId, setCurrentPlannerId] = useState<string | null>(initialPlannerId || null);

    const [taskData, setTaskData] = useState<TaskData>({
        type: null,
        entity: null,
        date: null,
        startTime: null,
        endTime: null,
        location: null,
        hasConflict: false,
    });

    // Planner details
    const [plannerStartDate, setPlannerStartDate] = useState<string | null>(null);
    const [plannerEndDate, setPlannerEndDate] = useState<string | null>(null);
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [allPlanners, setAllPlanners] = useState<any[]>([]);

    // UI States
    const [searchQuery, setSearchQuery] = useState('');
    const [showEntityDropdown, setShowEntityDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [markedDates, setMarkedDates] = useState({});

    // Data lists
    const [doctorsList, setDoctorsList] = useState<Entity[]>([]);
    const [chemistsList, setChemistsList] = useState<Entity[]>([]);
    const [tourPlansList, setTourPlansList] = useState<Entity[]>([]);

    const locationSuggestions = [
        'Connaught Place, Delhi',
        'Khan Market, Delhi',
        'India Gate, Delhi',
        'Karol Bagh, Delhi',
        'Lajpat Nagar, Delhi',
    ];

    const repSchedule: TimeSlot[] = [
        { time: '09:00' },
        { time: '10:00', task: { type: 'meeting', title: 'Team Meeting', subtitle: '10:00 AM - 11:00 AM' } },
        { time: '11:00' },
        { time: '12:00' },
        { time: '13:00' },
        { time: '14:00', task: { type: 'chemist', title: 'Apollo Pharmacy Visit', subtitle: '2:00 PM - 3:00 PM' } },
        { time: '15:00' },
        { time: '16:00' },
        { time: '17:00' },
        { time: '18:00' },
    ];

    // Load initial data
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        setLoading(true);
        try {
            // Load entities
            await loadEntitiesData();

            // Load planner details
            if (currentPlannerId) {
                await loadPlannerDetails(currentPlannerId);
            } else {
                await loadAvailablePlanners();
            }
        } catch (error) {
            console.error('Error loading initial data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadEntitiesData = async () => {
        try {
            // Load doctors
            const doctors = await doctorService.getDoctorList();
            const transformedDoctors = doctors.map(doc => ({
                id: doc.doctorId,
                name: doc.doctorName,
                subtitle: `${doc.specialization} • ${doc.hospitals?.[0]?.hospitalName || 'No hospital'}`,
            }));
            setDoctorsList(transformedDoctors);

            // Load chemists
            const chemists = await chemistService.getChemistList();
            const transformedChemists = chemists.map(chem => ({
                id: chem.chemistId,
                name: chem.chemistName,
                subtitle: `${chem.type || 'Retail'} • ${chem.address || 'No address'}`,
            }));
            setChemistsList(transformedChemists);

            // Load tour plans - using dummy data for now
            setTourPlansList([
                { id: 'tp1', name: 'North Delhi Tour', subtitle: 'Hospital Coverage Plan' },
                { id: 'tp2', name: 'South Delhi Route', subtitle: 'Pharmacy Visit Plan' },
                { id: 'tp3', name: 'Central Delhi Circuit', subtitle: 'Mixed Visit Plan' },
            ]);
        } catch (error) {
            console.error('Error loading entities:', error);
            // Use fallback data
            setDoctorsList([
                { id: 'dr1', name: 'Dr. Rajesh Sharma', subtitle: 'Cardiologist • Apollo Hospital' },
                { id: 'dr2', name: 'Dr. Priya Patel', subtitle: 'Neurologist • Fortis Hospital' },
            ]);
            setChemistsList([
                { id: 'ch1', name: 'Apollo Pharmacy', subtitle: 'Connaught Place • Delhi' },
                { id: 'ch2', name: 'MedPlus', subtitle: 'Karol Bagh • Delhi' },
            ]);
        }
    };

    const loadPlannerDetails = async (plannerId: string) => {
        try {
            const planners = await taskPlannerService.getTaskPlanners();
            const planner = planners.find(p => p.id === plannerId);

            if (planner) {
                setPlannerStartDate(planner.startDate);
                setPlannerEndDate(planner.endDate);

                // Generate available dates
                const dates = [];
                const start = new Date(planner.startDate);
                const end = new Date(planner.endDate);

                while (start <= end) {
                    dates.push(format(start, 'yyyy-MM-dd'));
                    start.setDate(start.getDate() + 1);
                }

                setAvailableDates(dates);
                updateMarkedDates(dates);
            }
        } catch (error) {
            console.error('Error loading planner details:', error);
        }
    };

    const loadAvailablePlanners = async () => {
        try {
            const planners = await taskPlannerService.getTaskPlanners();
            setAllPlanners(planners);

            const dates = [];
            planners.forEach(planner => {
                const start = new Date(planner.startDate);
                const end = new Date(planner.endDate);

                while (start <= end) {
                    const dateStr = format(start, 'yyyy-MM-dd');
                    if (!dates.includes(dateStr)) {
                        dates.push(dateStr);
                    }
                    start.setDate(start.getDate() + 1);
                }
            });

            setAvailableDates(dates);
            updateMarkedDates(dates);
        } catch (error) {
            console.error('Error loading available planners:', error);
        }
    };

    const updateMarkedDates = (dates: string[]) => {
        const marked = {};
        dates.forEach(date => {
            marked[date] = { marked: true, dotColor: '#28A745' };
        });
        setMarkedDates(marked);
    };

    const findPlannerForDate = (date: string): string | null => {
        const planner = allPlanners.find(p => {
            const start = new Date(p.startDate);
            const end = new Date(p.endDate);
            const selected = new Date(date);
            return selected >= start && selected <= end;
        });

        return planner ? planner.id : null;
    };

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

    // Filter locations
    const filteredLocations = locationSuggestions.filter(location =>
        location.toLowerCase().includes(taskData.location?.toLowerCase() || '')
    );

    // Navigation
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
    const selectDate = (dateObj: any) => {
        const date = dateObj.dateString;

        if (!availableDates.includes(date)) {
            Alert.alert(
                'No Task Planner',
                'No task planner exists for this date. Please select a date with an existing task planner.',
                [{ text: 'OK' }]
            );
            return;
        }

        setTaskData({ ...taskData, date });

        // Find planner for date if not already set
        if (!currentPlannerId) {
            const plannerId = findPlannerForDate(date);
            if (plannerId) {
                setCurrentPlannerId(plannerId);
                loadPlannerDetails(plannerId);
            }
        }

        setTimeout(() => goToNextStep(), 300);
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
    const saveDraft = async () => {
        if (!currentPlannerId) {
            Alert.alert('Error', 'No task planner selected');
            return;
        }

        Alert.alert('Success', 'Task saved as draft successfully!', [
            {
                text: 'OK',
                onPress: () => navigateBack()
            }
        ]);
    };

    const submitTask = async () => {
        if (!currentPlannerId) {
            Alert.alert('Error', 'No task planner selected');
            return;
        }

        setLoading(true);
        try {
            await taskService.createTask({
                taskPlannerId: currentPlannerId,
                type: taskData.type === 'tour' ? 'tourplan' : taskData.type!,
                type_id: taskData.entity!.id,
                date: taskData.date!,
                startTime: taskData.startTime! + ':00',
                endTime: taskData.endTime! + ':00',
                location: taskData.location || '',
            });

            Alert.alert('Success', 'Task created successfully!', [
                {
                    text: 'OK',
                    onPress: () => navigateBack()
                }
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    const navigateBack = () => {
        if (returnTo === 'createTaskPlanner') {
            router.back();
        } else {
            router.replace('/dailyPlaner/home');
        }
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

            {currentPlannerId && plannerStartDate && plannerEndDate && (
                <StyledView className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <StyledText className="text-xs font-medium text-blue-700">
                        Task Planner Range: {format(new Date(plannerStartDate), 'MMM d')} - {format(new Date(plannerEndDate), 'MMM d, yyyy')}
                    </StyledText>
                </StyledView>
            )}

            <Calendar
                onDayPress={selectDate}
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

            {availableDates.length === 0 && (
                <StyledView className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <StyledText className="text-xs text-yellow-700">
                        No task planners found. Please create a task planner first.
                    </StyledText>
                </StyledView>
            )}
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

    if (loading) {
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
                        disabled={currentStep !== 4 || !isStepValid() || loading}
                        className={`flex-1 py-3 rounded-lg items-center ${currentStep === 4 && isStepValid()
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                            }`}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <StyledText className="text-sm font-semibold text-white">Submit</StyledText>
                        )}
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
        </StyledSafeAreaView>
    );
}