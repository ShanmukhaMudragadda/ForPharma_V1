import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Alert, SafeAreaView, TextInput, ActivityIndicator } from 'react-native'
import { styled } from 'nativewind'
import { useRouter, Link, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import DoctorCard from '../../components/doctorListCard';
import chemistService, { Chemist } from '../../services/chemistService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledScrollView = styled(ScrollView)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledSafeAreaView = styled(SafeAreaView)
const StyledTextInput = styled(TextInput)

export default function Chemists() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [chemists, setChemists] = useState<Chemist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch chemists data
    const fetchChemists = async () => {
        try {
            setError(null);
            const data = await chemistService.getChemistList();
            setChemists(data);
        } catch (err: any) {
            console.error('Error fetching chemists:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch chemists');
            Alert.alert(
                'Error',
                err.response?.data?.message || 'Failed to fetch chemists. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Fetch chemists on component mount
    useEffect(() => {
        fetchChemists();
    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log('Token exists?', !!token);
        if (!token) {
            console.log('NO TOKEN FOUND - Need to login first!');
            router.push('/login');
        }
    };

    // Handle refresh
    const handleRefresh = () => {
        setRefreshing(true);
        fetchChemists();
    };

    const handleChemistPress = (chemistId: string) => {
        console.log(`Opening details for chemist ${chemistId}`);
        router.push(`/chemistDetails?chemistId=${chemistId}`);
    };

    // Transform backend data for display
    const transformedChemists = chemists.map(chemist => ({
        id: chemist.chemistId,
        name: chemist.chemistName,
        designation: chemist.type,
        location: chemist.address.split(',').slice(-2).join(',').trim() || 'No location',
        avatar: "💊",
        chainName: chemist.chainName,
        territoryName: chemist.territoryName
    }));

    // Filter chemists based on search query
    const filteredChemists = transformedChemists.filter(chemist =>
        chemist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chemist.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chemist.location.toLowerCase().includes(searchQuery.toLowerCase())
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
                            Chemists
                        </StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className='flex-1 items-center justify-center'>
                    <ActivityIndicator size="large" color="#00B4D8" />
                    <StyledText className='text-gray-600 mt-2'>Loading chemists...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error && !chemists.length) {
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
                            Chemists
                        </StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className='flex-1 items-center justify-center px-5'>
                    <Ionicons name="alert-circle-outline" size={60} color="#DC3545" />
                    <StyledText className='text-gray-900 text-lg font-medium mt-3'>Error Loading Chemists</StyledText>
                    <StyledText className='text-gray-600 text-center mt-2'>{error}</StyledText>
                    <StyledTouchableOpacity
                        className='bg-[#00B4D8] px-6 py-3 rounded-lg mt-5'
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
                        Chemists ({filteredChemists.length})
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
                        placeholder="Search chemists..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus={true}
                    />
                </StyledView>
            )}

            {/* Chemist List */}
            {filteredChemists.length === 0 ? (
                <StyledView className='flex-1 items-center justify-center px-5'>
                    <Ionicons name="search-outline" size={60} color="#6C757D" />
                    <StyledText className='text-gray-900 text-lg font-medium mt-3'>No Chemists Found</StyledText>
                    <StyledText className='text-gray-600 text-center mt-2'>
                        {searchQuery ? `No chemists matching "${searchQuery}"` : 'No chemists available in your territory'}
                    </StyledText>
                </StyledView>
            ) : (
                <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                    <StyledView className="px-5 py-6">
                        {filteredChemists.map((chemist) => (
                            <DoctorCard
                                key={chemist.id}
                                name={chemist.name}
                                designation={chemist.designation}
                                location={chemist.location}
                                avatar={chemist.avatar}
                                onPress={() => handleChemistPress(chemist.id)}
                            />
                        ))}
                    </StyledView>
                </StyledScrollView>
            )}
        </StyledSafeAreaView>
    );
}