// components/meeting/PromotionalMaterials.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { Drug } from './DrugSearch';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface PromotionalMaterial {
    id: string;
    title: string;
    description: string;
    type: 'pdf' | 'video' | 'brochure' | 'education';
    url: string;
}

interface PromotionalMaterialsProps {
    selectedDrug: Drug | null;
    doctorName: string;
}

export default function PromotionalMaterials({ selectedDrug, doctorName }: PromotionalMaterialsProps) {
    const materials: PromotionalMaterial[] = selectedDrug ? [
        {
            id: '1',
            title: 'Product Brochure',
            description: 'Comprehensive prescribing information',
            type: 'pdf',
            url: 'https://example.com/brochure.pdf'
        },
        {
            id: '2',
            title: 'Clinical Studies',
            description: 'Latest trial data and efficacy results',
            type: 'pdf',
            url: 'https://example.com/studies.pdf'
        },
        {
            id: '3',
            title: 'Video Presentation',
            description: 'Mechanism of action animation',
            type: 'video',
            url: 'https://youtube.com/watch?v=example'
        },
        {
            id: '4',
            title: 'Patient Education',
            description: 'Handouts and counseling guides',
            type: 'education',
            url: 'https://example.com/education.pdf'
        },
    ] : [];

    const openMaterial = async (url: string, title: string) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert('Error', `Cannot open ${title}`);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to open the link');
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'video':
                return 'videocam';
            case 'education':
                return 'people';
            case 'brochure':
                return 'book';
            default:
                return 'document';
        }
    };

    if (!selectedDrug) {
        return (
            <StyledView className="flex-1 items-center justify-center py-12">
                <StyledText className="text-5xl mb-4">🔍</StyledText>
                <StyledText className="text-lg font-semibold text-gray-900 mb-2">
                    Search for a Drug to Promote
                </StyledText>
                <StyledText className="text-sm text-gray-600 text-center px-8">
                    Use the search bar above to find and select a drug for promotion during this meeting.
                </StyledText>
            </StyledView>
        );
    }

    return (
        <StyledView className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <StyledView className="bg-blue-50 px-4 py-4 border-b border-blue-100">
                <StyledText className="text-lg font-semibold text-[#0077B6]">
                    {selectedDrug.name} - Promotional Materials
                </StyledText>
                <StyledText className="text-sm text-blue-700 mt-1">
                    Share these materials with {doctorName}
                </StyledText>
            </StyledView>

            <StyledView className="p-4">
                {materials.map((material) => (
                    <StyledTouchableOpacity
                        key={material.id}
                        className="flex-row items-center p-3 bg-gray-50 rounded-lg mb-3 last:mb-0"
                        onPress={() => openMaterial(material.url, material.title)}
                        activeOpacity={0.7}
                    >
                        <StyledView className="w-10 h-10 bg-[#0077B6] rounded-lg items-center justify-center mr-3">
                            <Ionicons
                                name={getIcon(material.type) as any}
                                size={20}
                                color="white"
                            />
                        </StyledView>
                        <StyledView className="flex-1">
                            <StyledText className="text-sm font-semibold text-gray-900">
                                {material.title}
                            </StyledText>
                            <StyledText className="text-xs text-gray-600">
                                {material.description}
                            </StyledText>
                        </StyledView>
                        <Ionicons name="open-outline" size={16} color="#6C757D" />
                    </StyledTouchableOpacity>
                ))}
            </StyledView>
        </StyledView>
    );
}