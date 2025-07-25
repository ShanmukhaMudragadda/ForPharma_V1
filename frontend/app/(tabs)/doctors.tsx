
// import React, { useState, useEffect } from 'react'
// import { View, Text, ScrollView, TouchableOpacity, StatusBar, Alert, SafeAreaView, TextInput } from 'react-native'
// import { styled } from 'nativewind'
// import { useRouter, Link, Redirect } from 'expo-router'
// import { Ionicons } from '@expo/vector-icons'
// import DoctorCard from '../../components/doctorListCard';

// const StyledView = styled(View)
// const StyledText = styled(Text)
// const StyledScrollView = styled(ScrollView)
// const StyledTouchableOpacity = styled(TouchableOpacity)
// const StyledSafeAreaView = styled(SafeAreaView)
// const StyledTextInput = styled(TextInput)

// export default function Doctors() {
//     const router = useRouter();
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [searchOpen, setSearchOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(6);

//     const handleDoctorPress = (doctorName: string) => {
//         console.log(`Opening details for ${doctorName}`);
//         // Add navigation logic here later
//         router.push('/doctorDetails')
//     };

//     const doctorsData = [
//         {
//             name: "Dr. Rajesh Sharma",
//             designation: "Cardiologist | Apollo Hospital",
//             location: "New Delhi, Delhi",
//             avatar: "👨‍⚕️"
//         },
//         {
//             name: "Dr. Priya Gupta",
//             designation: "Dermatologist | Fortis Hospital",
//             location: "Mumbai, Maharashtra",
//             avatar: "👩‍⚕️"
//         },
//         {
//             name: "Dr. Amit Mehta",
//             designation: "Orthopedic | Max Healthcare",
//             location: "Bangalore, Karnataka",
//             avatar: "👨‍⚕️"
//         },
//         {
//             name: "Dr. Vikram Singh",
//             designation: "Neurologist | AIIMS",
//             location: "New Delhi, Delhi",
//             avatar: "👨‍⚕️"
//         },
//         {
//             name: "Dr. Kavitha Reddy",
//             designation: "Pediatrician | Rainbow Children's Hospital",
//             location: "Hyderabad, Telangana",
//             avatar: "👩‍⚕️"
//         },
//         {
//             name: "Dr. Kiran Patel",
//             designation: "Gastroenterologist | Sterling Hospital",
//             location: "Ahmedabad, Gujarat",
//             avatar: "👨‍⚕️"
//         },
//         {
//             name: "Dr. Neha Agarwal",
//             designation: "Orthopedic Surgeon | AIIMS Delhi",
//             location: "New Delhi, Delhi",
//             avatar: "👩‍⚕️"
//         },
//         {
//             name: "Dr. Sanjay Verma",
//             designation: "Oncologist | Tata Memorial Hospital",
//             location: "Mumbai, Maharashtra",
//             avatar: "👨‍⚕️"
//         },
//         {
//             name: "Dr. Anjali Nair",
//             designation: "Gynecologist | Medanta Hospital",
//             location: "Gurugram, Haryana",
//             avatar: "👩‍⚕️"
//         }
//     ];

//     const filteredDoctors = doctorsData.filter(doctor =>
//         doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         doctor.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Calculate pagination values
//     const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

//     // Pagination handlers
//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handlePageNumber = (pageNum: number) => {
//         setCurrentPage(pageNum);
//     };

//     // Reset pagination when search changes
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchQuery]);

//     return (
//         <StyledSafeAreaView className='flex-1 bg-gray-50'>
//             {/* <StatusBar barStyle="dark-content" backgroundColor="#ffffff" /> */}

//             {/* Header */}
//             <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
//                 <StyledView className='flex-row items-center gap-3'>
//                     <StyledTouchableOpacity
//                         className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
//                         onPress={() => router.push('/')}
//                     >
//                         <Ionicons name="arrow-back" size={18} color="#6C757D" />
//                     </StyledTouchableOpacity>

//                     <StyledText className='text-xl font-semibold text-gray-900'>
//                         Doctors
//                     </StyledText>
//                 </StyledView>

//                 <StyledView className='flex-row gap-2'>
//                     <StyledTouchableOpacity className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'>
//                         <Ionicons name="options-outline" size={18} color="#6C757D" />
//                     </StyledTouchableOpacity>
//                     <StyledTouchableOpacity
//                         className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
//                         onPress={() => setSearchOpen(!searchOpen)}
//                     >
//                         <Ionicons name="search-outline" size={18} color="#6C757D" />
//                     </StyledTouchableOpacity>
//                 </StyledView>
//             </StyledView>

