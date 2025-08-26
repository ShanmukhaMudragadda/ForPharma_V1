// // app/screens/taskPlanner.tsx
// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TouchableOpacity,
//     SafeAreaView,
//     StatusBar,
//     RefreshControl,
//     ActivityIndicator,
//     Alert,
// } from 'react-native';
// import { styled } from 'nativewind';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import TaskPlanCard, { TaskPlanData } from '../../../components/taskPlanCard';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledScrollView = styled(ScrollView);
// const StyledTouchableOpacity = styled(TouchableOpacity);
// const StyledSafeAreaView = styled(SafeAreaView);

// interface SummaryData {
//     approved: number;
//     pending: number;
//     draft: number;
//     rejected: number;
// }

// export default function TaskPlanner() {
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);
//     const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');

//     // Section collapse states
//     const [sectionStates, setSectionStates] = useState({
//         pending: true,
//         approved: true,
//         drafts: true,
//         rejected: false,
//     });

//     // Summary data
//     const [summary, setSummary] = useState<SummaryData>({
//         approved: 3,
//         pending: 2,
//         draft: 1,
//         rejected: 1,
//     });

//     // Task plans data - In production, this would come from API/database
//     const [taskPlans, setTaskPlans] = useState<{
//         pending: TaskPlanData[];
//         approved: TaskPlanData[];
//         drafts: TaskPlanData[];
//         rejected: TaskPlanData[];
//     }>({
//         pending: [
//             {
//                 id: 'tp-001',
//                 dateRange: 'Aug 15-17, 2025',
//                 duration: '3 days',
//                 status: 'pending',
//                 tasks: { doctors: 4, chemists: 2, tours: 1 },
//             },
//             {
//                 id: 'tp-002',
//                 dateRange: 'Aug 20-22, 2025',
//                 duration: '3 days',
//                 status: 'pending',
//                 tasks: { doctors: 6, chemists: 3, tours: 0 },
//             },
//         ],
//         approved: [
//             {
//                 id: 'tp-003',
//                 dateRange: 'Aug 25-27, 2025',
//                 duration: '3 days',
//                 status: 'approved',
//                 tasks: { doctors: 5, chemists: 0, tours: 2 },
//             },
//             {
//                 id: 'tp-004',
//                 dateRange: 'Sep 1-3, 2025',
//                 duration: '3 days',
//                 status: 'approved',
//                 tasks: { doctors: 3, chemists: 4, tours: 1 },
//             },
//         ],
//         drafts: [
//             {
//                 id: 'tp-005',
//                 dateRange: 'Sep 5-7, 2025',
//                 duration: '3 days',
//                 status: 'draft',
//                 tasks: { doctors: 2, chemists: 1, tours: 0 },
//             },
//         ],
//         rejected: [
//             {
//                 id: 'tp-006',
//                 dateRange: 'Aug 10-12, 2025',
//                 duration: '3 days',
//                 status: 'rejected',
//                 tasks: { doctors: 3, chemists: 2, tours: 0 },
//             },
//         ],
//     });

//     useEffect(() => {
//         loadTaskPlans();
//     }, []);

//     const loadTaskPlans = async () => {
//         setLoading(true);
//         try {
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             // In production, fetch task plans from API
//         } catch (error) {
//             Alert.alert('Error', 'Failed to load task plans');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const onRefresh = async () => {
//         setRefreshing(true);
//         await loadTaskPlans();
//         setRefreshing(false);
//     };

//     const toggleSection = (section: keyof typeof sectionStates) => {
//         setSectionStates(prev => ({
//             ...prev,
//             [section]: !prev[section],
//         }));
//     };

//     const createTaskPlan = () => {
//         router.push('/dailyPlaner/createTaskPlanner');
//     };


