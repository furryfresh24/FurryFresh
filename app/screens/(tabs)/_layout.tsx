import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import supabase from '../../utils/supabase';
import { BlurView } from 'expo-blur';
import dimensions from '../../utils/sizing';
import HomeIcon from '../../components/svgs/hub/HomeIcon';
import ActivityIcon from '../../components/svgs/hub/ActivityIcon';
import ProfileIcon from '../../components/svgs/hub/ProfileIcon';
import NavbarItem from '../../components/general/navbar_item';
import Home, { homeOptions } from './home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './profile';
import Activity from './activity';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#466AA2',
          tabBarInactiveTintColor: '#8e8e8e',
          tabBarBackground: () => (
            <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
          ),
          tabBarStyle: {
            backgroundColor: '#fff',
            position: 'absolute',
            elevation: 15,
            height: dimensions.screenHeight * 0.1,
            paddingTop: dimensions.screenHeight * 0.01,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -30 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            alignItems: 'center',
            alignContent: 'center',
          },
        }}
      >
        <Tab.Screen
          name="home"
          component={Home}  // Specify the Home screen component here
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <NavbarItem
                  color={color}
                  title="Home"
                  icon={<HomeIcon color={color} width={dimensions.screenWidth * 0.07} height={dimensions.screenWidth * 0.07} props={undefined} />}
                />
              </View>
            ),
            header: () => homeOptions.header(session),
          }}
        />
        <Tab.Screen
          name="activity"
          component={Activity}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <NavbarItem
                  color={color}
                  title="Activity"
                  icon={<ActivityIcon color={color} width={dimensions.screenWidth * 0.07} height={dimensions.screenWidth * 0.07} props={undefined} />}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <NavbarItem
                  color={color}
                  title="Profile"
                  icon={<ProfileIcon color={color} width={dimensions.screenWidth * 0.07} height={dimensions.screenWidth * 0.07} props={undefined} />}
                />
              </View>
            ),
            headerShown: false,
            tabBarBadge: 2,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    marginTop: dimensions.screenHeight * 0.005,
  },
  tabIcon: {
    marginBottom: dimensions.screenHeight * 0.003,
    flex: 1,
    width: 'auto',
  },
});
