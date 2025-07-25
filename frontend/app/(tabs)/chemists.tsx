
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Alert, SafeAreaView, TextInput } from 'react-native'
import { styled } from 'nativewind'
import { useRouter, Link, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import DoctorCard from '../../components/doctorListCard';

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledScrollView = styled(ScrollView)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledSafeAreaView = styled(SafeAreaView)
const StyledTextInput = styled(TextInput)

export default function Doctors() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const handleDoctorPress = (doctorName: string) => {
        console.log(`Opening details for ${doctorName}`);
        // Add navigation logic here later
        router.push('/chemistDetails')
    };


    const chemistsList = [
        {
            name: "Apollo Pharmacy",
            designation: "Retail Chemist",
            location: "New Delhi, Delhi",
            avatar: "💊"
        },
        {
            name: "MedPlus Pharmacy",
            designation: "24/7 Chemist",
            location: "Mumbai, Maharashtra",
            avatar: "💊"
        },
        {
            name: "Guardian Pharmacy",
            designation: "Healthcare Store",
            location: "Bangalore, Karnataka",
            avatar: "💊"
        },
        {
            name: "Wellness Forever",
            designation: "Pharmacy & Wellness",
            location: "Pune, Maharashtra",
            avatar: "💊"
        },
        {
            name: "Frank Ross Pharmacy",
            designation: "Community Chemist",
            location: "Kolkata, West Bengal",
            avatar: "💊"
        },
        {
            name: "Netmeds Store",
            designation: "Digital Pharmacy",
            location: "Chennai, Tamil Nadu",
            avatar: "💊"
        },
        {
            name: "LifeCare Pharmacy",
            designation: "Medical Store",
            location: "Hyderabad, Telangana",
            avatar: "💊"
        },
        {
            name: "CareFirst Chemist",
            designation: "Retail Pharmacy",
            location: "Ahmedabad, Gujarat",
            avatar: "💊"
        },
        {
            name: "MediCare Plus",
            designation: "Healthcare Pharmacy",
            location: "Jaipur, Rajasthan",
            avatar: "💊"
        },
        {
            name: "HealthKart Pharmacy",
            designation: "Wellness Store",
            location: "Lucknow, Uttar Pradesh",
            avatar: "💊"
        },
        {
            name: "PharmEasy Store",
            designation: "Express Chemist",
            location: "Indore, Madhya Pradesh",
            avatar: "💊"
        },
        {
            name: "Noble Chemist",
            designation: "Medical Store",
            location: "Surat, Gujarat",
            avatar: "💊"
        },
        {
            name: "City Medical Store",
            designation: "Local Pharmacy",
            location: "Nagpur, Maharashtra",
            avatar: "💊"
        },
        {
            name: "Trust Pharmacy",
            designation: "Community Chemist",
            location: "Chandigarh, Punjab",
            avatar: "💊"
        },
        {
            name: "Healing Touch Pharmacy",
            designation: "Healthcare Center",
            location: "Bhopal, Madhya Pradesh",
            avatar: "💊"
        }
    ];

    const filteredDoctors = chemistsList.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination values
    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageNumber = (pageNum: number) => {
        setCurrentPage(pageNum);
    };

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>
            {/* <StatusBar barStyle="dark-content" backgroundColor="#ffffff" /> */}

            {/* Header */}
            <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                <StyledView className='flex-row items-center gap-3'>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                        onPress={() => router.push('/')}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>

                    <StyledText className='text-xl font-semibold text-gray-900'>
                        Chemists
                    </StyledText>
                </StyledView>

                <StyledView className='flex-row gap-2'>
                    <StyledTouchableOpacity className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'>
                        <Ionicons name="options-outline" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                        onPress={() => setSearchOpen(!searchOpen)}
                    >
                        <Ionicons name="search-outline" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Search Bar */}
            {searchOpen && (
                <StyledView className='bg-white px-5 py-4 border-b border-gray-200'>
                    <StyledTextInput
                        className='w-full p-3 border border-gray-200 rounded-lg text-base'
                        placeholder="Search doctors..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus={true}
                    />
                </StyledView>
            )}

            {/* Doctor List */}
            <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <StyledView className="px-5 py-6">
                    {currentDoctors.map((doctor, index) => (
                        <DoctorCard
                            key={index}
                            name={doctor.name}
                            designation={doctor.designation}
                            location={doctor.location}
                            avatar={doctor.avatar}
                            onPress={() => handleDoctorPress(doctor.name)}
                        />
                    ))}
                </StyledView>
            </StyledScrollView>

            {/* Pagination */}
            <StyledView className='bg-white px-5 py-4 border-t border-gray-200 flex-row justify-center items-center gap-2'>
                <StyledTouchableOpacity
                    className={`w-9 h-9 rounded-lg border border-gray-200 items-center justify-center ${currentPage === 1 ? 'opacity-50' : ''}`}
                    onPress={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    <Ionicons name="chevron-back" size={14} color={currentPage === 1 ? "#6C757D" : "#212529"} />
                </StyledTouchableOpacity>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <StyledTouchableOpacity
                        key={pageNum}
                        className={`w-9 h-9 rounded-lg border items-center justify-center ${currentPage === pageNum ? 'bg-[#0077B6] border-[#0077B6]' : 'border-gray-200'
                            }`}
                        onPress={() => handlePageNumber(pageNum)}
                    >
                        <StyledText className={`text-sm font-medium ${currentPage === pageNum ? 'text-white' : 'text-gray-900'
                            }`}>
                            {pageNum}
                        </StyledText>
                    </StyledTouchableOpacity>
                ))}

                <StyledText className='text-sm text-gray-600 mx-3'>
                    {startIndex + 1}-{Math.min(endIndex, filteredDoctors.length)} of {filteredDoctors.length}
                </StyledText>

                <StyledTouchableOpacity
                    className={`w-9 h-9 rounded-lg border border-gray-200 items-center justify-center ${currentPage === totalPages ? 'opacity-50' : ''}`}
                    onPress={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <Ionicons name="chevron-forward" size={14} color={currentPage === totalPages ? "#6C757D" : "#212529"} />
                </StyledTouchableOpacity>
            </StyledView>
        </StyledSafeAreaView>
    );
}