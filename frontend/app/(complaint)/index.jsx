import React, { useEffect, useState } from 'react';
import NoComplaint from '../../components/complaint/noComplaint';
import HaveComplaint from '../../components/complaint/haveComplaint';
import { SafeAreaView } from 'react-native';
import ProtectedRoute from '../../components/root/ProtectedRoute';
import { checkExistingForm } from '../../services/manageComplaintForm';
import Loader from '../../components/root/Loader';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

const History = () => {
  const [isExist, setExist] = useState(false); // Tracks if complaints exist
  const [loading, setLoading] = useState(true);
  const [complaintsData, setComplaintsData] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch complaints based on userId
  const checkExisting = async (userId) => {
    try {
      setLoading(true); // Show loader during data fetch
      const res = await checkExistingForm(userId);
      if (res === 'empty' || !res || res.length === 0) {
        setExist(false); // No complaints found
      } else {
        setExist(true);
        setComplaintsData(res); // Set complaints data if available
      }
    } catch (error) {
      console.error('Error in checkExisting:', error);
    } finally {
      setLoading(false); // Hide loader once fetch is complete
    }
  };

  useFocusEffect(
    React.useCallback(() => {
    const loadData = async () => {
      try {
        const storedUserId = await SecureStore.getItemAsync('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          await checkExisting(storedUserId);
        } else {
          console.log('No userId found');
        }
      } catch (error) {
        console.error('Error retrieving userId:', error);
      }
    };
    loadData();
  }, [])
  );

  if (loading) {
    return <Loader />;
  }

  // Render the appropriate component based on whether complaints exist
  return (
    <SafeAreaView className="w-screen flex-1 bg-primary-500">
      {isExist ? <HaveComplaint complaints={complaintsData} /> : <NoComplaint />}
    </SafeAreaView>
  );
};

export default () => (
  <ProtectedRoute>
    <History />
  </ProtectedRoute>
);
