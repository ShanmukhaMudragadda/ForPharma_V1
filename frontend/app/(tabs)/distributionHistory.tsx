import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../components/header';
import Drawer from '../../components/drawer';
import DistributionCard from '../../components/distributionCard';
import SampleService, { Distribution } from '../../services/sampleService';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTextInput = styled(TextInput);

interface ActiveFilters {
    dateRange: string;
    minQuantity: string;
    maxQuantity: string;
    customStartDate: Date | null;
    customEndDate: Date | null;
}

export default function DistributionHistory() {
    const router = useRouter();

    // State management
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Data states
    const [distributions, setDistributions] = useState<Distribution[]>([]);

    // Filter states
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        dateRange: '',
        minQuantity: '',
        maxQuantity: '',
        customStartDate: null,
        customEndDate: null
    });

    const [tempFilters, setTempFilters] = useState<ActiveFilters>({
        dateRange: '',
        minQuantity: '',
        maxQuantity: '',
        customStartDate: null,
        customEndDate: null
    });

    // Date picker states
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    // Load distributions from backend
    const loadDistributions = async () => {
        try {
            setError(null);
            console.log('📦 Loading distributions from backend...');

            const distributionsData = await SampleService.getDistributions();
            console.log('✅ Distributions loaded:', distributionsData.length);

            setDistributions(distributionsData);
        } catch (error: any) {
            console.error('❌ Error loading distributions:', error);
            setError(error.message || 'Failed to load distributions');
        } finally {
            setLoading(false);
        }
    };

    // Refresh distributions
    const onRefresh = async () => {
        setRefreshing(true);
        await loadDistributions();
        setRefreshing(false);
    };

    // Load distributions on component mount
    useEffect(() => {
        loadDistributions();
    }, []);

    // Filter logic
    const filteredDistributions = distributions.filter(distribution => {
        // Search filter
        const matchesSearch = searchQuery === '' ||
            distribution.distributionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            distribution.customerName.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Quantity filter
        const matchesMinQuantity = activeFilters.minQuantity === '' ||
            distribution.quantity >= parseInt(activeFilters.minQuantity);
        const matchesMaxQuantity = activeFilters.maxQuantity === '' ||
            distribution.quantity <= parseInt(activeFilters.maxQuantity);

        return matchesMinQuantity && matchesMaxQuantity;
    });

    // Filter handlers
    const openFilterModal = () => {
        setTempFilters({ ...activeFilters });
        setIsFilterOpen(true);
    };

    const toggleDateRange = (range: string) => {
        setTempFilters(prev => ({
            ...prev,
            dateRange: prev.dateRange === range ? '' : range
        }));
    };

    const updateQuantityFilter = (type: 'min' | 'max', value: string) => {
        setTempFilters(prev => ({
            ...prev,
            [type === 'min' ? 'minQuantity' : 'maxQuantity']: value
        }));
    };

    const applyFilters = () => {
        setActiveFilters({ ...tempFilters });
        setIsFilterOpen(false);
    };

    const clearFilters = () => {
        setTempFilters({
            dateRange: '',
            minQuantity: '',
            maxQuantity: '',
            customStartDate: null,
            customEndDate: null
        });
    };

    // Date picker handlers
    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartDatePicker(false);
        if (event.type === 'set' && selectedDate) {
            setTempFilters(prev => ({ ...prev, customStartDate: selectedDate }));
        }
    };

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndDatePicker(false);
        if (event.type === 'set' && selectedDate) {
            setTempFilters(prev => ({ ...prev, customEndDate: selectedDate }));
        }
    };

    const totalActiveFilters =
        (activeFilters.dateRange ? 1 : 0) +
        (activeFilters.minQuantity ? 1 : 0) +
        (activeFilters.maxQuantity ? 1 : 0);

    const dateRangeOptions = [
        { value: 'lastWeek', label: 'Last Week' },
        { value: 'lastMonth', label: 'Last Month' },
        { value: 'last3Months', label: 'Last 3 Months' },
        { value: 'last6Months', label: 'Last 6 Months' },
        { value: 'lastYear', label: 'Last Year' },
        { value: 'custom', label: 'Custom Range' }
    ];

    const handleDistributionPress = (distribution: Distribution) => {
        router.push({
            pathname: '/(tabs)/distributionDetails',
            params: {
                distributionId: distribution.distributionId
            }
        });
    };

    const createNewDistribution = () => {
        router.push('/(tabs)/createDistribution');
    };

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>

                {/* Title Bar */}
                <StyledView className="bg-white px-5 py-4 flex-row items-center justify-between border-b border-gray-200">
                    <StyledView className="flex-row items-center gap-3">
                        <StyledTouchableOpacity
                            className="w-9 h-9 rounded-lg bg-gray-50 items-center justify-center"
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={20} color="#6B7280" />
                        </StyledTouchableOpacity>
                        <StyledText className="text-xl font-semibold text-gray-900">
                            Distribution
                        </StyledText>
                    </StyledView>
                </StyledView>

                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-4">Loading distributions...</StyledText>
                </StyledView>
                <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            </StyledSafeAreaView>
        );
    }

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>
            {/* Header */}


            {/* Title Bar */}
            <StyledView className="bg-white px-5 py-4 flex-row items-center justify-between border-b border-gray-200">
                <StyledView className="flex-row items-center gap-3">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-50 items-center justify-center"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={20} color="#6B7280" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-xl font-semibold text-gray-900">
                        Distribution
                    </StyledText>
                </StyledView>

                <StyledView className="flex-row gap-2">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-[#28A745] items-center justify-center"
                        onPress={createNewDistribution}
                    >
                        <Ionicons name="add" size={18} color="#FFFFFF" />
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-50 items-center justify-center relative"
                        onPress={openFilterModal}
                    >
                        <Ionicons name="options-outline" size={18} color={totalActiveFilters > 0 ? "#0077B6" : "#6B7280"} />
                        {totalActiveFilters > 0 && (
                            <StyledView className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                                <StyledText className="text-white text-xs font-semibold">
                                    {totalActiveFilters}
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className={`w-9 h-9 rounded-lg items-center justify-center ${isSearchOpen ? 'bg-[#0077B6]' : 'bg-gray-50'}`}
                        onPress={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <Ionicons name="search" size={18} color={isSearchOpen ? "#FFFFFF" : "#6B7280"} />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Search Bar */}
            {isSearchOpen && (
                <StyledView className="bg-white px-5 py-4 border-b border-gray-200">
                    <StyledTextInput
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-base"
                        placeholder="Search by Distribution ID or Customer name..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                        placeholderTextColor="#9CA3AF"
                    />
                </StyledView>
            )}

            {/* Main Content */}
            <StyledScrollView
                className="flex-1 px-5"
                contentContainerStyle={{ paddingVertical: 20, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#0077B6']}
                        tintColor="#0077B6"
                    />
                }
            >
                {error ? (
                    <StyledView className="items-center py-16">
                        <StyledText className="text-5xl mb-4">⚠️</StyledText>
                        <StyledText className="text-lg font-semibold text-gray-900 mb-2">
                            Error loading distributions
                        </StyledText>
                        <StyledText className="text-sm text-gray-600 text-center mb-4">
                            {error}
                        </StyledText>
                        <StyledTouchableOpacity
                            className="bg-[#0077B6] px-6 py-3 rounded-lg"
                            onPress={loadDistributions}
                        >
                            <StyledText className="text-white font-semibold">
                                Try Again
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                ) : filteredDistributions.length > 0 ? (
                    filteredDistributions.map(distribution => (
                        <DistributionCard
                            key={distribution.distributionId}
                            distributionId={distribution.distributionId}
                            customerName={distribution.customerName}
                            date={distribution.date}
                            quantity={distribution.quantity}
                            onPress={() => handleDistributionPress(distribution)}
                        />
                    ))
                ) : (
                    <StyledView className="items-center py-16">
                        <StyledText className="text-5xl mb-4">📦</StyledText>
                        <StyledText className="text-lg font-semibold text-gray-900 mb-2">
                            No distributions found
                        </StyledText>
                        <StyledText className="text-sm text-gray-600 text-center">
                            {searchQuery || totalActiveFilters > 0
                                ? 'Try adjusting your search terms or filters'
                                : 'You haven\'t created any distributions yet'
                            }
                        </StyledText>
                    </StyledView>
                )}
            </StyledScrollView>

            {/* Drawer */}
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Filter Modal */}
            <Modal
                visible={isFilterOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsFilterOpen(false)}
            >
                <StyledView className="flex-1 bg-black/50">
                    <StyledView className="flex-1 bg-white mt-20 rounded-t-3xl">
                        {/* Filter Header */}
                        <StyledView className="px-5 py-5 border-b border-gray-200 flex-row justify-between items-center">
                            <StyledText className="text-lg font-semibold text-gray-900">
                                Filters
                            </StyledText>
                            <StyledTouchableOpacity
                                className="w-8 h-8 rounded-md bg-gray-100 items-center justify-center"
                                onPress={() => setIsFilterOpen(false)}
                            >
                                <Ionicons name="close" size={20} color="#212529" />
                            </StyledTouchableOpacity>
                        </StyledView>

                        <StyledScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                            {/* Date Range Section */}
                            <StyledView className="px-5 py-6">
                                <StyledText className="text-base font-semibold text-gray-900 mb-4">
                                    Date Range
                                </StyledText>
                                {dateRangeOptions.map(option => (
                                    <StyledTouchableOpacity
                                        key={option.value}
                                        className="flex-row items-center py-2"
                                        onPress={() => toggleDateRange(option.value)}
                                    >
                                        <StyledView className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${tempFilters.dateRange === option.value
                                            ? 'border-[#0077B6]'
                                            : 'border-gray-300'
                                            }`}>
                                            {tempFilters.dateRange === option.value && (
                                                <StyledView className="w-2 h-2 rounded-full bg-[#0077B6]" />
                                            )}
                                        </StyledView>
                                        <StyledText className="text-sm text-gray-900">{option.label}</StyledText>
                                    </StyledTouchableOpacity>
                                ))}
                            </StyledView>

                            {/* Custom Date Range Pickers */}
                            {tempFilters.dateRange === 'custom' && (
                                <StyledView className="px-5 mb-6">
                                    <StyledView className="flex-row gap-3">
                                        {/* Start Date Picker */}
                                        <StyledView className="flex-1">
                                            <StyledText className="text-sm font-medium text-gray-700 mb-2">
                                                Start Date
                                            </StyledText>
                                            <StyledTouchableOpacity
                                                className="w-full p-3 border border-gray-200 rounded-lg flex-row items-center justify-between"
                                                onPress={() => setShowStartDatePicker(true)}
                                            >
                                                <StyledText className="text-base text-gray-900">
                                                    {tempFilters.customStartDate
                                                        ? tempFilters.customStartDate.toLocaleDateString()
                                                        : 'Select Start Date'
                                                    }
                                                </StyledText>
                                                <Ionicons name="calendar-outline" size={18} color="#6B7280" />
                                            </StyledTouchableOpacity>
                                        </StyledView>

                                        {/* End Date Picker */}
                                        <StyledView className="flex-1">
                                            <StyledText className="text-sm font-medium text-gray-700 mb-2">
                                                End Date
                                            </StyledText>
                                            <StyledTouchableOpacity
                                                className="w-full p-3 border border-gray-200 rounded-lg flex-row items-center justify-between"
                                                onPress={() => setShowEndDatePicker(true)}
                                            >
                                                <StyledText className="text-base text-gray-900">
                                                    {tempFilters.customEndDate
                                                        ? tempFilters.customEndDate.toLocaleDateString()
                                                        : 'Select End Date'
                                                    }
                                                </StyledText>
                                                <Ionicons name="calendar-outline" size={18} color="#6B7280" />
                                            </StyledTouchableOpacity>
                                        </StyledView>
                                    </StyledView>
                                </StyledView>
                            )}

                            {/* Quantity Range Section */}
                            <StyledView className="px-5 pb-6">
                                <StyledText className="text-base font-semibold text-gray-900 mb-4">
                                    Quantity Range
                                </StyledText>
                                <StyledView className="flex-row gap-3">
                                    <StyledView className="flex-1">
                                        <StyledTextInput
                                            className="w-full p-3 border border-gray-200 rounded-lg text-base"
                                            placeholder="Min Quantity"
                                            value={tempFilters.minQuantity}
                                            onChangeText={(value) => updateQuantityFilter('min', value)}
                                            keyboardType="numeric"
                                        />
                                    </StyledView>
                                    <StyledView className="flex-1">
                                        <StyledTextInput
                                            className="w-full p-3 border border-gray-200 rounded-lg text-base"
                                            placeholder="Max Quantity"
                                            value={tempFilters.maxQuantity}
                                            onChangeText={(value) => updateQuantityFilter('max', value)}
                                            keyboardType="numeric"
                                        />
                                    </StyledView>
                                </StyledView>
                            </StyledView>
                        </StyledScrollView>

                        {/* Filter Actions */}
                        <StyledView className="px-5 py-4 border-t border-gray-200 flex-row gap-3">
                            <StyledTouchableOpacity
                                className="flex-1 py-3 border border-gray-300 rounded-lg items-center"
                                onPress={clearFilters}
                            >
                                <StyledText className="text-sm font-semibold text-gray-600">
                                    Clear All
                                </StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                className="flex-1 py-3 bg-[#0077B6] rounded-lg items-center"
                                onPress={applyFilters}
                            >
                                <StyledText className="text-sm font-semibold text-white">
                                    Apply Filters
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </Modal>

            {/* Date Pickers */}
            {showStartDatePicker && (
                <DateTimePicker
                    value={tempFilters.customStartDate || new Date()}
                    mode="date"
                    display="default"
                    maximumDate={tempFilters.customEndDate || new Date()}
                    onChange={handleStartDateChange}
                />
            )}

            {showEndDatePicker && (
                <DateTimePicker
                    value={tempFilters.customEndDate || new Date()}
                    mode="date"
                    display="default"
                    minimumDate={tempFilters.customStartDate || new Date(2020, 0, 1)}
                    maximumDate={new Date()}
                    onChange={handleEndDateChange}
                />
            )}
        </StyledSafeAreaView>
    );
}