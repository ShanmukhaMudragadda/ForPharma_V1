import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Alert, SafeAreaView, TextInput, ActivityIndicator } from 'react-native'
import { styled } from 'nativewind'
import { useRouter, Link, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import DoctorCard from '../../components/doctorListCard';
import doctorService, { Doctor } from '../../services/doctorService';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch doctors data
    const fetchDoctors = async () => {

        try {
            setError(null);
            const data = await doctorService.getDoctorList();
            setDoctors(data);
        } catch (err: any) {
            console.error('Error fetching doctors:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch doctors');
            Alert.alert(
                'Error',
                err.response?.data?.message || 'Failed to fetch doctors. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Fetch doctors on component mount
    useEffect(() => {
        fetchDoctors();
    }, []);




    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        // const token = await SecureStore.getItemAsync('token');
        const token = await AsyncStorage.getItem('token');
        console.log('Token exists?', !!token);
        if (!token) {
            console.log('NO TOKEN FOUND - Need to login first!');
            // Navigate to login screen
            router.push('/login'); // or however you navigate
        }
    };




    // Handle refresh
    const handleRefresh = () => {
        setRefreshing(true);
        fetchDoctors();
    };

    const handleDoctorPress = (doctorId: string) => {
        console.log(`Opening details for doctor ${doctorId}`);
        // Navigate to doctor details with the doctor ID
        router.push(`/doctorDetails?doctorId=${doctorId}`);
    };

    // Transform backend data for display
    const transformedDoctors = doctors.map(doctor => ({
        id: doctor.doctorId,
        name: doctor.doctorName,
        designation: doctor.specialization || 'Specialist',
        location: doctor.hospitals.length > 0
            ? `${doctor.hospitals[0].hospitalAddress.city}, ${doctor.hospitals[0].hospitalAddress.state}`
            : 'No location available',
        avatar: "👨‍⚕️", // You can add avatar logic here
        hospitalCount: doctor.hospitals.length,
        primaryHospital: doctor.hospitals.find(h => h.isPrimary)?.hospitalName || doctor.hospitals[0]?.hospitalName
    }));

    // Filter doctors based on search query
    const filteredDoctors = transformedDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>
                <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                    <StyledView className='flex-row items-center gap-3'>
                        <StyledTouchableOpacity
                            className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                            onPress={() => router.push('/')}
                        >
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className='text-xl font-semibold text-gray-900'>
                            Doctors
                        </StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className='flex-1 items-center justify-center'>
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className='text-gray-600 mt-2'>Loading doctors...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error && !doctors.length) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>
                <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                    <StyledView className='flex-row items-center gap-3'>
                        <StyledTouchableOpacity
                            className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                            onPress={() => router.push('/')}
                        >
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className='text-xl font-semibold text-gray-900'>
                            Doctors
                        </StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className='flex-1 items-center justify-center px-5'>
                    <Ionicons name="alert-circle-outline" size={60} color="#DC3545" />
                    <StyledText className='text-gray-900 text-lg font-medium mt-3'>Error Loading Doctors</StyledText>
                    <StyledText className='text-gray-600 text-center mt-2'>{error}</StyledText>
                    <StyledTouchableOpacity
                        className='bg-[#0077B6] px-6 py-3 rounded-lg mt-5'
                        onPress={handleRefresh}
                    >
                        <StyledText className='text-white font-medium'>Retry</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>
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
                        Doctors ({filteredDoctors.length})
                    </StyledText>
                </StyledView>

                <StyledView className='flex-row gap-2'>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                        onPress={handleRefresh}
                    >
                        <Ionicons name="refresh-outline" size={18} color="#6C757D" />
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
            {filteredDoctors.length === 0 ? (
                <StyledView className='flex-1 items-center justify-center px-5'>
                    <Ionicons name="search-outline" size={60} color="#6C757D" />
                    <StyledText className='text-gray-900 text-lg font-medium mt-3'>No Doctors Found</StyledText>
                    <StyledText className='text-gray-600 text-center mt-2'>
                        {searchQuery ? `No doctors matching "${searchQuery}"` : 'No doctors available in your territory'}
                    </StyledText>
                </StyledView>
            ) : (
                <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                    <StyledView className="px-5 py-6">
                        {filteredDoctors.map((doctor) => (
                            <DoctorCard
                                key={doctor.id}
                                name={doctor.name}
                                designation={doctor.designation}
                                location={doctor.location}
                                avatar={doctor.avatar}
                                onPress={() => handleDoctorPress(doctor.id)}
                            />
                        ))}
                    </StyledView>
                </StyledScrollView>
            )}
        </StyledSafeAreaView>
    );
}