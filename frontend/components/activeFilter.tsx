import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { ActiveFilter } from '../types/drug';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

interface ActiveFiltersProps {
    filters: ActiveFilter[];
    onRemoveFilter: (filter: ActiveFilter) => void;
    visible: boolean;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
    filters,
    onRemoveFilter,
    visible
}) => {
    if (!visible || filters.length === 0) {
        return null;
    }

    const getSectionDisplayName = (sectionId: string) => {
        switch (sectionId) {
            case 'category':
                return 'Category';
            case 'manufacturer':
                return 'Manufacturer';
            case 'dosage':
                return 'Dosage';
            default:
                return sectionId;
        }
    };

    const getSectionColor = (sectionId: string) => {
        switch (sectionId) {
            case 'category':
                return {
                    bg: 'bg-blue-50',
                    text: 'text-blue-700',
                    border: 'border-blue-200'
                };
            case 'manufacturer':
                return {
                    bg: 'bg-green-50',
                    text: 'text-green-700',
                    border: 'border-green-200'
                };
            case 'dosage':
                return {
                    bg: 'bg-purple-50',
                    text: 'text-purple-700',
                    border: 'border-purple-200'
                };
            default:
                return {
                    bg: 'bg-gray-50',
                    text: 'text-gray-700',
                    border: 'border-gray-200'
                };
        }
    };

    return (
        <StyledView className="bg-white border-b border-gray-100 py-3">
            <StyledView className="px-4 mb-2">
                <StyledText className="text-sm font-medium text-gray-600">
                    Active Filters ({filters.length})
                </StyledText>
            </StyledView>

            <StyledScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 32 }}
                className="flex-row"
            >
                {filters.map((filter, index) => {
                    const colors = getSectionColor(filter.sectionId);

                    return (
                        <StyledView
                            key={`${filter.sectionId}-${filter.optionId}`}
                            className={`flex-row items-center mr-2 px-3 py-2 rounded-full border ${colors.bg} ${colors.border}`}
                        >
                            {/* Filter Label */}
                            <StyledView className="flex-row items-center">
                                <StyledText className={`text-xs font-medium ${colors.text}`}>
                                    {getSectionDisplayName(filter.sectionId)}:
                                </StyledText>
                                <StyledText className={`text-xs font-semibold ml-1 ${colors.text}`}>
                                    {filter.label}
                                </StyledText>
                            </StyledView>

                            {/* Remove Button */}
                            <StyledTouchableOpacity
                                className="ml-2 w-4 h-4 rounded-full bg-white/80 items-center justify-center active:bg-white"
                                onPress={() => onRemoveFilter(filter)}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                                <Ionicons
                                    name="close"
                                    size={10}
                                    color={colors.text.includes('blue') ? '#1D4ED8' :
                                        colors.text.includes('green') ? '#059669' :
                                            colors.text.includes('purple') ? '#7C3AED' : '#374151'}
                                />
                            </StyledTouchableOpacity>
                        </StyledView>
                    );
                })}
            </StyledScrollView>
        </StyledView>
    );
};