import { useLocalSearchParams, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

interface OrderDetailsData {
    orderId: string;
    customerName: string;
    date: string;
    amount: string;
    items: OrderItem[];
    status: string;
    createdBy: string;
    expectedDelivery: string;
    specialInstructions?: string;
}

export default function OrderDetails(): JSX.Element {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);

    // Extract the parameters
    const { orderId, customerName, date, amount } = params;

    // Mock data for items - In real app, this would come from API or params
    const mockOrderItems: OrderItem[] = [
        {
            id: '1',
            name: 'Paracetamol 500mg',
            quantity: 100,
            unitPrice: 2.50,
            subtotal: 250.00
        },
        {
            id: '2',
            name: 'Amoxicillin 250mg',
            quantity: 50,
            unitPrice: 5.75,
            subtotal: 287.50
        },
        {
            id: '3',
            name: 'Ibuprofen 400mg',
            quantity: 75,
            unitPrice: 3.20,
            subtotal: 240.00
        },
        {
            id: '4',
            name: 'Cetirizine 10mg',
            quantity: 30,
            unitPrice: 1.80,
            subtotal: 54.00
        }
    ];

    const totalAmount: number = mockOrderItems.reduce((sum: number, item: OrderItem) => sum + item.subtotal, 0);
    const itemCount: number = mockOrderItems.length;

    const handleShare = (): void => {
        console.log('Share order');
        setShowOptionsMenu(false);
    };

    const handleEdit = (): void => {
        console.log('Edit order');
        setShowOptionsMenu(false);
    };

    const handleDelete = (): void => {
        console.log('Delete order');
        setShowOptionsMenu(false);
    };

    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50">
            <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

            {/* Title Bar */}
            <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                <StyledView className="flex-row items-center gap-3">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>

                    <StyledText className="text-xl font-semibold text-gray-900">
                        Order Details
                    </StyledText>
                </StyledView>

                <StyledView className="flex-row gap-2">
                    {/* Options Button with Dropdown */}
                    <StyledView className="relative">
                        <StyledTouchableOpacity
                            className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                            onPress={() => setShowOptionsMenu(!showOptionsMenu)}
                        >
                            <Ionicons name="ellipsis-vertical" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>

                        {/* Dropdown Menu */}
                        {showOptionsMenu && (
                            <>
                                {/* Invisible overlay to close dropdown when clicking outside */}
                                <StyledTouchableOpacity
                                    className="absolute -top-24 -left-96 w-screen h-screen z-40"
                                    onPress={() => setShowOptionsMenu(false)}
                                    activeOpacity={1}
                                />

                                {/* Actual Dropdown */}
                                <StyledView className="absolute top-10 right-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[150px] z-[9999]" style={{ elevation: 10 }}>
                                    {/* Share Option */}
                                    <StyledTouchableOpacity
                                        className="flex-row items-center px-4 py-3 border-b border-gray-100"
                                        onPress={handleShare}
                                    >
                                        <Ionicons name="share-outline" size={18} color="#0077B6" />
                                        <StyledText className="ml-3 text-sm text-gray-900">Share</StyledText>
                                    </StyledTouchableOpacity>

                                    {/* Edit Option */}
                                    <StyledTouchableOpacity
                                        className="flex-row items-center px-4 py-3 border-b border-gray-100"
                                        onPress={handleEdit}
                                    >
                                        <Ionicons name="create-outline" size={18} color="#0077B6" />
                                        <StyledText className="ml-3 text-sm text-gray-900">Edit</StyledText>
                                    </StyledTouchableOpacity>

                                    {/* Delete Option */}
                                    <StyledTouchableOpacity
                                        className="flex-row items-center px-4 py-3"
                                        onPress={handleDelete}
                                    >
                                        <Ionicons name="trash-outline" size={18} color="#DC3545" />
                                        <StyledText className="ml-3 text-sm text-red-600">Delete</StyledText>
                                    </StyledTouchableOpacity>
                                </StyledView>
                            </>
                        )}
                    </StyledView>
                </StyledView>
            </StyledView>

            <StyledScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Order ID Section */}
                <StyledView className="bg-white px-5 py-6 border-b border-gray-200">
                    <StyledView className="items-center">
                        <StyledText className="text-2xl font-bold text-[#0077B6] mb-1">
                            {orderId || '#ORD-2024-XXXX'}
                        </StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Order ID
                        </StyledText>
                    </StyledView>
                </StyledView>

                {/* Order Details Section */}
                <StyledView className="bg-white px-5 py-6 mb-5">
                    <StyledView className="space-y-4">
                        {/* Customer */}
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">
                                Customer
                            </StyledText>
                            <StyledTouchableOpacity
                                className="flex-1 ml-4"
                                onPress={() => console.log('Open customer details')}
                            >
                                <StyledText
                                    className="text-base font-semibold text-[#0077B6] text-right underline"
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {customerName || 'Customer Name'}
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>

                        {/* Created By */}
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">
                                Created By
                            </StyledText>
                            <StyledText
                                className="text-base font-semibold text-gray-900 text-right flex-1 ml-4"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                Rajesh Kumar
                            </StyledText>
                        </StyledView>

                        {/* Order Placed */}
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">
                                Order Placed
                            </StyledText>
                            <StyledText
                                className="text-base font-semibold text-gray-900 text-right flex-1 ml-4"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {date || 'Order Date'}
                            </StyledText>
                        </StyledView>

                        {/* Expected Delivery */}
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">
                                Expected Delivery
                            </StyledText>
                            <StyledText
                                className="text-base font-semibold text-gray-900 text-right flex-1 ml-4"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                December 22, 2024
                            </StyledText>
                        </StyledView>

                        {/* Special Instructions */}
                        <StyledView className="flex-row justify-between items-start py-4">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">
                                Special Instructions
                            </StyledText>
                            <StyledText
                                className="text-base font-semibold text-gray-900 text-right flex-1 ml-4"
                                numberOfLines={3}
                                ellipsizeMode="tail"
                            >
                                Handle with care. Refrigerate immediately upon delivery. Contact customer before delivery.
                            </StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>

                {/* Items Ordered Section */}
                <StyledView className="mx-5 mb-5">
                    <Card style={{ backgroundColor: '#ffffff' }}>
                        <Card.Content style={{ padding: 20 }}>
                            <StyledText className="text-lg font-semibold text-gray-900 mb-4">
                                Items Ordered
                            </StyledText>

                            {mockOrderItems.length > 0 ? (
                                <>
                                    {/* Table Header */}
                                    <StyledView className="flex-row bg-gray-50 py-3 px-2 rounded-md mb-2">
                                        <StyledText className="flex-1 text-xs font-semibold text-gray-500 uppercase">
                                            Drug Name
                                        </StyledText>
                                        <StyledText className="w-10 text-xs font-semibold text-gray-500 uppercase text-center">
                                            Qty
                                        </StyledText>
                                        <StyledText className="w-[70px] text-xs font-semibold text-gray-500 uppercase text-right">
                                            Unit Price
                                        </StyledText>
                                        <StyledText className="w-[70px] text-xs font-semibold text-gray-500 uppercase text-right">
                                            Subtotal
                                        </StyledText>
                                    </StyledView>

                                    {/* Table Rows */}
                                    {mockOrderItems.map((item: OrderItem, index: number) => (
                                        <StyledView
                                            key={item.id}
                                            className={`flex-row items-center py-3 px-2 ${index < mockOrderItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                                        >
                                            <StyledTouchableOpacity className="flex-1">
                                                <StyledText className="text-base font-medium text-[#0077B6] underline">
                                                    {item.name}
                                                </StyledText>
                                            </StyledTouchableOpacity>
                                            <StyledText className="w-10 text-sm text-gray-900 text-center">
                                                {item.quantity}
                                            </StyledText>
                                            <StyledText className="w-[70px] text-sm text-gray-900 text-right">
                                                ₹{item.unitPrice.toFixed(2)}
                                            </StyledText>
                                            <StyledText className="w-[70px] text-sm text-gray-900 text-right">
                                                ₹{item.subtotal.toFixed(2)}
                                            </StyledText>
                                        </StyledView>
                                    ))}
                                </>
                            ) : (
                                <StyledText className="text-center text-gray-500 text-base py-5">
                                    No items found
                                </StyledText>
                            )}

                            {/* Order Total */}
                            {mockOrderItems.length > 0 && (
                                <StyledView className="bg-gray-50 rounded-lg p-4 mt-4">
                                    <StyledView className="flex-row justify-between items-center mb-2">
                                        <StyledText className="text-sm text-gray-500">
                                            Subtotal ({itemCount} items)
                                        </StyledText>
                                        <StyledText className="text-base font-medium text-gray-900">
                                            ₹{totalAmount.toFixed(2)}
                                        </StyledText>
                                    </StyledView>
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledText className="text-lg font-semibold text-gray-900">
                                            Total Amount
                                        </StyledText>
                                        <StyledText className="text-xl font-bold text-green-600">
                                            ₹{totalAmount.toFixed(2)}
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            )}
                        </Card.Content>
                    </Card>
                </StyledView>

            </StyledScrollView>
        </StyledSafeAreaView>
    );
}