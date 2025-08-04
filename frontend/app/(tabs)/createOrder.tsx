import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Dropdown from '../../components/dropdown';
import Input from '../../components/input';
import ItemsSection from '../../components/itemSection';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

// Interfaces
interface Drug {
    id: string;
    name: string;
    price: number;
}

interface OrderItem {
    id: string;
    drug: Drug | null;
    quantity: number;
    subtotal: number;
}

// Define the Customer interface
interface Customer {
    id: string;
    label: string;
    value: string;
    subtitle: string;
}

export default function CreateOrder() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Corrected state initialization to allow for Customer object or null
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryDateValue, setDeliveryDateValue] = useState<Date | undefined>(undefined);
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const customerOptions = [
        { id: '1', label: 'Apollo Pharmacy, Sarita Vihar', value: 'apollo_sarita', subtitle: 'Sarita Vihar, New Delhi' },
        { id: '2', label: 'MedPlus Pharmacy, Lajpat Nagar', value: 'medplus_lajpat', subtitle: 'Lajpat Nagar, New Delhi' },
        { id: '3', label: 'Guardian Pharmacy, Defence Colony', value: 'guardian_defence', subtitle: 'Defence Colony, New Delhi' },
        { id: '4', label: 'City Medical Store, CP', value: 'city_cp', subtitle: 'Connaught Place, New Delhi' },
        { id: '5', label: 'Wellness Pharmacy, GK-1', value: 'wellness_gk1', subtitle: 'Greater Kailash-1, New Delhi' }
    ];

    const availableDrugs: Drug[] = [
        { id: '1', name: 'Amlodipine 5mg', price: 125 },
        { id: '2', name: 'Metformin 500mg', price: 85 },
        { id: '3', name: 'Atorvastatin 20mg', price: 95 },
        { id: '4', name: 'Paracetamol 500mg', price: 4.17 },
        { id: '5', name: 'Omeprazole 20mg', price: 45 },
        { id: '6', name: 'Aspirin 75mg', price: 12 },
        { id: '7', name: 'Lisinopril 10mg', price: 67 },
        { id: '8', name: 'Simvastatin 40mg', price: 78 },
        { id: '9', name: 'Losartan 50mg', price: 92 },
        { id: '10', name: 'Hydrochlorothiazide 25mg', price: 28 }
    ];

    useEffect(() => {
        if (params.editData) {
            try {
                const editData = JSON.parse(params.editData as string);
                setIsEditMode(true);

                // Find and set the selected customer
                const customer = customerOptions.find(c => c.label === editData.customerName);
                if (customer) {
                    setSelectedCustomer(customer);
                }

                // Set delivery date
                if (editData.deliveryDate) {
                    setDeliveryDate(editData.deliveryDate);
                }

                // Set special instructions
                if (editData.specialInstructions) {
                    setSpecialInstructions(editData.specialInstructions);
                }

                // Map and set order items by finding the corresponding drug object
                if (editData.items) {
                    const formattedItems = editData.items.map((item: any) => {
                        const drug = availableDrugs.find(d => d.name === item.name);
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
    }, [params.editData]);

    const isViewSummaryEnabled = useMemo(() => {
        const hasCustomer = selectedCustomer !== null;
        const hasDeliveryDate = deliveryDate.trim() !== '' || deliveryDateValue !== undefined;
        const hasValidItems = orderItems.length > 0 && !orderItems.some(item => item.drug === null);
        return hasCustomer && hasDeliveryDate && hasValidItems;
    }, [selectedCustomer, deliveryDate, deliveryDateValue, orderItems]);

    const handleDateChange = (date: Date) => {
        setDeliveryDateValue(date);
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

        const summaryData = {
            customer: selectedCustomer,
            deliveryDate: deliveryDate || (deliveryDateValue ? deliveryDateValue.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : ''),
            specialInstructions: specialInstructions.trim() || '',
            items: orderItems.filter(item => item.drug !== null).map(item => ({
                id: item.id,
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

        router.push({
            pathname: '/(tabs)/orderSummary',
            params: {
                summaryData: JSON.stringify(summaryData)
            }
        });
    };

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
                {/* Customer Selection */}
                <StyledView style={{ marginBottom: 20 }}>
                    <Dropdown
                        label="Choose Customer"
                        required
                        placeholder="Search and select customer..."
                        items={customerOptions}
                        selectedItem={selectedCustomer}
                        onSelectItem={setSelectedCustomer}
                        searchable
                        maxHeight={250}
                    />
                </StyledView>

                {/* Delivery Date */}
                <StyledView style={{ marginBottom: 24 }}>
                    <Input
                        label="Expected Delivery Date"
                        placeholder="dd - mm - yyyy"
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
}