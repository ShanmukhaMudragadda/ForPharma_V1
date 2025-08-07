// import React, { useState, useEffect } from 'react';
// import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, TextInput, Modal } from 'react-native';
// import { styled } from 'nativewind';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Header from '../../components/header';
// import Drawer from '../../components/drawer';
// import RCPACard from '../../components/rcpaCard';

// const StyledSafeAreaView = styled(SafeAreaView);
// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchableOpacity = styled(TouchableOpacity);
// const StyledScrollView = styled(ScrollView);
// const StyledTextInput = styled(TextInput);

// interface ActiveFilters {
//   dateRange: string;
//   customStartDate: Date | null;
//   customEndDate: Date | null;
// }

// // Month mapping for date parsing
// const monthMap: { [key: string]: number } = {
//   'Jan': 0, 'January': 0,
//   'Feb': 1, 'February': 1,
//   'Mar': 2, 'March': 2,
//   'Apr': 3, 'April': 3,
//   'May': 4,
//   'Jun': 5, 'June': 5,
//   'Jul': 6, 'July': 6,
//   'Aug': 7, 'August': 7,
//   'Sep': 8, 'September': 8,
//   'Oct': 9, 'October': 9,
//   'Nov': 10, 'November': 10,
//   'Dec': 11, 'December': 11,
// };

// export default function RCPAPage(): JSX.Element {
//   const router = useRouter();
//   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
//   const [searchOpen, setSearchOpen] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [filterOpen, setFilterOpen] = useState<boolean>(false);

//   // Date Picker States
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false);

//   // Filter states
//   const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
//     dateRange: '',
//     customStartDate: null,
//     customEndDate: null
//   });

//   const [tempFilters, setTempFilters] = useState<ActiveFilters>({
//     dateRange: '',
//     customStartDate: null,
//     customEndDate: null
//   });

//   const handleMenuPress = (): void => {
//     setIsDrawerOpen(true);
//   };

//   const handleDrawerClose = (): void => {
//     setIsDrawerOpen(false);
//   };

//   const handleBackPress = (): void => {
//     router.back();
//   };

//   const handleAddRCPA = (): void => {
//     console.log('Creating new RCPA...');
//     // Navigate to create RCPA page
//   };

//   const sampleRCPAData = [
//     {
//       id: 'RCPA-2024-3456',
//       chemistName: 'Apollo Pharmacy, Sarita Vihar',
//       observationDate: '2024-12-18',
//       totalPrescriptions: 45,
//     },
//     {
//       id: 'RCPA-2024-3457',
//       chemistName: 'MedPlus Pharmacy, Lajpat Nagar',
//       observationDate: '2024-12-19',
//       totalPrescriptions: 32,
//     },
//     {
//       id: 'RCPA-2024-3458',
//       chemistName: 'Guardian Pharmacy, Defence Colony',
//       observationDate: '2024-12-19',
//       totalPrescriptions: 28,
//     },
//     {
//       id: 'RCPA-2024-3398',
//       chemistName: 'City Medical Store, CP',
//       observationDate: '2024-12-15',
//       totalPrescriptions: 67,
//     },
//     {
//       id: 'RCPA-2024-3356',
//       chemistName: 'Wellness Pharmacy, GK-1',
//       observationDate: '2024-12-10',
//       totalPrescriptions: 53,
//     },
//     {
//       id: 'RCPA-2024-3289',
//       chemistName: 'Apollo Pharmacy, Nehru Place',
//       observationDate: '2024-12-08',
//       totalPrescriptions: 41,
//     }
//   ];

//   // Date range check function
//   const checkDateRange = (observationDate: string, range: string) => {
//     const orderDateObj = new Date(observationDate);

//     // Check if date parsing was successful
//     if (isNaN(orderDateObj.getTime())) {
//       console.error('Invalid date object created from:', observationDate);
//       return false;
//     }

//     // Reset time to start of day for accurate comparison
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const orderDay = new Date(orderDateObj);
//     orderDay.setHours(0, 0, 0, 0);

