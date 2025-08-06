import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import QuickActionCard from '../../components/quickActionCard';
import TaskCard from '../../components/taskCard';
import ActivityItem from '../../components/recentActivity';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function Home() {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState<Date | null>(null);

    const handleCheckInOut = () => {
        if (isCheckedIn) {
            const checkOutTime = new Date();
            const workDuration = checkInTime ? checkOutTime.getTime() - checkInTime.getTime() : 0;
            const hours = Math.floor(workDuration / (1000 * 60 * 60));
            const minutes = Math.floor((workDuration % (1000 * 60 * 60)) / (1000 * 60));

            Alert.alert(
                'Check Out',
                `You checked out at ${checkOutTime.toLocaleTimeString()} from Forsys Inc, HYD. You worked for ${hours}h ${minutes}m today. Thank you!`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'OK',
                        onPress: () => {
                            setIsCheckedIn(false);
                            setCheckInTime(null);
                        },
                    },
                ]
            );
        } else {
            const time = new Date();
            Alert.alert(
                'Check In',
                `You checked in at ${time.toLocaleTimeString()} from Forsys Inc, HYD today`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'OK',
                        onPress: () => {
                            setCheckInTime(time);
                            setIsCheckedIn(true);
                        },
                    },
                ]
            );
        }
    };

    return (
        <StyledScrollView className='flex-1 bg-white' showsVerticalScrollIndicator={false}>

            {/* Greetings Section */}
            <StyledView className='bg-[#E6F3FA] px-5 py-6'>
                <StyledText className='text-xl font-semibold text-[#003D58]'>
                    Hii Ravi!! , Have A Great Day......
                </StyledText>
                <StyledText className='text-base text-[#005A87] mt-1'>
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </StyledText>
            </StyledView>



            {/* Check-In Button */}
            <StyledView className="bg-gray-50 px-5 py-6">
                <StyledTouchableOpacity
                    className={`w-full py-4 rounded-xl flex-row items-center justify-center gap-2 ${isCheckedIn ? 'bg-green-500' : 'bg-[#0077B6]'
                        }`}
                    onPress={handleCheckInOut}
                    style={{
                        shadowColor: isCheckedIn ? '#28A745' : '#0077B6',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 12,
                        elevation: 5,
                    }}
                >
                    <Ionicons
                        name={isCheckedIn ? "checkmark-circle" : "time-outline"}
                        size={20}
                        color="white"
                    />
                    <StyledText className="text-white font-semibold text-base">
                        {isCheckedIn ? 'Check Out' : 'Check In'}
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>

            {/* Today's Tasks */}
            <StyledView className="px-5 mb-6">
                <StyledView className="flex-row justify-between items-center mb-4">
                    <StyledText className="text-lg font-semibold text-gray-900">
                        Today's Tasks
                    </StyledText>
                    <StyledTouchableOpacity>
                        <StyledText className="text-sm text-[#0077B6]">View All</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>

                <TaskCard
                    type="doctor"
                    name="Dr. Apsara"
                    location="Apollo"
                    time="10:00 AM"
                />
                <TaskCard
                    type="chemist"
                    name="MedPlus Pharmacy"
                    location="Sector 18"
                    time="11:30 AM"
                />
                <TaskCard
                    type="doctor"
                    name="Dr. Riya"
                    location="City Clinic"
                    time="2:00 PM"
                />
            </StyledView>

            {/* Quick Actions */}
            <StyledView className="px-5 mb-6">
                <StyledText className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Actions
                </StyledText>

                <StyledView className="flex-row justify-around mb-3" style={{ height: 120 }}>
                    <QuickActionCard icon="clipboard-outline" label="Create Order" color="#E6F3FA" iconColor="#0077B6" />
                    <QuickActionCard icon="calendar-outline" label="Tour Plan" color="#E6F9FD" iconColor="#00B4D8" />
                </StyledView>

                <StyledView className="flex-row justify-around" style={{ height: 120 }}>
                    <QuickActionCard icon="calendar" label="Apply Leave" color="#FFF8E1" iconColor="#FFA000" />
                    <QuickActionCard icon="wallet-outline" label="Expense Claim" color="#E8F5E9" iconColor="#28A745" />
                </StyledView>
            </StyledView>

            {/* Recent Activities */}
            <StyledView className="px-5 pb-6">
                <StyledText className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activities
                </StyledText>
                <ActivityItem
                    icon="clipboard-outline"
                    title="Order #ORD-2024-1234"
                    subtitle="Apollo Pharmacy - ₹45,000"
                    time="2 hrs ago"
                    bgColor="#E6F3FA"
                    iconColor="#0077B6"
                />
                <ActivityItem
                    icon="checkmark"
                    title="Visit Completed"
                    subtitle="Dr. Mehta - Fortis Hospital"
                    time="3 hrs ago"
                    bgColor="#E8F5E9"
                    iconColor="#28A745"
                />
                <ActivityItem
                    icon="document-text-outline"
                    title="DCR Submitted"
                    subtitle="Daily Call Report - 8 visits"
                    time="Yesterday"
                    bgColor="#E6F9FD"
                    iconColor="#00B4D8"
                />
            </StyledView>
        </StyledScrollView>
    );
}