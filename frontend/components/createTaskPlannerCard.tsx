// components/TaskCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface TaskData {
    id: string;
    type: 'doctor' | 'chemist' | 'tour';
    entityId: string;
    entityName: string;
    entityDetails: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    hasConflict?: boolean;
    status?: 'draft' | 'pending' | 'approved' | 'completed';
}

interface TaskCardProps {
    task: TaskData;
    onEdit?: (taskId: string) => void;
    onDelete?: (taskId: string) => void;
    onPress?: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onEdit,
    onDelete,
    onPress,
}) => {
    const getTaskTypeColor = (type: string) => {
        switch (type) {
            case 'doctor': return '#1976D2';
            case 'chemist': return '#7B1FA2';
            case 'tour': return '#388E3C';
            default: return '#6C757D';
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-blue-100 text-blue-800';
            case 'draft': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleCardPress = () => {
        if (onPress) {
            onPress(task.id);
        }
    };

    const handleEdit = (e: any) => {
        e.stopPropagation();
        if (onEdit) {
            onEdit(task.id);
        }
    };

    const handleDelete = (e: any) => {
        e.stopPropagation();
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        if (onDelete) {
                            onDelete(task.id);
                        }
                    }
                }
            ]
        );
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    return (
        <StyledTouchableOpacity
            onPress={handleCardPress}
            activeOpacity={0.7}
            className={`bg-white border rounded-lg p-3 mb-2 relative ${task.hasConflict ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
            style={{
                borderLeftWidth: 4,
                borderLeftColor: getTaskTypeColor(task.type),
            }}
        >
            {/* Conflict Indicator */}
            {task.hasConflict && (
                <StyledView className="absolute top-2 right-2">
                    <StyledText className="text-base">⚠️</StyledText>
                </StyledView>
            )}

            {/* Task Header */}
            <StyledView className="flex-row justify-between items-start mb-2">
                <StyledView className="flex-1">
                    <StyledText className="text-sm font-semibold text-gray-900">
                        {task.entityName}
                    </StyledText>
                    <StyledText className="text-xs text-gray-600">
                        {task.entityDetails}
                    </StyledText>
                </StyledView>
                {task.status && (
                    <StyledView className={`px-2 py-0.5 rounded-full ${getStatusStyles(task.status)}`}>
                        <StyledText className="text-xs font-semibold uppercase">
                            {task.status}
                        </StyledText>
                    </StyledView>
                )}
            </StyledView>

            {/* Task Details */}
            <StyledText className="text-xs text-gray-600 mb-2">
                {formatDate(task.date)} • {task.startTime} - {task.endTime} • {task.location}
            </StyledText>

            {/* Action Buttons */}
            <StyledView className="flex-row gap-2">
                <StyledTouchableOpacity
                    onPress={handleEdit}
                    className="bg-gray-50 border border-gray-200 rounded px-3 py-1"
                >
                    <StyledText className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Edit
                    </StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity
                    onPress={handleDelete}
                    className="bg-gray-50 border border-gray-200 rounded px-3 py-1"
                >
                    <StyledText className="text-xs font-medium text-red-600 uppercase tracking-wider">
                        Delete
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledTouchableOpacity>
    );
};

export default TaskCard;