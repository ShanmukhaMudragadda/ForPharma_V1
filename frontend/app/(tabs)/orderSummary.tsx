// app/(tabs)/order-summary.tsx
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

export default function OrderSummary() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Parse the data from params
    let orderData;
    try {
        orderData = params.summaryData ? JSON.parse(params.summaryData as string) : null;
    } catch (error) {
        console.error('Error parsing summary data:', error);
        orderData = null;
    }

    // Fallback data if no params
    if (!orderData) {
        orderData = {
            customer: { label: 'No customer selected' },
            deliveryDate: '',
            specialInstructions: '',
            items: [],
            orderDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
    }

    const totalAmount = orderData.items.reduce((sum: number, item: any) => sum + item.subtotal, 0);
    const itemCount = orderData.items.length;

    const handleEditOrder = () => {
        router.back();
    };

    const handleConfirmOrder = () => {
        Alert.alert(
            'Order Confirmed!',
            'Your order has been placed successfully. You can track its progress in the Orders section.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        router.push('/(tabs)/orders'); // Navigate to home or orders list
                    }
                }
            ]
        );
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
                    Order Summary
                </StyledText>
            </StyledView>

            <StyledScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            >
                {/* Order Highlights */}
                <StyledView style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    padding: 20,
                    marginBottom: 20,
                    borderWidth: 1,
                    borderColor: '#E5E7EB'
                }}>
                    {/* Customer */}
                    <StyledView style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#F3F4F6'
                    }}>
                        <StyledText style={{
                            fontSize: 14,
                            color: '#6B7280',
                            fontWeight: '500'
                        }}>
                            Customer
                        </StyledText>
                        <StyledText style={{
                            fontSize: 14,
                            color: '#111827',
                            fontWeight: '600',
                            textAlign: 'right',
                            maxWidth: 200,
                            flex: 1,
                            marginLeft: 20
                        }}>
                            {orderData.customer?.label || 'No customer selected'}
                        </StyledText>
                    </StyledView>

                    {/* Created By */}
                    <StyledView style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#F3F4F6'
                    }}>
                        <StyledText style={{
                            fontSize: 14,
                            color: '#6B7280',
                            fontWeight: '500'
                        }}>
                            Created By
                        </StyledText>
                        <StyledText style={{
                            fontSize: 14,
                            color: '#111827',
                            fontWeight: '600',
                            textAlign: 'right'
                        }}>
                            Rajesh Kumar
                        </StyledText>
                    </StyledView>

                    {/* Order Date */}
                    <StyledView style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        paddingVertical: 8,
                        borderBottomWidth: orderData.deliveryDate ? 1 : 0,
                        borderBottomColor: '#F3F4F6'
                    }}>
                        <StyledText style={{
                            fontSize: 14,
                            color: '#6B7280',
                            fontWeight: '500'
                        }}>
                            Order Date
                        </StyledText>
                        <StyledText style={{
                            fontSize: 14,
                            color: '#111827',
                            fontWeight: '600',
                            textAlign: 'right'
                        }}>
                            {orderData.orderDate}
                        </StyledText>
                    </StyledView>

                    {/* Expected Delivery - Only show if date is provided */}
                    {orderData.deliveryDate && (
                        <StyledView style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            paddingVertical: 8,
                            borderBottomWidth: orderData.specialInstructions ? 1 : 0,
                            borderBottomColor: '#F3F4F6'
                        }}>
                            <StyledText style={{
                                fontSize: 14,
                                color: '#6B7280',
                                fontWeight: '500'
                            }}>
                                Expected Delivery
                            </StyledText>
                            <StyledText style={{
                                fontSize: 14,
                                color: '#111827',
                                fontWeight: '600',
                                textAlign: 'right'
                            }}>
                                {orderData.deliveryDate}
                            </StyledText>
                        </StyledView>
                    )}

                    {/* Special Instructions - Only show if provided */}
                    {orderData.specialInstructions && (
                        <StyledView style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            paddingVertical: 8
                        }}>
                            <StyledText style={{
                                fontSize: 14,
                                color: '#6B7280',
                                fontWeight: '500'
                            }}>
                                Special Instructions
                            </StyledText>
                            <StyledText style={{
                                fontSize: 14,
                                color: '#111827',
                                lineHeight: 20,
                                textAlign: 'right',
                                maxWidth: 200,
                                flex: 1,
                                marginLeft: 20
                            }}>
                                {orderData.specialInstructions}
                            </StyledText>
                        </StyledView>
                    )}
                </StyledView>

                {/* Items Ordered */}
                <StyledView style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    padding: 20,
                    borderWidth: 1,
                    borderColor: '#E5E7EB'
                }}>
                    <StyledText style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: 16
                    }}>
                        Items Ordered
                    </StyledText>

                    {orderData.items.length > 0 ? (
                        <>
                            {/* Table Header */}
                            <StyledView style={{
                                flexDirection: 'row',
                                backgroundColor: '#F9FAFB',
                                paddingVertical: 12,
                                paddingHorizontal: 8,
                                borderRadius: 6,
                                marginBottom: 8
                            }}>
                                <StyledText style={{
                                    flex: 2,
                                    fontSize: 12,
                                    fontWeight: '600',
                                    color: '#6B7280',
                                    textTransform: 'uppercase'
                                }}>
                                    Drug Name
                                </StyledText>
                                <StyledText style={{
                                    width: 40,
                                    fontSize: 12,
                                    fontWeight: '600',
                                    color: '#6B7280',
                                    textTransform: 'uppercase',
                                    textAlign: 'center'
                                }}>
                                    Qty
                                </StyledText>
                                <StyledText style={{
                                    width: 70,
                                    fontSize: 12,
                                    fontWeight: '600',
                                    color: '#6B7280',
                                    textTransform: 'uppercase',
                                    textAlign: 'right'
                                }}>
                                    Unit Price
                                </StyledText>
                                <StyledText style={{
                                    width: 70,
                                    fontSize: 12,
                                    fontWeight: '600',
                                    color: '#6B7280',
                                    textTransform: 'uppercase',
                                    textAlign: 'right'
                                }}>
                                    Subtotal
                                </StyledText>
                            </StyledView>

                            {/* Table Rows */}
                            {orderData.items.map((item: any, index: number) => (
                                <StyledView key={item.id} style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 12,
                                    paddingHorizontal: 8,
                                    borderBottomWidth: index < orderData.items.length - 1 ? 1 : 0,
                                    borderBottomColor: '#F3F4F6'
                                }}>
                                    <StyledTouchableOpacity style={{ flex: 2 }}>
                                        <StyledText style={{
                                            fontSize: 16,
                                            fontWeight: '500',
                                            color: '#0077B6',
                                            textDecorationLine: 'underline'
                                        }}>
                                            {item.name}
                                        </StyledText>
                                    </StyledTouchableOpacity>
                                    <StyledText style={{
                                        width: 40,
                                        fontSize: 14,
                                        color: '#111827',
                                        textAlign: 'center'
                                    }}>
                                        {item.quantity}
                                    </StyledText>
                                    <StyledText style={{
                                        width: 70,
                                        fontSize: 14,
                                        color: '#111827',
                                        textAlign: 'right'
                                    }}>
                                        ₹{item.unitPrice.toFixed(2)}
                                    </StyledText>
                                    <StyledText style={{
                                        width: 70,
                                        fontSize: 14,
                                        color: '#111827',
                                        textAlign: 'right'
                                    }}>
                                        ₹{item.subtotal.toFixed(2)}
                                    </StyledText>
                                </StyledView>
                            ))}
                        </>
                    ) : (
                        <StyledText style={{
                            textAlign: 'center',
                            color: '#6B7280',
                            fontSize: 16,
                            paddingVertical: 20
                        }}>
                            No items selected
                        </StyledText>
                    )}

                    {/* Order Total */}
                    {orderData.items.length > 0 && (
                        <StyledView style={{
                            backgroundColor: '#F9FAFB',
                            borderRadius: 8,
                            padding: 16,
                            marginTop: 16
                        }}>
                            <StyledView style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 8
                            }}>
                                <StyledText style={{
                                    fontSize: 14,
                                    color: '#6B7280'
                                }}>
                                    Subtotal ({itemCount} items)
                                </StyledText>
                                <StyledText style={{
                                    fontSize: 16,
                                    fontWeight: '500',
                                    color: '#111827'
                                }}>
                                    ₹{totalAmount.toFixed(2)}
                                </StyledText>
                            </StyledView>
                            <StyledView style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <StyledText style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                    color: '#111827'
                                }}>
                                    Total Amount
                                </StyledText>
                                <StyledText style={{
                                    fontSize: 20,
                                    fontWeight: '700',
                                    color: '#10B981'
                                }}>
                                    ₹{totalAmount.toFixed(2)}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    )}
                </StyledView>
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
                {/* Edit Order Button */}
                <StyledTouchableOpacity
                    onPress={handleEditOrder}
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
                        Edit Order
                    </StyledText>
                </StyledTouchableOpacity>

                {/* Confirm Order Button */}
                <StyledTouchableOpacity
                    onPress={handleConfirmOrder}
                    style={{
                        flex: 1,
                        paddingVertical: 14,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                        backgroundColor: '#0077B6',
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 2,
                        shadowColor: '#0077B6',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }}
                    activeOpacity={0.8}
                >
                    <StyledText style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#FFFFFF'
                    }}>
                        Confirm Order
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledSafeAreaView>
    );
}