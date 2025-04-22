import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import dimensions from "../../utils/sizing";

interface SettingOption {
  id: string;
  title: string;
  onPress?: () => void;
}

const SETTINGS_OPTIONS: SettingOption[] = [
  { id: '1', title: 'Account', onPress: () => {} },
  { id: '2', title: 'Privacy', onPress: () => {} },
  { id: '3', title: 'Security & permissions', onPress: () => {} },
  { id: '4', title: 'Your orders', onPress: () => {} },
  { id: '5', title: 'Share profile', onPress: () => {} },
  { id: '6', title: 'Log Out', onPress: () => {} },
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
    </TouchableOpacity>
  );

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      {renderSectionHeader('Account')}
      <FlatList
        data={SETTINGS_OPTIONS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dimensions.screenWidth * 0.05,
    backgroundColor: 'white',
  },
  title: {
    fontSize: dimensions.screenWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: dimensions.screenHeight * 0.02,
  },
  sectionHeader: {
    fontSize: dimensions.screenWidth * 0.045,
    fontWeight: 'bold',
    marginTop: dimensions.screenHeight * 0.03,
    marginBottom: dimensions.screenHeight * 0.01,
  },
  item: {
    padding: dimensions.screenHeight * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    fontSize: dimensions.screenWidth * 0.045,
  },
});
