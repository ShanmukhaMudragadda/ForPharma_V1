// // components/TourPlanCard.tsx
// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { styled } from 'nativewind';
// import { Ionicons } from '@expo/vector-icons';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchableOpacity = styled(TouchableOpacity);

// interface TourPlanCardProps {
//     id: string;
//     title: string;
//     purpose: string;
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

// // Dummy data for tour plans
// export const dummyTourPlans: TourPlanCardProps[] = [
//     {
//         id: 'tour-1',
//         title: 'Central Delhi Market Survey',
//         purpose: 'Market Research',
//         time: '04:00 PM',
//         location: 'Karol Bagh, Central Delhi',
//         completionStatus: 'pending',
//         approvalStatus: 'approved',
//         coordinates: { latitude: 28.6514, longitude: 77.1902 },
//     },
//     {
//         id: 'tour-2',
//         title: 'Hospital Network Analysis',
//         purpose: 'Competition Study',
//         time: '09:30 AM',
//         location: 'Rohini Sector 5, North Delhi',
//         completionStatus: 'completed',
//         approvalStatus: 'approved',
//         coordinates: { latitude: 28.7495, longitude: 77.1198 },
//     },
//     {
//         id: 'tour-3',
//         title: 'Pharmacy Chain Assessment',
//         purpose: 'Partnership Opportunity',
//         time: '02:30 PM',
//         location: 'Nehru Place, South Delhi',
//         completionStatus: 'pending',
//         approvalStatus: 'pending',
//         hasConflict: true,
//         coordinates: { latitude: 28.5488, longitude: 77.2513 },
//     },
//     {
//         id: 'tour-4',
//         title: 'Medical Conference Prep',
//         purpose: 'Event Planning',
//         time: '06:00 PM',
//         location: 'India Habitat Centre, Lodhi Road',
//         completionStatus: 'pending',
//         approvalStatus: 'draft',
//         coordinates: { latitude: 28.5933, longitude: 77.2265 },
//     },
//     {
//         id: 'tour-5',
//         title: 'Territory Expansion Survey',
//         purpose: 'New Area Exploration',
//         time: '11:00 AM',
//         location: 'Gurgaon Sector 48',
//         completionStatus: 'rescheduled',
//         approvalStatus: 'rejected',
//         coordinates: { latitude: 28.4089, longitude: 77.0382 },
//     },
// ];

// const TourPlanCard: React.FC<TourPlanCardProps> = ({
//     id,
//     title,
//     purpose,
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
//             style={{ borderLeftColor: "#16a34a" }}
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
//                             name="map"
//                             size={14}
//                             color="#6C757D"
//                         />
//                         <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">
//                             Tour Plan
//                         </StyledText>
//                     </StyledView>

//                     {/* Title */}
//                     <StyledText className="text-sm font-semibold text-gray-900 mb-1">
//                         {title}
//                     </StyledText>

//                     {/* Purpose */}
//                     <StyledText className="text-xs text-gray-500 mb-2">
//                         {purpose}
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

// export default TourPlanCard;

// components/TourPlanCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface TourPlanCardProps {
    id: string;
    title: string;
    purpose: string;
    time: string;
    location: string;
    completionStatus: 'pending' | 'completed' | 'rescheduled';
    approvalStatus: 'draft' | 'pending' | 'approved' | 'rejected';
    hasConflict?: boolean;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    onPress?: () => void;
    onConflictPress?: () => void;
}

// Dummy data for tour plans
export const dummyTourPlans: TourPlanCardProps[] = [
    {
        id: 'tour-1',
        title: 'Central Delhi Market Survey',
        purpose: 'Market Research',
        time: '04:00 PM',
        location: 'Karol Bagh, Central Delhi',
        completionStatus: 'pending',
        approvalStatus: 'approved',
        coordinates: { latitude: 28.6514, longitude: 77.1902 },
    },
    {
        id: 'tour-2',
        title: 'Hospital Network Analysis',
        purpose: 'Competition Study',
        time: '09:30 AM',
        location: 'Rohini Sector 5, North Delhi',
        completionStatus: 'completed',
        approvalStatus: 'approved',
        coordinates: { latitude: 28.7495, longitude: 77.1198 },
    },
    {
        id: 'tour-3',
        title: 'Pharmacy Chain Assessment',
        purpose: 'Partnership Opportunity',
        time: '02:30 PM',
        location: 'Nehru Place, South Delhi',
        completionStatus: 'pending',
        approvalStatus: 'pending',
        hasConflict: true,
        coordinates: { latitude: 28.5488, longitude: 77.2513 },
    },
    {
        id: 'tour-4',
        title: 'Medical Conference Prep',
        purpose: 'Event Planning',
        time: '06:00 PM',
        location: 'India Habitat Centre, Lodhi Road',
        completionStatus: 'pending',
        approvalStatus: 'draft',
        coordinates: { latitude: 28.5933, longitude: 77.2265 },
    },
    {
        id: 'tour-5',
        title: 'Territory Expansion Survey',
        purpose: 'New Area Exploration',
        time: '11:00 AM',
        location: 'Gurgaon Sector 48',
        completionStatus: 'rescheduled',
        approvalStatus: 'rejected',
        coordinates: { latitude: 28.4089, longitude: 77.0382 },
    },
];

const TourPlanCard: React.FC<TourPlanCardProps> = ({
    id,
    title,
    purpose,
    time,
    location,
    completionStatus,
    approvalStatus,
    hasConflict,
    onPress,
    onConflictPress,
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

    const timeParts = time.split(' ');
    const timeValue = timeParts[0];
    const timePeriod = timeParts[1];

    return (
        <StyledView className="flex-row border-b border-gray-100">
            {/* Time Section */}
            <StyledView className="w-20 py-4 px-2 border-r border-gray-100 bg-gray-50 items-center justify-center">
                <StyledText className="text-sm font-semibold text-[#0077B6]">{timeValue}</StyledText>
                <StyledText className="text-xs text-gray-500">{timePeriod}</StyledText>
            </StyledView>

            {/* Card Content */}
            <StyledView className="flex-1 p-3">
                <StyledTouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.3}
                    className="bg-white rounded-lg border-l-4  shadow-sm p-3"
                    style={{ borderLeftColor: "#16a34a" }}
                >

                    <StyledView className="flex-row justify-between">
                        <StyledView className="flex-1">
                            {/* Header with icon and type */}
                            <StyledView className="flex-row items-center mb-1">
                                <Ionicons
                                    name="map"
                                    size={14}
                                    color="#6C757D"
                                />
                                <StyledText className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">
                                    Tour Plan
                                </StyledText>
                            </StyledView>

                            {/* Title */}
                            <StyledText className="text-sm font-semibold text-gray-900 mb-1">
                                {title}
                            </StyledText>

                            {/* Purpose */}
                            <StyledText className="text-xs text-gray-500 mb-2">
                                {purpose}
                            </StyledText>

                            {/* Location */}
                            <StyledView className="flex-row items-center">
                                <Ionicons name="location-outline" size={12} color="#6C757D" />
                                <StyledText className="text-xs text-gray-500 ml-1">
                                    {location}
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

export default TourPlanCard;