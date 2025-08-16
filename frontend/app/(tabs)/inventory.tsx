import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/header';
import Drawer from '../../components/drawer';
import SampleService, { InventoryItem } from '../../services/sampleService';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTextInput = styled(TextInput);

type TabType = 'samples' | 'gifts';

export default function Inventory() {
    const router = useRouter();

    // State management
    const [currentTab, setCurrentTab] = useState<TabType>('samples');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Data states
    const [drugInventory, setDrugInventory] = useState<InventoryItem[]>([]);
    const [giftInventory, setGiftInventory] = useState<InventoryItem[]>([]);

    // Load data from backend
    const loadData = async () => {
        try {
            setError(null);
            setLoading(true);

            console.log('📦 Loading inventory data from backend...');

            // Load both inventories in parallel
            const [drugsData, giftsData] = await Promise.all([
                SampleService.getDrugInventory(),
                SampleService.getGiftInventory()
            ]);

            console.log('✅ Inventory data loaded:', {
                drugs: drugsData.length,
                gifts: giftsData.length
            });

            setDrugInventory(drugsData);
            setGiftInventory(giftsData);
        } catch (error: any) {
            console.error('❌ Error loading inventory data:', error);
            setError(error.message || 'Failed to load inventory data');
            Alert.alert('Error', 'Failed to load inventory data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Refresh data
    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    // Filter data based on search query
    const filterItems = (items: InventoryItem[]) => {
        if (!searchQuery.trim()) return items;

        const query = searchQuery.toLowerCase();
        return items.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.manufacturer.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
    };

    const filteredDrugs = filterItems(drugInventory);
    const filteredGifts = filterItems(giftInventory);

    const handleTabSwitch = (tab: TabType) => {
        setCurrentTab(tab);
        setSearchQuery('');
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchQuery('');
        }
    };

    const handleItemPress = (itemId: string, itemType: 'gift' | 'sample') => {
        console.log('Opening details for:', itemType, itemId);
        // Navigate to item details page
        // router.push(`/(tabs)/inventoryDetails?id=${itemId}&type=${itemType}`);
    };

    const createInventoryOrder = () => {
        router.push('/(tabs)/createDistribution');
    };

    const goToDistributionHistory = () => {
        router.push('/(tabs)/distributionHistory');
    };

    // Calculate summary data
    const getSummaryData = () => {
        return {
            totalDrugs: drugInventory.length,
            totalGifts: giftInventory.length,
            lowStockDrugs: drugInventory.filter(d => d.status === 'low').length,
            outOfStockDrugs: drugInventory.filter(d => d.status === 'out').length,
            lowStockGifts: giftInventory.filter(g => g.status === 'low').length,
            outOfStockGifts: giftInventory.filter(g => g.status === 'out').length
        };
    };

    const summaryData = getSummaryData();

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>

                <TitleBarComponent
                    onBackPress={() => router.back()}
                    onCreatePress={createInventoryOrder}
                    onHistoryPress={goToDistributionHistory}
                    onSearchPress={toggleSearch}
                    isSearchOpen={isSearchOpen}
                />
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-4">Loading inventory...</StyledText>
                </StyledView>
                <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>

                <TitleBarComponent
                    onBackPress={() => router.back()}
                    onCreatePress={createInventoryOrder}
                    onHistoryPress={goToDistributionHistory}
                    onSearchPress={toggleSearch}
                    isSearchOpen={isSearchOpen}
                />
                <StyledView className="flex-1 justify-center items-center px-5">
                    <StyledText className="text-5xl mb-4">⚠️</StyledText>
                    <StyledText className="text-lg font-semibold text-gray-900 mb-2">
                        Error loading inventory
                    </StyledText>
                    <StyledText className="text-sm text-gray-600 text-center mb-4">
                        {error}
                    </StyledText>
                    <StyledTouchableOpacity
                        className="bg-[#0077B6] px-6 py-3 rounded-lg"
                        onPress={loadData}
                    >
                        <StyledText className="text-white font-semibold">
                            Try Again
                        </StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
                <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            </StyledSafeAreaView>
        );
    }

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>


            {/* Title Bar */}
            <TitleBarComponent
                onBackPress={() => router.back()}
                onCreatePress={createInventoryOrder}
                onHistoryPress={goToDistributionHistory}
                onSearchPress={toggleSearch}
                isSearchOpen={isSearchOpen}
                summaryData={summaryData}
            />

            {/* Search Bar */}
            {isSearchOpen && (
                <StyledView className="bg-white px-5 py-4 border-b border-gray-200">
                    <StyledTextInput
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-base"
                        placeholder={currentTab === 'gifts' ? 'Search gifts...' : 'Search sample drugs...'}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                        placeholderTextColor="#9CA3AF"
                    />
                </StyledView>
            )}

            {/* Tab Navigation */}
            <StyledView className="bg-white border-b border-gray-200 px-5 flex-row">
                <StyledTouchableOpacity
                    className={`flex-1 py-4 items-center border-b-2 ${currentTab === 'samples' ? 'border-[#0077B6]' : 'border-transparent'}`}
                    onPress={() => handleTabSwitch('samples')}
                >
                    <StyledView className="flex-row items-center">
                        <StyledText className={`text-base font-medium ${currentTab === 'samples' ? 'text-[#0077B6]' : 'text-gray-500'}`}>
                            Sample Drugs
                        </StyledText>
                        <StyledView className="ml-2 bg-gray-100 px-2 py-1 rounded-full">
                            <StyledText className="text-xs font-semibold text-gray-600">
                                {drugInventory.length}
                            </StyledText>
                        </StyledView>
                    </StyledView>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity
                    className={`flex-1 py-4 items-center border-b-2 ${currentTab === 'gifts' ? 'border-[#0077B6]' : 'border-transparent'}`}
                    onPress={() => handleTabSwitch('gifts')}
                >
                    <StyledView className="flex-row items-center">
                        <StyledText className={`text-base font-medium ${currentTab === 'gifts' ? 'text-[#0077B6]' : 'text-gray-500'}`}>
                            Gifts
                        </StyledText>
                        <StyledView className="ml-2 bg-gray-100 px-2 py-1 rounded-full">
                            <StyledText className="text-xs font-semibold text-gray-600">
                                {giftInventory.length}
                            </StyledText>
                        </StyledView>
                    </StyledView>
                </StyledTouchableOpacity>
            </StyledView>

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
                {currentTab === 'samples' ? (
                    filteredDrugs.length > 0 ? (
                        filteredDrugs.map(sample => (
                            <InventoryCard
                                key={sample.inventoryId}
                                id={sample.id}
                                inventoryId={sample.inventoryId}
                                name={sample.name}
                                dosage={sample.dosage}
                                description={sample.description}
                                manufacturer={sample.manufacturer}
                                category={sample.category}
                                quantity={sample.quantity}
                                unit={sample.unit}
                                status={sample.status}
                                icon={sample.icon}
                                onPress={() => handleItemPress(sample.id, 'sample')}
                            />
                        ))
                    ) : (
                        <EmptyState
                            title="No sample drugs found"
                            message={searchQuery ? "No sample drugs match your search criteria" : "No sample drugs available in inventory"}
                            icon="💊"
                        />
                    )
                ) : (
                    filteredGifts.length > 0 ? (
                        filteredGifts.map(gift => (
                            <InventoryCard
                                key={gift.inventoryId}
                                id={gift.id}
                                inventoryId={gift.inventoryId}
                                name={gift.name}
                                dosage={gift.dosage}
                                description={gift.description}
                                manufacturer={gift.manufacturer}
                                category={gift.category}
                                quantity={gift.quantity}
                                unit={gift.unit}
                                status={gift.status}
                                icon={gift.icon}
                                onPress={() => handleItemPress(gift.id, 'gift')}
                            />
                        ))
                    ) : (
                        <EmptyState
                            title="No gifts found"
                            message={searchQuery ? "No gifts match your search criteria" : "No gifts available in inventory"}
                            icon="🎁"
                        />
                    )
                )}
            </StyledScrollView>


            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </StyledSafeAreaView>
    );
}

