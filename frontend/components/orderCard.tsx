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
                    color: '#0077B6' // Green color
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
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
                borderWidth: 1,
                borderColor: '#F0F0F0',
            }}
        >
            {/* Order Header with Status */}
            <StyledView style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8
            }}>
                {/* Order ID */}
                <StyledText style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#0077B6'
                }}>
                    {orderId}
                </StyledText>

                {/* Status with Bullet Point and Border */}
                {status && (
                    <StyledView style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: statusStyles?.color,
                        borderRadius: 12,
                        paddingHorizontal: 8,
                        paddingVertical: 4
                    }}>
                        <StyledText style={{
                            fontSize: 12,
                            color: statusStyles?.color,
                            marginRight: 1
                        }}>
                        </StyledText>
                        <StyledText style={{
                            fontSize: 12,
                            fontWeight: '600',
                            color: statusStyles?.color,
                            textTransform: 'capitalize'
                        }}>
                            {status}
                        </StyledText>
                    </StyledView>
                )}
            </StyledView>

            {/* Customer Name */}
            <StyledView style={{ marginBottom: 12 }}>
                <StyledText style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#212529'
                }}>
                    {customerName}
                </StyledText>
            </StyledView>

            {/* Order Details Grid */}
            <StyledView style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12
            }}>
                <StyledView>
                    <StyledText style={{
                        fontSize: 12,
                        color: '#6C757D',
                        marginBottom: 2,
                        textTransform: 'uppercase',
                        fontWeight: '500'
                    }}>
                        DATE
                    </StyledText>
                    <StyledText style={{
                        fontSize: 14,
                        color: '#212529',
                        fontWeight: '500'
                    }}>
                        {date}
                    </StyledText>
                </StyledView>

                <StyledView>
                    <StyledText style={{
                        fontSize: 12,
                        color: '#6C757D',
                        marginBottom: 2,
                        textTransform: 'uppercase',
                        fontWeight: '500'
                    }}>
                        AMOUNT
                    </StyledText>
                    <StyledText style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#28A745'
                    }}>
                        {amount}
                    </StyledText>
                </StyledView>
            </StyledView>
        </StyledTouchableOpacity>
    );
};

export default OrderCard;