//     const renderSyncStatusBar = () => {
//         const statusConfig = {
//             synced: {
//                 bgColor: 'bg-green-50',
//                 borderColor: 'border-green-200',
//                 textColor: 'text-green-700',
//                 icon: 'checkmark-circle',
//                 iconColor: '#16A34A',
//                 text: 'All changes synced',
//             },
//             syncing: {
//                 bgColor: 'bg-yellow-50',
//                 borderColor: 'border-yellow-200',
//                 textColor: 'text-yellow-700',
//                 icon: 'sync',
//                 iconColor: '#EAB308',
//                 text: 'Syncing changes...',
//             },
//             offline: {
//                 bgColor: 'bg-red-50',
//                 borderColor: 'border-red-200',
//                 textColor: 'text-red-700',
//                 icon: 'cloud-offline',
//                 iconColor: '#DC2626',
//                 text: 'Working offline',
//             },
//         };

//         const config = statusConfig[syncStatus];

//         return (
//             <StyledView className={`${config.bgColor} ${config.borderColor} border-b px-5 py-2 flex-row items-center`}>
//                 <Ionicons name={config.icon as any} size={16} color={config.iconColor} />
//                 <StyledText className={`text-xs ${config.textColor} ml-2 flex-1`}>
//                     {config.text}
//                 </StyledText>
//                 <Ionicons name="calendar" size={14} color="#4285F4" />
//             </StyledView>
//         );
//     };

//     const renderSummaryCard = (label: string, count: number, colorClass: string) => (
//         <StyledView className="flex-1 items-center  py-3 px-1 bg-blue-50 rounded-lg border border-blue-100 mr-2 mb-2">
//             <StyledText className={`text-3xl font-bold ${colorClass}`}>
//                 {count}
//             </StyledText>
//             <StyledText className="text-sm font-medium text-gray-600 uppercase tracking-wider mt-1">
//                 {label}
//             </StyledText>
//         </StyledView>
//     );

//     const renderSection = (
//         title: string,
//         badge: number,
//         badgeColor: string,
//         plans: TaskPlanData[],
//         sectionKey: keyof typeof sectionStates
//     ) => (
//         <StyledView className="bg-white mb-0.5">
//             <StyledTouchableOpacity
//                 onPress={() => toggleSection(sectionKey)}
//                 className="flex-row justify-between items-center px-5 py-4 border-b border-gray-200"
//             >
//                 <StyledView className="flex-row items-center gap-3">
//                     <StyledText className="text-base font-semibold text-gray-900">
//                         {title}
//                     </StyledText>
//                     <StyledView className={`px-2 py-0.5 rounded-full ${badgeColor}`}>
//                         <StyledText className="text-xs font-semibold text-white">
//                             {badge}
//                         </StyledText>
//                     </StyledView>
//                 </StyledView>

//                 <StyledView className="flex-row items-center gap-2">
//                     <Ionicons
//                         name={sectionStates[sectionKey] ? 'chevron-down' : 'chevron-forward'}
//                         size={20}
//                         color="#6C757D"
//                     />
//                 </StyledView>
//             </StyledTouchableOpacity>

//             {sectionStates[sectionKey] && (
//                 <StyledView className="px-5 py-3">
//                     {plans.length > 0 ? (
//                         plans.map(plan => (
//                             <TaskPlanCard
//                                 key={plan.id}
//                                 plan={plan}
//                             />
//                         ))
//                     ) : (
//                         <StyledView className="py-8 items-center">
//                             <StyledText className="text-4xl mb-3">📅</StyledText>
//                             <StyledText className="text-sm font-medium text-gray-600">
//                                 No {title.toLowerCase()}
//                             </StyledText>
//                         </StyledView>
//                     )}
//                 </StyledView>
//             )}
//         </StyledView>
//     );

//     if (loading && !refreshing) {
//         return (
//             <StyledSafeAreaView className="flex-1 bg-gray-50">
//                 <StatusBar backgroundColor="#0077B6" barStyle="light-content" />
//                 <StyledView className="flex-1 justify-center items-center">
//                     <ActivityIndicator size="large" color="#0077B6" />
//                     <StyledText className="text-gray-600 mt-3">Loading task plans...</StyledText>
//                 </StyledView>
//             </StyledSafeAreaView>
//         );
//     }

