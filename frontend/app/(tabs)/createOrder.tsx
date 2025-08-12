import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Dropdown from '../../components/dropdown';
import Input from '../../components/input';
import ItemsSection from '../../components/itemSection';
import OrderService, { Chemist, Drug } from '../../services/orderService';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

// Interfaces
interface OrderItem {
    id: string;
    drug: Drug | null;
    quantity: number;
    subtotal: number;
}

// Define the Customer interface (mapped from Chemist)
interface Customer {
    id: string;
    label: string;
    value: string;
    subtitle: string;
}

export default function CreateOrder() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // State management
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryDateValue, setDeliveryDateValue] = useState<Date | undefined>(undefined);
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editOrderId, setEditOrderId] = useState<string | null>(null);
    const [isCustomerListOpen, setIsCustomerListOpen] = useState(false);

    // Backend data states
    const [customerOptions, setCustomerOptions] = useState<Customer[]>([]);
    const [availableDrugs, setAvailableDrugs] = useState<Drug[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

<<<<<<< HEAD
=======
    // Date utility function - Fixed to not add spaces
    const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; // No spaces around dashes
    };

>>>>>>> origin/rcpa/dcr_frontend
    // Load data from backend
    const loadData = async () => {
        try {
            setError(null);
            setLoading(true);

            // Load chemists and drugs concurrently
            const [chemists, drugs] = await Promise.all([
                OrderService.getChemistsForOrder(),
                OrderService.getDrugsForOrder()
            ]);

            // Transform chemists to customer options
            const customerOpts = chemists.map(chemist => ({
                id: chemist.chemistId,
                label: chemist.chemistName,
                value: chemist.chemistId,
                subtitle: chemist.address || `${chemist.type} - ${chemist.territoryName}`
            }));

            setCustomerOptions(customerOpts);
            setAvailableDrugs(drugs);

        } catch (error: any) {
            console.error('Error loading order data:', error);
            setError(error.message || 'Failed to load order data');
            Alert.alert('Error', 'Failed to load order data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        loadData();
    }, []);

    // Handle edit mode data population (both from order details and summary page)
    useEffect(() => {
        if (params.editData && customerOptions.length > 0 && availableDrugs.length > 0) {
            try {
                const editData = JSON.parse(params.editData as string);
                const fromSummary = params.fromSummary === 'true';

                console.log('🔄 Loading edit data:', { editData, fromSummary });

                setIsEditMode(true);
                setEditOrderId(editData.orderId); // Store the original order ID

                // Find and set the selected customer
                let customer;
                if (fromSummary) {
                    // When coming from summary, we need to find by name
                    customer = customerOptions.find(c => c.label === editData.customerName);
                } else {
                    // When coming from order details, we find by name as well
                    customer = customerOptions.find(c => c.label === editData.customerName);
                }

                if (customer) {
                    setSelectedCustomer(customer);
                }

<<<<<<< HEAD
                // Set delivery date
                if (editData.deliveryDate) {
                    setDeliveryDate(editData.deliveryDate);
=======
                // Set delivery date - normalize format
                if (editData.deliveryDate) {
                    let normalizedDate = editData.deliveryDate;
                    // If it's a long format date, try to parse and reformat
                    try {
                        const parsedDate = new Date(editData.deliveryDate);
                        if (!isNaN(parsedDate.getTime())) {
                            normalizedDate = formatDate(parsedDate);
                            setDeliveryDateValue(parsedDate);
                        }
                    } catch (e) {
                        console.warn('Could not parse delivery date:', editData.deliveryDate);
                    }
                    setDeliveryDate(normalizedDate);
>>>>>>> origin/rcpa/dcr_frontend
                }

                // Set special instructions
                if (editData.specialInstructions) {
                    setSpecialInstructions(editData.specialInstructions);
                }

                // Map and set order items
                if (editData.items) {
                    const formattedItems = editData.items.map((item: any) => {
                        let drug;

                        if (fromSummary && item.drugId) {
                            // Coming from summary - we have drugId, find by drugId
                            drug = availableDrugs.find(d => d.id === item.drugId);
                        } else {
                            // Coming from order details - find by name
                            drug = availableDrugs.find(d => d.name === item.name);
                        }

                        return {
                            id: item.id,
                            drug: drug || null,
                            quantity: item.quantity,
                            subtotal: item.subtotal
                        };
                    });
                    setOrderItems(formattedItems);
                }
            } catch (error) {
                console.error("Failed to parse editData from params:", error);
            }
        }
    }, [params.editData, params.fromSummary, customerOptions, availableDrugs]);

    const isViewSummaryEnabled = useMemo(() => {
        const hasCustomer = selectedCustomer !== null;
        const hasDeliveryDate = deliveryDate.trim() !== '' || deliveryDateValue !== undefined;
        const hasValidItems = orderItems.length > 0 && !orderItems.some(item => item.drug === null);
        return hasCustomer && hasDeliveryDate && hasValidItems;
    }, [selectedCustomer, deliveryDate, deliveryDateValue, orderItems]);

    const handleDateChange = (date: Date) => {
        setDeliveryDateValue(date);
<<<<<<< HEAD
=======
        // Update the text field with formatted date
        setDeliveryDate(formatDate(date));
>>>>>>> origin/rcpa/dcr_frontend
    };

    const handleItemsUpdate = (items: OrderItem[]) => {
        setOrderItems(items);
    };

    const handleCancel = () => {
        Alert.alert(
            isEditMode ? 'Cancel Editing' : 'Cancel Order',
            isEditMode ? 'Are you sure you want to cancel? All changes will be lost.' : 'Are you sure you want to cancel? All unsaved changes will be lost.',
            [
                { text: 'Continue', style: 'cancel' },
                {
                    text: isEditMode ? 'Discard Changes' : 'Cancel Order',
                    style: 'destructive',
                    onPress: () => router.back()
                }
            ]
        );
    };

    const handleViewSummary = () => {
        if (!isViewSummaryEnabled) return;

<<<<<<< HEAD
=======
        // Determine the best delivery date to use
        let finalDeliveryDate = '';
        if (deliveryDateValue) {
            // Use the Date object and format it consistently
            finalDeliveryDate = deliveryDateValue.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } else if (deliveryDate.trim()) {
            // Use the text field value if no Date object is available
            finalDeliveryDate = deliveryDate.trim();
        }

        console.log('📊 Preparing order summary data:');
        console.log('  - Delivery date (text):', deliveryDate);
        console.log('  - Delivery date (value):', deliveryDateValue);
        console.log('  - Final delivery date:', finalDeliveryDate);

>>>>>>> origin/rcpa/dcr_frontend
        const summaryData = {
            action: isEditMode ? 'edit' : 'create', // Key addition for Option 4
            orderId: isEditMode ? editOrderId : undefined, // Pass original order ID when editing
            customer: selectedCustomer,
<<<<<<< HEAD
            deliveryDate: deliveryDate || (deliveryDateValue ? deliveryDateValue.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : ''),
=======
            deliveryDate: finalDeliveryDate,
>>>>>>> origin/rcpa/dcr_frontend
            specialInstructions: specialInstructions.trim() || '',
            items: orderItems.filter(item => item.drug !== null).map(item => ({
                id: item.id,
                drugId: item.drug!.id,
                name: item.drug!.name,
                quantity: item.quantity,
                unitPrice: item.drug!.price,
                subtotal: item.subtotal
            })),
            orderDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

<<<<<<< HEAD
=======
        console.log('📋 Final order summary data:', JSON.stringify(summaryData, null, 2));

>>>>>>> origin/rcpa/dcr_frontend
        router.push({
            pathname: '/(tabs)/orderSummary',
            params: {
                summaryData: JSON.stringify(summaryData)
            }
        });
    };

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>
                {/* Header */}
                <StyledView className='bg-white px-5 py-4 flex-row items-center border-b border-gray-200'>
                    <StyledTouchableOpacity
                        className='mr-4'
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </StyledTouchableOpacity>
                    <StyledText className='text-xl font-semibold text-gray-900'>
                        Create Order
                    </StyledText>
                </StyledView>

                {/* Loading Indicator */}
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-4">Loading order data...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>
                {/* Header */}
                <StyledView className='bg-white px-5 py-4 flex-row items-center border-b border-gray-200'>
                    <StyledTouchableOpacity
                        className='mr-4'
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </StyledTouchableOpacity>
                    <StyledText className='text-xl font-semibold text-gray-900'>
                        Create Order
                    </StyledText>
                </StyledView>

                {/* Error State */}
                <StyledView className="flex-1 justify-center items-center px-5">
                    <StyledText className="text-5xl mb-4">⚠️</StyledText>
                    <StyledText className="text-lg font-semibold text-gray-900 mb-2">
                        Error loading order data
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
            </StyledSafeAreaView>
        );
    }

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>
            {/* Header */}
            <StyledView className='bg-white px-5 py-4 flex-row items-center border-b border-gray-200'>
                <StyledTouchableOpacity
                    className='mr-4'
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </StyledTouchableOpacity>

                <StyledText className='text-xl font-semibold text-gray-900'>
                    {isEditMode ? 'Edit Order' : 'Create Order'}
                </StyledText>
            </StyledView>

            <StyledScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                keyboardShouldPersistTaps="handled"
            >
                {/* Customer Selection - Custom dropdown like in your changes */}
                <StyledView style={{ marginBottom: 20 }}>
                    <StyledText style={{ marginBottom: 6, fontWeight: '500', fontSize: 16, color: '#111827' }}>
                        Choose Customer <StyledText style={{ color: '#EF4444' }}>*</StyledText>
                    </StyledText>
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
                        <StyledText style={{
                            flex: 1,
                            color: selectedCustomer ? '#111827' : '#9CA3AF',
                            fontSize: 16
                        }}>
                            {selectedCustomer ? selectedCustomer.label : "Select a customer..."}
                        </StyledText>
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
                            maxHeight: 200,
                            elevation: 5,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            zIndex: 10,
                        }}>
                            <ScrollView nestedScrollEnabled={true}>
                                {customerOptions.map((customer, index) => (
                                    <StyledTouchableOpacity
                                        key={customer.id}
                                        onPress={() => {
                                            setSelectedCustomer(customer);
                                            setIsCustomerListOpen(false);
                                        }}
                                        style={{
                                            paddingVertical: 14,
                                            paddingHorizontal: 16,
                                            borderBottomWidth: index < customerOptions.length - 1 ? 1 : 0,
                                            borderBottomColor: '#F3F4F6'
                                        }}
                                    >
                                        <StyledText style={{ fontSize: 16, fontWeight: '500', color: '#111827' }}>
                                            {customer.label}
                                        </StyledText>
                                        {customer.subtitle && (
                                            <StyledText style={{
                                                fontSize: 14,
                                                color: '#6B7280',
                                                marginTop: 2
                                            }}>
                                                {customer.subtitle}
                                            </StyledText>
                                        )}
                                    </StyledTouchableOpacity>
                                ))}
                            </ScrollView>
                        </StyledView>
                    )}
                </StyledView>

                {/* Delivery Date */}
                <StyledView style={{ marginBottom: 24 }}>
                    <Input
                        label="Expected Delivery Date"
