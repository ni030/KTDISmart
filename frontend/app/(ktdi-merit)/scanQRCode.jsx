import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import DecodeQR from '../../components/ktdi-merit/DecodeQR';
import { recordMerit } from '../../services/manageMerit';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const ScanQRCode = () => {
  const [userId, setUserId] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation(); 

  // Request camera permissions
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    
    const loadUserId = async () => {
      try {
        const storedUserId = await SecureStore.getItemAsync('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.log('No userId found');
        }
      } catch (error) {
        console.error('Error retrieving userId:', error);
      }
    };
  
    getCameraPermissions();
    loadUserId();
  }, []);

  const handleScanSuccess = async ({ type, data }) => {
    setScanned(true);
    try {
      console.log("data: ", data);
      const [eventData] = JSON.parse(data);
      console.log("eventData: ", eventData);
      const result = await recordMerit(userId, eventData);
      console.log(result);
      if (result === "success") {
        ToastAndroid.show("Merit successfully recorded!", ToastAndroid.LONG);
        setScanned(false);
        navigation.navigate('index');
      }else if(result == "found"){
        ToastAndroid.show("Fail to record. Merit already recorded!", ToastAndroid.LONG);
        setScanned(false);
      }
    } catch (error) {
      console.error("Error processing QR code:", error);
      ToastAndroid.show("Failed to process QR code.", ToastAndroid.LONG);
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="flex-1 justify-end">
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleScanSuccess}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'], 
        }}
        style={StyleSheet.absoluteFillObject}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-52 h-52 border-4 border-white bg-transparent" />
        </View>
      </CameraView>
      <View className="absolute w-1.2 h-2 border bg-slate-500"></View>

      <DecodeQR userId={userId}/>
    </View>
  );
};

export default ScanQRCode;
