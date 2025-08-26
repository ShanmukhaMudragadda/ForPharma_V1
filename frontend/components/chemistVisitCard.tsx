// // components/ChemistVisitCard.tsx
// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { styled } from 'nativewind';
// import { Ionicons } from '@expo/vector-icons';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchableOpacity = styled(TouchableOpacity);

// interface ChemistVisitCardProps {
//     id: string;
//     pharmacyName: string;
//     contactPerson: string;
//     time: string;
//     location: string;
//     completionStatus: 'pending' | 'completed' | 'rescheduled';
//     approvalStatus: 'draft' | 'pending' | 'approved' | 'rejected';
//     hasConflict?: boolean;
//     coordinates?: {
//         latitude: number;
//         longitude: number;
//     };
//     onPress?: () => void;
//     onConflictPress?: () => void;
// }

// // Dummy data for chemist visits
// export const dummyChemistVisits: ChemistVisitCardProps[] = [
//     {
//         id: 'chem-1',
//         pharmacyName: 'Apollo Pharmacy',
//         contactPerson: 'Mr. Suresh Kumar',
//         time: '02:00 PM',
//         location: 'Connaught Place, Central Delhi',
//         completionStatus: 'completed',
//         approvalStatus: 'approved',
//         coordinates: { latitude: 28.6315, longitude: 77.2167 },
//     },
//     {
//         id: 'chem-2',
//         pharmacyName: 'MedPlus Pharmacy',
//         contactPerson: 'Ms. Priya Sharma',
//         time: '05:30 PM',
//         location: 'Lajpat Nagar, South Delhi',
//         completionStatus: 'pending',
//         approvalStatus: 'draft',
//         coordinates: { latitude: 28.5677, longitude: 77.2433 },
//     },
//     {
//         id: 'chem-3',
//         pharmacyName: 'Wellness Forever',
//         contactPerson: 'Mr. Amit Verma',
//         time: '10:00 AM',
//         location: 'Saket, South Delhi',
//         completionStatus: 'completed',
//         approvalStatus: 'approved',
//         coordinates: { latitude: 28.5245, longitude: 77.2066 },
//     },
//     {
//         id: 'chem-4',
//         pharmacyName: 'Netmeds Store',
//         contactPerson: 'Mrs. Kavita Singh',
//         time: '04:00 PM',
//         location: 'Dwarka Sector 12, West Delhi',
//         completionStatus: 'pending',
//         approvalStatus: 'pending',
//         hasConflict: true,
//         coordinates: { latitude: 28.5921, longitude: 77.0460 },
//     },
//     {
//         id: 'chem-5',
//         pharmacyName: 'Frank Ross Pharmacy',
//         contactPerson: 'Mr. Rohit Malhotra',
//         time: '11:00 AM',
//         location: 'Green Park, South Delhi',
//         completionStatus: 'rescheduled',
//         approvalStatus: 'approved',
//         coordinates: { latitude: 28.5494, longitude: 77.2001 },
//     },
// ];

// const ChemistVisitCard: React.FC<ChemistVisitCardProps> = ({
//     id,
//     pharmacyName,
//     contactPerson,
//     time,
//     location,
//     completionStatus,
//     approvalStatus,
//     hasConflict,
//     onPress,
//     onConflictPress,
// }) => {
//     const getStatusClasses = (status: string) => {
//         switch (status) {
//             case 'completed': return 'bg-green-100 text-green-800';
//             case 'pending': return 'bg-yellow-100 text-yellow-800';
//             case 'rescheduled': return 'bg-red-100 text-red-800';
//             case 'approved': return 'bg-green-600 text-white';
//             case 'draft': return 'bg-gray-600 text-white';
//             case 'rejected': return 'bg-red-600 text-white';
//             default: return 'bg-gray-200 text-gray-800';
//         }
//     };

//     return (
//         <StyledTouchableOpacity
//             onPress={onPress}
//             activeOpacity={0.7}
//             className="bg-white rounded-lg mb-2 border-l-4  shadow-sm p-3"
//             style={{ borderLeftColor: "#9333ea" }}
//         >
//             {hasConflict && (
//                 <StyledTouchableOpacity
//                     className="absolute top-2 right-2 z-10"
//                     onPress={onConflictPress}
//                 >
//                     <Ionicons name="alert-circle" size={20} color="#DC3545" />
//                 </StyledTouchableOpacity>
//             )}

//             <StyledView className="flex-row justify-between">
//                 <StyledView className="flex-1">
//                     {/* Header with icon and type */}
//                     <StyledView className="flex-row items-center mb-1">
//                         <Ionicons
//                             name="medkit"
//                             size={14}
//                             color="#6C757D"
//                         />
//                         <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">
//                             Chemist Visit
//                         </StyledText>
//                     </StyledView>

//                     {/* Pharmacy Name */}
//                     <StyledText className="text-sm font-semibold text-gray-900 mb-1">
//                         {pharmacyName}
//                     </StyledText>

//                     {/* Contact Person */}
//                     <StyledText className="text-xs text-gray-500 mb-2">
//                         {contactPerson}
//                     </StyledText>

