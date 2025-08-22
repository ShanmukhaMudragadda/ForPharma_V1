import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from './dropdown';

// Interfaces for Distribution Items
interface InventoryItem {
    id: string;
    inventoryId: string;
    name: string;
    quantity: number;
    status: 'available' | 'low' | 'out';
    manufacturer: string;
    category: string;
    unit: string;
}

interface DistributionItem {
    id: string;
    item: InventoryItem | null;
    quantity: number;
}

interface InventoryDropdownItem {
    id: string;
    label: string;
    value: InventoryItem;
    subtitle?: string;
}

interface DistributionItemsSectionProps {
    title?: string;
    items: DistributionItem[];
    availableItems: InventoryItem[];
    onUpdateItems: (items: DistributionItem[]) => void;
    emptyStateText?: string;
    addButtonText?: string;
    addAnotherButtonText?: string;
    searchPlaceholder?: string;
    minQuantity?: number;
    maxQuantity?: number;
    type: 'drug' | 'gift';
}

export default function DistributionItemsSection({
    title = "Items",
    items,
    availableItems,
    onUpdateItems,
    emptyStateText = "No items added yet",
    addButtonText = "Add Item",
    addAnotherButtonText = "Add Another Item",
    searchPlaceholder = "Search and select item...",
    minQuantity = 1,
    maxQuantity = 999,
    type
}: DistributionItemsSectionProps) {

    // Map available items to the format required by the Dropdown component
    const itemOptions: InventoryDropdownItem[] = availableItems.map(item => ({
        id: item.id,
        label: `${item.name} (${item.quantity} available)`,
        value: item,
        subtitle: `${item.manufacturer} • ${item.category} • ${item.status === 'available' ? '✅ In Stock' : '⚠️ Low Stock'}`
    }));

    const addNewItem = () => {
        const newItem: DistributionItem = {
            id: Date.now().toString(),
            item: null,
            quantity: minQuantity
        };
        onUpdateItems([...items, newItem]);
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        onUpdateItems(newItems);
    };

    const handleItemSelection = (selectedItem: InventoryDropdownItem, index: number) => {
        const newItems = [...items];
        const inventoryItem = selectedItem.value;
        const newQuantity = Math.min(
            newItems[index].quantity > 0 ? newItems[index].quantity : minQuantity,
            inventoryItem.quantity
        );

        newItems[index] = {
            ...newItems[index],
            item: inventoryItem,
            quantity: newQuantity
        };
        onUpdateItems(newItems);
    };

    const updateQuantity = (index: number, quantity: number) => {
        const newItems = [...items];
        const maxAvailable = newItems[index].item?.quantity || maxQuantity;
        const clampedQuantity = Math.max(minQuantity, Math.min(Math.min(maxQuantity, maxAvailable), quantity));
        newItems[index].quantity = clampedQuantity;
        onUpdateItems(newItems);
    };

    const totalQuantity = items.filter(item => item.item).reduce((sum, item) => sum + item.quantity, 0);
    const itemCount = items.filter(item => item.item).length;

    // Get status color for items
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return '#10B981';
            case 'low': return '#F59E0B';
            case 'out': return '#EF4444';
            default: return '#6B7280';
        }
    };

    const getStatusBgColor = (status: string) => {
        switch (status) {
            case 'available': return '#ECFDF5';
            case 'low': return '#FEF3C7';
            case 'out': return '#FEE2E2';
            default: return '#F3F4F6';
        }
    };

    return (
        <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16 }}>
                {title} <Text style={{ fontSize: 14, color: '#6B7280', fontWeight: '400' }}>
                    ({availableItems.length} available)
                </Text>
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
                            marginBottom: 20,
                            textAlign: 'center'
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
                                        {/* Item Selection - Using Dropdown with search */}
                                        <Dropdown
                                            label={`${type === 'drug' ? 'Drug' : 'Gift'} Name`}
                                            required
                                            placeholder={searchPlaceholder}
                                            items={itemOptions}
                                            selectedItem={item.item ? {
                                                id: item.item.id,
                                                label: `${item.item.name} (${item.item.quantity} available)`,
                                                value: item.item,
                                                subtitle: `${item.item.manufacturer} • ${item.item.category}`
                                            } : null}
                                            onSelectItem={(selectedItem) => handleItemSelection(selectedItem as InventoryDropdownItem, index)}
                                            searchable={true}
                                            maxHeight={250}
                                        />

                                        {/* Quantity and Status Row */}
                                        {item.item && (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                                {/* Quantity Controls */}
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
                                                    <Text style={{ fontSize: 12, color: '#6B7280', marginLeft: 8 }}>
                                                        of {item.item.quantity} {item.item.unit}
                                                    </Text>
                                                </View>

                                                {/* Status Badge */}
                                                <View style={{
                                                    backgroundColor: getStatusBgColor(item.item.status),
                                                    paddingHorizontal: 8,
                                                    paddingVertical: 4,
                                                    borderRadius: 6
                                                }}>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        fontWeight: '500',
                                                        color: getStatusColor(item.item.status)
                                                    }}>
                                                        {item.item.status === 'available' ? '✅ Available' :
                                                            item.item.status === 'low' ? '⚠️ Low Stock' : '❌ Out of Stock'}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}

                                        {/* Item Details */}
                                        {item.item && (
                                            <View style={{
                                                marginTop: 8,
                                                padding: 8,
                                                backgroundColor: '#F8FAFC',
                                                borderRadius: 6,
                                                borderLeftWidth: 3,
                                                borderLeftColor: '#0077B6'
                                            }}>
                                                <Text style={{ fontSize: 12, color: '#6B7280' }}>
                                                    📦 {item.item.manufacturer} • {item.item.category}
                                                </Text>
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

            {/* Distribution Summary */}
            {itemCount > 0 && (
                <View style={{
                    backgroundColor: '#F0F9FF',
                    padding: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#BAE6FD'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 8
                    }}>
                        <Text style={{ fontSize: 14, color: '#0369A1' }}>
                            Items Selected ({itemCount} {type}s)
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#0369A1' }}>
                            {totalQuantity} {type === 'drug' ? 'strips' : 'units'}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#0369A1' }}>
                            Total {type === 'drug' ? 'Drugs' : 'Gifts'} to Distribute
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#0369A1' }}>
                            {totalQuantity}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}