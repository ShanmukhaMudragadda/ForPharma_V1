// components/meeting/steps/RedirectStep.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface RedirectStepProps {
    icon: string;
    iconColor?: string;
    title: string;
    description: string;
    buttonText: string;
    onRedirect: () => void;
}

export default function RedirectStep({
    icon,
    iconColor = '#0077B6',
    title,
    description,
    buttonText,
    onRedirect
}: RedirectStepProps) {
    return (
        <StyledView className='flex-1 px-5 py-8'>
            <StyledView className='bg-white rounded-2xl p-6 items-center shadow-sm border border-gray-100'>
                {/* Icon */}
                <StyledView className='w-20 h-20 bg-blue-50 rounded-2xl items-center justify-center mb-4'>
                    <Ionicons name={icon as any} size={40} color={iconColor} />
                </StyledView>

                {/* Title */}
                <StyledText className='text-xl font-semibold text-gray-900 mb-2'>
                    {title}
                </StyledText>

                {/* Description */}
                <StyledText className='text-sm text-gray-600 text-center mb-6 leading-5'>
                    {description}
                </StyledText>

                {/* Redirect Button */}
                <StyledTouchableOpacity
                    className='bg-[#0077B6] px-6 py-3 rounded-xl flex-row items-center gap-2'
                    onPress={onRedirect}
                    activeOpacity={0.8}
                >
                    <StyledText className='text-white font-semibold text-base'>
                        {buttonText}
                    </StyledText>
                    <Ionicons name="arrow-forward-outline" size={20} color="white" />
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
}