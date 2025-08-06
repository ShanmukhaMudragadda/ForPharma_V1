import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);


export default function ActivityItem({ icon, title, subtitle, time, bgColor, iconColor }: any) {
  return (
    <StyledView className="flex-row items-center py-3 gap-3 border-b border-gray-300"
      style={{
        height: 70,

      }}>
      <StyledView className="w-10 h-10 rounded-lg items-center justify-center mr-3"
        style={{ backgroundColor: bgColor }}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </StyledView>

      <StyledView className="flex-1 ">
        <StyledText className="text-sm font-medium text-gray-900">{title}</StyledText>
        <StyledText className="text-xs text-gray-600">{subtitle}</StyledText>
      </StyledView>

      <StyledText className="text-xs text-gray-500">{time}</StyledText>
    </StyledView>
  );
};

