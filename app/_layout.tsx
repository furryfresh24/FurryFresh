import "react-native-reanimated";
import React, { useEffect, useState, useRef } from "react";
import { Stack, useRouter, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import useCustomFonts from "./hooks/useFonts";
import ThemeProvider from "./providers/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "./utils/supabase";
import { Session } from "@supabase/supabase-js";
import AppbarDefault from "./components/bars/appbar_default";
import { RouteProp } from "@react-navigation/native";
import dimensions from "../app/utils/sizing";
import { SessionProvider } from "./context/sessions_context";
import { CartProvider } from "./context/cart_context";
import Providers from "./context/context_handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";

const RootLayout = () => {
  const fontsLoaded = useCustomFonts();
  const [appReady, setAppReady] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const navigated = useRef(false);


  // Session management
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // App preparation logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const firstTime = await AsyncStorage.getItem("getStarted7");
        setIsFirstTime(firstTime === null);

        if (fontsLoaded) {
          timeoutId = setTimeout(async () => {
            await SplashScreen.hideAsync();
            setAppReady(true);
          }, 1000);
        }
      } catch (error) {
        console.error("App preparation error:", error);
      }
    };

    prepare();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fontsLoaded]);

  // Routing logic
  useEffect(() => {
    if (!appReady || navigated.current) return;

    const currentRoute = pathname.split("/").pop() || "";
    const userMetadata = session?.user?.user_metadata;

    const routeMap = {
      authenticated: userMetadata?.pets
        ? "/screens/(tabs)"
        : "/screens/auth/sign_up_3",
      firstTime: "/screens/onboarding/get_started",
      default: "/screens/auth/sign_in",
    };

    if (session?.user) {
      if (!currentRoute.includes("sign_up_3") && !userMetadata?.pets) {
        navigated.current = true;
        router.replace(routeMap.authenticated);
      } else if (!currentRoute.includes("(tabs)")) {
        navigated.current = true;
        router.replace(routeMap.authenticated);
      }
    } else if (isFirstTime) {
      if (!currentRoute.includes("get_started")) {
        navigated.current = true;
        router.replace(routeMap.firstTime);
      }
    } else if (!currentRoute.includes("sign_in")) {
      navigated.current = true;
      router.replace(routeMap.default);
    }
  }, [appReady, isFirstTime, session, pathname]);

  return (
    <Providers>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PortalProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="screens/onboarding/get_started"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/auth/sign_in"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/auth/sign_up_1"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/auth/sign_up_2"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/auth/sign_up_3"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/auth/forgot_password_1"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/auth/forgot_password_2"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/auth/forgot_password_3"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/pets/pets"
                options={{
                  header: () => (
                    <AppbarDefault
                      title="Pets"
                      session={session}
                      showLeading={false}
                      leadingChildren={undefined}
                      titleSize={dimensions.screenWidth * 0.05}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="screens/shop/shop"
                options={({
                  route,
                }: {
                  route: RouteProp<Record<string, { title?: string }>, string>;
                }) => {
                  const titleParam = route?.params?.title;
                  const title =
                    typeof titleParam === "string" ? titleParam : "Shop";

                  return {
                    header: () => (
                      <AppbarDefault
                        title={title}
                        session={session}
                        showLeading={false}
                        leadingChildren={undefined}
                        titleSize={dimensions.screenWidth * 0.045}
                      />
                    ),
                    headerShown: false
                  };
                }}
              />
              <Stack.Screen name="screens/shop/prod_view" />
              <Stack.Screen
                name="screens/booking/booking_scheduling"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="screens/booking/confirm_scheduling"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="screens/payments/paypal"
                options={{
                  headerShown: true,
                  header: () => <AppbarDefault
                    title="Payment"
                    subtitleSize={dimensions.screenWidth * 0.03}
                    subtitleFont="Poppins-Regular"
                    session={session}
                    showLeading={false}
                    leadingChildren
                    titleSize={dimensions.screenWidth * 0.045}
                  />
                }}
              />
              <Stack.Screen
                name="screens/booking/success_booking"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/search/search"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/profile/edit_profile"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/playdate/getstarted"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/orders/cart"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/playdate/home"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/orders/confirm_order"
                options={{ headerShown: false }}
              />
            </Stack>
          </PortalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Providers>
  );
};

export default RootLayout;
