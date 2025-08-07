import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface RCPACardData {
  id: string;
  chemistName: string;
  observationDate: string;
  totalPrescriptions: number;
}

interface RCPACardProps {
  data: RCPACardData;
  onPress?: (rcpaId: string) => void;
}

export default function RCPACard({ data, onPress }: RCPACardProps): JSX.Element {
  const handlePress = (): void => {
    if (onPress) {
      onPress(data.id);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <StyledTouchableOpacity
      onPress={handlePress}
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
        borderWidth: 1,
        borderColor: '#F0F0F0',
      }}
    >
      {/* RCPA Header */}
      <StyledView style={{
        marginBottom: 8
      }}>
        {/* RCPA ID */}
        <StyledText style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#0077B6'
        }}>
          #{data.id}
        </StyledText>
      </StyledView>

      {/* Chemist Name with Contact Icon */}
      <StyledView style={{ 
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Ionicons 
          name="business-outline" 
          size={20} 
          color="#6C757D" 
          style={{ marginRight: 8 }}
        />
        <StyledText style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#212529',
          flex: 1
        }}>
          {data.chemistName}
        </StyledText>
      </StyledView>

      {/* RCPA Details Grid */}
      <StyledView style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
      }}>
        {/* Observation Date */}
        <StyledView>
          <StyledText style={{
            fontSize: 12,
            color: '#6C757D',
            marginBottom: 2,
            textTransform: 'uppercase',
            fontWeight: '500'
          }}>
            OBSERVATION DATE
          </StyledText>
          <StyledText style={{
            fontSize: 14,
            color: '#212529',
            fontWeight: '500'
          }}>
            {formatDate(data.observationDate)}
          </StyledText>
        </StyledView>

        {/* Total Prescriptions */}
        <StyledView>
          <StyledText style={{
            fontSize: 12,
            color: '#6C757D',
            marginBottom: 2,
            textTransform: 'uppercase',
            fontWeight: '500'
          }}>
            TOTAL PRESCRIPTIONS
          </StyledText>
          <StyledText style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#212529'
          }}>
            {data.totalPrescriptions}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
}