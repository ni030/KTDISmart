import { useEffect, useState } from 'react'; 
import { ScrollView, ToastAndroid, View } from 'react-native';
import { Button, Dialog, Portal, Text, IconButton } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import QuestionDialog from './QuestionDialog';
import { checkExistingForm, createForm, updateForm } from '../../services/manageChooseRoomForm';

const ChooseRoomModal = ({
  visible,
  setVisible,
  userId,
  gender
  }) => {
    // Constants
    const MALE_BLOCK_OPTIONS = [
      { label: 'M05', value: 'M05' },
      { label: 'M06', value: 'M06' },
      { label: 'M07', value: 'M07' },
      { label: 'M16', value: 'M16' },
      { label: 'M17', value: 'M17' },
      { label: 'M22', value: 'M22' },
      { label: 'M23', value: 'M23' },
      { label: 'MA1', value: 'MA1' },
    ];  

    const FEMALE_BLOCK_OPTIONS = [
      { label: 'M19', value: 'M19' },
      { label: 'M20', value: 'M20' },
      { label: 'M21', value: 'M21' },
      { label: 'M25', value: 'M25' },
      { label: 'M27', value: 'M27' },
      { label: 'MA4', value: 'MA4' },
      { label: 'MA5', value: 'MA5' },
      { label: 'MA6', value: 'MA6' },
      { label: 'MA7', value: 'MA7' },
    ]

    const MALE_ROOM_TYPE_OPTIONS = [
      { label: 'Single with Bathroom', value: 'Single with Bathroom' },
      { label: 'Single', value: 'Single' },
      { label: 'Double', value: 'Double' },
    ];

    const FEMALE_ROOM_TYPE_OPTIONS = [
      { label: 'Single with Bathroom', value: 'Single with Bathroom' },
      { label: 'Single', value: 'Single' },
      { label: 'Double (Block MA)', value: 'Double (Block MA)' },
      { label: 'Double', value: 'Double' },
    ];

    const [stRoomBlock, setStRoomBlock] = useState('');
    const [stRoomType, setStRoomType] = useState('');
    const [ndRoomBlock, setNdRoomBlock] = useState('');
    const [ndRoomType, setNdRoomType] = useState('');
    const [rdRoomBlock, setRdRoomBlock] = useState('');
    const [rdRoomType, setRdRoomType] = useState('');
    const [existingForm, setExistingForm] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [save, setSave] = useState(false);

    const hideDialog = () => {
      if(!save){
        if(!existingForm){
          setStRoomBlock('');
          setStRoomType('');
          setNdRoomBlock('');
          setNdRoomType('');
          setRdRoomBlock('');
          setRdRoomType('');
        }else{
          checkExisting();
        }
        ToastAndroid.show('Record Unsaved!', ToastAndroid.LONG, ToastAndroid.CENTER);
      }
      setSave(false);
      setVisible(false);
    }

    const openQuestionDialog = () =>{
      setDialogVisible(true);
      setVisible(false);
    } 

    const checkExisting = async () => {
      try{
        const res = await checkExistingForm(userId);
        if(res === "empty"){
          setExistingForm(false);
        }else{
          setExistingForm(true);
          setStRoomBlock(res[0].roomblock1);
          setStRoomType(res[0].roomtype1);
          setNdRoomBlock(res[0].roomblock2);
          setNdRoomType(res[0].roomtype2);
          setRdRoomBlock(res[0].roomblock3);
          setRdRoomType(res[0].roomtype3);    
        }
      }catch(error){
        console.error("Error in checkExisting:", error);
      }
    }

    useEffect(() => {
      if(!userId) return;
      checkExisting();
    }, [userId]);

    const createChooseRoomForm = async () => {
      console.log("create form")
      try{
        const res = await createForm(userId, stRoomBlock, stRoomType, ndRoomBlock, ndRoomType, rdRoomBlock, rdRoomType);
        setExistingForm(true);
        if(res === "Success"){
          ToastAndroid.show('Room Selection Updated Successfully!', ToastAndroid.LONG, ToastAndroid.CENTER);
        }

      }catch(error){
        console.error("Error in createChooseRoomForm:", error)
      }
    }

    const updateChooseRoomForm = async () => {
      try{
        const res = await updateForm(userId, stRoomBlock, stRoomType, ndRoomBlock, ndRoomType, rdRoomBlock, rdRoomType);

        if(res === "Success"){
          ToastAndroid.show('Room Selection Updated Successfully!', ToastAndroid.LONG, ToastAndroid.CENTER);
        }
      }catch(error){
        console.error("Error in updateChooseRoomForm:", error)
      }
    }

    const saveChooseRoomForm = () => {
      setSave(true);
      setVisible(false);
      if(existingForm){
        updateChooseRoomForm();
      }else{
        createChooseRoomForm();
      }
    }

  return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} className="p-3">
            <Dialog.Title>
              <View className="flex flex-row justify-start items-center">
                <Text className="text-2xl p-1">Choose Room</Text>
                <IconButton
                  icon={() => <FontAwesome6 name="circle-question" size={20} color="black" />}
                  onPress={openQuestionDialog}
                  className="-left-2"
                />
              </View>
            </Dialog.Title>
            <Dialog.Content className="flex justify-start gap-1">
              <ScrollView>
                <View>
                  <Text className="text-base font-semibold p-1">Option 1</Text>
                  <Dropdown
                    label="Room Block"
                    mode='outlined'
                    placeholder="Select Block"
                    hideMenuHeader={true}
                    className="w-11/12"
                    options={gender === "Male" ? MALE_BLOCK_OPTIONS : FEMALE_BLOCK_OPTIONS}
                    value={stRoomBlock}
                    onSelect={setStRoomBlock}
                    statusBarHeight={2}
                  />
                  <Dropdown
                    label="Room Type"
                    mode='outlined'
                    placeholder="Select Room Type"
                    hideMenuHeader={true}
                    className="w-11/12"
                    options={gender === "Male" ? MALE_ROOM_TYPE_OPTIONS : FEMALE_ROOM_TYPE_OPTIONS}
                    value={stRoomType}
                    onSelect={setStRoomType}
                    statusBarHeight={2}
                  />
                </View>
                <View>
                  <Text className="text-base font-semibold p-1">Option 2</Text>
                  <Dropdown
                    label="Room Block"
                    mode='outlined'
                    placeholder="Select Block"
                    hideMenuHeader={true}
                    className="w-11/12"
                    options={gender === "Male" ? MALE_BLOCK_OPTIONS : FEMALE_BLOCK_OPTIONS}
                    value={ndRoomBlock}
                    onSelect={setNdRoomBlock}
                    statusBarHeight={2}
                  />
                  <Dropdown
                    label="Room Type"
                    mode='outlined'
                    placeholder="Select Room Type"
                    hideMenuHeader={true}
                    className="w-11/12"
                    options={gender === "Male" ? MALE_ROOM_TYPE_OPTIONS : FEMALE_ROOM_TYPE_OPTIONS}
                    value={ndRoomType}
                    onSelect={setNdRoomType}
                    statusBarHeight={2}
                  />
                </View>
                <View>
                  <Text className="text-base font-semibold p-1">Option 3</Text>
                  <Dropdown
                    label="Room Block"
                    mode='outlined'
                    placeholder="Select Block"
                    hideMenuHeader={true}
                    className="w-11/12"
                    options={gender === "Male" ? MALE_BLOCK_OPTIONS : FEMALE_BLOCK_OPTIONS}
                    value={rdRoomBlock}
                    onSelect={setRdRoomBlock}
                    statusBarHeight={2}
                  />
                  <Dropdown
                    label="Room Type"
                    mode='outlined'
                    placeholder="Select Room Type"
                    hideMenuHeader={true}
                    className="w-11/12"
                    options={gender === "Male" ? MALE_ROOM_TYPE_OPTIONS : FEMALE_ROOM_TYPE_OPTIONS}
                    value={rdRoomType}
                    onSelect={setRdRoomType}
                    statusBarHeight={2}
                  />
                </View>
              </ScrollView>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={saveChooseRoomForm}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <QuestionDialog visible={dialogVisible} setVisible={setDialogVisible} setCRMvisible={setVisible}/>

      </View>
  );
};

export default ChooseRoomModal