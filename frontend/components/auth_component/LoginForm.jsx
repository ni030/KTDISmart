import React from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';


const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
      <View className="pt-2 bg-gray-100/10">
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Octicons name={icon} size={30} color="#A1335D" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}>{label}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderColor: '#D1D5DB', padding: 8 }}>
          <TextInput 
            style={{ flex: 1, fontSize: 18 }}
            placeholderTextColor="#a1a1a1"
            {...props}
          />
          {isPassword && (
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} activeOpacity={0.5}>
              <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color="#a1a1a1" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  export default MyTextInput;