import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Input from '../../components/input';
import Header from '../../components/header';
import Drawer from '../../components/drawer';
import DistributionItemsSection from '../../components/distributionItemSection'; // Import the new component
import SampleService, { Customer, InventoryItem, CreateDistributionRequest } from '../../services/sampleService';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

// Interfaces for Distribution Items
interface DistributionItem {
    id: string;
    item: InventoryItem | null;
    quantity: number;
}

export default function CreateDistribution() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Extract parameters from meeting
    const fromMeeting = params.fromMeeting === 'true';
    const customerId = params.customerId || params.doctorId as string;
    const customerName = params.customerName || params.doctorName as string;
    const customerType = params.customerType || (params.doctorId ? 'doctor' : 'chemist') as string;
    const meetingStartTime = params.meetingStartTime as string;
    const returnToStep = params.returnToStep as string;

    // State management
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [distributionDate, setDistributionDate] = useState('');
    const [distributionDateValue, setDistributionDateValue] = useState<Date | undefined>(undefined);
    const [drugItems, setDrugItems] = useState<DistributionItem[]>([]);
    const [giftItems, setGiftItems] = useState<DistributionItem[]>([]);
    const [isCustomerListOpen, setIsCustomerListOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Backend data states
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [availableDrugs, setAvailableDrugs] = useState<InventoryItem[]>([]);
    const [availableGifts, setAvailableGifts] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load data from backend
    const loadData = async () => {
        try {
            setError(null);
            setLoading(true);

            console.log('📦 Loading distribution creation data from backend...');

            // Load all required data in parallel
            const [customersData, drugsData, giftsData] = await Promise.all([
                SampleService.getCustomers(),
                SampleService.getDrugInventory(),
                SampleService.getGiftInventory()
            ]);

            console.log('✅ Distribution data loaded:', {
                customers: customersData.length,
                drugs: drugsData.length,
                gifts: giftsData.length
            });

            setCustomers(customersData);
            setAvailableDrugs(drugsData.filter(drug => drug.quantity > 0)); // Only show available items
            setAvailableGifts(giftsData.filter(gift => gift.quantity > 0)); // Only show available items

            // Auto-select customer if coming from meeting
            if (fromMeeting && customerId && customerName) {
                const selectedCustomer = customersData.find(customer =>
                    ((customer.type === 'chemist' && customerType === 'chemist') ||
                        (customer.type === 'doctor' && customerType === 'doctor')) &&
                    (customer.id === customerId || customer.name === customerName)
                );

                if (selectedCustomer) {
                    setSelectedCustomer(selectedCustomer);
                    console.log('✅ Auto-selected customer from meeting:', selectedCustomer.name);
                } else {
                    console.log('⚠️ Customer not found in customers list');
                    // If customer not found but we have the name from meeting, create a temporary customer object
                    if (customerName) {
                        const tempCustomer = {
                            id: customerId || 'temp-' + Date.now(),
                            name: customerName,
                            type: customerType as 'doctor' | 'chemist',
                            address: {
                                name: 'Meeting Location',
                                full: 'From Meeting'
                            }
                        };
                        setSelectedCustomer(tempCustomer);
                        console.log('✅ Created temporary customer from meeting:', customerName);
                    }
                }
            }

        } catch (error: any) {
            console.error('❌ Error loading distribution data:', error);
            setError(error.message || 'Failed to load distribution data');
            Alert.alert('Error', 'Failed to load distribution data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        loadData();
    }, []);

    // Initialize date to today
    useEffect(() => {
        const today = new Date();
        const formatted = today.getDate().toString().padStart(2, '0') + ' - ' +
            (today.getMonth() + 1).toString().padStart(2, '0') + ' - ' +
            today.getFullYear();
        setDistributionDate(formatted);
        setDistributionDateValue(today);
    }, []);

    const isConfirmEnabled = useMemo(() => {
        const hasCustomer = selectedCustomer !== null;
        const hasDistributionDate = distributionDate.trim() !== '' || distributionDateValue !== undefined;
        const hasValidDrugs = drugItems.length > 0 && !drugItems.some(item => item.item === null || item.quantity <= 0);
        const hasValidGifts = giftItems.length > 0 && !giftItems.some(item => item.item === null || item.quantity <= 0);
        const hasValidItems = hasValidDrugs || hasValidGifts;
        return hasCustomer && hasDistributionDate && hasValidItems && !isSubmitting;
    }, [selectedCustomer, distributionDate, distributionDateValue, drugItems, giftItems, isSubmitting]);

    const handleDateChange = (date: Date) => {
        setDistributionDateValue(date);
    };

    const handleDrugItemsUpdate = (items: DistributionItem[]) => {
        setDrugItems(items);
    };

    const handleGiftItemsUpdate = (items: DistributionItem[]) => {
        setGiftItems(items);
    };

    const handleCancel = () => {
        Alert.alert(
            'Cancel Distribution',
            'Are you sure you want to cancel? All unsaved changes will be lost.',
            [
                { text: 'Continue', style: 'cancel' },
                {
                    text: 'Cancel Distribution',
                    style: 'destructive',
                    onPress: () => {
                        if (fromMeeting && returnToStep) {
                            router.back(); // This will return to the meeting at the correct step
                        } else {
                            router.push('/(tabs)/');
                        }
                    }
                }
            ]
        );
    };

    const handleConfirm = async () => {
        if (!isConfirmEnabled) return;

        try {
            setIsSubmitting(true);

            // Prepare distribution data
            const distributionData: CreateDistributionRequest = {
                customerId: selectedCustomer!.id,
                customerType: selectedCustomer!.type,
                distributedAt: distributionDateValue!.toISOString(),
                drugItems: drugItems
                    .filter(item => item.item !== null && item.quantity > 0)
                    .map(item => ({
                        inventoryId: item.item!.inventoryId,
                        quantity: item.quantity
                    })),
                giftItems: giftItems
                    .filter(item => item.item !== null && item.quantity > 0)
                    .map(item => ({
                        inventoryId: item.item!.inventoryId,
                        quantity: item.quantity
                    }))
            };

            console.log('📦 Creating distribution:', distributionData);

            const result = await SampleService.createDistribution(distributionData);

            const creationTime = meetingStartTime ? new Date(meetingStartTime).toLocaleTimeString() : new Date().toLocaleTimeString();

            Alert.alert(
                'Sample Distribution Created!',
                `Your sample distribution has been successfully created at ${creationTime} and is ready for delivery.`,
                [
                    {
                        text: 'Close',
                        style: 'cancel',
                        onPress: () => {
                            if (fromMeeting && returnToStep) {
                                router.back(); // Return to meeting
                            } else {
                                router.push('/(tabs)/');
                            }
                        }
                    },
                    {
                        text: 'View Details',
                        onPress: () => router.push({
                            pathname: '/(tabs)/distributionDetails',
                            params: { distributionId: result.distributionId }
                        })
                    }
                ]
            );

        } catch (error: any) {
            console.error('❌ Error creating distribution:', error);
            Alert.alert('Error', error.message || 'Failed to create distribution. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate totals for display
    const totalDrugs = drugItems.filter(item => item.item).reduce((sum, item) => sum + item.quantity, 0);
    const totalGifts = giftItems.filter(item => item.item).reduce((sum, item) => sum + item.quantity, 0);
    const grandTotal = totalDrugs + totalGifts;

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>

                {/* Title Bar */}
                <StyledView className="bg-white px-5 py-4 flex-row items-center border-b border-gray-200">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-50 items-center justify-center mr-4"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={20} color="#6B7280" />
                    </StyledTouchableOpacity>

                    <StyledText className="text-xl font-semibold text-gray-900">
                        Create Distribution
                    </StyledText>
                </StyledView>
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-4">Loading distribution data...</StyledText>
                </StyledView>
                <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>

                {/* Title Bar */}
                <StyledView className="bg-white px-5 py-4 flex-row items-center border-b border-gray-200">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-50 items-center justify-center mr-4"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={20} color="#6B7280" />
                    </StyledTouchableOpacity>

                    <StyledText className="text-xl font-semibold text-gray-900">
                        Create Distribution
                    </StyledText>
                </StyledView>
                <StyledView className="flex-1 justify-center items-center px-5">
                    <StyledText className="text-5xl mb-4">⚠️</StyledText>
                    <StyledText className="text-lg font-semibold text-gray-900 mb-2">
                        Error loading distribution data
                    </StyledText>
                    <StyledText className="text-sm text-gray-600 text-center mb-4">
                        {error}
                    </StyledText>
                    <StyledTouchableOpacity
                        className="bg-[#0077B6] px-6 py-3 rounded-lg"
                        onPress={loadData}
                    >
                        <StyledText className="text-white font-semibold">
                            Try Again
                        </StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
                <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            </StyledSafeAreaView>
        );
    }

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>
            {/* Header */}


            {/* Title Bar */}
            <StyledView className="bg-white px-5 py-4 flex-row items-center justify-between border-b border-gray-200">
                <StyledView className="flex-row items-center">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-50 items-center justify-center mr-4"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={20} color="#6B7280" />
                    </StyledTouchableOpacity>

                    <StyledView>
                        <StyledText className="text-xl font-semibold text-gray-900">
                            Create Distribution
                        </StyledText>
                        {grandTotal > 0 && (
                            <StyledText className="text-sm text-gray-500">
                                {grandTotal} items selected
                            </StyledText>
                        )}
                    </StyledView>
                </StyledView>

                {/* Quick Stats */}
                {(totalDrugs > 0 || totalGifts > 0) && (
                    <StyledView className="flex-row gap-2">
                        {totalDrugs > 0 && (
                            <StyledView className="bg-blue-100 px-2 py-1 rounded-full">
                                <StyledText className="text-xs font-medium text-blue-700">
                                    💊 {totalDrugs}
                                </StyledText>
                            </StyledView>
                        )}
                        {totalGifts > 0 && (
                            <StyledView className="bg-green-100 px-2 py-1 rounded-full">
                                <StyledText className="text-xs font-medium text-green-700">
                                    🎁 {totalGifts}
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledView>
                )}
            </StyledView>

            <StyledScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
                keyboardShouldPersistTaps="handled"
            >
                {/* Customer Selection */}
                <StyledView style={{ marginBottom: 20 }}>
                    <StyledText style={{ marginBottom: 6, fontWeight: '500', fontSize: 16, color: '#111827' }}>
                        Choose Customer <StyledText style={{ color: '#EF4444' }}>*</StyledText>
                        {fromMeeting && (
                            <StyledText style={{ color: '#0077B6', fontSize: 14, fontWeight: '400' }}>
                                {' '}(From Meeting)
                            </StyledText>
                        )}
                    </StyledText>

                    {/* Show selected customer in meeting mode or dropdown in normal mode */}
                    {fromMeeting && selectedCustomer ? (
                        // Meeting mode - show selected customer (non-editable)
                        <StyledView style={{
                            borderWidth: 1,
                            borderColor: '#0077B6',
                            borderRadius: 8,
                            padding: 14,
                            backgroundColor: '#F0F8FF',
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'space-between',
                            minHeight: 50,
                        }}>
                            <StyledView style={{ flex: 1 }}>
                                <StyledText style={{
                                    color: '#111827',
                                    fontSize: 16,
                                    fontWeight: '600'
                                }}>
                                    {selectedCustomer.name}
                                </StyledText>
                                {selectedCustomer && (
                                    <StyledText style={{ color: '#6B7280', fontSize: 14, marginTop: 2 }}>
                                        {selectedCustomer.type === 'doctor'
                                            ? `${selectedCustomer.designation || 'Doctor'} • ${selectedCustomer.address.name}`
                                            : `${selectedCustomer.chemistType || 'Chemist'} • ${selectedCustomer.address.name}`
                                        }
                                    </StyledText>
                                )}
                            </StyledView>
                            <StyledView style={{
                                backgroundColor: '#0077B6',
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 12,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Ionicons name="people-outline" size={14} color="#FFFFFF" />
                                <StyledText style={{
                                    color: '#FFFFFF',
                                    fontSize: 12,
                                    fontWeight: '500',
                                    marginLeft: 4
                                }}>
                                    Meeting
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    ) : (
                        // Normal mode - show dropdown
                        <>
                            <StyledTouchableOpacity
                                onPress={() => setIsCustomerListOpen(!isCustomerListOpen)}
                                style={{
                                    borderWidth: 1,
                                    borderColor: isCustomerListOpen || selectedCustomer ? "#0077B6" : "#E5E7EB",
                                    borderRadius: 8,
                                    padding: 14,
                                    backgroundColor: '#fff',
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: 'space-between',
                                    minHeight: 50,
                                    borderBottomLeftRadius: isCustomerListOpen ? 0 : 8,
                                    borderBottomRightRadius: isCustomerListOpen ? 0 : 8,
                                }}
                            >
                                <StyledView style={{ flex: 1 }}>
                                    <StyledText style={{
                                        color: selectedCustomer ? '#111827' : '#9CA3AF',
                                        fontSize: 16,
                                        fontWeight: selectedCustomer ? '600' : '400'
                                    }}>
                                        {selectedCustomer ? selectedCustomer.name : "Select a customer..."}
                                    </StyledText>
                                    {selectedCustomer && (
                                        <StyledText style={{ color: '#6B7280', fontSize: 14, marginTop: 2 }}>
                                            {selectedCustomer.type === 'doctor'
                                                ? `${selectedCustomer.designation || 'Doctor'} • ${selectedCustomer.address.name}`
                                                : `${selectedCustomer.chemistType || 'Chemist'} • ${selectedCustomer.address.name}`
                                            }
                                        </StyledText>
                                    )}
                                </StyledView>
                                <Ionicons
                                    name={isCustomerListOpen ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={20}
                                    color="#6B7280"
                                />
                            </StyledTouchableOpacity>

                            {isCustomerListOpen && (
                                <StyledView style={{
                                    backgroundColor: '#fff',
                                    borderWidth: 1,
                                    borderColor: '#0077B6',
                                    borderTopWidth: 0,
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8,
                                    maxHeight: 300,
                                    elevation: 5,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    zIndex: 10,
                                }}>
                                    <ScrollView nestedScrollEnabled={true}>
                                        {customers.map((customer, index) => (
                                            <StyledTouchableOpacity
                                                key={customer.id}
                                                onPress={() => {
                                                    setSelectedCustomer(customer);
                                                    setIsCustomerListOpen(false);
                                                }}
                                                style={{
                                                    paddingVertical: 14,
                                                    paddingHorizontal: 16,
                                                    borderBottomWidth: index < customers.length - 1 ? 1 : 0,
                                                    borderBottomColor: '#F3F4F6'
                                                }}
                                            >
                                                <StyledView className="flex-row items-center mb-1">
                                                    <StyledText style={{ fontSize: 16, fontWeight: '500', color: '#111827', flex: 1 }}>
                                                        {customer.name}
                                                    </StyledText>
                                                    <StyledView style={{
                                                        backgroundColor: customer.type === 'doctor' ? '#E0F2FE' : '#F0FDF4',
                                                        paddingHorizontal: 8,
                                                        paddingVertical: 2,
                                                        borderRadius: 12
                                                    }}>
                                                        <StyledText style={{
                                                            fontSize: 12,
                                                            fontWeight: '500',
                                                            color: customer.type === 'doctor' ? '#0369A1' : '#15803D'
                                                        }}>
                                                            {customer.type === 'doctor' ? '👨‍⚕️ Doctor' : '🏪 Chemist'}
                                                        </StyledText>
                                                    </StyledView>
                                                </StyledView>

                                                {customer.designation && (
                                                    <StyledText style={{ fontSize: 14, color: '#0077B6', marginBottom: 2 }}>
                                                        {customer.designation}
                                                        {customer.specialization && ` • ${customer.specialization}`}
                                                    </StyledText>
                                                )}

                                                <StyledText style={{ fontSize: 13, color: '#6B7280' }}>
                                                    📍 {customer.address.full}
                                                </StyledText>
                                            </StyledTouchableOpacity>
                                        ))}

                                        {customers.length === 0 && (
                                            <StyledView style={{ padding: 20, alignItems: 'center' }}>
                                                <StyledText style={{ color: '#9CA3AF', fontSize: 14 }}>
                                                    No customers available in your territory
                                                </StyledText>
                                            </StyledView>
                                        )}
                                    </ScrollView>
                                </StyledView>
                            )}
                        </>
                    )}
                </StyledView>

                {/* Distribution Date */}
                <StyledView style={{ marginBottom: 24 }}>
                    <Input
                        label="Distribution Date"
                        placeholder="dd - mm - yyyy"
                        value={distributionDate}
                        onChangeText={setDistributionDate}
                        rightIcon="calendar-outline"
                        isDateInput={true}
                        dateValue={distributionDateValue}
                        onDateChange={handleDateChange}
                        allowPastDates={true}
                    />
                </StyledView>

                {/* Sample Drugs Section */}
                <DistributionItemsSection
                    title="Sample Drugs"
                    items={drugItems}
                    availableItems={availableDrugs}
                    onUpdateItems={handleDrugItemsUpdate}
                    emptyStateText="No sample drugs added yet. Add drugs to distribute to customers."
                    addButtonText="Add Sample Drug"
                    addAnotherButtonText="Add Another Drug"
                    searchPlaceholder="Search drugs by name, manufacturer or category..."
                    type="drug"
                    minQuantity={1}
                    maxQuantity={999}
                />

                {/* Sample Gifts Section */}
                <DistributionItemsSection
                    title="Sample Gifts"
                    items={giftItems}
                    availableItems={availableGifts}
                    onUpdateItems={handleGiftItemsUpdate}
                    emptyStateText="No sample gifts added yet. Add gifts to distribute to customers."
                    addButtonText="Add Sample Gift"
                    addAnotherButtonText="Add Another Gift"
                    searchPlaceholder="Search gifts by name, manufacturer or category..."
                    type="gift"
                    minQuantity={1}
                    maxQuantity={999}
                />

                {/* Distribution Summary */}
                {grandTotal > 0 && (
                    <StyledView style={{
                        backgroundColor: '#F0FDF4',
                        padding: 20,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#BBF7D0',
                        marginBottom: 20
                    }}>
                        <StyledText style={{ fontSize: 18, fontWeight: '600', color: '#15803D', marginBottom: 12 }}>
                            📦 Distribution Summary
                        </StyledText>

                        <StyledView style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <StyledText style={{ fontSize: 16, color: '#166534' }}>
                                Sample Drugs:
                            </StyledText>
                            <StyledText style={{ fontSize: 16, fontWeight: '600', color: '#166534' }}>
                                {totalDrugs} items
                            </StyledText>
                        </StyledView>

                        <StyledView style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <StyledText style={{ fontSize: 16, color: '#166534' }}>
                                Sample Gifts:
                            </StyledText>
                            <StyledText style={{ fontSize: 16, fontWeight: '600', color: '#166534' }}>
                                {totalGifts} items
                            </StyledText>
                        </StyledView>

                        <StyledView style={{ height: 1, backgroundColor: '#BBF7D0', marginVertical: 12 }} />

                        <StyledView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 18, fontWeight: '700', color: '#15803D' }}>
                                Total Items:
                            </StyledText>
                            <StyledText style={{ fontSize: 20, fontWeight: '800', color: '#15803D' }}>
                                {grandTotal}
                            </StyledText>
                        </StyledView>

                        {selectedCustomer && (
                            <StyledView style={{
                                marginTop: 12,
                                padding: 12,
                                backgroundColor: '#DCFCE7',
                                borderRadius: 8
                            }}>
                                <StyledText style={{ fontSize: 14, color: '#166534', textAlign: 'center' }}>
                                    Ready to distribute to <StyledText style={{ fontWeight: '600' }}>{selectedCustomer.name}</StyledText>
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledView>
                )}
            </StyledScrollView>

            {/* Bottom Actions */}
            <StyledView style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderTopWidth: 1,
                borderTopColor: '#E5E7EB',
                flexDirection: 'row',
                gap: 12,
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            }}>
                {/* Cancel Button */}
                <StyledTouchableOpacity
                    onPress={handleCancel}
                    disabled={isSubmitting}
                    style={{
                        flex: 1,
                        paddingVertical: 14,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#D1D5DB',
                        backgroundColor: '#F9FAFB',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isSubmitting ? 0.6 : 1
                    }}
                    activeOpacity={0.7}
                >
                    <StyledText style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#6B7280'
                    }}>
                        Cancel
                    </StyledText>
                </StyledTouchableOpacity>

                {/* Confirm Button */}
                <StyledTouchableOpacity
                    onPress={handleConfirm}
                    disabled={!isConfirmEnabled}
                    style={{
                        flex: 2,
                        paddingVertical: 14,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                        backgroundColor: isConfirmEnabled ? '#0077B6' : '#D1D5DB',
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: isConfirmEnabled ? 2 : 0,
                        shadowColor: isConfirmEnabled ? '#0077B6' : 'transparent',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }}
                    activeOpacity={isConfirmEnabled ? 0.8 : 1}
                >
                    {isSubmitting ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <StyledText style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: isConfirmEnabled ? '#FFFFFF' : '#9CA3AF'
                        }}>
                            Create Distribution ({grandTotal} items)
                        </StyledText>
                    )}
                </StyledTouchableOpacity>
            </StyledView>

            {/* Drawer */}
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </StyledSafeAreaView>
    );
}