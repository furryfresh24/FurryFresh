import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import useCustomFonts from './hooks/useFonts';
import ThemeProvider from './providers/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from './utils/supabase'; 
import { Session } from '@supabase/supabase-js';
import AppbarDefault from './components/bars/appbar_default';


const RootLayout = () => {
  const fontsLoaded = useCustomFonts();
  const [appReady, setAppReady] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const [session, setSession] = useState<Session | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    
    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();

      const firstTime = await AsyncStorage.getItem('getStarted7');

      if (firstTime === null) {
        setIsFirstTime(true);
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
    if (appReady && session && session.user && session.user['user_metadata'].pets == null) {
      router.replace('/screens/auth/sign_up_3'); 
    } else if (appReady && session && session.user) {
      router.replace('/screens/(tabs)'); 
    } else if (appReady && isFirstTime === true) {
      router.replace('/screens/onboarding/get_started');
      console.log("AppReady: ", appReady);
      console.log("isFirstTime: ", isFirstTime);
    } else if (appReady && !session) {
      router.replace('/screens/auth/sign_in');
    }
  }, [appReady, isFirstTime, session, router]);

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/onboarding/get_started" options={{ headerShown: false }} />
        <Stack.Screen name="screens/auth/sign_in" options={{ headerShown: false }} />
        <Stack.Screen name="screens/auth/sign_up_1" options={{ headerShown: false }} />
        <Stack.Screen name="screens/auth/sign_up_2" options={{ headerShown: false }} />
        <Stack.Screen name="screens/auth/sign_up_3" options={{ headerShown: false }} />
        <Stack.Screen name="screens/auth/forgot_password_1" options={{ headerShown: false }} />
        <Stack.Screen name="screens/auth/forgot_password_2" options={{ headerShown: false }} />
        <Stack.Screen name="screens/auth/forgot_password_3" options={{ headerShown: false }} />
        <Stack.Screen 
          name="screens/(tabs)" 
          options={{ 
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="screens/pets/pets" 
          options={{ 
            header: () => <AppbarDefault title='Pets' session={session} />
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
