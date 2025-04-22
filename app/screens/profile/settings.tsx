import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import dimensions from "../../utils/sizing";
import MainContPlain from '../../components/general/background_plain';
import Spacer from '../../components/general/spacer';
import { ChevronRight } from "lucide-react-native"; // Import a specific icon

interface SettingOption {
  id: string;
  title: string;
  onPress?: () => void;
}

const SETTINGS_OPTIONS: SettingOption[] = [
  { id: '1', title: 'Account', onPress: () => { } },
  { id: '2', title: 'Privacy', onPress: () => { } },
  { id: '3', title: 'Security & permissions', onPress: () => { } },
  { id: '4', title: 'Your orders', onPress: () => { } },
  { id: '5', title: 'Share profile', onPress: () => { } },
  { id: '6', title: 'Log Out', onPress: () => { } },
];

const Settings: React.FC = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings and Privacy',
      headerBackTitleVisible: false,
      headerTintColor: 'black',
    });
  }, [navigation]);


  const renderItem = ({ item }: { item: SettingOption }) => (
    <TouchableOpacity style={styles.item} onPress={item.onPress}>
      <Text style={styles.itemText}>{item.title}</Text>
      <ChevronRight size={dimensions.screenWidth * 0.05} color="#000" style={styles.chevronIcon} />
    </TouchableOpacity>
  );

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <MainContPlain>
      <Spacer height={dimensions.screenHeight * 0.023} />
      <View style={styles.container}>
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
      <Spacer height={dimensions.screenHeight * 0.023} />
      <View style={styles.container}>
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
    </MainContPlain>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dimensions.screenWidth * 0.05,
    paddingTop: 0
  },
  title: {
    fontSize: dimensions.screenWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: dimensions.screenHeight * 0.02,
  },
  listCont: {
    backgroundColor: 'white',
    borderRadius: 6
  },
  sectionHeader: {
    fontSize: dimensions.screenWidth * 0.045,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: dimensions.screenHeight * 0.01,
  },
  item: {
    padding: dimensions.screenHeight * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chevronIcon: {
    marginLeft: 10,
  },
  itemText: {
    fontSize: dimensions.screenWidth * 0.04,
    fontFamily: 'Poppins-Regular'
  },
});
