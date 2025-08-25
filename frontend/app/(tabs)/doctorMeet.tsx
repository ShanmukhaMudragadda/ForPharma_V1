import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    StatusBar
} from 'react-native';
import { styled } from 'nativewind';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import all components
import MeetingTimer from '../../components/doctorMeetFlow/MeetingTimer';
import StepIndicator from '../../components/doctorMeetFlow/StepIndicator';
import DrugSearch, { Drug } from '../../components/doctorMeetFlow/DrugSearch';
import PromotionalMaterials from '../../components/doctorMeetFlow/PromotionalMaterials';
import DCRForm, { DCRFormData } from '../../components/doctorMeetFlow/DCRForm';
import SampleDistributionRedirect from '../../components/doctorMeetFlow/SampleDistributionRedirect';
import { EndMeetingModal, RatingModal } from '../../components/doctorMeetFlow/MeetingModals';
import MeetingActionButtons from '../../components/doctorMeetFlow/MeetingActionButtons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

// Mock drug data - In production, this would come from API
const MOCK_DRUGS: Drug[] = [
    { id: '1', name: 'Aspirin', composition: 'Acetylsalicylic Acid 75mg', manufacturer: 'Bayer' },
    { id: '2', name: 'Paracetamol', composition: 'Paracetamol 500mg', manufacturer: 'GSK' },
    { id: '3', name: 'Lisinopril', composition: 'Lisinopril 10mg', manufacturer: 'Pfizer' },
    { id: '4', name: 'Metformin', composition: 'Metformin HCl 500mg', manufacturer: 'Merck' },
    { id: '5', name: 'Omeprazole', composition: 'Omeprazole 20mg', manufacturer: 'AstraZeneca' },
    { id: '6', name: 'Atorvastatin', composition: 'Atorvastatin 20mg', manufacturer: 'Pfizer' },
    { id: '7', name: 'Amlodipine', composition: 'Amlodipine 5mg', manufacturer: 'Novartis' },
    { id: '8', name: 'Losartan', composition: 'Losartan 50mg', manufacturer: 'Merck' },
];

const STEPS = [
    { label: 'Drug Promotion', icon: 'medical' },
    { label: 'Sample Distribution', icon: 'cube' },
    { label: 'Meeting DCR', icon: 'document-text' }
];

