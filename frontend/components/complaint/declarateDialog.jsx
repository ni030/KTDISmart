import * as React from 'react';
import { View } from 'react-native';
import { Dialog, Portal, Text, Checkbox, Button } from 'react-native-paper';

const DeclareDialog = ({ visible, setVisible, func }) => {
  const [checked, setChecked] = React.useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content className="flex">
          <Text variant="bodyLarge">
            Are you sure you want to submit this complaint? 
          </Text>
          <View className="flex-row items-start m-1 mt-4">
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            className="basis-1/12"
          />
          <Text className="basis-11/12 text-sm mt-1">
            I declare that the information provided in this complaint form is accurate and truthful to the best of my knowledge.
          </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={() => { func(); hideDialog(); }} disabled={!checked}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeclareDialog;
