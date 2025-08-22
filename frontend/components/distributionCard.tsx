import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface DistributionCardProps {
    distributionId: string;
    customerName: string;
    date: string;
    quantity: number;
    onPress?: () => void;
}

const DistributionCard: React.FC<DistributionCardProps> = ({
    distributionId,
    customerName,
    date,
    quantity,
    onPress
}) => {
    return (
        <StyledTouchableOpacity
            className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Distribution Header */}
            <StyledView className="flex-row justify-between items-center mb-2">
                {/* Distribution ID - with proper flex handling for long IDs */}
                <StyledView className="flex-1 mr-3">
                    <StyledText
                        className="text-base font-semibold text-[#0077B6]"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {distributionId}
                    </StyledText>
                </StyledView>
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

            {/* Distribution Details Grid */}
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
                        QUANTITY
                    </StyledText>
                    <StyledText className="text-lg font-bold text-green-600">
                        {quantity} Items
                    </StyledText>
                </StyledView>
            </StyledView>
        </StyledTouchableOpacity>
    );
};

export default DistributionCard;