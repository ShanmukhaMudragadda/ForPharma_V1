import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    Dimensions
} from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { FilterSection, ActiveFilter } from '../types/drug';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledModal = styled(Modal);

const { width } = Dimensions.get('window');

interface FilterSidebarProps {
    visible: boolean;
    onClose: () => void;
    filterSections: FilterSection[];
    onFilterToggle: (sectionId: string, optionId: string) => void;
    onClearFilters: () => void;
    onApplyFilters: () => void;
    activeFilters: ActiveFilter[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
    visible,
    onClose,
    filterSections,
    onFilterToggle,
    onClearFilters,
    onApplyFilters,
    activeFilters
}) => {
    const handleApplyFilters = () => {
        onApplyFilters();
        onClose();
    };

    const getCheckedFiltersCount = () => {
        return filterSections.reduce((total, section) => {
            return total + section.options.filter(option => option.checked).length;
        }, 0);
    };

    const getSectionIcon = (sectionId: string) => {
        switch (sectionId) {
            case 'category':
                return 'albums-outline';
            case 'manufacturer':
                return 'business-outline';
            case 'dosage':
                return 'medical-outline';
            default:
                return 'options-outline';
        }
    };

    return (
        <StyledModal
            visible={visible}
            animationType="slide"
            presentationStyle="overFullScreen"
            transparent={true}
            onRequestClose={onClose}
        >
            <StyledView className="flex-1 bg-black/50">
                {/* Overlay */}
                <StyledTouchableOpacity
                    className="flex-1"
                    activeOpacity={1}
                    onPress={onClose}
                />

                {/* Sidebar */}
                <StyledView
                    className="bg-white rounded-t-3xl"
                    style={{ width: width, maxHeight: '80%' }}
                >
                    {/* Header */}
                    <StyledView className="flex-row items-center justify-between p-6 border-b border-gray-100">
                        <StyledView className="flex-row items-center">
                            <Ionicons name="options-outline" size={24} color="#0077B6" />
                            <StyledText className="text-xl font-semibold text-gray-900 ml-3">
                                Filters
                            </StyledText>
                            {getCheckedFiltersCount() > 0 && (
                                <StyledView className="bg-primary-500 rounded-full px-2 py-0.5 ml-2">
                                    <StyledText className="text-white text-xs font-semibold">
                                        {getCheckedFiltersCount()}
                                    </StyledText>
                                </StyledView>
                            )}
                        </StyledView>

                        <StyledTouchableOpacity
                            className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                            onPress={onClose}
                        >
                            <Ionicons name="close" size={20} color="#6B7280" />
                        </StyledTouchableOpacity>
                    </StyledView>

                    {/* Filter Content */}
                    <StyledScrollView
                        className="flex-1 px-6"
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
                        {filterSections.map((section, sectionIndex) => (
                            <StyledView key={section.id} className={sectionIndex === 0 ? "pt-4" : "pt-6"}>
                                {/* Section Header */}
                                <StyledView className="flex-row items-center mb-4">
                                    <Ionicons
                                        name={getSectionIcon(section.id) as any}
                                        size={20}
                                        color="#0077B6"
                                    />
                                    <StyledText className="text-lg font-semibold text-gray-900 ml-3">
                                        {section.title}
                                    </StyledText>
                                </StyledView>

                                {/* Section Options */}
                                <StyledView className="space-y-3">
                                    {section.options.map((option) => (
                                        <StyledTouchableOpacity
                                            key={option.id}
                                            className="flex-row items-center py-3 px-4 rounded-lg border border-gray-100 bg-gray-50/50 active:bg-gray-100"
                                            onPress={() => onFilterToggle(section.id, option.id)}
                                            activeOpacity={0.7}
                                        >
                                            {/* Custom Checkbox */}
                                            <StyledView className={`w-5 h-5 rounded border-2 items-center justify-center mr-4 ${option.checked
                                                ? 'bg-primary-500 border-primary-500'
                                                : 'border-gray-300 bg-white'
                                                }`}>
                                                {option.checked && (
                                                    <Ionicons name="checkmark" size={14} color="white" />
                                                )}
                                            </StyledView>

                                            {/* Option Label */}
                                            <StyledView className="flex-1">
                                                <StyledText className={`text-base ${option.checked ? 'text-gray-900 font-medium' : 'text-gray-700'
                                                    }`}>
                                                    {option.label}
                                                </StyledText>
                                                {option.count && (
                                                    <StyledText className="text-sm text-gray-500 mt-0.5">
                                                        {option.count} items
                                                    </StyledText>
                                                )}
                                            </StyledView>

                                            {/* Check indicator */}
                                            {option.checked && (
                                                <StyledView className="w-2 h-2 bg-primary-500 rounded-full" />
                                            )}
                                        </StyledTouchableOpacity>
                                    ))}
                                </StyledView>

                                {/* Section Divider */}
                                {sectionIndex < filterSections.length - 1 && (
                                    <StyledView className="h-px bg-gray-200 mt-6" />
                                )}
                            </StyledView>
                        ))}

                        {/* Bottom Padding */}
                        <StyledView className="h-6" />
                    </StyledScrollView>

                    {/* Footer Actions */}
                    <StyledView className="p-6 border-t border-gray-100 bg-white">
                        <StyledView className="flex-row space-x-3">
                            {/* Clear Filters Button */}
                            <StyledTouchableOpacity
                                className="flex-1 py-3 px-4 bg-gray-100 rounded-lg items-center justify-center active:bg-gray-200"
                                onPress={onClearFilters}
                                disabled={getCheckedFiltersCount() === 0}
                            >
                                <StyledText className={`font-semibold ${getCheckedFiltersCount() === 0 ? 'text-gray-400' : 'text-gray-700'
                                    }`}>
                                    Clear All
                                </StyledText>
                            </StyledTouchableOpacity>

                            {/* Apply Filters Button */}
                            <StyledTouchableOpacity
                                className="flex-1 py-3 px-4 bg-primary-500 rounded-lg items-center justify-center active:bg-primary-600 flex-row"
                                onPress={handleApplyFilters}
                            >
                                <StyledText className="text-white font-semibold mr-2">
                                    Apply Filters
                                </StyledText>
                                {getCheckedFiltersCount() > 0 && (
                                    <StyledView className="bg-white/20 rounded-full px-2 py-0.5">
                                        <StyledText className="text-white text-xs font-semibold">
                                            {getCheckedFiltersCount()}
                                        </StyledText>
                                    </StyledView>
                                )}
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledModal>
    );
};