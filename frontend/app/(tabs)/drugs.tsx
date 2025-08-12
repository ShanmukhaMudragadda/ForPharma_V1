// app/(tabs)/drugs.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    RefreshControl,
    TextInput
} from 'react-native';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DrugCard } from '../../components/drugListCard';
import { FilterSidebar } from '../../components/filterSideBar';
import { ActiveFilters } from '../../components/activeFilter';
import { EmptyState } from '../../components/emptyState';
import Drawer from '../../components/drawer';

import drugService from '../../services/drugService';
import { DrugItem, FilterSection, ActiveFilter } from '../../types/drug';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTextInput = styled(TextInput)

export default function Drugs() {
    const router = useRouter();

    // State management
    const [drugs, setDrugs] = useState<DrugItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // UI state
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSidebarVisible, setFilterSidebarVisible] = useState(false);
    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

    // Authentication check
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.log('NO TOKEN FOUND - Need to login first!');
            router.push('/login');
        }
    };

    // Fetch drugs data
    const fetchDrugs = async () => {
        try {
            setError(null);
            const data = await drugService.getDrugList();
            setDrugs(data);
        } catch (err: any) {
            console.error('Error fetching drugs:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch drugs');
            Alert.alert(
                'Error',
                err.response?.data?.message || 'Failed to fetch drugs. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchDrugs();
    }, []);

    // Handle refresh
    const handleRefresh = () => {
        setRefreshing(true);
        fetchDrugs();
    };


    // Transform drug data for DrugCard component
    const transformDrugForCard = (drug: DrugItem) => ({
        ...drug,
        price: drug.price ? `₹${Number(drug.price).toFixed(2)}` : 'N/A',
        // image: getImageUri(drug.images)
    });

    // Generate filter sections from drugs data
    const filterSections: FilterSection[] = useMemo(() => {
        if (!drugs.length) return [];

        // Get unique categories, manufacturers, and dosage forms
        const categories = [...new Set(drugs.map(drug => drug.category).filter(Boolean))];
        const manufacturers = [...new Set(drugs.map(drug => drug.manufacturer).filter(Boolean))];

        return [
            {
                id: 'category',
                title: 'Category',
                options: categories.map(category => {
                    const count = drugs.filter(drug => drug.category === category).length;
                    const isChecked = activeFilters.some(filter =>
                        filter.sectionId === 'category' && filter.label === category
                    );
                    return {
                        id: category!,
                        label: category!,
                        count,
                        checked: isChecked
                    };
                })
            },
            {
                id: 'manufacturer',
                title: 'Manufacturer',
                options: manufacturers.map(manufacturer => {
                    const count = drugs.filter(drug => drug.manufacturer === manufacturer).length;
                    const isChecked = activeFilters.some(filter =>
                        filter.sectionId === 'manufacturer' && filter.label === manufacturer
                    );
                    return {
                        id: manufacturer!,
                        label: manufacturer!,
                        count,
                        checked: isChecked
                    };
                })
            },
            {
                id: 'availability',
                title: 'Availability',
                options: [
                    {
                        id: 'available',
                        label: 'In Stock',
                        count: drugs.filter(drug => drug.isAvailable).length,
                        checked: activeFilters.some(filter =>
                            filter.sectionId === 'availability' && filter.label === 'In Stock'
                        )
                    },
                    {
                        id: 'out-of-stock',
                        label: 'Out of Stock',
                        count: drugs.filter(drug => !drug.isAvailable).length,
                        checked: activeFilters.some(filter =>
                            filter.sectionId === 'availability' && filter.label === 'Out of Stock'
                        )
                    }
                ]
            }
        ];
    }, [drugs, activeFilters]);

    // Filter and search logic
    const filteredDrugs = useMemo(() => {
        let filtered = drugs;

        // Apply text search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(drug =>
                drug.name.toLowerCase().includes(query) ||
                drug.composition?.toLowerCase().includes(query) ||
                drug.manufacturer?.toLowerCase().includes(query) ||
                drug.category?.toLowerCase().includes(query)
            );
        }

        // Apply active filters
        if (activeFilters.length > 0) {
            filtered = filtered.filter(drug => {
                return activeFilters.every(filter => {
                    switch (filter.sectionId) {
                        case 'category':
                            return drug.category === filter.label;
                        case 'manufacturer':
                            return drug.manufacturer === filter.label;
                        case 'availability':
                            if (filter.label === 'In Stock') {
                                return drug.isAvailable === true;
                            } else if (filter.label === 'Out of Stock') {
                                return drug.isAvailable === false;
                            }
                            return true;
                        default:
                            return true;
                    }
                });
            });
        }

        return filtered;
    }, [drugs, searchQuery, activeFilters]);

    // Filter handlers
    const handleFilterToggle = (sectionId: string, optionId: string) => {
        const section = filterSections.find(s => s.id === sectionId);
        if (!section) return;

        const option = section.options.find(o => o.id === optionId);
        if (!option) return;

        const existingFilterIndex = activeFilters.findIndex(f =>
            f.sectionId === sectionId && f.optionId === optionId
        );

        if (existingFilterIndex !== -1) {
            // Remove filter
            setActiveFilters(prev => prev.filter((_, index) => index !== existingFilterIndex));
        } else {
            // Add filter
            setActiveFilters(prev => [...prev, {
                sectionId,
                optionId,
                label: option.label
            }]);
        }
    };

    const handleRemoveFilter = (filter: ActiveFilter) => {
        setActiveFilters(prev => prev.filter(f =>
            !(f.sectionId === filter.sectionId && f.optionId === filter.optionId)
        ));
    };

    const handleClearFilters = () => {
        setActiveFilters([]);
    };

    const handleApplyFilters = () => {
        setFilterSidebarVisible(false);
    };

    // Navigation handlers
    const handleDrugPress = (drug: DrugItem) => {
        console.log(`Opening details for drug ${drug.id}`);
        // Navigate to drug details with the drug ID
        router.push(`/drugDetails?drugId=${drug.id}`);
    };

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>
                <StyledView className='bg-[#0077B6] px-5 py-4 flex-row justify-between items-center'>
                    <StyledView className='flex-row items-center gap-3'>
                        <StyledTouchableOpacity
                            className='w-10 h-10 rounded-lg bg-white/20 items-center justify-center'
                            onPress={() => setDrawerOpen(true)}
                        >
                            <Ionicons name="menu" size={20} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>
                    <StyledView className='flex-row gap-3'>
                        <StyledTouchableOpacity className='w-10 h-10 rounded-lg bg-white/20 items-center justify-center'>
                            <Ionicons name="notifications-outline" size={20} color="white" />
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity className='w-10 h-10 rounded-lg bg-white/20 items-center justify-center'>
                            <Ionicons name="person-outline" size={20} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>

                <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                    <StyledView className='flex-row items-center gap-3'>
                        <StyledTouchableOpacity
                            className='w-9 h-9 rounded-lg bg-gray-100 items-center justify-center'
                            onPress={() => router.push('/')}
                        >
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className='text-xl font-semibold text-gray-900'>
                            Drugs
                        </StyledText>
                    </StyledView>
                </StyledView>

                <StyledView className='flex-1 items-center justify-center'>
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className='text-gray-600 mt-2'>Loading drugs...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error && !drugs.length) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>
                <StyledView className='bg-[#0077B6] px-5 py-4 flex-row justify-between items-center'>
                    <StyledView className='flex-row items-center gap-3'>
                        <StyledTouchableOpacity
                            className='w-10 h-10 rounded-lg bg-white/20 items-center justify-center'
                            onPress={() => setDrawerOpen(true)}
                        >
                            <Ionicons name="menu" size={20} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>
                    <StyledView className='flex-row gap-3'>
                        <StyledTouchableOpacity className='w-10 h-10 rounded-lg bg-white/20 items-center justify-center'>
                            <Ionicons name="notifications-outline" size={20} color="white" />
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity className='w-10 h-10 rounded-lg bg-white/20 items-center justify-center'>
                            <Ionicons name="person-outline" size={20} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>

                <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                    <StyledView className='flex-row items-center gap-3'>
                        <StyledTouchableOpacity
                            className='w-9 h-9 rounded-lg bg-gray-100 items-center justify-center'
                            onPress={() => router.push('/')}
                        >
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className='text-xl font-semibold text-gray-900'>
                            Drugs
                        </StyledText>
                    </StyledView>
                </StyledView>

                <StyledView className='flex-1 items-center justify-center px-5'>
                    <Ionicons name="alert-circle-outline" size={60} color="#DC3545" />
                    <StyledText className='text-gray-900 text-lg font-medium mt-3'>Error Loading Drugs</StyledText>
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

            {/* Title Bar */}
            <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                <StyledView className='flex-row items-center gap-3'>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-gray-100 items-center justify-center'
                        onPress={() => router.push('/')}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>
                    <StyledText className='text-xl font-semibold text-gray-900'>
                        Drugs ({filteredDrugs.length})
                    </StyledText>
                </StyledView>

                <StyledView className='flex-row gap-2'>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-gray-100 items-center justify-center'
                        onPress={handleRefresh}
                        disabled={loading || refreshing}
                    >
                        <Ionicons name="refresh-outline" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                        onPress={() => setSearchOpen(!searchOpen)}
                    >
                        <Ionicons name="search-outline" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className={`w-9 h-9 rounded-lg items-center justify-center ${activeFilters.length > 0 ? 'bg-[#0077B6]' : 'bg-gray-100'
                            }`}
                        onPress={() => setFilterSidebarVisible(true)}
                    >
                        <Ionicons
                            name="filter-outline"
                            size={18}
                            color={activeFilters.length > 0 ? "white" : "#6C757D"}
                        />
                        {activeFilters.length > 0 && (
                            <StyledView className='absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full items-center justify-center'>
                                <StyledText className='text-white text-xs font-bold'>
                                    {activeFilters.length}
                                </StyledText>
                            </StyledView>
                        )}
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

            {/* Active Filters */}
            <ActiveFilters
                filters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
                visible={activeFilters.length > 0}
            />

            {/* Drug List */}
            {filteredDrugs.length === 0 ? (
                searchQuery || activeFilters.length > 0 ? (
                    <EmptyState
                        title="No drugs found"
                        message={searchQuery
                            ? `No drugs found matching "${searchQuery}"`
                            : "No drugs match the selected filters"
                        }
                        icon="search-outline"
                    />
                ) : (
                    <EmptyState
                        title="No drugs available"
                        message="No drugs have been added to your catalog yet"
                        icon="medical-outline"
                    />
                )
            ) : (
                <StyledScrollView
                    className='flex-1'
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={['#0077B6']}
                            tintColor="#0077B6"
                        />
                    }
                >
                    <StyledView className="px-5 py-4">
                        {filteredDrugs.map((drug) => (
                            <DrugCard
                                key={drug.id}
                                drug={transformDrugForCard(drug)}
                                onPress={handleDrugPress}
                            />
                        ))}
                        {/* Bottom padding for floating action */}
                        <StyledView className="h-20" />
                    </StyledView>
                </StyledScrollView>
            )}


            {/* Filter Sidebar */}
            <FilterSidebar
                visible={filterSidebarVisible}
                onClose={() => setFilterSidebarVisible(false)}
                filterSections={filterSections}
                onFilterToggle={handleFilterToggle}
                onClearFilters={handleClearFilters}
                onApplyFilters={handleApplyFilters}
                activeFilters={activeFilters}
            />

            {/* Drawer */}
            <Drawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </StyledSafeAreaView>
    );
}