//             {/* Search Bar */}
//             {searchOpen && (
//                 <StyledView className='bg-white px-5 py-4 border-b border-gray-200'>
//                     <StyledTextInput
//                         className='w-full p-3 border border-gray-200 rounded-lg text-base'
//                         placeholder="Search doctors..."
//                         value={searchQuery}
//                         onChangeText={setSearchQuery}
//                         autoFocus={true}
//                     />
//                 </StyledView>
//             )}

//             {/* Doctor List */}
//             <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
//                 <StyledView className="px-5 py-6">
//                     {currentDoctors.map((doctor, index) => (
//                         <DoctorCard
//                             key={index}
//                             name={doctor.name}
//                             designation={doctor.designation}
//                             location={doctor.location}
//                             avatar={doctor.avatar}
//                             onPress={() => handleDoctorPress(doctor.name)}
//                         />
//                     ))}
//                 </StyledView>
//             </StyledScrollView>

//             {/* Pagination */}
//             <StyledView className='bg-white px-5 py-4 border-t border-gray-200 flex-row justify-center items-center gap-2'>
//                 <StyledTouchableOpacity
//                     className={`w-9 h-9 rounded-lg border border-gray-200 items-center justify-center ${currentPage === 1 ? 'opacity-50' : ''}`}
//                     onPress={handlePrevPage}
//                     disabled={currentPage === 1}
//                 >
//                     <Ionicons name="chevron-back" size={14} color={currentPage === 1 ? "#6C757D" : "#212529"} />
//                 </StyledTouchableOpacity>

//                 {/* Page Numbers */}
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
//                     <StyledTouchableOpacity
//                         key={pageNum}
//                         className={`w-9 h-9 rounded-lg border items-center justify-center ${currentPage === pageNum ? 'bg-[#0077B6] border-[#0077B6]' : 'border-gray-200'
//                             }`}
//                         onPress={() => handlePageNumber(pageNum)}
//                     >
//                         <StyledText className={`text-sm font-medium ${currentPage === pageNum ? 'text-white' : 'text-gray-900'
//                             }`}>
//                             {pageNum}
//                         </StyledText>
//                     </StyledTouchableOpacity>
//                 ))}

//                 <StyledText className='text-sm text-gray-600 mx-3'>
//                     {startIndex + 1}-{Math.min(endIndex, filteredDoctors.length)} of {filteredDoctors.length}
//                 </StyledText>

//                 <StyledTouchableOpacity
//                     className={`w-9 h-9 rounded-lg border border-gray-200 items-center justify-center ${currentPage === totalPages ? 'opacity-50' : ''}`}
//                     onPress={handleNextPage}
//                     disabled={currentPage === totalPages}
//                 >
//                     <Ionicons name="chevron-forward" size={14} color={currentPage === totalPages ? "#6C757D" : "#212529"} />
//                 </StyledTouchableOpacity>
//             </StyledView>
//         </StyledSafeAreaView>
//     );
// }


