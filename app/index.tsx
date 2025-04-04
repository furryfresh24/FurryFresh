import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router'; // Use searchParams to access passed props
import Button1 from '../app/components/buttons/button1';
import GetStarted from '../app/screens/get_started';
import SignIn from '../app/screens/sign_in';

const MainPage = () => {
  const { isFirstTime } = useLocalSearchParams(); 

  if (isFirstTime === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isFirstTime === 'true') {
    return <GetStarted />;
  }

  if(false) {
    return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Pressable onPress={() => router.push('/screens/get_started')}>
        <Text>Get Started</Text>
      </Pressable>
      <Button1 title="Get Started" isPrimary={false} onPress={() => {}} />
    </View>
    );
  }

  return (
    <SignIn />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainPage;
