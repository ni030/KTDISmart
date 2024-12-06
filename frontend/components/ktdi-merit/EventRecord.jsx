import React, { useEffect, useState } from 'react';
import { Dialog, Portal, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getEventList } from '../../services/manageEvent';
import { ScrollView, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import GenerateQR from './GenerateQR';

const EventRecord = ({
  user_id,
  recordVisible,
  setRecordVisible,
}) => {
  const [eventList, setEventList] = useState([]);
  const [qrcodeId, setQrcodeId] = useState('');
  const [qrVisible, setQrVisible] = useState(false);

  const hideDialog = () => {
    setRecordVisible(false);
    setEventList([]);
  };

  useEffect(() => {
    if(!user_id) return;
    const fetchData = async () => {
      try {
        console.log('Fetching event list...');
        const res = await getEventList(user_id);
        setEventList(res);
      } catch (error) {
        console.error('Error getting event list:', error.message);
      }
    };
    fetchData();
  }, [recordVisible]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handlePress = (eventId) => {
    setQrcodeId(eventId);
    setQrVisible(true);
    hideDialog();
  };

  return (
    <SafeAreaView>
      <Portal >
        <Dialog
          visible={recordVisible}
          onDismiss={hideDialog}
          className="w-11/12 h-auto max-h-[65%] m-auto flex justify-center py-10"
        >
          <Dialog.Title className="flex px-2">
            <Text className="font-bold text-3xl text-primary-700">Event Record</Text>
          </Dialog.Title>
          <Dialog.Content>
            {eventList && eventList.length > 0 ? (
              <ScrollView className="flex w-full">
              {eventList.map((event, index) => (
                <TouchableRipple
                  key={index}
                  onPress={() => handlePress(event.eventid)}
                  rippleColor="rgba(144, 45, 83, 0.2)"
                >
                  <View className="w-full h-auto flex mx-auto justify-center p-5 my-1 rounded-2xl bg-white/90 shadow">
                    <View className="flex flex-row justify-evenly">
                      <View>
                        <Text className="font-bold text-xl text-primary-600">{event.eventname}</Text>
                        <Text className="text-base font-bold text-primary-500">{event.category} ({event.role})</Text>
                        <Text className="text-sm">{formatDate(event.startdate)} - {formatDate(event.enddate)}</Text>
                      </View>
                      <View className="shadow-lg my-auto mr-0">
                        <FontAwesome6 name="qrcode" size={46} color="#902D53" />
                      </View>
                    </View>
                  </View>
                </TouchableRipple>
              ))}
            </ScrollView>
            ): (<Text className="text-center text-primary-600 text-xl">No event record found</Text>)
              }
          </Dialog.Content>
        </Dialog>
        <GenerateQR visible={qrVisible} setVisible={setQrVisible} qrcodeID={qrcodeId} />
      </Portal>
    </SafeAreaView>
  );
};

export default EventRecord;