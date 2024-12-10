import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import ProgressBar from '../../components/complaint/progressBar';
import { useRoute } from '@react-navigation/native';

const Progress = () => {
  const route = useRoute();
  const { complaint } = route.params;

  // Determine the message to display
  const getStatusMessage = () => {
    if (!complaint.estimated_time) {
      return 'Sorry, a constructor has not been assigned yet.';
    } else if (complaint.completed_time) {
      return 'Congratulations, your problem has been resolved!';
    } else {
      const formattedDate = new Intl.DateTimeFormat('en-GB').format(new Date(complaint.estimated_time));
      return `Estimated Construction Date: ${formattedDate}`;
    }
  };

  // Determine the icon/image to display
  const getImageSource = () => {
    if (complaint.completed_time) {
      return 'https://www.pmlabelgroup.com/wp-content/uploads/2022/01/DIJVlogo-transparant500px.png'; // Congratulations icon
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

  return (
    <SafeAreaView className="w-screen h-screen bg-primary-500">
      <ScrollView>
        {/* Progress Bar */}
        <ProgressBar complaint={complaint} />

        {/* Constructor Info Section */}
        <View className="flex-row items-center m-4 px-4 rounded-lg bg-primary-100">
          {/* Icon or Image */}
          <View className="w-36 h-36 flex items-center justify-center mr-4">
            <Image
              source={{ uri: getImageSource() }} // Dynamically set the image source
              className="w-28 h-28 rounded-full"
            />
          </View>

          {/* Status Message */}
          <View className="flex-1">
            <Text className="text-white text-base font-medium">
              {getStatusMessage()}
            </Text>
          </View>
        </View>

        {/* Complaint Details */}
        <View className="flex m-4 mt-2 pt-2 px-4 rounded-lg bg-primary-100">
          <Text className="text-xl text-white font-bold">Complaint Detail:</Text>
          <View className="flex-row m-2 mb-0 p-2">
            <View className="flex p-1">
              <Text className="text-white text-base">Category: </Text>
            </View>
            <View className="flex-grow p-1 bg-primary-300 rounded-lg">
              <Text className="text-white text-base">{complaint.category}</Text>
            </View>
          </View>
          <View className="flex-row m-2 mt-0 mb-0 p-2 pb-1">
            <View className="flex p-1">
              <Text className="text-white text-base">Defect type: </Text>
            </View>
            <View className="flex-grow p-1 bg-primary-300 rounded-lg">
              <Text className="text-white text-base">{defectDescription}</Text>
            </View>
          </View>
          <View className="flex p-2 ml-3 mt-0 mb-0">
            <Text className="text-white text-base">Description: </Text>
          </View>
          <View className="flex-grow ml-4 mr-4 mb-1 p-1 bg-primary-300 rounded-lg">
            <Text className="text-white text-base">{complaint.description}</Text>
          </View>
          <View className="flex p-2 ml-3 mt-0 mb-0">
            <Text className="text-white text-base">Image: </Text>
          </View>
          <View className="flex items-center justify-center mr-4 ml-6 mb-4">
            <Image
              source={{ uri: complaint.complaintimage }}
              style={{ width: 320, height: 240 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Progress;
