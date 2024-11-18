import * as React from 'react';
import { Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const MyCard = (props) => {
  const navigation = useNavigation();
  return(
  <Card className="m-2 h-52 justify-center items-center p-5" 
        onPress={() => navigation.navigate('report',{cat: props.title})}>

    <Card.Content className="justify-center items-center">
      {props.icon && props.icon()}
      <Text variant="titleLarge" className="mt-2 text-center">{props.title}</Text>
    </Card.Content>
  </Card>
  )
  };

export default MyCard;