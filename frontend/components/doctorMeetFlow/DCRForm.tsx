// components/meeting/DCRForm.tsx
import React from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);

export interface DCRFormData {
    purpose: string;
    outcome: string;
    productsPromoted: string;
    comments: string;
}

interface DCRFormProps {
    formData: DCRFormData;
    onFormChange: (field: keyof DCRFormData, value: string) => void;
}

export default function DCRForm({ formData, onFormChange }: DCRFormProps) {
    const formFields = [
        {
            key: 'purpose' as keyof DCRFormData,
            label: 'Purpose of Meeting',
            placeholder: 'Describe the main purpose and objectives of this meeting...',
            icon: 'flag-outline'
        },
        {
            key: 'outcome' as keyof DCRFormData,
            label: 'Meeting Outcome',
            placeholder: 'Summarize the key outcomes and doctor\'s response...',
            icon: 'checkmark-circle-outline'
        },
        {
            key: 'productsPromoted' as keyof DCRFormData,
            label: 'Products Promoted',
            placeholder: 'List the products discussed and promoted during the meeting...',
            icon: 'medical-outline'
        },
        {
            key: 'comments' as keyof DCRFormData,
            label: 'Additional Comments',
            placeholder: 'Any additional notes, feedback, or observations...',
            icon: 'chatbubble-outline'
        }
    ];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <StyledScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <StyledView className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
                    <StyledView className="flex-row items-center mb-4">
                        <Ionicons name="document-text-outline" size={24} color="#212529" />
                        <StyledText className="text-lg font-semibold text-gray-900 ml-2">
                            Daily Call Report
                        </StyledText>
                    </StyledView>

                    {formFields.map((field) => (
                        <StyledView key={field.key} className="mb-4">
                            <StyledView className="flex-row items-center mb-2">
                                <Ionicons name={field.icon as any} size={16} color="#6B7280" />
                                <StyledText className="text-sm font-medium text-gray-700 ml-2">
                                    {field.label}
                                </StyledText>
                            </StyledView>
                            <StyledTextInput
                                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-base"
                                placeholder={field.placeholder}
                                placeholderTextColor="#9CA3AF"
                                value={formData[field.key]}
                                onChangeText={(text) => onFormChange(field.key, text)}
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"
                            />
                        </StyledView>
                    ))}

                    <StyledView className="bg-blue-50 rounded-lg p-3 mt-2">
                        <StyledView className="flex-row items-start">
                            <Ionicons name="information-circle" size={16} color="#0077B6" />
                            <StyledText className="text-xs text-blue-700 ml-2 flex-1">
                                Please fill in at least one field before ending the meeting. Meeting start time will be auto-populated.
                            </StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledScrollView>
        </KeyboardAvoidingView>
    );
}