import React from 'react'
import { View } from 'react-native'
import { DataTable } from 'react-native-paper'

const ActivityTable = () => {
  
  return (
    <View className="">
        <DataTable className="w-11/12 h-5/6 bg-white mx-auto rounded-lg ">
        <DataTable.Header>
            <DataTable.Title>Num</DataTable.Title>
            <DataTable.Title>Activity</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>Reading</DataTable.Cell>
            <DataTable.Cell>2021-09-01</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>2</DataTable.Cell>
            <DataTable.Cell>Writing</DataTable.Cell>
            <DataTable.Cell>2021-09-02</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>3</DataTable.Cell>
            <DataTable.Cell>Listening</DataTable.Cell>
            <DataTable.Cell>2021-09-03</DataTable.Cell>
        </DataTable.Row>
        <View className="flex-1 justify-end">
          <DataTable.Pagination>
              {/* <DataTable.Pagination.Page>1</DataTable.Pagination.Page>
              <DataTable.Pagination.Page>2</DataTable.Pagination.Page>
              <DataTable.Pagination.Page>3</DataTable.Pagination.Page> */}
          </DataTable.Pagination>
        </View>
      </DataTable>
    </View>
  )
}

export default ActivityTable