import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import useCustomFonts from './hooks/useFonts';
import ThemeProvider from './providers/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootLayout = () => {
  const fontsLoaded = useCustomFonts();
  const [appReady, setAppReady] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();

      const firstTime = await AsyncStorage.getItem('getStarted6');

      if (firstTime === null) {
        setIsFirstTime(true);
        await AsyncStorage.setItem('getStarted5', 'false');
      } else {
        setIsFirstTime(false);
      }

      if (fontsLoaded) {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          setAppReady(true);
        }, 1000);
      }
    };

    prepare();
  }, [fontsLoaded]);

  useEffect(() => {
    if (appReady && isFirstTime === true) {
      router.replace('/screens/get_started');
    }
  }, [appReady, isFirstTime]);

  if (!appReady || isFirstTime === null) {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/images/general/furry-fresh-logo.png')}
          style={styles.loaderImage}
        />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/get_started" options={{ headerShown: false }} />
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