//     switch (range) {
//       case 'lastWeek':
//         const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
//         return orderDay >= weekAgo;
//       case 'lastMonth':
//         const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
//         return orderDay >= monthAgo;
//       case 'last3Months':
//         const threeMonthsAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
//         return orderDay >= threeMonthsAgo;
//       case 'last6Months':
//         const sixMonthsAgo = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000);
//         return orderDay >= sixMonthsAgo;
//       case 'lastYear':
//         const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
//         return orderDay >= yearAgo;
//       case 'custom':
//         if (!activeFilters.customStartDate || !activeFilters.customEndDate) return false;
//         const startDate = new Date(activeFilters.customStartDate);
//         const endDate = new Date(activeFilters.customEndDate);
//         startDate.setHours(0, 0, 0, 0);
//         endDate.setHours(0, 0, 0, 0);
//         return orderDay >= startDate && orderDay <= endDate;
//       default:
//         return true;
//     }
//   };

//   // Date Picker Handlers
//   const handleStartDateChange = (event: any, selectedDate?: Date) => {
//     setShowStartDatePicker(false);
//     if (event.type === 'set' && selectedDate) {
//       setTempFilters(prev => ({ ...prev, customStartDate: selectedDate }));
//     }
//   };

//   const handleEndDateChange = (event: any, selectedDate?: Date) => {
//     setShowEndDatePicker(false);
//     if (event.type === 'set' && selectedDate) {
//       setTempFilters(prev => ({ ...prev, customEndDate: selectedDate }));
//     }
//   };

//   // Apply search AND filter logic
//   const filteredRCPAData = sampleRCPAData.filter(rcpa => {
//     // Search filter
//     const matchesSearch = searchQuery === '' ||
//       rcpa.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       rcpa.chemistName.toLowerCase().includes(searchQuery.toLowerCase());

//     if (!matchesSearch) return false;

//     // Date range filter
//     const matchesDateRange = activeFilters.dateRange === '' ||
//       checkDateRange(rcpa.observationDate, activeFilters.dateRange);

//     return matchesDateRange;
//   });

//   // Filter handlers
//   const openFilterModal = () => {
//     setTempFilters({ ...activeFilters });
//     setFilterOpen(true);
//   };

//   const toggleDateRange = (range: string) => {
//     setTempFilters(prev => ({
//       ...prev,
//       dateRange: prev.dateRange === range ? '' : range
//     }));
//   };

//   const applyFilters = () => {
//     setActiveFilters({ ...tempFilters });
//     setFilterOpen(false);
//   };

//   const clearFilters = () => {
//     setTempFilters({
//       dateRange: '',
//       customStartDate: null,
//       customEndDate: null
//     });
//   };

//   const totalActiveFilters = activeFilters.dateRange ? 1 : 0;

//   // Date range options
//   const dateRangeOptions = [
//     { value: 'lastWeek', label: 'Last Week' },
//     { value: 'lastMonth', label: 'Last Month' },
//     { value: 'last3Months', label: 'Last 3 Months' },
//     { value: 'last6Months', label: 'Last 6 Months' },
//     { value: 'lastYear', label: 'Last Year' },
//     { value: 'custom', label: 'Custom Range' }
//   ];

//   return (
//     <StyledSafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar backgroundColor="#0077B6" barStyle="light-content" />
      

//       {/* RCPA Title Bar */}
//       <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
//         <StyledView className="flex-row items-center gap-3">
//           <StyledTouchableOpacity
//             className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
//             onPress={handleBackPress}
//           >
//             <Ionicons name="arrow-back" size={18} color="#6C757D" />
//           </StyledTouchableOpacity>

//           <StyledText className="text-xl font-semibold text-gray-900">
//             RCPA
//           </StyledText>
//         </StyledView>

//         <StyledView className="flex-row gap-2">
//           {/* Add RCPA Button */}
//           <StyledTouchableOpacity
//             className="w-9 h-9 rounded-lg bg-[#28A745] items-center justify-center"
//             onPress={handleAddRCPA}
//           >
//             <Ionicons name="add" size={18} color="#FFFFFF" />
//           </StyledTouchableOpacity>

