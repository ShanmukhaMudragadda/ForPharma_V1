// components/Input.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface InputProps extends React.ComponentProps<typeof TextInput> {
    label?: string;
    required?: boolean;
    error?: string;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
    containerClassName?: string;
    inputClassName?: string;
    isDateInput?: boolean;
    dateValue?: Date;
    onDateChange?: (date: Date) => void;
}

export default function Input({
    label,
    required = false,
    error,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerClassName = '',
    inputClassName = '',
    isDateInput = false,
    dateValue,
    onDateChange,
    ...props
}: InputProps) {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const formatDateInput = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length <= 2) return cleaned;
        if (cleaned.length <= 4) return cleaned.slice(0, 2) + ' - ' + cleaned.slice(2);
        if (cleaned.length <= 8) return cleaned.slice(0, 2) + ' - ' + cleaned.slice(2, 4) + ' - ' + cleaned.slice(4, 8);
        return cleaned.slice(0, 2) + ' - ' + cleaned.slice(2, 4) + ' - ' + cleaned.slice(4, 8);
    };

    const handleDateChange = (text: string) => {
        if (isDateInput && props.onChangeText) {
            const formatted = formatDateInput(text);
            props.onChangeText(formatted);
        } else if (props.onChangeText) {
            props.onChangeText(text);
        }
    };

    const handleDatePickerChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }

        if (selectedDate && onDateChange) {
            onDateChange(selectedDate);
            // Format date for display
            const formatted = formatDateForDisplay(selectedDate);
            if (props.onChangeText) {
                props.onChangeText(formatted);
            }
        }
    };

    const formatDateForDisplay = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day} - ${month} - ${year}`;
    };

    const openDatePicker = () => {
        if (isDateInput) {
            setShowDatePicker(true);
        } else if (onRightIconPress) {
            onRightIconPress();
        }
    };

    return (
        <View style={{ width: '100%', marginBottom: 16 }}>
            {label && (
                <Text style={{
                    marginBottom: 6,
                    fontWeight: '500',
                    fontSize: 16,
                    color: '#111827'
                }}>
                    {label}{required && <Text style={{ color: '#EF4444' }}> *</Text>}
                </Text>
            )}

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: error ? "#EF4444" : "#D1D5DB",
                borderRadius: 8,
                paddingHorizontal: 14,
                backgroundColor: '#fff',
                minHeight: props.multiline ? 100 : 50
            }}>
                {leftIcon && (
                    <Ionicons
                        name={leftIcon}
                        size={20}
                        color="#6B7280"
                        style={{ marginRight: 8 }}
                    />
                )}

                {isDateInput ? (
                    <TouchableOpacity
                        style={{ flex: 1, paddingVertical: 12 }}
                        onPress={openDatePicker}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: props.value ? '#111827' : '#9CA3AF'
                        }}>
                            {props.value || props.placeholder || 'dd - mm - yyyy'}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TextInput
                        {...props}
                        style={{
                            flex: 1,
                            paddingVertical: 12,
                            fontSize: 16,
                            color: '#111827',
                            ...(props.multiline ? {
                                minHeight: 80,
                                textAlignVertical: 'top',
                                paddingTop: 12
                            } : {})
                        }}
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleDateChange}
                        keyboardType={props.keyboardType}
                        maxLength={props.maxLength}
                    />
                )}

                {rightIcon && (
                    <TouchableOpacity
                        onPress={openDatePicker}
                        style={{
                            marginLeft: 8,
                            padding: 4
                        }}
                    >
                        <Ionicons name={rightIcon} size={20} color="#6B7280" />
                    </TouchableOpacity>
                )}
            </View>

            {error && (
                <Text style={{
                    marginTop: 6,
                    color: '#EF4444',
                    fontSize: 14
                }}>
                    {error}
                </Text>
            )}

            {/* Date Picker */}
            {isDateInput && showDatePicker && (
                <DateTimePicker
                    value={dateValue || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDatePickerChange}
                    minimumDate={new Date()} // Prevent past dates
                />
            )}
        </View>
    );
}
