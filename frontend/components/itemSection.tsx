// components/ItemsSection.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    const [drugDropdownOpen, setDrugDropdownOpen] = useState<{ [key: number]: boolean }>({});
    const [searchTexts, setSearchTexts] = useState<{ [key: number]: string }>({});

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
        // Clean up dropdown states
        const newDropdownOpen = { ...drugDropdownOpen };
        const newSearchTexts = { ...searchTexts };
        delete newDropdownOpen[index];
        delete newSearchTexts[index];
        setDrugDropdownOpen(newDropdownOpen);
        setSearchTexts(newSearchTexts);
        onUpdateItems(newItems);
    };

    const selectDrug = (drug: Drug, index: number) => {
        console.log('Selecting drug:', drug.name, 'for index:', index); // Debug log

        const newItems = [...items];
        newItems[index].drug = drug;
        newItems[index].subtotal = drug.price * newItems[index].quantity;
        onUpdateItems(newItems);

        // Close dropdown and clear search
        setDrugDropdownOpen(prev => ({ ...prev, [index]: false }));
        setSearchTexts(prev => ({ ...prev, [index]: '' }));
    };

    const updateQuantity = (index: number, quantity: number) => {
        const newItems = [...items];
        const clampedQuantity = Math.max(minQuantity, Math.min(maxQuantity, quantity));
        newItems[index].quantity = clampedQuantity;
        if (newItems[index].drug) {
            newItems[index].subtotal = newItems[index].drug!.price * newItems[index].quantity;
        }
        onUpdateItems(newItems);
    };

    const toggleDrugDropdown = (index: number) => {
        setDrugDropdownOpen(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handleSearchChange = (text: string, index: number) => {
        setSearchTexts(prev => ({ ...prev, [index]: text }));
        setDrugDropdownOpen(prev => ({ ...prev, [index]: true }));

        // Clear selected drug if user is typing
        if (items[index].drug && text !== items[index].drug.name) {
            const newItems = [...items];
            newItems[index].drug = null;
            newItems[index].subtotal = 0;
            onUpdateItems(newItems);
        }
    };

    const handleInputFocus = (index: number) => {
        setDrugDropdownOpen(prev => ({ ...prev, [index]: true }));
    };

    const getFilteredDrugs = (index: number) => {
        const searchText = searchTexts[index] || '';
        return availableDrugs.filter(drug =>
            drug.name.toLowerCase().includes(searchText.toLowerCase())
        );
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
                                zIndex: drugDropdownOpen[index] ? 1000 - index : 1
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
                                        {/* Drug Selection */}
                                        <View style={{ position: 'relative', marginBottom: 12 }}>
                                            <TextInput
                                                placeholder={searchPlaceholder}
                                                value={item.drug ? item.drug.name : (searchTexts[index] || '')}
                                                onChangeText={(text) => handleSearchChange(text, index)}
                                                onFocus={() => handleInputFocus(index)}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: '#0077B6',
                                                    borderRadius: drugDropdownOpen[index] ? 6 : 6,
                                                    borderBottomLeftRadius: drugDropdownOpen[index] ? 0 : 6,
                                                    borderBottomRightRadius: drugDropdownOpen[index] ? 0 : 6,
                                                    padding: 12,
                                                    fontSize: 16,
                                                    backgroundColor: '#fff',
                                                    color: '#111827',
                                                    paddingRight: 40
                                                }}
                                                placeholderTextColor="#9CA3AF"
                                            />

                                            <TouchableOpacity
                                                onPress={() => toggleDrugDropdown(index)}
                                                style={{
                                                    position: 'absolute',
                                                    right: 12,
                                                    top: 0,
                                                    bottom: 0,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: 24
                                                }}
                                            >
                                                <Ionicons
                                                    name={drugDropdownOpen[index] ? "chevron-up-outline" : "chevron-down-outline"}
                                                    size={20}
                                                    color="#6B7280"
                                                />
                                            </TouchableOpacity>

                                            {/* Inline Dropdown */}
                                            {drugDropdownOpen[index] && (
                                                <View style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: 0,
                                                    right: 0,
                                                    backgroundColor: '#fff',
                                                    borderWidth: 1,
                                                    borderColor: '#0077B6',
                                                    borderTopWidth: 0,
                                                    borderBottomLeftRadius: 6,
                                                    borderBottomRightRadius: 6,
                                                    maxHeight: 200,
                                                    zIndex: 1001,
                                                    elevation: 5,
                                                    shadowColor: '#000',
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowOpacity: 0.1,
                                                    shadowRadius: 4,
                                                }}>
                                                    <ScrollView
                                                        showsVerticalScrollIndicator={true}
                                                        nestedScrollEnabled={true}
                                                        keyboardShouldPersistTaps="always"
                                                    >
                                                        {getFilteredDrugs(index).map((drug) => (
                                                            <TouchableOpacity
                                                                key={drug.id}
                                                                onPress={() => {
                                                                    console.log('Drug item pressed:', drug.name); // Debug log
                                                                    selectDrug(drug, index);
                                                                }}
                                                                style={{
                                                                    paddingVertical: 12,
                                                                    paddingHorizontal: 16,
                                                                    borderBottomWidth: 1,
                                                                    borderBottomColor: '#F3F4F6'
                                                                }}
                                                                activeOpacity={0.7}
                                                            >
                                                                <Text style={{ fontSize: 16, color: '#111827' }}>
                                                                    {drug.name} - {currency}{drug.price}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                        {getFilteredDrugs(index).length === 0 && (
                                                            <View style={{ padding: 16, alignItems: 'center' }}>
                                                                <Text style={{ color: '#9CA3AF', fontSize: 14 }}>
                                                                    No drugs found
                                                                </Text>
                                                            </View>
                                                        )}
                                                    </ScrollView>
                                                </View>
                                            )}
                                        </View>

                                        {/* Quantity and Price Row */}
                                        {item.drug && (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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