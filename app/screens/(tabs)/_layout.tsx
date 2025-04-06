import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import dimensions from '../../utils/sizing';
import HomeIcon from '../../components/svgs/home/HomeIcon';
import NavbarItem from '../../components/general/navbar_item';
import ActivityIcon from '../../components/svgs/home/ActivityIcon';
import ProfileIcon from '../../components/svgs/home/ProfileIcon';
import { homeOptions } from './home';



export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar, 
        tabBarActiveTintColor: '#466AA2', 
        tabBarInactiveTintColor: '#8e8e8e', 
        tabBarLabelStyle: [styles.tabLabel, ], 
        tabBarIconStyle: styles.tabIcon,
        tabBarShowLabel: false,
        tabBarPressColor: 'transparent',
        tabBarPressOpacity: 1,
        tabBarRippleEffect: false,
      }}
    >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <NavbarItem 
                  color={color}
                  title="Home"
                  icon={
                    <HomeIcon 
                      color={color}
                      width={dimensions.screenWidth * 0.07} 
                      height={dimensions.screenWidth * 0.07} 
                      props
                    />
                  }
                />
              </View>
            ),
            header: homeOptions.header
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <NavbarItem 
                  color={color}
                  title="Activity"
                  icon={
                    <ActivityIcon
                      color={color}
                      width={dimensions.screenWidth * 0.07} 
                      height={dimensions.screenWidth * 0.07} 
                      props
                    />
                  }
                />
              </View>
            ),
          }}
        />
      <Tabs.Screen
        name="profile"  
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <NavbarItem 
                color={color}
                title="Profile"
                icon={
                  <ProfileIcon
                    color={color}
                    width={dimensions.screenWidth * 0.07} 
                    height={dimensions.screenWidth * 0.07} 
                    props
                  />
                }
              />
            </View>
          ),
          headerShown: false
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    elevation: 15,
    height: dimensions.screenHeight * 0.1, 
    paddingTop: dimensions.screenHeight * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -30 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
    alignContent: "center"
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    marginTop: dimensions.screenHeight * 0.005
  },
  tabIcon: {
    marginBottom: dimensions.screenHeight * 0.003,
    flex: 1,
    width: "auto"
  },
});
