import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface RCPACardData {
  id: string;
  chemistName: string;
  observationDate: string;
  totalPrescriptions: number;
}

interface RCPACardProps {
  data: RCPACardData;
  onPress?: (rcpaId: string) => void;
}

export default function RCPACard({ data, onPress }: RCPACardProps): JSX.Element {
  const handlePress = (): void => {
    if (onPress) {
      onPress(data.id);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <StyledTouchableOpacity
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* RCPA Header */}
      <StyledView className="mb-2">
        {/* RCPA ID - with proper flex handling for long IDs */}
        <StyledView className="flex-1">
          <StyledText 
            className="text-base font-semibold text-[#0077B6]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            #{data.id}
          </StyledText>
        </StyledView>
      </StyledView>

      {/* Chemist Name with Contact Icon */}
      <StyledView className="mb-3 flex-row items-center">
        <Ionicons 
          name="business-outline" 
          size={20} 
          color="#6C757D" 
          className="mr-2"
        />
        <StyledText 
          className="text-base font-semibold text-gray-800 flex-1 ml-3"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {data.chemistName}
        </StyledText>
      </StyledView>

      {/* RCPA Details Grid */}
      <StyledView className="flex-row justify-between mt-3">
        {/* Observation Date */}
        <StyledView>
          <StyledText className="text-xs text-gray-500 mb-1 uppercase font-medium">
            OBSERVATION DATE
          </StyledText>
          <StyledText className="text-sm text-gray-800 font-medium">
            {formatDate(data.observationDate)}
          </StyledText>
        </StyledView>

        {/* Total Prescriptions */}
        <StyledView>
          <StyledText className="text-xs text-gray-500 mb-1 uppercase font-medium">
            TOTAL PRESCRIPTIONS
          </StyledText>
          <StyledText className="text-lg font-bold text-[#0077B6]">
            {data.totalPrescriptions}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
}