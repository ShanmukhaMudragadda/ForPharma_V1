// components/drugListCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { DrugItem } from '../types/drug';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface DrugCardProps {
    drug: DrugItem;
    onPress: (drug: DrugItem) => void;
}

export const DrugCard: React.FC<DrugCardProps> = ({ drug, onPress }) => {
    return (
        <StyledTouchableOpacity
            className='bg-white rounded-xl p-4 mb-3 border border-gray-100'
            onPress={() => onPress(drug)}
            activeOpacity={0.7}
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
            }}
        >
            <StyledView className='flex-row items-center justify-center'>
                {/* Drug Icon - Simple design matching HTML */}
                <StyledView className=' rounded-xl bg-[#E6F3FA] items-center justify-center mr-4 flex-shrink-0 border-2 '
                    style={{
                        width: 66,
                        height: 66,
                        borderColor: '#E6F3FA'
                    }}>
                    <StyledText style={{ fontSize: 30 }}>💊</StyledText>
                </StyledView>

                {/* Drug Info Container */}
                <StyledView className='flex-1'>
                    {/* Header Row: Name + Dosage and Availability Badge */}
                    <StyledView className='flex-row items-start justify-between mb-1.5'>
                        {/* <StyledView className='flex-1 mr-2'>
                            <StyledView className='flex-row items-center'>
                                <StyledText
                                    className='text-base font-semibold text-gray-900'
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {drug.name}
                                </StyledText>
                                <StyledText
                                    className='text-sm text-[#0077B6] font-medium ml-2'
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {drug.dosageForms}
                                </StyledText>
                            </StyledView>
                        </StyledView> */}

                        {/* Availability Badge - Matching HTML style
                        <StyledView className={`px-2 py-1 rounded-xl ${drug.isAvailable ? 'bg-[#E8F5E9]' : 'bg-[#F8D7DA]'}`}>
                            <StyledText className={`text-xs font-semibold uppercase tracking-wide ${drug.isAvailable ? 'text-[#28A745]' : 'text-[#DC3545]'}`}>
                                {drug.isAvailable ? 'IN STOCK' : 'OUT OF STOCK'}
                            </StyledText>
                        </StyledView> */}

                        <StyledView className='flex-1 flex-shrink mr-2'>
                            {/* Drug Name Container */}
                            <StyledView className='flex-row flex-wrap items-center'>
                                <StyledText
                                    className='text-base font-semibold text-gray-900 mr-3'
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={{ flexShrink: 1 }}
                                >
                                    {drug.name}
                                </StyledText>

                                {/* Dosage Form - Will wrap to next line if needed */}
                                <StyledText
                                    className='text-sm text-[#0077B6] font-medium'
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={{ flexShrink: 0 }}
                                >
                                    {drug.dosageForms}
                                </StyledText>
                            </StyledView>
                        </StyledView>

                        {/* Availability Badge - Fixed Position */}

                        <StyledView
                            className={`px-2 py-1 rounded-xl flex-shrink-0`}
                            style={{
                                backgroundColor: drug.isAvailable ? '#E8F5E9' : '#FFEBEE'
                            }}
                        >
                            <StyledText
                                className='text-xs font-semibold uppercase tracking-wide'
                                style={{
                                    color: drug.isAvailable ? '#2E7D32' : '#C62828'
                                }}
                            >
                                {drug.isAvailable ? 'IN STOCK' : 'OUT OF STOCK'}
                            </StyledText>
                        </StyledView>

                    </StyledView>



                    {/* Composition */}
                    <StyledText
                        className='text-sm  mb-1 leading-5'
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            color: "#9E9E9E"
                        }}
                    >
                        {drug.composition || 'Composition not available'}
                    </StyledText>

                    {/* Manufacturer */}
                    <StyledText
                        className='text-xs font-medium mb-2'
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            color: "#9E9E9E"
                        }}
                    >
                        {drug.manufacturer}
                    </StyledText>

                    {/* Bottom Meta Row - Matching HTML border and layout */}
                    <StyledView className='flex-row items-center justify-between pt-2 '
                        style={{ borderTopColor: '#F5F5F5', borderTopWidth: 2 }}>
                        {/* Category Badge - Matching HTML colors */}
                        <StyledView className='px-2 py-1 rounded-md'
                            style={{ backgroundColor: '#F8F9FA' }}>
                            <StyledText
                                className='text-xs font-medium'
                                style={{ color: "#6C757D" }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {drug.category || 'General'}
                            </StyledText>
                        </StyledView>

                        {/* Price - Matching HTML green color */}
                        <StyledText
                            className='text-sm font-semibold '
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                color: '#2E7D32'
                            }}
                        >
                            {drug.price}
                        </StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledTouchableOpacity>
    );
};