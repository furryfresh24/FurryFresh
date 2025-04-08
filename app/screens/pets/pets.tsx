import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainContPaw from '../../components/general/background_paw'
import supabase from '../../utils/supabase'

type Props = {}

const petTypes = [
  {
    id: '1',
    title: 'Dog'
  }
];

const Pets = (props: Props) => {
  
  return (
    <MainContPaw>
      <View>
        <FlatList 
          data={petTypes}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      </View>
    </MainContPaw>
  )
}

export default Pets

const styles = StyleSheet.create({})