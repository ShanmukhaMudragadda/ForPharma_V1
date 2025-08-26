// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TouchableOpacity,
//     SafeAreaView,
//     StatusBar,
//     Alert,
//     ActivityIndicator,
//     RefreshControl,
//     Dimensions,
// } from 'react-native';
// import { styled } from 'nativewind';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { format, addDays, subDays } from 'date-fns';

// // Import Task Card Components
// import DoctorVisitCard, { dummyDoctorVisits } from '../../../components/doctorVisitCard';
// import ChemistVisitCard, { dummyChemistVisits } from '../../../components/chemistVisitCard';
// import TourPlanCard, { dummyTourPlans } from '../../../components/tourPlanCard';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledScrollView = styled(ScrollView);
// const StyledTouchableOpacity = styled(TouchableOpacity);
// const StyledSafeAreaView = styled(SafeAreaView);

// const { width: screenWidth } = Dimensions.get('window');

// // Unified Task type for all task types
// interface UnifiedTask {
//     id: string;
//     type: 'doctor' | 'chemist' | 'tour';
//     time: string;
//     completionStatus: 'pending' | 'completed' | 'rescheduled';
//     approvalStatus: 'draft' | 'pending' | 'approved' | 'rejected';
//     hasConflict?: boolean;
//     coordinates?: {
//         latitude: number;
//         longitude: number;
//     };
//     // Type-specific data
//     data: any;
// }

// interface QuickStats {
//     totalTasks: number;
//     doctors: number;
//     chemists: number;
//     completionPercentage: number;
// }

// export default function DailyPlanner() {
//     const router = useRouter();
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [tasks, setTasks] = useState<UnifiedTask[]>([]);
//     const [stats, setStats] = useState<QuickStats>({
//         totalTasks: 0,
//         doctors: 0,
//         chemists: 0,
//         completionPercentage: 0,
//     });
//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);
//     const [mapExpanded, setMapExpanded] = useState(false);

//     // Load tasks on date change
//     useEffect(() => {
//         loadDailyTasks();
//     }, [selectedDate]);

//     const loadDailyTasks = () => {
//         setLoading(true);

//         // Simulate API call - combine all dummy data
//         setTimeout(() => {
//             // Convert component dummy data to unified task format
//             const doctorTasks: UnifiedTask[] = dummyDoctorVisits.slice(0, 2).map(doc => ({
//                 id: doc.id,
//                 type: 'doctor' as const,
//                 time: doc.time,
//                 completionStatus: doc.completionStatus,
//                 approvalStatus: doc.approvalStatus,
//                 hasConflict: doc.hasConflict,
//                 coordinates: doc.coordinates,
//                 data: doc,
//             }));

//             const chemistTasks: UnifiedTask[] = dummyChemistVisits.slice(0, 2).map(chem => ({
//                 id: chem.id,
//                 type: 'chemist' as const,
//                 time: chem.time,
//                 completionStatus: chem.completionStatus,
//                 approvalStatus: chem.approvalStatus,
//                 hasConflict: chem.hasConflict,
//                 coordinates: chem.coordinates,
//                 data: chem,
//             }));

//             const tourTasks: UnifiedTask[] = dummyTourPlans.slice(0, 1).map(tour => ({
//                 id: tour.id,
//                 type: 'tour' as const,
//                 time: tour.time,
//                 completionStatus: tour.completionStatus,
//                 approvalStatus: tour.approvalStatus,
//                 hasConflict: tour.hasConflict,
//                 coordinates: tour.coordinates,
//                 data: tour,
//             }));

//             const allTasks = [...doctorTasks, ...chemistTasks, ...tourTasks];
//             setTasks(allTasks);

//             // Calculate stats
//             const completedTasks = allTasks.filter(t => t.completionStatus === 'completed').length;
//             setStats({
//                 totalTasks: allTasks.length,
//                 doctors: doctorTasks.length,
//                 chemists: chemistTasks.length,
//                 completionPercentage: Math.round((completedTasks / allTasks.length) * 100) || 0,
//             });