export default function DoctorMeeting() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const doctorId = params.doctorId as string;
    const doctorName = params.doctorName as string || 'Doctor';

    // Meeting state
    const [meetingStartTime] = useState(new Date());
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    // Drug promotion state
    const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

    // DCR form state
    const [dcrFormData, setDcrFormData] = useState<DCRFormData>({
        purpose: '',
        outcome: '',
        productsPromoted: '',
        comments: ''
    });

    // Modal states
    const [showEndMeetingModal, setShowEndMeetingModal] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [meetingRating, setMeetingRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Time tracking for external flows
    const [timeSpentInFlows, setTimeSpentInFlows] = useState<{ [key: number]: number }>({});

    // Handle returning from external flows
    useFocusEffect(
        React.useCallback(() => {
            // Check if we have params indicating return from external flow
            if (params.returnFromFlow && params.timeSpent && params.returnToStep) {
                const step = parseInt(params.returnToStep as string);
                const timeSpent = parseInt(params.timeSpent as string);

                console.log(`🔄 Returning to step ${step} after ${timeSpent} seconds in external flow`);

                // Update time tracking
                setTimeSpentInFlows(prev => ({
                    ...prev,
                    [step]: (prev[step] || 0) + timeSpent
                }));

                // Return to the correct step
                setCurrentStep(step);

                // Clear the params by navigating back to this route without the params
                router.setParams({
                    returnFromFlow: undefined,
                    timeSpent: undefined,
                    returnToStep: undefined
                });
            }
        }, [params.returnFromFlow, params.timeSpent, params.returnToStep])
    );

    // Handle drug selection
    const handleDrugSelect = (drug: Drug) => {
        setSelectedDrug(drug);
        // Auto-populate products promoted
        setDcrFormData(prev => ({
            ...prev,
            productsPromoted: prev.productsPromoted
                ? `${prev.productsPromoted}, ${drug.name}`
                : drug.name
        }));
    };

    // Handle DCR form changes
    const handleFormChange = (field: keyof DCRFormData, value: string) => {
        setDcrFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Navigate to sample distribution
    const handleSampleDistribution = () => {
        const flowStartTime = new Date().toISOString();
        router.push({
            pathname: '/createDistribution',
            params: {
                customerId: doctorId,
                customerName: doctorName,
                customerType: 'doctor',
                fromMeeting: 'true',
                meetingStartTime: meetingStartTime.toISOString(),
                returnToStep: currentStep.toString(),
                flowStartTime
            }
        });
    };

    // Step navigation
    const canGoNext = () => {
        if (currentStep === 1) {
            // Can always proceed from drug promotion (optional step)
            return true;
        }
        return true;
    };

    const goToNextStep = () => {
        if (currentStep < totalSteps && canGoNext()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Validate DCR form
    const validateDCRForm = () => {
        const { purpose, outcome, productsPromoted, comments } = dcrFormData;
        if (!purpose.trim() && !outcome.trim() && !productsPromoted.trim() && !comments.trim()) {
            Alert.alert(
                'Required Fields',
                'Please fill in at least one field in the DCR form before ending the meeting.'
            );
            return false;
        }
        return true;
    };

    // Handle end meeting
    const handleEndMeeting = () => {
        if (!validateDCRForm()) {
            return;
        }
        setShowEndMeetingModal(true);
    };

    // Confirm end meeting
    const confirmEndMeeting = () => {
        setShowEndMeetingModal(false);
        setShowRatingModal(true);
    };

    // Submit meeting data
    const submitMeeting = async () => {
        setIsSubmitting(true);

        try {
            // Calculate total time including external flows
            const totalExternalTime = Object.values(timeSpentInFlows).reduce((sum, time) => sum + time, 0);

            const meetingData = {
                id: Date.now().toString(),
                doctorId,
                doctorName,
                startTime: meetingStartTime.toISOString(),
                endTime: new Date().toISOString(),
                selectedDrugs: selectedDrug ? [selectedDrug] : [],
                ...dcrFormData,
                rating: meetingRating,
                timeSpentInExternalFlows: totalExternalTime,
                externalFlowsBreakdown: timeSpentInFlows,
                createdAt: new Date().toISOString()
            };

            // Save to AsyncStorage (in production, send to API)
            const existingMeetings = await AsyncStorage.getItem('meetings');
            const meetings = existingMeetings ? JSON.parse(existingMeetings) : [];
            meetings.push(meetingData);
            await AsyncStorage.setItem('meetings', JSON.stringify(meetings));

            // Show success message
            Alert.alert(
                'Success',
                'Meeting ended successfully! DCR has been saved with meeting start time auto-populated.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            router.back();
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Error saving meeting:', error);
            Alert.alert('Error', 'Failed to save meeting data. Please try again.');
        } finally {
            setIsSubmitting(false);
            setShowRatingModal(false);
        }
    };

    // Skip rating and submit
    const skipRating = () => {
        setMeetingRating(0);
        submitMeeting();
    };

    // Handle rating change
    const handleRatingChange = (rating: number) => {
        setMeetingRating(rating);
    };

    // Render step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <StyledView className="flex-1 p-5">
                        <DrugSearch
                            drugs={MOCK_DRUGS}
                            onDrugSelect={handleDrugSelect}
                            selectedDrug={selectedDrug}
                        />
                        <PromotionalMaterials
                            selectedDrug={selectedDrug}
                            doctorName={doctorName}
                        />
                    </StyledView>
                );
            case 2:
                return (
                    <SampleDistributionRedirect
                        doctorName={doctorName}
                        onPress={handleSampleDistribution}
                    />
                );
            case 3:
                return (
                    <StyledView className="p-5">
                        <DCRForm
                            formData={dcrFormData}
                            onFormChange={handleFormChange}
                        />
                    </StyledView>
                );
            default:
                return null;
        }
    };

    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header */}
            <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                <StyledView className="flex-row items-center flex-1">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center mr-3"
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={20} color="#6C757D" />
                    </StyledTouchableOpacity>
                    <StyledView className="flex-1">
                        <StyledText className="text-lg font-semibold text-gray-900">
                            Doctor Meeting
                        </StyledText>
                        <StyledText className="text-sm text-[#0077B6]">
                            {doctorName}
                        </StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>

            {/* Meeting Timer */}
            <MeetingTimer
                startTime={meetingStartTime}
                additionalTime={Object.values(timeSpentInFlows).reduce((sum, time) => sum + time, 0)}
            />

            {/* Step Indicator */}
            <StepIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                steps={STEPS}
            />

            {/* Main Content */}
            <StyledScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {renderStepContent()}
            </StyledScrollView>

            {/* Action Buttons */}
            <MeetingActionButtons
                currentStep={currentStep}
                totalSteps={totalSteps}
                onPrevious={goToPreviousStep}
                onNext={goToNextStep}
                onEndMeeting={handleEndMeeting}
                canGoNext={canGoNext()}
            />

            {/* Modals */}
            <EndMeetingModal
                visible={showEndMeetingModal}
                doctorName={doctorName}
                onCancel={() => setShowEndMeetingModal(false)}
                onConfirm={confirmEndMeeting}
            />

            <RatingModal
                visible={showRatingModal}
                rating={meetingRating}
                isSubmitting={isSubmitting}
                onRatingChange={handleRatingChange}
                onSkip={skipRating}
                onSubmit={submitMeeting}
            />
        </StyledSafeAreaView>
    );
}