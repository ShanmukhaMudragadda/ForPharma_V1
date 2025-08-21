// // components/meeting/steps/DrugPromotionStep.tsx
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Linking, Alert } from 'react-native';
// import { styled } from 'nativewind';
// import { Ionicons } from '@expo/vector-icons';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTextInput = styled(TextInput);
// const StyledTouchableOpacity = styled(TouchableOpacity);
// const StyledScrollView = styled(ScrollView);

// interface Drug {
//     id: string;
//     name: string;
//     composition?: string;
//     manufacturer?: string;
//     price?: number;
// }

// interface PromotionalMaterial {
//     id: string;
//     title: string;
//     description: string;
//     type: 'pdf' | 'video' | 'document';
//     url: string;
// }

// interface DrugPromotionStepProps {
//     onDrugSelect: (drug: Drug) => void;
//     selectedDrug: Drug | null;
//     searchDrugs: (query: string) => Promise<Drug[]>;
// }

// export default function DrugPromotionStep({
//     onDrugSelect,
//     selectedDrug,
//     searchDrugs
// }: DrugPromotionStepProps) {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState<Drug[]>([]);
//     const [isSearching, setIsSearching] = useState(false);
//     const [showResults, setShowResults] = useState(false);

//     const handleSearch = async (query: string) => {
//         setSearchQuery(query);

//         if (query.length < 2) {
//             setSearchResults([]);
//             setShowResults(false);
//             return;
//         }

//         try {
//             setIsSearching(true);
//             setShowResults(true);
//             const results = await searchDrugs(query);
//             setSearchResults(results);
//         } catch (error) {
//             console.error('Error searching drugs:', error);
//             setSearchResults([]);
//         } finally {
//             setIsSearching(false);
//         }
//     };

//     const handleSelectDrug = (drug: Drug) => {
//         onDrugSelect(drug);
//         setSearchQuery('');
//         setSearchResults([]);
//         setShowResults(false);
//     };

//     const promotionalMaterials: PromotionalMaterial[] = selectedDrug ? [
//         {
//             id: '1',
//             title: 'Product Brochure',
//             description: 'Comprehensive product information',
//             type: 'pdf',
//             url: `https://example.com/materials/${selectedDrug.id}/brochure.pdf`
//         },
//         {
//             id: '2',
//             title: 'Clinical Studies',
//             description: 'Latest trial data and efficacy results',
//             type: 'pdf',
//             url: `https://example.com/materials/${selectedDrug.id}/studies.pdf`
//         },
//         {
//             id: '3',
//             title: 'Video Presentation',
//             description: 'Mechanism of action animation',
//             type: 'video',
//             url: `https://example.com/materials/${selectedDrug.id}/video`
//         },
//         {
//             id: '4',
//             title: 'Trade Information',
//             description: 'Pricing and trade details',
//             type: 'document',
//             url: `https://example.com/materials/${selectedDrug.id}/trade.pdf`
//         }
//     ] : [];

//     const handleOpenMaterial = (material: PromotionalMaterial) => {
//         Linking.openURL(material.url).catch(() => {
//             Alert.alert('Error', 'Unable to open this material');
//         });
//     };

//     const getIconForType = (type: string) => {
//         switch (type) {
//             case 'pdf':
//                 return 'document-text-outline';
//             case 'video':
//                 return 'videocam-outline';
//             case 'document':
//                 return 'people-outline';
//             default:
//                 return 'document-outline';
//         }
//     };

//     return (
//         <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
//             {/* Search Section */}
//             <StyledView className='px-5 py-4'>
//                 <StyledView className='flex-row items-center gap-2 mb-3'>
//                     <Ionicons name="medical-outline" size={20} color="#0077B6" />
//                     <StyledText className='text-base font-semibold text-gray-900'>
//                         Select Drug to Promote
//                     </StyledText>
//                 </StyledView>