//                     {/* Location */}
//                     <StyledView className="flex-row items-center">
//                         <Ionicons name="location-outline" size={12} color="#6C757D" />
//                         <StyledText className="text-xs text-gray-500 ml-1">
//                             {location}
//                         </StyledText>
//                     </StyledView>
//                 </StyledView>

//                 {/* Status Section */}
//                 <StyledView className="items-end">
//                     {/* Completion Status */}
//                     <StyledView className={`px-2 py-1 rounded-full mb-1 ${getStatusClasses(completionStatus)}`}>
//                         <StyledText className="text-xs font-medium">
//                             {completionStatus === 'completed' ? '✓ ' : completionStatus === 'pending' ? '⏳ ' : '↻ '}
//                             {completionStatus.charAt(0).toUpperCase() + completionStatus.slice(1)}
//                         </StyledText>
//                     </StyledView>

//                     {/* Approval Status */}
//                     <StyledView className={`px-2 py-0.5 rounded-full ${getStatusClasses(approvalStatus)}`}>
//                         <StyledText className="text-xs font-medium">
//                             {approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)}
//                         </StyledText>
//                     </StyledView>
//                 </StyledView>
//             </StyledView>
//         </StyledTouchableOpacity>
//     );
// };

// export default ChemistVisitCard;
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface ChemistVisitCardProps {
    id: string;
    chemistName: string;  // Changed from 'pharmacyName'
    type?: string;  // Changed from 'contactPerson' to type
    time: string;
    address: string;  // Changed from 'location'
    completionStatus: 'pending' | 'completed' | 'rescheduled';
    approvalStatus: 'draft' | 'pending' | 'approved' | 'rejected';
    hasConflict?: boolean;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    onPress?: () => void;
    onConflictPress?: () => void;
    onDelete?: () => void;
    onComplete?: () => void;
}

const ChemistVisitCard: React.FC<ChemistVisitCardProps> = ({
    id,
    chemistName,
    type,
    time,
    address,
    completionStatus,
    approvalStatus,
    hasConflict,
    onPress,
    onConflictPress,
    onDelete,
    onComplete,
}) => {
    const getStatusClasses = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rescheduled': return 'bg-red-100 text-red-800';
            case 'approved': return 'bg-green-600 text-white';
            case 'draft': return 'bg-gray-600 text-white';
            case 'rejected': return 'bg-red-600 text-white';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    // Handle time display
    const formatTime = (timeStr: string) => {
        if (timeStr.includes('-')) {
            const times = timeStr.split(' - ');
            return { timeValue: times[0], timePeriod: '' };
        }
        const timeParts = timeStr.split(' ');
        return {
            timeValue: timeParts[0] || timeStr,
            timePeriod: timeParts[1] || ''
        };
    };

    const { timeValue, timePeriod } = formatTime(time);

    return (
        <StyledView className="flex-row border-b border-gray-100">
            {/* Time Section */}
            <StyledView className="w-20 py-4 px-2 border-r border-gray-100 bg-gray-50 items-center justify-center">
                <StyledText className="text-sm font-semibold text-[#0077B6]">{timeValue}</StyledText>
                {timePeriod && <StyledText className="text-xs text-gray-500">{timePeriod}</StyledText>}
            </StyledView>

            {/* Card Content */}
            <StyledView className="flex-1 p-3">
                <StyledTouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.3}
                    className="bg-white rounded-lg border-l-4 shadow-sm p-3"
                    style={{ borderLeftColor: "#9333ea" }}
                >
                    <StyledView className="flex-row justify-between">
                        <StyledView className="flex-1">
                            {/* Header with icon and type */}
                            <StyledView className="flex-row items-center mb-1">
                                <Ionicons
                                    name="medkit"
                                    size={14}
                                    color="#6C757D"
                                />
                                <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">
                                    Chemist Visit
                                </StyledText>
                            </StyledView>

                            {/* Chemist Name */}
                            <StyledText className="text-sm font-semibold text-gray-900 mb-1">
                                {chemistName || 'Unknown Chemist'}
                            </StyledText>

                            {/* Type */}
                            <StyledText className="text-xs text-gray-500 mb-2">
                                {type || 'Retail'}
                            </StyledText>

                            {/* Location */}
                            <StyledView className="flex-row items-center">
                                <Ionicons name="location-outline" size={12} color="#6C757D" />
                                <StyledText className="text-xs text-gray-500 ml-1">
                                    {address || 'No location specified'}
                                </StyledText>
                            </StyledView>
                        </StyledView>

                        {/* Status Section */}
                        <StyledView className="items-end">
                            {/* Completion Status */}
                            <StyledView className={`px-2 py-1 rounded-full mb-1 ${getStatusClasses(completionStatus)}`}>
                                <StyledText className="text-xs font-medium">
                                    {completionStatus === 'completed' ? '✓ ' : completionStatus === 'pending' ? '⏳ ' : '↻ '}
                                    {completionStatus.charAt(0).toUpperCase() + completionStatus.slice(1)}
                                </StyledText>
                            </StyledView>

                            {/* Approval Status */}
                            <StyledView className={`px-2 py-0.5 rounded-full ${getStatusClasses(approvalStatus)}`}>
                                <StyledText className="text-xs font-medium">
                                    {approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
};

// Export dummy data for backward compatibility
export const dummyChemistVisits = [];

export default ChemistVisitCard;