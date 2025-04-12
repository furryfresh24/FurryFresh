import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import dimensions from '../../utils/sizing';
import { useRouter } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import PlaydateIcon from '../svgs/pets/PlaydateIcon';

const AppbarDefault = ({
  session, title, subtitle, showLeading = false, leadingChildren = null, titleSize = dimensions.screenWidth * 0.05, subtitleSize = dimensions.screenWidth * 0.035, subtitleFont }:
  { session: Session | null, title: string, subtitle?: string, showLeading: boolean, leadingChildren: any, titleSize: number, subtitleSize?: number, subtitleFont?: string }) => {
  const router = useRouter();

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={dimensions.screenWidth * 0.06} color="#000" />
      </TouchableOpacity>

      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
        <Text numberOfLines={1} style={[styles.title, { fontSize: titleSize }]}>{title}</Text>
        {
          subtitle ? (
            <Text numberOfLines={1} style={[styles.subtitle, { fontSize: subtitleSize, fontFamily: subtitleFont }]}>{subtitle}</Text>
          ) : <></>
        }
      </View>

      {showLeading ? leadingChildren : <View style={{ flex: 1, minHeight: dimensions.screenHeight * 0.0, backgroundColor: 'red', }}></View>
      }
    </View>
  );
};

export default AppbarDefault;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: dimensions.screenHeight * 0.02,
    paddingBottom: dimensions.screenHeight * 0.02,
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
    flex: 1,
  },
  title: {
    fontSize: dimensions.screenWidth * 0.05,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: dimensions.screenWidth * 0.06,
  },
  subtitle: {
    fontSize: dimensions.screenWidth * 0.035,
    fontFamily: 'Poppins-SemiBold',
    color: '#808080',
    lineHeight: dimensions.screenWidth * 0.04,
  },
  emptyView: {
    width: 40, // This is to push the title to the center if the back button is present
  },
});
