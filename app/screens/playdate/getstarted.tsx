import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const GetStarted = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the FurryFresh Play Date!</Text>
      <Text style={styles.description}>
        Here you can schedule fun activities and meet other furry friends nearby. 🐾
      </Text>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#466AA2',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
