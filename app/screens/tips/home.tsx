import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import dimensions from '../../utils/sizing';
import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const Home = () => {
  const router = useRouter();
  const [showFirstContainer, setShowFirstContainer] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => router.push('../../screens/(tabs)/home');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <View style={styles.topLeftWrapper}>
        <TouchableOpacity style={styles.coloredBox} onPress={handlePress}>
          <Image
            source={require('../../assets/images/others/home.png')}
            style={styles.homeIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.backText}>Back to Home</Text>
          <Text style={styles.pageText}>Page</Text>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={[styles.title, styles.blueText]}>SELECT </Text>
        <Text style={[styles.title, styles.orangeText]}>A CATEGORY</Text>
      </View>

      <View style={styles.line} />


      {/* Paw Decorations */}
      <Image
        source={require('../../assets/images/others/paw1.png')}
        style={styles.paw1Image}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/others/paw2.png')}
        style={styles.paw2Image}
        resizeMode="contain"
      />

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0DFF4',
    paddingTop: 60,
    paddingHorizontal: 20,
    position: 'relative',
  },
  topLeftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coloredBox: {
    width: 55,
    height: 55,
    backgroundColor: '#466AA2',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -15,
  },
  homeIcon: {
    width: 28,
    height: 28,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    marginTop: -15,
  },
  backText: {
    color: '#121F63',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  pageText: {
    color: '#121F63',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: -3,
  },
  titleWrapper: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: dimensions.screenWidth * 0.07,
    fontFamily: 'Baloo-Regular',
    textAlign: 'center',
  },
  blueText: { color: '#121F63' },
  orangeText: { color: '#E94C30' },
  line: {
    marginTop: 10,
    width: '27%',
    height: 8,
    backgroundColor: '#121F63',
    alignSelf: 'center',
  },
  paw1Image: {
    position: 'absolute',
    bottom: 10,
    left: -10,
    width: 150,
    height: 150,
  },
  paw2Image: {
    position: 'absolute',
    top: 0,
    right: -30,
    width: 200,
    height: 200,
  },
});
