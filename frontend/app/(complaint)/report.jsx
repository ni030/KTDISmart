import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { TextInput, PaperProvider, Button } from 'react-native-paper';
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DeclareDialog from '../../components/complaint/declarateDialog';
import ImageModal from '../../components/complaint/imageModal';
import { createForm } from '../../services/manageComplaintForm';


export default function Report() {
    //temp data
    const [matric, setMatric] = React.useState('A22EC0272');
    const [name, setName] = React.useState('Feizhen');
    const [phoneNum, setPhone] = React.useState('012-3456789');
    const [desc, setDesc] = React.useState('');
    const [dorm, setDorm] = React.useState('MA6 210');
    const [type, setType] = React.useState('');
    const [pic,setPic]=React.useState(null);
    const [options, setOptions] = React.useState([]);
    const [uploadVisible,setUploadVisible]=React.useState(true);
    const [modalVisible,setModalVisible]=React.useState(false);
    const [dialogVisible, setDialogVisible] = React.useState(false);
    
    const route = useRoute();
    const { cat } = route.params;

    const createComplaintForm = async () => {
        console.log("create form")
        try{
          const res = await createForm(matric, cat, type, desc, pic);
          if(res === "Success"){
            ToastAndroid.show('Complaint Submitted Successfully!', ToastAndroid.LONG, ToastAndroid.CENTER);
          }
  
        }catch(error){
          console.error("Error in createComplaintForm:", error)
        }
      }

    useEffect(() => {
        // Set options based on the category
        if (cat == "Electrical") {
            setOptions([
                { label: 'Blackout/Trip', value: 'blackout' },
                { label: 'Lamp', value: 'lamp' },
                { label: 'Fan', value: 'fan' },
                { label: 'Socket', value: 'socket' },
                { label: 'Switch', value: 'switch' },
            ]);
        } else if (cat === "Pest Control") {
            setOptions([
                { label: 'Termites/Rat/Bat/Snakes/Caterpillar', value: 'pestControl' },
            ]);
        } else if (cat === "Piping") {
            setOptions([
                { label: 'Shower Head Missing/Damage', value: 'showerHead' },
                { label: 'Lost Water Supply', value: 'noWater' },
                { label: 'Head Pipe Damage', value: 'headPipe' },
            ]);
        } else {
            // Sanitary category
            setOptions([
                { label: 'Toilet Bowl Clogged/Damage', value: 'toiletBowl' },
                { label: 'Sink Clogged/Damage/Leakage', value: 'sink' },
                { label: 'Cistern Broke/Damage', value: 'cistern' },
            ]);
        }
    }, [cat]);

    // Function to pick an image by gallery
  const gallery = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }
    
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setPic(pickerResult.assets[0].uri);
      setUploadVisible(false);
    }
  };

    // Function to pick an image by camera
  const camera = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }
    
    let pickerResult = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.MediaTypeOptions.front,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setPic(pickerResult.assets[0].uri);
      setUploadVisible(false);
    }
  };

  // Check if the form is valid (all required fields filled)
  const isFormValid = () => {
    return name && phoneNum && dorm && type && desc;
  };

    return (
        <GestureHandlerRootView>
        <PaperProvider>
            <ScrollView className="flex-grow-1 bg-primary-500">
            <SafeAreaView className="pl-5 pr-5 w-screen h-auto">
                
                {/* <Text className="text-2xl text-white font-bold">Personal Information</Text> */}
                    
                    <Text className="text-xl text-white m-1">Name:</Text>
                    <TextInput
                        disabled= "true"
                        mode="outlined"
                        value={name}
                        onChangeText={setName}
                    />
                    
                    <Text className="text-xl text-white m-1">Phone Number:</Text>
                    <TextInput
                        mode="outlined"
                        disabled= "true"
                        value={phoneNum}
                        onChangeText={setPhone}
                    />
               
                    <Text className="text-xl text-white m-1">Dorm:</Text>
                    <TextInput
                        mode="outlined"
                        disabled= "true"
                        value={dorm}
                        onChangeText={setDorm}
                    />
           
                <Text className="text-xl text-white m-1">Defect Type:</Text>
                    {cat === "Other" ? (
                        <TextInput
                            required="true"
                            mode="outlined"
                            placeholder="Specify your defect type"
                            value={type}
                            onChangeText={setType}
                        />
                    ) : (
                        <Dropdown
                            mode="outlined"
                            value={type}
                            placeholder="Select Defect Type"
                            options={options}
                            onSelect={(value) => setType(value)}
                            statusBarHeight={2}
                            hideMenuHeader="true"
                        />
                    )}
                <View>
                    <Text className="text-xl text-white m-1">Description:</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Write a few sentences about your problem."
                        value={desc}
                        onChangeText={setDesc}
                        multiline
                        numberOfLines={6}
                    />
                </View>
                
                <View>
                    <Text className="text-xl text-white m-1">Photo:</Text>
                    {uploadVisible ? (
                        <TouchableOpacity onPress={() => {setModalVisible(true)}} className="flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white">
                            <FontAwesome6 name="image" size={52} color="grey" className="flex"/>
                            <Text className="text-l text-center">Upload an image </Text>
                            <Text className="text-l text-center">PNG, JPG up to 10MB</Text>
                        </TouchableOpacity>
                    ) : (
                        <View className="ml-2">
                            <Image source={{ uri: pic }} style={{ width:320, height:240 }} />
                            <TouchableOpacity onPress={() => {setModalVisible(true)}} className="mt-1">
                                <Text className="text-white text-right underline underline-offset-2">Change Image?</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <Button className="mt-10 mb-10" text="Save" mode="contained" buttonColor='#601E27' onPress={() => {setDialogVisible(true)}}  disabled={!isFormValid()}> Save </Button>
                
                <ImageModal
                    visible={modalVisible}
                    setVisible={setModalVisible}
                    func1={camera}
                    func2={gallery}
                        />
                
                <DeclareDialog
                            visible={dialogVisible}
                            setVisible={setDialogVisible}
                            func={() => createComplaintForm(matric, cat, type, desc, pic)}
                        />
            </SafeAreaView>
            </ScrollView>
        </PaperProvider>
        </GestureHandlerRootView>
    );
}
