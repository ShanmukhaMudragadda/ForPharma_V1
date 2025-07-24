import React , {useState} from 'react'
import { View, Text ,ScrollView,TouchableOpacity,StatusBar,
    Alert , SafeAreaView} from 'react-native'
import { styled } from 'nativewind'   
import { useRouter , Link, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Drawer from '../components/drawer.tsx';
import QuickActionCard from '../components/quickActionCard.tsx'
import TaskCard from '../components/taskCard.tsx'



const StyledView = styled(View)
const StyledText = styled(Text)
const StyledScrollView = styled(ScrollView)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledSafeAreaView = styled(SafeAreaView)



export default function Home(){
         const router = useRouter();
         const [isCheckedIn, setIsCheckedIn] = useState(false);
         const [checkInTime, setCheckInTime] = useState<Date | null>(null);
         const [sidebarOpen, setSidebarOpen] = useState(false);

    // Recent Activity


const ActivityItem = ({ icon, title, subtitle, time, bgColor, iconColor }: any) => {
  return (
    <StyledView className="flex-row items-center py-3 border-b border-gray-100">
      <StyledView className="w-10 h-10 rounded-lg items-center justify-center mr-3"
        style={{ backgroundColor: bgColor }}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </StyledView>
      
      <StyledView className="flex-1">
        <StyledText className="text-sm font-medium text-gray-900">{title}</StyledText>
        <StyledText className="text-xs text-gray-600">{subtitle}</StyledText>
      </StyledView>
      
      <StyledText className="text-xs text-gray-500">{time}</StyledText>
    </StyledView>
  );
};

const handleLogin = ()=>{
   router.push('/login');
}
const handleCheckInOut = () => {
  if (isCheckedIn) {
    // Check out
    const checkOutTime = new Date();
    const workDuration = checkInTime ? checkOutTime.getTime() - checkInTime.getTime() : 0;
    const hours = Math.floor(workDuration / (1000 * 60 * 60));
    const minutes = Math.floor((workDuration % (1000 * 60 * 60)) / (1000 * 60));

    Alert.alert(
      'Check Out',
      `You checked out at ${checkOutTime.toLocaleTimeString()} from Forsys Inc, HYD. You worked for ${hours}h ${minutes}m today. Thank you!`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setIsCheckedIn(false);
            setCheckInTime(null);
          },
        },
      ]
    );
  } else {
    // Check in
    const time = new Date();
    Alert.alert(
      'Check In',
      `You checked in at ${time.toLocaleTimeString()} from Forsys Inc, HYD today`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setCheckInTime(time);
            setIsCheckedIn(true);
          },
        },
      ]
    );
  }
};



    return (
       


        <StyledSafeAreaView className="flex-1 bg-white">


            <StatusBar backgroundColor="#0077B6" barStyle="light-content" />

            <StyledView className='bg-[#0077B6] px-5 py-10 flex-row justify-between items-center'>
        <StyledTouchableOpacity className='w-10 h-10 rounded-lg bg-white/20 items-center justify-center'
        onPress={() => setSidebarOpen(true)}>
          <Ionicons name="menu" size={24} color="white" />
        </StyledTouchableOpacity>

        <StyledView className='flex-row gap-3'>

          <StyledTouchableOpacity className='w-10 h-10 rounded-sm bg-white/20 items-center justify-center'>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <StyledView className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </StyledTouchableOpacity>
          
          <StyledTouchableOpacity className='w-10 h-10 rounded-sm bg-white/20 items-center justify-center'>
            <Ionicons name="person-outline" size={24} color="white" />
          </StyledTouchableOpacity>

        </StyledView>

      </StyledView>


      {/* Greetings Section */}

      <StyledScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        <StyledView className='bg-[#E6F3FA] px-5 py-6'>
            <StyledText className='text-xl font-semibold text-[#003D58]'>
                Hii Ravi!! , Have A Great Day......
            </StyledText>

            <StyledText className='text-base text-[#005A87] mt-1'>
                {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            </StyledText>
        </StyledView>


        {/* Check-In Button */}

        <StyledView className="bg-gray-50 px-5 py-6">
          <StyledTouchableOpacity
            className={`w-full py-4 rounded-xl flex-row items-center justify-center gap-2 ${
              isCheckedIn ? 'bg-green-500' : 'bg-[#0077B6]'
            }`}
            onPress={handleLogin}
            style={{
              shadowColor: isCheckedIn ? '#28A745' : '#0077B6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <Ionicons 
              name={isCheckedIn ? "checkmark-circle" : "time-outline"} 
              size={20} 
              color="white" 
            />
            <StyledText className="text-white font-semibold text-base">
              {isCheckedIn ? 'Check Out' : 'Check In'}
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Today's Tasks */}

        <StyledView className="px-5 mb-6">
          <StyledView className="flex-row justify-between items-center mb-4">

            <StyledText className="text-lg font-semibold text-gray-900">
              Today's Tasks
            </StyledText>

            <StyledTouchableOpacity>
              <StyledText className="text-sm text-[#0077B6]">View All</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          <TaskCard
            type="doctor"
            name="Dr. Apsara"
            location="Apollo"
            time="10:00 AM"
          />
          <TaskCard
            type="chemist"
            name="MedPlus Pharmacy"
            location="Sector 18dasdassadasdfasdas"
            time="11:30 AM"
          />
          <TaskCard
            type="doctor"
            name="Dr. Riya"
            location="City Clinic"
            time="2:00 PM"
          />
        </StyledView>


        {/* Quick Actions */}

         <StyledView className="px-5 mb-6">
          <StyledText className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </StyledText>
          
            <StyledView className="flex-row justify-between items-center" style={{
              height:100
            }}>
            <QuickActionCard  icon="clipboard-outline" label="Create Order" color="#E6F3FA" iconColor="#0077B6" />
            <QuickActionCard icon="calendar-outline" label="Tour Plan" color="#E6F9FD" iconColor="#00B4D8" />
          </StyledView>
          

          {/* <StyledView className="flex-row justify-around mb-3">
            <QuickActionCard icon="calendar" label="Apply Leave" color="#FFF8E1" iconColor="#FFA000" />
            <QuickActionCard icon="wallet-outline" label="Expense Claim" color="#E8F5E9" iconColor="#28A745" />
          </StyledView> */}

        </StyledView>

         {/* Recent Activities */}
        <StyledView className="px-5 pb-6">
          <StyledText className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activities
          </StyledText>
          <ActivityItem
            icon="clipboard-outline"
            title="Order #ORD-2024-1234"
            subtitle="Apollo Pharmacy - ₹45,000"
            time="2 hrs ago"
            bgColor="#E6F3FA"
            iconColor="#0077B6"
          />
          <ActivityItem
            icon="checkmark"
            title="Visit Completed"
            subtitle="Dr. Mehta - Fortis Hospital"
            time="3 hrs ago"
            bgColor="#E8F5E9"
            iconColor="#28A745"
          />
          <ActivityItem
            icon="document-text-outline"
            title="DCR Submitted"
            subtitle="Daily Call Report - 8 visits"
            time="Yesterday"
            bgColor="#E6F9FD"
            iconColor="#00B4D8"
          />
        </StyledView>


        <Drawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />


      </StyledScrollView>
    </StyledSafeAreaView>
    )


    
}

