import React, { useState } from 'react';
import { View, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import { Slot } from 'expo-router';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons'
import Drawer from '../../components/drawer';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledSafeAreaView = styled(SafeAreaView)

export default function TabsLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <StyledView className="flex-1 bg-white">
            <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

            {/* Header with SafeAreaView */}
            <StyledSafeAreaView className='bg-[#0077B6]' style={{
                height: 127
            }}>
                <StyledView className='px-5 pt-12 pb-4 flex-row justify-between items-center'>
                    <StyledTouchableOpacity
                        className='w-10 h-10 rounded-lg bg-white/20 items-center justify-center'
                        onPress={() => setSidebarOpen(true)}
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
            </StyledSafeAreaView>

            {/* Page Content */}
            <StyledView className="flex-1">
                <Slot />
            </StyledView>

            {/* Drawer */}
            <Drawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </StyledView>
    );
}