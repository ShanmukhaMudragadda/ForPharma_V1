import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface OrderCardProps {
    orderId: string;
    customerName: string;
    date: string;
    amount: string;
    status?: string; // Made optional since some orders don't have status
    onPress?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
    orderId,
    customerName,
    date,
    amount,
    status,
    onPress
}) => {
    // Function to get status badge styles
    const getStatusStyles = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'draft':
                return {
                    color: '#FF6B35' // Orange color
                };
            case 'confirmed':
                return {
                    color: '#0077B6' // Blue color
                };
            default:
                return {
                    color: '#6C757D' // Default gray
                };
        }
    };

    const statusStyles = status ? getStatusStyles(status) : null;

    return (
        <StyledTouchableOpacity
            className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Order Header with Status */}
            <StyledView className="flex-row justify-between items-center mb-2">
                {/* Order ID - with proper flex handling for long IDs */}
                <StyledView className="flex-1 mr-3">
                    <StyledText 
                        className="text-base font-semibold text-[#0077B6]"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {orderId}
                    </StyledText>
                </StyledView>

                {/* Status with Border */}
                {status && (
                    <StyledView 
                        className="flex-row items-center border rounded-xl px-2 py-1"
                        style={{
                            borderColor: statusStyles?.color
                        }}
                    >
                        <StyledText 
                            className="text-xs font-semibold capitalize"
                            style={{
                                color: statusStyles?.color
                            }}
                        >
                            {status}
                        </StyledText>
                    </StyledView>
                )}
            </StyledView>

            {/* Customer Name */}
            <StyledView className="mb-3">
                <StyledText 
                    className="text-base font-semibold text-gray-800"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {customerName}
                </StyledText>
            </StyledView>

            {/* Order Details Grid */}
            <StyledView className="flex-row justify-between mt-3">
                <StyledView>
                    <StyledText className="text-xs text-gray-500 mb-1 uppercase font-medium">
                        DATE
                    </StyledText>
                    <StyledText className="text-sm text-gray-800 font-medium">
                        {date}
                    </StyledText>
                </StyledView>

                <StyledView>
                    <StyledText className="text-xs text-gray-500 mb-1 uppercase font-medium">
                        AMOUNT
                    </StyledText>
                    <StyledText className="text-lg font-bold text-green-600">
                        {amount}
                    </StyledText>
                </StyledView>
            </StyledView>
        </StyledTouchableOpacity>
    );
};

export default OrderCard;