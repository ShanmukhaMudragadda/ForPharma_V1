// components/Dropdown.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);

interface DropdownItem {
    id: string;
    label: string;
    value: any;
    subtitle?: string;
}

interface DropdownProps {
    label: string;
    required?: boolean;
    placeholder?: string;
    items: DropdownItem[];
    selectedItem: DropdownItem | null;
    onSelectItem: (item: DropdownItem) => void;
    searchable?: boolean;
    maxHeight?: number;
    disabled?: boolean;
    borderColor?: string;
}

export default function Dropdown({
    label,
    required = false,
    placeholder = "Select an option...",
    items,
    selectedItem,
    onSelectItem,
    searchable = true,
    maxHeight = 200,
    disabled = false,
    borderColor = "border-gray-300"
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const filteredItems = searchable
        ? items.filter(item =>
            item.label.toLowerCase().includes(searchText.toLowerCase()) ||
            (item.subtitle && item.subtitle.toLowerCase().includes(searchText.toLowerCase()))
        )
        : items;

    const handleSelectItem = (item: DropdownItem) => {
        onSelectItem(item);
        setIsOpen(false);
        setSearchText('');
    };

    return (
        <View style={{ width: '100%', marginBottom: 16 }}>
            {label && (
                <Text style={{ marginBottom: 6, fontWeight: '500', fontSize: 16, color: '#111827' }}>
                    {label}{required && <Text style={{ color: '#EF4444' }}> *</Text>}
                </Text>
            )}

            {/* Input Field */}
            <TouchableOpacity
                disabled={disabled}
                onPress={() => !disabled && setIsOpen(true)}
                activeOpacity={0.8}
                style={{
                    borderWidth: 1,
                    borderColor: "#0077B6", // Primary blue border
                    borderRadius: 8,
                    padding: 14,
                    backgroundColor: disabled ? '#f3f3f3' : '#fff',
                    flexDirection: "row",
                    alignItems: "center",
                    minHeight: 50,
                }}
            >
                <Text style={{
                    flex: 1,
                    color: selectedItem ? '#111827' : '#9CA3AF',
                    fontSize: 16
                }}>
                    {selectedItem ? selectedItem.label : placeholder}
                </Text>
                <Ionicons
                    name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
                    size={20}
                    color="#6B7280"
                />
            </TouchableOpacity>

            {/* Modal Dropdown */}
            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}
                    activeOpacity={1}
                    onPress={() => setIsOpen(false)}
                >
                    <View style={{
                        position: 'absolute',
                        top: '20%',
                        left: '5%',
                        width: '90%',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        maxHeight: maxHeight + 100,
                        elevation: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                        shadowRadius: 8,
                        zIndex: 1000,
                        padding: 16
                    }}>
                        {/* Header */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 16
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
                                Select Medicine
                            </Text>
                            <TouchableOpacity onPress={() => setIsOpen(false)}>
                                <Ionicons name="close" size={24} color="#6B7280" />
                            </TouchableOpacity>
                        </View>

                        {/* Search Input */}
                        {searchable && (
                            <TextInput
                                autoFocus
                                placeholder="Search Medicine..."
                                value={searchText}
                                onChangeText={setSearchText}
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#D1D5DB",
                                    borderRadius: 8,
                                    padding: 12,
                                    marginBottom: 12,
                                    fontSize: 16,
                                    backgroundColor: '#F9FAFB'
                                }}
                                placeholderTextColor="#9CA3AF"
                            />
                        )}

                        {/* Options List */}
                        <ScrollView style={{ maxHeight }}>
                            {filteredItems.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => handleSelectItem(item)}
                                    style={{
                                        paddingVertical: 14,
                                        paddingHorizontal: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#F3F4F6"
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#111827' }}>
                                        {item.label}
                                    </Text>
                                    {item.subtitle && (
                                        <Text style={{
                                            fontSize: 14,
                                            color: "#6B7280",
                                            marginTop: 2
                                        }}>
                                            {item.subtitle}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                            {filteredItems.length === 0 && (
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#9CA3AF',
                                    padding: 20,
                                    fontSize: 16
                                }}>
                                    No customers found
                                </Text>
                            )}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}