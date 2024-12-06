import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ToastAndroid } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import DecodeQR from '../../components/ktdi-merit/DecodeQR';
import { recordMerit } from '../../services/manageMerit';
import { useNavigation } from '@react-navigation/native';


const ScanQRCode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation(); 
  //Temporary user id_
  const user_id = "1a473cd0-9c4d-4a80-bcd6-cfcd2448a430";

  // Request camera permissions
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  const handleScanSuccess = async ({ type, data }) => {
    setScanned(true);
    try {
      console.log("data: ", data);
      const [eventData] = JSON.parse(data);
      console.log("eventData: ", eventData);
      const result = await recordMerit(user_id, eventData);
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

      <DecodeQR user_id={user_id}/>
    </View>
  );
};

export default ScanQRCode;
