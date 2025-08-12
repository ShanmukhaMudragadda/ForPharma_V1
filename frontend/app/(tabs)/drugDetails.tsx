// app/drug-details/[id].tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    Linking,
    Image
} from 'react-native';
import { styled } from 'nativewind';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import drugService from '../../services/drugService';
import { DrugResponse } from '../../types/drug';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const SECTION_NAVIGATION = [
    { id: 'product', label: 'Product', icon: 'medical-outline' },
    { id: 'uses', label: 'Uses', icon: 'heart-outline' },
    { id: 'side-effects', label: 'Side Effects', icon: 'warning-outline' },
    { id: 'safety', label: 'Safety', icon: 'shield-outline' },
    { id: 'promotional', label: 'Promotional', icon: 'document-outline' }
];

export default function DrugDetails() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const drugId = params.drugId as string;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [drugData, setDrugData] = useState<DrugResponse | null>(null);
    const [promotionalMaterials, setPromotionalMaterials] = useState<any[]>([]);
    const [activeSection, setActiveSection] = useState('product');

    // Helper function to extract image URI
    const getImageUri = (images: any) => {
        if (!images || !Array.isArray(images) || images.length === 0) {
            return undefined;
        }

        const firstImage = images[0];

        // If it's already a string, return it
        if (typeof firstImage === 'string') {
            return firstImage;
        }

        // If it's an object with uri property, extract the uri
        if (typeof firstImage === 'object' && firstImage !== null) {
            // Handle different possible object structures
            if ('uri' in firstImage && typeof firstImage.uri === 'string') {
                return firstImage.uri;
            }
            if ('url' in firstImage && typeof firstImage.url === 'string') {
                return firstImage.url;
            }
            if ('src' in firstImage && typeof firstImage.src === 'string') {
                return firstImage.src;
            }
        }

        return undefined;
    };

    // Fetch drug data
    const fetchDrugData = async () => {
        try {
            setError(null);
            const drugDetails = await drugService.getDrugDetails(drugId);
            setDrugData(drugDetails);

            // Extract promotional materials from drug data
            if (drugDetails.marketingMaterials) {
                setPromotionalMaterials(drugDetails.marketingMaterials);
            }
        } catch (err: any) {
            console.error('Error fetching drug data:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch drug details');
            Alert.alert('Error', 'Failed to load drug details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (drugId) {
            fetchDrugData();
        }
    }, [drugId]);

    const handleOpenPromotionalMaterial = (material: any) => {
        if (material.url) {
            Linking.openURL(material.url).catch(() => {
                Alert.alert('Error', 'Unable to open promotional material');
            });
        } else {
            Alert.alert('Info', 'Promotional material not available');
        }
    };

    // Loading state
    if (loading) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>
                <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                    <StyledView className='flex-row items-center gap-3'>
                        <StyledTouchableOpacity
                            className='w-9 h-9 rounded-lg bg-gray-100 items-center justify-center'
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className='text-xl font-semibold text-gray-900'>
                            Drug Details
                        </StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className='flex-1 items-center justify-center'>
                    <ActivityIndicator size="large" color="#0077B6" />
                    <StyledText className='text-gray-600 mt-2'>Loading drug details...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error || !drugData) {
        return (
            <StyledSafeAreaView className='flex-1 bg-gray-50'>
                <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                    <StyledView className='flex-row items-center gap-3'>
                        <StyledTouchableOpacity
                            className='w-9 h-9 rounded-lg bg-gray-100 items-center justify-center'
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={18} color="#6C757D" />
                        </StyledTouchableOpacity>
                        <StyledText className='text-xl font-semibold text-gray-900'>
                            Drug Details
                        </StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className='flex-1 items-center justify-center px-5'>
                    <Ionicons name="alert-circle-outline" size={60} color="#DC3545" />
                    <StyledText className='text-gray-900 text-lg font-medium mt-3'>Error Loading Details</StyledText>
                    <StyledText className='text-gray-600 text-center mt-2'>{error || 'Drug not found'}</StyledText>
                    <StyledTouchableOpacity
                        className='bg-[#0077B6] px-6 py-3 rounded-lg mt-5'
                        onPress={fetchDrugData}
                    >
                        <StyledText className='text-white font-medium'>Retry</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // const dosageForms = Array.isArray(drugData.dosageForms)
    //     ? drugData.dosageForms.join(', ')
    //     : (drugData.dosageForms || 'N/A');

    // const drugImageUri = getImageUri(drugData.images);

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'product':
                return (
                    <StyledView className='bg-white px-5 py-5 mb-2'>
                        <StyledText className='text-lg font-semibold text-gray-900 mb-4'>
                            Product Information
                        </StyledText>

                        <StyledView className='space-y-4'>
                            <StyledView className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                                <StyledText className='text-sm font-medium text-gray-600'>Price</StyledText>
                                <StyledText className='text-lg font-bold text-green-600'>
                                    {drugData.price ? `₹${Number(drugData.price).toFixed(2)}` : 'Not available'}
                                </StyledText>
                            </StyledView>

                            <StyledView className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                                <StyledText className='text-sm font-medium text-gray-600'>Category</StyledText>
                                <StyledText className='text-sm font-semibold text-gray-900'>
                                    {drugData.category || 'General'}
                                </StyledText>
                            </StyledView>

                            <StyledView className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                                <StyledText className='text-sm font-medium text-gray-600'>Schedule</StyledText>
                                <StyledText className='text-sm font-semibold text-gray-900'>
                                    {drugData.schedule || 'N/A'}
                                </StyledText>
                            </StyledView>

                            <StyledView className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                                <StyledText className='text-sm font-medium text-gray-600'>Dosage Form</StyledText>
                                <StyledText className='text-sm font-semibold text-gray-900 ml-8'
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={{ flexShrink: 1 }}>
                                    {drugData.dosageForms}
                                </StyledText>
                            </StyledView>

                            <StyledView className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                                <StyledText className='text-sm font-medium text-gray-600'>Regulatory</StyledText>
                                <StyledView className='bg-green-100 px-2 py-1 rounded'>
                                    <StyledText className='text-xs font-medium text-green-800'>
                                        {drugData.regulatoryApprovals || 'Approved'}
                                    </StyledText>
                                </StyledView>
                            </StyledView>

                            <StyledView className='flex-row justify-between items-center py-3'>
                                <StyledText className='text-sm font-medium text-gray-600'>Availability</StyledText>
                                <StyledView className={`px-2 py-1 rounded ${drugData.isAvailable ? 'bg-green-100' : 'bg-red-100'}`}>
                                    <StyledText className={`text-xs font-medium ${drugData.isAvailable ? 'text-green-800' : 'text-red-800'}`}>
                                        {drugData.isAvailable ? 'In Stock' : 'Out of Stock'}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>
                    </StyledView>
                );

            case 'uses':
                return (
                    <StyledView className='bg-white px-5 py-5 mb-2'>
                        <StyledText className='text-lg font-semibold text-gray-900 mb-4'>
                            Uses & Indications
                        </StyledText>

                        <StyledView className='bg-blue-50 rounded-lg p-3 mb-4'>
                            <StyledView className='flex-row items-center mb-2'>
                                <Ionicons name="information-circle" size={16} color="#0077B6" />
                                <StyledText className='text-sm font-medium text-blue-800 ml-2'>
                                    Primary Indications
                                </StyledText>
                            </StyledView>
                            <StyledText className='text-sm text-blue-700'>
                                This medication is prescribed for the following conditions.
                            </StyledText>
                        </StyledView>

                        <StyledText className='text-sm text-gray-900 leading-6'>
                            {drugData.indications || 'No indication information available for this drug.'}
                        </StyledText>
                    </StyledView>
                );

            case 'side-effects':
                return (
                    <StyledView className='bg-white px-5 py-5 mb-2'>
                        <StyledText className='text-lg font-semibold text-gray-900 mb-4'>
                            Side Effects
                        </StyledText>

                        <StyledView className='bg-yellow-50 rounded-lg p-3 mb-4'>
                            <StyledView className='flex-row items-center mb-2'>
                                <Ionicons name="warning" size={16} color="#F59E0B" />
                                <StyledText className='text-sm font-medium text-yellow-800 ml-2'>
                                    Important Safety Information
                                </StyledText>
                            </StyledView>
                            <StyledText className='text-sm text-yellow-700'>
                                Contact your healthcare provider if symptoms persist or worsen.
                            </StyledText>
                        </StyledView>

                        <StyledText className='text-sm text-gray-900 leading-6'>
                            {drugData.sideEffects || 'No side effect information available for this drug.'}
                        </StyledText>
                    </StyledView>
                );

            case 'safety':
                return (
                    <StyledView className='bg-white px-5 py-5 mb-2'>
                        <StyledText className='text-lg font-semibold text-gray-900 mb-4'>
                            Safety Advice & Contraindications
                        </StyledText>

                        <StyledView className='bg-red-50 rounded-lg p-3 mb-4'>
                            <StyledView className='flex-row items-center mb-2'>
                                <Ionicons name="shield-checkmark" size={16} color="#EF4444" />
                                <StyledText className='text-sm font-medium text-red-800 ml-2'>
                                    Important Safety Information
                                </StyledText>
                            </StyledView>
                            <StyledText className='text-sm text-red-700'>
                                Please read all safety advice carefully before using this medication.
                            </StyledText>
                        </StyledView>

                        <StyledText className='text-sm text-gray-900 leading-6'>
                            {drugData.safetyAdvice || 'No safety information available for this drug.'}
                        </StyledText>
                    </StyledView>
                );

            case 'promotional':
                return (
                    <StyledView className='bg-white px-5 py-5 mb-2'>
                        <StyledText className='text-lg font-semibold text-gray-900 mb-4'>
                            Promotional Materials
                        </StyledText>

                        {promotionalMaterials && promotionalMaterials.length > 0 ? (
                            <StyledView className='space-y-3'>
                                {promotionalMaterials.map((material, index) => (
                                    <StyledTouchableOpacity
                                        key={index}
                                        className='flex-row items-center bg-gray-50 rounded-lg p-3'
                                        onPress={() => handleOpenPromotionalMaterial(material)}
                                    >
                                        <StyledView className='w-10 h-10 rounded-lg bg-blue-100 items-center justify-center mr-3'>
                                            <Ionicons name="document" size={20} color="#0077B6" />
                                        </StyledView>
                                        <StyledView className='flex-1'>
                                            <StyledText className='text-sm font-semibold text-gray-900'>
                                                {material.title || `Material ${index + 1}`}
                                            </StyledText>
                                            <StyledText className='text-xs text-gray-600'>
                                                {material.description || 'Promotional material'}
                                            </StyledText>
                                        </StyledView>
                                        <Ionicons name="chevron-forward" size={16} color="#6C757D" />
                                    </StyledTouchableOpacity>
                                ))}
                            </StyledView>
                        ) : (
                            <StyledView className='bg-gray-50 rounded-lg p-6 items-center'>
                                <Ionicons name="document-outline" size={40} color="#6C757D" />
                                <StyledText className='text-gray-600 text-center mt-2'>
                                    No promotional materials available
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledView>
                );

            default:
                return null;
        }
    };

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>
            {/* Header */}
            <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                <StyledView className='flex-row items-center gap-3'>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-gray-100 items-center justify-center'
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>
                    <StyledText className='text-xl font-semibold text-gray-900'>
                        Drug Details
                    </StyledText>
                </StyledView>

            </StyledView>

            {/* Section Navigation */}
            <StyledView className='bg-white border-b border-gray-200 px-5'>
                <StyledScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 12 }}
                >
                    <StyledView className='flex-row gap-2'>
                        {SECTION_NAVIGATION.map((section) => (
                            <StyledTouchableOpacity
                                key={section.id}
                                className={`px-4 py-2 rounded-full border ${activeSection === section.id
                                    ? 'bg-[#0077B6] border-[#0077B6]'
                                    : 'bg-white border-gray-200'
                                    }`}
                                onPress={() => setActiveSection(section.id)}
                            >
                                <StyledText className={`text-sm font-medium ${activeSection === section.id
                                    ? 'text-white'
                                    : 'text-gray-600'
                                    }`}>
                                    {section.label}
                                </StyledText>
                            </StyledTouchableOpacity>
                        ))}
                    </StyledView>
                </StyledScrollView>
            </StyledView>

            <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                {/* Drug Header (Always Visible) */}
                <StyledView className='bg-white px-5 py-6 mb-2'>
                    <StyledView className='flex-row items-center'>
                        <StyledView className='w-20 h-20 rounded-2xl bg-blue-50 items-center justify-center mr-4'>
                            <StyledText className='text-4xl'>💊</StyledText>
                        </StyledView>
                        <StyledView className='flex-1'>
                            <StyledText className='text-xl font-bold text-gray-900'>
                                {drugData.name}
                            </StyledText>
                            <StyledText className='text-base text-[#0077B6] font-medium'>
                                {drugData.dosageForms}
                            </StyledText>
                            <StyledText className='text-sm text-gray-600 mb-1'>
                                {drugData.composition || 'Composition not available'}
                            </StyledText>
                            <StyledText className='text-sm text-gray-500 font-medium'>
                                {drugData.manufacturer || 'Unknown Manufacturer'}
                            </StyledText>

                            {/* Badges */}
                            <StyledView className='flex-row flex-wrap gap-2 mt-2'>
                                <StyledView className={`px-2 py-1 rounded ${drugData.isAvailable ? 'bg-green-100' : 'bg-red-100'}`}>
                                    <StyledText className={`text-xs font-semibold uppercase ${drugData.isAvailable ? 'text-green-800' : 'text-red-800'}`}>
                                        {drugData.isAvailable ? 'Available' : 'Out of Stock'}
                                    </StyledText>
                                </StyledView>
                                {drugData.category && (
                                    <StyledView className='bg-orange-100 px-2 py-1 rounded'>
                                        <StyledText className='text-xs font-semibold text-orange-800 uppercase'>
                                            {drugData.category}
                                        </StyledText>
                                    </StyledView>
                                )}
                                {drugData.schedule && (
                                    <StyledView className='bg-purple-100 px-2 py-1 rounded'>
                                        <StyledText className='text-xs font-semibold text-purple-800 uppercase'>
                                            Schedule {drugData.schedule}
                                        </StyledText>
                                    </StyledView>
                                )}
                            </StyledView>
                        </StyledView>
                    </StyledView>
                </StyledView>

                {/* Dynamic Section Content */}
                {renderSectionContent()}

                {/* Bottom spacing */}
                <StyledView className="h-10" />
            </StyledScrollView>
        </StyledSafeAreaView>
    );
}