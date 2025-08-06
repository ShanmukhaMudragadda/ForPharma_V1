// components/Header.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface HeaderProps {
    onMenuPress: () => void;
}

export default function Header({ onMenuPress }: HeaderProps) {
    return (
        <StyledView className='bg-[#0077B6] px-5 pt-12 pb-4 flex-row justify-between items-center'>
            <StyledTouchableOpacity
                className='w-10 h-10 rounded-lg bg-white/20 items-center justify-center'
                onPress={onMenuPress}
            >
                <Ionicons name="menu" size={24} color="white" />
            </StyledTouchableOpacity>

            <StyledView className='flex-row gap-3'>
                <StyledTouchableOpacity className='w-10 h-10 rounded-sm bg-white/20 items-center justify-center'>
                    <Ionicons name="notifications-outline" size={24} color="white" />
                    <StyledView className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </StyledTouchableOpacity>

                <StyledTouchableOpacity className='w-10 h-10 rounded-sm bg-white/20 items-center justify-center'>
                    <Ionicons name="person-outline" size={24} color="white" />
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
}