//                 {/* Search Input */}
//                 <StyledView className='relative'
//                     style={{
//                         height: 60,
//                         width: 350
//                     }}>
//                     <StyledView className='absolute left-2 top-3.5 z-10 '>
//                         <Ionicons name="search-outline" size={20} color="#6C757D" />
//                     </StyledView>
//                     <StyledTextInput
//                         className='bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-base pl-3'
//                         placeholder='Search drugs by name, composition, or manufacturer...'
//                         value={searchQuery}
//                         onChangeText={handleSearch}
//                         placeholderTextColor="#9CA3AF"
//                     />
//                 </StyledView>

//                 {/* Search Results */}
//                 {showResults && (
//                     <StyledView className='mt-3 bg-white rounded-xl border border-gray-200'>
//                         {isSearching ? (
//                             <StyledView className='p-4 items-center'>
//                                 <ActivityIndicator size="small" color="#0077B6" />
//                             </StyledView>
//                         ) : searchResults.length > 0 ? (
//                             searchResults.map((drug, index) => (
//                                 <StyledTouchableOpacity
//                                     key={drug.id}
//                                     className={`p-4 flex-row items-center gap-3 ${index !== searchResults.length - 1 ? 'border-b border-gray-100' : ''
//                                         }`}
//                                     onPress={() => handleSelectDrug(drug)}
//                                 >
//                                     <StyledView className='w-10 h-10 bg-blue-50 rounded-lg items-center justify-center'>
//                                         <StyledText className='text-lg'>💊</StyledText>
//                                     </StyledView>
//                                     <StyledView className='flex-1'>
//                                         <StyledText className='text-base font-semibold text-gray-900'>
//                                             {drug.name}
//                                         </StyledText>
//                                         <StyledText className='text-sm text-gray-600'>
//                                             {drug.composition || 'Composition not available'}
//                                         </StyledText>
//                                         <StyledText className='text-xs text-gray-500'>
//                                             {drug.manufacturer || 'Manufacturer not specified'}
//                                         </StyledText>
//                                     </StyledView>
//                                 </StyledTouchableOpacity>
//                             ))
//                         ) : (
//                             <StyledView className='p-4'>
//                                 <StyledText className='text-sm text-gray-500 text-center'>
//                                     No drugs found
//                                 </StyledText>
//                             </StyledView>
//                         )}
//                     </StyledView>
//                 )}
//             </StyledView>

//             {/* Selected Drug Promotional Materials */}
//             {selectedDrug && (
//                 <StyledView className='px-5 py-4'>
//                     <StyledView className='bg-blue-50 rounded-xl overflow-hidden'>
//                         <StyledView className='bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-3 border-b border-blue-200'>
//                             <StyledText className='text-lg font-semibold text-[#0077B6]'>
//                                 {selectedDrug.name} - Promotional Materials
//                             </StyledText>
//                             <StyledText className='text-sm text-blue-700 mt-1'>
//                                 Share these materials with the chemist
//                             </StyledText>
//                         </StyledView>

//                         <StyledView className='p-4'>
//                             {promotionalMaterials.map((material, index) => (
//                                 <StyledTouchableOpacity
//                                     key={material.id}
//                                     className={`flex-row items-center gap-3 p-3 bg-white rounded-lg ${index !== promotionalMaterials.length - 1 ? 'mb-3' : ''
//                                         }`}
//                                     onPress={() => handleOpenMaterial(material)}
//                                 >
//                                     <StyledView className='w-10 h-10 bg-[#0077B6] rounded-lg items-center justify-center'>
//                                         <Ionicons
//                                             name={getIconForType(material.type)}
//                                             size={20}
//                                             color="white"
//                                         />
//                                     </StyledView>
//                                     <StyledView className='flex-1'>
//                                         <StyledText className='text-sm font-semibold text-gray-900'>
//                                             {material.title}
//                                         </StyledText>
//                                         <StyledText className='text-xs text-gray-600'>
//                                             {material.description}
//                                         </StyledText>
//                                     </StyledView>
//                                     <Ionicons name="open-outline" size={16} color="#6C757D" />
//                                 </StyledTouchableOpacity>
//                             ))}
//                         </StyledView>
//                     </StyledView>
//                 </StyledView>
//             )}