//           {/* Filter Button */}
//           <StyledTouchableOpacity
//             className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center relative"
//             onPress={openFilterModal}
//           >
//             <Ionicons
//               name="options-outline"
//               size={18}
//               color={totalActiveFilters > 0 ? "#0077B6" : "#6C757D"}
//             />
//             {totalActiveFilters > 0 && (
//               <StyledView className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
//                 <StyledText className="text-white text-xs font-semibold">
//                   {totalActiveFilters}
//                 </StyledText>
//               </StyledView>
//             )}
//           </StyledTouchableOpacity>

//           {/* Search Button */}
//           <StyledTouchableOpacity
//             className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
//             onPress={() => setSearchOpen(!searchOpen)}
//           >
//             <Ionicons
//               name="search-outline"
//               size={18}
//               color={searchOpen ? "#0077B6" : "#6C757D"}
//             />
//           </StyledTouchableOpacity>
//         </StyledView>
//       </StyledView>

//       {/* Search Bar */}
//       {searchOpen && (
//         <StyledView className="bg-white px-5 py-4 border-b border-gray-200">
//           <StyledTextInput
//             className="w-full p-3 border border-gray-200 rounded-lg text-base"
//             placeholder="Search by RCPA ID or Chemist name..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             autoFocus={true}
//           />
//         </StyledView>
//       )}

//       {/* Main Content Area with ScrollView */}
//       <StyledScrollView 
//         className="flex-1"
//         contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {filteredRCPAData.length > 0 ? (
//           filteredRCPAData.map((rcpa) => (
//             <RCPACard 
//               key={rcpa.id}
//               data={rcpa}
//               onPress={(rcpaId) => {
//                 console.log('Opening RCPA:', rcpaId);
//                 // Navigate to RCPA details page
//                 router.push(`/rcpa/${rcpaId}` as any);
//               }}
//             />
//           ))
//         ) : (
//           <StyledView className="items-center py-12">
//             <StyledText className="text-5xl mb-4">📊</StyledText>
//             <StyledText className="text-lg font-semibold text-gray-900 mb-2">
//               No RCPA reports found
//             </StyledText>
//             <StyledText className="text-sm text-gray-600 text-center">
//               {searchQuery || totalActiveFilters > 0
//                 ? 'Try adjusting your search terms or filters'
//                 : 'You haven\'t created any RCPA reports yet'
//               }
//             </StyledText>
//           </StyledView>
//         )}
//       </StyledScrollView>

//       {/* Reuse existing Drawer component */}
//       <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />

//       {/* Filter Modal */}
//       <Modal
//         visible={filterOpen}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setFilterOpen(false)}
//       >
//         <StyledView className="flex-1 bg-black/50">
//           <StyledView className="flex-1 bg-white mt-20 rounded-t-3xl">
//             {/* Filter Header */}
//             <StyledView className="px-5 py-5 border-b border-gray-200 flex-row justify-between items-center">
//               <StyledText className="text-lg font-semibold text-gray-900">
//                 Filters
//               </StyledText>
//               <StyledTouchableOpacity
//                 className="w-8 h-8 rounded-md bg-gray-100 items-center justify-center"
//                 onPress={() => setFilterOpen(false)}
//               >
//                 <Ionicons name="close" size={20} color="#212529" />
//               </StyledTouchableOpacity>
//             </StyledView>

//             <StyledScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//               {/* Date Range Section */}
//               <StyledView className="px-5 py-6">
//                 <StyledText className="text-base font-semibold text-gray-900 mb-4">
//                   Date Range
//                 </StyledText>
//                 {dateRangeOptions.map(option => (
//                   <StyledTouchableOpacity
//                     key={option.value}
//                     className="flex-row items-center py-2"
//                     onPress={() => toggleDateRange(option.value)}
//                   >
//                     <StyledView className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${tempFilters.dateRange === option.value
//                       ? 'border-[#0077B6]'
//                       : 'border-gray-300'
//                     }`}>
//                       {tempFilters.dateRange === option.value && (
//                         <StyledView className="w-2 h-2 rounded-full bg-[#0077B6]" />
//                       )}
//                     </StyledView>
//                     <StyledText className="text-sm text-gray-900">{option.label}</StyledText>
//                   </StyledTouchableOpacity>
//                 ))}
//               </StyledView>