//             setLoading(false);
//         }, 1000);
//     };

//     const onRefresh = () => {
//         setRefreshing(true);
//         loadDailyTasks();
//         setTimeout(() => setRefreshing(false), 1500);
//     };

//     const navigateDate = (direction: 'prev' | 'next') => {
//         const newDate = direction === 'next'
//             ? addDays(selectedDate, 1)
//             : subDays(selectedDate, 1);
//         setSelectedDate(newDate);
//     };

//     const getTaskColor = (type: string) => {
//         switch (type) {
//             case 'doctor': return '#1976D2';
//             case 'chemist': return '#7B1FA2';
//             case 'tour': return '#388E3C';
//             default: return '#6C757D';
//         }
//     };

//     const handleTaskPress = (task: UnifiedTask) => {
//         Alert.alert('Task Details', `Opening ${task.type} task details...`);
//     };

//     const handleCreateTask = () => {
//         console.log('pressed');
//         router.push('/dailyPlaner/createTasks');
//     };

//     const handleConflictPress = (task: UnifiedTask) => {
//         Alert.alert(
//             'Scheduling Conflict',
//             `This appointment overlaps with:\n• Team Meeting (11:00-12:00)\n• Travel time from previous location\n\nRecommendation: Reschedule to 12:30 PM`,
//             [
//                 { text: 'Cancel', style: 'cancel' },
//                 { text: 'Reschedule', onPress: () => console.log('Reschedule task') },
//             ]
//         );
//     };

//     const handleOpenMap = () => {
//         Alert.alert('Map View', 'Opening full map view...');
//     };

//     // Render the appropriate card based on task type
//     const renderTaskCard = (task: UnifiedTask) => {
//         switch (task.type) {
//             case 'doctor':
//                 return (
//                     <DoctorVisitCard
//                         key={task.id}
//                         {...task.data}
//                         onPress={() => handleTaskPress(task)}
//                         onConflictPress={() => handleConflictPress(task)}
//                     />
//                 );
//             case 'chemist':
//                 return (
//                     <ChemistVisitCard
//                         key={task.id}
//                         {...task.data}
//                         onPress={() => handleTaskPress(task)}
//                         onConflictPress={() => handleConflictPress(task)}
//                     />
//                 );
//             case 'tour':
//                 return (
//                     <TourPlanCard
//                         key={task.id}
//                         {...task.data}
//                         onPress={() => handleTaskPress(task)}
//                         onConflictPress={() => handleConflictPress(task)}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };

//     // Sort tasks by time for chronological display
//     const sortTasksByTime = (tasks: UnifiedTask[]) => {
//         return tasks.sort((a, b) => {
//             const timeA = new Date(`2000/01/01 ${a.time}`).getTime();
//             const timeB = new Date(`2000/01/01 ${b.time}`).getTime();
//             return timeA - timeB;
//         });
//     };

//     // Map Marker Component
//     const renderMapMarker = (task: UnifiedTask, index: number) => {
//         const positions = [
//             { top: '30%', left: '25%' },
//             { top: '60%', right: '30%' },
//             { bottom: '25%', left: '40%' },
//             { top: '45%', right: '25%' },
//             { top: '20%', right: '45%' },
//         ];

//         const position = positions[index] || { top: '50%', left: '50%' };

//         return (
//             <StyledTouchableOpacity
//                 key={task.id}
//                 className="absolute w-8 h-8 rounded-full items-center justify-center shadow-lg"
//                 style={{
//                     backgroundColor: getTaskColor(task.type),
//                     ...position,
//                 }}
//                 onPress={() => handleTaskPress(task)}
//             >
//                 <StyledText className="text-white font-semibold text-xs">{index + 1}</StyledText>
//             </StyledTouchableOpacity>
//         );
//     };

