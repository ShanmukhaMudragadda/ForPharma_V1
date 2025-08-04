import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import { styled } from 'nativewind'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import Drawer from '../../components/drawer'
import Header from '../../components/header'
import OrderCard from '../../components/orderCard'
import OrderService, { Order } from '../../services/orderService'

const StyledSafeAreaView = styled(SafeAreaView)
const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledScrollView = styled(ScrollView)
const StyledTextInput = styled(TextInput)

interface ActiveFilters {
    dateRange: string;
    minAmount: string;
    maxAmount: string;
    customStartDate: Date | null;
    customEndDate: Date | null;
}

// A map to convert month names and abbreviations to a month index (0-11)
const monthMap: { [key: string]: number } = {
    'Jan': 0, 'January': 0,
    'Feb': 1, 'February': 1,
    'Mar': 2, 'March': 2,
    'Apr': 3, 'April': 3,
    'May': 4,
    'Jun': 5, 'June': 5,
    'Jul': 6, 'July': 6,
    'Aug': 7, 'August': 7,
    'Sep': 8, 'September': 8,
    'Oct': 9, 'October': 9,
    'Nov': 10, 'November': 10,
    'Dec': 11, 'December': 11,
};

export default function Orders() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    // Backend data states
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Date Picker States
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    // Filter states
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        dateRange: '',
        minAmount: '',
        maxAmount: '',
        customStartDate: null,
        customEndDate: null
    });

    const [tempFilters, setTempFilters] = useState<ActiveFilters>({
        dateRange: '',
        minAmount: '',
        maxAmount: '',
        customStartDate: null,
        customEndDate: null
    });

    // Load orders from backend
    const loadOrders = async () => {
        try {
            setError(null);
            const ordersData = await OrderService.getOrderList();

            // Convert backend status to display status
            const processedOrders = ordersData.map(order => ({
                ...order,
                status: order.status === 'PENDING' ? 'Draft' : order.status === 'CONFIRMED' ? 'Confirmed' : 'Draft'
            }));

            setOrders(processedOrders);
        } catch (error: any) {
            console.error('Error loading orders:', error);
            setError(error.message || 'Failed to load orders');
            Alert.alert('Error', 'Failed to load orders. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Refresh orders
    const onRefresh = async () => {
        setRefreshing(true);
        await loadOrders();
        setRefreshing(false);
    };

    // Load orders on component mount
    useEffect(() => {
        loadOrders();
    }, []);

    // Date range check function
    const checkDateRange = (orderDate: string, range: string) => {
        // Use a more reliable method to parse the date string
        const parts = orderDate.replace(/,/g, '').split(' ');
        let orderDateObj;

        // Handle formats like "Dec 09 2024" and "December 19 2024"
        if (parts.length === 3) {
            const month = parts[0];
            const day = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            const monthIndex = monthMap[month];

            if (monthIndex === undefined) {
                console.error('Invalid month name:', month);
                return false; // Invalid month name
            }

            orderDateObj = new Date(year, monthIndex, day);
        } else {
            // Fallback for any other formats, though this is less reliable
            orderDateObj = new Date(orderDate);
        }

        // Check if date parsing was successful
        if (isNaN(orderDateObj.getTime())) {
            console.error('Invalid date object created from:', orderDate);
            return false;
        }

        // Reset time to start of day for accurate comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const orderDay = new Date(orderDateObj);
        orderDay.setHours(0, 0, 0, 0);

        switch (range) {
            case 'lastWeek':
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                return orderDay >= weekAgo;
            case 'lastMonth':
                const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                return orderDay >= monthAgo;
            case 'last3Months':
                const threeMonthsAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
                return orderDay >= threeMonthsAgo;
            case 'last6Months':
                const sixMonthsAgo = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000);
                return orderDay >= sixMonthsAgo;
            case 'lastYear':
                const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
                return orderDay >= yearAgo;
            case 'custom':
                if (!activeFilters.customStartDate || !activeFilters.customEndDate) return false;
                const startDate = new Date(activeFilters.customStartDate);
                const endDate = new Date(activeFilters.customEndDate);
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);
                return orderDay >= startDate && orderDay <= endDate;
            default:
                return true;
        }
    };

    // Date Picker Handlers
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

    // Apply search AND filter logic
    const filteredOrders = orders.filter(order => {
        // Search filter
        const matchesSearch = searchQuery === '' ||
            order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Date range filter
        const matchesDateRange = activeFilters.dateRange === '' ||
            checkDateRange(order.date, activeFilters.dateRange);

        // Amount filter
        const orderAmount = parseFloat(order.amount.replace('₹', '').replace(',', ''));
        const matchesMinAmount = activeFilters.minAmount === '' ||
            orderAmount >= parseFloat(activeFilters.minAmount);
        const matchesMaxAmount = activeFilters.maxAmount === '' ||
            orderAmount <= parseFloat(activeFilters.maxAmount);

        return matchesDateRange && matchesMinAmount && matchesMaxAmount;
    });

    // Filter handlers
    const openFilterModal = () => {
        setTempFilters({ ...activeFilters });
        setFilterOpen(true);
    };

    const toggleDateRange = (range: string) => {
        setTempFilters(prev => ({
            ...prev,
            dateRange: prev.dateRange === range ? '' : range
        }));
    };

    const updateAmountFilter = (type: 'min' | 'max', value: string) => {
        setTempFilters(prev => ({
            ...prev,
            [type === 'min' ? 'minAmount' : 'maxAmount']: value
        }));
    };

    const applyFilters = () => {
        setActiveFilters({ ...tempFilters });
        setFilterOpen(false);
    };

    const clearFilters = () => {
        setTempFilters({
            dateRange: '',
            minAmount: '',
            maxAmount: '',
            customStartDate: null,
            customEndDate: null
        });
    };

    const totalActiveFilters =
        (activeFilters.dateRange ? 1 : 0) +
        (activeFilters.minAmount ? 1 : 0) +
        (activeFilters.maxAmount ? 1 : 0);

    // Date range options
    const dateRangeOptions = [
        { value: 'lastWeek', label: 'Last Week' },
        { value: 'lastMonth', label: 'Last Month' },
        { value: 'last3Months', label: 'Last 3 Months' },
        { value: 'last6Months', label: 'Last 6 Months' },
        { value: 'lastYear', label: 'Last Year' },
        { value: 'custom', label: 'Custom Range' }
    ];

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className="flex-1 bg-white">
                <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

                {/* Title Bar */}
                <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                    <StyledView className='flex-row items-center gap-3'>
                        <StyledTouchableOpacity
                            className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                            onPress={() => router.push('/')}
                        >
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>

                        <StyledText className='text-xl font-semibold text-gray-900'>
                            My Orders
                        </StyledText>
                    </StyledView>
                </StyledView>

                {/* Loading Indicator */}
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-4">Loading orders...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    return (
        <StyledSafeAreaView className="flex-1 bg-white">
            <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

            {/* Title Bar */}
            <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                <StyledView className='flex-row items-center gap-3'>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                        onPress={() => router.push('/')}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>

                    <StyledText className='text-xl font-semibold text-gray-900'>
                        My Orders
                    </StyledText>
                </StyledView>

                <StyledView className='flex-row gap-2'>
                    {/* Add Order Button */}
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-[#28A745] items-center justify-center'
                        onPress={() => router.push('/createOrder')}
                    >
                        <Ionicons name="add" size={18} color="white" />
                    </StyledTouchableOpacity>

                    {/* Filter Button */}
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center relative'
                        onPress={openFilterModal}
                    >
                        <Ionicons
                            name="options-outline"
                            size={18}
                            color={totalActiveFilters > 0 ? "#0077B6" : "#6C757D"}
                        />
                        {totalActiveFilters > 0 && (
                            <StyledView className='absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center'>
                                <StyledText className='text-white text-xs font-semibold'>
                                    {totalActiveFilters}
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledTouchableOpacity>

                    {/* Search Button */}
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                        onPress={() => setSearchOpen(!searchOpen)}
                    >
                        <Ionicons
                            name="search-outline"
                            size={18}
                            color={searchOpen ? "#0077B6" : "#6C757D"}
                        />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Search Bar */}
            {searchOpen && (
                <StyledView className='bg-white px-5 py-4 border-b border-gray-200'>
                    <StyledTextInput
                        className='w-full p-3 border border-gray-200 rounded-lg text-base'
                        placeholder="Search by Order ID or Customer name..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus={true}
                    />
                </StyledView>
            )}

            {/* Orders List */}
            <StyledScrollView
                className='flex-1'
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
                <StyledView className="px-5 py-6">
                    {error ? (
                        <StyledView className='items-center py-12'>
                            <StyledText className='text-5xl mb-4'>⚠️</StyledText>
                            <StyledText className='text-lg font-semibold text-gray-900 mb-2'>
                                Error loading orders
                            </StyledText>
                            <StyledText className='text-sm text-gray-600 text-center mb-4'>
                                {error}
                            </StyledText>
                            <StyledTouchableOpacity
                                className='bg-[#0077B6] px-6 py-3 rounded-lg'
                                onPress={loadOrders}
                            >
                                <StyledText className='text-white font-semibold'>
                                    Try Again
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    ) : filteredOrders.length > 0 ? (
                        filteredOrders.map((order, index) => (
                            <OrderCard
                                key={order.orderId || index}
                                orderId={order.orderId}
                                customerName={order.customerName}
                                date={order.date}
                                amount={order.amount}
                                status={order.status}
                                onPress={() => router.push({
                                    pathname: '/orderDetails',
                                    params: {
                                        orderId: order.orderId,
                                        customerName: order.customerName,
                                        date: order.date,
                                        amount: order.amount
                                    }
                                })}
                            />
                        ))
                    ) : (
                        <StyledView className='items-center py-12'>
                            <StyledText className='text-5xl mb-4'>📦</StyledText>
                            <StyledText className='text-lg font-semibold text-gray-900 mb-2'>
                                No orders found
                            </StyledText>
                            <StyledText className='text-sm text-gray-600 text-center'>
                                {searchQuery || totalActiveFilters > 0
                                    ? 'Try adjusting your search terms or filters'
                                    : 'You haven\'t created any orders yet'
                                }
                            </StyledText>
                        </StyledView>
                    )}
                </StyledView>
            </StyledScrollView>

            <Drawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Filter Modal */}
            <Modal
                visible={filterOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setFilterOpen(false)}
            >
                <StyledView className='flex-1 bg-black/50'>
                    <StyledView className='flex-1 bg-white mt-20 rounded-t-3xl'>
                        {/* Filter Header */}
                        <StyledView className='px-5 py-5 border-b border-gray-200 flex-row justify-between items-center'>
                            <StyledText className='text-lg font-semibold text-gray-900'>
                                Filters
                            </StyledText>
                            <StyledTouchableOpacity
                                className='w-8 h-8 rounded-md bg-gray-100 items-center justify-center'
                                onPress={() => setFilterOpen(false)}
                            >
                                <Ionicons name="close" size={20} color="#212529" />
                            </StyledTouchableOpacity>
                        </StyledView>

                        <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                            {/* Date Range Section */}
                            <StyledView className='px-5 py-6'>
                                <StyledText className='text-base font-semibold text-gray-900 mb-4'>
                                    Date Range
                                </StyledText>
                                {dateRangeOptions.map(option => (
                                    <StyledTouchableOpacity
                                        key={option.value}
                                        className='flex-row items-center py-2'
                                        onPress={() => toggleDateRange(option.value)}
                                    >
                                        <StyledView className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${tempFilters.dateRange === option.value
                                            ? 'border-[#0077B6]'
                                            : 'border-gray-300'
                                            }`}>
                                            {tempFilters.dateRange === option.value && (
                                                <StyledView className='w-2 h-2 rounded-full bg-[#0077B6]' />
                                            )}
                                        </StyledView>
                                        <StyledText className='text-sm text-gray-900'>{option.label}</StyledText>
                                    </StyledTouchableOpacity>
                                ))}
                            </StyledView>

                            {/* Custom Date Range Pickers */}
                            {tempFilters.dateRange === 'custom' && (
                                <StyledView className='px-5 mb-6'>
                                    <StyledView className='flex-row gap-3'>
                                        {/* Start Date Picker */}
                                        <StyledView className='flex-1'>
                                            <StyledText className='text-sm font-medium text-gray-700 mb-2'>
                                                Start Date
                                            </StyledText>
                                            <StyledTouchableOpacity
                                                className='w-full p-3 border border-gray-200 rounded-lg flex-row items-center justify-between'
                                                onPress={() => setShowStartDatePicker(true)}
                                            >
                                                <StyledText className='text-base text-gray-900'>
                                                    {tempFilters.customStartDate
                                                        ? tempFilters.customStartDate.toLocaleDateString()
                                                        : 'Select Start Date'
                                                    }
                                                </StyledText>
                                                <Ionicons name="calendar-outline" size={18} color="#6C757D" />
                                            </StyledTouchableOpacity>
                                        </StyledView>

                                        {/* End Date Picker */}
                                        <StyledView className='flex-1'>
                                            <StyledText className='text-sm font-medium text-gray-700 mb-2'>
                                                End Date
                                            </StyledText>
                                            <StyledTouchableOpacity
                                                className='w-full p-3 border border-gray-200 rounded-lg flex-row items-center justify-between'
                                                onPress={() => setShowEndDatePicker(true)}
                                            >
                                                <StyledText className='text-base text-gray-900'>
                                                    {tempFilters.customEndDate
                                                        ? tempFilters.customEndDate.toLocaleDateString()
                                                        : 'Select End Date'
                                                    }
                                                </StyledText>
                                                <Ionicons name="calendar-outline" size={18} color="#6C757D" />
                                            </StyledTouchableOpacity>
                                        </StyledView>
                                    </StyledView>
                                </StyledView>
                            )}

                            {/* Amount Range Section */}
                            <StyledView className='px-5 pb-6'>
                                <StyledText className='text-base font-semibold text-gray-900 mb-4'>
                                    Amount Range
                                </StyledText>
                                <StyledView className='flex-row gap-3'>
                                    <StyledView className='flex-1'>
                                        <StyledTextInput
                                            className='w-full p-3 border border-gray-200 rounded-lg text-base'
                                            placeholder="Min Amount"
                                            value={tempFilters.minAmount}
                                            onChangeText={(value) => updateAmountFilter('min', value)}
                                            keyboardType="numeric"
                                        />
                                    </StyledView>
                                    <StyledView className='flex-1'>
                                        <StyledTextInput
                                            className='w-full p-3 border border-gray-200 rounded-lg text-base'
                                            placeholder="Max Amount"
                                            value={tempFilters.maxAmount}
                                            onChangeText={(value) => updateAmountFilter('max', value)}
                                            keyboardType="numeric"
                                        />
                                    </StyledView>
                                </StyledView>
                            </StyledView>
                        </StyledScrollView>

                        {/* Filter Actions */}
                        <StyledView className='px-5 py-4 border-t border-gray-200 flex-row gap-3'>
                            <StyledTouchableOpacity
                                className='flex-1 py-3 border border-gray-300 rounded-lg items-center'
                                onPress={clearFilters}
                            >
                                <StyledText className='text-sm font-semibold text-gray-600'>
                                    Clear All
                                </StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                className='flex-1 py-3 bg-[#0077B6] rounded-lg items-center'
                                onPress={applyFilters}
                            >
                                <StyledText className='text-sm font-semibold text-white'>
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
    )
}