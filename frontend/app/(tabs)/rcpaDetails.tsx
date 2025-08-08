import { useRouter, useLocalSearchParams } from 'expo-router';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import RcpaService, { RCPADetailsResponse, AuditItem } from '../../services/rcpaService';
import PDFService from '../../services/pdfService';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export default function RCPADetailsPage(): JSX.Element {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    // State management
    const [rcpaDetails, setRcpaDetails] = useState<RCPADetailsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSharing, setIsSharing] = useState<boolean>(false);
    const [showAllItems, setShowAllItems] = useState<boolean>(false);

    // Extract rcpaId from params
    const { rcpaId } = params;

    const ITEMS_TO_SHOW_INITIALLY = 3;

    // Load RCPA details from backend
    const loadRCPADetails = async () => {
        if (!rcpaId || typeof rcpaId !== 'string') {
            setError('Invalid RCPA ID');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const details = await RcpaService.getRcpaDetails(rcpaId);
            setRcpaDetails(details);
        } catch (error: any) {
            console.error('Error loading RCPA details:', error);
            setError(error.message || 'Failed to load RCPA details');
            Alert.alert('Error', 'Failed to load RCPA details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Load RCPA details on component mount
    useEffect(() => {
        loadRCPADetails();
    }, [rcpaId]);

    const formatDate = (dateString: string): string => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleShare = async (): void => {
        if (!rcpaDetails || isSharing) return;

        try {
            setIsSharing(true);

            // Generate and share RCPA PDF (similar to order PDF)
            await PDFService.generateAndShareRcpaPDF({
                rcpaDetails,
                formatDate: (dateString: string) => formatDate(dateString)
            });

            console.log('RCPA PDF shared successfully');
        } catch (error: any) {
            console.error('Error sharing RCPA report:', error);
            Alert.alert(
                'Share Failed',
                error.message || 'Failed to generate or share the RCPA report PDF. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsSharing(false);
        }
    };

    const handleChemistPress = (): void => {
        if (rcpaDetails?.chemistId) {
            // Navigate to chemist details page
            router.push({
                pathname: '/chemistDetails',
                params: { chemistId: rcpaDetails.chemistId }
            });
        }
    };

    const renderAuditItem = (item: AuditItem) => (
        <StyledView key={item.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <StyledView className="flex-row gap-4">
                {/* Company Drug */}
                <StyledView
                    className="flex-1 bg-white p-3 rounded-md"
                    style={{ borderLeftWidth: 4, borderLeftColor: '#0077B6' }}
                >
                    <StyledText className="text-xs font-semibold text-[#0077B6] uppercase mb-2">
                        Our Product
                    </StyledText>
                    <StyledTouchableOpacity onPress={() => console.log('Open drug details:', item.ourProduct.name)}>
                        <StyledText className="text-sm font-semibold text-[#0077B6] underline mb-2 leading-5">
                            {item.ourProduct.name}
                        </StyledText>
                    </StyledTouchableOpacity>
                    <StyledText className="text-xs text-gray-600 mb-1">
                        Qty: {item.ourProduct.quantity} units
                    </StyledText>
                    <StyledText className="text-xs text-gray-600">
                        Pack: {item.ourProduct.packSize}
                    </StyledText>
                </StyledView>

                {/* Competitor Drug */}
                <StyledView
                    className="flex-1 bg-white p-3 rounded-md"
                    style={{ borderLeftWidth: 4, borderLeftColor: '#DC3545' }}
                >
                    <StyledText className="text-xs font-semibold text-[#DC3545] uppercase mb-2">
                        Competitor
                    </StyledText>
                    <StyledText className="text-sm font-semibold text-gray-900 mb-2 leading-5">
                        {item.competitor.name}
                    </StyledText>
                    <StyledText className="text-xs text-gray-600 mb-1">
                        Qty: {item.competitor.quantity} units
                    </StyledText>
                    <StyledText className="text-xs text-gray-600">
                        Pack: {item.competitor.packSize}
                    </StyledText>
                </StyledView>
            </StyledView>
        </StyledView>
    );

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StatusBar backgroundColor="#0077B6" barStyle="light-content" />
                <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                    <StyledView className="flex-row items-center gap-3">
                        <StyledTouchableOpacity
                            className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className="text-xl font-semibold text-gray-900">RCPA Report</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-4">Loading RCPA details...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error || !rcpaDetails) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StatusBar backgroundColor="#0077B6" barStyle="light-content" />
                <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                    <StyledView className="flex-row items-center gap-3">
                        <StyledTouchableOpacity
                            className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className="text-xl font-semibold text-gray-900">RCPA Report</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className="flex-1 justify-center items-center px-5">
                    <StyledText className="text-5xl mb-4">⚠️</StyledText>
                    <StyledText className="text-lg font-semibold text-gray-900 mb-2">Error loading RCPA details</StyledText>
                    <StyledText className="text-sm text-gray-600 text-center mb-4">{error || 'RCPA report not found'}</StyledText>
                    <StyledTouchableOpacity className="bg-[#0077B6] px-6 py-3 rounded-lg" onPress={loadRCPADetails}>
                        <StyledText className="text-white font-semibold">Try Again</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    const itemsToDisplay = showAllItems ? rcpaDetails.auditItems : rcpaDetails.auditItems.slice(0, ITEMS_TO_SHOW_INITIALLY);
    const remainingItemsCount = rcpaDetails.auditItems.length - ITEMS_TO_SHOW_INITIALLY;

    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50">
            <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

            {/* Title Bar */}
            <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200 z-50">
                <StyledView className="flex-row items-center gap-3">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-xl font-semibold text-gray-900">RCPA Report</StyledText>
                </StyledView>

                {/* Share Button */}
                <StyledView className="flex-row gap-2">
                    <StyledTouchableOpacity
                        className={`w-9 h-9 rounded-lg ${isSharing ? 'bg-blue-100' : 'bg-gray-100'} items-center justify-center`}
                        onPress={handleShare}
                        disabled={isSharing}
                    >
                        {isSharing ? (
                            <ActivityIndicator size="small" color="#0077B6" />
                        ) : (
                            <Ionicons name="share-outline" size={18} color="#6C757D" />
                        )}
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Scrollable Content */}
            <StyledScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* RCPA ID Section */}
                <StyledView className="bg-white px-5 py-6 border-b border-gray-200">
                    <StyledView className="items-center">
                        <StyledText className="text-2xl font-bold text-[#0077B6] mb-1">
                            #{rcpaDetails.rcpaId}
                        </StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            RCPA ID
                        </StyledText>
                    </StyledView>
                </StyledView>

                {/* RCPA Details Section */}
                <StyledView className="bg-white px-5 py-6 mb-5">
                    <StyledView className="space-y-4">
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Chemist</StyledText>
                            <StyledTouchableOpacity className="flex-1 ml-4" onPress={handleChemistPress}>
                                <StyledText className="text-base font-semibold text-[#0077B6] text-right underline" numberOfLines={2} ellipsizeMode="tail">
                                    {rcpaDetails.chemistName}
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Created By</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={1} ellipsizeMode="tail">
                                {rcpaDetails.createdBy.name}
                            </StyledText>
                        </StyledView>
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Observation Date</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={1} ellipsizeMode="tail">
                                {formatDate(rcpaDetails.observationDate)}
                            </StyledText>
                        </StyledView>
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Total Prescriptions</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={1} ellipsizeMode="tail">
                                {rcpaDetails.totalPrescriptions}
                            </StyledText>
                        </StyledView>
                        <StyledView className="flex-row justify-between items-center py-4">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Region</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={1} ellipsizeMode="tail">
                                {rcpaDetails.region}
                            </StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>

                {/* Summary Stats Section */}
                <StyledView className="flex-row justify-between px-5 mb-5 gap-3">
                    {/* Items Audited Card */}
                    <StyledView
                        className="flex-1 bg-white rounded-lg p-6 items-center"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.05,
                            shadowRadius: 8,
                            elevation: 2,
                            borderWidth: 1,
                            borderColor: '#F0F0F0'
                        }}
                    >
                        <StyledText className="text-4xl font-bold text-[#0077B6] mb-2">
                            {rcpaDetails.itemsAudited}
                        </StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wide text-center">
                            Items Audited
                        </StyledText>
                    </StyledView>

                    {/* Competitors Found Card */}
                    <StyledView
                        className="flex-1 bg-white rounded-lg p-6 items-center"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.05,
                            shadowRadius: 8,
                            elevation: 2,
                            borderWidth: 1,
                            borderColor: '#F0F0F0'
                        }}
                    >
                        <StyledText className="text-4xl font-bold text-[#0077B6] mb-2">
                            {rcpaDetails.competitorsFound}
                        </StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wide text-center">
                            Competitors Found
                        </StyledText>
                    </StyledView>
                </StyledView>

                {/* Audit Items Section */}
                <StyledView className="mx-5 mb-5">
                    <Card style={{ backgroundColor: '#ffffff' }}>
                        <Card.Content style={{ padding: 20 }}>
                            <StyledText className="text-lg font-semibold text-gray-900 mb-4">Audit Items</StyledText>

                            {rcpaDetails.auditItems.length > 0 ? (
                                <>
                                    {/* Render audit items */}
                                    {itemsToDisplay.map(renderAuditItem)}

                                    {/* Show More/Less Button */}
                                    {rcpaDetails.auditItems.length > ITEMS_TO_SHOW_INITIALLY && (
                                        <StyledView className="mt-4 pt-4 border-t border-gray-200">
                                            <StyledTouchableOpacity
                                                className="bg-gray-100 hover:bg-gray-200 py-3 px-4 rounded-lg items-center"
                                                onPress={() => setShowAllItems(!showAllItems)}
                                            >
                                                <StyledView className="flex-row items-center gap-2">
                                                    <Ionicons 
                                                        name={showAllItems ? "chevron-up" : "chevron-down"} 
                                                        size={16} 
                                                        color="#6C757D" 
                                                    />
                                                    <StyledText className="text-sm font-medium text-gray-700">
                                                        {showAllItems 
                                                            ? "Show Less" 
                                                            : `Show ${remainingItemsCount} More Items`
                                                        }
                                                    </StyledText>
                                                </StyledView>
                                            </StyledTouchableOpacity>
                                        </StyledView>
                                    )}
                                </>
                            ) : (
                                <StyledText className="text-center text-gray-500 text-base py-8">
                                    No audit items found for this RCPA report.
                                </StyledText>
                            )}
                        </Card.Content>
                    </Card>
                </StyledView>

                {/* Brief Remarks Section */}
                <StyledView className="bg-white px-5 py-5 mb-20">
                    <StyledView className="flex-row justify-between items-center mb-4">
                        <StyledText className="text-lg font-semibold text-gray-900">Brief Remarks</StyledText>
                    </StyledView>
                    <StyledView className="bg-gray-50 rounded-lg p-4 min-h-[80px]">
                        {rcpaDetails.briefRemarks && rcpaDetails.briefRemarks.trim().length > 0 ? (
                            <StyledText className="text-sm text-gray-900 leading-6">
                                {rcpaDetails.briefRemarks}
                            </StyledText>
                        ) : (
                            <StyledText className="text-sm text-gray-600 italic text-center py-6">
                                No remarks provided for this RCPA report.
                            </StyledText>
                        )}
                    </StyledView>
                </StyledView>
            </StyledScrollView>
        </StyledSafeAreaView>
    );
}