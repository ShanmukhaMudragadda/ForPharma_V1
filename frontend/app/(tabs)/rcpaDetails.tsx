import { useRouter, useLocalSearchParams } from 'expo-router';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export default function RCPADetailsPage(): JSX.Element {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isSharing, setIsSharing] = useState<boolean>(false);

    // Extract parameters from navigation
    const { rcpaId, chemistName, observationDate, totalPrescriptions } = params;

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
        if (isSharing) return;

        try {
            setIsSharing(true);
            // Share functionality would go here
            console.log('Share button clicked for RCPA:', rcpaId);
        } catch (error: any) {
            console.error('Error sharing:', error);
        } finally {
            setIsSharing(false);
        }
    };

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
                            #{rcpaId || 'RCPA-2024-XXXX'}
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
                            <StyledTouchableOpacity className="flex-1 ml-4" onPress={() => console.log('Open chemist details')}>
                                <StyledText className="text-base font-semibold text-[#0077B6] text-right underline" numberOfLines={2} ellipsizeMode="tail">
                                    {chemistName || 'Unknown Chemist'}
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Created By</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={1} ellipsizeMode="tail">
                                Rajesh Kumar
                            </StyledText>
                        </StyledView>
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Observation Date</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={1} ellipsizeMode="tail">
                                {formatDate(observationDate as string)}
                            </StyledText>
                        </StyledView>
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Total Prescriptions</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={1} ellipsizeMode="tail">
                                {totalPrescriptions || '0'}
                            </StyledText>
                        </StyledView>
                        <StyledView className="flex-row justify-between items-center py-4">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Region</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4" numberOfLines={1} ellipsizeMode="tail">
                                New Delhi, Delhi
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
                            6
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
                            4
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

                            {/* Audit Item 1 */}
                            <StyledView className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <StyledView className="flex-row gap-4">
                                    {/* Company Drug */}
                                    <StyledView
                                        className="flex-1 bg-white p-3 rounded-md"
                                        style={{ borderLeftWidth: 4, borderLeftColor: '#0077B6' }}
                                    >
                                        <StyledText className="text-xs font-semibold text-[#0077B6] uppercase mb-2">
                                            Our Product
                                        </StyledText>
                                        <StyledTouchableOpacity onPress={() => console.log('Open drug details')}>
                                            <StyledText className="text-sm font-semibold text-[#0077B6] underline mb-2 leading-5">
                                                Amlodipine 5mg Tablets
                                            </StyledText>
                                        </StyledTouchableOpacity>
                                        <StyledText className="text-xs text-gray-600 mb-1">
                                            Qty: 24 units
                                        </StyledText>
                                        <StyledText className="text-sm font-semibold text-green-600">
                                            ₹125.00
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
                                            Norvasc 5mg (Pfizer)
                                        </StyledText>
                                        <StyledText className="text-xs text-gray-600 mb-1">
                                            Qty: 18 units
                                        </StyledText>
                                        <StyledText className="text-sm font-semibold text-green-600">
                                            ₹145.00
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledView>

                            {/* Audit Item 2 */}
                            <StyledView className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <StyledView className="flex-row gap-4">
                                    {/* Company Drug */}
                                    <StyledView
                                        className="flex-1 bg-white p-3 rounded-md"
                                        style={{ borderLeftWidth: 4, borderLeftColor: '#0077B6' }}
                                    >
                                        <StyledText className="text-xs font-semibold text-[#0077B6] uppercase mb-2">
                                            Our Product
                                        </StyledText>
                                        <StyledTouchableOpacity onPress={() => console.log('Open drug details')}>
                                            <StyledText className="text-sm font-semibold text-[#0077B6] underline mb-2 leading-5">
                                                Metformin 500mg Tablets
                                            </StyledText>
                                        </StyledTouchableOpacity>
                                        <StyledText className="text-xs text-gray-600 mb-1">
                                            Qty: 36 units
                                        </StyledText>
                                        <StyledText className="text-sm font-semibold text-green-600">
                                            ₹85.00
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
                                            Glycomet 500mg (USV)
                                        </StyledText>
                                        <StyledText className="text-xs text-gray-600 mb-1">
                                            Qty: 28 units
                                        </StyledText>
                                        <StyledText className="text-sm font-semibold text-green-600">
                                            ₹92.00
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledView>

                            {/* Audit Item 3 */}
                            <StyledView className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <StyledView className="flex-row gap-4">
                                    {/* Company Drug */}
                                    <StyledView
                                        className="flex-1 bg-white p-3 rounded-md"
                                        style={{ borderLeftWidth: 4, borderLeftColor: '#0077B6' }}
                                    >
                                        <StyledText className="text-xs font-semibold text-[#0077B6] uppercase mb-2">
                                            Our Product
                                        </StyledText>
                                        <StyledTouchableOpacity onPress={() => console.log('Open drug details')}>
                                            <StyledText className="text-sm font-semibold text-[#0077B6] underline mb-2 leading-5">
                                                Atorvastatin 20mg Tablets
                                            </StyledText>
                                        </StyledTouchableOpacity>
                                        <StyledText className="text-xs text-gray-600 mb-1">
                                            Qty: 15 units
                                        </StyledText>
                                        <StyledText className="text-sm font-semibold text-green-600">
                                            ₹95.00
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
                                            Lipitor 20mg (Pfizer)
                                        </StyledText>
                                        <StyledText className="text-xs text-gray-600 mb-1">
                                            Qty: 22 units
                                        </StyledText>
                                        <StyledText className="text-sm font-semibold text-green-600">
                                            ₹185.00
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledView>

                            {/* More audit items would continue here... */}
                            <StyledView className="mt-4 pt-4 border-t border-gray-200">
                                <StyledText className="text-sm text-gray-500 text-center">
                                    + 3 more audit items
                                </StyledText>
                            </StyledView>
                        </Card.Content>
                    </Card>
                </StyledView>

                {/* Brief Remarks Section */}
                <StyledView className="bg-white px-5 py-5 mb-20">
                    <StyledView className="flex-row justify-between items-center mb-4">
                        <StyledText className="text-lg font-semibold text-gray-900">Brief Remarks</StyledText>
                    </StyledView>
                    <StyledView className="bg-gray-50 rounded-lg p-4 min-h-[80px]">
                        <StyledText className="text-sm text-gray-900 leading-6">
                            "The pharmacy shows strong performance for our cardiovascular products, especially Amlodipine which outsells Norvasc due to competitive pricing. However, Lipitor has higher movement than our Atorvastatin - need to discuss better positioning with the pharmacist. Overall relationship is good, and they're willing to promote our products with proper incentives. Recommend increasing focus on diabetes segment as Metformin is performing well against Glycomet."
                        </StyledText>
                    </StyledView>
                </StyledView>
            </StyledScrollView>
        </StyledSafeAreaView>
    );
}