import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import MainContPlain from '../../components/general/background_plain'

const Home = () => {
  return (
    <MainContPlain>
      <Text>Home Screen Content</Text>
    </MainContPlain>
  )
}

export default Home

export const homeOptions = {
  header: () => (
    <View style={styles.header}>
      <Text style={styles.title}>My App</Text>

      <TouchableOpacity onPress={() => console.log('Pressed!')}>
        <Ionicons name="notifications-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  header: {
    height: 80,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
