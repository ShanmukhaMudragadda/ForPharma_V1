import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert,
    SafeAreaView,
    TextInput,
    Linking,
    Modal
} from 'react-native'
import { styled } from 'nativewind'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledScrollView = styled(ScrollView)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledSafeAreaView = styled(SafeAreaView)
const StyledTextInput = styled(TextInput)

export default function ChemistDetails() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [noteText, setNoteText] = useState('Apollo Pharmacy is one of our key retail partners in the Sarita Vihar area. The owner, Mr. Ramesh, prefers bulk orders and is interested in promotional schemes. Good relationship with nearby doctors. Peak hours are 6-9 PM on weekdays.');
    const [isEditingNote, setIsEditingNote] = useState(false);

    // Mock chemist data - in real app, fetch based on params.id
    const chemistData = {
        name: "Apollo Pharmacy",
        type: "Retail Chemist",
        location: "Sarita Vihar, New Delhi",
        avatar: "💊",
        mobile: "+91 98765 43210",
        email: "apollo.sarita@gmail.com",
        address: "Shop 12, Sarita Vihar Market, Near Metro Station, New Delhi - 110076"
    };

    const relatedDoctors = [
        {
            id: '1',
            name: "Dr. Rajesh Sharma",
            hospital: "Apollo Hospital, Sarita Vihar",
            specialization: "Cardiologist",
            avatar: "👨‍⚕️"
        },
        {
            id: '2',
            name: "Dr. Priya Gupta",
            hospital: "Max Hospital, Lajpat Nagar",
            specialization: "Dermatologist",
            avatar: "👩‍⚕️"
        },
        {
            id: '3',
            name: "Dr. Amit Mehta",
            hospital: "Fortis Hospital, Defence Colony",
            specialization: "Orthopedic",
            avatar: "👨‍⚕️"
        }
    ];

    const orderHistory = [
        {
            id: "ORD-2024-1234",
            amount: "45,000",
            date: "Dec 18, 2024",
            rep: "Rajesh Kumar"
        },
        {
            id: "ORD-2024-1198",
            amount: "32,500",
            date: "Dec 15, 2024",
            rep: "Priya Sharma"
        },
        {
            id: "ORD-2024-1156",
            amount: "28,750",
            date: "Dec 10, 2024",
            rep: "Rajesh Kumar"
        }
    ];

    const visitHistory = [
        {
            rep: "Rajesh Kumar",
            date: "Dec 18, 2024",
            time: "3:15 PM",
            comments: "Discussed new product portfolio and inventory requirements. Chemist showed interest in cardiology medications."
        },
        {
            rep: "Priya Sharma",
            date: "Dec 15, 2024",
            time: "10:30 AM",
            comments: "RCPA conducted for competitor analysis. Good sales performance noted for our diabetes range."
        },
        {
            rep: "Rajesh Kumar",
            date: "Dec 10, 2024",
            time: "2:20 PM",
            comments: "Regular follow-up visit. Provided promotional materials and updated product pricing information."
        }
    ];

    const handleCall = (phoneNumber: any) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleWhatsApp = (phoneNumber: any) => {
        const whatsappUrl = `whatsapp://send?phone=${phoneNumber.replace(/\s/g, '')}`;
        Linking.openURL(whatsappUrl).catch(() => {
            Alert.alert('Error', 'WhatsApp is not installed on your device');
        });
    };

    const handleEmail = (email: any) => {
        Linking.openURL(`mailto:${email}`);
    };

    const handleLocation = () => {
        const address = encodeURIComponent(chemistData.address);
        const url = `https://maps.google.com/?q=${address}`;
        Linking.openURL(url);
    };

    const handleCheckIn = () => {
        Alert.alert('Check In', 'Check-in functionality will be implemented');
    };

    const handleUpdateStatus = () => {
        Alert.alert('Update Status', 'Status update functionality will be implemented');
    };

    const handleStartMeeting = () => {
        Alert.alert('Start Meeting', 'Meeting functionality will be implemented');
    };

    const handleDeleteNote = () => {
        setNoteText('');
        setDeleteModalVisible(false);
        Alert.alert('Success', 'Note deleted successfully');
    };

    const handleSaveNote = () => {
        setIsEditingNote(false);
        Alert.alert('Success', 'Note saved successfully');
    };

    const handleOrderPress = (orderId: any) => {
        router.push({
            pathname: '/order-details',
            params: { orderId }
        });
    };

    const handleDoctorPress = (doctorId: any) => {
        router.push({
            pathname: '/doctor-details',
            params: { id: doctorId }
        });
    };

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>

            <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                <StyledView className='flex-row items-center gap-3'>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                        onPress={() => router.push('/chemists')}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>

                    <StyledText className='text-xl font-semibold text-gray-900'>
                        Chemist Details
                    </StyledText>
                </StyledView>
            </StyledView>




            <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                {/* Chemist Highlights */}
                <StyledView className='bg-white px-5 py-6 mb-2'>
                    <StyledView className='flex-row items-center'>
                        <StyledView className='w-20 h-20 rounded-2xl bg-cyan-50 items-center justify-center mr-4'>
                            <StyledText className='text-4xl'>{chemistData.avatar}</StyledText>
                        </StyledView>
                        <StyledView className='flex-1'>
                            <StyledText className='text-xl font-bold text-gray-900 mb-1'>
                                {chemistData.name}
                            </StyledText>
                            <StyledText className='text-sm text-[#00B4D8] font-medium uppercase tracking-wide mb-1'>
                                {chemistData.type}
                            </StyledText>
                            <StyledView className='flex-row items-center'>
                                <Ionicons name="location-outline" size={14} color="#6C757D" />
                                <StyledText className='text-sm text-gray-600 ml-1'>
                                    {chemistData.location}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>
                </StyledView>

                {/* Contact Information */}
                <StyledView className='bg-white px-5 py-5 mb-2'>
                    <StyledText className='text-lg font-semibold text-gray-900 mb-4'>
                        Contact Information
                    </StyledText>

                    {/* Mobile */}
                    <StyledView className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                        <StyledView className='flex-1'>
                            <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                Mobile
                            </StyledText>
                            <StyledText className='text-sm text-gray-900 font-medium'>
                                {chemistData.mobile}
                            </StyledText>
                        </StyledView>
                        <StyledView className='flex-row gap-2'>
                            <StyledTouchableOpacity
                                className='w-9 h-9 rounded-lg bg-green-500 items-center justify-center'
                                onPress={() => handleCall(chemistData.mobile)}
                            >
                                <Ionicons name="call" size={16} color="#FFFFFF" />
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                className='w-9 h-9 rounded-lg bg-[#25D366] items-center justify-center'
                                onPress={() => handleWhatsApp(chemistData.mobile)}
                            >
                                <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>

                    {/* Email */}
                    <StyledView className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                        <StyledView className='flex-1'>
                            <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                Email
                            </StyledText>
                            <StyledText className='text-sm text-gray-900 font-medium'>
                                {chemistData.email}
                            </StyledText>
                        </StyledView>
                        <StyledTouchableOpacity
                            className='w-9 h-9 rounded-lg bg-[#0077B6] items-center justify-center'
                            onPress={() => handleEmail(chemistData.email)}
                        >
                            <Ionicons name="mail" size={16} color="#FFFFFF" />
                        </StyledTouchableOpacity>
                    </StyledView>

                    {/* Address */}
                    <StyledView className='flex-row justify-between items-center py-3'>
                        <StyledView className='flex-1 pr-2'>
                            <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                Address
                            </StyledText>
                            <StyledText className='text-sm text-gray-900 leading-5'>
                                {chemistData.address}
                            </StyledText>
                        </StyledView>
                        <StyledTouchableOpacity
                            className='w-9 h-9 rounded-lg bg-red-500 items-center justify-center'
                            onPress={handleLocation}
                        >
                            <Ionicons name="location" size={16} color="#FFFFFF" />
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>

                {/* Meeting Actions */}
                <StyledView className='bg-white px-5 py-5 mb-2'>
                    <StyledText className='text-lg font-semibold text-gray-900 mb-4'>
                        Meeting Actions
                    </StyledText>
                    <StyledView className='flex-row gap-3'>
                        <StyledTouchableOpacity
                            className='flex-1 py-3 rounded-lg border border-[#0077B6] items-center'
                            onPress={handleCheckIn}
                        >
                            <Ionicons name="location-outline" size={16} color="#0077B6" />
                            <StyledText className='text-sm font-semibold text-[#0077B6] mt-1'>
                                Check In
                            </StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity
                            className='flex-1 py-3 rounded-lg border border-orange-500 items-center'
                            onPress={handleUpdateStatus}
                        >
                            <Ionicons name="time-outline" size={16} color="#FFA000" />
                            <StyledText className='text-sm font-semibold text-orange-500 mt-1'>
                                Update Status
                            </StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity
                            className='flex-1 py-3 rounded-lg border border-green-500 items-center'
                            onPress={handleStartMeeting}
                        >
                            <Ionicons name="videocam-outline" size={16} color="#28A745" />
                            <StyledText className='text-sm font-semibold text-green-500 mt-1'>
                                Start Meeting
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>

                {/* Related Doctors */}
                <StyledView className='bg-white px-5 py-5 mb-2'>
                    <StyledView className='flex-row justify-between items-center mb-4'>
                        <StyledText className='text-lg font-semibold text-gray-900'>
                            Related Doctors
                        </StyledText>
                        <StyledTouchableOpacity onPress={() => router.push('/doctors')}>
                            <StyledText className='text-sm font-medium text-[#0077B6]'>
                                View All
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    {relatedDoctors.map((doctor) => (
                        <StyledTouchableOpacity
                            key={doctor.id}
                            className='flex-row items-center bg-gray-50 rounded-lg p-3 mb-2'
                            onPress={() => handleDoctorPress(doctor.id)}
                        >
                            <StyledView className='w-10 h-10 rounded-lg bg-blue-50 items-center justify-center mr-3'>
                                <StyledText className='text-lg'>{doctor.avatar}</StyledText>
                            </StyledView>
                            <StyledView className='flex-1'>
                                <StyledText className='text-sm font-semibold text-gray-900'>
                                    {doctor.name}
                                </StyledText>
                                <StyledText className='text-xs text-gray-600'>
                                    {doctor.hospital}
                                </StyledText>
                                <StyledText className='text-xs text-gray-600'>
                                    {doctor.specialization}
                                </StyledText>
                            </StyledView>
                        </StyledTouchableOpacity>
                    ))}
                </StyledView>

                {/* Order History */}
                <StyledView className='bg-white px-5 py-5 mb-2'>
                    <StyledView className='flex-row justify-between items-center mb-4'>
                        <StyledText className='text-lg font-semibold text-gray-900'>
                            Order History
                        </StyledText>
                        <StyledTouchableOpacity onPress={() => router.push('/orders')}>
                            <StyledText className='text-sm font-medium text-[#0077B6]'>
                                View All
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    {orderHistory.map((order, index) => (
                        <StyledTouchableOpacity
                            key={index}
                            className='bg-gray-50 rounded-lg p-3 mb-2'
                            onPress={() => handleOrderPress(order.id)}
                        >
                            <StyledView className='flex-row justify-between items-center mb-2'>
                                <StyledText className='text-sm font-semibold text-[#0077B6]'>
                                    #{order.id}
                                </StyledText>
                                <StyledText className='text-sm font-semibold text-green-600'>
                                    ₹{order.amount}
                                </StyledText>
                            </StyledView>
                            <StyledView className='flex-row justify-between items-center'>
                                <StyledText className='text-xs text-gray-600'>
                                    {order.date}
                                </StyledText>
                                <StyledText className='text-xs text-gray-600'>
                                    by {order.rep}
                                </StyledText>
                            </StyledView>
                        </StyledTouchableOpacity>
                    ))}
                </StyledView>

                {/* Visit History */}
                <StyledView className='bg-white px-5 py-5 mb-2'>
                    <StyledView className='flex-row justify-between items-center mb-4'>
                        <StyledText className='text-lg font-semibold text-gray-900'>
                            Visit History
                        </StyledText>
                        <StyledTouchableOpacity>
                            <StyledText className='text-sm font-medium text-[#0077B6]'>
                                View All
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    {visitHistory.map((visit, index) => (
                        <StyledView key={index} className='bg-gray-50 rounded-lg p-3 mb-2'>
                            <StyledView className='flex-row justify-between items-center mb-2'>
                                <StyledText className='text-sm font-semibold text-[#0077B6]'>
                                    {visit.rep}
                                </StyledText>
                                <StyledText className='text-xs text-gray-600'>
                                    {visit.date} • {visit.time}
                                </StyledText>
                            </StyledView>
                            <StyledText className='text-sm text-gray-900 leading-5'>
                                {visit.comments}
                            </StyledText>
                        </StyledView>
                    ))}
                </StyledView>

                {/* Notes */}
                <StyledView className='bg-white px-5 py-5 mb-20'>
                    <StyledView className='flex-row justify-between items-center mb-4'>
                        <StyledText className='text-lg font-semibold text-gray-900'>
                            Notes
                        </StyledText>
                        <StyledView className='flex-row gap-2'>
                            {!noteText && (
                                <StyledTouchableOpacity
                                    className='px-3 py-1.5 rounded-md border border-green-500'
                                    onPress={() => setIsEditingNote(true)}
                                >
                                    <StyledText className='text-xs font-medium text-green-500'>
                                        Create
                                    </StyledText>
                                </StyledTouchableOpacity>
                            )}
                            {noteText && !isEditingNote && (
                                <>
                                    <StyledTouchableOpacity
                                        className='px-3 py-1.5 rounded-md border border-[#0077B6]'
                                        onPress={() => setIsEditingNote(true)}
                                    >
                                        <StyledText className='text-xs font-medium text-[#0077B6]'>
                                            Edit
                                        </StyledText>
                                    </StyledTouchableOpacity>
                                    <StyledTouchableOpacity
                                        className='px-3 py-1.5 rounded-md border border-red-500'
                                        onPress={() => setDeleteModalVisible(true)}
                                    >
                                        <StyledText className='text-xs font-medium text-red-500'>
                                            Delete
                                        </StyledText>
                                    </StyledTouchableOpacity>
                                </>
                            )}
                            {isEditingNote && (
                                <StyledTouchableOpacity
                                    className='px-3 py-1.5 rounded-md bg-[#0077B6]'
                                    onPress={handleSaveNote}
                                >
                                    <StyledText className='text-xs font-medium text-white'>
                                        Save
                                    </StyledText>
                                </StyledTouchableOpacity>
                            )}
                        </StyledView>
                    </StyledView>

                    <StyledView className='bg-gray-50 rounded-lg p-3 min-h-[80px]'>
                        {isEditingNote ? (
                            <StyledTextInput
                                className='text-sm text-gray-900 leading-5'
                                value={noteText}
                                onChangeText={setNoteText}
                                multiline
                                placeholder="Add your notes here..."
                                autoFocus
                            />
                        ) : (
                            noteText ? (
                                <StyledText className='text-sm text-gray-900 leading-5'>
                                    {noteText}
                                </StyledText>
                            ) : (
                                <StyledText className='text-sm text-gray-600 italic text-center py-6'>
                                    No notes available. Click "Create" to add a note.
                                </StyledText>
                            )
                        )}
                    </StyledView>
                </StyledView>
            </StyledScrollView>

            {/* Delete Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <StyledView className='flex-1 bg-black/50 justify-center items-center px-5'>
                    <StyledView className='bg-white rounded-2xl p-6 w-full max-w-sm'>
                        <StyledText className='text-lg font-semibold text-gray-900 text-center mb-2'>
                            Delete Note
                        </StyledText>
                        <StyledText className='text-sm text-gray-600 text-center mb-5 leading-5'>
                            Are you sure you want to delete this note? This action cannot be undone.
                        </StyledText>
                        <StyledView className='flex-row gap-3'>
                            <StyledTouchableOpacity
                                className='flex-1 py-3 rounded-lg bg-gray-100 items-center'
                                onPress={() => setDeleteModalVisible(false)}
                            >
                                <StyledText className='text-sm font-semibold text-gray-700'>
                                    Cancel
                                </StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                className='flex-1 py-3 rounded-lg bg-red-500 items-center'
                                onPress={handleDeleteNote}
                            >
                                <StyledText className='text-sm font-semibold text-white'>
                                    Delete
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </Modal>
        </StyledSafeAreaView>
    );
}