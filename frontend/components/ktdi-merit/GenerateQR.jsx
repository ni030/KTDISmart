import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Text, ToastAndroid, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { getEvent } from '../../services/manageEvent';
import { Button, Dialog, Portal } from 'react-native-paper';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

const GenerateQR = ({ visible, setVisible, qrcodeID }) => {
  const [data, setData] = useState('');
  const id = qrcodeID;
  const [title, setTitle] = useState('');
  const viewShotRef = useRef(null);

  useEffect(() => {
    if(id) {
      const fetchData = async () => {
        try {
          const res = await getEvent(id);
          setData(res);
          setTitle(res[0].eventname)
        } catch (error) {
          console.error('Error getting event:', error.message);
        }
      };
      fetchData();
    }
  }, [id]);

  const hideDialog = () => {
    setVisible(false);
  };

  const saveQRCode = async () => {
    try {
      // Request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Permission Denied: You need to grant media library permissions to save the QR code.', ToastAndroid.LONG);
        return;
      }

      // Capture the QR code as an image
      const uri = await viewShotRef.current.capture();

      // Save the image to the media library
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('QR Codes', asset, false);
      ToastAndroid.show('QR Code Saved to Your Photos.', ToastAndroid.LONG);
    } catch (error) {
      console.error('Error saving QR code:', error.message);
      ToastAndroid.show('Failed to Save the QR Code. Please Try Again.', ToastAndroid.LONG);
    }
  };

  return (
    <SafeAreaView>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          className="w-4/5 m-auto flex justify-center items-center py-4"
        >
          <Dialog.Title className="font-bold p-2 text-primary-600">
            Event QR Code
          </Dialog.Title>
          <Dialog.Content>
            {data ? (
              <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }}>
                <View className="p-10 bg-white shadow-lg rounded-xl">
                  <Text className="text-center pb-5 text-xl font-bold">{title}</Text>
                  <QRCode value={JSON.stringify(data)} size={150} />
                </View>
              </ViewShot>
              ):(<Text>Loading...</Text>)}
            <Button
              mode="elevated"
              textColor="#702341"
              className="mt-8"
              onPress={saveQRCode}
            >
              Save
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default GenerateQR;