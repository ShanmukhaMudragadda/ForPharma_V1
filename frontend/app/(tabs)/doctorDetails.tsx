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

export default function DoctorDetails() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [noteText, setNoteText] = useState('Dr. Sharma prefers morning meetings. He is particularly interested in evidence-based medicine and clinical trial data. Respond well to digital presentations rather than printed materials.');
    const [isEditingNote, setIsEditingNote] = useState(false);

    // Mock doctor data - in real app, fetch based on params.id
    const doctorData = {
        name: "Dr. Rajesh Sharma",
        designation: "Cardiologist",
        hospital: "Apollo Hospital",
        location: "New Delhi, Delhi",
        avatar: "👨‍⚕️",
        mobile: "+91 98765 43210",
        email: "dr.sharma@apollo.com",
        hospitalAddress: "Apollo Hospital, Mathura Road, Sarita Vihar, New Delhi - 110076",
        qualification: "MBBS, MD",
        experience: "15 Years",
        specialization: "Cardiology",
        department: "Cardiology",
        description: "Dr. Rajesh Sharma is a renowned cardiologist with over 15 years of experience in treating complex heart conditions. He specializes in interventional cardiology and has performed over 2000 successful procedures."
    };

    const scheduleData = [
        {
            day: "Monday",
            hospital: "Apollo Hospital",
            location: "Sarita Vihar, Delhi",
            timing: "10:00 AM - 2:00 PM"
        },
        {
            day: "Wednesday",
            hospital: "Max Hospital",
            location: "Lajpat Nagar, Delhi",
            timing: "3:00 PM - 6:00 PM"
        },
        {
            day: "Friday",
            hospital: "Apollo Hospital",
            location: "Sarita Vihar, Delhi",
            timing: "9:00 AM - 1:00 PM"
        }
    ];

    const relatedChemists = [
        {
            id: '1',
            name: "Apollo Pharmacy",
            address: "Shop 12, Sarita Vihar Market, New Delhi - 110076"
        },
        {
            id: '2',
            name: "MedPlus Pharmacy",
            address: "Block A, Lajpat Nagar, New Delhi - 110024"
        },
        {
            id: '3',
            name: "Guardian Pharmacy",
            address: "Main Market, Defence Colony, New Delhi - 110024"
        }
    ];

    const visitHistory = [
        {
            rep: "Rajesh Kumar",
            date: "Dec 18, 2024",
            time: "2:30 PM",
            comments: "Discussed new cardiac medication line. Doctor showed interest in the trial results. Follow-up scheduled for next week."
        },
        {
            rep: "Priya Sharma",
            date: "Dec 15, 2024",
            time: "11:15 AM",
            comments: "Delivered product samples and brochures. Doctor requested more information about dosage guidelines."
        },
        {
            rep: "Rajesh Kumar",
            date: "Dec 10, 2024",
            time: "4:45 PM",
            comments: "Initial meeting to introduce new product portfolio. Positive reception from doctor."
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
        const address = encodeURIComponent(doctorData.hospitalAddress);
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

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>


            <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                <StyledView className='flex-row items-center gap-3'>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                        onPress={() => router.push('/doctors')}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>

                    <StyledText className='text-xl font-semibold text-gray-900'>
                        Doctor Details
                    </StyledText>
                </StyledView>
            </StyledView>




            <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                {/* Doctor Highlights */}
                <StyledView className='bg-white px-5 py-6 mb-2'>
                    <StyledView className='flex-row items-center'>
                        <StyledView className='w-20 h-20 rounded-2xl bg-blue-50 items-center justify-center mr-4'>
                            <StyledText className='text-4xl'>{doctorData.avatar}</StyledText>
                        </StyledView>
                        <StyledView className='flex-1'>
                            <StyledText className='text-xl font-bold text-gray-900 mb-1'>
                                {doctorData.name}
                            </StyledText>
                            <StyledText className='text-base text-[#0077B6] font-medium mb-1'>
                                {doctorData.designation} | {doctorData.hospital}
                            </StyledText>
                            <StyledView className='flex-row items-center'>
                                <Ionicons name="location-outline" size={14} color="#6C757D" />
                                <StyledText className='text-sm text-gray-600 ml-1'>
                                    {doctorData.location}
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
                                {doctorData.mobile}
                            </StyledText>
                        </StyledView>
                        <StyledView className='flex-row gap-2'>
                            <StyledTouchableOpacity
                                className='w-9 h-9 rounded-lg bg-green-500 items-center justify-center'
                                onPress={() => handleCall(doctorData.mobile)}
                            >
                                <Ionicons name="call" size={16} color="#FFFFFF" />
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                className='w-9 h-9 rounded-lg bg-[#25D366] items-center justify-center'
                                onPress={() => handleWhatsApp(doctorData.mobile)}
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
                                {doctorData.email}
                            </StyledText>
                        </StyledView>
                        <StyledTouchableOpacity
                            className='w-9 h-9 rounded-lg bg-[#0077B6] items-center justify-center'
                            onPress={() => handleEmail(doctorData.email)}
                        >
                            <Ionicons name="mail" size={16} color="#FFFFFF" />
                        </StyledTouchableOpacity>
                    </StyledView>

                    {/* Hospital Address */}
                    <StyledView className='flex-row justify-between items-center py-3'>
                        <StyledView className='flex-1 pr-2'>
                            <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                Hospital Address
                            </StyledText>
                            <StyledText className='text-sm text-gray-900 leading-5'>
                                {doctorData.hospitalAddress}
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

                {/* Additional Information */}
                <StyledView className='bg-white px-5 py-5 mb-2'>
                    <StyledText className='text-lg font-semibold text-gray-900 mb-4'>
                        Additional Information
                    </StyledText>

                    <StyledView className='flex-row flex-wrap -mx-2'>
                        <StyledView className='w-1/2 px-2 mb-4'>
                            <StyledView className='bg-gray-50 rounded-lg p-3'>
                                <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                    Qualification
                                </StyledText>
                                <StyledText className='text-sm text-gray-900 font-semibold'>
                                    {doctorData.qualification}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledView className='w-1/2 px-2 mb-4'>
                            <StyledView className='bg-gray-50 rounded-lg p-3'>
                                <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                    Experience
                                </StyledText>
                                <StyledText className='text-sm text-gray-900 font-semibold'>
                                    {doctorData.experience}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledView className='w-1/2 px-2 mb-4'>
                            <StyledView className='bg-gray-50 rounded-lg p-3'>
                                <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                    Specialization
                                </StyledText>
                                <StyledText className='text-sm text-gray-900 font-semibold'>
                                    {doctorData.specialization}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledView className='w-1/2 px-2 mb-4'>
                            <StyledView className='bg-gray-50 rounded-lg p-3'>
                                <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                    Department
                                </StyledText>
                                <StyledText className='text-sm text-gray-900 font-semibold'>
                                    {doctorData.department}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>

                    <StyledView className='bg-gray-50 rounded-lg p-3'>
                        <StyledText className='text-xs uppercase text-gray-600 font-medium mb-2'>
                            Description
                        </StyledText>
                        <StyledText className='text-sm text-gray-900 leading-5'>
                            {doctorData.description}
                        </StyledText>
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

                {/* Consultation Schedule */}
                <StyledView className='bg-white px-5 py-5 mb-2'>
                    <StyledText className='text-lg font-semibold text-gray-900 mb-4'>
                        Consultation Schedule
                    </StyledText>

                    {scheduleData.map((schedule, index) => (
                        <StyledView key={index} className='mb-3 pb-3 border-b border-gray-100 last:border-0'>
                            <StyledView className='flex-row'>
                                <StyledView className='w-24'>
                                    <StyledText className='text-sm font-semibold text-gray-900'>
                                        {schedule.day}
                                    </StyledText>
                                </StyledView>
                                <StyledView className='flex-1'>
                                    <StyledText className='text-sm font-semibold text-gray-900'>
                                        {schedule.hospital}
                                    </StyledText>
                                    <StyledText className='text-xs text-gray-600'>
                                        {schedule.location}
                                    </StyledText>
                                </StyledView>
                                <StyledView>
                                    <StyledText className='text-sm font-medium text-[#0077B6]'>
                                        {schedule.timing}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>
                    ))}
                </StyledView>

                {/* Related Chemists */}
                <StyledView className='bg-white px-5 py-5 mb-2'>
                    <StyledView className='flex-row justify-between items-center mb-4'>
                        <StyledText className='text-lg font-semibold text-gray-900'>
                            Related Chemists
                        </StyledText>
                        <StyledTouchableOpacity onPress={() => router.push('/chemists')}>
                            <StyledText className='text-sm font-medium text-[#0077B6]'>
                                View All
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    {relatedChemists.map((chemist) => (
                        <StyledTouchableOpacity
                            key={chemist.id}
                            className='flex-row items-center bg-gray-50 rounded-lg p-3 mb-2'
                            onPress={() => router.push(`/chemists/${chemist.id}`)}
                        >
                            <StyledView className='w-10 h-10 rounded-lg bg-blue-50 items-center justify-center mr-3'>
                                <StyledText className='text-lg'>💊</StyledText>
                            </StyledView>
                            <StyledView className='flex-1'>
                                <StyledText className='text-sm font-semibold text-gray-900'>
                                    {chemist.name}
                                </StyledText>
                                <StyledText className='text-xs text-gray-600 leading-4'>
                                    {chemist.address}
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