//     // Loading state
//     if (loading) {
//         return (
//             <StyledSafeAreaView className="flex-1 bg-gray-50">
//                 <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

//                 {/* Title Bar */}
//                 <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
//                     <StyledView className="flex-row items-center gap-3">
//                         <StyledTouchableOpacity
//                             className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
//                             onPress={() => router.back()}
//                         >
//                             <Ionicons name="arrow-back" size={18} color="#6C757D" />
//                         </StyledTouchableOpacity>
//                         <StyledText className="text-xl font-semibold text-gray-900">
//                             Daily Planner
//                         </StyledText>
//                     </StyledView>
//                 </StyledView>

//                 {/* Loading Indicator */}
//                 <StyledView className="flex-1 justify-center items-center">
//                     <ActivityIndicator size="large" color="#0077B6" />
//                     <StyledText className="text-gray-600 mt-4">Loading schedule...</StyledText>
//                 </StyledView>
//             </StyledSafeAreaView>
//         );
//     }

//     return (
//         <StyledSafeAreaView className="flex-1 bg-gray-50">
//             <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

//             {/* Title Bar */}
//             <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
//                 <StyledView className="flex-row items-center gap-3">
//                     <StyledTouchableOpacity
//                         className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
//                         onPress={() => router.back()}
//                     >
//                         <Ionicons name="arrow-back" size={18} color="#6C757D" />
//                     </StyledTouchableOpacity>
//                     <StyledText className="text-xl font-semibold text-gray-900">
//                         Daily Planner
//                     </StyledText>
//                 </StyledView>
//                 <StyledTouchableOpacity
//                     className="bg-green-500 rounded-full w-10 h-10 items-center justify-center shadow-lg"
//                     onPress={handleCreateTask}
//                 >
//                     <Ionicons name="add" size={24} color="#FFFFFF" />
//                 </StyledTouchableOpacity>
//             </StyledView>

//             {/* Date Navigation */}
//             <StyledView className="bg-white px-4 py-3 border-b border-gray-200">
//                 <StyledView className="flex-row justify-between items-center mb-3">
//                     <StyledText className="text-xl font-bold text-gray-900">
//                         {format(selectedDate, 'EEEE, MMM d')}
//                     </StyledText>
//                     <StyledView className="flex-row">
//                         <StyledTouchableOpacity
//                             className="bg-gray-50 border border-gray-200 rounded-md p-2 mr-2"
//                             onPress={() => navigateDate('prev')}
//                         >
//                             <Ionicons name="chevron-back" size={20} color="#6C757D" />
//                         </StyledTouchableOpacity>
//                         <StyledTouchableOpacity
//                             className="bg-gray-50 border border-gray-200 rounded-md p-2"
//                             onPress={() => navigateDate('next')}
//                         >
//                             <Ionicons name="chevron-forward" size={20} color="#6C757D" />
//                         </StyledTouchableOpacity>
//                     </StyledView>
//                 </StyledView>

//                 {/* Quick Stats */}
//                 <StyledView className="flex-row">
//                     <StyledTouchableOpacity className="flex-1 items-center py-3 px-2 bg-blue-50 rounded-lg border border-blue-100 mr-2">
//                         <StyledText className="text-lg font-bold text-[#0077B6]">{stats.totalTasks}</StyledText>
//                         <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</StyledText>
//                     </StyledTouchableOpacity>
//                     <StyledTouchableOpacity className="flex-1 items-center py-3 px-2 bg-blue-50 rounded-lg border border-blue-100 mr-2">
//                         <StyledText className="text-lg font-bold text-[#0077B6]">{stats.doctors}</StyledText>
//                         <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Doctors</StyledText>
//                     </StyledTouchableOpacity>
//                     <StyledTouchableOpacity className="flex-1 items-center py-3 px-2 bg-blue-50 rounded-lg border border-blue-100 mr-2">
//                         <StyledText className="text-lg font-bold text-[#0077B6]">{stats.chemists}</StyledText>
//                         <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Chemists</StyledText>
//                     </StyledTouchableOpacity>
//                     <StyledTouchableOpacity className="flex-1 items-center py-3 px-1 bg-blue-50 rounded-lg border border-blue-100">
//                         <StyledText className="text-lg font-bold text-[#0077B6]">{stats.completionPercentage}%</StyledText>
//                         <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Complete</StyledText>
//                     </StyledTouchableOpacity>
//                 </StyledView>
//             </StyledView>

