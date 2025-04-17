import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; // ✅ Correct import for expo-router
import dimensions from '../../utils/sizing';

const GetStarted = () => {
  const router = useRouter(); // ✅ Router instance

  return (
    <View style={styles.wrapper}>
      {/* Left Center Paws */}
      <Image
        source={require('../../assets/images/others/paws.png')}
        style={styles.paws}
        resizeMode="contain"
      />

      {/* Bottom Right Paw */}
      <Image
        source={require('../../assets/images/others/paw.png')}
        style={styles.pawBottomRight}
        resizeMode="contain"
      />

      {/* Top Right Circle */}
      <Image
        source={require('../../assets/images/others/circle.png')}
        style={styles.circle}
        resizeMode="contain"
      />

      {/* Logo */}
      <Image
        source={require('../../assets/images/general/furry-fresh-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Dog */}
      <Image
        source={require('../../assets/images/others/dog.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Colored Title */}
      <View style={[styles.titleRow, styles.compactTitleRow]}>
        <Text style={[styles.title, styles.orange]}>FURRY </Text>
        <Text style={[styles.title, styles.blue]}>FRESH</Text>
      </View>
      <View style={styles.titleRow}>
        <Text style={[styles.title, styles.blue]}>PLAY </Text>
        <Text style={[styles.title, styles.orange]}>DATE</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Unleash the fun! Dive into Furry Fresh's Playdate feature and connect your pet with new furry friends today!
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.getStartedBox}
        onPress={() => router.push('../playdate/home')} 
      >
        <Text style={styles.getStartedText}>Get Started</Text>
        <Image
          source={require('../../assets/images/others/arrow.png')}
          style={styles.arrowLogo}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#D0DFF4',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  logo: {
    width: 85,
    height: 85,
    marginBottom: -5,
    marginTop: 20,
  },
  image: {
    width: 390,
    height: 390,
    marginBottom: -15,
  },
  paws: {
    position: 'absolute',
    left: 0,
    top: '30%',
    width: 100,
    height: 200,
  },
  pawBottomRight: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    width: 120,
    height: 120,
  },
  circle: {
    position: 'absolute',
    bottom: 500,
    right: -30,
    width: 250,
    height: 250,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  compactTitleRow: {
    marginBottom: -15,
  },
  title: {
    fontSize: dimensions.screenWidth * 0.11,
    fontFamily: 'Baloo-Regular',
    textAlign: 'center',
  },
  orange: {
    color: '#E94C30',
  },
  blue: {
    color: '#121F63',
  },
  description: {
    fontSize: 13,
    color: '#466AA2',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 20,
  },
  getStartedBox: {
    marginTop: 20,
    backgroundColor: '#466AA2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 180,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginLeft: 20,
  },
  arrowLogo: {
    marginLeft: 20,
    height: 35,
    width: 40,
    marginTop: -10,
    marginBottom: -10,
  },
});
