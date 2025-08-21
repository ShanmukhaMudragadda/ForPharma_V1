// components/meeting/MeetingModals.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledModal = styled(Modal);

interface EndMeetingModalProps {
    visible: boolean;
    chemistName: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export function EndMeetingModal({ visible, chemistName, onCancel, onConfirm }: EndMeetingModalProps) {
    return (
        <StyledModal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <StyledView className="flex-1 bg-black/50 justify-center items-center px-5">
                <StyledView className="bg-white rounded-2xl p-6 w-full max-w-sm">
                    <StyledView className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-4 mx-auto">
                        <Ionicons name="checkmark-circle" size={24} color="#DC3545" />
                    </StyledView>
                    <StyledText className="text-lg font-semibold text-gray-900 text-center mb-2">
                        End Meeting?
                    </StyledText>
                    <StyledText className="text-sm text-gray-600 text-center mb-6">
                        Are you sure you want to end this meeting with {chemistName}? This will save your DCR and log the meeting details.
                    </StyledText>
                    <StyledView className="flex-row gap-3">
                        <StyledTouchableOpacity
                            className="flex-1 py-3 bg-gray-100 rounded-lg"
                            onPress={onCancel}
                        >
                            <StyledText className="text-center font-semibold text-gray-700">
                                Continue Meeting
                            </StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity
                            className="flex-1 py-3 bg-red-500 rounded-lg"
                            onPress={onConfirm}
                        >
                            <StyledText className="text-center font-semibold text-white">
                                End Meeting
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledModal>
    );
}

interface RatingModalProps {
    visible: boolean;
    rating: number;
    isSubmitting: boolean;
    onRatingChange: (rating: number) => void;
    onSkip: () => void;
    onSubmit: () => void;
}

export function RatingModal({
    visible,
    rating,
    isSubmitting,
    onRatingChange,
    onSkip,
    onSubmit
}: RatingModalProps) {
    return (
        <StyledModal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
        >
            <StyledView className="flex-1 bg-black/50 justify-center items-center px-5">
                <StyledView className="bg-white rounded-2xl p-6 w-full max-w-sm">
                    <StyledText className="text-lg font-semibold text-gray-900 text-center mb-2">
                        Rate This Meeting
                    </StyledText>
                    <StyledText className="text-sm text-gray-600 text-center mb-6">
                        How would you rate the overall effectiveness of this meeting?
                    </StyledText>

                    {/* Star Rating */}
                    <StyledView className="flex-row justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StyledTouchableOpacity
                                key={star}
                                onPress={() => onRatingChange(star)}
                                disabled={isSubmitting}
                            >
                                <Ionicons
                                    name={star <= rating ? "star" : "star-outline"}
                                    size={36}
                                    color={star <= rating ? "#FFD700" : "#E5E7EB"}
                                />
                            </StyledTouchableOpacity>
                        ))}
                    </StyledView>

                    {rating > 0 && (
                        <StyledText className="text-center text-sm text-gray-600 mb-4">
                            {rating === 1 && "Poor"}
                            {rating === 2 && "Fair"}
                            {rating === 3 && "Good"}
                            {rating === 4 && "Very Good"}
                            {rating === 5 && "Excellent"}
                        </StyledText>
                    )}

                    {isSubmitting ? (
                        <StyledView className="py-4">
                            <ActivityIndicator size="large" color="#0077B6" />
                            <StyledText className="text-center text-sm text-gray-600 mt-2">
                                Saving meeting data...
                            </StyledText>
                        </StyledView>
                    ) : (
                        <StyledView className="flex-row gap-3">
                            <StyledTouchableOpacity
                                className="flex-1 py-3 bg-gray-100 rounded-lg"
                                onPress={onSkip}
                            >
                                <StyledText className="text-center font-semibold text-gray-700">
                                    Skip
                                </StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                className={`flex-1 py-3 rounded-lg ${rating > 0 ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                                onPress={onSubmit}
                                disabled={rating === 0}
                            >
                                <StyledText className={`text-center font-semibold ${rating > 0 ? 'text-white' : 'text-gray-500'
                                    }`}>
                                    Submit
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    )}
                </StyledView>
            </StyledView>
        </StyledModal>
    );
}