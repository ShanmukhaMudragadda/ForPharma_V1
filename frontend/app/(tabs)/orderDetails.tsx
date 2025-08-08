// app/(tabs)/order-details.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import OrderService, { OrderDetails, OrderItem } from '../../services/orderService';
import PDFService from '../../services/pdfService';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export default function OrderDetailsPage(): JSX.Element {
    const params = useLocalSearchParams();
    const router = useRouter();

    // State management
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);
    const [isSharing, setIsSharing] = useState<boolean>(false);

    const { orderId } = params;

    // Load order details from backend
    const loadOrderDetails = async () => {
        if (!orderId || typeof orderId !== 'string') {
            setError('Invalid order ID');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const details = await OrderService.getOrderDetails(orderId);
            setOrderDetails(details);
        } catch (error: any) {
            console.error('Error loading order details:', error);
            setError(error.message || 'Failed to load order details');
            Alert.alert('Error', 'Failed to load order details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Load order details on component mount
    useEffect(() => {
        loadOrderDetails();
    }, [orderId]);

    // Convert backend status to display status - Updated for new schema
    const getDisplayStatus = (backendStatus: string) => {
        switch (backendStatus) {
            case 'DRAFT':
                return 'Draft';
            case 'CONFIRMED':
                return 'Confirmed';
            default:
                return 'Draft'; // Default to Draft for any unhandled status
        }
    };

    const handleShare = async (): void => {
        if (!orderDetails || isSharing) return;

        try {
            setIsSharing(true);

            // Generate and share PDF
            await PDFService.generateAndShareOrderPDF({
                orderDetails,
                displayStatus: getDisplayStatus(orderDetails.status)
            });

            console.log('PDF shared successfully');
        } catch (error: any) {
            console.error('Error sharing order:', error);
            Alert.alert(
                'Share Failed',
                error.message || 'Failed to generate or share the order PDF. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsSharing(false);
        }
    };

    const handleEdit = (): void => {
        setShowOptionsMenu(false);
        if (orderDetails) {
            const orderDataToEdit = {
                orderId: orderDetails.orderId,
                customerName: orderDetails.customer.name,
                deliveryDate: orderDetails.expectedDeliveryDate || orderDetails.orderDate,
                specialInstructions: orderDetails.specialInstructions,
                items: orderDetails.items,
            };
            router.push({
                pathname: '/createOrder',
                params: {
                    editData: JSON.stringify(orderDataToEdit),
                }
            });
        }
    };

    const handleDelete = async (): void => {
        setShowOptionsMenu(false);

        Alert.alert(
            'Delete Order',
            'Are you sure you want to delete this order? This action will permanently remove the order and cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await OrderService.deleteOrder(orderId as string);
                            Alert.alert('Success', 'Order deleted successfully', [
                                {
                                    text: 'OK',
                                    onPress: () => router.back()
                                }
                            ]);
                        } catch (error: any) {
                            Alert.alert('Error', 'Failed to delete order. Please try again.');
                        }
                    }
                }
            ]
        );
    };

    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'text-blue-600';
            case 'draft': return 'text-orange-600';
            default: return 'text-gray-600';
        }
    };

    const getStatusBgColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'bg-blue-100';
            case 'draft': return 'bg-orange-100';
            default: return 'bg-gray-100';
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
                        <StyledText className="text-xl font-semibold text-gray-900">Order Details</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-4">Loading order details...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error || !orderDetails) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StatusBar backgroundColor="#0077B6" barStyle="light-content" />
                <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
                    <StyledView className="flex-row items-center gap-3">
                        <StyledTouchableOpacity className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center" onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className="text-xl font-semibold text-gray-900">Order Details</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className="flex-1 justify-center items-center px-5">
                    <StyledText className="text-5xl mb-4">⚠️</StyledText>
                    <StyledText className="text-lg font-semibold text-gray-900 mb-2">Error loading order details</StyledText>
                    <StyledText className="text-sm text-gray-600 text-center mb-4">{error || 'Order not found'}</StyledText>
                    <StyledTouchableOpacity className="bg-[#0077B6] px-6 py-3 rounded-lg" onPress={loadOrderDetails}>
                        <StyledText className="text-white font-semibold">Try Again</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    const displayStatus = getDisplayStatus(orderDetails.status);

    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50">
            <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

            {/* Title Bar */}
            <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200 z-50">
                <StyledView className="flex-row items-center gap-3">
                    <StyledTouchableOpacity className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center" onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-xl font-semibold text-gray-900">Order Details</StyledText>
                </StyledView>

                {/* Conditional Options Menu */}
                <StyledView className="flex-row gap-2">
                    {/* Share button with loading state */}
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

                    {/* Ellipsis button and dropdown only for Draft status */}
                    {displayStatus === 'Draft' ? (
                        <StyledView className="relative">
                            <StyledTouchableOpacity
                                className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
                                onPress={() => setShowOptionsMenu(!showOptionsMenu)}
                            >
                                <Ionicons name="ellipsis-vertical" size={18} color="#6C757D" />
                            </StyledTouchableOpacity>
                            {showOptionsMenu && (
                                <>
                                    <StyledTouchableOpacity
                                        className="absolute -top-24 -left-96 w-screen h-screen z-40"
                                        onPress={() => setShowOptionsMenu(false)}
                                        activeOpacity={1}
                                    />
                                    <StyledView className="absolute top-10 right-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[150px] z-[9999]">
                                        <StyledTouchableOpacity
                                            className="flex-row items-center px-4 py-3 border-b border-gray-100"
                                            onPress={handleEdit}
                                        >
                                            <Ionicons name="create-outline" size={18} color="#0077B6" />
                                            <StyledText className="ml-3 text-sm text-gray-900">Edit</StyledText>
                                        </StyledTouchableOpacity>
                                        <StyledTouchableOpacity
                                            className="flex-row items-center px-4 py-3"
                                            onPress={handleDelete}
                                        >
                                            <Ionicons name="trash-outline" size={18} color="#DC3545" />
                                            <StyledText className="ml-3 text-sm text-red-600">Delete Order</StyledText>
                                        </StyledTouchableOpacity>
                                    </StyledView>
                                </>
                            )}
                        </StyledView>
                    ) : null}
                </StyledView>
            </StyledView>

            {/* Scrollable Content */}
            <StyledScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Order ID Section */}
                <StyledView className="bg-white px-5 py-6 border-b border-gray-200">
                    <StyledView className="items-center">
                        <StyledText className="text-2xl font-bold text-[#0077B6] mb-1">
                            {orderDetails.orderNumber || orderDetails.orderId}
                        </StyledText>
                        <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Order ID
                        </StyledText>
                    </StyledView>
                </StyledView>

                {/* Order Details Section */}
                <StyledView className="bg-white px-5 py-6 mb-5">
                    <StyledView className="space-y-4">
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Customer</StyledText>
                            <StyledTouchableOpacity className="flex-1 ml-4" onPress={() => console.log('Open customer details')}>
                                <StyledText className="text-base font-semibold text-[#0077B6] text-right underline">
                                    {orderDetails.customer.name}
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Created By</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4">
                                {orderDetails.createdBy.name}
                            </StyledText>
                        </StyledView>
                        <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Order Placed</StyledText>
                            <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4">
                                {orderDetails.orderDate}
                            </StyledText>
                        </StyledView>
                        {orderDetails.expectedDeliveryDate && (
                            <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-100">
                                <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Expected Delivery</StyledText>
                                <StyledText className="text-base font-semibold text-gray-900 text-right flex-1 ml-4">
                                    {orderDetails.expectedDeliveryDate}
                                </StyledText>
                            </StyledView>
                        )}
                        <StyledView className="flex-row justify-between items-center py-4">
                            <StyledText className="text-base font-medium text-gray-600 flex-shrink-0">Order Status</StyledText>
                            <StyledView className={`px-3 py-1 rounded-full ${getStatusBgColor(displayStatus)}`}>
                                <StyledText className={`text-sm font-semibold ${getStatusColor(displayStatus)}`}>
                                    {displayStatus}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>
                </StyledView>

                {/* Items Ordered Section */}
                <StyledView className="mx-5 mb-5">
                    <Card style={{ backgroundColor: '#ffffff' }}>
                        <Card.Content style={{ padding: 20 }}>
                            <StyledText className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</StyledText>
                            {orderDetails.items.length > 0 ? (
                                <>
                                    <StyledView className="flex-row bg-gray-50 py-3 px-2 rounded-md mb-2">
                                        <StyledText className="flex-1 text-xs font-semibold text-gray-500 uppercase">Drug Name</StyledText>
                                        <StyledText className="w-10 text-xs font-semibold text-gray-500 uppercase text-center">Qty</StyledText>
                                        <StyledView className="w-px bg-gray-300 mx-2 h-4" />
                                        <StyledText className="w-[70px] text-xs font-semibold text-gray-500 uppercase text-right">Unit Price</StyledText>
                                        <StyledView className="w-px bg-gray-300 mx-2 h-4" />
                                        <StyledText className="w-[70px] text-xs font-semibold text-gray-500 uppercase text-right">Subtotal</StyledText>
                                    </StyledView>
                                    {orderDetails.items.map((item: OrderItem, index: number) => (
                                        <StyledView key={item.id} className={`flex-row items-center py-3 px-2 ${index < orderDetails.items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                            <StyledView className="flex-1">
                                                <StyledText className="text-base font-medium text-[#0077B6]">
                                                    {item.name}
                                                </StyledText>
                                                {item.manufacturer && (
                                                    <StyledText className="text-xs text-gray-500 mt-1">
                                                        {item.manufacturer}
                                                    </StyledText>
                                                )}
                                            </StyledView>
                                            <StyledText className="w-10 text-sm text-gray-900 text-center">{item.quantity}</StyledText>
                                            <StyledView className="w-px bg-gray-200 mx-2 self-stretch" />
                                            <StyledText className="w-[70px] text-sm text-gray-900 text-right">₹{item.unitPrice.toFixed(2)}</StyledText>
                                            <StyledView className="w-px bg-gray-200 mx-2 self-stretch" />
                                            <StyledText className="w-[70px] text-sm text-gray-900 text-right">₹{item.subtotal.toFixed(2)}</StyledText>
                                        </StyledView>
                                    ))}
                                </>
                            ) : (
                                <StyledText className="text-center text-gray-500 text-base py-5">No items found</StyledText>
                            )}
                            {orderDetails.items.length > 0 && (
                                <StyledView className="bg-gray-50 rounded-lg p-4 mt-4">
                                    <StyledView className="flex-row justify-between items-center mb-2">
                                        <StyledText className="text-sm text-gray-500">Subtotal ({orderDetails.itemCount} items)</StyledText>
                                        <StyledText className="text-base font-medium text-gray-900">₹{orderDetails.subtotal.toFixed(2)}</StyledText>
                                    </StyledView>
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledText className="text-lg font-semibold text-gray-900">Total Amount</StyledText>
                                        <StyledText className="text-xl font-bold text-green-600">₹{orderDetails.totalAmount.toFixed(2)}</StyledText>
                                    </StyledView>
                                </StyledView>
                            )}
                        </Card.Content>
                    </Card>
                </StyledView>

                {/* Special Instructions/Notes Section - Read Only */}
                <StyledView className='bg-white px-5 py-5 mb-20'>
                    <StyledView className='flex-row justify-between items-center mb-4'>
                        <StyledText className='text-lg font-semibold text-gray-900'>Special Instructions</StyledText>
                    </StyledView>
                    <StyledView className='bg-gray-50 rounded-lg p-4 min-h-[80px]'>
                        {orderDetails.specialInstructions && orderDetails.specialInstructions.length > 0 ? (
                            <StyledText className='text-sm text-gray-900 leading-5'>
                                {orderDetails.specialInstructions}
                            </StyledText>
                        ) : (
                            <StyledText className='text-sm text-gray-600 italic text-center py-6'>
                                No special instructions for this order.
                            </StyledText>
                        )}
                    </StyledView>
                </StyledView>
            </StyledScrollView>
        </StyledSafeAreaView>
    );
}