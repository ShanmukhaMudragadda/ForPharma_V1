import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No drugs found",
    message = "Try adjusting your search or filters to find what you're looking for.",
    icon = "medical-outline"
}) => {
    return (
        <StyledView className="flex-1 items-center justify-center py-16 px-8">
            <StyledView className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                <Ionicons name={icon as any} size={32} color="#9CA3AF" />
            </StyledView>

            <StyledText className="text-lg font-semibold text-gray-900 mb-2 text-center">
                {title}
            </StyledText>

            <StyledText className="text-gray-500 text-center leading-5">
                {message}
            </StyledText>
        </StyledView>
    );
};