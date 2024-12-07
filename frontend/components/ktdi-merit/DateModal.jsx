import React from 'react'
import { View } from 'react-native'
import { DatePickerModal } from 'react-native-paper-dates';
import {enGB, registerTranslation } from 'react-native-paper-dates';

registerTranslation('en-GB', enGB);

const DateModal = ({
    open,
    onDismiss,
    onConfirm,
    date
}) => {
  return (
    <View>
        <DatePickerModal
            locale="en-GB"
            mode="single"
            visible={open}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            date={date}
        />
    </View>
  )
}

export default DateModal