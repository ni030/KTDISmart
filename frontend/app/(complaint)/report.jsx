import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import {TextInput, List, PaperProvider} from 'react-native-paper';
import {Dropdown} from 'react-native-paper-dropdown';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Report(){
    const [name, setName] = React.useState('');
    const [phoneNum, setPhone] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [dorm, setDorm] = React.useState('');
    const [type, setType] = React.useState('');
    return(
        <PaperProvider>
        <SafeAreaView className="p-5">
            <Text>Personal Information</Text>
            <View>
            <Text>Name:</Text>
                <TextInput
                    mode="outlined"
                    disabled="true"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View>
            <Text>Phone Number:</Text>
                <TextInput
                    mode="outlined"
                    placeholder="012-1234567"
                    value={phoneNum}
                    onChangeText={setPhone}
                />
            </View>
            <View>
            <Text>Dorm:</Text>
                <TextInput
                    mode="outlined"
                    disabled="true"
                    placeholder="MA6 210"
                    value={dorm}
                    onChangeText={setDorm}
                />
            </View>
            <DropDown>            
            label='Defect Type'
            mode='outlined'
            value={type}
            setValue={setType}
            list={catType}
            visible={showDropdown}
            showDropDown={() => setShowDropdown(true)}
            onDismiss={() => setShowDropdown(false)}
            dropDownStyle={{
                width:'100%',
            }}
            </DropDown>                
            {/* <View>

                <Text>Defect Type:</Text>
                <View>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue) => setType(itemValue)}>
                    <Picker.Item label="Blackout" value="Blackout" />
                    <Picker.Item label="Lamp" value="Lamp" />
                    <Picker.Item label="Fan" value="Fan" />
                    <Picker.Item label="Socket" value="Socket" />
                    <Picker.Item label="Switch" value="Switch" />
                </Picker>
                </View>
            </View> */}
            <View>
            <Text>Description:</Text>
                <TextInput
                    mode="outlined"
                    placeholder="Write a few sentences about your problem."
                    value={desc}
                    onChangeText={setDesc}
                    multiline
                    numberOfLines={4}
                />
            </View>
            <View>
                <Text>Photo</Text>
                <View>
                <FontAwesome6 name="image" size={52} color="white" />
                    <TouchableOpacity>
                        <Text>Upload a file</Text>
                    </TouchableOpacity>
                </View>
                <Text>PNG, JPG, GIF up to 10MB</Text>
            </View>
            <View>
                <Button title="Cancel" color="#6b7280" onPress={() => {}} />
                <Button title="Save" color="#4f46e5" onPress={() => {}} />
            </View>
        </SafeAreaView>
        </PaperProvider>
    )
}