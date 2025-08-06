import React, { useState, useEffect } from 'react'
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
    Modal,
    ActivityIndicator
} from 'react-native'
import { styled } from 'nativewind'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import chemistService from '../../services/chemistService'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledScrollView = styled(ScrollView)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledSafeAreaView = styled(SafeAreaView)
const StyledTextInput = styled(TextInput)

export default function ChemistDetails() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const chemistId = params.chemistId as string;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [chemistData, setChemistData] = useState<any>(null);
    const [relatedDoctors, setRelatedDoctors] = useState<any[]>([]);
    const [notes, setNotes] = useState<any[]>([]);
    const [interactions, setInteractions] = useState<any[]>([]);

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [isCreatingNote, setIsCreatingNote] = useState(false);

    // Fetch all chemist data
    const fetchChemistData = async () => {
        try {
            setError(null);

            // Fetch all data in parallel
            const [chemistDetails, chemistNotes, chemistInteractions, relatedDoctorsData] = await Promise.all([
                chemistService.getChemistDetails(chemistId),
                chemistService.getChemistNotes(chemistId),
                chemistService.getChemistInteractions(chemistId),
                chemistService.getDoctorsForChemist(chemistId)
            ]);

            setChemistData(chemistDetails);
            setNotes(chemistNotes.notes || []);
            setInteractions(chemistInteractions.interactions || []);
            setRelatedDoctors(relatedDoctorsData.doctors || []);

            // Set the first note as current note if exists
            if (chemistNotes.notes && chemistNotes.notes.length > 0) {
                setNoteText(chemistNotes.notes[0].content);
                setSelectedNoteId(chemistNotes.notes[0].id);
            }
        } catch (err: any) {
            console.error('Error fetching chemist data:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch chemist details');
            Alert.alert('Error', 'Failed to load chemist details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (chemistId) {
            fetchChemistData();
        }
    }, [chemistId]);

    const handleCall = (phoneNumber: string) => {
        if (phoneNumber) {
            Linking.openURL(`tel:${phoneNumber}`);
        } else {
            Alert.alert('Error', 'Phone number not available');
        }
    };

    const handleWhatsApp = (phoneNumber: string) => {
        if (phoneNumber) {
            const whatsappUrl = `whatsapp://send?phone=${phoneNumber.replace(/\s/g, '')}`;
            Linking.openURL(whatsappUrl).catch(() => {
                Alert.alert('Error', 'WhatsApp is not installed on your device');
            });
        } else {
            Alert.alert('Error', 'Phone number not available');
        }
    };

    const handleEmail = (email: string) => {
        if (email) {
            Linking.openURL(`mailto:${email}`);
        } else {
            Alert.alert('Error', 'Email not available');
        }
    };

    const handleLocation = () => {
        if (chemistData) {
            const address = `${chemistData.address}, ${chemistData.city}, ${chemistData.state} - ${chemistData.pincode}`;
            const encodedAddress = encodeURIComponent(address);
            const url = `https://maps.google.com/?q=${encodedAddress}`;
            Linking.openURL(url);
        }
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

    const handleSaveNote = async () => {
        try {
            if (isCreatingNote) {
                // Create new note
                const newNote = await chemistService.createChemistNote(chemistId, noteText);
                setNotes([newNote, ...notes]);
                setSelectedNoteId(newNote.id);
                Alert.alert('Success', 'Note created successfully');
            } else if (selectedNoteId) {
                // Update existing note
                await chemistService.updateChemistNote(selectedNoteId, noteText);
                setNotes(notes.map(note =>
                    note.id === selectedNoteId ? { ...note, content: noteText } : note
                ));
                Alert.alert('Success', 'Note updated successfully');
            }
            setIsEditingNote(false);
            setIsCreatingNote(false);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to save note');
        }
    };

    const handleDeleteNote = async () => {
        try {
            if (selectedNoteId) {
                await chemistService.deleteChemistNote(selectedNoteId);
                setNotes(notes.filter(note => note.id !== selectedNoteId));
                setNoteText('');
                setSelectedNoteId(null);
                setDeleteModalVisible(false);
                Alert.alert('Success', 'Note deleted successfully');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to delete note');
        }
    };

    const handleCreateNote = () => {
        setNoteText('');
        setSelectedNoteId(null);
        setIsCreatingNote(true);
        setIsEditingNote(true);
    };

    const handleOrderPress = (orderId: any) => {
        router.push({
            pathname: '/order-details',
            params: { orderId }
        });
    };

    const handleDoctorPress = (doctorId: any) => {
        router.push(`/doctorDetails?doctorId=${doctorId}`);
    };

    // Loading state
    if (loading) {
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
                <StyledView className='flex-1 items-center justify-center'>
                    <ActivityIndicator size="large" color="#00B4D8" />
                    <StyledText className='text-gray-600 mt-2'>Loading chemist details...</StyledText>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // Error state
    if (error || !chemistData) {
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
                <StyledView className='flex-1 items-center justify-center px-5'>
                    <Ionicons name="alert-circle-outline" size={60} color="#DC3545" />
                    <StyledText className='text-gray-900 text-lg font-medium mt-3'>Error Loading Details</StyledText>
                    <StyledText className='text-gray-600 text-center mt-2'>{error || 'Chemist not found'}</StyledText>
                    <StyledTouchableOpacity
                        className='bg-[#00B4D8] px-6 py-3 rounded-lg mt-5'
                        onPress={fetchChemistData}
                    >
                        <StyledText className='text-white font-medium'>Retry</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledSafeAreaView>
        );
    }

    // Format full address
    const fullAddress = `${chemistData.address}, ${chemistData.city}, ${chemistData.state} - ${chemistData.pincode}`;

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
                            <StyledText className='text-4xl'>💊</StyledText>
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
                                    {chemistData.city}, {chemistData.state}
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
                    {chemistData.phone && (
                        <StyledView className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                            <StyledView className='flex-1'>
                                <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                    Mobile
                                </StyledText>
                                <StyledText className='text-sm text-gray-900 font-medium'>
                                    {chemistData.phone}
                                </StyledText>
                            </StyledView>
                            <StyledView className='flex-row gap-2'>
                                <StyledTouchableOpacity
                                    className='w-9 h-9 rounded-lg bg-green-500 items-center justify-center'
                                    onPress={() => handleCall(chemistData.phone)}
                                >
                                    <Ionicons name="call" size={16} color="#FFFFFF" />
                                </StyledTouchableOpacity>
                                <StyledTouchableOpacity
                                    className='w-9 h-9 rounded-lg bg-[#25D366] items-center justify-center'
                                    onPress={() => handleWhatsApp(chemistData.phone)}
                                >
                                    <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
                                </StyledTouchableOpacity>
                            </StyledView>
                        </StyledView>
                    )}

                    {/* Email */}
                    {chemistData.email && (
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
                    )}

                    {/* Address */}
                    <StyledView className='flex-row justify-between items-center py-3'>
                        <StyledView className='flex-1 pr-2'>
                            <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                Address
                            </StyledText>
                            <StyledText className='text-sm text-gray-900 leading-5'>
                                {fullAddress}
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
                {(chemistData.chemistChain || chemistData.territory || chemistData.visitingHours) && (
                    <StyledView className='bg-white px-5 py-5 mb-2'>
                        <StyledText className='text-lg font-semibold text-gray-900 mb-4'>
                            Additional Information
                        </StyledText>

                        <StyledView className='flex-row flex-wrap -mx-2'>
                            {chemistData.chemistChain && (
                                <StyledView className='w-1/2 px-2 mb-4'>
                                    <StyledView className='bg-gray-50 rounded-lg p-3'>
                                        <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                            Chain
                                        </StyledText>
                                        <StyledText className='text-sm text-gray-900 font-semibold'>
                                            {chemistData.chemistChain.name}
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            )}
                            <StyledView className='w-1/2 px-2 mb-4'>
                                <StyledView className='bg-gray-50 rounded-lg p-3'>
                                    <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                        Territory
                                    </StyledText>
                                    <StyledText className='text-sm text-gray-900 font-semibold'>
                                        {chemistData.territory.name}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                            {chemistData.visitingHours && (
                                <StyledView className='w-full px-2 mb-4'>
                                    <StyledView className='bg-gray-50 rounded-lg p-3'>
                                        <StyledText className='text-xs uppercase text-gray-600 font-medium mb-1'>
                                            Visiting Hours
                                        </StyledText>
                                        <StyledText className='text-sm text-gray-900 font-semibold'>
                                            {chemistData.visitingHours}
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            )}
                        </StyledView>

                        {chemistData.description && (
                            <StyledView className='bg-gray-50 rounded-lg p-3'>
                                <StyledText className='text-xs uppercase text-gray-600 font-medium mb-2'>
                                    Description
                                </StyledText>
                                <StyledText className='text-sm text-gray-900 leading-5'>
                                    {chemistData.description}
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledView>
                )}

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
                {relatedDoctors.length > 0 && (
                    <StyledView className='bg-white px-5 py-5 mb-2'>
                        <StyledView className='flex-row justify-between items-center mb-4'>
                            <StyledText className='text-lg font-semibold text-gray-900'>
                                Related Doctors ({relatedDoctors.length})
                            </StyledText>
                            <StyledTouchableOpacity onPress={() => router.push('/doctors')}>
                                <StyledText className='text-sm font-medium text-[#0077B6]'>
                                    View All
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>

                        {relatedDoctors.map((relation) => (
                            <StyledTouchableOpacity
                                key={relation.id}
                                className='flex-row items-center bg-gray-50 rounded-lg p-3 mb-2'
                                onPress={() => handleDoctorPress(relation.doctor.id)}
                            >
                                <StyledView className='w-10 h-10 rounded-lg bg-blue-50 items-center justify-center mr-3'>
                                    <StyledText className='text-lg'>👨‍⚕️</StyledText>
                                </StyledView>
                                <StyledView className='flex-1'>
                                    <StyledText className='text-sm font-semibold text-gray-900'>
                                        {relation.doctor.name}
                                    </StyledText>
                                    <StyledText className='text-xs text-gray-600'>
                                        {relation.doctor.specialization}
                                    </StyledText>
                                    {relation.doctor.qualification && (
                                        <StyledText className='text-xs text-gray-600'>
                                            {relation.doctor.qualification}
                                        </StyledText>
                                    )}
                                </StyledView>
                            </StyledTouchableOpacity>
                        ))}
                    </StyledView>
                )}

                {/* Visit History */}
                {interactions.length > 0 && (
                    <StyledView className='bg-white px-5 py-5 mb-2'>
                        <StyledView className='flex-row justify-between items-center mb-4'>
                            <StyledText className='text-lg font-semibold text-gray-900'>
                                Visit History ({interactions.length})
                            </StyledText>
                        </StyledView>

                        {interactions.slice(0, 5).map((interaction: any, index) => (
                            <StyledView key={index} className='bg-gray-50 rounded-lg p-3 mb-2'>
                                <StyledView className='flex-row justify-between items-center mb-2'>
                                    <StyledText className='text-sm font-semibold text-[#0077B6]'>
                                        {(interaction.employee.firstName || interaction.employee.lastName)
                                            ? `${interaction.employee.firstName || ''} ${interaction.employee.lastName || ''}`.trim()
                                            : interaction.employee.email}
                                    </StyledText>
                                    <StyledText className='text-xs text-gray-600'>
                                        {new Date(interaction.startTime).toLocaleDateString()} • {new Date(interaction.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </StyledText>
                                </StyledView>
                                <StyledText className='text-sm text-gray-900 leading-5'>
                                    {interaction.interactionType} - {interaction.outcome || 'No outcome recorded'}
                                </StyledText>
                                {interaction.comments && (
                                    <StyledText className='text-xs text-gray-600 mt-1'>
                                        {interaction.comments}
                                    </StyledText>
                                )}
                            </StyledView>
                        ))}
                    </StyledView>
                )}

                {/* Notes */}
                <StyledView className='bg-white px-5 py-5 mb-20'>
                    <StyledView className='flex-row justify-between items-center mb-4'>
                        <StyledText className='text-lg font-semibold text-gray-900'>
                            Notes
                        </StyledText>
                        <StyledView className='flex-row gap-2'>
                            {(!noteText || notes.length === 0) && !isEditingNote && (
                                <StyledTouchableOpacity
                                    className='px-3 py-1.5 rounded-md border border-green-500'
                                    onPress={handleCreateNote}
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
                                <>
                                    <StyledTouchableOpacity
                                        className='px-3 py-1.5 rounded-md bg-gray-200'
                                        onPress={() => {
                                            setIsEditingNote(false);
                                            setIsCreatingNote(false);
                                            if (notes.length > 0) {
                                                setNoteText(notes[0].content);
                                            }
                                        }}
                                    >
                                        <StyledText className='text-xs font-medium text-gray-700'>
                                            Cancel
                                        </StyledText>
                                    </StyledTouchableOpacity>
                                    <StyledTouchableOpacity
                                        className='px-3 py-1.5 rounded-md bg-[#0077B6]'
                                        onPress={handleSaveNote}
                                    >
                                        <StyledText className='text-xs font-medium text-white'>
                                            Save
                                        </StyledText>
                                    </StyledTouchableOpacity>
                                </>
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