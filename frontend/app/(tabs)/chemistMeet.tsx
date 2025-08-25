// app/chemist-meeting/[chemistId].tsx
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    SafeAreaView,
    Alert,
    StatusBar,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { styled } from 'nativewind';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import custom components
import MeetingTimer from '../../components/chemistMeetFlow/MeetingTimerBar';
import StepIndicator from '../../components/chemistMeetFlow/StepIndicator';
import DrugPromotionStep from '../../components/chemistMeetFlow/DrugPromotionStep';
import RedirectStep from '../../components/chemistMeetFlow/RedirectStep';
import DcrFormStep from '../../components/chemistMeetFlow/DcrFormStep';
import { EndMeetingModal, RatingModal } from '../../components/chemistMeetFlow/MeetingModals';
import MeetingActionButtons from '../../components/chemistMeetFlow/MeetingActionButtons';

// Import services
import chemistService from '../../services/chemistService';
import drugService from '../../services/drugService';
import dcrService from '../../services/dcrService';

const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

// Steps configuration - matching doctor but with chemist-specific content
const STEPS = [
    { label: 'Drug Promotion', icon: 'medical' },
    { label: 'Create Order', icon: 'cart' },
    { label: 'Sample Distribution', icon: 'cube' },
    { label: 'RCPA Creation', icon: 'analytics' },
    { label: 'Meeting DCR', icon: 'document-text' }
];

interface Drug {
    id: string;
    name: string;
    composition: string;
    manufacturer: string;
    price?: number;
}

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

