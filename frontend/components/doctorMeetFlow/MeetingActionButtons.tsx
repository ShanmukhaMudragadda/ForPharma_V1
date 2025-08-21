// components/meeting/MeetingActionButtons.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface MeetingActionButtonsProps {
    currentStep: number;
    totalSteps: number;
    onPrevious: () => void;
    onNext: () => void;
    onEndMeeting: () => void;
    canGoNext: boolean;
}

export default function MeetingActionButtons({
    currentStep,
    totalSteps,
    onPrevious,
    onNext,
    onEndMeeting,
    canGoNext
}: MeetingActionButtonsProps) {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    return (
        <StyledView className="bg-white px-5 py-4 border-t border-gray-200 flex-row gap-3">
            {!isFirstStep && (
                <StyledTouchableOpacity
                    className="flex-1 flex-row items-center justify-center py-3 bg-gray-100 rounded-lg"
                    onPress={onPrevious}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={18} color="#6B7280" />
                    <StyledText className="ml-2 font-semibold text-gray-700">
                        Previous
                    </StyledText>
                </StyledTouchableOpacity>
            )}

            {!isLastStep ? (
                <StyledTouchableOpacity
                    className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${canGoNext ? 'bg-[#0077B6]' : 'bg-gray-300'
                        }`}
                    onPress={onNext}
                    disabled={!canGoNext}
                    activeOpacity={0.7}
                >
                    <StyledText className={`mr-2 font-semibold ${canGoNext ? 'text-white' : 'text-gray-500'
                        }`}>
                        Next
                    </StyledText>
                    <Ionicons
                        name="arrow-forward"
                        size={18}
                        color={canGoNext ? '#FFFFFF' : '#6B7280'}
                    />
                </StyledTouchableOpacity>
            ) : (
                <StyledTouchableOpacity
                    className="flex-1 flex-row items-center justify-center py-3 bg-red-500 rounded-lg"
                    onPress={onEndMeeting}
                    activeOpacity={0.7}
                >
                    <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                    <StyledText className="ml-2 font-semibold text-white">
                        End Meeting
                    </StyledText>
                </StyledTouchableOpacity>
            )}
        </StyledView>
    );
}