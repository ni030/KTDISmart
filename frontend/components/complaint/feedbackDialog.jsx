import * as React from 'react';
import { View, ToastAndroid } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';  // Import Text from react-native-paper
import Feedback from './Feedback';
import { createFeedback } from '../../services/manageFeedback';

const FeedbackDialog = ({ visible, setVisible,userId,complaintid }) => {
  const hideDialog = () => setVisible(false);
  const [desc, setDesc] = React.useState(null);
  const [rate, setRate] = React.useState(3); // Default to middle rating

    const handleSubmit = async () => {
        console.log("create feedback")
        try{
            const res = await createFeedback(userId, complaintid, rate, desc);
            if(res === "Success"){
              ToastAndroid.show('Feedback Submitted Successfully!', ToastAndroid.LONG, ToastAndroid.CENTER);
            }
    
          }catch(error){
            console.error("Error in createFeedback", error)
          }
    }

  return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <View style={{ height: 250 }}>
              <Feedback onRateChange={setRate}/>
            </View>
            <TextInput 
                label="Description"
                value={desc}
                onChangeText={desc => setDesc(desc)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={()=>{hideDialog();handleSubmit(rate, desc);}}>
              Submit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  );
};

export default FeedbackDialog;