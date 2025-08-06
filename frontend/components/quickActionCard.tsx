import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);


export default function QuickActionCard({ icon, label, color, iconColor }: any) {
  return (
    <StyledTouchableOpacity
      className="bg-white p-5 rounded-xl items-center justify-center"
      style={{
        width: '40%',
        // paddingTop:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <StyledView
        className="w-10 h-12 rounded-xl items-center justify-center mb-3"
        style={{ backgroundColor: color }}
      >
        <Ionicons name={icon} size={28} color={iconColor} />
      </StyledView>
      <StyledText className="text-sm font-medium text-gray-900">{label}</StyledText>
    </StyledTouchableOpacity>
  );
};
