import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Input from '../../components/input';
import AuditItemsSection from '../../components/AuditItemsSection';
import RcpaService, { Chemist, Drug, CreateRcpaAuditItem } from '../../services/rcpaService';

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

interface AuditItem {
    id: string;
    companyDrug: Drug | null;
    companyQuantity: number;
    companyPackSize: string; // User will enter this manually
    competitorDrug: string;
    competitorQuantity: number;
    competitorPackSize: string; // User will enter this manually
}

export default function CreateRCPA() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // State management
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<'WEEKLY' | 'MONTHLY' | ''>('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrescriptions, setTotalPrescriptions] = useState('');
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

    // Load data from backend
    const loadData = async () => {
        try {
            setError(null);
            setLoading(true);

            // Load chemists and drugs concurrently
            const [chemists, drugs] = await Promise.all([
                RcpaService.getChemistsForRcpa(),
                RcpaService.getDrugsForRcpa()
            ]);

            // Transform chemists to customer options
            const customerOpts = chemists.map(chemist => ({
                id: chemist.chemistId,
                label: chemist.chemistName,
                value: chemist.chemistId,
                subtitle: chemist.address || `${chemist.type} - ${chemist.territoryName}`
            }));

            setCustomerOptions(customerOpts);
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

    // Handle edit mode data population (if needed in future)
    useEffect(() => {
        if (params.editData && customerOptions.length > 0 && availableDrugs.length > 0) {
            try {
                const editData = JSON.parse(params.editData as string);
                console.log('🔄 Loading RCPA edit data:', editData);

                setIsEditMode(true);
                setEditRcpaId(editData.rcpaId);

                // Set customer
                const customer = customerOptions.find(c => c.label === editData.chemistName || c.id === editData.chemistId);
                if (customer) {
                    setSelectedCustomer(customer);
                }

                // Set other fields
                setSelectedPeriod(editData.reportingPeriod);
                setStartDate(editData.startDate);
                setEndDate(editData.endDate);
                setTotalPrescriptions(editData.totalPrescriptions?.toString() || '');
                setBriefRemarks(editData.briefRemarks || '');

                // Set audit items if available
                if (editData.auditItems) {
                    // Transform audit items to match frontend format
                    const transformedItems = editData.auditItems.map((item: any) => ({
                        id: item.id,
                        companyDrug: availableDrugs.find(d => d.id === item.ourProduct.id) || null,
                        companyQuantity: item.ourProduct.quantity,
                        companyPackSize: item.ourProduct.packSize || '', // User entered pack size
                        competitorDrug: item.competitor.name,
                        competitorQuantity: item.competitor.quantity,
                        competitorPackSize: item.competitor.packSize
                    }));
                    setAuditItems(transformedItems);
                }
            } catch (error) {
                console.error("Failed to parse editData from params:", error);
            }
        }
    }, [params.editData, customerOptions, availableDrugs]);

    // Validation
    const isViewSummaryEnabled = useMemo(() => {
        const hasCustomer = selectedCustomer !== null;
        const hasPeriod = selectedPeriod !== '';
        const hasDates = startDate !== '' && endDate !== '';
        const hasTotalPrescriptions = totalPrescriptions !== '' && parseInt(totalPrescriptions) > 0;
        const hasValidItems = auditItems.length > 0 && auditItems.some(item =>
            item.companyDrug !== null && 
            item.companyQuantity > 0 && 
            item.companyPackSize.trim() !== '' &&
            item.competitorDrug.trim() !== '' &&
            item.competitorQuantity > 0 &&
            item.competitorPackSize.trim() !== ''
        );
        return hasCustomer && hasPeriod && hasDates && hasTotalPrescriptions && hasValidItems;
    }, [selectedCustomer, selectedPeriod, startDate, endDate, totalPrescriptions, auditItems]);

    const handlePeriodChange = (period: 'WEEKLY' | 'MONTHLY') => {
        setSelectedPeriod(period);

        // Auto-set date ranges based on period
        const today = new Date();
        if (period === 'WEEKLY') {
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            const formatDate = (date: Date) => {
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
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
                return `${day}/${month}/${year}`;
            };

            setStartDate(formatDate(startOfMonth));
            setEndDate(formatDate(endOfMonth));
        }
    };

    const handleTotalPrescriptionsChange = (value: string) => {
        // Only allow numeric input
        const numericValue = value.replace(/[^0-9]/g, '');
        setTotalPrescriptions(numericValue);
    };

    const handleAuditItemsUpdate = (items: AuditItem[]) => {
        setAuditItems(items);
    };

    // Convert DD/MM/YYYY to YYYY-MM-DD for backend
    const convertDateFormat = (dateStr: string): string => {
        if (!dateStr) return '';
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return dateStr;
    };

    const handleCancel = () => {
        Alert.alert(
            isEditMode ? 'Cancel Editing' : 'Cancel RCPA',
            isEditMode ? 'Are you sure you want to cancel? All changes will be lost.' : 'Are you sure you want to cancel? All unsaved changes will be lost.',
            [
                { text: 'Continue', style: 'cancel' },
                {
                    text: isEditMode ? 'Discard Changes' : 'Cancel RCPA',
                    style: 'destructive',
                    onPress: () => router.back()
                }
            ]
        );
    };

    const handleViewSummary = () => {
        if (!isViewSummaryEnabled) return;

        const summaryData = {
            action: isEditMode ? 'edit' : 'create',
            rcpaId: isEditMode ? editRcpaId : undefined,
            customer: selectedCustomer,
            period: selectedPeriod,
            startDate: convertDateFormat(startDate),
            endDate: convertDateFormat(endDate),
            totalPrescriptions: parseInt(totalPrescriptions),
            briefRemarks: briefRemarks.trim(),
            auditItems: auditItems.filter(item => 
                item.companyDrug !== null && 
                item.companyQuantity > 0 &&
                item.companyPackSize.trim() !== '' &&
                item.competitorDrug.trim() !== '' &&
                item.competitorQuantity > 0 &&
                item.competitorPackSize.trim() !== ''
            ).map(item => ({
                id: item.id,
                drugId: item.companyDrug!.id,
                drugName: item.companyDrug!.name,
                ownQuantity: item.companyQuantity,
                ownPackSize: item.companyPackSize, // User entered pack size
                competitorDrugName: item.competitorDrug,
                competitorQuantity: item.competitorQuantity,
                competitorPackSize: item.competitorPackSize
            })),
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
                {/* Customer Selection - Custom dropdown */}
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
                            className={`flex-1 py-3 px-4 rounded-lg border ${selectedPeriod === 'WEEKLY'
                                    ? 'bg-[#0077B6] border-[#0077B6]'
                                    : 'bg-white border-gray-300'
                                }`}
                            onPress={() => handlePeriodChange('WEEKLY')}
                        >
                            <StyledText className={`text-center font-semibold ${selectedPeriod === 'WEEKLY' ? 'text-white' : 'text-gray-700'
                                }`}>
                                Weekly
                            </StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity
                            className={`flex-1 py-3 px-4 rounded-lg border ${selectedPeriod === 'MONTHLY'
                                    ? 'bg-[#0077B6] border-[#0077B6]'
                                    : 'bg-white border-gray-300'
                                }`}
                            onPress={() => handlePeriodChange('MONTHLY')}
                        >
                            <StyledText className={`text-center font-semibold ${selectedPeriod === 'MONTHLY' ? 'text-white' : 'text-gray-700'
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
                            {selectedPeriod === 'WEEKLY' ? 'Select Week Range' : 'Select Month Range'}
                            <StyledText className="text-red-500 ml-1">*</StyledText>
                        </StyledText>
                        <StyledView className="flex-row gap-3 mb-4">
                            <StyledView className="flex-1">
                                <StyledText className="text-xs font-medium text-gray-600 mb-2">From</StyledText>
                                <Input
                                    value={startDate}
                                    onChangeText={setStartDate}
                                    placeholder="dd/mm/yyyy"
                                    isDateInput
                                    allowPastDates
                                    onDateChange={(date) => {
                                        const formatted = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                                        setStartDate(formatted);
                                    }}
                                    dateValue={startDate ? new Date(startDate.split('/').reverse().join('-')) : undefined}
                                />
                            </StyledView>
                            <StyledView className="flex-1">
                                <StyledText className="text-xs font-medium text-gray-600 mb-2">To</StyledText>
                                <Input
                                    value={endDate}
                                    onChangeText={setEndDate}
                                    placeholder="dd/mm/yyyy"
                                    isDateInput
                                    allowPastDates
                                    onDateChange={(date) => {
                                        const formatted = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                                        setEndDate(formatted);
                                    }}
                                    dateValue={endDate ? new Date(endDate.split('/').reverse().join('-')) : undefined}
                                />
                            </StyledView>
                        </StyledView>
                    </>
                )}

                {/* Total Prescriptions Field */}
                <StyledView className="mb-4">
                    <Input
                        label="Total Prescriptions"
                        placeholder="Enter total number of prescriptions"
                        value={totalPrescriptions}
                        onChangeText={handleTotalPrescriptionsChange}
                        keyboardType="numeric"
                        required
                        maxLength={6}
                    />
                </StyledView>

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
                        {isEditMode ? 'Cancel' : 'Cancel'}
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
                        {isEditMode ? 'Save Changes' : 'View Summary'}
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledSafeAreaView>
    );
}