import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Alert, SafeAreaView, TextInput, Modal } from 'react-native'
import { styled } from 'nativewind'
import { useRouter, Link, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import DoctorCard from '../../components/doctorListCard';

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledScrollView = styled(ScrollView)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledSafeAreaView = styled(SafeAreaView)
const StyledTextInput = styled(TextInput)

interface Doctor {
    name: string;
    designation: string;
    location: string;
    avatar: string;
    specialization: string;
    state: string;
    city: string;
}

interface ActiveFilters {
    specializations: string[];
    states: string[];
    cities: string[];
}

export default function Doctors() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    // Filter states
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        specializations: [],
        states: [],
        cities: []
    });

    const [tempFilters, setTempFilters] = useState<ActiveFilters>({
        specializations: [],
        states: [],
        cities: []
    });

    const [expandedStates, setExpandedStates] = useState<string[]>([]);

    const handleDoctorPress = (doctorName: string) => {
        console.log(`Opening details for ${doctorName}`);
        router.push('/doctorDetails')
    };

    const doctorsData: Doctor[] = [
        {
            name: "Dr. Rajesh Sharma",
            designation: "Cardiologist | Apollo Hospital",
            location: "New Delhi, Delhi",
            avatar: "👨‍⚕️",
            specialization: "Cardiology",
            state: "Delhi",
            city: "New Delhi"
        },
        {
            name: "Dr. Priya Gupta",
            designation: "Dermatologist | Fortis Hospital",
            location: "Mumbai, Maharashtra",
            avatar: "👩‍⚕️",
            specialization: "Dermatology",
            state: "Maharashtra",
            city: "Mumbai"
        },
        {
            name: "Dr. Amit Mehta",
            designation: "Orthopedic | Max Healthcare",
            location: "Bangalore, Karnataka",
            avatar: "👨‍⚕️",
            specialization: "Orthopedics",
            state: "Karnataka",
            city: "Bangalore"
        },
        {
            name: "Dr. Vikram Singh",
            designation: "Neurologist | AIIMS",
            location: "New Delhi, Delhi",
            avatar: "👨‍⚕️",
            specialization: "Neurology",
            state: "Delhi",
            city: "New Delhi"
        },
        {
            name: "Dr. Kavitha Reddy",
            designation: "Pediatrician | Rainbow Children's Hospital",
            location: "Hyderabad, Telangana",
            avatar: "👩‍⚕️",
            specialization: "Pediatrics",
            state: "Telangana",
            city: "Hyderabad"
        },
        {
            name: "Dr. Kiran Patel",
            designation: "Gastroenterologist | Sterling Hospital",
            location: "Ahmedabad, Gujarat",
            avatar: "👨‍⚕️",
            specialization: "Gastroenterology",
            state: "Gujarat",
            city: "Ahmedabad"
        },
        {
            name: "Dr. Neha Agarwal",
            designation: "Orthopedic Surgeon | AIIMS Delhi",
            location: "New Delhi, Delhi",
            avatar: "👩‍⚕️",
            specialization: "Orthopedics",
            state: "Delhi",
            city: "New Delhi"
        },
        {
            name: "Dr. Sanjay Verma",
            designation: "Oncologist | Tata Memorial Hospital",
            location: "Mumbai, Maharashtra",
            avatar: "👨‍⚕️",
            specialization: "Oncology",
            state: "Maharashtra",
            city: "Mumbai"
        },
        {
            name: "Dr. Anjali Nair",
            designation: "Gynecologist | Medanta Hospital",
            location: "Gurugram, Haryana",
            avatar: "👩‍⚕️",
            specialization: "Gynecology",
            state: "Haryana",
            city: "Gurugram"
        }
    ];

    // Filter options
    const specializations = [...new Set(doctorsData.map(d => d.specialization))].sort();
    const statesCities = doctorsData.reduce((acc, doctor) => {
        if (!acc[doctor.state]) {
            acc[doctor.state] = new Set();
        }
        acc[doctor.state].add(doctor.city);
        return acc;
    }, {} as Record<string, Set<string>>);

    // Convert to sorted array format
    const locationData = Object.entries(statesCities).map(([state, cities]) => ({
        state,
        cities: Array.from(cities).sort()
    })).sort((a, b) => a.state.localeCompare(b.state));

    // Apply filters to doctors
    const filteredDoctors = doctorsData.filter(doctor => {
        // First apply search filter
        const matchesSearch = searchQuery === '' ||
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.location.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Then apply other filters
        const matchesSpecialization = activeFilters.specializations.length === 0 ||
            activeFilters.specializations.includes(doctor.specialization);

        const matchesState = activeFilters.states.length === 0 ||
            activeFilters.states.includes(doctor.state);

        const matchesCity = activeFilters.cities.length === 0 ||
            activeFilters.cities.includes(doctor.city);

        return matchesSpecialization && matchesState && matchesCity;
    });

    // Calculate pagination values
    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageNumber = (pageNum: number) => {
        setCurrentPage(pageNum);
    };

    // Filter handlers
    const openFilterModal = () => {
        setTempFilters({ ...activeFilters });
        setFilterOpen(true);
    };

    const toggleSpecialization = (specialization: string) => {
        setTempFilters(prev => ({
            ...prev,
            specializations: prev.specializations.includes(specialization)
                ? prev.specializations.filter(s => s !== specialization)
                : [...prev.specializations, specialization]
        }));
    };

    const toggleState = (state: string) => {
        setTempFilters(prev => ({
            ...prev,
            states: prev.states.includes(state)
                ? prev.states.filter(s => s !== state)
                : [...prev.states, state]
        }));

        // Toggle expanded state for city selection
        setExpandedStates(prev =>
            prev.includes(state)
                ? prev.filter(s => s !== state)
                : [...prev, state]
        );
    };

    const toggleCity = (city: string) => {
        setTempFilters(prev => ({
            ...prev,
            cities: prev.cities.includes(city)
                ? prev.cities.filter(c => c !== city)
                : [...prev.cities, city]
        }));
    };

    const applyFilters = () => {
        setActiveFilters({ ...tempFilters });
        setFilterOpen(false);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const clearFilters = () => {
        setTempFilters({
            specializations: [],
            states: [],
            cities: []
        });
        setExpandedStates([]);
    };

    const totalActiveFilters =
        activeFilters.specializations.length +
        activeFilters.states.length +
        activeFilters.cities.length;

    // Reset pagination when search or filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeFilters]);

    return (
        <StyledSafeAreaView className='flex-1 bg-gray-50'>
            {/* Header */}
            <StyledView className='bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200'>
                <StyledView className='flex-row items-center gap-3'>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                        onPress={() => router.push('/')}
                    >
                        <Ionicons name="arrow-back" size={18} color="#6C757D" />
                    </StyledTouchableOpacity>

                    <StyledText className='text-xl font-semibold text-gray-900'>
                        Doctors
                    </StyledText>
                </StyledView>

                <StyledView className='flex-row gap-2'>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center relative'
                        onPress={openFilterModal}
                    >
                        <Ionicons
                            name="options-outline"
                            size={18}
                            color={totalActiveFilters > 0 ? "#0077B6" : "#6C757D"}
                        />
                        {totalActiveFilters > 0 && (
                            <StyledView className='absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center'>
                                <StyledText className='text-white text-xs font-semibold'>
                                    {totalActiveFilters}
                                </StyledText>
                            </StyledView>
                        )}
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        className='w-9 h-9 rounded-lg bg-white/20 items-center justify-center'
                        onPress={() => setSearchOpen(!searchOpen)}
                    >
                        <Ionicons
                            name="search-outline"
                            size={18}
                            color={searchOpen ? "#0077B6" : "#6C757D"}
                        />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Search Bar */}
            {searchOpen && (
                <StyledView className='bg-white px-5 py-4 border-b border-gray-200'>
                    <StyledTextInput
                        className='w-full p-3 border border-gray-200 rounded-lg text-base'
                        placeholder="Search doctors..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus={true}
                    />
                </StyledView>
            )}

            {/* Doctor List */}
            <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <StyledView className="px-5 py-6">
                    {currentDoctors.length > 0 ? (
                        currentDoctors.map((doctor, index) => (
                            <DoctorCard
                                key={index}
                                name={doctor.name}
                                designation={doctor.designation}
                                location={doctor.location}
                                avatar={doctor.avatar}
                                onPress={() => handleDoctorPress(doctor.name)}
                            />
                        ))
                    ) : (
                        <StyledView className='items-center py-12'>
                            <StyledText className='text-5xl mb-4'>🔍</StyledText>
                            <StyledText className='text-lg font-semibold text-gray-900 mb-2'>
                                No doctors found
                            </StyledText>
                            <StyledText className='text-sm text-gray-600 text-center'>
                                Try adjusting your filters or search query
                            </StyledText>
                        </StyledView>
                    )}
                </StyledView>
            </StyledScrollView>

            {/* Pagination */}
            {filteredDoctors.length > 0 && (
                <StyledView className='bg-white px-5 py-4 border-t border-gray-200 flex-row justify-center items-center gap-2'>
                    <StyledTouchableOpacity
                        className={`w-9 h-9 rounded-lg border border-gray-200 items-center justify-center ${currentPage === 1 ? 'opacity-50' : ''}`}
                        onPress={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <Ionicons name="chevron-back" size={14} color={currentPage === 1 ? "#6C757D" : "#212529"} />
                    </StyledTouchableOpacity>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage === 1) {
                            pageNum = i + 1;
                        } else if (currentPage === totalPages) {
                            pageNum = totalPages - 2 + i;
                        } else {
                            pageNum = currentPage - 1 + i;
                        }

                        if (pageNum < 1 || pageNum > totalPages) return null;

                        return (
                            <StyledTouchableOpacity
                                key={pageNum}
                                className={`w-9 h-9 rounded-lg border items-center justify-center ${currentPage === pageNum ? 'bg-[#0077B6] border-[#0077B6]' : 'border-gray-200'
                                    }`}
                                onPress={() => handlePageNumber(pageNum)}
                            >
                                <StyledText className={`text-sm font-medium ${currentPage === pageNum ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {pageNum}
                                </StyledText>
                            </StyledTouchableOpacity>
                        );
                    })}

                    <StyledText className='text-sm text-gray-600 mx-3'>
                        {startIndex + 1}-{Math.min(endIndex, filteredDoctors.length)} of {filteredDoctors.length}
                    </StyledText>

                    <StyledTouchableOpacity
                        className={`w-9 h-9 rounded-lg border border-gray-200 items-center justify-center ${currentPage === totalPages ? 'opacity-50' : ''}`}
                        onPress={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <Ionicons name="chevron-forward" size={14} color={currentPage === totalPages ? "#6C757D" : "#212529"} />
                    </StyledTouchableOpacity>
                </StyledView>
            )}

            {/* Filter Modal */}
            <Modal
                visible={filterOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setFilterOpen(false)}
            >
                <StyledView className='flex-1 bg-black/50'>
                    <StyledView className='flex-1 bg-white mt-20 rounded-t-3xl'>
                        {/* Filter Header */}
                        <StyledView className='px-5 py-5 border-b border-gray-200 flex-row justify-between items-center'>
                            <StyledText className='text-lg font-semibold text-gray-900'>
                                Filters
                            </StyledText>
                            <StyledTouchableOpacity
                                className='w-8 h-8 rounded-md bg-gray-100 items-center justify-center'
                                onPress={() => setFilterOpen(false)}
                            >
                                <Ionicons name="close" size={20} color="#212529" />
                            </StyledTouchableOpacity>
                        </StyledView>

                        <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                            {/* Specializations */}
                            <StyledView className='px-5 py-6'>
                                <StyledText className='text-base font-semibold text-gray-900 mb-4'>
                                    Specialization
                                </StyledText>
                                {specializations.map(spec => (
                                    <StyledTouchableOpacity
                                        key={spec}
                                        className='flex-row items-center py-2'
                                        onPress={() => toggleSpecialization(spec)}
                                    >
                                        <StyledView className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${tempFilters.specializations.includes(spec)
                                            ? 'bg-[#0077B6] border-[#0077B6]'
                                            : 'border-gray-300'
                                            }`}>
                                            {tempFilters.specializations.includes(spec) && (
                                                <Ionicons name="checkmark" size={12} color="white" />
                                            )}
                                        </StyledView>
                                        <StyledText className='text-sm text-gray-900'>{spec}</StyledText>
                                    </StyledTouchableOpacity>
                                ))}
                            </StyledView>

                            {/* Locations */}
                            <StyledView className='px-5 pb-6'>
                                <StyledText className='text-base font-semibold text-gray-900 mb-4'>
                                    Location
                                </StyledText>
                                {locationData.map(({ state, cities }) => (
                                    <StyledView key={state}>
                                        <StyledTouchableOpacity
                                            className='flex-row items-center py-2'
                                            onPress={() => toggleState(state)}
                                        >
                                            <StyledView className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${tempFilters.states.includes(state)
                                                ? 'bg-[#0077B6] border-[#0077B6]'
                                                : 'border-gray-300'
                                                }`}>
                                                {tempFilters.states.includes(state) && (
                                                    <Ionicons name="checkmark" size={12} color="white" />
                                                )}
                                            </StyledView>
                                            <StyledText className='text-sm text-gray-900 flex-1'>{state}</StyledText>
                                            <Ionicons
                                                name={expandedStates.includes(state) ? "chevron-up" : "chevron-down"}
                                                size={16}
                                                color="#6C757D"
                                            />
                                        </StyledTouchableOpacity>

                                        {expandedStates.includes(state) && (
                                            <StyledView className='ml-8'>
                                                {cities.map(city => (
                                                    <StyledTouchableOpacity
                                                        key={city}
                                                        className='flex-row items-center py-2'
                                                        onPress={() => toggleCity(city)}
                                                    >
                                                        <StyledView className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${tempFilters.cities.includes(city)
                                                            ? 'bg-[#0077B6] border-[#0077B6]'
                                                            : 'border-gray-300'
                                                            }`}>
                                                            {tempFilters.cities.includes(city) && (
                                                                <Ionicons name="checkmark" size={12} color="white" />
                                                            )}
                                                        </StyledView>
                                                        <StyledText className='text-sm text-gray-600'>{city}</StyledText>
                                                    </StyledTouchableOpacity>
                                                ))}
                                            </StyledView>
                                        )}
                                    </StyledView>
                                ))}
                            </StyledView>
                        </StyledScrollView>

                        {/* Filter Actions */}
                        <StyledView className='px-5 py-4 border-t border-gray-200 flex-row gap-3'>
                            <StyledTouchableOpacity
                                className='flex-1 py-3 border border-gray-300 rounded-lg items-center'
                                onPress={clearFilters}
                            >
                                <StyledText className='text-sm font-semibold text-gray-600'>
                                    Clear All
                                </StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                className='flex-1 py-3 bg-[#0077B6] rounded-lg items-center'
                                onPress={applyFilters}
                            >
                                <StyledText className='text-sm font-semibold text-white'>
                                    Apply Filters
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </Modal>
        </StyledSafeAreaView>
    );
}