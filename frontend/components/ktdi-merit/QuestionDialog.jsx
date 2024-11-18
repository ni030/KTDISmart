import * as React from 'react';
import { DataTable, Dialog, Portal, Text } from 'react-native-paper';
import { View } from 'react-native';

const QuestionDialog = ({
    visible,
    setVisible,
    setCRMvisible
    }) => {
        
    const hideDialog = () => {
      setVisible(false);
      setCRMvisible(true);
    }
  
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Cell>
                  <Text className="font-bold text-base">Room Type</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text className="font-bold text-base">Room Price</Text>
                </DataTable.Cell>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>Single with Bathroom</DataTable.Cell>
                <DataTable.Cell>RM 8.00</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Single</DataTable.Cell>
                <DataTable.Cell>RM 6.00</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Double (Block MA)</DataTable.Cell>
                <DataTable.Cell>RM 5.00</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Double</DataTable.Cell>
                <DataTable.Cell>RM 4.00</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
}

export default QuestionDialog