// Title Bar Component
interface TitleBarComponentProps {
    onBackPress: () => void;
    onCreatePress: () => void;
    onHistoryPress: () => void;
    onSearchPress: () => void;
    isSearchOpen: boolean;
    summaryData?: {
        totalDrugs: number;
        totalGifts: number;
        lowStockDrugs: number;
        outOfStockDrugs: number;
        lowStockGifts: number;
        outOfStockGifts: number;
    };
}

function TitleBarComponent({ onBackPress, onCreatePress, onHistoryPress, onSearchPress, isSearchOpen, summaryData }: TitleBarComponentProps) {
    const hasLowStock = summaryData &&
        (summaryData.lowStockDrugs > 0 ||
            summaryData.lowStockGifts > 0 ||
            summaryData.outOfStockDrugs > 0 ||
            summaryData.outOfStockGifts > 0);

    return (
        <StyledView className="bg-white px-5 py-4 border-b border-gray-200">
            <StyledView className="flex-row items-center justify-between">
                <StyledView className="flex-row items-center gap-3">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-50 items-center justify-center"
                        onPress={onBackPress}
                    >
                        <Ionicons name="arrow-back" size={20} color="#6B7280" />
                    </StyledTouchableOpacity>

                    <StyledView>
                        <StyledText className="text-xl font-semibold text-gray-900">
                            My Inventory
                        </StyledText>
                        {summaryData && (
                            <StyledText className="text-xs text-gray-500">
                                {summaryData.totalDrugs} drugs • {summaryData.totalGifts} gifts
                            </StyledText>
                        )}
                    </StyledView>
                </StyledView>

                <StyledView className="flex-row gap-2">
                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-[#28A745] items-center justify-center"
                        onPress={onCreatePress}
                    >
                        <Ionicons name="add" size={18} color="#FFFFFF" />
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className="w-9 h-9 rounded-lg bg-gray-50 items-center justify-center"
                        onPress={onHistoryPress}
                    >
                        <Ionicons name="list-outline" size={18} color="#6B7280" />
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className={`w-9 h-9 rounded-lg items-center justify-center ${isSearchOpen ? 'bg-[#0077B6]' : 'bg-gray-50'}`}
                        onPress={onSearchPress}
                    >
                        <Ionicons name="search" size={18} color={isSearchOpen ? "#FFFFFF" : "#6B7280"} />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Stock Alert Banner */}
            {hasLowStock && (
                <StyledView className="mt-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <StyledView className="flex-row items-center">
                        <Ionicons name="warning" size={16} color="#F59E0B" />
                        <StyledText className="text-sm text-orange-800 ml-2 flex-1">
                            {summaryData!.outOfStockDrugs + summaryData!.outOfStockGifts > 0
                                ? `${summaryData!.outOfStockDrugs + summaryData!.outOfStockGifts} items out of stock`
                                : `${summaryData!.lowStockDrugs + summaryData!.lowStockGifts} items low on stock`
                            }
                        </StyledText>
                    </StyledView>
                </StyledView>
            )}
        </StyledView>
    );
}

