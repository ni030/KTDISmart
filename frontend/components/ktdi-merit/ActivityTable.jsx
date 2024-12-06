import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { calcBatch, getPersonalMeritDetail } from '../../services/manageMerit';
import { FontAwesome6 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const ActivityTable = ({ user_id }) => {
  const [activityList, setActivityList] = useState([]);
  const [score, setScore] = useState(0);
  const [batchNum, setBatchNum] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const res = await getPersonalMeritDetail(user_id);
          if (res && res.length > 0) {
            const score = await updateScore();
            setScore(score);
            setActivityList(res[0].events);
            const batch = await calcBatch(user_id);
            setBatchNum(batch);
          } else {
            console.log('No merit details found for user:', user_id);
          }
        } catch (error) {
          console.error('Error getting event list:', error.message);
        }
      };
      fetchData();
    }, [])
  );

  const updateScore = async () => {
    try {
      const updatedData = await getPersonalMeritDetail(user_id);
      if (updatedData && updatedData.length > 0) {
        return updatedData[0].score;
      }
    }catch(error){
        console.error("Error update score in service:", error.message)
    }
}

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const setEachIcon = (category) => {
    switch (category) {
      case 'Career':
        return 'briefcase';
      case 'Award':
        return 'award';
      case 'Sport':
        return 'table-tennis-paddle-ball';
      case 'Innovation':
        return 'lightbulb';
      case 'Cultural':
        return 'pied-piper-alt';
      case 'Academic':
        return 'school';
      case 'Volunteer':
        return 'hand-holding-heart';
      case 'Entrepreneurship':
        return 'rocket';
      case 'Sustainability':
        return 'leaf';
      case 'Leadership':
        return 'user-tie';
      default:
        return 'question';
    }
  };

  return (
    <View className="w-10/12 flex justify-end min-h-[65%] max-h-[75%]">
      <Text className="font-bold text-3xl text-white p-3">Activity List</Text>
      <ScrollView className="my-2">
        {activityList.length > 0 ? (
          activityList.map((ktdimerit, index) => (
            <View className="w-full h-auto flex mx-auto justify-center p-3 my-1 rounded-xl bg-white shadow-inner" key={index}>
              <View className="flex flex-row justify-evenly">
                <View>
                  <Text className="font-bold text-xl text-primary-600">{ktdimerit.eventname}</Text>
                  <Text className="text-base font-bold text-primary-500">{ktdimerit.category} ({ktdimerit.role})</Text>
                  <Text className="text-sm">{formatDate(ktdimerit.startdate)} - {formatDate(ktdimerit.enddate)}</Text>
                </View>
                <View className="shadow-lg my-auto mr-0">
                  <FontAwesome6 name={setEachIcon(ktdimerit.category)} size={45} color="#902D53" />
                </View>
              </View>
            </View>
          ))
        ) : (
          <View className="bg-white/10 rounded-lg p-2">
            <Text className="text-white text-center text-lg">No activities found.</Text>
          </View>
        )}
      </ScrollView>
      <View className="w-full h-auto p-2 flex flex-row justify-around rounded-md bg-primary-600">
        <Text className="font-bold text-white text-lg">Score: {score}</Text>
        <Text className="font-bold text-white text-lg">Batch: {batchNum}</Text>
      </View>
    </View>
  );
};

export default ActivityTable;