<<<<<<< HEAD
                        placeholder="dd - mm - yyyy"
=======
                        placeholder="dd-mm-yyyy"
>>>>>>> origin/rcpa/dcr_frontend
                        value={deliveryDate}
                        onChangeText={setDeliveryDate}
                        rightIcon="calendar-outline"
                        isDateInput={true}
                        dateValue={deliveryDateValue}
                        onDateChange={handleDateChange}
                    />
                </StyledView>

                {/* Special Instructions */}
                <StyledView style={{ marginBottom: 24 }}>
                    <Input
                        label="Special Instructions"
                        placeholder="Add any special instructions..."
                        value={specialInstructions}
                        onChangeText={setSpecialInstructions}
                        multiline
                        numberOfLines={4}
                    />
                </StyledView>

                {/* Items Section */}
                <ItemsSection
                    title="Items"
                    items={orderItems}
                    availableDrugs={availableDrugs}
                    onUpdateItems={handleItemsUpdate}
                    emptyStateText="No items added yet"
                    addButtonText="Add Item"
                    addAnotherButtonText="Add Another Item"
                    searchPlaceholder="Search and select drug..."
                    showPriceInList={true}
                    minQuantity={1}
                    maxQuantity={100}
                    currency="₹"
                />
            </StyledScrollView>

            {/* Bottom Actions - Custom styled buttons */}
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
                    style={{
                        flex: 1,
                        paddingVertical: 14,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#D1D5DB',
                        backgroundColor: '#F9FAFB',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    activeOpacity={0.7}
                >
                    <StyledText style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#6B7280'
                    }}>
                        {isEditMode ? 'Cancel' : 'Cancel'}
                    </StyledText>
                </StyledTouchableOpacity>

                {/* View Summary Button */}
                <StyledTouchableOpacity
                    onPress={handleViewSummary}
                    disabled={!isViewSummaryEnabled}
                    style={{
                        flex: 1,
                        paddingVertical: 14,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                        backgroundColor: isViewSummaryEnabled ? '#0077B6' : '#D1D5DB',
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: isViewSummaryEnabled ? 2 : 0,
                        shadowColor: isViewSummaryEnabled ? '#0077B6' : 'transparent',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }}
                    activeOpacity={isViewSummaryEnabled ? 0.8 : 1}
                >
                    <StyledText style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: isViewSummaryEnabled ? '#FFFFFF' : '#9CA3AF'
                    }}>
                        {isEditMode ? 'Save Changes' : 'View Summary'}
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledSafeAreaView>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/rcpa/dcr_frontend
