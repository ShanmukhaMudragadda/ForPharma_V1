import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from './dropdown'; // Import the main dropdown component

interface Drug {
    id: string;
    name: string;
    price: number;
}

interface OrderItem {
    id: string;
    drug: Drug | null;
    quantity: number;
    subtotal: number;
}

// Interface for dropdown items based on the Drug interface
interface DrugDropdownItem {
    id: string;
    label: string;
    value: Drug;
}

interface ItemsSectionProps {
    title?: string;
    items: OrderItem[];
    availableDrugs: Drug[];
    onUpdateItems: (items: OrderItem[]) => void;
    emptyStateText?: string;
    addButtonText?: string;
    addAnotherButtonText?: string;
    searchPlaceholder?: string;
    showPriceInList?: boolean;
    minQuantity?: number;
    maxQuantity?: number;
    currency?: string;
}

export default function ItemsSection({
    title = "Items",
    items,
    availableDrugs,
    onUpdateItems,
    emptyStateText = "No items added yet",
    addButtonText = "Add Item",
    addAnotherButtonText = "Add Another Item",
    searchPlaceholder = "Search and select drug...",
    showPriceInList = true,
    minQuantity = 1,
    maxQuantity = 999,
    currency = "₹"
}: ItemsSectionProps) {
    // Map available drugs to the format required by the Dropdown component
    const drugOptions: DrugDropdownItem[] = availableDrugs.map(drug => ({
        id: drug.id,
        label: `${drug.name} - ${currency}${drug.price.toFixed(2)}`,
        value: drug
    }));

    const addNewItem = () => {
        const newItem: OrderItem = {
            id: Date.now().toString(),
            drug: null,
            quantity: minQuantity,
            subtotal: 0
        };
        onUpdateItems([...items, newItem]);
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        onUpdateItems(newItems);
    };

    const handleDrugSelection = (item: DrugDropdownItem, index: number) => {
        const newItems = [...items];
        const selectedDrug = item.value;
        const newQuantity = newItems[index].quantity > 0 ? newItems[index].quantity : minQuantity;

        newItems[index] = {
            ...newItems[index],
            drug: selectedDrug,
            quantity: newQuantity,
            subtotal: selectedDrug.price * newQuantity
        };
        onUpdateItems(newItems);
    };

    const updateQuantity = (index: number, quantity: number) => {
        const newItems = [...items];
        const clampedQuantity = Math.max(minQuantity, Math.min(maxQuantity, quantity));
        newItems[index].quantity = clampedQuantity;
        if (newItems[index].drug) {
            newItems[index].subtotal = newItems[index].drug.price * clampedQuantity;
        }
        onUpdateItems(newItems);
    };

    const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);
    const itemCount = items.filter(item => item.drug).length;

    return (
        <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16 }}>
                {title}
            </Text>

            {/* Items Container */}
            <View style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                marginBottom: 16
            }}>
                {items.length === 0 ? (
                    // Empty State
                    <View style={{
                        padding: 40,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#9CA3AF',
                            marginBottom: 20
                        }}>
                            {emptyStateText}
                        </Text>
                        <TouchableOpacity
                            onPress={addNewItem}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 24,
                                paddingVertical: 12,
                                borderWidth: 1,
                                borderColor: '#0077B6',
                                borderRadius: 8,
                                backgroundColor: 'transparent'
                            }}
                        >
                            <Ionicons name="add" size={20} color="#0077B6" style={{ marginRight: 8 }} />
                            <Text style={{ color: '#0077B6', fontSize: 16, fontWeight: '600' }}>
                                {addButtonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Items List
                    <View>
                        {items.map((item, index) => (
                            <View key={item.id} style={{
                                padding: 16,
                                borderBottomWidth: index < items.length - 1 ? 1 : 0,
                                borderBottomColor: '#F3F4F6',
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* Remove Button */}
                                    <TouchableOpacity
                                        onPress={() => removeItem(index)}
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 6,
                                            backgroundColor: '#EF4444',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 12,
                                            marginTop: 4
                                        }}
                                    >
                                        <Ionicons name="remove" size={18} color="#FFFFFF" />
                                    </TouchableOpacity>

                                    {/* Item Content */}
                                    <View style={{ flex: 1 }}>
                                        {/* Drug Selection - Now using the Dropdown component */}
                                        <Dropdown
                                            label="Drug Name"
                                            required
                                            placeholder={searchPlaceholder}
                                            items={drugOptions}
                                            selectedItem={item.drug ? { id: item.drug.id, label: `${item.drug.name} - ${currency}${item.drug.price.toFixed(2)}`, value: item.drug } : null}
                                            onSelectItem={(selectedItem) => handleDrugSelection(selectedItem as DrugDropdownItem, index)}
                                            searchable={true}
                                            maxHeight={200}
                                        />

                                        {/* Quantity and Price Row */}
                                        {item.drug && (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                                {/* Quantity */}
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 14, color: '#6B7280', marginRight: 8 }}>
                                                        Qty:
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 4 }}>
                                                        <TextInput
                                                            value={item.quantity.toString()}
                                                            onChangeText={(text) => updateQuantity(index, parseInt(text) || minQuantity)}
                                                            style={{
                                                                width: 50,
                                                                height: 32,
                                                                textAlign: 'center',
                                                                fontSize: 16,
                                                                backgroundColor: '#fff'
                                                            }}
                                                            keyboardType="numeric"
                                                        />
                                                        <View style={{ paddingHorizontal: 4 }}>
                                                            <TouchableOpacity
                                                                onPress={() => updateQuantity(index, item.quantity + 1)}
                                                                style={{ paddingVertical: 2 }}
                                                            >
                                                                <Ionicons name="chevron-up" size={12} color="#6B7280" />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => updateQuantity(index, item.quantity - 1)}
                                                                style={{ paddingVertical: 2 }}
                                                            >
                                                                <Ionicons name="chevron-down" size={12} color="#6B7280" />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>

                                                {/* Price Info */}
                                                <View style={{ alignItems: 'flex-end' }}>
                                                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
                                                        {currency}{item.drug.price.toFixed(2)}
                                                    </Text>
                                                    <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 2 }}>
                                                        Subtotal: {currency}{item.subtotal.toFixed(2)}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        ))}

                        {/* Add Another Item Button */}
                        <View style={{ padding: 16 }}>
                            <TouchableOpacity
                                onPress={addNewItem}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingVertical: 12,
                                    borderWidth: 1,
                                    borderColor: '#0077B6',
                                    borderRadius: 8,
                                    backgroundColor: 'transparent'
                                }}
                            >
                                <Ionicons name="add" size={20} color="#0077B6" style={{ marginRight: 8 }} />
                                <Text style={{ color: '#0077B6', fontSize: 16, fontWeight: '600' }}>
                                    {addAnotherButtonText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>

            {/* Order Summary */}
            <View style={{
                backgroundColor: '#F9FAFB',
                padding: 16,
                borderRadius: 8
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8
                }}>
                    <Text style={{ fontSize: 14, color: '#6B7280' }}>
                        Subtotal ({itemCount} items)
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#111827' }}>
                        {currency}{totalAmount.toFixed(2)}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
                        Total Amount
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: '#10B981' }}>
                        {currency}{totalAmount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