//             {/* Main Content */}
//             <StyledScrollView
//                 className="flex-1"
//                 showsVerticalScrollIndicator={false}
//                 refreshControl={
//                     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                 }
//             >
//                 {/* Map Section - Visual Representation */}
//                 <StyledView className="bg-white mb-2">
//                     <StyledView className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
//                         <StyledText className="text-base font-semibold text-gray-900">
//                             Route Overview
//                         </StyledText>
//                         <StyledTouchableOpacity
//                             className="flex-row items-center gap-1 px-3 py-1.5 border border-[#0077B6] rounded-md"
//                             onPress={handleOpenMap}
//                         >
//                             <Ionicons name="map-outline" size={16} color="#0077B6" />
//                             <StyledText className="text-xs font-medium text-[#0077B6]">
//                                 Full Map
//                             </StyledText>
//                         </StyledTouchableOpacity>
//                     </StyledView>

//                     {/* Map Placeholder with Visual Markers */}
//                     <StyledTouchableOpacity
//                         className={`mx-4 my-3 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 ${mapExpanded ? 'h-80' : 'h-48'}`}
//                         onPress={handleOpenMap}
//                         activeOpacity={0.8}
//                     >
//                         <StyledView className="flex-1 relative">
//                             {/* Background Pattern */}
//                             <StyledView className="absolute inset-0 opacity-10">
//                                 <StyledView className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-400" />
//                                 <StyledView className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-300" />
//                                 <StyledView className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-blue-500" />
//                             </StyledView>

//                             {/* Route Lines (Visual representation) */}
//                             <StyledView className="absolute top-12 left-16 w-24 h-0.5 bg-[#0077B6] opacity-60 rotate-12" />
//                             <StyledView className="absolute top-24 right-20 w-20 h-0.5 bg-[#0077B6] opacity-60 -rotate-12" />
//                             <StyledView className="absolute bottom-20 left-24 w-28 h-0.5 bg-[#0077B6] opacity-60 rotate-45" />

//                             {/* Map Markers */}
//                             {tasks.map((task, index) => renderMapMarker(task, index))}

//                             {/* Center Text */}
//                             <StyledView className="absolute inset-0 items-center justify-center">
//                                 <StyledView className="bg-white/90 px-4 py-2 rounded-lg">
//                                     <StyledText className="text-xs font-medium text-gray-600 text-center">
//                                         {tasks.length} locations planned
//                                     </StyledText>
//                                     <StyledText className="text-xs text-gray-500 text-center">
//                                         Tap to view full map
//                                     </StyledText>
//                                 </StyledView>
//                             </StyledView>
//                         </StyledView>
//                     </StyledTouchableOpacity>

//                     <StyledView className="mx-4 mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex-row items-center">
//                         <Ionicons name="car-outline" size={16} color="#1976D2" />
//                         <StyledText className="text-xs font-medium text-blue-700 ml-2">
//                             Total distance: 42 km • Estimated drive time: 2h 15m
//                         </StyledText>
//                     </StyledView>
//                 </StyledView>

//                 {/* Schedule Section */}
//                 <StyledView className="bg-white">
//                     <StyledView className="px-4 py-3 border-b border-gray-200">
//                         <StyledText className="text-base font-semibold text-gray-900 mb-1">
//                             Today's Schedule
//                         </StyledText>
//                         <StyledText className="text-xs text-gray-500">
//                             {tasks.length} tasks scheduled • {tasks.filter(t => t.completionStatus === 'completed').length} completed
//                         </StyledText>
//                     </StyledView>

