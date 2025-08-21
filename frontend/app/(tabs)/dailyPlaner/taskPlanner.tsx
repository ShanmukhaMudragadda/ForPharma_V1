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
        approved: 3,
        pending: 2,
        draft: 1,
        rejected: 1,
    });

    // Task plans data - In production, this would come from API/database
    const [taskPlans, setTaskPlans] = useState<{
        pending: TaskPlanData[];
        approved: TaskPlanData[];
        drafts: TaskPlanData[];
        rejected: TaskPlanData[];
    }>({
        pending: [
            {
                id: 'tp-001',
                dateRange: 'Aug 15-17, 2025',
                duration: '3 days',
                status: 'pending',
                tasks: { doctors: 4, chemists: 2, tours: 1 },
            },
            {
                id: 'tp-002',
                dateRange: 'Aug 20-22, 2025',
                duration: '3 days',
                status: 'pending',
                tasks: { doctors: 6, chemists: 3, tours: 0 },
            },
        ],
        approved: [
            {
                id: 'tp-003',
                dateRange: 'Aug 25-27, 2025',
                duration: '3 days',
                status: 'approved',
                tasks: { doctors: 5, chemists: 0, tours: 2 },
            },
            {
                id: 'tp-004',
                dateRange: 'Sep 1-3, 2025',
                duration: '3 days',
                status: 'approved',
                tasks: { doctors: 3, chemists: 4, tours: 1 },
            },
        ],
        drafts: [
            {
                id: 'tp-005',
                dateRange: 'Sep 5-7, 2025',
                duration: '3 days',
                status: 'draft',
                tasks: { doctors: 2, chemists: 1, tours: 0 },
            },
        ],
        rejected: [
            {
                id: 'tp-006',
                dateRange: 'Aug 10-12, 2025',
                duration: '3 days',
                status: 'rejected',
                tasks: { doctors: 3, chemists: 2, tours: 0 },
            },
        ],
    });

    useEffect(() => {
        loadTaskPlans();
    }, []);

    const loadTaskPlans = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // In production, fetch task plans from API
        } catch (error) {
            Alert.alert('Error', 'Failed to load task plans');
        } finally {
            setLoading(false);
        }
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
        <StyledView className="flex-1 items-center  py-3 px-1 bg-blue-50 rounded-lg border border-blue-100 mr-2 mb-2">
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