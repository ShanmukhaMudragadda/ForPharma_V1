import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from './dropdown'; // Using your provided dropdown component
import Input from './input'; // Using your provided input component

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

/**
 * Interface for a drug, including its ID, name, and pack size.
 */
interface Drug {
    id: string;
    name: string;
    packSize: string;
}

/**
 * Interface for a single audit item, containing details for both the company's product and the competitor's.
 */
interface AuditItem {
    id: string;
    companyDrug: Drug | null;
    companyQuantity: number;
    companyPackSize: string;
    competitorDrug: string;
    competitorQuantity: number;
    competitorPackSize: string;
}

/**
 * Props for the AuditItemsSection component.
 */
interface AuditItemsProps {
    items: AuditItem[];
    availableDrugs: Drug[];
    onUpdateItems: (items: AuditItem[]) => void;
}

/**
 * A section of the UI for managing a list of audit items.
 * Each item compares the company's product to a competitor's.
 */
export default function AuditItemsSection({ items, availableDrugs, onUpdateItems }: AuditItemsProps) {
    /**
     * Adds a new, empty audit item to the list.
     */
    const addNewItem = () => {
        const newItem: AuditItem = {
            id: `audit_${Date.now()}_${Math.random()}`,
            companyDrug: null,
            companyQuantity: 0,
            companyPackSize: '',
            competitorDrug: '',
            competitorQuantity: 0,
            competitorPackSize: ''
        };
        onUpdateItems([...items, newItem]);
    };

    /**
     * Removes an audit item from the list by its ID.
     * @param itemId The unique ID of the item to remove.
     */
    const removeItem = (itemId: string) => {
        const updatedItems = items.filter(item => item.id !== itemId);
        onUpdateItems(updatedItems);
    };

    /**
     * Updates a specific field of an audit item.
     * @param itemId The unique ID of the item to update.
     * @param updates A partial object containing the fields to be updated.
     */
    const updateItem = (itemId: string, updates: Partial<AuditItem>) => {
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, ...updates } : item
        );
        onUpdateItems(updatedItems);
    };

    /**
     * Increments or decrements the quantity of an item.
     * @param itemId The ID of the item.
     * @param field The quantity field to change ('companyQuantity' or 'competitorQuantity').
     * @param delta The amount to change the quantity by (e.g., 1 or -1).
     */
    const changeQuantity = (itemId: string, field: 'companyQuantity' | 'competitorQuantity', delta: number) => {
        const item = items.find(i => i.id === itemId);
        if (item) {
            const currentValue = item[field];
            const newValue = Math.max(0, currentValue + delta);
            updateItem(itemId, { [field]: newValue });
        }
    };

    // Transform drugs for the dropdown component
    const drugDropdownItems = availableDrugs.map(drug => ({
        id: drug.id,
        label: drug.name,
        value: drug.id,
        subtitle: drug.packSize
    }));

    return (
        <StyledView className="mb-6">
            <StyledText className="text-base font-medium text-gray-900 mb-4">
                Audit Items
            </StyledText>
            <StyledView className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Display a message if no items are added */}
                {items.length === 0 ? (
                    <StyledView className="p-12 items-center justify-center h-90">
                        <StyledText className="text-gray-500 text-center text-base mb-4 mt-5">
                            No audit items added yet
                        </StyledText>
                        <StyledTouchableOpacity
                            onPress={addNewItem}
                            className="bg-transparent border border-[#0077B6] px-5 py-2 rounded-lg flex-row items-center mb-6"
                        >
                            <Ionicons name="add" size={16} color="#0077B6" />
                            <StyledText className="text-[#0077B6] font-semibold ml-2">
                                Add Audit Item
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                ) : (
                    <>
                        <StyledScrollView showsVerticalScrollIndicator={false}>
                            {items.map((item, index) => (
                                <StyledView key={item.id} className={`p-4 ${index < items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                    <StyledView className="flex-row justify-between items-center mb-4">
                                        <StyledText className="text-base font-semibold text-gray-900">
                                            Audit Item {index + 1}
                                        </StyledText>
                                        <StyledTouchableOpacity
                                            onPress={() => removeItem(item.id)}
                                            className="w-6 h-6 bg-red-500 rounded-md items-center justify-center"
                                        >
                                            <Ionicons name="remove" size={23} color="#FFFFFF" />
                                        </StyledTouchableOpacity>
                                    </StyledView>

                                    <StyledView className="flex-row gap-3">
                                        {/* Our Product section (Blue border) */}
                                        <StyledView className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-200" style={{ borderLeftWidth: 4, borderLeftColor: '#0077B6' }}>
                                            <StyledText className="text-xs font-semibold text-[#0077B6] uppercase mb-3">
                                                Our Product
                                            </StyledText>

                                            <StyledView className="mb-1">
                                                <StyledText className="text-xs text-gray-600 mb-1">Drug Name</StyledText>
                                                <Dropdown
                                                    placeholder="Our drug"
                                                    items={drugDropdownItems}
                                                    selectedItem={item.companyDrug ? {
                                                        id: item.companyDrug.id,
                                                        label: item.companyDrug.name,
                                                        value: item.companyDrug.id,
                                                        subtitle: item.companyDrug.packSize
                                                    } : null}
                                                    onSelectItem={(selectedDrug) => {
                                                        const drug = availableDrugs.find(d => d.id === selectedDrug.value);
                                                        updateItem(item.id, { companyDrug: drug || null });
                                                    }}
                                                    maxHeight={150}
                                                />
                                            </StyledView>

                                            <StyledView className="mb-3">
                                                <StyledText className="text-xs text-gray-600 mb-1">Quantity</StyledText>
                                                <StyledView className="flex-row items-center gap-2">
                                                    <StyledTouchableOpacity
                                                        onPress={() => changeQuantity(item.id, 'companyQuantity', -1)}
                                                        className="w-8 h-8 bg-gray-200 rounded-md items-center justify-center border border-gray-300"
                                                    >
                                                        <StyledText className="text-gray-600 font-bold text-sm">-</StyledText>
                                                    </StyledTouchableOpacity>
                                                    <StyledView className="flex-1">
                                                        <Input
                                                            value={String(item.companyQuantity)}
                                                            onChangeText={(text) => updateItem(item.id, { companyQuantity: parseInt(text) || 0 })}
                                                            keyboardType="numeric"
                                                            inputClassName="text-center"
                                                        />
                                                    </StyledView>
                                                    <StyledTouchableOpacity
                                                        onPress={() => changeQuantity(item.id, 'companyQuantity', 1)}
                                                        className="w-8 h-8 bg-gray-200 rounded-md items-center justify-center border border-gray-300"
                                                    >
                                                        <StyledText className="text-gray-600 font-bold text-sm">+</StyledText>
                                                    </StyledTouchableOpacity>
                                                </StyledView>
                                            </StyledView>

                                            <StyledView>
                                                <StyledText className="text-xs text-gray-600 mb-1">Pack Size</StyledText>
                                                <Input
                                                    placeholder="e.g., 10x10 tablets"
                                                    value={item.companyPackSize}
                                                    onChangeText={(text) => updateItem(item.id, { companyPackSize: text })}
                                                />
                                            </StyledView>
                                        </StyledView>

                                        {/* Competitor section (Red border) */}
                                        <StyledView className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-200" style={{ borderLeftWidth: 4, borderLeftColor: '#EF4444' }}>
                                            <StyledText className="text-xs font-semibold text-red-500 uppercase mb-3">
                                                Competitor
                                            </StyledText>

                                            <StyledView className="mb-1">
                                                <StyledText className="text-xs text-gray-600 mb-1">Drug Name</StyledText>
                                                <Input
                                                    placeholder="Competitor drug name"
                                                    value={item.competitorDrug}
                                                    onChangeText={(text) => updateItem(item.id, { competitorDrug: text })}
                                                />
                                            </StyledView>

                                            <StyledView className="mb-3">
                                                <StyledText className="text-xs text-gray-600 mb-1">Quantity</StyledText>
                                                <StyledView className="flex-row items-center gap-2">
                                                    <StyledTouchableOpacity
                                                        onPress={() => changeQuantity(item.id, 'competitorQuantity', -1)}
                                                        className="w-8 h-8 bg-gray-200 rounded-md items-center justify-center border border-gray-300"
                                                    >
                                                        <StyledText className="text-gray-600 font-bold text-sm">-</StyledText>
                                                    </StyledTouchableOpacity>
                                                    <StyledView className="flex-1">
                                                        <Input
                                                            value={String(item.competitorQuantity)}
                                                            onChangeText={(text) => updateItem(item.id, { competitorQuantity: parseInt(text) || 0 })}
                                                            keyboardType="numeric"
                                                            inputClassName="text-center"
                                                        />
                                                    </StyledView>
                                                    <StyledTouchableOpacity
                                                        onPress={() => changeQuantity(item.id, 'competitorQuantity', 1)}
                                                        className="w-8 h-8 bg-gray-200 rounded-md items-center justify-center border border-gray-300"
                                                    >
                                                        <StyledText className="text-gray-600 font-bold text-sm">+</StyledText>
                                                    </StyledTouchableOpacity>
                                                </StyledView>
                                            </StyledView>

                                            <StyledView>
                                                <StyledText className="text-xs text-gray-600 mb-1">Pack Size</StyledText>
                                                <Input
                                                    placeholder="e.g., 10x10 tablets"
                                                    value={item.competitorPackSize}
                                                    onChangeText={(text) => updateItem(item.id, { competitorPackSize: text })}
                                                />
                                            </StyledView>
                                        </StyledView>
                                    </StyledView>
                                </StyledView>
                            ))}
                        </StyledScrollView>

                        {/* Add Another Item button */}
                        <StyledView className="p-4 border-t border-gray-100 bg-gray-50 items-center">
                            <StyledTouchableOpacity
                                onPress={addNewItem}
                                className="bg-transparent border border-[#0077B6] px-5 py-2 rounded-lg flex-row items-center"
                            >
                                <Ionicons name="add" size={16} color="#0077B6" />
                                <StyledText className="text-[#0077B6] font-semibold ml-2">
                                    Add Another Item
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </>
                )}
            </StyledView>
        </StyledView>
    );
}