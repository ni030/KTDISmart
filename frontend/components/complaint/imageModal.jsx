import * as React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { IconButton, MD3Colors, Dialog, Portal, Text, Button } from 'react-native-paper';

const ImageModal = ({ visible, setVisible, func1, func2 }) => {
  const hideDialog = () => setVisible(false);

  return (
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}>
          <Dialog.Title style={styles.title}>Please choose the method to upload the image</Dialog.Title>
          <Dialog.Content style={styles.content}>
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => { func1(); hideDialog(); }}>
                <IconButton icon="camera" size={40} color={MD3Colors.error50} />
                <Text style={styles.optionText}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={() => { func2(); hideDialog(); }}>
                <IconButton icon="image" size={40} color={MD3Colors.error50} />
                <Text style={styles.optionText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',  // Center title text
  },
  content: {
    alignItems: 'center', // Center content horizontally
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space options across container
    width: '100%',
    paddingVertical: 10,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  optionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ImageModal;
