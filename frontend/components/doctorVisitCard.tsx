// // components/DoctorVisitCard.tsx
// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { styled } from 'nativewind';
// import { Ionicons } from '@expo/vector-icons';
// import { blue600 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchableOpacity = styled(TouchableOpacity);

// interface DoctorVisitCardProps {
//     id: string;
//     name: string;
//     specialty: string;
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

// // Dummy data for doctor visits
// export const dummyDoctorVisits: DoctorVisitCardProps[] = [
//     {
//         id: 'doc-1',
//         name: 'Dr. Rajesh Sharma',
//         specialty: 'Cardiologist',
//         time: '09:00 AM',
//         location: 'Apollo Hospital, Mathura Road',
//         completionStatus: 'completed',
//         approvalStatus: 'approved',
//         coordinates: { latitude: 28.5355, longitude: 77.3910 },
//     },
//     {
//         id: 'doc-2',
//         name: 'Dr. Priya Mehta',
//         specialty: 'Pediatrician',
//         time: '11:30 AM',
//         location: 'Max Hospital, Sector 19, Noida',
//         completionStatus: 'completed',
//         approvalStatus: 'pending',
//         hasConflict: true,
//         coordinates: { latitude: 28.5747, longitude: 77.3240 },
//     },
//     {
//         id: 'doc-3',
//         name: 'Dr. Anish Kumar',
//         specialty: 'Orthopedic Surgeon',
//         time: '03:00 PM',
//         location: 'Fortis Hospital, Vasant Kunj',
//         completionStatus: 'pending',
//         approvalStatus: 'approved',
//         coordinates: { latitude: 28.5273, longitude: 77.1516 },
//     },
//     {
//         id: 'doc-4',
//         name: 'Dr. Neha Gupta',
//         specialty: 'Dermatologist',
//         time: '05:00 PM',
//         location: 'AIIMS, Ansari Nagar',
//         completionStatus: 'pending',
//         approvalStatus: 'draft',
//         coordinates: { latitude: 28.5672, longitude: 77.2100 },
//     },
// ];

// const DoctorVisitCard: React.FC<DoctorVisitCardProps> = ({
//     id,
//     name,
//     specialty,
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
//             activeOpacity={0.3}
//             className="bg-white rounded-lg mb-2 border-l-4  shadow-sm p-3"
//             style={{ borderLeftColor: '#2563EB' }}
//         >


//             <StyledView className="flex-row justify-between">
//                 <StyledView className="flex-1">
//                     {/* Header with icon and type */}
//                     <StyledView className="flex-row items-center mb-1">
//                         <Ionicons
//                             name="medical"
//                             size={14}
//                             color="#6C757D"
//                         />
//                         <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">
//                             Doctor Visit
//                         </StyledText>
//                     </StyledView>

//                     {/* Doctor Name */}
//                     <StyledText className="text-sm font-semibold text-gray-900 mb-1">
//                         {name}
//                     </StyledText>

//                     {/* Specialty */}
//                     <StyledText className="text-xs text-gray-500 mb-2">
//                         {specialty}
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
//                             {completionStatus === 'completed' ? '✓ ' : completionStatus === 'pending' ? '⏳ ' : ''}
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

// export default DoctorVisitCard;


import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface DoctorVisitCardProps {
    id: string;
    doctorName: string;  // Changed from 'name'
    doctorSpecialization: string;  // Changed from 'specialty'
    time: string;
    hospitalAddress: string;  // Changed from 'location'
    hospitalName?: string;  // Added
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

const DoctorVisitCard: React.FC<DoctorVisitCardProps> = ({
    id,
    doctorName,
    doctorSpecialization,
    time,
    hospitalAddress,
    hospitalName,
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

    // Handle time display - check if it includes AM/PM
    const formatTime = (timeStr: string) => {
        if (timeStr.includes('-')) {
            // It's already formatted as "09:00 - 10:00"
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
                    style={{ borderLeftColor: '#2563EB' }}
                >
                    <StyledView className="flex-row justify-between">
                        <StyledView className="flex-1">
                            {/* Header with icon and type */}
                            <StyledView className="flex-row items-center mb-1">
                                <Ionicons
                                    name="medical"
                                    size={14}
                                    color="#6C757D"
                                />
                                <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">
                                    Doctor Visit
                                </StyledText>
                            </StyledView>

                            {/* Doctor Name */}
                            <StyledText className="text-sm font-semibold text-gray-900 mb-1">
                                {doctorName || 'Unknown Doctor'}
                            </StyledText>

                            {/* Specialization */}
                            <StyledText className="text-xs text-gray-500 mb-2">
                                {doctorSpecialization || 'General Physician'}
                            </StyledText>

                            {/* Location */}
                            <StyledView className="flex-row items-center">
                                <Ionicons name="location-outline" size={12} color="#6C757D" />
                                <StyledText className="text-xs text-gray-500 ml-1">
                                    {hospitalName || hospitalAddress || 'No location specified'}
                                </StyledText>
                            </StyledView>
                        </StyledView>

                        {/* Status Section */}
                        <StyledView className="items-end">
                            {/* Completion Status */}
                            <StyledView className={`px-2 py-1 rounded-full mb-1 ${getStatusClasses(completionStatus)}`}>
                                <StyledText className="text-xs font-medium">
                                    {completionStatus === 'completed' ? '✓ ' : completionStatus === 'pending' ? '⏳ ' : ''}
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
export const dummyDoctorVisits = [];

export default DoctorVisitCard;