import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router';
import MainContPlain from '../../components/general/background_plain';
import AppbarDefault from '../../components/bars/appbar_default';
import dimensions from '../../utils/sizing';
import { useSession } from '../../context/sessions_context';


const Explore = () => {
  const { session } = useSession();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, height: '100%', width: '100%' }}>
      {
        <AppbarDefault
          title={"Explore"}
          session={session}
          showBack={false}
          showLeading={false}
          leadingChildren={null}
          titleSize={dimensions.screenWidth * 0.045}
        />
      }
      <MainContPlain>
        <Text>Explore</Text>
      </MainContPlain>
    </View>
  )
}

export default Explore

const styles = StyleSheet.create({})