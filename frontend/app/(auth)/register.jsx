import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-paper-dropdown';
import { PaperProvider } from 'react-native-paper';
import authService from '../../services/authServices';
import { useNavigation } from '@react-navigation/native';

// Helper functions
const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const isValidPhone = (phone) => {
  // Simple regex for Malaysian phone number (e.g. +6012XXXXXXX)
  const regex = /^(\+60)(1[2-9])\d{7,8}$/;
  return regex.test(phone);
};

const Register = () => {
  useEffect(() => {
    console.log("Check selected gender -> " + formData.gender)
  }, [formData])
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    profilePicture: null,
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    matricNo: '',
    programmeCode: '',
    gender: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    matricNo: '',
    programmeCode: '',
    gender: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const OPTIONS = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  // Go to the next page after validation
  const goToNextPage = async () => {
    const isValid = await validatePageOne();
    if (isValid) setPage(2);
  };

  // Go back to page 1
  const goToPreviousPage = () => setPage(1);

  const handleCheckUser = async () => {
    console.log(`Checking User | username -> ${formData.username} | email -> ${formData.email}`)
    try {
      const response = await authService.checkIsUserExist({
        username: formData.username,
        email: formData.email,
      });
      return response;
    } catch (error) {
      console.log('Error checking user existence:', error);
      return false; 
    }
  };

  // Page 1 validation: Check if all fields are filled, email is valid, phone is valid, and password matches
  const validatePageOne = async () => {
    // Reset errors before starting validation
    let newErrors = {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };

    // Start by assuming everything is valid
    let isValid = true;

    // Destructure formData for easy access
    const { username, email, phone, password, confirmPassword } = formData;

    // Check if all fields are filled
    if (!username || !email || !phone || !password || !confirmPassword) {
      isValid = false;
      if (!username) newErrors.username = 'Username cannot be empty!';
      if (!email) newErrors.email = 'Email cannot be empty!';
      if (!phone) newErrors.phone = 'Phone cannot be empty!';
      if (!password) newErrors.password = 'Password cannot be empty!';
      if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password cannot be empty!';
    }

    // Check email validity
    if (!isValidEmail(email)) {
      isValid = false;
      newErrors.email = 'Please enter a valid email address';
    }

    // Check phone validity
    if (!isValidPhone(phone)) {
      isValid = false;
      newErrors.phone = 'Please enter a valid Malaysian phone number';
    }

    // Check password length and match
    if (password.length < 8 || confirmPassword.length < 8) {
      isValid = false;
      newErrors.password = 'Passwords must be at least 8 characters long';
    }

    if (password !== confirmPassword) {
      isValid = false;
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Check if username or email already exists
    let isUserExistObj = await handleCheckUser();
    if (isUserExistObj.usernameExists) {
      isValid = false;
      newErrors.username = 'Username has already been registered';
    }

    if (isUserExistObj.emailExists) {
      isValid = false;
      newErrors.email = 'Email has already been registered';
    }

    // Update the errors state with the latest error messages
    setErrors(newErrors);

    return isValid;
  };

  // Page 2 validation: Check if all fields are filled
  const validatePageTwo = () => {
    // Reset errors before starting validation
    let newErrors = {
      name: '',
      matricNo: '',
      programmeCode: '',
      gender: '',
    };

    // Assume the form is valid to begin with
    let isValid = true;

    const { name, matricNo, programmeCode, gender } = formData;

    // Check if all fields are filled
    if (!name || !matricNo || !programmeCode || !gender) {
      isValid = false;
      if (!name) newErrors.name = 'Name cannot be empty!';
      if (!matricNo) newErrors.matricNo = 'Matric Number cannot be empty!';
      if (!programmeCode) newErrors.programmeCode = 'Programme Code cannot be empty!';
      if (!gender) newErrors.gender = 'Please select a gender!';
    }

    // Update the errors state with the latest error messages
    setErrors(newErrors);

    return isValid;
  };


  // Handle profile image picking
  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert('Permission to access gallery is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets?.length > 0) {
      const imageUri = pickerResult.assets[0].uri;
      console.log("Got image URI ->", imageUri);
      setFormData({ ...formData, profilePicture: imageUri });
    }
  };

  // Handle Registration process
  const handleRegister = async () => {
    if (!validatePageTwo()) return;

    setIsLoading(true);

    try {
      //Assign room number here
      let block, roomNumber, keyNumber;
      if (formData.gender === 'Male') {
        block = 'MA1';
        roomNumber = Math.floor(Math.random() * (250 - 200 + 1)) + 200;  // Random room between 200 and 250
        keyNumber = Math.floor(Math.random() * (19999 - 12345 + 1)) + 12345;
      } else if (formData.gender === 'Female') {
        block = 'MA5';
        roomNumber = Math.floor(Math.random() * (350 - 300 + 1)) + 300;  // Random room between 300 and 350
        keyNumber = Math.floor(Math.random() * (29999 - 22345 + 1)) + 22345;
      }

      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phonenum: formData.phone,
        name: formData.name,
        matricno: formData.matricNo,
        gender: formData.gender,
        programmecode: formData.programmeCode,
        profilePicture: formData.profilePicture,
        block: block,        
        roomNumber: roomNumber,
        keyNumber: keyNumber,
      };

      console.log('Register | Payload:', payload);

      const response = await authService.register(payload);

      console.log('Register | Success Response:', response);
      Alert.alert('Success', 'Registration successful! Please log in.');
      navigation.navigate('login');
    } catch (error) {
      console.log('Register | Error:', error.message);
      if (error.isMatricNoExists) {
        let newErrors = { ...errors, matricNo: 'Matric Number has already been registered' };
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Convert input values to uppercase for Page 2
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value.toUpperCase(),
    });
  };

  return (
    
    <ImageBackground
      className="w-full h-full"
      source={require('./../../images/rb.png')}
      resizeMode="cover"
    >
      <PaperProvider>
        <ScrollView className="flex-1 p-6">
          {page === 1 ? (
            <ScrollView>
              <Text className="text-2xl font-bold text-white mb-5 mt-20">Account Registration</Text>

              <TouchableOpacity onPress={pickImage} className="items-center mb-2 mt-3">
                {formData.profilePicture ? (
                  <Image source={{ uri: formData.profilePicture }} className="w-24 h-24 rounded-full" />
                ) : (
                  <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center">
                    <Text className="text-gray-400">Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>

              <Text className="text-center font-bold text-gray-700 mb-1">Profile Picture</Text>

              <TextInput
                className={errors.username ? "border p-4 mb-1 mt-6 rounded" : "border p-4 mb-4 mt-6 rounded"}
                placeholder="Username"
                value={formData.username}
                onChangeText={(value) => setFormData({ ...formData, username: value })}
              />
              {errors.username && <Text className="text-red-500 mb-4">{errors.username}</Text>}

              <TextInput
                className={errors.email ? "border p-4 mb-1 rounded" : "border p-4 mb-4 rounded"}
                placeholder="Email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(value) => setFormData({ ...formData, email: value })}
              />
              {errors.email && <Text className="text-red-500 mb-4">{errors.email}</Text>}

              <TextInput
                className={errors.phone ? "border p-4 mb-1 rounded" : "border p-4 mb-4 rounded"}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(value) => setFormData({ ...formData, phone: value })}
              />
              {errors.phone && <Text className="text-red-500 mb-4">{errors.phone}</Text>}

              <TextInput
                className={errors.password ? "border p-4 mb-1 rounded" : "border p-4 mb-4 rounded"}
                placeholder="Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(value) => setFormData({ ...formData, password: value })}
              />
              {errors.password && <Text className="text-red-500 mb-4">{errors.password}</Text>}

              <TextInput
                className={errors.confirmPassword ? "border p-4 mb-1 rounded" : "border p-4 mb-9 rounded"}
                placeholder="Confirm Password"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(value) => setFormData({ ...formData, confirmPassword: value })}
              />
              {errors.confirmPassword && <Text className="text-red-500 mb-9">{errors.confirmPassword}</Text>}


              <TouchableOpacity onPress={goToNextPage} className="bg-primary-200 p-4 mb-10 rounded">
                <Text className="text-center text-white font-bold">Next</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <View>
              <TouchableOpacity onPress={goToPreviousPage} className="top-14 left-0">
                <AntDesign name="leftcircle" size={26} color="white" />
              </TouchableOpacity>

              <Text className="text-2xl font-bold text-white mb-10 mt-20">Personal Information</Text>

              <TextInput
                className={errors.name ? "border p-4 mb-1 mt-8 rounded" : "border p-4 mb-4 mt-8 rounded"}
                placeholder="Name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
              {errors.name && <Text className="text-red-500 mb-4">{errors.name}</Text>}

              <TextInput
                className={errors.matricNo ? "border p-4 mb-1 rounded" : "border p-4 mb-4 rounded"}
                placeholder="Matric Number"
                value={formData.matricNo}
                onChangeText={(value) => handleInputChange('matricNo', value)}
              />
              {errors.matricNo && <Text className="text-red-500 mb-4">{errors.matricNo}</Text>}

              <Dropdown
                label="Gender"
                mode="outlined"
                placeholder="Select Gender"
                hideMenuHeader={true}
                className="w-11/12"
                options={OPTIONS}
                value={formData.gender}
                onSelect={(value) => {
                  // Clear the gender error when the user selects a gender
                  setFormData({ ...formData, gender: value });
                  setErrors({ ...errors, gender: '' });  // Reset the gender error
                }}
              />
              {errors.gender && <Text className="text-red-500 mb-2 mt-1">{errors.gender}</Text>}

              <TextInput
                className={errors.matricNo ? "border p-4 mb-1 mt-4 rounded" : "border p-4 mb-4 mt-4 rounded"}
                placeholder="Programme Code"
                value={formData.programmeCode}
                onChangeText={(value) => handleInputChange('programmeCode', value)}
              />
              {errors.programmeCode && <Text className="text-red-500">{errors.programmeCode}</Text>}

              <TouchableOpacity
                onPress={handleRegister}
                className="bg-primary-400 p-4 rounded mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-center text-white font-bold">Register</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </PaperProvider>
    </ImageBackground>
  );
};

export default Register;
