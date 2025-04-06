import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import MainContPlain from '../../components/general/background_plain'
import dimensions from '../../utils/sizing'
import { router } from 'expo-router'
import supabase from '../../utils/supabase'
import { Session } from '@supabase/supabase-js'

const Home = () => {
 
  return (
    <MainContPlain paddingHorizontal={dimensions.screenWidth * 0.02}>
      {/* DITO KA MAG SISIMULA MAG CODE PROVIDS */}
      <Text>Home Screen Contengyut</Text>
    </MainContPlain>
  )
}

export default Home

export const homeOptions = {
  header: (session: Session | null) => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image
          source={require("../../assets/images/general/pet-enjoy.png")}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.title}>Hello!</Text>
          <Text style={styles.subtitle}>{session?.user.user_metadata['first_name'] ?? 'User'}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push('../pets/pets')} style={styles.pets}>
        <Ionicons name="paw-outline" size={24} color="#000" />
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
  profileImage: {
    width: dimensions.screenWidth * 0.12,
    height: dimensions.screenWidth * 0.12,
    backgroundColor: '#466AA2',
    marginRight: dimensions.screenWidth * 0.04,
    borderRadius: 100
  },
  pets: {
    backgroundColor: '#fff',
    padding: dimensions.screenWidth * 0.02,
    borderRadius: 10,
    elevation: 5,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row'
  },
  header: { 
    backgroundColor: '#fff',
    paddingTop: dimensions.screenHeight * 0.06,
    paddingBottom: dimensions.screenHeight * 0.014,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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
    fontSize: dimensions.screenWidth * 0.03,
    lineHeight: dimensions.screenWidth * 0.04,
    fontFamily: 'Poppins-Regular',
    padding: 0,
    opacity: 0.5,
    marginTop: dimensions.screenHeight * 0.005,
    margin: 0
  },
  subtitle: {
    fontSize: dimensions.screenWidth * 0.05,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: dimensions.screenWidth * 0.06,
    padding: 0,
    margin: 0
  }
})
