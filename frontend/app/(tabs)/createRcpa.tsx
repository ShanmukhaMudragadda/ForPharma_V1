import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Input from '../../components/input';
import AuditItemsSection from '../../components/AuditItemsSection';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

// Interfaces
interface Customer {
    id: string;
    label: string;
    value: string;
    subtitle: string;
}

interface Drug {
    id: string;
    name: string;
    packSize: string;
}

interface AuditItem {
    id: string;
    companyDrug: Drug | null;
    companyQuantity: number;
    competitorDrug: string;
    competitorQuantity: number;
    competitorPackSize: string;
}

export default function CreateRCPA() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // State management
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | ''>('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [briefRemarks, setBriefRemarks] = useState('');
    const [auditItems, setAuditItems] = useState<AuditItem[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editRcpaId, setEditRcpaId] = useState<string | null>(null);
    const [isCustomerListOpen, setIsCustomerListOpen] = useState(false);

    // Backend data states
    const [customerOptions, setCustomerOptions] = useState<Customer[]>([]);
    const [availableDrugs, setAvailableDrugs] = useState<Drug[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Mock data - replace with actual service calls
    const loadData = async () => {
        try {
            setError(null);
            setLoading(true);

            // Mock customer data
            const customers: Customer[] = [
                {
                    id: '1',
                    label: 'Apollo Pharmacy, Sarita Vihar',
                    value: '1',
                    subtitle: 'Pharmacy - South Delhi'
                },
                {
                    id: '2',
                    label: 'MedPlus Pharmacy, Lajpat Nagar',
                    value: '2',
                    subtitle: 'Pharmacy - South Delhi'
                },
                {
                    id: '3',
                    label: 'Guardian Pharmacy, Defence Colony',
                    value: '3',
                    subtitle: 'Pharmacy - South Delhi'
                },
                {
                    id: '4',
                    label: 'City Medical Store, CP',
                    value: '4',
                    subtitle: 'Medical Store - Central Delhi'
                },
                {
                    id: '5',
                    label: 'Wellness Pharmacy, GK-1',
                    value: '5',
                    subtitle: 'Pharmacy - South Delhi'
                }
            ];

            // Mock drug data
            const drugs: Drug[] = [
                { id: '1', name: 'Amlodipine 5mg', packSize: '10x10 tablets' },
                { id: '2', name: 'Metformin 500mg', packSize: '10x15 tablets' },
                { id: '3', name: 'Atorvastatin 20mg', packSize: '10x10 tablets' },
                { id: '4', name: 'Paracetamol 500mg', packSize: '20x10 tablets' },
                { id: '5', name: 'Omeprazole 20mg', packSize: '10x14 capsules' },
                { id: '6', name: 'Aspirin 75mg', packSize: '10x10 tablets' }
            ];

            setCustomerOptions(customers);
            setAvailableDrugs(drugs);

        } catch (error: any) {
            console.error('Error loading RCPA data:', error);
            setError(error.message || 'Failed to load RCPA data');
            Alert.alert('Error', 'Failed to load RCPA data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        loadData();
    }, []);

    // Validation
    const isViewSummaryEnabled = useMemo(() => {
        const hasCustomer = selectedCustomer !== null;
        const hasPeriod = selectedPeriod !== '';
        const hasDates = startDate !== '' && endDate !== '';
        const hasValidItems = auditItems.length > 0 && auditItems.some(item =>
            item.companyDrug !== null && item.companyQuantity > 0
        );
        return hasCustomer && hasPeriod && hasDates && hasValidItems;
    }, [selectedCustomer, selectedPeriod, startDate, endDate, auditItems]);

    const handlePeriodChange = (period: 'weekly' | 'monthly') => {
        setSelectedPeriod(period);

        // Auto-set date ranges based on period
        const today = new Date();
        if (period === 'weekly') {
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            const formatDate = (date: Date) => {
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day} - ${month} - ${year}`;
            };

            setStartDate(formatDate(startOfWeek));
            setEndDate(formatDate(endOfWeek));
        } else {
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            const formatDate = (date: Date) => {
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day} - ${month} - ${year}`;
            };

            setStartDate(formatDate(startOfMonth));
            setEndDate(formatDate(endOfMonth));
        }
    };

    const handleAuditItemsUpdate = (items: AuditItem[]) => {
        setAuditItems(items);
    };

    const handleCancel = () => {
        Alert.alert(
            'Cancel RCPA',
            'Are you sure you want to cancel? All unsaved changes will be lost.',
            [
                { text: 'Continue', style: 'cancel' },
                {
                    text: 'Cancel RCPA',
                    style: 'destructive',
                    onPress: () => router.back()
                }
            ]
        );
    };

    const handleViewSummary = () => {
        if (!isViewSummaryEnabled) return;

        const summaryData = {
            customer: selectedCustomer,
            period: selectedPeriod,
            startDate,
            endDate,
            briefRemarks: briefRemarks.trim(),
            auditItems: auditItems.filter(item => item.companyDrug !== null && item.companyQuantity > 0),
            createdDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        router.push({
            pathname: '/rcpaSummary',
            params: {
                summaryData: JSON.stringify(summaryData)
            }
        });
    };

    // Transform customer options for dropdown
    const customerDropdownItems = customerOptions.map(customer => ({
        id: customer.id,
        label: customer.label,
        value: customer.value,
        subtitle: customer.subtitle
    }));

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StyledView className="bg-white px-5 py-4 flex-row items-center border-b border-gray-200">
                    <StyledTouchableOpacity className="mr-4" onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-xl font-semibold text-gray-900">
                        Create RCPA
                    </StyledText>
                </StyledView>
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className="text-gray-600 mt-4">Loading RCPA data...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error) {
        return (
            <StyledSafeAreaView className="flex-1 bg-gray-50">
                <StyledView className="bg-white px-5 py-4 flex-row items-center border-b border-gray-200">
                    <StyledTouchableOpacity className="mr-4" onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-xl font-semibold text-gray-900">
                        Create RCPA
                    </StyledText>
                </StyledView>
                <StyledView className="flex-1 justify-center items-center px-5">
                    <StyledText className="text-5xl mb-4">⚠️</StyledText>
                    <StyledText className="text-lg font-semibold text-gray-900 mb-2">
                        Error loading RCPA data
                    </StyledText>
                    <StyledText className="text-sm text-gray-600 text-center mb-4">
                        {error}
                    </StyledText>
                    <StyledTouchableOpacity
                        className="bg-[#0077B6] px-6 py-3 rounded-lg"
                        onPress={loadData}
                    >
                        <StyledText className="text-white font-semibold">Try Again</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <StyledView className="bg-white px-5 py-4 flex-row items-center border-b border-gray-200">
                <StyledTouchableOpacity className="mr-4" onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </StyledTouchableOpacity>
                <StyledText className="text-xl font-semibold text-gray-900">
                    {isEditMode ? 'Edit RCPA' : 'Create RCPA'}
                </StyledText>
            </StyledView>

            <StyledScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                keyboardShouldPersistTaps="handled"
            >
                {/* Customer Selection - Custom dropdown like createOrder */}
                <StyledView style={{ marginBottom: 20 }}>
                    <StyledText style={{ marginBottom: 6, fontWeight: '500', fontSize: 16, color: '#111827' }}>
                        Choose Customer <StyledText style={{ color: '#EF4444' }}>*</StyledText>
                    </StyledText>
                    <StyledTouchableOpacity
                        onPress={() => setIsCustomerListOpen(!isCustomerListOpen)}
                        style={{
                            borderWidth: 1,
                            borderColor: isCustomerListOpen || selectedCustomer ? "#0077B6" : "#E5E7EB",
                            borderRadius: 8,
                            padding: 14,
                            backgroundColor: '#fff',
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'space-between',
                            minHeight: 50,
                            borderBottomLeftRadius: isCustomerListOpen ? 0 : 8,
                            borderBottomRightRadius: isCustomerListOpen ? 0 : 8,
                        }}
                    >
                        <StyledText style={{
                            flex: 1,
                            color: selectedCustomer ? '#111827' : '#9CA3AF',
                            fontSize: 16
                        }}>
                            {selectedCustomer ? selectedCustomer.label : "Select a customer..."}
                        </StyledText>
                        <Ionicons
                            name={isCustomerListOpen ? "chevron-up-outline" : "chevron-down-outline"}
                            size={20}
                            color="#6B7280"
                        />
                    </StyledTouchableOpacity>

                    {isCustomerListOpen && (
                        <StyledView style={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#0077B6',
                            borderTopWidth: 0,
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                            maxHeight: 200,
                            elevation: 5,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            zIndex: 10,
                        }}>
                            <ScrollView nestedScrollEnabled={true}>
                                {customerOptions.map((customer, index) => (
                                    <StyledTouchableOpacity
                                        key={customer.id}
                                        onPress={() => {
                                            setSelectedCustomer(customer);
                                            setIsCustomerListOpen(false);
                                        }}
                                        style={{
                                            paddingVertical: 14,
                                            paddingHorizontal: 16,
                                            borderBottomWidth: index < customerOptions.length - 1 ? 1 : 0,
                                            borderBottomColor: '#F3F4F6'
                                        }}
                                    >
                                        <StyledText style={{ fontSize: 16, fontWeight: '500', color: '#111827' }}>
                                            {customer.label}
                                        </StyledText>
                                        {customer.subtitle && (
                                            <StyledText style={{
                                                fontSize: 14,
                                                color: '#6B7280',
                                                marginTop: 2
                                            }}>
                                                {customer.subtitle}
                                            </StyledText>
                                        )}
                                    </StyledTouchableOpacity>
                                ))}
                            </ScrollView>
                        </StyledView>
                    )}
                </StyledView>

                {/* Period Selection */}
                <StyledView className="mb-4">
                    <StyledText className="text-base font-medium text-gray-900 mb-2">
                        Reporting Period <StyledText className="text-red-500">*</StyledText>
                    </StyledText>
                    <StyledView className="flex-row gap-2">
                        <StyledTouchableOpacity
                            className={`flex-1 py-3 px-4 rounded-lg border ${selectedPeriod === 'weekly'
                                    ? 'bg-[#0077B6] border-[#0077B6]'
                                    : 'bg-white border-gray-300'
                                }`}
                            onPress={() => handlePeriodChange('weekly')}
                        >
                            <StyledText className={`text-center font-semibold ${selectedPeriod === 'weekly' ? 'text-white' : 'text-gray-700'
                                }`}>
                                Weekly
                            </StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity
                            className={`flex-1 py-3 px-4 rounded-lg border ${selectedPeriod === 'monthly'
                                    ? 'bg-[#0077B6] border-[#0077B6]'
                                    : 'bg-white border-gray-300'
                                }`}
                            onPress={() => handlePeriodChange('monthly')}
                        >
                            <StyledText className={`text-center font-semibold ${selectedPeriod === 'monthly' ? 'text-white' : 'text-gray-700'
                                }`}>
                                Monthly
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>

                {/* Date Range */}
                {selectedPeriod && (
                    <>
                        <StyledText className="text-base font-medium text-gray-900 mb-2">
                            {selectedPeriod === 'weekly' ? 'Select Week Range' : 'Select Month Range'}
                            <StyledText className="text-red-500 ml-1">*</StyledText>
                        </StyledText>
                        <StyledView className="flex-row gap-3 mb-4">
                            <StyledView className="flex-1">
                                <StyledText className="text-xs font-medium text-gray-600 mb-2">From</StyledText>
                                <Input
                                    value={startDate}
                                    onChangeText={setStartDate}
                                    placeholder="dd - mm - yyyy"
                                    isDateInput
                                    allowPastDates
                                    onDateChange={(date) => {
                                        const formatted = `${date.getDate().toString().padStart(2, '0')} - ${(date.getMonth() + 1).toString().padStart(2, '0')} - ${date.getFullYear()}`;
                                        setStartDate(formatted);
                                    }}
                                    dateValue={startDate ? new Date(startDate.split(' - ').reverse().join('-')) : undefined}
                                />
                            </StyledView>
                            <StyledView className="flex-1">
                                <StyledText className="text-xs font-medium text-gray-600 mb-2">To</StyledText>
                                <Input
                                    value={endDate}
                                    onChangeText={setEndDate}
                                    placeholder="dd - mm - yyyy"
                                    isDateInput
                                    allowPastDates
                                    onDateChange={(date) => {
                                        const formatted = `${date.getDate().toString().padStart(2, '0')} - ${(date.getMonth() + 1).toString().padStart(2, '0')} - ${date.getFullYear()}`;
                                        setEndDate(formatted);
                                    }}
                                    dateValue={endDate ? new Date(endDate.split(' - ').reverse().join('-')) : undefined}
                                />
                            </StyledView>
                        </StyledView>
                    </>
                )}

                {/* Brief Remarks */}
                <Input
                    label="Brief Remarks"
                    placeholder="Add any remarks regarding the visit..."
                    value={briefRemarks}
                    onChangeText={setBriefRemarks}
                    multiline
                    numberOfLines={4}
                />

                {/* Audit Items Section */}
                <AuditItemsSection
                    items={auditItems}
                    availableDrugs={availableDrugs}
                    onUpdateItems={handleAuditItemsUpdate}
                />
            </StyledScrollView>

            {/* Bottom Actions */}
            <StyledView className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-gray-200 flex-row gap-3"
                style={{
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                }}
            >
                <StyledTouchableOpacity
                    onPress={handleCancel}
                    className="flex-1 py-3 px-6 rounded-lg border border-gray-300 bg-gray-50 items-center justify-center"
                    activeOpacity={0.7}
                >
                    <StyledText className="text-gray-600 font-semibold text-base">
                        Cancel
                    </StyledText>
                </StyledTouchableOpacity>

                <StyledTouchableOpacity
                    onPress={handleViewSummary}
                    disabled={!isViewSummaryEnabled}
                    className={`flex-1 py-3 px-6 rounded-lg items-center justify-center ${isViewSummaryEnabled ? 'bg-[#0077B6]' : 'bg-gray-300'
                        }`}
                    activeOpacity={isViewSummaryEnabled ? 0.8 : 1}
                >
                    <StyledText className={`font-semibold text-base ${isViewSummaryEnabled ? 'text-white' : 'text-gray-500'
                        }`}>
                        View Summary
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledSafeAreaView>
    );
}