//               {/* Custom Date Range Pickers */}
//               {tempFilters.dateRange === 'custom' && (
//                 <StyledView className="px-5 mb-6">
//                   <StyledView className="flex-row gap-3">
//                     {/* Start Date Picker */}
//                     <StyledView className="flex-1">
//                       <StyledText className="text-sm font-medium text-gray-700 mb-2">
//                         Start Date
//                       </StyledText>
//                       <StyledTouchableOpacity
//                         className="w-full p-3 border border-gray-200 rounded-lg flex-row items-center justify-between"
//                         onPress={() => setShowStartDatePicker(true)}
//                       >
//                         <StyledText className="text-base text-gray-900">
//                           {tempFilters.customStartDate
//                             ? tempFilters.customStartDate.toLocaleDateString()
//                             : 'Select Start Date'
//                           }
//                         </StyledText>
//                         <Ionicons name="calendar-outline" size={18} color="#6C757D" />
//                       </StyledTouchableOpacity>
//                     </StyledView>

//                     {/* End Date Picker */}
//                     <StyledView className="flex-1">
//                       <StyledText className="text-sm font-medium text-gray-700 mb-2">
//                         End Date
//                       </StyledText>
//                       <StyledTouchableOpacity
//                         className="w-full p-3 border border-gray-200 rounded-lg flex-row items-center justify-between"
//                         onPress={() => setShowEndDatePicker(true)}
//                       >
//                         <StyledText className="text-base text-gray-900">
//                           {tempFilters.customEndDate
//                             ? tempFilters.customEndDate.toLocaleDateString()
//                             : 'Select End Date'
//                           }
//                         </StyledText>
//                         <Ionicons name="calendar-outline" size={18} color="#6C757D" />
//                       </StyledTouchableOpacity>
//                     </StyledView>
//                   </StyledView>
//                 </StyledView>
//               )}
//             </StyledScrollView>

//             {/* Filter Actions */}
//             <StyledView className="px-5 py-4 border-t border-gray-200 flex-row gap-3">
//               <StyledTouchableOpacity
//                 className="flex-1 py-3 border border-gray-300 rounded-lg items-center"
//                 onPress={clearFilters}
//               >
//                 <StyledText className="text-sm font-semibold text-gray-600">
//                   Clear All
//                 </StyledText>
//               </StyledTouchableOpacity>
//               <StyledTouchableOpacity
//                 className="flex-1 py-3 bg-[#0077B6] rounded-lg items-center"
//                 onPress={applyFilters}
//               >
//                 <StyledText className="text-sm font-semibold text-white">
//                   Apply Filters
//                 </StyledText>
//               </StyledTouchableOpacity>
//             </StyledView>
//           </StyledView>
//         </StyledView>
//       </Modal>

//       {/* Date Pickers */}
//       {showStartDatePicker && (
//         <DateTimePicker
//           value={tempFilters.customStartDate || new Date()}
//           mode="date"
//           display="default"
//           maximumDate={tempFilters.customEndDate || new Date()}
//           onChange={handleStartDateChange}
//         />
//       )}

//       {showEndDatePicker && (
//         <DateTimePicker
//           value={tempFilters.customEndDate || new Date()}
//           mode="date"
//           display="default"
//           minimumDate={tempFilters.customStartDate || new Date(2020, 0, 1)}
//           maximumDate={new Date()}
//           onChange={handleEndDateChange}
//         />
//       )}
//     </StyledSafeAreaView>
//   );
// }

import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, TextInput, Modal } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../components/header';
import Drawer from '../../components/drawer';
import RCPACard from '../../components/rcpaCard';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);

interface ActiveFilters {
  dateRange: string;
  customStartDate: Date | null;
  customEndDate: Date | null;
}

