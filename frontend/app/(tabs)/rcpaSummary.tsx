import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

export default function RCPASummary() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // ==================== FUNCTIONS ====================

    // Parse the data from params
    let rcpaData;
    try {
        rcpaData = params.summaryData ? JSON.parse(params.summaryData as string) : null;
    } catch (error) {
        console.error('Error parsing summary data:', error);
        rcpaData = null;
    }

    // Fallback data if no params
    if (!rcpaData) {
        rcpaData = {
            customer: { label: 'No customer selected' },
            period: '',
            startDate: '',
            endDate: '',
            briefRemarks: '',
            auditItems: [],
            createdDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
    }

    // Format period display
    const formatPeriodDisplay = () => {
        if (!rcpaData.period || !rcpaData.startDate || !rcpaData.endDate) {
            return 'No period selected';
        }

        const periodType = rcpaData.period.charAt(0).toUpperCase() + rcpaData.period.slice(1);
        return `${periodType} (${rcpaData.startDate} - ${rcpaData.endDate})`;
    };

    const handleConfirmRCPA = () => {
        Alert.alert(
            'Confirm RCPA Report',
            'Are you sure you want to confirm this RCPA report? Once confirmed, the report cannot be modified.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        // Show success message
                        Alert.alert(
                            'RCPA Report Created Successfully!',
                            'Your RCPA report has been created successfully. You can view and share it from the RCPA section.',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        // Navigate to RCPA list or home
                                        router.push('/(tabs)/rcpa');
                                    }
                                }
                            ]
                        );
                    }
                }
            ]
        );
    };

    const handleEditRCPA = () => {
        // Navigate back to create RCPA page
        router.back();
    };

    const handleDrugNamePress = (drugName: string) => {
        console.log('Opening drug details for:', drugName);
        // Navigate to drug details page if needed
        // router.push({ pathname: '/drugDetails', params: { drugName } });
    };

    // ==================== UI/JSX ====================

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>
            {/* Header */}
            <StyledView className='bg-white px-5 py-4 flex-row items-center border-b border-gray-200'>
                <StyledTouchableOpacity className='mr-4' onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </StyledTouchableOpacity>
                <StyledText className='text-xl font-semibold text-gray-900'>
                    RCPA Summary
                </StyledText>
            </StyledView>

            <StyledScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            >
                {/* RCPA Highlights */}
                <StyledView className="bg-white rounded-lg p-5 mb-5 border border-gray-200">
                    {/* Customer */}
                    <StyledView className="flex-row justify-between items-start py-2 border-b border-gray-100">
                        <StyledText className="text-sm font-medium text-gray-600">Customer</StyledText>
                        <StyledText className="text-sm font-semibold text-gray-900 flex-1 text-right ml-5">
                            {rcpaData.customer?.label || 'No customer selected'}
                        </StyledText>
                    </StyledView>

                    {/* Created By */}
                    <StyledView className="flex-row justify-between items-start py-2 border-b border-gray-100">
                        <StyledText className="text-sm font-medium text-gray-600">Created By</StyledText>
                        <StyledText className="text-sm font-semibold text-gray-900">
                            You
                        </StyledText>
                    </StyledView>

                    {/* Reporting Period */}
                    <StyledView className="flex-row justify-between items-start py-2 border-b border-gray-100">
                        <StyledText className="text-sm font-medium text-gray-600">Reporting Period</StyledText>
                        <StyledText className="text-sm font-semibold text-gray-900 flex-1 text-right ml-5">
                            {formatPeriodDisplay()}
                        </StyledText>
                    </StyledView>

                    {/* Region */}
                    <StyledView className={`flex-row justify-between items-start py-2 ${rcpaData.briefRemarks ? 'border-b border-gray-100' : ''}`}>
                        <StyledText className="text-sm font-medium text-gray-600">Region</StyledText>
                        <StyledText className="text-sm font-semibold text-gray-900">
                            New Delhi, Delhi
                        </StyledText>
                    </StyledView>

                    {/* Remarks (if available) */}
                    {rcpaData.briefRemarks && (
                        <StyledView className="flex-row justify-between items-start py-2">
                            <StyledText className="text-sm font-medium text-gray-600">Remarks</StyledText>
                            <StyledText className="text-sm text-gray-900 flex-1 text-right ml-5 leading-5">
                                {rcpaData.briefRemarks}
                            </StyledText>
                        </StyledView>
                    )}
                </StyledView>

                {/* Items Audited */}
                <StyledView className="bg-white rounded-lg p-5 border border-gray-200">
                    <StyledText className="text-lg font-semibold text-gray-900 mb-4">
                        Items Audited ({rcpaData.auditItems?.length || 0})
                    </StyledText>

                    {rcpaData.auditItems && rcpaData.auditItems.length > 0 ? (
                        rcpaData.auditItems.map((item: any, index: number) => (
                            <StyledView
                                key={item.id}
                                className={`bg-gray-50 rounded-lg p-4 border border-gray-200 ${index < rcpaData.auditItems.length - 1 ? 'mb-3' : ''}`}
                            >
                                <StyledView className="flex-row gap-3">
                                    {/* Our Product Section */}
                                    <StyledView
                                        className="flex-1 bg-white p-3 rounded-lg border border-gray-200"
                                        style={{ borderLeftWidth: 4, borderLeftColor: '#0077B6' }}
                                    >
                                        <StyledText className="text-xs font-semibold text-[#0077B6] uppercase mb-2">
                                            Our Product
                                        </StyledText>

                                        <StyledTouchableOpacity
                                            onPress={() => handleDrugNamePress(item.companyDrug?.name || '')}
                                            activeOpacity={0.7}
                                        >
                                            <StyledText className="text-base font-semibold text-[#0077B6] mb-2 underline leading-5">
                                                {item.companyDrug?.name || 'Not specified'}
                                            </StyledText>
                                        </StyledTouchableOpacity>

                                        <StyledText className="text-xs text-gray-600">
                                            Qty: {item.companyQuantity || 0} | Pack: {item.companyDrug?.packSize || item.companyPackSize || 'Not specified'}
                                        </StyledText>
                                    </StyledView>

                                    {/* Competitor Section */}
                                    <StyledView
                                        className="flex-1 bg-white p-3 rounded-lg border border-gray-200"
                                        style={{ borderLeftWidth: 4, borderLeftColor: '#EF4444' }}
                                    >
                                        <StyledText className="text-xs font-semibold text-red-500 uppercase mb-2">
                                            Competitor
                                        </StyledText>

                                        <StyledText className="text-base font-semibold text-gray-900 mb-2 leading-5">
                                            {item.competitorDrug || 'Not specified'}
                                        </StyledText>

                                        <StyledText className="text-xs text-gray-600">
                                            Qty: {item.competitorQuantity || 0} | Pack: {item.competitorPackSize || 'Not specified'}
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledView>
                        ))
                    ) : (
                        <StyledText className="text-center text-gray-500 text-base py-5">
                            No audit items added
                        </StyledText>
                    )}
                </StyledView>
            </StyledScrollView>

            {/* Bottom Actions */}
            <StyledView className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 flex-row gap-3">
                <StyledTouchableOpacity
                    onPress={handleEditRCPA}
                    className="flex-1 py-3 px-6 rounded-lg border border-gray-300 bg-gray-50 items-center"
                    activeOpacity={0.7}
                >
                    <StyledText className="text-sm font-semibold text-gray-700">
                        Edit RCPA
                    </StyledText>
                </StyledTouchableOpacity>

                <StyledTouchableOpacity
                    onPress={handleConfirmRCPA}
                    className="flex-1 py-3 px-6 rounded-lg bg-[#0077B6] items-center"
                    activeOpacity={0.8}
                >
                    <StyledText className="text-sm font-semibold text-white">
                        Confirm RCPA
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledSafeAreaView>
    );
}