import React, { useState } from 'react';
import { Modal, FAB, Portal, PaperProvider } from 'react-native-paper';
import ChooseRoomModal from './ChooseRoomModal';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubMenu = ({ visible, setVisible, userId, gender}) => {
  const [openRoomModal, setOpenRoomModal] = useState(false);
  const navigation = useNavigation(); // Use navigation hook

  const openRoom = () => {
    setVisible(false);
    setOpenRoomModal(true);
  };

  const goToScanQRCode = () => {
    setVisible(false);
    navigation.navigate('scanQRCode'); // Navigate to ScanQRCode screen
  };

  const goToRegisterEvent = () => {
    setVisible(false);
    navigation.navigate('registerEvent'); // Navigate to RegisterEvent screen
  }

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          className="w-full h-auto top-32 flex justify-start items-end gap-3"
        >
          <FAB
            icon="home-plus"
            label="Choose Room"
            rippleColor={'rgba(255, 255, 255, 0.6)'}
            color={'#902D53'}
            onPress={openRoom}
          />
          <FAB
            icon="line-scan"
            label="Scan QR Code"
            rippleColor={'rgba(255, 255, 255, 0.6)'}
            color={'#902D53'}
            onPress={goToScanQRCode} 
          />
          <FAB
            icon="note-plus"
            label="Register Event"
            rippleColor={'rgba(255, 255, 255, 0.6)'}
            color={'#902D53'}
            onPress={goToRegisterEvent}
          />
        </Modal>
      </Portal>
      <ChooseRoomModal visible={openRoomModal} setVisible={setOpenRoomModal} userId={userId} gender={gender} />
    </View>
  );
};

export default SubMenu;