export default function ChemistMeeting() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const chemistId = params.chemistId as string;

    // Meeting state
    const [meetingStartTime] = useState(new Date());
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    // Data states
    const [chemistData, setChemistData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Drug promotion states
    const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

    // DCR form states
    const [meetingPurpose, setMeetingPurpose] = useState('');
    const [meetingOutcome, setMeetingOutcome] = useState('');
    const [productsPromoted, setProductsPromoted] = useState('');
    const [additionalComments, setAdditionalComments] = useState('');

    // Modal states
    const [showEndMeetingModal, setShowEndMeetingModal] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [meetingRating, setMeetingRating] = useState(0);

    // Time tracking for external flows
    const [timeSpentInFlows, setTimeSpentInFlows] = useState<{ [key: number]: number }>({});

    // Load chemist data
    useEffect(() => {
        fetchChemistData();
    }, [chemistId]);

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

    const fetchChemistData = async () => {
        try {
            setLoading(true);
            const data = await chemistService.getChemistDetails(chemistId);
            setChemistData(data);
        } catch (error) {
            console.error('Error fetching chemist data:', error);
            Alert.alert('Error', 'Failed to load chemist details');
        } finally {
            setLoading(false);
        }
    };

    // Drug search functionality (simplified to match doctor flow)
    const handleDrugSelect = (drug: Drug) => {
        setSelectedDrug(drug);
        // Auto-populate products promoted in DCR
        setProductsPromoted(prev =>
            prev ? `${prev}, ${drug.name}` : drug.name
        );
    };

    // Navigation functions
    const canGoNext = () => {
        if (currentStep === 1) {
            // Drug promotion step - can proceed even without selection
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

    // Redirect functions for integrated flows
    const redirectToOrderCreation = () => {
        const flowStartTime = new Date().toISOString();
        router.push({
            pathname: '/createOrder',
            params: {
                chemistId,
                chemistName: chemistData?.name,
                customerType: 'chemist',
                fromMeeting: 'true',
                meetingStartTime: meetingStartTime.toISOString(),
                returnToStep: currentStep.toString(),
                flowStartTime
            }
        });
    };

    const redirectToSampleDistribution = () => {
        const flowStartTime = new Date().toISOString();
        router.push({
            pathname: '/createDistribution',
            params: {
                customerId: chemistId,
                customerName: chemistData?.name,
                customerType: 'chemist',
                fromMeeting: 'true',
                meetingStartTime: meetingStartTime.toISOString(),
                returnToStep: currentStep.toString(),
                flowStartTime
            }
        });
    };

    const redirectToRcpaCreation = () => {
        const flowStartTime = new Date().toISOString();
        router.push({
            pathname: '/createRcpa',
            params: {
                chemistId,
                chemistName: chemistData?.name,
                customerType: 'chemist',
                fromMeeting: 'true',
                meetingStartTime: meetingStartTime.toISOString(),
                returnToStep: currentStep.toString(),
                flowStartTime
            }
        });
    };

    // Validate DCR form
    const validateDCRForm = () => {
        if (!meetingPurpose.trim() && !meetingOutcome.trim() && !productsPromoted.trim() && !additionalComments.trim()) {
            Alert.alert(
                'Required Fields',
                'Please fill in at least one field in the DCR form before ending the meeting.'
            );
            return false;
        }
        return true;
    };

    // Meeting end functionality
    const handleEndMeeting = () => {
        if (!validateDCRForm()) {
            return;
        }
        setShowEndMeetingModal(true);
    };

    const confirmEndMeeting = () => {
        setShowEndMeetingModal(false);
        setShowRatingModal(true);
    };

    const submitMeeting = async () => {
        try {
            setSubmitting(true);

            // Calculate total time including external flows
            const totalExternalTime = Object.values(timeSpentInFlows).reduce((sum, time) => sum + time, 0);

            const meetingData = {
                id: Date.now().toString(),
                chemistId,
                chemistName: chemistData?.name,
                startTime: meetingStartTime.toISOString(),
                endTime: new Date().toISOString(),
                selectedDrug: selectedDrug,
                purpose: meetingPurpose,
                outcome: meetingOutcome,
                productsPromoted,
                comments: additionalComments,
                rating: meetingRating,
                timeSpentInExternalFlows: totalExternalTime,
                externalFlowsBreakdown: timeSpentInFlows,
                createdAt: new Date().toISOString()
            };

            // Save to AsyncStorage (in production, send to API)
            const existingMeetings = await AsyncStorage.getItem('chemist_meetings');
            const meetings = existingMeetings ? JSON.parse(existingMeetings) : [];
            meetings.push(meetingData);
            await AsyncStorage.setItem('chemist_meetings', JSON.stringify(meetings));

            Alert.alert(
                'Meeting Completed',
                'Meeting ended successfully! DCR has been saved with meeting start time auto-populated.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.back()
                    }
                ]
            );
        } catch (error) {
            console.error('Error submitting meeting:', error);
            Alert.alert('Error', 'Failed to save meeting details. Please try again.');
        } finally {
            setSubmitting(false);
            setShowRatingModal(false);
        }
    };

    const skipRating = () => {
        setMeetingRating(0);
        submitMeeting();
    };

    const handleRatingChange = (rating: number) => {
        setMeetingRating(rating);
    };

    // Render step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <DrugPromotionStep
                        drugs={MOCK_DRUGS}
                        onDrugSelect={handleDrugSelect}
                        selectedDrug={selectedDrug}
                        customerName={chemistData?.name || 'Chemist'}
                    />
                );
            case 2:
                return (
                    <RedirectStep
                        icon="cart-outline"
                        iconColor="#0077B6"
                        title="Create Order"
                        description="Create a new product order for this chemist. This will redirect to the order creation flow."
                        buttonText="Open Order Creation"
                        onRedirect={redirectToOrderCreation}
                    />
                );
            case 3:
                return (
                    <RedirectStep
                        icon="gift-outline"
                        iconColor="#FFA000"
                        title="Distribute Samples & Gifts"
                        description="Add drug samples and promotional gifts to distribute to this chemist during the meeting."
                        buttonText="Open Sample Distribution"
                        onRedirect={redirectToSampleDistribution}
                    />
                );
            case 4:
                return (
                    <RedirectStep
                        icon="analytics-outline"
                        iconColor="#28A745"
                        title="Create RCPA Report"
                        description="Create a Retail Chemist Prescription Audit report for this chemist. This will redirect to the RCPA creation flow."
                        buttonText="Open RCPA Creation"
                        onRedirect={redirectToRcpaCreation}
                    />
                );
            case 5:
                return (
                    <DcrFormStep
                        meetingPurpose={meetingPurpose}
                        setMeetingPurpose={setMeetingPurpose}
                        meetingOutcome={meetingOutcome}
                        setMeetingOutcome={setMeetingOutcome}
                        productsPromoted={productsPromoted}
                        setProductsPromoted={setProductsPromoted}
                        additionalComments={additionalComments}
                        setAdditionalComments={setAdditionalComments}
                    />
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StyledView className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                </StyledView>
            </StyledSafeAreaView>
        );
    }

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
                            Chemist Meeting
                        </StyledText>
                        <StyledText className="text-sm text-[#0077B6]">
                            {chemistData?.name || 'Loading...'}
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
                chemistName={chemistData?.name || 'this chemist'}
                onCancel={() => setShowEndMeetingModal(false)}
                onConfirm={confirmEndMeeting}
            />

            <RatingModal
                visible={showRatingModal}
                rating={meetingRating}
                isSubmitting={submitting}
                onRatingChange={handleRatingChange}
                onSkip={skipRating}
                onSubmit={submitMeeting}
            />
        </StyledSafeAreaView>
    );
}