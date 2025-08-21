// components/meeting/steps/DcrFormStep.tsx
import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);

interface DcrFormStepProps {
    meetingPurpose: string;
    setMeetingPurpose: (value: string) => void;
    meetingOutcome: string;
    setMeetingOutcome: (value: string) => void;
    productsPromoted: string;
    setProductsPromoted: (value: string) => void;
    additionalComments: string;
    setAdditionalComments: (value: string) => void;
}

export default function DcrFormStep({
    meetingPurpose,
    setMeetingPurpose,
    meetingOutcome,
    setMeetingOutcome,
    productsPromoted,
    setProductsPromoted,
    additionalComments,
    setAdditionalComments
}: DcrFormStepProps) {
    return (
        <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            <StyledView className='px-5 py-4'>
                <StyledView className='bg-white rounded-xl p-5 shadow-sm border border-gray-100'>
                    <StyledView className='flex-row items-center gap-2 mb-4'>
                        <Ionicons name="document-text-outline" size={20} color="#0077B6" />
                        <StyledText className='text-lg font-semibold text-gray-900'>
                            Daily Call Report
                        </StyledText>
                    </StyledView>

                    {/* Purpose of Meeting */}
                    <StyledView className='mb-4'>
                        <StyledText className='text-sm font-medium text-gray-700 mb-2'>
                            Purpose of Meeting *
                        </StyledText>
                        <StyledTextInput
                            className='bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base'
                            placeholder='Describe the main purpose and objectives of this meeting...'
                            value={meetingPurpose}
                            onChangeText={setMeetingPurpose}
                            multiline
                            numberOfLines={3}
                            textAlignVertical='top'
                            placeholderTextColor="#9CA3AF"
                        />
                    </StyledView>

                    {/* Meeting Outcome */}
                    <StyledView className='mb-4'>
                        <StyledText className='text-sm font-medium text-gray-700 mb-2'>
                            Meeting Outcome *
                        </StyledText>
                        <StyledTextInput
                            className='bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base'
                            placeholder="Summarize the key outcomes and chemist's response..."
                            value={meetingOutcome}
                            onChangeText={setMeetingOutcome}
                            multiline
                            numberOfLines={3}
                            textAlignVertical='top'
                            placeholderTextColor="#9CA3AF"
                        />
                    </StyledView>

                    {/* Products Promoted */}
                    <StyledView className='mb-4'>
                        <StyledText className='text-sm font-medium text-gray-700 mb-2'>
                            Products Promoted
                        </StyledText>
                        <StyledTextInput
                            className='bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base'
                            placeholder='List the products discussed and promoted during the meeting...'
                            value={productsPromoted}
                            onChangeText={setProductsPromoted}
                            multiline
                            numberOfLines={3}
                            textAlignVertical='top'
                            placeholderTextColor="#9CA3AF"
                        />
                    </StyledView>

                    {/* Additional Comments */}
                    <StyledView className='mb-2'>
                        <StyledText className='text-sm font-medium text-gray-700 mb-2'>
                            Additional Comments
                        </StyledText>
                        <StyledTextInput
                            className='bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base'
                            placeholder='Any additional notes, feedback, or observations...'
                            value={additionalComments}
                            onChangeText={setAdditionalComments}
                            multiline
                            numberOfLines={4}
                            textAlignVertical='top'
                            placeholderTextColor="#9CA3AF"
                        />
                    </StyledView>

                    {/* Helper Text */}
                    <StyledView className='mt-3 bg-blue-50 rounded-lg p-3'>
                        <StyledView className='flex-row items-start gap-2'>
                            <Ionicons name="information-circle-outline" size={16} color="#0077B6" />
                            <StyledText className='text-xs text-blue-700 flex-1'>
                                * Required fields. Please fill in at least the purpose and outcome before ending the meeting.
                            </StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledScrollView>
    );
}