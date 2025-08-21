// components/meeting/StepIndicator.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    steps: {
        label: string;
        icon: string;
    }[];
}

export default function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
    return (
        <StyledView className="bg-white px-5 py-4 border-b border-gray-200">
            {/* Progress Steps */}
            <StyledView className="flex-row justify-between items-center mb-3">
                {Array.from({ length: totalSteps }, (_, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isActive = stepNumber === currentStep;

                    return (
                        <StyledView key={stepNumber} className="flex-row items-center flex-1">
                            <StyledView
                                className={`w-10 h-10 rounded-full items-center justify-center ${isCompleted ? 'bg-green-500' :
                                        isActive ? 'bg-[#0077B6]' : 'bg-gray-300'
                                    }`}
                            >
                                {isCompleted ? (
                                    <Ionicons name="checkmark" size={20} color="white" />
                                ) : (
                                    <StyledText className="text-white font-semibold">
                                        {stepNumber}
                                    </StyledText>
                                )}
                            </StyledView>
                            {stepNumber < totalSteps && (
                                <StyledView
                                    className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                />
                            )}
                        </StyledView>
                    );
                })}
            </StyledView>

            {/* Step Labels */}
            <StyledView className="flex-row justify-between">
                {steps.map((step, index) => (
                    <StyledText
                        key={index}
                        className={`text-xs flex-1 text-center ${currentStep === index + 1
                                ? 'text-[#0077B6] font-semibold'
                                : 'text-gray-600'
                            }`}
                    >
                        {step.label}
                    </StyledText>
                ))}
            </StyledView>
        </StyledView>
    );
}