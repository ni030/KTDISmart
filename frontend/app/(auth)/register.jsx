import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-paper-dropdown';
import { PaperProvider } from 'react-native-paper';

const Register = () => {
  const [formData, setFormData] = useState({
    profilePicture: null, // Profile picture URI
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    matricNo: '',
    programmeCode: '',
  });

  const OPTIONS = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const [page, setPage] = useState(1);
  const [gender, setGender] = useState('');

  const goToNextPage = () => setPage(2);
  const goToPreviousPage = () => setPage(1);


  // Function to pick an image
  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }
    
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setFormData({ ...formData, profilePicture: pickerResult.uri });
    }
  };

  return (
    <PaperProvider>
    <ScrollView className="flex-1 p-6 bg-white">
      {page === 1 ? (
        <View>
          <Text className="text-2xl font-bold text-primary-400 text-center mb-8">Account Registration</Text>

          {/* Profile Picture */}
          <TouchableOpacity onPress={pickImage} className="items-center mb-2">
            {formData.profilePicture ? (
              <Image source={{ uri: formData.profilePicture }} className="w-24 h-24 rounded-full" />
            ) : (
              <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center">
                <Text className="text-gray-400">Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Profile Picture Label */}
          <Text className="text-center font-bold text-gray-700 mb-4">Profile Picture</Text>


          {/* Username */}
          <TextInput
            className="border p-4 mb-4 mt-6 rounded"
            placeholder="Username"
            value={formData.username}
            onChangeText={(value) => setFormData({ ...formData, username: value })}
          />

          {/* Email */}
          <TextInput
            className="border p-4 mb-4 rounded"
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
          />

          {/* Phone Number */}
          <TextInput
            className="border p-4 mb-4 rounded"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(value) => setFormData({ ...formData, phone: value })}
          />

          {/* Password */}
          <TextInput
            className="border p-4 mb-4 rounded"
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(value) => setFormData({ ...formData, password: value })}
          />

          {/* Confirm Password */}
          <TextInput
            className="border p-4 mb-9 rounded"
            placeholder="Confirm Password"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(value) => setFormData({ ...formData, confirmPassword: value })}
          />

          {/* Next Button */}
          <TouchableOpacity onPress={goToNextPage} className="bg-primary-200 p-4 rounded">
            <Text className="text-center text-white font-bold">Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {/* Back Icon */}
          <TouchableOpacity onPress={goToPreviousPage} className="absolute top-4 left-1">
            <AntDesign name="leftcircle" size={26} color="gray" />
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-center mb-10 mt-7">Personal Information</Text>

          {/* Name */}
          <TextInput
            className="border p-4 mb-4 rounded"
            placeholder="Name"
            value={formData.name}
            onChangeText={(value) => setFormData({ ...formData, name: value })}
          />

          {/* Matric Number */}
          <TextInput
            className="border p-4 mb-4 rounded"
            placeholder="Matric Number"
            value={formData.matricNo}
            onChangeText={(value) => setFormData({ ...formData, matricNo: value })}
          />

          {/* Gender */}
            <Dropdown
            label="Gender"
            mode="outlined"
            placeholder="Select Gender"
            hideMenuHeader={true}
            className="w-11/12"
            options={OPTIONS}
            value={gender} 
            onSelect={(value) => setGender(value)}
            statusBarHeight={2}
          />

          {/* Programme Code */}
          <TextInput
            className="border p-4 mb-4 mt-4 rounded"
            placeholder="Programme Code"
            value={formData.programmeCode}
            onChangeText={(value) => setFormData({ ...formData, programmeCode: value })}
          />

          {/* Submit Button */}
          <TouchableOpacity className="bg-primary-400 p-4 rounded mt-6">
            <Text className="text-center text-white font-bold">Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
    </PaperProvider>
  );
};

export default Register;
