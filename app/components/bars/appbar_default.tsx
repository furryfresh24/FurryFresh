import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // For back button icon
import dimensions from '../../utils/sizing';
import { useRouter } from 'expo-router'; // For navigating back
import { Session } from '@supabase/supabase-js';
import PlaydateIcon from '../svgs/pets/PlaydateIcon';

const AppbarDefault = ({ session, title }: { session: Session | null, title: string }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={dimensions.screenWidth * 0.06} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <PlaydateIcon color='#000' width={dimensions.screenWidth * 0.08} height={dimensions.screenWidth * 0.08} props/>
      </TouchableOpacity>
    </View>
  );
};

export default AppbarDefault;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: dimensions.screenHeight * 0.06,
    paddingBottom: dimensions.screenHeight * 0.006,
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
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: dimensions.screenWidth * 0.05,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: dimensions.screenWidth * 0.06,
  },
  emptyView: {
    width: 40, // This is to push the title to the center if the back button is present
  },
});
