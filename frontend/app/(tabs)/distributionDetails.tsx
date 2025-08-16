import { useLocalSearchParams, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import Header from '../../components/header';
import Drawer from '../../components/drawer';
import SampleService, { DistributionDetails } from '../../services/sampleService';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export default function DistributionDetailsPage(): JSX.Element {
    const params = useLocalSearchParams();
    const router = useRouter();

    // State management
    const [distributionDetails, setDistributionDetails] = useState<DistributionDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSharing, setIsSharing] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { distributionId } = params;

    // Load distribution details from backend
    const loadDistributionDetails = async () => {
        if (!distributionId || typeof distributionId !== 'string') {
            setError('Invalid distribution ID');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            console.log('📋 Loading distribution details for:', distributionId);

            const details = await SampleService.getDistributionDetails(distributionId);
            console.log('✅ Distribution details loaded:', details);

            setDistributionDetails(details);
        } catch (error: any) {
            console.error('❌ Error loading distribution details:', error);
            setError(error.message || 'Failed to load distribution details');
            Alert.alert('Error', 'Failed to load distribution details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Load distribution details on component mount
    useEffect(() => {
        loadDistributionDetails();
    }, [distributionId]);

    const handleShare = async (): Promise<void> => {
        if (!distributionDetails || isSharing) return;

        try {
            setIsSharing(true);

            // Mock share functionality - replace with actual PDF generation
            console.log('Sharing distribution details...');
            Alert.alert('Share', 'Distribution details shared successfully!');

        } catch (error: any) {
            console.error('Error sharing distribution:', error);
            Alert.alert(
                'Share Failed',
                error.message || 'Failed to share the distribution details. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsSharing(false);
        }
    };

    const handleCustomerPress = (): void => {
        if (distributionDetails) {
            const customerType = distributionDetails.customer.type === 'doctor' ? 'Doctor' : 'Chemist';
            Alert.alert(`${customerType} Details`, `Opening details for ${distributionDetails.customer.name}`);
        }
    };

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

                <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                    <StyledView className="flex-row items-center gap-3">
                        <StyledTouchableOpacity className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center" onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className="text-xl font-semibold text-gray-900">Distribution Details</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-4">Loading distribution details...</StyledText>
                </StyledView>
                <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error || !distributionDetails) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StatusBar backgroundColor="#0077B6" barStyle="light-content" />
                <Header onMenuPress={() => setIsDrawerOpen(true)} />
                <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                    <StyledView className="flex-row items-center gap-3">
                        <StyledTouchableOpacity className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center" onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className="text-xl font-semibold text-gray-900">Distribution Details</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className="flex-1 justify-center items-center px-5">
                    <StyledText className="text-5xl mb-4">⚠️</StyledText>
                    <StyledText className="text-lg font-semibold text-gray-900 mb-2">Error loading distribution details</StyledText>
                    <StyledText className="text-sm text-gray-600 text-center mb-4">{error || 'Distribution not found'}</StyledText>
                    <StyledTouchableOpacity className="bg-[#0077B6] px-6 py-3 rounded-lg" onPress={loadDistributionDetails}>
                        <StyledText className="text-white font-semibold">Try Again</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
                <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            </StyledSafeAreaView>
        );
    }

    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50">
            <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

            {/* Header */}


            {/* Title Bar */}
            <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200 z-50">
                <StyledView className="flex-row items-center gap-3">
                    <StyledTouchableOpacity className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center" onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-xl font-semibold text-gray-900">Distribution Details</StyledText>
                </StyledView>

                {/* Share Button Only */}
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

            {/* Scrollable Content */}
            <StyledScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Distribution ID Section */}
                <StyledView className="bg-white px-5 py-6 border-b border-gray-200">
                    <StyledView className="items-center">
                        <StyledText className="text-2xl font-bold text-[#0077B6] mb-1">
                            {distributionDetails.distributionId}
                        </StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Distribution ID
                        </StyledText>
                    </StyledView>
                </StyledView>

                {/* Distribution Details Section */}
                <StyledView className="bg-white px-5 py-6 mb-5">
                    <StyledView className="space-y-4">
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">
                                {distributionDetails.customer.type === 'doctor' ? 'Doctor' : 'Chemist'}
                            </StyledText>
                            <StyledTouchableOpacity className="flex-1 ml-4" onPress={handleCustomerPress}>
                                <StyledText className="text-base font-semibold text-[#0077B6] text-right underline">
                                    {distributionDetails.customer.name}
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>

                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Created By</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4">
                                {distributionDetails.createdBy.name}
                            </StyledText>
                        </StyledView>

                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Distribution Date</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4">
                                {distributionDetails.distributionDate}
                            </StyledText>
                        </StyledView>

                        <StyledView className="flex-row justify-between items-start py-4">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Location</StyledText>
                            <StyledView className="flex-1 ml-4">
                                <StyledText className="text-base font-semibold text-gray-900 text-right mb-1">
                                    {distributionDetails.location.name}
                                </StyledText>
                                <StyledText className="text-sm text-gray-600 text-right">
                                    {distributionDetails.location.address}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>
                </StyledView>

                {/* Drugs Distributed Section */}
                {distributionDetails.drugs.length > 0 && (
                    <StyledView className="mx-5 mb-5">
                        <Card style={{ backgroundColor: '#ffffff' }}>
                            <Card.Content style={{ padding: 20 }}>
                                <StyledText className="text-lg font-semibold text-gray-900 mb-4">Drugs Distributed</StyledText>

                                <StyledView className="flex-row bg-gray-50 py-3 px-2 rounded-md mb-2">
                                    <StyledText className="flex-1 text-xs font-semibold text-gray-500 uppercase">Drug Name</StyledText>
                                    <StyledText className="w-20 text-xs font-semibold text-gray-500 uppercase text-center">Quantity</StyledText>
                                </StyledView>

                                {distributionDetails.drugs.map((drug, index) => (
                                    <StyledView key={drug.id} className={`flex-row items-center py-3 px-2 ${index < distributionDetails.drugs.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                        <StyledText className="flex-1 text-base font-medium text-[#0077B6]">
                                            {drug.name}
                                        </StyledText>
                                        <StyledText className="w-20 text-sm text-gray-900 text-center">{drug.quantity}</StyledText>
                                    </StyledView>
                                ))}
                            </Card.Content>
                        </Card>
                    </StyledView>
                )}

                {/* Gifts Distributed Section */}
                {distributionDetails.gifts.length > 0 && (
                    <StyledView className="mx-5 mb-5">
                        <Card style={{ backgroundColor: '#ffffff' }}>
                            <Card.Content style={{ padding: 20 }}>
                                <StyledText className="text-lg font-semibold text-gray-900 mb-4">Gifts Distributed</StyledText>

                                <StyledView className="flex-row bg-gray-50 py-3 px-2 rounded-md mb-2">
                                    <StyledText className="flex-1 text-xs font-semibold text-gray-500 uppercase">Gift Name</StyledText>
                                    <StyledText className="w-20 text-xs font-semibold text-gray-500 uppercase text-center">Quantity</StyledText>
                                </StyledView>

                                {distributionDetails.gifts.map((gift, index) => (
                                    <StyledView key={gift.id} className={`flex-row items-center py-3 px-2 ${index < distributionDetails.gifts.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                        <StyledText className="flex-1 text-base font-medium text-[#0077B6]">
                                            {gift.name}
                                        </StyledText>
                                        <StyledText className="w-20 text-sm text-gray-900 text-center">{gift.quantity}</StyledText>
                                    </StyledView>
                                ))}
                            </Card.Content>
                        </Card>
                    </StyledView>
                )}

                {/* Total Summary Section */}
                <StyledView className="mx-5 mb-20">
                    <Card style={{ backgroundColor: '#f9fafb' }}>
                        <Card.Content style={{ padding: 20 }}>
                            <StyledView className="flex-row justify-between items-center mb-2">
                                <StyledText className="text-base font-medium text-gray-600">Total Drugs</StyledText>
                                <StyledText className="text-lg font-semibold text-green-600">
                                    {distributionDetails.drugs.reduce((sum, drug) => sum + drug.quantity, 0)} Items
                                </StyledText>
                            </StyledView>
                            <StyledView className="flex-row justify-between items-center mb-2">
                                <StyledText className="text-base font-medium text-gray-600">Total Gifts</StyledText>
                                <StyledText className="text-lg font-semibold text-green-600">
                                    {distributionDetails.gifts.reduce((sum, gift) => sum + gift.quantity, 0)} Items
                                </StyledText>
                            </StyledView>
                            <StyledView className="h-px bg-gray-300 my-3" />
                            <StyledView className="flex-row justify-between items-center">
                                <StyledText className="text-lg font-bold text-gray-900">Total Distributed</StyledText>
                                <StyledText className="text-xl font-bold text-green-600">
                                    {distributionDetails.totalItems} Items
                                </StyledText>
                            </StyledView>
                        </Card.Content>
                    </Card>
                </StyledView>
            </StyledScrollView>

            {/* Drawer */}
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </StyledSafeAreaView>
    );
}