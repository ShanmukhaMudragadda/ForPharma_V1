// components/meeting/DrugSearch.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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

interface DrugSearchProps {
    drugs: Drug[];
    onDrugSelect: (drug: Drug) => void;
    selectedDrug: Drug | null;
}

export default function DrugSearch({ drugs, onDrugSelect, selectedDrug }: DrugSearchProps) {
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

    return (
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
    );
}