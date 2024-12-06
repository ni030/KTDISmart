import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateModal from '../../components/ktdi-merit/DateModal';
import { Dropdown } from 'react-native-paper-dropdown';
import { Button, TextInput, PaperProvider, SegmentedButtons, IconButton } from 'react-native-paper';
import { createEvent, checkDuplicateEventName } from '../../services/manageEvent';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import GenerateQR from '../../components/ktdi-merit/GenerateQR';
import EventRecord from '../../components/ktdi-merit/EventRecord';

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

const ROLE_OPTIONS = [
  { label: "Participant", value: "Participant" },
  { label: "Committee", value: "Committee" },
]

const RegisterEvent = () => {

  //Temporary user id_
  const user_id = "1a473cd0-9c4d-4a80-bcd6-cfcd2448a430";
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


  const onDismissStart = useCallback(() => {
    setOpenStart(false);
  }, [setOpenStart]);

  const onConfirmStart = useCallback(
    (params) => {
      setOpenStart(false);
      setDateStart(params.date);
    },
    [setOpenStart, setDateStart]
  );

  const onDismissEnd = useCallback(() => {
    setOpenEnd(false);
  }, [setOpenEnd]);

  const onConfirmEnd = useCallback(
    (params) => {
      setOpenEnd(false);
      setDateEnd(params.date);
    },
    [setOpenEnd, setDateEnd]
  );

  checkDate = () => {
    if (dateEnd < dateStart) {
      return false;
    }
    return true;
  }
  const clearFields = () => {
    setEventName("");
    setCategory("");
    setRole("");
    setDateStart("");
    setDateEnd("");
  }

  const handleCreateEvent = async () => {

    if (!eventName || !category || !role || !dateStart || !dateEnd) {
      ToastAndroid.show("All fields are required!", ToastAndroid.SHORT);
      return;
    }

    const checkDup = await checkDuplicateEventName(eventName);
    if(checkDup){
      ToastAndroid.show("Event name already exists!", ToastAndroid.SHORT);
      return;
    }

    if(!checkDate()){
      ToastAndroid.show("End date must be after start date!", ToastAndroid.SHORT);
      return;
    }

    try{
      const res = await createEvent(eventName, category, role, dateStart, dateEnd, user_id);
      if(res){
        setQrcodeID(res.eventId);
        ToastAndroid.show("Event created successfully", ToastAndroid.SHORT);
        setVisible(true);
        clearFields();
      }
    }catch(error){
      console.error("Error create event:", error.message);
    }
  }

  return (
    <PaperProvider>
      <SafeAreaView className="bg-white">
        <View className="h-screen w-full py-20 bg-white flex justify-center items-center">
          <View className="w-full h-auto flex flex-row justify-end items-center absolute top-6 z-auto">
            <IconButton
              icon={() => <FontAwesome6 name="bars-staggered" size={26} color="#902D53" />}
              onPress={() => {setRecordVisible(true)}}
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
                right={<TextInput.Icon icon="calendar-month"/>}

              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenEnd(true)}>
              <TextInput
                mode='outlined'
                placeholder='End Date'
                value={dateEnd ? dateEnd.toLocaleDateString('en-GB') : ""}
                editable={false}
                right={<TextInput.Icon icon="calendar-month"/>}
              />
            </TouchableOpacity>
            
            <DateModal open={openStart} onDismiss={onDismissStart} onConfirm={onConfirmStart} date={dateStart}/>
            <DateModal open={openEnd} onDismiss={onDismissEnd} onConfirm={onConfirmEnd} date={dateEnd}/>

            <Button mode="contained" className="bg-primary-300 p-1" onPress={handleCreateEvent}>
              Register
            </Button>

            <GenerateQR visible={visible} setVisible={setVisible} qrcodeID={qrcodeID}/>
            <EventRecord user_id={user_id}  recordVisible={recordVisible} setRecordVisible={setRecordVisible} />

          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default RegisterEvent;