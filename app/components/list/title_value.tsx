import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import dimensions from '../../utils/sizing'

type TitleValueProps = {
  title: string;
  value: string;
  isSub: boolean;
  isBold: boolean;
}

const TitleValue = (props: TitleValueProps) => {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontFamily: props.isBold ? 'Poppins-SemiBold' : 'Poppins-Regular',
          fontSize: props.isSub == false ? dimensions.screenWidth * 0.035 : dimensions.screenWidth * 0.033,
          color: props.isSub == false ? 'black' : '#808080'
        }}
      >{props.title}</Text>
      <Text
        style={{
          fontFamily: props.isBold ? 'Poppins-SemiBold' : 'Poppins-Regular',
          fontSize: props.isSub == false ? dimensions.screenWidth * 0.035 : dimensions.screenWidth * 0.033,
          color: props.isSub == false ? 'black' : '#808080'
        }}
      >{props.value}</Text>
    </View>
  )
}

export default TitleValue

const styles = StyleSheet.create({})