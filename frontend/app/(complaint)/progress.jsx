import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import ProgressBar from '../../components/complaint/progressBar';
import { useRoute } from '@react-navigation/native';
import { cancelComplaint } from '../../services/manageComplaintForm';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/root/Loader';
import * as SecureStore from 'expo-secure-store';
import authService from '../../services/authServices';
import FeedbackDialog from '../../components/complaint/feedbackDialog';
import { PaperProvider } from 'react-native-paper';

const Progress = () => {
  const route = useRoute();
  const { complaint } = route.params;
  const [loading, setLoading] = useState(false); // Loading state for cancel complaint
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [dialogVisible, setDialogVisible] = React.useState(false);

  // Determine the message to display
  const getStatusMessage = () => {
    if (complaint.status === 'cancelled') {
      return `Your complaint is cancelled!`;
    }else if (!complaint.estimated_time) {
      return 'Sorry, a constructor has not been assigned yet.';
    } else if (complaint.completed_time) {
      return 'Congratulations, your problem has been resolved!';
    } else if (complaint.status === 'expired') {
      const formattedDate = new Intl.DateTimeFormat('en-GB').format(new Date(complaint.estimated_time));
      return `Your complaint is expired! \nEstimated Construction Date: ${formattedDate}`;
    } else {
      const formattedDate = new Intl.DateTimeFormat('en-GB').format(new Date(complaint.estimated_time));
      return `Estimated Construction Date: ${formattedDate}`;
    }
  };

  // Determine the icon/image to display
  const getImageSource = () => {
    if (complaint.completed_time) {
      return 'https://www.pmlabelgroup.com/wp-content/uploads/2022/01/DIJVlogo-transparant500px.png'; // Congratulations icon
    } else if (complaint.status === 'cancelled' || complaint.status === 'expired') {
      return 'https://www.safetysigns.ie/cdn/shop/collections/Hazard_Warning_1200x1200_crop_center.png?v=1647962955'; // Alert icon
    }
    return 'https://cdn-icons-png.flaticon.com/512/10345/10345016.png'; // Default constructor icon
  };

  const defectTypeMap = {
    blackout: 'Blackout/Trip',
    pestControl: 'Termites/Rat/Bat/Snakes/Caterpillar',
    showerHead: 'Shower Head Missing/Damage',
    noWater: 'Lost Water Supply',
    headPipe: 'Head Pipe Damage',
    toiletBowl: 'Toilet Bowl Clogged/Damage',
    sink: 'Sink Clogged/Damage/Leakage',
    cistern: 'Cistern Broke/Damage',
  };

  const defectDescription = defectTypeMap[complaint.defecttype] || complaint.defecttype;

  const cancelComplaintTicket = async (complaintid) => {
    setLoading(true); // Start loading when the cancellation starts
    try {
      const res = await cancelComplaint(complaintid);
      if (res === "Success") {
        ToastAndroid.show('Complaint Cancelled Successfully!', ToastAndroid.LONG, ToastAndroid.CENTER);
        navigation.navigate('index');
      }
    } catch (error) {
      console.error("Error in cancelComplaint:", error);
      ToastAndroid.show('Failed to cancel complaint. Try again later.', ToastAndroid.LONG, ToastAndroid.CENTER);
    } finally {
      setLoading(false); // Stop loading after the process ends
    }
  };

  // Handlers for Cancel and Resubmit buttons
  const handleCancel = () => {
    Alert.alert('Cancel Complaint', 'Are you sure you want to cancel this complaint?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => cancelComplaintTicket(complaint.complaintid) },
    ]);
  };

  const confirmResubmit = () => {
    Alert.alert('Resubmit Complaint', 'You can resubmit your complaint now.', [
      { text: 'No', style: 'cancel' },
      { text: 'OK', onPress: () =>  navigation.navigate('report', {
        is_resubmit: true,
        parent_id: complaint.complaintid,
        prev_complaint: complaint,
        cat: complaint.category, // Include category
        userId: complaint.user_id, // Include user ID if needed
        userInfo: userInfo, // Pass user information
      })},
    ]);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserId = await SecureStore.getItemAsync('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          const response = await authService.getUserById(storedUserId);
          setUserInfo(response.user);
        }
      } catch (error) {
        console.error('Error retrieving userId:', error);
      }
    };
    loadUserData();
  }, []);

  useEffect(()=>{
    console.log('Complaint status:', complaint.status);
    if(complaint.status=="completed"){
    setDialogVisible(true);
  }},[complaint]);

  if (loading) {
    return <Loader />;
  }

  return (
    <PaperProvider>
      <ScrollView className="w-screen flex-1 bg-primary-500">
        <SafeAreaView className="mb-20">
          {/* Progress Bar */}
          <ProgressBar complaint={complaint} />

          {/* Constructor Info Section */}
          <View className="flex-row items-center mx-4 mt-4 px-4 py-6 rounded-lg bg-primary-100 mr-4">
            {/* Image on the Left */}
            <View className="w-28 h-28 flex items-center justify-center mr-4">
              <Image
                source={{ uri: getImageSource() }}
                className="w-24 h-24"
              />
            </View>

            <View className="flex-1">
              {/* Status Message and Buttons Section */}
              <View className="flex-1 justify-center">
                {/* Status Message */}
                <Text className="text-white text-base font-medium mb-2">
                  {getStatusMessage()}
                </Text>

                {/* Buttons */}
                <View className="flex-row justify-between mt-3">
                  {!['cancelled', 'completed', 'rated'].includes(complaint.status) && (
                    <TouchableOpacity
                      className="bg-red-500 px-4 py-2 rounded-lg flex-1 mr-2"
                      onPress={handleCancel}
                      disabled={loading} // Disable the button if loading
                    >
                        <Text className="text-white text-base text-center">
                          {complaint.status === 'expired' ? 'Cancel' : 'Cancel Complaint'}
                        </Text>
                    </TouchableOpacity>
                  )}

                  {complaint.status === 'expired' && (
                    <TouchableOpacity
                      className="bg-green-500 px-4 py-2 rounded-lg flex-1"
                      onPress={confirmResubmit}
                    >
                      <Text className="text-white text-base text-center">Resubmit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

          </View>

          {/* Complaint Details */}
          <View className="mx-4 mt-4 p-4 rounded-lg bg-primary-100">
            <Text className="text-xl text-white font-bold mb-3">Complaint Detail:</Text>
            <View className="mb-3">
              <Text className="text-white text-base mb-1">Category: </Text>
              <View className="flex-grow p-3 bg-primary-300 rounded-lg">
                <Text className="text-white text-base">{complaint.category}</Text>
              </View>
            </View>
            <View className="mb-3">
              <Text className="text-white text-base mb-1">Defect type:</Text>
              <View className="p-3 bg-primary-300 rounded-lg">
                <Text className="text-white text-base">{defectDescription}</Text>
              </View>
            </View>
            <View className="mb-3">
              <Text className="text-white text-base mb-1">Description:</Text>
              <View className="p-3 bg-primary-300 rounded-lg">
                <Text className="text-white text-base">{complaint.description}</Text>
              </View>
            </View>

            {/* Image */}
            <View className="mb-1">
              <Text className="text-white text-base mb-2">Image:</Text>
              <View className="flex items-center justify-center">
                <Image
                  source={{ uri: complaint.complaintimage }}
                  className="w-80 h-60 rounded-lg"
                />
              </View>
            </View>
          </View>
          <FeedbackDialog visible={dialogVisible} setVisible={setDialogVisible} userId={userId} complaintid={complaint.complaintid}/>
        </SafeAreaView>
      </ScrollView>
    </PaperProvider>
  );
};

export default Progress;
