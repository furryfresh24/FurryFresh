import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import useCustomFonts from './hooks/useFonts';
import ThemeProvider from './providers/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootLayout = () => {
  const fontsLoaded = useCustomFonts();
  const [isReady, setIsReady] = useState(false);
  const [isInitialized, setInit] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const prepareApp = async () => {
      await SplashScreen.preventAutoHideAsync();

      if(!isInitialized) {
        const firstTime = await AsyncStorage.getItem('getStarted'); 
      
        if (firstTime === null) {
          setIsFirstTime(true);
          await AsyncStorage.setItem('getStarted', 'false');
  
          console.log('First time');
        } else {
          setIsFirstTime(false);
  
          console.log('Not first time');
        }

        setInit(true);
      }
  
      if (fontsLoaded) {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          setIsReady(true);
        }, 5000);
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!isReady || isFirstTime === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8FF' }}>
        <Image
          source={require('./assets/images/general/furry-fresh-logo.png')}
          style={styles.loaderImage}
        />
      </View>
    );
  }

  if (isFirstTime) {
    return (
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="screens/get_started" options={{ headerTitle: 'Get Started' }} />
        </Stack>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/get_started" options={{ headerTitle: 'Home' }} />
        <Stack.Screen name="screens/auth/sign_in" options={{ headerShown: false }} />
        <Stack.Screen name="screens/auth/sign_up_1" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FF',
  },
  loaderImage: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
});

export default RootLayout;
