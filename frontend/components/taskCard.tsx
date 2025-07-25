import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);


export default function TaskCard({ type, name, location, time }: any) {
  const isDoctor = type === 'doctor';

  return (
    <StyledTouchableOpacity
      className="bg-white  rounded-xl  flex-row items-center"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        height: 100,
        marginBottom: 7,
        paddingHorizontal: 10

      }}
    >
      <StyledView className={`w-16 h-16 rounded-xl items-center justify-center mr-3 ${isDoctor ? 'bg-[#E6F3FA]' : 'bg-[#E6F9FD]'}`}>

        <StyledText className="text-xl">
          {isDoctor ? '👨‍⚕️' : '💊'}
        </StyledText>
      </StyledView>

      <StyledView className="flex-1" style={{
        marginLeft: 6
      }}>
        <StyledText className="font-semibold text-base text-gray-900">{name}</StyledText>
        <StyledView className="flex-row items-center gap-3 mt-1">
          <StyledText className="text-sm text-gray-600 truncate flex-1" numberOfLines={1}
            ellipsizeMode='tail'>📍 {location}</StyledText>
          <StyledText className="text-sm text-gray-600 flex-shrink-0">🕐 {time}</StyledText>

        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
};