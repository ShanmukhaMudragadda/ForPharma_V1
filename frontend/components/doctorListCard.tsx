import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface DoctorCardProps {
    name: string;
    designation: string;
    location: string;
    avatar?: string;
    onPress?: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
    name,
    designation,
    location,
    avatar = '👨‍⚕️',
    onPress
}) => {
    return (
        <StyledTouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#F0F0F0',
            }}
        >
            {/* Doctor Avatar */}
            <StyledView
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    backgroundColor: '#E6F3FA',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                }}
            >
                <StyledText style={{ fontSize: 24 }}>
                    {avatar}
                </StyledText>
            </StyledView>

            {/* Doctor Info */}
            <StyledView style={{ flex: 1 }}>
                {/* Doctor Name */}
                <StyledText
                    style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#212529',
                        marginBottom: 4,
                    }}
                >
                    {name}
                </StyledText>

                {/* Doctor Designation */}
                <StyledText
                    style={{
                        fontSize: 14,
                        color: '#0077B6',
                        marginBottom: 4,
                    }}
                >
                    {designation}
                </StyledText>

                {/* Doctor Location */}
                <StyledView
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Ionicons
                        name="location-outline"
                        size={18}
                        color="#6C757D"
                        style={{ marginRight: 4 }}
                    />
                    <StyledText
                        style={{
                            fontSize: 14,
                            color: '#6C757D',
                        }}
                    >
                        {location}
                    </StyledText>
                </StyledView>
            </StyledView>
        </StyledTouchableOpacity>
    );
};

export default DoctorCard;
