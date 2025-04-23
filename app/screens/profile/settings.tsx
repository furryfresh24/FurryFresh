import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { router, useNavigation } from 'expo-router';
import dimensions from "../../utils/sizing";
import MainContPlain from '../../components/general/background_plain';
import Spacer from '../../components/general/spacer';
// import { ChevronRight } from "lucide-react-native";
import { Ionicons, Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import supabase from '../../utils/supabase';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

interface SettingOption {
  id: string;
  title: string;
  icon: JSX.Element;
  onPress?: () => void;
}

interface SettingLogin {
  id: string;
  title: string;
  icon: JSX.Element;
  onPress: () => void;
}

const Settings: React.FC = () => {
  const navigation = useNavigation();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%"], []);
  const openSheet = () => sheetRef.current?.expand();

  const backDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const SETTINGS_OPTIONS: SettingOption[] = [
    {
      id: '1',
      title: 'Account',
      icon: <Feather name="user" size={20} color="#a2a2a2" />,
      onPress: () => { },
    },
    {
      id: '2',
      title: 'Privacy',
      icon: <Feather name="lock" size={20} color="#a2a2a2" />,
      onPress: () => { },
    },
    {
      id: '3',
      title: 'Security & permissions',
      icon: <MaterialIcons name="security" size={20} color="#a2a2a2" />,
      onPress: () => { },
    },
    {
      id: '4',
      title: 'Your orders',
      icon: <FontAwesome5 name="box" size={20} color="#a2a2a2" />,
      onPress: () => { },
    },
    {
      id: '5',
      title: 'Share profile',
      icon: <Feather name="share-2" size={20} color="#a2a2a2" />,
      onPress: () => { },
    },
  ];

  const SETTINGS_LOGIN: SettingLogin[] = [
    {
      id: '1',
      title: 'Log out',
      icon: <Feather name="log-out" size={20} color="#a2a2a2" />,
      onPress: openSheet,
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings and Privacy',
      headerBackTitleVisible: false,
      headerTintColor: 'black',
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: SettingOption | SettingLogin }) => (
    <TouchableOpacity style={styles.item} onPress={item.onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {'icon' in item && item.icon && (
          <View style={{ marginRight: 10 }}>{item.icon}</View>
        )}
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
      {/* <ChevronRight size={dimensions.screenWidth * 0.05} color="#000" style={styles.chevronIcon} /> */}
    </TouchableOpacity>
  );

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <MainContPlain>
      <Spacer height={dimensions.screenHeight * 0.023} />

      <View style={styles.containerAcc}>
        {renderSectionHeader('Account')}
        <View style={styles.listCont}>
          <FlatList
            data={SETTINGS_OPTIONS}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </View>

      <Spacer height={dimensions.screenHeight * 0.01} />

      <View style={styles.containerLogin}>
        {renderSectionHeader('Login')}
        <View style={styles.listCont}>
          <FlatList
            data={SETTINGS_LOGIN}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </View>

      <Portal>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          handleComponent={null}
          backgroundStyle={{ backgroundColor: "white", borderRadius: 20 }}
          backdropComponent={backDrop}
        >
          <BottomSheetView style={styles.sheetContainer}>
            <Text style={styles.sheetTitle}>Are you sure you want to log out?</Text>

            <TouchableOpacity
              onPress={async () => {
                await supabase.auth.signOut();
                router.replace("../auth/sign_in");
              }}
              style={[styles.sheetBtn, { borderTopWidth: 2 }]}
            >
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => sheetRef.current?.close()}
              style={[styles.sheetBtn, { borderTopWidth: 2 }]}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>

      </Portal>
    </MainContPlain>
  );
};

export default Settings;

const styles = StyleSheet.create({
  containerAcc: {
    padding: dimensions.screenWidth * 0.04,
    paddingTop: 0,
  },
  containerLogin: {
    padding: dimensions.screenWidth * 0.04,
    paddingTop: 0,
  },
  listCont: {
    backgroundColor: 'white',
    borderRadius: 6,
  },
  sectionHeader: {
    fontSize: dimensions.screenWidth * 0.038,
    fontFamily: 'Poppins-SemiBold',
    color: "#a2a2a2",
    paddingLeft: dimensions.screenHeight * 0.015,
    marginBottom: dimensions.screenHeight * 0.01,
  },
  item: {
    padding: dimensions.screenHeight * 0.025,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chevronIcon: {
    marginLeft: 10,
  },
  itemText: {
    fontSize: dimensions.screenWidth * 0.04,
    fontFamily: 'Poppins-Regular',
  },
  sheetTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  sheetContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%', // Ensure the container takes full width
  },
  sheetBtn: {
    width: '100%', // Make sure the button spans the full width of the container
    paddingVertical: 14,
    borderTopWidth: 2, // Border is applied to the top edge of each button
    borderTopColor: '#eee', // Light color for the top border
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff3b30',
  },
  cancelText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});
  