//     return (
//         <StyledSafeAreaView className="flex-1 bg-gray-50">
//             <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

//             {/* Header */}
//             <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
//                 <StyledView className="flex-row items-center gap-3">
//                     <StyledTouchableOpacity
//                         className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
//                         onPress={() => router.back()}
//                     >
//                         <Ionicons name="arrow-back" size={18} color="#6C757D" />
//                     </StyledTouchableOpacity>
//                     <StyledText className="text-xl font-semibold text-gray-900">
//                         Task Planner
//                     </StyledText>
//                 </StyledView>
//                 <StyledTouchableOpacity
//                     onPress={createTaskPlan}
//                     className="bg-green-500 rounded-full w-10 h-10 items-center justify-center shadow-lg"
//                 >
//                     <Ionicons name="add" size={24} color="#FFFFFF" />
//                 </StyledTouchableOpacity>
//             </StyledView>

//             <StyledScrollView
//                 showsVerticalScrollIndicator={false}
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={onRefresh}
//                         colors={['#0077B6']}
//                     />
//                 }
//             >
//                 {/* Summary Section */}
//                 <StyledView className="bg-white px-5 py-4 mb-0.5 border-b border-gray-200">
//                     <StyledText className="text-base font-semibold text-gray-900 mb-4">
//                         Overview
//                     </StyledText>
//                     <StyledView className="flex-row gap-3">
//                         {renderSummaryCard('Approved', summary.approved, 'text-green-600')}
//                         {renderSummaryCard('Pending', summary.pending, 'text-yellow-600')}
//                     </StyledView>
//                     <StyledView className="flex-row gap-3">
//                         {renderSummaryCard('Drafts', summary.draft, 'text-gray-600')}
//                         {renderSummaryCard('Rejected', summary.rejected, 'text-red-600')}
//                     </StyledView>
//                 </StyledView>

//                 {/* Status Sections */}
//                 {renderSection('Pending Approval', taskPlans.pending.length, 'bg-yellow-500', taskPlans.pending, 'pending')}
//                 {renderSection('Approved', taskPlans.approved.length, 'bg-green-500', taskPlans.approved, 'approved')}
//                 {renderSection('Drafts', taskPlans.drafts.length, 'bg-gray-500', taskPlans.drafts, 'drafts')}
//                 {renderSection('Rejected', taskPlans.rejected.length, 'bg-red-500', taskPlans.rejected, 'rejected')}
//             </StyledScrollView>
//         </StyledSafeAreaView>
//     );
// }

// app/screens/taskPlanner.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    RefreshControl,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TaskPlanCard, { TaskPlanData } from '../../../components/taskPlanCard';
import taskPlannerService from '../../../services/taskPlannerService';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

interface SummaryData {
    approved: number;
    pending: number;
    draft: number;
    rejected: number;
}

