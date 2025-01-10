import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateModal from '../../components/ktdi-merit/DateModal';
import { Dropdown } from 'react-native-paper-dropdown';
import { Button, TextInput, PaperProvider, SegmentedButtons, IconButton } from 'react-native-paper';
import { createEvent, checkDuplicateEventName } from '../../services/manageEvent';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import GenerateQR from '../../components/ktdi-merit/GenerateQR';
import EventRecord from '../../components/ktdi-merit/EventRecord';
import * as SecureStore from 'expo-secure-store';

const CATEGORY_OPTIONS = [
  { label: "Career", value: "Career" },
  { label: "Award", value: "Award" },
  { label: "Sport", value: "Sport" },
  { label: "Innovation", value: "Innovation" },
  { label: "Cultural", value: "Cultural" },
  { label: "Academic", value: "Academic" },
  { label: "Volunteer", value: "Volunteer" },
  { label: "Entrepreneurship", value: "Entrepreneurship" },
  { label: "Sustainability", value: "Sustainability" },
  { label: "Leadership", value: "Leadership" }
];

const AUTH_USERS = [
  "1a473cd0-9c4d-4a80-bcd6-cfcd2448a430"
]

const RegisterEvent = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState(false);

  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");

  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const [role, setRole] = useState("");

  const [qrcodeID, setQrcodeID] = useState("");
  const [visible, setVisible] = useState(false);

  const [recordVisible, setRecordVisible] = useState(false);
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await SecureStore.getItemAsync('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          if (AUTH_USERS.includes(storedUserId)) {
            setPermission(true);
          }
        } else {
          console.log('No userId found');
        }


      } catch (error) {
        console.error('Error retrieving userId:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserId();
  }, []);

  const onDismissStart = useCallback(() => {
    setOpenStart(false);
  }, [setOpenStart]);

  const onConfirmStart = useCallback(
    (params) => {
      setOpenStart(false);
      setDateStart(params.date);
      checkDate(params.date, dateEnd);
    },
    [setOpenStart, setDateStart, dateEnd]
  );

  const onDismissEnd = useCallback(() => {
    setOpenEnd(false);
  }, [setOpenEnd]);

  const onConfirmEnd = useCallback(
    (params) => {
      setOpenEnd(false);
      setDateEnd(params.date);
      checkDate(dateStart, params.date);
    },
    [setOpenEnd, setDateEnd, dateStart]
  );

  const checkDate = (start, end) => {
    if (start && end) {
      if (start > end) {
        setDateError(true);
        return false;
      } else {
        setDateError(false);
        return true;
      }
    }
    setDateError(false);
    return true;
  };

  const clearFields = () => {
    setEventName("");
    setCategory("");
    setRole("");
    setDateStart("");
    setDateEnd("");
  };

  const handleCreateEvent = async () => {
    if (!eventName || !category || !role || !dateStart || !dateEnd) {
      ToastAndroid.show("All fields are required!", ToastAndroid.SHORT);
      return;
    }

    const checkDup = await checkDuplicateEventName(eventName);
    if (checkDup) {
      ToastAndroid.show("Event name already exists!", ToastAndroid.SHORT);
      return;
    }

    if (!checkDate(dateStart, dateEnd)) {
      ToastAndroid.show("End date must be later than start date!", ToastAndroid.SHORT);
      return;
    }

    try {
      const res = await createEvent(eventName, category, role, dateStart, dateEnd, userId);
      if (res) {
        setQrcodeID(res.eventId);
        ToastAndroid.show("Event created successfully", ToastAndroid.SHORT);
        setVisible(true);
        clearFields();
      }
    } catch (error) {
      console.error("Error create event:", error.message);
    }
  };

  if (loading) {
    return (
      <View className="flex justify-center items-center h-full">
        <ActivityIndicator size="large" color="#902D53" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <SafeAreaView className="bg-white">
        {permission ? (
        <View className="h-screen w-full py-20 bg-white flex justify-center items-center">
          <View className="w-full h-auto flex flex-row justify-end items-center absolute top-6 z-auto">
            <IconButton
              icon={() => <FontAwesome6 name="bars-staggered" size={26} color="#902D53" />}
              onPress={() => { setRecordVisible(true) }}
              className="m-5 shadow-lg"
            />
          </View>
          <View><Text className="font-bold text-3xl text-primary-600 p-6">Register Event</Text></View>
          <View className="w-4/5 h-2/3 flex justify-center gap-5">

            <TextInput
              label="Event Name"
              mode='outlined'
              activeOutlineColor='#A1335D'
              value={eventName}
              onChangeText={setEventName}
            />

            <View>
              <Dropdown
                label="Category"
                mode='outlined'
                hideMenuHeader={true}
                options={CATEGORY_OPTIONS}
                value={category}
                onSelect={setCategory}
                menuContentStyle={{ backgroundColor: 'white' }}
              ></Dropdown>
            </View>

            <SegmentedButtons
              value={role}
              onValueChange={setRole}
              buttons={[
                {
                  value: 'Committee',
                  label: 'Committee',
                },
                {
                  value: 'Participant',
                  label: 'Participant',
                },
              ]}
            />

            <TouchableOpacity onPress={() => setOpenStart(true)}>
              <TextInput
                mode='outlined'
                placeholder='Start Date'
                value={dateStart ? dateStart.toLocaleDateString('en-GB') : ""}
                editable={false}
                right={<TextInput.Icon icon="calendar-month" />}
                outlineColor={dateError ? '#dc2626' : undefined}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenEnd(true)}>
              <TextInput
                mode='outlined'
                placeholder='End Date'
                value={dateEnd ? dateEnd.toLocaleDateString('en-GB') : ""}
                editable={false}
                right={<TextInput.Icon icon="calendar-month" />}
                outlineColor={dateError ? '#dc2626' : undefined}
              />
            </TouchableOpacity>

            {dateError && (
              <Text className="text-center -top-3 text-sm text-red-600">
                End date must be later than start date!
              </Text>
            )}

            <DateModal open={openStart} onDismiss={onDismissStart} onConfirm={onConfirmStart} date={dateStart} />
            <DateModal open={openEnd} onDismiss={onDismissEnd} onConfirm={onConfirmEnd} date={dateEnd} />

            <Button mode="contained" className="bg-primary-300 p-1" onPress={handleCreateEvent}>
              Register
            </Button>

            <GenerateQR visible={visible} setVisible={setVisible} qrcodeID={qrcodeID} />
            <EventRecord userId={userId} recordVisible={recordVisible} setRecordVisible={setRecordVisible} />

          </View>
        </View>
        ):(
          <View className="h-screen w-full bg-white flex justify-center items-center">
            <View>
              <FontAwesome6 name="triangle-exclamation" size={72} color="#702341" />
            </View>
            <Text className="font-bold text-3xl text-center text-primary-600 p-4">You are not authorized to access this page</Text>
          </View>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
};

export default RegisterEvent;