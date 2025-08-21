// components/meeting/SampleDistributionRedirect.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface SampleDistributionRedirectProps {
    doctorName: string;
    onPress: () => void;
}

export default function SampleDistributionRedirect({ doctorName, onPress }: SampleDistributionRedirectProps) {
    return (
        <StyledView className="flex-1 justify-center items-center p-5">
            <StyledView className="bg-white rounded-xl border border-gray-200 p-6 items-center w-full max-w-sm">
                <StyledView className="w-16 h-16 bg-blue-100 rounded-2xl items-center justify-center mb-4">
                    <StyledText className="text-3xl">📦</StyledText>
                </StyledView>
                <StyledText className="text-lg font-semibold text-gray-900 mb-2">
                    Distribute Samples & Gifts
                </StyledText>
                <StyledText className="text-sm text-gray-600 text-center mb-5">
                    Add drug samples and promotional gifts to distribute to {doctorName} during this meeting.
                </StyledText>
                <StyledTouchableOpacity
                    className="bg-[#0077B6] px-6 py-3 rounded-lg active:bg-[#005A87]"
                    onPress={onPress}
                    activeOpacity={0.8}
                >
                    <StyledText className="text-white font-semibold">
                        Open Sample Distribution
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
}