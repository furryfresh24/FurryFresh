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

  const firstAnim = useRef(new Animated.Value(0)).current;
  const secondAnim = useRef(new Animated.Value(screenWidth)).current;

  const slideInFromRight = (anim: Animated.Value) =>
    Animated.timing(anim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });

  const slideOutToLeft = (anim: Animated.Value) =>
    Animated.timing(anim, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: true,
    });

  const toggleContainers = () => {
    if (showFirstContainer) {
      Animated.sequence([slideOutToLeft(firstAnim), slideInFromRight(secondAnim)]).start(() => {
        firstAnim.setValue(screenWidth);
        setShowFirstContainer(false);
      });
    } else {
      Animated.sequence([slideOutToLeft(secondAnim), slideInFromRight(firstAnim)]).start(() => {
        secondAnim.setValue(screenWidth);
        setShowFirstContainer(true);
      });
    }
  };

  const handlePress = () => router.push('../../screens/(tabs)/home');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const pets = [
    {
      name: 'Corki',
      breed: 'Dog, Corgi',
      image: require('../../assets/images/others/corki.png'),
      genderIcon: require('../../assets/images/others/male.png'),
    },
    {
      name: 'Putot',
      breed: 'Dog, Golden Retriever',
      image: require('../../assets/images/others/putot.png'),
      genderIcon: require('../../assets/images/others/male.png'),
    },
    // Add more pets here easily!
  ];


  return (
    <View style={styles.container}>
      {/* Home Button */}
      <View style={styles.topLeftWrapper}>
        <View style={{ flexDirection: 'row' }}>
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
      </View>

      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={[styles.title, styles.blueText]}>FIND YOUR PLAY </Text>
        <Text style={[styles.title, styles.orangeText]}>DATE</Text>
      </View>

      <View style={styles.line} />

      {/* Animated White Containers */}
      {pets.map((pet, index) => (
        <Animated.View
          key={index}
          style={[
            styles.whiteContainer,
            {
              position: index === 0 ? 'relative' : 'absolute',
              top: index === 0 ? undefined : 230,
              alignSelf: 'center',
              transform: [{ translateX: index === 0 ? firstAnim : secondAnim }],
            },
          ]}
        >
          <Image
            source={pet.image}
            style={styles.corkiImage}
            resizeMode="contain"
          />
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.containerTitle}>{pet.name}</Text>
              <Text style={styles.containerSubtitle}>{pet.breed}</Text>
            </View>
            <Image
              source={pet.genderIcon}
              style={styles.genderIcon}
              resizeMode="contain"
            />
          </View>
        </Animated.View>
      ))}


      {/* Details Box */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsContent}>
          <Image
            source={require('../../assets/images/others/i.png')}
            style={styles.infoIcon}
            resizeMode="contain"
          />
          <Text style={styles.detailsText}>PlayDate Details</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.containerRow}>
        <TouchableOpacity style={styles.skipContainer} onPress={toggleContainers}>
          <Image
            source={require('../../assets/images/others/skip.png')}
            style={styles.skipImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkContainer} onPress={openModal}>
          <Image
            source={require('../../assets/images/others/check.png')}
            style={styles.checkImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

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

      {/* Notification Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../../assets/images/general/furry-fresh-logo.png')}
              style={styles.modalLogo}
              resizeMode="contain"
            />
            <Text style={styles.modalText}>
              We will notify you when this playmate is available!
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Got It</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between'
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
  whiteContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 30,
    width: '73%',
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  corkiImage: {
    width: 250,
    height: 200,
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: -12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
  },
  containerTitle: {
    fontSize: 20,
    color: '#121F63',
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  containerSubtitle: {
    fontSize: 13,
    color: '#828282',
    fontFamily: 'Poppins-Regular',
    marginTop: -5,
  },
  genderIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  detailsContainer: {
    backgroundColor: '#466AA2',
    borderRadius: 30,
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 25,
  },
  detailsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  detailsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  skipContainer: {
    backgroundColor: '#DA8474',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 78,
    height: 78,
    marginRight: 15,
  },
  checkContainer: {
    backgroundColor: '#96AFD5',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 78,
    height: 78,
  },
  skipImage: {
    width: 28,
    height: 28,
  },
  checkImage: {
    width: 37,
    height: 37,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalLogo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#121F63',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#466AA2',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  modalButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
});