export default function TaskPlanner() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');

    // Section collapse states
    const [sectionStates, setSectionStates] = useState({
        pending: true,
        approved: true,
        drafts: true,
        rejected: false,
    });

    // Summary data
    const [summary, setSummary] = useState<SummaryData>({
        approved: 0,
        pending: 0,
        draft: 0,
        rejected: 0,
    });

    // Task plans data from backend
    const [taskPlans, setTaskPlans] = useState<{
        pending: TaskPlanData[];
        approved: TaskPlanData[];
        drafts: TaskPlanData[];
        rejected: TaskPlanData[];
    }>({
        pending: [],
        approved: [],
        drafts: [],
        rejected: [],
    });

    useEffect(() => {
        loadTaskPlans();
    }, []);

    const loadTaskPlans = async () => {
        setLoading(true);
        setSyncStatus('syncing');

        try {
            // Fetch task planners from backend
            const planners = await taskPlannerService.getTaskPlanners();

            // Transform backend data to match component format
            const transformedPlans = planners.map(planner => {
                // Format date range
                const startDate = new Date(planner.startDate);
                const endDate = new Date(planner.endDate);
                const dateRange = formatDateRange(startDate, endDate);
                const duration = calculateDuration(startDate, endDate);

                return {
                    id: planner.id,
                    dateRange: dateRange,
                    duration: duration,
                    status: planner.approvalStatus.toLowerCase() as 'pending' | 'approved' | 'draft' | 'rejected',
                    tasks: {
                        doctors: planner.statistics.doctorTasks,
                        chemists: planner.statistics.chemistTasks,
                        tours: planner.statistics.tourPlanTasks,
                    },
                };
            });

            // Group plans by status
            const grouped = {
                pending: transformedPlans.filter(p => p.status === 'pending'),
                approved: transformedPlans.filter(p => p.status === 'approved'),
                drafts: transformedPlans.filter(p => p.status === 'draft'),
                rejected: transformedPlans.filter(p => p.status === 'rejected'),
            };

            setTaskPlans(grouped);

            // Update summary
            setSummary({
                pending: grouped.pending.length,
                approved: grouped.approved.length,
                draft: grouped.drafts.length,
                rejected: grouped.rejected.length,
            });

            setSyncStatus('synced');
        } catch (error: any) {
            console.error('Error loading task plans:', error);
            setSyncStatus('offline');
            Alert.alert('Error', error.message || 'Failed to load task plans');
        } finally {
            setLoading(false);
        }
    };

    // Helper function to format date range
    const formatDateRange = (startDate: Date, endDate: Date): string => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const startMonth = months[startDate.getMonth()];
        const startDay = startDate.getDate();
        const endMonth = months[endDate.getMonth()];
        const endDay = endDate.getDate();
        const year = endDate.getFullYear();

        if (startDate.getMonth() === endDate.getMonth()) {
            return `${startMonth} ${startDay}-${endDay}, ${year}`;
        } else {
            return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
        }
    };

    // Helper function to calculate duration
    const calculateDuration = (startDate: Date, endDate: Date): string => {
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadTaskPlans();
        setRefreshing(false);
    };

    const toggleSection = (section: keyof typeof sectionStates) => {
        setSectionStates(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const createTaskPlan = () => {
        router.push('/dailyPlaner/createTaskPlanner');
    };

    const handleDeleteTaskPlan = async (planId: string) => {
        Alert.alert(
            'Delete Task Plan',
            'Are you sure you want to delete this task plan? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setSyncStatus('syncing');
                            await taskPlannerService.deleteTaskPlanner(planId);
                            Alert.alert('Success', 'Task plan deleted successfully');
                            await loadTaskPlans();
                        } catch (error: any) {
                            Alert.alert('Error', error.message || 'Failed to delete task plan');
                            setSyncStatus('synced');
                        }
                    }
                }
            ]
        );
    };

    const renderSyncStatusBar = () => {
        const statusConfig = {
            synced: {
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
                textColor: 'text-green-700',
                icon: 'checkmark-circle',
                iconColor: '#16A34A',
                text: 'All changes synced',
            },
            syncing: {
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200',
                textColor: 'text-yellow-700',
                icon: 'sync',
                iconColor: '#EAB308',
                text: 'Syncing changes...',
            },
            offline: {
                bgColor: 'bg-red-50',
                borderColor: 'border-red-200',
                textColor: 'text-red-700',
                icon: 'cloud-offline',
                iconColor: '#DC2626',
                text: 'Working offline',
            },
        };

        const config = statusConfig[syncStatus];

        return (
            <StyledView className={`${config.bgColor} ${config.borderColor} border-b px-5 py-2 flex-row items-center`}>
                <Ionicons name={config.icon as any} size={16} color={config.iconColor} />
                <StyledText className={`text-xs ${config.textColor} ml-2 flex-1`}>
                    {config.text}
                </StyledText>
                <Ionicons name="calendar" size={14} color="#4285F4" />
            </StyledView>
        );
    };

    const renderSummaryCard = (label: string, count: number, colorClass: string) => (
        <StyledView className="flex-1 items-center py-3 px-1 bg-blue-50 rounded-lg border border-blue-100 mr-2 mb-2">
            <StyledText className={`text-3xl font-bold ${colorClass}`}>
                {count}
            </StyledText>
            <StyledText className="text-sm font-medium text-gray-600 uppercase tracking-wider mt-1">
                {label}
            </StyledText>
        </StyledView>
    );

    const renderSection = (
        title: string,
        badge: number,
        badgeColor: string,
        plans: TaskPlanData[],
        sectionKey: keyof typeof sectionStates
    ) => (
        <StyledView className="bg-white mb-0.5">
            <StyledTouchableOpacity
                onPress={() => toggleSection(sectionKey)}
                className="flex-row justify-between items-center px-5 py-4 border-b border-gray-200"
            >
                <StyledView className="flex-row items-center gap-3">
                    <StyledText className="text-base font-semibold text-gray-900">
                        {title}
                    </StyledText>
                    <StyledView className={`px-2 py-0.5 rounded-full ${badgeColor}`}>
                        <StyledText className="text-xs font-semibold text-white">
                            {badge}
                        </StyledText>
                    </StyledView>
                </StyledView>

                <StyledView className="flex-row items-center gap-2">
                    <Ionicons
                        name={sectionStates[sectionKey] ? 'chevron-down' : 'chevron-forward'}
                        size={20}
                        color="#6C757D"
                    />
                </StyledView>
            </StyledTouchableOpacity>

            {sectionStates[sectionKey] && (
                <StyledView className="px-5 py-3">
                    {plans.length > 0 ? (
                        plans.map(plan => (
                            <TaskPlanCard
                                key={plan.id}
                                plan={plan}
                                onDelete={() => handleDeleteTaskPlan(plan.id)}
                            />
                        ))
                    ) : (
                        <StyledView className="py-8 items-center">
                            <StyledText className="text-4xl mb-3">📅</StyledText>
                            <StyledText className="text-sm font-medium text-gray-600">
                                No {title.toLowerCase()}
                            </StyledText>
                        </StyledView>
                    )}
                </StyledView>
            )}
        </StyledView>
    );

    if (loading && !refreshing) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StatusBar backgroundColor="#0077B6" barStyle="light-content" />
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-3">Loading task plans...</StyledText>
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
                        Task Planner
                    </StyledText>
                </StyledView>
                <StyledTouchableOpacity
                    onPress={createTaskPlan}
                    className="bg-green-500 rounded-full w-10 h-10 items-center justify-center shadow-lg"
                >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                </StyledTouchableOpacity>
            </StyledView>

            <StyledScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#0077B6']}
                    />
                }
            >
                {/* Summary Section */}
                <StyledView className="bg-white px-5 py-4 mb-0.5 border-b border-gray-200">
                    <StyledText className="text-base font-semibold text-gray-900 mb-4">
                        Overview
                    </StyledText>
                    <StyledView className="flex-row gap-3">
                        {renderSummaryCard('Approved', summary.approved, 'text-green-600')}
                        {renderSummaryCard('Pending', summary.pending, 'text-yellow-600')}
                    </StyledView>
                    <StyledView className="flex-row gap-3">
                        {renderSummaryCard('Drafts', summary.draft, 'text-gray-600')}
                        {renderSummaryCard('Rejected', summary.rejected, 'text-red-600')}
                    </StyledView>
                </StyledView>

                {/* Status Sections */}
                {renderSection('Pending Approval', taskPlans.pending.length, 'bg-yellow-500', taskPlans.pending, 'pending')}
                {renderSection('Approved', taskPlans.approved.length, 'bg-green-500', taskPlans.approved, 'approved')}
                {renderSection('Drafts', taskPlans.drafts.length, 'bg-gray-500', taskPlans.drafts, 'drafts')}
                {renderSection('Rejected', taskPlans.rejected.length, 'bg-red-500', taskPlans.rejected, 'rejected')}
            </StyledScrollView>
        </StyledSafeAreaView>
    );
}