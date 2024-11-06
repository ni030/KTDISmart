import React, { useState } from 'react';
import { Modal, FAB, Portal } from 'react-native-paper';
import ChooseRoomModal from './ChooseRoomModal';
import { View } from 'react-native';

const SubMenu = ({
    visible,
    setVisible,
  }) => {

  const [openRoomModal, setOpenRoomModal] = useState(false);

  const openRoom = () => {
    setVisible(false);
    setOpenRoomModal(true);
  }


  return (
    <View>
        <Portal>
          <Modal visible={visible} onDismiss={() => setVisible(false)} className="w-full h-auto top-32 flex justify-start items-end gap-3">
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
                onPress={() => console.log('Pressed')}
              />
              <FAB
                icon="note-plus"
                label="Register Event"
                rippleColor={'rgba(255, 255, 255, 0.6)'}
                color={'#902D53'}
                onPress={() => console.log('Pressed')}
              />
          </Modal>
        </Portal>
        <ChooseRoomModal visible={openRoomModal} setVisible={setOpenRoomModal} />
    </View>
  );
};

export default SubMenu;