//             {/* Empty State */}
//             {!selectedDrug && !showResults && (
//                 <StyledView className='px-5 py-8 items-center'>
//                     <StyledView className='w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-3'>
//                         <Ionicons name="search-outline" size={32} color="#9CA3AF" />
//                     </StyledView>
//                     <StyledText className='text-base font-semibold text-gray-900 mb-1'>
//                         Search for a Drug to Promote
//                     </StyledText>
//                     <StyledText className='text-sm text-gray-500 text-center'>
//                         Use the search bar above to find and select a drug for promotion during this meeting.
//                     </StyledText>
//                 </StyledView>
//             )}
//         </StyledScrollView>
//     );
// }

// components/meeting/steps/DrugPromotionStep.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export interface Drug {
    id: string;
    name: string;
    composition: string;
    manufacturer: string;
}

interface PromotionalMaterial {
    id: string;
    title: string;
    description: string;
    type: 'pdf' | 'video' | 'brochure' | 'education';
    url: string;
}

interface DrugPromotionStepProps {
    drugs: Drug[];
    onDrugSelect: (drug: Drug) => void;
    selectedDrug: Drug | null;
    customerName: string;
}

export default function DrugPromotionStep({
    drugs,
    onDrugSelect,
    selectedDrug,
    customerName
}: DrugPromotionStepProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    const filteredDrugs = drugs.filter(drug =>
        drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drug.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drug.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        setShowResults(text.length > 0);
    };

    const handleSelection = (drug: Drug) => {
        onDrugSelect(drug);
        setSearchQuery('');
        setShowResults(false);
    };

    // Generate promotional materials based on selected drug
    const materials: PromotionalMaterial[] = selectedDrug ? [
        {
            id: '1',
            title: 'Product Brochure',
            description: 'Comprehensive prescribing information',
            type: 'pdf',
            url: 'https://example.com/brochure.pdf'
        },
        {
            id: '2',
            title: 'Clinical Studies',
            description: 'Latest trial data and efficacy results',
            type: 'pdf',
            url: 'https://example.com/studies.pdf'
        },
        {
            id: '3',
            title: 'Video Presentation',
            description: 'Mechanism of action animation',
            type: 'video',
            url: 'https://youtube.com/watch?v=example'
        },
        {
            id: '4',
            title: 'Patient Education',
            description: 'Handouts and counseling guides',
            type: 'education',
            url: 'https://example.com/education.pdf'
        },
    ] : [];

    const openMaterial = async (url: string, title: string) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert('Error', `Cannot open ${title}`);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to open the link');
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'video':
                return 'videocam';
            case 'education':
                return 'people';
            case 'brochure':
                return 'book';
            default:
                return 'document';
        }
    };

    return (
        <StyledScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <StyledView className="p-5">
                {/* Drug Search Section */}
                <StyledView className="mb-6">
                    <StyledText className="text-lg font-semibold text-gray-900 mb-4 flex-row items-center">
                        <Ionicons name="medical" size={24} color="#212529" />
                        <StyledText className="ml-2">Select Drug to Promote</StyledText>
                    </StyledText>

                    <StyledView className="relative z-10">
                        <StyledView className="flex-row items-center bg-white border border-gray-300 rounded-xl px-4 py-3">
                            <Ionicons name="search" size={20} color="#6C757D" />
                            <StyledTextInput
                                className="flex-1 ml-3 text-base"
                                placeholder="Search drugs by name, composition, or manufacturer..."
                                value={searchQuery}
                                onChangeText={handleSearch}
                                placeholderTextColor="#9CA3AF"
                            />
                            {searchQuery.length > 0 && (
                                <StyledTouchableOpacity onPress={() => {
                                    setSearchQuery('');
                                    setShowResults(false);
                                }}>
                                    <Ionicons name="close-circle" size={20} color="#6C757D" />
                                </StyledTouchableOpacity>
                            )}
                        </StyledView>

                        {/* Search Results Dropdown */}
                        {showResults && filteredDrugs.length > 0 && (
                            <StyledView className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64">
                                <StyledScrollView showsVerticalScrollIndicator={false}>
                                    {filteredDrugs.map((drug) => (
                                        <StyledTouchableOpacity
                                            key={drug.id}
                                            className={`p-4 border-b border-gray-100 ${selectedDrug?.id === drug.id ? 'bg-blue-50' : ''
                                                }`}
                                            onPress={() => handleSelection(drug)}
                                        >
                                            <StyledView className="flex-row items-center">
                                                <StyledView className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center mr-3">
                                                    <StyledText className="text-lg">💊</StyledText>
                                                </StyledView>
                                                <StyledView className="flex-1">
                                                    <StyledText className="text-base font-semibold text-gray-900">
                                                        {drug.name}
                                                    </StyledText>
                                                    <StyledText className="text-sm text-gray-600">
                                                        {drug.composition}
                                                    </StyledText>
                                                    <StyledText className="text-xs text-gray-500">
                                                        {drug.manufacturer}
                                                    </StyledText>
                                                </StyledView>
                                                {selectedDrug?.id === drug.id && (
                                                    <Ionicons name="checkmark-circle" size={20} color="#0077B6" />
                                                )}
                                            </StyledView>
                                        </StyledTouchableOpacity>
                                    ))}
                                </StyledScrollView>
                            </StyledView>
                        )}

                        {/* No Results */}
                        {showResults && filteredDrugs.length === 0 && (
                            <StyledView className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
                                <StyledText className="text-center text-gray-500">
                                    No drugs found matching "{searchQuery}"
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledView>
                </StyledView>

                {/* Promotional Materials Section */}
                {selectedDrug ? (
                    <StyledView className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <StyledView className="bg-blue-50 px-4 py-4 border-b border-blue-100">
                            <StyledText className="text-lg font-semibold text-[#0077B6]">
                                {selectedDrug.name} - Promotional Materials
                            </StyledText>
                            <StyledText className="text-sm text-blue-700 mt-1">
                                Share these materials with {customerName}
                            </StyledText>
                        </StyledView>

                        <StyledView className="p-4">
                            {materials.map((material) => (
                                <StyledTouchableOpacity
                                    key={material.id}
                                    className="flex-row items-center p-3 bg-gray-50 rounded-lg mb-3 last:mb-0"
                                    onPress={() => openMaterial(material.url, material.title)}
                                    activeOpacity={0.7}
                                >
                                    <StyledView className="w-10 h-10 bg-[#0077B6] rounded-lg items-center justify-center mr-3">
                                        <Ionicons
                                            name={getIcon(material.type) as any}
                                            size={20}
                                            color="white"
                                        />
                                    </StyledView>
                                    <StyledView className="flex-1">
                                        <StyledText className="text-sm font-semibold text-gray-900">
                                            {material.title}
                                        </StyledText>
                                        <StyledText className="text-xs text-gray-600">
                                            {material.description}
                                        </StyledText>
                                    </StyledView>
                                    <Ionicons name="open-outline" size={16} color="#6C757D" />
                                </StyledTouchableOpacity>
                            ))}
                        </StyledView>
                    </StyledView>
                ) : (
                    <StyledView className="flex-1 items-center justify-center py-12">
                        <StyledText className="text-5xl mb-4">🔍</StyledText>
                        <StyledText className="text-lg font-semibold text-gray-900 mb-2">
                            Search for a Drug to Promote
                        </StyledText>
                        <StyledText className="text-sm text-gray-600 text-center px-8">
                            Use the search bar above to find and select a drug for promotion during this meeting.
                        </StyledText>
                    </StyledView>
                )}
            </StyledView>
        </StyledScrollView>
    );
}