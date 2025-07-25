
import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const { width: screenWidth } = Dimensions.get('window');
const drawerWidth = screenWidth * 0.65;

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const router = useRouter();

  const menuItems = [
    { icon: 'home-outline', label: 'Home', route: '/(tabs)/', color: '#0077B6' },
    { icon: 'people-outline', label: 'Doctors', route: '/(tabs)/doctors', color: '#00B4D8' },
    { icon: 'medical-outline', label: 'Chemists', route: '/(tabs)/chemists', color: '#28A745' },
    { icon: 'book-outline', label: 'Drugs', route: '/(tabs)/drugs', color: '#E83E8C' },
    { icon: 'clipboard-outline', label: 'Orders', route: '/(tabs)/orders', color: '#FFA000' },
    { icon: 'stats-chart-outline', label: 'Reports', route: '/(tabs)/reports', color: '#DC3545' },
    { icon: 'calendar-outline', label: 'Tour Plan', route: '/(tabs)/tour-plan', color: '#6F42C1' },
    { icon: 'wallet-outline', label: 'Expenses', route: '/(tabs)/expenses', color: '#17A2B8' },
  ];

  const handleNavigation = (route: string) => {
    router.push(route as any);
    onClose();
  };

  const handleLogout = () => {
    onClose();
    router.replace('/login');
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 flex-row">
        <StyledView
          className="bg-white h-full"
          style={{ width: drawerWidth }}
        >
          {/* Drawer Header */}
          <StyledView style={{
            paddingLeft: 20,
            paddingTop: 14,
            paddingBottom: 24,
            backgroundColor: "#0077B6E6"
          }}>
            <StyledText style={{
              fontSize: 28,
              color: "white",
              fontWeight: 'bold',
              marginBottom: 4
            }}>ForPharma</StyledText>

            <StyledText style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.9)'
            }}>
              Medical Representative Portal
            </StyledText>
          </StyledView>

          {/* Menu Items */}
          <StyledView className="flex-1 py-4">
            {menuItems.map((item, index) => (
              <StyledTouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  backgroundColor: 'transparent'
                }}
                onPress={() => handleNavigation(item.route)}
                activeOpacity={0.7}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: item.color + '20',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={item.color}
                  />
                </View>

                <StyledText style={{
                  fontSize: 16,
                  color: "#212529",
                  marginLeft: 16,
                  fontWeight: '500'
                }}>
                  {item.label}
                </StyledText>
              </StyledTouchableOpacity>
            ))}
          </StyledView>

          {/* Logout Button */}
          <StyledTouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderTopWidth: 1,
              borderTopColor: '#E5E7EB',
              backgroundColor: '#FEF2F2'
            }}
            onPress={handleLogout}
          >
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: '#DC262620',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ionicons name="log-out-outline" size={24} color="#DC2626" />
            </View>
            <StyledText style={{
              fontSize: 16,
              color: "#DC2626",
              marginLeft: 16,
              fontWeight: '600'
            }}>
              Logout
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Overlay */}
        <StyledTouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={onClose}
        />
      </StyledView>
    </Modal>
  );
}