// Month mapping for date parsing
const monthMap: { [key: string]: number } = {
  'Jan': 0, 'January': 0,
  'Feb': 1, 'February': 1,
  'Mar': 2, 'March': 2,
  'Apr': 3, 'April': 3,
  'May': 4,
  'Jun': 5, 'June': 5,
  'Jul': 6, 'July': 6,
  'Aug': 7, 'August': 7,
  'Sep': 8, 'September': 8,
  'Oct': 9, 'October': 9,
  'Nov': 10, 'November': 10,
  'Dec': 11, 'December': 11,
};

export default function RCPAPage(): JSX.Element {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  // Date Picker States
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Filter states
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    dateRange: '',
    customStartDate: null,
    customEndDate: null
  });

  const [tempFilters, setTempFilters] = useState<ActiveFilters>({
    dateRange: '',
    customStartDate: null,
    customEndDate: null
  });

  const handleMenuPress = (): void => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = (): void => {
    setIsDrawerOpen(false);
  };

  const handleBackPress = (): void => {
    router.back();
  };

  const handleAddRCPA = (): void => {
    console.log('Creating new RCPA...');
    router.push('/createRcpa')
  };

  const sampleRCPAData = [
    {
      id: 'RCPA-2024-3456',
      chemistName: 'Apollo Pharmacy, Sarita Vihar',
      observationDate: '2024-12-18',
      totalPrescriptions: 45,
    },
    {
      id: 'RCPA-2024-3457',
      chemistName: 'MedPlus Pharmacy, Lajpat Nagar',
      observationDate: '2024-12-19',
      totalPrescriptions: 32,
    },
    {
      id: 'RCPA-2024-3458',
      chemistName: 'Guardian Pharmacy, Defence Colony',
      observationDate: '2024-12-19',
      totalPrescriptions: 28,
    },
    {
      id: 'RCPA-2024-3398',
      chemistName: 'City Medical Store, CP',
      observationDate: '2024-12-15',
      totalPrescriptions: 67,
    },
    {
      id: 'RCPA-2024-3356',
      chemistName: 'Wellness Pharmacy, GK-1',
      observationDate: '2024-12-10',
      totalPrescriptions: 53,
    },
    {
      id: 'RCPA-2024-3289',
      chemistName: 'Apollo Pharmacy, Nehru Place',
      observationDate: '2024-12-08',
      totalPrescriptions: 41,
    }
  ];

  // Date range check function
  const checkDateRange = (observationDate: string, range: string) => {
    const orderDateObj = new Date(observationDate);

    // Check if date parsing was successful
    if (isNaN(orderDateObj.getTime())) {
      console.error('Invalid date object created from:', observationDate);
      return false;
    }

    // Reset time to start of day for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const orderDay = new Date(orderDateObj);
    orderDay.setHours(0, 0, 0, 0);

    switch (range) {
      case 'lastWeek':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDay >= weekAgo;
      case 'lastMonth':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return orderDay >= monthAgo;
      case 'last3Months':
        const threeMonthsAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        return orderDay >= threeMonthsAgo;
      case 'last6Months':
        const sixMonthsAgo = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000);
        return orderDay >= sixMonthsAgo;
      case 'lastYear':
        const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
        return orderDay >= yearAgo;
      case 'custom':
        if (!activeFilters.customStartDate || !activeFilters.customEndDate) return false;
        const startDate = new Date(activeFilters.customStartDate);
        const endDate = new Date(activeFilters.customEndDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        return orderDay >= startDate && orderDay <= endDate;
      default:
        return true;
    }
  };

  // Date Picker Handlers
  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      setTempFilters(prev => ({ ...prev, customStartDate: selectedDate }));
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      setTempFilters(prev => ({ ...prev, customEndDate: selectedDate }));
    }
  };

  // Apply search AND filter logic
  const filteredRCPAData = sampleRCPAData.filter(rcpa => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
      rcpa.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rcpa.chemistName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Date range filter
    const matchesDateRange = activeFilters.dateRange === '' ||
      checkDateRange(rcpa.observationDate, activeFilters.dateRange);

    return matchesDateRange;
  });

  // Filter handlers
  const openFilterModal = () => {
    setTempFilters({ ...activeFilters });
    setFilterOpen(true);
  };

  const toggleDateRange = (range: string) => {
    setTempFilters(prev => ({
      ...prev,
      dateRange: prev.dateRange === range ? '' : range
    }));
  };

  const applyFilters = () => {
    setActiveFilters({ ...tempFilters });
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setTempFilters({
      dateRange: '',
      customStartDate: null,
      customEndDate: null
    });
  };

  const totalActiveFilters = activeFilters.dateRange ? 1 : 0;

  // Date range options
  const dateRangeOptions = [
    { value: 'lastWeek', label: 'Last Week' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'last3Months', label: 'Last 3 Months' },
    { value: 'last6Months', label: 'Last 6 Months' },
    { value: 'lastYear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <StyledSafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#0077B6" barStyle="light-content" />
      

      {/* RCPA Title Bar */}
      <StyledView className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
        <StyledView className="flex-row items-center gap-3">
          <StyledTouchableOpacity
            className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
            onPress={handleBackPress}
          >
            <Ionicons name="arrow-back" size={18} color="#6C757D" />
          </StyledTouchableOpacity>

          <StyledText className="text-xl font-semibold text-gray-900">
            RCPA
          </StyledText>
        </StyledView>

        <StyledView className="flex-row gap-2">
          {/* Add RCPA Button */}
          <StyledTouchableOpacity
            className="w-9 h-9 rounded-lg bg-[#28A745] items-center justify-center"
            onPress={handleAddRCPA}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" />
          </StyledTouchableOpacity>

          {/* Filter Button */}
          <StyledTouchableOpacity
            className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center relative"
            onPress={openFilterModal}
          >
            <Ionicons
              name="options-outline"
              size={18}
              color={totalActiveFilters > 0 ? "#0077B6" : "#6C757D"}
            />
            {totalActiveFilters > 0 && (
              <StyledView className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <StyledText className="text-white text-xs font-semibold">
                  {totalActiveFilters}
                </StyledText>
              </StyledView>
            )}
          </StyledTouchableOpacity>

          {/* Search Button */}
          <StyledTouchableOpacity
            className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center"
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
        <StyledView className="bg-white px-5 py-4 border-b border-gray-200">
          <StyledTextInput
            className="w-full p-3 border border-gray-200 rounded-lg text-base"
            placeholder="Search by RCPA ID or Chemist name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
        </StyledView>
      )}

      {/* Main Content Area with ScrollView */}
      <StyledScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredRCPAData.length > 0 ? (
          filteredRCPAData.map((rcpa) => (
            <RCPACard 
              key={rcpa.id}
              data={rcpa}
              onPress={(rcpaId) => {
                console.log('Opening RCPA:', rcpaId);
                // Navigate to RCPA details page with parameters
                router.push({
                  pathname: '/rcpaDetails',
                  params: {
                    rcpaId: rcpa.id,
                    chemistName: rcpa.chemistName,
                    observationDate: rcpa.observationDate,
                    totalPrescriptions: rcpa.totalPrescriptions.toString()
                  }
                });
              }}
            />
          ))
        ) : (
          <StyledView className="items-center py-12">
            <StyledText className="text-5xl mb-4">📊</StyledText>
            <StyledText className="text-lg font-semibold text-gray-900 mb-2">
              No RCPA reports found
            </StyledText>
            <StyledText className="text-sm text-gray-600 text-center">
              {searchQuery || totalActiveFilters > 0
                ? 'Try adjusting your search terms or filters'
                : 'You haven\'t created any RCPA reports yet'
              }
            </StyledText>
          </StyledView>
        )}
      </StyledScrollView>

      {/* Reuse existing Drawer component */}
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />

      {/* Filter Modal */}
      <Modal
        visible={filterOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterOpen(false)}
      >
        <StyledView className="flex-1 bg-black/50">
          <StyledView className="flex-1 bg-white mt-20 rounded-t-3xl">
            {/* Filter Header */}
            <StyledView className="px-5 py-5 border-b border-gray-200 flex-row justify-between items-center">
              <StyledText className="text-lg font-semibold text-gray-900">
                Filters
              </StyledText>
              <StyledTouchableOpacity
                className="w-8 h-8 rounded-md bg-gray-100 items-center justify-center"
                onPress={() => setFilterOpen(false)}
              >
                <Ionicons name="close" size={20} color="#212529" />
              </StyledTouchableOpacity>
            </StyledView>

            <StyledScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              {/* Date Range Section */}
              <StyledView className="px-5 py-6">
                <StyledText className="text-base font-semibold text-gray-900 mb-4">
                  Date Range
                </StyledText>
                {dateRangeOptions.map(option => (
                  <StyledTouchableOpacity
                    key={option.value}
                    className="flex-row items-center py-2"
                    onPress={() => toggleDateRange(option.value)}
                  >
                    <StyledView className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${tempFilters.dateRange === option.value
                      ? 'border-[#0077B6]'
                      : 'border-gray-300'
                    }`}>
                      {tempFilters.dateRange === option.value && (
                        <StyledView className="w-2 h-2 rounded-full bg-[#0077B6]" />
                      )}
                    </StyledView>
                    <StyledText className="text-sm text-gray-900">{option.label}</StyledText>
                  </StyledTouchableOpacity>
                ))}
              </StyledView>

              {/* Custom Date Range Pickers */}
              {tempFilters.dateRange === 'custom' && (
                <StyledView className="px-5 mb-6">
                  <StyledView className="flex-row gap-3">
                    {/* Start Date Picker */}
                    <StyledView className="flex-1">
                      <StyledText className="text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </StyledText>
                      <StyledTouchableOpacity
                        className="w-full p-3 border border-gray-200 rounded-lg flex-row items-center justify-between"
                        onPress={() => setShowStartDatePicker(true)}
                      >
                        <StyledText className="text-base text-gray-900">
                          {tempFilters.customStartDate
                            ? tempFilters.customStartDate.toLocaleDateString()
                            : 'Select Start Date'
                          }
                        </StyledText>
                        <Ionicons name="calendar-outline" size={18} color="#6C757D" />
                      </StyledTouchableOpacity>
                    </StyledView>

                    {/* End Date Picker */}
                    <StyledView className="flex-1">
                      <StyledText className="text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </StyledText>
                      <StyledTouchableOpacity
                        className="w-full p-3 border border-gray-200 rounded-lg flex-row items-center justify-between"
                        onPress={() => setShowEndDatePicker(true)}
                      >
                        <StyledText className="text-base text-gray-900">
                          {tempFilters.customEndDate
                            ? tempFilters.customEndDate.toLocaleDateString()
                            : 'Select End Date'
                          }
                        </StyledText>
                        <Ionicons name="calendar-outline" size={18} color="#6C757D" />
                      </StyledTouchableOpacity>
                    </StyledView>
                  </StyledView>
                </StyledView>
              )}
            </StyledScrollView>

            {/* Filter Actions */}
            <StyledView className="px-5 py-4 border-t border-gray-200 flex-row gap-3">
              <StyledTouchableOpacity
                className="flex-1 py-3 border border-gray-300 rounded-lg items-center"
                onPress={clearFilters}
              >
                <StyledText className="text-sm font-semibold text-gray-600">
                  Clear All
                </StyledText>
              </StyledTouchableOpacity>
              <StyledTouchableOpacity
                className="flex-1 py-3 bg-[#0077B6] rounded-lg items-center"
                onPress={applyFilters}
              >
                <StyledText className="text-sm font-semibold text-white">
                  Apply Filters
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>
      </Modal>

      {/* Date Pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={tempFilters.customStartDate || new Date()}
          mode="date"
          display="default"
          maximumDate={tempFilters.customEndDate || new Date()}
          onChange={handleStartDateChange}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={tempFilters.customEndDate || new Date()}
          mode="date"
          display="default"
          minimumDate={tempFilters.customStartDate || new Date(2020, 0, 1)}
          maximumDate={new Date()}
          onChange={handleEndDateChange}
        />
      )}
    </StyledSafeAreaView>
  );
}