//                     <StyledView className="pb-4">
//                         {sortTasksByTime(tasks).map((task) => renderTaskCard(task))}
//                     </StyledView>
//                 </StyledView>
//             </StyledScrollView>
//         </StyledSafeAreaView>
//     );
// }

// app/screens/home.tsx

// app/screens/home.tsx
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
import DoctorVisitCard from '../../../components/doctorVisitCard';
import ChemistVisitCard from '../../../components/chemistVisitCard';
import TourPlanCard from '../../../components/tourPlanCard';

// Import service
import taskService, { DailyTask, taskCounts, statusCounts } from '../../../services/taskService';

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
    typeId: string,
    time: string;
    completionStatus: 'pending' | 'completed' | 'rescheduled' | 'cancelled';
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
    tourPlans: number;
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
        tourPlans: 0,
        completionPercentage: 0,
    });
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [mapExpanded, setMapExpanded] = useState(false);

    // Load tasks on date change
    useEffect(() => {
        loadDailyTasks();
    }, [selectedDate]);

    const loadDailyTasks = async () => {
        setLoading(true);

        try {
            // Format date for API (yyyy-MM-dd)
            const dateStr = format(selectedDate, 'yyyy-MM-dd');

            // Fetch tasks from backend
            const response = await taskService.getTasks(dateStr);

            if (response && response.data) {
                const { tasks: dailyTasks, summary } = response.data;

                // Transform backend data to unified task format
                const transformedTasks: UnifiedTask[] = [];

                // Add null/undefined check for dailyTasks
                if (!dailyTasks) {
                    setTasks([]);
                    setStats({
                        totalTasks: 0,
                        doctors: 0,
                        chemists: 0,
                        tourPlans: 0,
                        completionPercentage: 0,
                    });
                    return;
                }

                // Handle tasks as an array (based on your backend response)
                if (Array.isArray(dailyTasks)) {
                    dailyTasks.forEach((task: DailyTask) => {
                        const unifiedTask: UnifiedTask = {
                            id: task.id,
                            typeId: task.typeId,
                            type: mapTaskType(task.type),
                            time: task.startTime,
                            completionStatus: mapCompletionStatus(task.completionStatus),
                            approvalStatus: mapApprovalStatus(task.approvalStatus),
                            hasConflict: false, // TODO: Implement conflict detection
                            coordinates: {
                                latitude: 28.6139, // Default coordinates
                                longitude: 77.2090,
                            },
                            data: transformTaskData(task),
                        };
                        transformedTasks.push(unifiedTask);
                    });
                } else if (dailyTasks && typeof dailyTasks === 'object') {
                    // If tasks is a single object, convert to array
                    const task = dailyTasks as DailyTask;
                    transformedTasks.push({
                        id: task.id,
                        typeId: task.typeId,
                        type: mapTaskType(task.type),
                        time: task.startTime,
                        completionStatus: mapCompletionStatus(task.completionStatus),
                        approvalStatus: mapApprovalStatus(task.approvalStatus),
                        hasConflict: false,
                        coordinates: {
                            latitude: 28.6139,
                            longitude: 77.2090,
                        },
                        data: transformTaskData(task),
                    });
                }

                setTasks(transformedTasks);

                // Update stats from backend summary
                if (summary && summary.counts) {
                    const completedCount = Number(summary.statusCounts?.completed) || 0;
                    const totalCount = Number(summary.counts.total) || transformedTasks.length;

                    setStats({
                        totalTasks: Number(summary.counts.total) || transformedTasks.length,
                        doctors: Number(summary.counts.doctors) || 0,
                        chemists: Number(summary.counts.chemists) || 0,
                        tourPlans: Number(summary.counts.tourPlans) || 0,
                        completionPercentage: totalCount > 0
                            ? Math.round((Number(completedCount) / Number(totalCount)) * 100)
                            : 0,
                    });
                } else {
                    // Fallback: calculate stats from transformed tasks
                    calculateStatsFromTasks(transformedTasks);
                }
            } else {
                // No tasks for this date
                setTasks([]);
                setStats({
                    totalTasks: 0,
                    doctors: 0,
                    chemists: 0,
                    tourPlans: 0,
                    completionPercentage: 0,
                });
            }

        } catch (error: any) {
            console.error('Error loading daily tasks:', error);

            // Set empty state on error
            setTasks([]);
            setStats({
                totalTasks: 0,
                doctors: 0,
                chemists: 0,
                tourPlans: 0,
                completionPercentage: 0,
            });

            // Show error alert
            Alert.alert(
                'Error',
                error.message || 'Failed to load tasks. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setLoading(false);
        }
    };

    // Transform task data based on type
    const transformTaskData = (task: DailyTask) => {
        const baseData = {
            id: task.id,
            time: `${task.startTime} - ${task.endTime}`,
            status: 'confirmed',
            completionStatus: mapCompletionStatus(task.completionStatus),
            approvalStatus: mapApprovalStatus(task.approvalStatus),
            tags: [],
        };

        switch (task.type) {
            case 'doctor':
                return {
                    ...baseData,
                    // These property names must match what DoctorVisitCard expects
                    doctorName: task.name || 'Unknown Doctor',
                    doctorSpecialization: task.details || '',
                    hospitalName: extractHospitalName(task.location),
                    hospitalAddress: task.location || '',
                    tags: ['High Priority'],
                    hasConflict: false,
                };
            case 'chemist':
                return {
                    ...baseData,
                    // These property names must match what ChemistVisitCard expects
                    chemistName: task.name || 'Unknown Chemist',
                    type: task.details || 'Retail',
                    address: task.location || '',
                    orderValue: 0,
                    hasConflict: false,
                };
            case 'tourplan':
                return {
                    ...baseData,
                    // These property names must match what TourPlanCard expects
                    tourName: task.name || 'Tour Plan',
                    locations: 1,
                    distance: '0 km',
                    description: task.details || '',
                    hasConflict: false,
                };
            default:
                return baseData;
        }
    };

    // Helper function to extract hospital name from location
    const extractHospitalName = (location?: string): string => {
        if (!location) return '';
        // If location contains comma, take first part as hospital name
        const parts = location.split(',');
        return parts[0] || '';
    };

    // Calculate stats from tasks array (fallback)
    const calculateStatsFromTasks = (tasksList: UnifiedTask[]) => {
        const doctorCount = tasksList.filter(t => t.type === 'doctor').length;
        const chemistCount = tasksList.filter(t => t.type === 'chemist').length;
        const tourCount = tasksList.filter(t => t.type === 'tour').length;
        const completedCount = tasksList.filter(t => t.completionStatus === 'completed').length;

        setStats({
            totalTasks: tasksList.length,
            doctors: doctorCount,
            chemists: chemistCount,
            tourPlans: tourCount,
            completionPercentage: tasksList.length > 0
                ? Math.round((completedCount / tasksList.length) * 100)
                : 0,
        });
    };

    // Helper functions to map backend status to frontend format
    const mapTaskType = (type: string): 'doctor' | 'chemist' | 'tour' => {
        const typeMap: Record<string, 'doctor' | 'chemist' | 'tour'> = {
            'doctor': 'doctor',
            'chemist': 'chemist',
            'tourplan': 'tour',
            'tour_plan': 'tour',
            'DOCTOR': 'doctor',
            'CHEMIST': 'chemist',
            'TOURPLAN': 'tour',
            'TOUR_PLAN': 'tour',
        };
        return typeMap[type] || 'doctor';
    };

    const mapCompletionStatus = (status: string): 'pending' | 'completed' | 'rescheduled' | 'cancelled' => {
        const statusMap: Record<string, 'pending' | 'completed' | 'rescheduled' | 'cancelled'> = {
            'PENDING': 'pending',
            'pending': 'pending',
            'COMPLETED': 'completed',
            'completed': 'completed',
            'RESCHEDULED': 'rescheduled',
            'rescheduled': 'rescheduled',
            'CANCELLED': 'cancelled',
            'cancelled': 'cancelled',
        };
        return statusMap[status] || 'pending';
    };

    const mapApprovalStatus = (status: string): 'draft' | 'pending' | 'approved' | 'rejected' => {
        const statusMap: Record<string, 'draft' | 'pending' | 'approved' | 'rejected'> = {
            'DRAFT': 'draft',
            'draft': 'draft',
            'PENDING': 'pending',
            'pending': 'pending',
            'APPROVED': 'approved',
            'approved': 'approved',
            'REJECTED': 'rejected',
            'rejected': 'rejected',
        };
        return statusMap[status] || 'draft';
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadDailyTasks().finally(() => setRefreshing(false));
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

    // const handleTaskPress = (task: UnifiedTask) => {
    //     Alert.alert('Task Details', `Opening ${task.type} task details...`);
    //     // TODO: Navigate to task details screen
    // };
    const handleTaskPress = (task: UnifiedTask) => {
        if (task.type === 'doctor') {
            console.log(`Opening details for doctor ${task.typeId}`);
            // Navigate to doctor details with the doctor ID
            router.push(`/(tabs)/doctorDetails?doctorId=${task.typeId}`);
        }
        else if (task.type === 'chemist') {
            console.log(`Opening details for chemist ${task.typeId}`);
            // Navigate to doctor details with the doctor ID
            router.push(`/(tabs)/chemistDetails?chemistId=${task.typeId}`);
        }
        else {
            Alert.alert('Task Details', `This is Tour Plan, you can't open...`);
        }

    };

    const handleCreateTask = () => {
        console.log('Creating new task');
        router.push('/dailyPlaner/createTasks');
    };

    const handleDeleteTask = async (task: UnifiedTask) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Map type for API call
                            const taskType = task.type === 'tour' ? 'tourplan' : task.type;
                            await taskService.deleteTask(taskType, task.id);

                            Alert.alert('Success', 'Task deleted successfully');
                            // Reload tasks
                            loadDailyTasks();
                        } catch (error: any) {
                            Alert.alert('Error', error.message || 'Failed to delete task');
                        }
                    }
                },
            ]
        );
    };

    const handleConflictPress = (task: UnifiedTask) => {
        Alert.alert(
            'Scheduling Conflict',
            `This appointment overlaps with another task.\n\nRecommendation: Reschedule to avoid conflicts.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reschedule',
                    onPress: () => {
                        // TODO: Navigate to reschedule screen
                        Alert.alert('Info', 'Reschedule functionality coming soon');
                    }
                },
            ]
        );
    };

    const handleOpenMap = () => {
        Alert.alert('Map View', 'Opening full map view...');
        // TODO: Navigate to map view screen
    };

    const handleCompleteTask = async (task: UnifiedTask) => {
        Alert.alert(
            'Complete Task',
            'Mark this task as completed?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Complete',
                    onPress: async () => {
                        try {
                            // TODO: Implement complete task API call when backend endpoint is ready
                            Alert.alert('Success', 'Task marked as completed');
                            loadDailyTasks();
                        } catch (error: any) {
                            Alert.alert('Error', error.message || 'Failed to complete task');
                        }
                    }
                },
            ]
        );
    };

    // Render the appropriate card based on task type
    const renderTaskCard = (task: UnifiedTask) => {
        const commonProps = {
            onPress: () => handleTaskPress(task),
            onConflictPress: () => handleConflictPress(task),
            onComplete: () => handleCompleteTask(task),
            onDelete: () => handleDeleteTask(task),
        };

        switch (task.type) {
            case 'doctor':
                return (
                    <DoctorVisitCard
                        key={task.id}
                        {...task.data}
                        {...commonProps}
                    />
                );
            case 'chemist':
                return (
                    <ChemistVisitCard
                        key={task.id}
                        {...task.data}
                        {...commonProps}
                    />
                );
            case 'tour':
                return (
                    <TourPlanCard
                        key={task.id}
                        {...task.data}
                        {...commonProps}
                    />
                );
            default:
                return null;
        }
    };

    // Sort tasks by time for chronological display
    const sortTasksByTime = (tasksList: UnifiedTask[]) => {
        return tasksList.sort((a, b) => {
            // Parse time strings (e.g., "09:00" or "09:00:00")
            const parseTime = (timeStr: string) => {
                const parts = timeStr.split(':');
                const hours = parseInt(parts[0] || '0', 10);
                const minutes = parseInt(parts[1] || '0', 10);
                return hours * 60 + minutes;
            };

            const timeA = parseTime(a.time);
            const timeB = parseTime(b.time);
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
    if (loading && !refreshing) {
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
                        <StyledText className="text-lg font-bold text-[#0077B6]">{stats?.totalTasks || 0}</StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="flex-1 items-center py-3 px-2 bg-blue-50 rounded-lg border border-blue-100 mr-2">
                        <StyledText className="text-lg font-bold text-[#0077B6]">{stats?.doctors || 0}</StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Doctors</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="flex-1 items-center py-3 px-2 bg-blue-50 rounded-lg border border-blue-100 mr-2">
                        <StyledText className="text-lg font-bold text-[#0077B6]">{stats?.chemists || 0}</StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Chemists</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="flex-1 items-center py-3 px-1 bg-blue-50 rounded-lg border border-blue-100">
                        <StyledText className="text-lg font-bold text-[#0077B6]">{stats?.completionPercentage || 0}%</StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider">Complete</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Main Content */}
            <StyledScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#0077B6']}
                        tintColor="#0077B6"
                    />
                }
            >
                {/* Map Section - Visual Representation */}
                {tasks.length > 0 && (
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
                                {tasks.slice(0, 5).map((task, index) => renderMapMarker(task, index))}

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
                )}

                {/* Schedule Section */}
                <StyledView className="bg-white">
                    <StyledView className="px-4 py-3 border-b border-gray-200">
                        <StyledText className="text-base font-semibold text-gray-900 mb-1">
                            {format(selectedDate, 'MMMM d, yyyy')} Schedule
                        </StyledText>
                        <StyledText className="text-xs text-gray-500">
                            {tasks.length} tasks scheduled • {tasks.filter(t => t.completionStatus === 'completed').length} completed
                        </StyledText>
                    </StyledView>

                    <StyledView className="pb-4">
                        {tasks.length > 0 ? (
                            sortTasksByTime(tasks).map((task) => renderTaskCard(task))
                        ) : (
                            <StyledView className="py-12 items-center">
                                <StyledText className="text-4xl mb-3">📅</StyledText>
                                <StyledText className="text-base font-semibold text-gray-700 mb-2">
                                    No tasks scheduled
                                </StyledText>
                                <StyledText className="text-sm text-gray-500 text-center px-8">
                                    Add tasks to your daily planner to see them here
                                </StyledText>
                                <StyledTouchableOpacity
                                    onPress={handleCreateTask}
                                    className="mt-4 bg-[#0077B6] px-6 py-2 rounded-lg"
                                >
                                    <StyledText className="text-sm font-semibold text-white">
                                        Add Task
                                    </StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>
                        )}
                    </StyledView>
                </StyledView>
            </StyledScrollView>
        </StyledSafeAreaView>
    );
}