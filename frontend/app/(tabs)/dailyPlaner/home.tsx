import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Alert,
    ActivityIndicator,
    RefreshControl,
    Dimensions,
} from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { format, addDays, subDays } from 'date-fns';

// Import Task Card Components
import DoctorVisitCard, { dummyDoctorVisits } from '../../../components/doctorVisitCard';
import ChemistVisitCard, { dummyChemistVisits } from '../../../components/chemistVisitCard';
import TourPlanCard, { dummyTourPlans } from '../../../components/tourPlanCard';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const { width: screenWidth } = Dimensions.get('window');

// Unified Task type for all task types
interface UnifiedTask {
    id: string;
    type: 'doctor' | 'chemist' | 'tour';
    time: string;
    completionStatus: 'pending' | 'completed' | 'rescheduled';
    approvalStatus: 'draft' | 'pending' | 'approved' | 'rejected';
    hasConflict?: boolean;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    // Type-specific data
    data: any;
}

interface QuickStats {
    totalTasks: number;
    doctors: number;
    chemists: number;
    completionPercentage: number;
}

export default function DailyPlanner() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tasks, setTasks] = useState<UnifiedTask[]>([]);
    const [stats, setStats] = useState<QuickStats>({
        totalTasks: 0,
        doctors: 0,
        chemists: 0,
        completionPercentage: 0,
    });
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [mapExpanded, setMapExpanded] = useState(false);

    // Load tasks on date change
    useEffect(() => {
        loadDailyTasks();
    }, [selectedDate]);

    const loadDailyTasks = () => {
        setLoading(true);

        // Simulate API call - combine all dummy data
        setTimeout(() => {
            // Convert component dummy data to unified task format
            const doctorTasks: UnifiedTask[] = dummyDoctorVisits.slice(0, 2).map(doc => ({
                id: doc.id,
                type: 'doctor' as const,
                time: doc.time,
                completionStatus: doc.completionStatus,
                approvalStatus: doc.approvalStatus,
                hasConflict: doc.hasConflict,
                coordinates: doc.coordinates,
                data: doc,
            }));

            const chemistTasks: UnifiedTask[] = dummyChemistVisits.slice(0, 2).map(chem => ({
                id: chem.id,
                type: 'chemist' as const,
                time: chem.time,
                completionStatus: chem.completionStatus,
                approvalStatus: chem.approvalStatus,
                hasConflict: chem.hasConflict,
                coordinates: chem.coordinates,
                data: chem,
            }));

            const tourTasks: UnifiedTask[] = dummyTourPlans.slice(0, 1).map(tour => ({
                id: tour.id,
                type: 'tour' as const,
                time: tour.time,
                completionStatus: tour.completionStatus,
                approvalStatus: tour.approvalStatus,
                hasConflict: tour.hasConflict,
                coordinates: tour.coordinates,
                data: tour,
            }));

            const allTasks = [...doctorTasks, ...chemistTasks, ...tourTasks];
            setTasks(allTasks);

            // Calculate stats
            const completedTasks = allTasks.filter(t => t.completionStatus === 'completed').length;
            setStats({
                totalTasks: allTasks.length,
                doctors: doctorTasks.length,
                chemists: chemistTasks.length,
                completionPercentage: Math.round((completedTasks / allTasks.length) * 100) || 0,
            });

            setLoading(false);
        }, 1000);
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadDailyTasks();
        setTimeout(() => setRefreshing(false), 1500);
    };

    const navigateDate = (direction: 'prev' | 'next') => {
        const newDate = direction === 'next'
            ? addDays(selectedDate, 1)
            : subDays(selectedDate, 1);
        setSelectedDate(newDate);
    };

    const getTaskColor = (type: string) => {
        switch (type) {
            case 'doctor': return '#1976D2';
            case 'chemist': return '#7B1FA2';
            case 'tour': return '#388E3C';
            default: return '#6C757D';
        }
    };

    const handleTaskPress = (task: UnifiedTask) => {
        Alert.alert('Task Details', `Opening ${task.type} task details...`);
    };

    const handleCreateTask = () => {
        console.log('pressed');
        router.push('/dailyPlaner/createTasks');
    };

    const handleConflictPress = (task: UnifiedTask) => {
        Alert.alert(
            'Scheduling Conflict',
            `This appointment overlaps with:\n• Team Meeting (11:00-12:00)\n• Travel time from previous location\n\nRecommendation: Reschedule to 12:30 PM`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Reschedule', onPress: () => console.log('Reschedule task') },
            ]
        );
    };

    const handleOpenMap = () => {
        Alert.alert('Map View', 'Opening full map view...');
    };

    // Render the appropriate card based on task type
    const renderTaskCard = (task: UnifiedTask) => {
        switch (task.type) {
            case 'doctor':
                return (
                    <DoctorVisitCard
                        key={task.id}
                        {...task.data}
                        onPress={() => handleTaskPress(task)}
                        onConflictPress={() => handleConflictPress(task)}
                    />
                );
            case 'chemist':
                return (
                    <ChemistVisitCard
                        key={task.id}
                        {...task.data}
                        onPress={() => handleTaskPress(task)}
                        onConflictPress={() => handleConflictPress(task)}
                    />
                );
            case 'tour':
                return (
                    <TourPlanCard
                        key={task.id}
                        {...task.data}
                        onPress={() => handleTaskPress(task)}
                        onConflictPress={() => handleConflictPress(task)}
                    />
                );
            default:
                return null;
        }
    };

    // Sort tasks by time for chronological display
    const sortTasksByTime = (tasks: UnifiedTask[]) => {
        return tasks.sort((a, b) => {
            const timeA = new Date(`2000/01/01 ${a.time}`).getTime();
            const timeB = new Date(`2000/01/01 ${b.time}`).getTime();
            return timeA - timeB;
        });
    };

    // Map Marker Component
    const renderMapMarker = (task: UnifiedTask, index: number) => {
        const positions = [
            { top: '30%', left: '25%' },
            { top: '60%', right: '30%' },
            { bottom: '25%', left: '40%' },
            { top: '45%', right: '25%' },
            { top: '20%', right: '45%' },
        ];

        const position = positions[index] || { top: '50%', left: '50%' };

        return (
            <StyledTouchableOpacity
                key={task.id}
                className="absolute w-8 h-8 rounded-full items-center justify-center shadow-lg"
                style={{
                    backgroundColor: getTaskColor(task.type),
                    ...position,
                }}
                onPress={() => handleTaskPress(task)}
            >
                <StyledText className="text-white font-semibold text-xs">{index + 1}</StyledText>
            </StyledTouchableOpacity>
        );
    };

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

                {/* Title Bar */}
                <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                    <StyledView className="flex-row items-center gap-3">
                        <StyledTouchableOpacity
                            className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className="text-xl font-semibold text-gray-900">
                            Daily Planner
                        </StyledText>
                    </StyledView>
                </StyledView>

                {/* Loading Indicator */}
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-4">Loading schedule...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50">
            <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

            {/* Title Bar */}
            <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                <StyledView className="flex-row items-center gap-3">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-xl font-semibold text-gray-900">
                        Daily Planner
                    </StyledText>
                </StyledView>
                <StyledTouchableOpacity
                    className="bg-green-500 rounded-full w-10 h-10 items-center justify-center shadow-lg"
                    onPress={handleCreateTask}
                >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                </StyledTouchableOpacity>
            </StyledView>

            {/* Date Navigation */}
            <StyledView className="bg-white px-4 py-3 border-b border-gray-200">
                <StyledView className="flex-row justify-between items-center mb-3">
                    <StyledText className="text-xl font-bold text-gray-900">
                        {format(selectedDate, 'EEEE, MMM d')}
                    </StyledText>
                    <StyledView className="flex-row">
                        <StyledTouchableOpacity
                            className="bg-gray-50 border border-gray-200 rounded-md p-2 mr-2"
                            onPress={() => navigateDate('prev')}
                        >
                            <Ionicons name="chevron-back" size={20} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity
                            className="bg-gray-50 border border-gray-200 rounded-md p-2"
                            onPress={() => navigateDate('next')}
                        >
                            <Ionicons name="chevron-forward" size={20} color="#6C757D" />
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>

                {/* Quick Stats */}
                <StyledView className="flex-row">
                    <StyledTouchableOpacity className="flex-1 items-center py-3 px-2 bg-blue-50 rounded-lg border border-blue-100 mr-2">
                        <StyledText className="text-lg font-bold text-[#0077B6]">{stats.totalTasks}</StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="flex-1 items-center py-3 px-2 bg-blue-50 rounded-lg border border-blue-100 mr-2">
                        <StyledText className="text-lg font-bold text-[#0077B6]">{stats.doctors}</StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Doctors</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="flex-1 items-center py-3 px-2 bg-blue-50 rounded-lg border border-blue-100 mr-2">
                        <StyledText className="text-lg font-bold text-[#0077B6]">{stats.chemists}</StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Chemists</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="flex-1 items-center py-3 px-1 bg-blue-50 rounded-lg border border-blue-100">
                        <StyledText className="text-lg font-bold text-[#0077B6]">{stats.completionPercentage}%</StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Complete</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Main Content */}
            <StyledScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Map Section - Visual Representation */}
                <StyledView className="bg-white mb-2">
                    <StyledView className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
                        <StyledText className="text-base font-semibold text-gray-900">
                            Route Overview
                        </StyledText>
                        <StyledTouchableOpacity
                            className="flex-row items-center gap-1 px-3 py-1.5 border border-[#0077B6] rounded-md"
                            onPress={handleOpenMap}
                        >
                            <Ionicons name="map-outline" size={16} color="#0077B6" />
                            <StyledText className="text-xs font-medium text-[#0077B6]">
                                Full Map
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    {/* Map Placeholder with Visual Markers */}
                    <StyledTouchableOpacity
                        className={`mx-4 my-3 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 ${mapExpanded ? 'h-80' : 'h-48'}`}
                        onPress={handleOpenMap}
                        activeOpacity={0.8}
                    >
                        <StyledView className="flex-1 relative">
                            {/* Background Pattern */}
                            <StyledView className="absolute inset-0 opacity-10">
                                <StyledView className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-400" />
                                <StyledView className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-300" />
                                <StyledView className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-blue-500" />
                            </StyledView>

                            {/* Route Lines (Visual representation) */}
                            <StyledView className="absolute top-12 left-16 w-24 h-0.5 bg-[#0077B6] opacity-60 rotate-12" />
                            <StyledView className="absolute top-24 right-20 w-20 h-0.5 bg-[#0077B6] opacity-60 -rotate-12" />
                            <StyledView className="absolute bottom-20 left-24 w-28 h-0.5 bg-[#0077B6] opacity-60 rotate-45" />

                            {/* Map Markers */}
                            {tasks.map((task, index) => renderMapMarker(task, index))}

                            {/* Center Text */}
                            <StyledView className="absolute inset-0 items-center justify-center">
                                <StyledView className="bg-white/90 px-4 py-2 rounded-lg">
                                    <StyledText className="text-xs font-medium text-gray-600 text-center">
                                        {tasks.length} locations planned
                                    </StyledText>
                                    <StyledText className="text-xs text-gray-500 text-center">
                                        Tap to view full map
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>
                    </StyledTouchableOpacity>

                    <StyledView className="mx-4 mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex-row items-center">
                        <Ionicons name="car-outline" size={16} color="#1976D2" />
                        <StyledText className="text-xs font-medium text-blue-700 ml-2">
                            Total distance: 42 km • Estimated drive time: 2h 15m
                        </StyledText>
                    </StyledView>
                </StyledView>

                {/* Schedule Section */}
                <StyledView className="bg-white">
                    <StyledView className="px-4 py-3 border-b border-gray-200">
                        <StyledText className="text-base font-semibold text-gray-900 mb-1">
                            Today's Schedule
                        </StyledText>
                        <StyledText className="text-xs text-gray-500">
                            {tasks.length} tasks scheduled • {tasks.filter(t => t.completionStatus === 'completed').length} completed
                        </StyledText>
                    </StyledView>

                    <StyledView className="pb-4">
                        {sortTasksByTime(tasks).map((task) => renderTaskCard(task))}
                    </StyledView>
                </StyledView>
            </StyledScrollView>
        </StyledSafeAreaView>
    );
}