// Inventory Card Component
interface InventoryCardProps {
    id: string;
    inventoryId: string;
    name: string;
    dosage: string;
    description: string;
    manufacturer: string;
    category: string;
    quantity: number;
    unit: string;
    status: 'available' | 'low' | 'out';
    icon: string;
    onPress: () => void;
}

function InventoryCard({
    id,
    inventoryId,
    name,
    dosage,
    description,
    manufacturer,
    category,
    quantity,
    unit,
    status,
    icon,
    onPress
}: InventoryCardProps) {
    const getStatusStyle = () => {
        switch (status) {
            case 'available':
                return { backgroundColor: '#E8F5E9', color: '#2E7D32', text: 'IN STOCK' };
            case 'low':
                return { backgroundColor: '#FFF3E0', color: '#F57C00', text: 'LOW STOCK' };
            case 'out':
                return { backgroundColor: '#FFEBEE', color: '#C62828', text: 'OUT OF STOCK' };
        }
    };

    const getQuantityStyle = () => {
        switch (status) {
            case 'available':
                return '#2E7D32';
            case 'low':
                return '#F57C00';
            case 'out':
                return '#C62828';
        }
    };

    const statusStyle = getStatusStyle();
    const quantityColor = getQuantityStyle();

    return (
        <StyledTouchableOpacity
            className={`bg-white rounded-xl p-4 mb-3 border border-gray-100 ${status === 'out' ? 'opacity-50' : ''}`}
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
                backgroundColor: status === 'out' ? '#F5F5F5' : '#FFFFFF'
            }}
        >
            <StyledView className='flex-row items-center'>
                {/* Item Icon */}
                <StyledView className='rounded-xl bg-[#E6F3FA] items-center justify-center mr-4 flex-shrink-0 border-2'
                    style={{
                        width: 66,
                        height: 66,
                        borderColor: '#E6F3FA'
                    }}>
                    <StyledText style={{ fontSize: 30 }}>{icon}</StyledText>
                </StyledView>

                {/* Item Info Container */}
                <StyledView className='flex-1'>
                    {/* Header Row */}
                    <StyledView className='flex-row items-start justify-between mb-1.5'>
                        <StyledView className='flex-1 flex-shrink mr-2'>
                            <StyledView className='flex-row flex-wrap items-center'>
                                <StyledText
                                    className={`text-base font-semibold mr-3 ${status === 'out' ? 'text-gray-400' : 'text-gray-900'}`}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={{ flexShrink: 1 }}
                                >
                                    {name}
                                </StyledText>

                                {dosage && (
                                    <StyledText
                                        className='text-sm text-[#0077B6] font-medium'
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={{ flexShrink: 0 }}
                                    >
                                        {dosage}
                                    </StyledText>
                                )}
                            </StyledView>
                        </StyledView>

                        {/* Status Badge */}
                        <StyledView
                            className='px-2 py-1 rounded-xl flex-shrink-0'
                            style={{ backgroundColor: statusStyle.backgroundColor }}
                        >
                            <StyledText
                                className='text-xs font-semibold uppercase tracking-wide'
                                style={{ color: statusStyle.color }}
                            >
                                {statusStyle.text}
                            </StyledText>
                        </StyledView>
                    </StyledView>

                    {/* Description */}
                    <StyledText
                        className={`text-sm mb-1 leading-5 ${status === 'out' ? 'text-gray-400' : 'text-gray-500'}`}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {description}
                    </StyledText>

                    {/* Manufacturer */}
                    <StyledText
                        className={`text-xs font-medium mb-2 ${status === 'out' ? 'text-gray-400' : 'text-gray-400'}`}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {manufacturer}
                    </StyledText>

                    {/* Bottom Meta Row */}
                    <StyledView className='flex-row items-center justify-between pt-2'
                        style={{ borderTopColor: '#F5F5F5', borderTopWidth: 2 }}>
                        {/* Category Badge */}
                        <StyledView className='px-2 py-1 rounded-md'
                            style={{ backgroundColor: '#F8F9FA' }}>
                            <StyledText
                                className='text-xs font-medium'
                                style={{ color: "#6C757D" }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {category}
                            </StyledText>
                        </StyledView>

                        {/* Quantity */}
                        <StyledText
                            className='text-sm font-semibold'
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ color: quantityColor }}
                        >
                            {quantity} {unit}
                        </StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledTouchableOpacity>
    );
}

// Empty State Component
interface EmptyStateProps {
    title: string;
    message: string;
    icon: string;
}

function EmptyState({ title, message, icon }: EmptyStateProps) {
    return (
        <StyledView className="items-center justify-center py-16 px-5">
            <StyledText className="text-6xl mb-4 opacity-50">
                {icon}
            </StyledText>
            <StyledText className="text-lg font-semibold text-gray-900 mb-2 text-center">
                {title}
            </StyledText>
            <StyledText className="text-sm text-gray-500 text-center leading-5">
                {message}
            </StyledText>
        </StyledView>
    );
}