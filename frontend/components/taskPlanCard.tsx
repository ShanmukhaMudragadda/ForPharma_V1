// components/TaskPlanCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface TaskPlanData {
    id: string;
    dateRange: string;
    duration: string;
    status: 'approved' | 'pending' | 'draft' | 'rejected';
    tasks: {
        doctors: number;
        chemists: number;
        tours: number;
    };
    submittedTime?: string;
    rejectionReason?: string;
}

interface TaskPlanCardProps {
    plan: TaskPlanData;
    onDelete?: () => void;
}

const TaskPlanCard: React.FC<TaskPlanCardProps> = ({
    plan,
    onDelete
}) => {
    const router = useRouter();

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'draft':
                return 'bg-gray-100 text-gray-700';
            case 'rejected':
                return 'bg-blue-100 text-red-800';
            default:
                return 'bg-red-100 text-gray-700';
        }
    };

    const handleCardPress = () => {
        console.log("pressed on task plane page")
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
    }



    return (
        <StyledTouchableOpacity
            onPress={handleCardPress}
            activeOpacity={0.3}
            className="bg-white border border-gray-200 rounded-xl p-4 mb-3 relative"
        >

            {/* Header */}
            <StyledView className="flex-row justify-between items-start mb-3">
                <StyledView className="flex-1">
                    <StyledText className="text-base font-semibold text-gray-900">
                        {plan.dateRange}
                    </StyledText>
                    <StyledText className="text-xs text-gray-600 mt-1">
                        {plan.duration}
                    </StyledText>
                </StyledView>
                <StyledView className={`px-2 py-1 rounded-md ${getStatusStyles(plan.status)}`}>
                    <StyledText className="text-xs font-semibold uppercase">
                        {plan.status}
                    </StyledText>
                </StyledView>
            </StyledView>

            {/* Task Types */}
            <StyledView className="flex-row gap-2">
                {plan.tasks.doctors > 0 && (
                    <StyledView className="flex-row items-center bg-blue-50 border border-blue-200 rounded-full px-2 py-1">
                        <StyledText className="text-xs mr-1">👨‍⚕️</StyledText>
                        <StyledView className="bg-white rounded-full px-2">
                            <StyledText className="text-xs font-semibold text-blue-700">
                                {plan.tasks.doctors}
                            </StyledText>
                        </StyledView>
                    </StyledView>
                )}
                {plan.tasks.chemists > 0 && (
                    <StyledView className="flex-row items-center bg-purple-50 border border-purple-200 rounded-full px-2 py-1">
                        <StyledText className="text-xs mr-1">💊</StyledText>
                        <StyledView className="bg-white rounded-full px-2">
                            <StyledText className="text-xs font-semibold text-purple-700">
                                {plan.tasks.chemists}
                            </StyledText>
                        </StyledView>
                    </StyledView>
                )}
                {plan.tasks.tours > 0 && (
                    <StyledView className="flex-row items-center bg-green-50 border border-green-200 rounded-full px-2 py-1">
                        <StyledText className="text-xs mr-1">🗺️</StyledText>
                        <StyledView className="bg-white rounded-full px-2">
                            <StyledText className="text-xs font-semibold text-green-700">
                                {plan.tasks.tours}
                            </StyledText>
                        </StyledView>
                    </StyledView>
                )}
            </StyledView>
        </StyledTouchableOpacity>
    );
};

export default TaskPlanCard;