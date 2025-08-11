import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import RcpaService, { CreateRcpaRequest, UpdateRcpaRequest } from '../../services/rcpaService';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

export default function RCPASummary() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(false);

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
            action: 'create',
            customer: { label: 'No customer selected' },
            period: '',
            startDate: '',
            endDate: '',
            totalPrescriptions: 0,
            briefRemarks: '',
            auditItems: [],
            createdDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
    }

    // Extract action and rcpaId from data
    const isEditMode = rcpaData.action === 'edit';
    const rcpaId = rcpaData.rcpaId;

    // Convert YYYY-MM-DD back to DD-MM-YYYY for display and editing
    const convertDateForDisplay = (dateStr: string): string => {
        if (!dateStr || typeof dateStr !== 'string') {
            return '';
        }

        const trimmedDate = dateStr.trim();
        console.log('🔄 Converting date for display:', trimmedDate);

        // Handle YYYY-MM-DD format (convert to DD-MM-YYYY)
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedDate)) {
            const parts = trimmedDate.split('-');
            const convertedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            console.log('✅ Converted YYYY-MM-DD to DD-MM-YYYY for display:', convertedDate);
            return convertedDate;
        }

        // If already in DD-MM-YYYY format, return as is
        if (/^\d{2}-\d{2}-\d{4}$/.test(trimmedDate)) {
            console.log('✅ Already in DD-MM-YYYY format:', trimmedDate);
            return trimmedDate;
        }

        // Try to parse other formats and convert
        try {
            const parsedDate = new Date(trimmedDate);
            if (!isNaN(parsedDate.getTime())) {
                const day = parsedDate.getDate().toString().padStart(2, '0');
                const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
                const year = parsedDate.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;
                console.log('✅ Parsed and formatted date for display:', formattedDate);
                return formattedDate;
            }
        } catch (error) {
            console.warn('Could not parse date for display:', trimmedDate);
        }

        return trimmedDate;
    };

    // Format period display
    const formatPeriodDisplay = () => {
        if (!rcpaData.period || !rcpaData.startDate || !rcpaData.endDate) {
            return 'No period selected';
        }

        const periodType = rcpaData.period.toLowerCase() === 'weekly' ? 'Weekly' : 'Monthly';

        // Convert dates for display
        const displayStartDate = convertDateForDisplay(rcpaData.startDate);
        const displayEndDate = convertDateForDisplay(rcpaData.endDate);

        return `${periodType} (${displayStartDate} - ${displayEndDate})`;
    };

    const handleEditRCPA = () => {
        // Prepare the current summary data to pass back to create RCPA page
        // Convert dates back to DD-MM-YYYY format for editing
        const editData = {
            rcpaId: isEditMode ? rcpaId : undefined,
            chemistName: rcpaData.customer?.label || '',
            chemistId: rcpaData.customer?.id || '',
            reportingPeriod: rcpaData.period,
            // Convert dates to DD-MM-YYYY format for the create page
            startDate: convertDateForDisplay(rcpaData.startDate),
            endDate: convertDateForDisplay(rcpaData.endDate),
            totalPrescriptions: rcpaData.totalPrescriptions,
            briefRemarks: rcpaData.briefRemarks,
            auditItems: rcpaData.auditItems.map((item: any) => ({
                id: item.id,
                ourProduct: {
                    id: item.drugId,
                    name: item.drugName,
                    quantity: item.ownQuantity,
                    packSize: item.ownPackSize || ''
                },
                competitor: {
                    name: item.competitorDrugName,
                    quantity: item.competitorQuantity,
                    packSize: item.competitorPackSize
                }
            }))
        };

        console.log('📝 Sending edit data back to create RCPA:', editData);

        // Navigate back to create RCPA with current data
        router.push({
            pathname: '/createRcpa',
            params: {
                editData: JSON.stringify(editData),
                fromSummary: 'true'
            }
        });
    };

    const handleConfirmRCPA = async () => {
        if (!rcpaData.customer?.id || rcpaData.auditItems.length === 0) {
            Alert.alert('Error', 'Invalid RCPA data. Please go back and check your selections.');
            return;
        }

        const actionText = isEditMode ? 'update and confirm' : 'confirm';
        const confirmText = isEditMode ? 'Update & Confirm' : 'Confirm';

        Alert.alert(
            'Confirm RCPA Report',
            `Are you sure you want to ${actionText} this RCPA report? This will create the final report.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: confirmText,
                    onPress: async () => {
                        setLoading(true);

                        try {
                            if (isEditMode && rcpaId) {
                                // EDIT MODE: Update existing RCPA
                                console.log('🔄✅ Updating existing RCPA:', rcpaId);

                                const updateRequest: UpdateRcpaRequest = {
                                    totalPrescriptions: rcpaData.totalPrescriptions,
                                    remarks: rcpaData.briefRemarks || undefined,
                                    drugData: rcpaData.auditItems.map((item: any) => ({
                                        drugId: item.drugId,
                                        competitorDrugName: item.competitorDrugName,
                                        ownQuantity: item.ownQuantity,
                                        competitorQuantity: item.competitorQuantity,
                                        ownPackSize: item.ownPackSize,
                                        competitorPackSize: item.competitorPackSize
                                    }))
                                };

                                const result = await RcpaService.updateRcpa(rcpaId, updateRequest);

                                Alert.alert(
                                    'RCPA Updated & Confirmed!',
                                    `Your RCPA report ${result.rcpaId} has been successfully updated and confirmed. You can view and share it from the RCPA section.`,
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => {
                                                router.push('/(tabs)/rcpa');
                                            }
                                        }
                                    ]
                                );

                            } else {
                                // CREATE MODE: Create new RCPA
                                console.log('✨✅ Creating and confirming new RCPA');

                                const rcpaRequest: CreateRcpaRequest = {
                                    chemistId: rcpaData.customer.id,
                                    reportingPeriod: rcpaData.period.toUpperCase(),
                                    startDate: rcpaData.startDate, // Keep in YYYY-MM-DD format for backend
                                    endDate: rcpaData.endDate,     // Keep in YYYY-MM-DD format for backend
                                    totalPrescriptions: rcpaData.totalPrescriptions,
                                    remarks: rcpaData.briefRemarks || undefined,
                                    drugData: rcpaData.auditItems.map((item: any) => ({
                                        drugId: item.drugId,
                                        competitorDrugName: item.competitorDrugName,
                                        ownQuantity: item.ownQuantity,
                                        competitorQuantity: item.competitorQuantity,
                                        ownPackSize: item.ownPackSize,
                                        competitorPackSize: item.competitorPackSize
                                    }))
                                };

                                const result = await RcpaService.createRcpa(rcpaRequest);

                                Alert.alert(
                                    'RCPA Created & Confirmed!',
                                    `Your RCPA report ${result.rcpaId} has been created successfully. You can view and share it from the RCPA section.`,
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => {
                                                router.push('/(tabs)/rcpa');
                                            }
                                        }
                                    ]
                                );
                            }

                        } catch (error: any) {
                            console.error('Error confirming RCPA:', error);
                            Alert.alert('Error', error.message || 'Failed to confirm RCPA report. Please try again.');
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    const handleDrugNamePress = (drugName: string) => {
        console.log('Opening drug details for:', drugName);
        // Navigate to drug details page if needed
        // router.push({ pathname: '/drugDetails', params: { drugName } });
    };

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>
            {/* Header */}
            <StyledView className='bg-white px-5 py-4 flex-row items-center border-b border-gray-200'>
                <StyledTouchableOpacity
                    className='mr-4'
                    onPress={() => router.back()}
                    disabled={loading}
                >
                    <Ionicons name="arrow-back" size={24} color={loading ? "#9CA3AF" : "#374151"} />
                </StyledTouchableOpacity>
                <StyledText className='text-xl font-semibold text-gray-900'>
                    {isEditMode ? 'Update RCPA Summary' : 'RCPA Summary'}
                </StyledText>
            </StyledView>

            <StyledScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            >
                {/* RCPA Highlights */}
                <StyledView className="bg-white rounded-lg p-5 mb-5 border border-gray-200">
                    {/* Edit Mode Indicator */}
                    {isEditMode && (
                        <StyledView style={{
                            backgroundColor: '#FEF3C7',
                            borderRadius: 6,
                            padding: 12,
                            marginBottom: 16,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Ionicons name="create-outline" size={16} color="#D97706" />
                            <StyledText style={{
                                fontSize: 14,
                                color: '#D97706',
                                fontWeight: '500',
                                marginLeft: 8
                            }}>
                                Editing RCPA: {rcpaId}
                            </StyledText>
                        </StyledView>
                    )}

                    {/* Customer */}
                    <StyledView className="flex-row justify-between items-start py-2 border-b border-gray-100">
                        <StyledText className="text-sm font-medium text-gray-600">Customer</StyledText>
                        <StyledText className="text-sm font-semibold text-gray-900 flex-1 text-right ml-5">
                            {rcpaData.customer?.label || 'No customer selected'}
                        </StyledText>
                    </StyledView>

                    {/* Created By */}
                    <StyledView className="flex-row justify-between items-start py-2 border-b border-gray-100">
                        <StyledText className="text-sm font-medium text-gray-600">
                            {isEditMode ? 'Updated By' : 'Created By'}
                        </StyledText>
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

                    {/* Total Prescriptions */}
                    <StyledView className="flex-row justify-between items-start py-2 border-b border-gray-100">
                        <StyledText className="text-sm font-medium text-gray-600">Total Prescriptions</StyledText>
                        <StyledText className="text-sm font-semibold text-gray-900">
                            {rcpaData.totalPrescriptions || 0}
                        </StyledText>
                    </StyledView>

                    {/* Creation Date */}
                    <StyledView className={`flex-row justify-between items-start py-2 ${rcpaData.briefRemarks ? 'border-b border-gray-100' : ''}`}>
                        <StyledText className="text-sm font-medium text-gray-600">
                            {isEditMode ? 'Last Updated' : 'Creation Date'}
                        </StyledText>
                        <StyledText className="text-sm font-semibold text-gray-900">
                            {rcpaData.createdDate}
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
                                            onPress={() => handleDrugNamePress(item.drugName || '')}
                                            activeOpacity={0.7}
                                        >
                                            <StyledText className="text-base font-semibold text-[#0077B6] mb-2 underline leading-5">
                                                {item.drugName || 'Not specified'}
                                            </StyledText>
                                        </StyledTouchableOpacity>

                                        <StyledText className="text-xs text-gray-600">
                                            Qty: {item.ownQuantity || 0} units
                                        </StyledText>
                                        <StyledText className="text-xs text-gray-600">
                                            Pack: {item.ownPackSize || 'Not specified'}
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
                                            {item.competitorDrugName || 'Not specified'}
                                        </StyledText>

                                        <StyledText className="text-xs text-gray-600">
                                            Qty: {item.competitorQuantity || 0} units
                                        </StyledText>
                                        <StyledText className="text-xs text-gray-600">
                                            Pack: {item.competitorPackSize || 'Not specified'}
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

            {/* Loading Overlay */}
            {loading && (
                <StyledView style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <StyledView style={{
                        backgroundColor: 'white',
                        borderRadius: 12,
                        padding: 24,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <ActivityIndicator size="large" color="#0077B6" />
                        <StyledText style={{
                            marginTop: 12,
                            fontSize: 16,
                            fontWeight: '500',
                            color: '#374151'
                        }}>
                            {isEditMode ? 'Updating RCPA...' : 'Processing RCPA...'}
                        </StyledText>
                    </StyledView>
                </StyledView>
            )}

            {/* Bottom Actions */}
            <StyledView className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 flex-row gap-3"
                style={{
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                }}
            >
                {/* Edit RCPA Button */}
                <StyledTouchableOpacity
                    onPress={handleEditRCPA}
                    disabled={loading}
                    className="flex-1 py-3 px-6 rounded-lg border border-gray-300 bg-gray-50 items-center"
                    style={{ opacity: loading ? 0.5 : 1 }}
                    activeOpacity={loading ? 1 : 0.7}
                >
                    <StyledText className={`text-sm font-semibold ${loading ? 'text-gray-400' : 'text-gray-700'}`}>
                        Edit RCPA
                    </StyledText>
                </StyledTouchableOpacity>

                {/* Confirm RCPA Button */}
                <StyledTouchableOpacity
                    onPress={handleConfirmRCPA}
                    disabled={loading}
                    style={{
                        flex: 1,
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                        backgroundColor: loading ? '#9CA3AF' : '#0077B6',
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: loading ? 0 : 2,
                        shadowColor: loading ? 'transparent' : '#0077B6',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }}
                    activeOpacity={loading ? 1 : 0.8}
                >
                    <StyledText style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#FFFFFF'
                    }}>
                        {isEditMode ? 'Update & Confirm' : 'Confirm'}
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledSafeAreaView>
    );
}