import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import dimensions from '../../utils/sizing';
import React from 'react';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('../../screens/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      {/* Home */}
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

      <View style={styles.titleWrapper}>
        <Text style={[styles.title, styles.blueText]}>FIND YOUR PLAY </Text>
        <Text style={[styles.title, styles.orangeText]}>DATE</Text>
      </View>

      <View style={styles.line} />

      <View style={styles.whiteContainer}>
        <Image
          source={require('../../assets/images/others/corki.png')}
          style={styles.corkiImage}
          resizeMode="contain"
        />
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.containerTitle}>Corki</Text>
            <Text style={styles.containerSubtitle}>Dog, Corgi</Text>
          </View>
          <Image
            source={require('../../assets/images/others/male.png')}
            style={styles.genderIcon}
            resizeMode="contain"
          />
        </View>
      </View>

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

      <View style={styles.containerRow}>
        <View style={styles.skipContainer}>
          <Image
            source={require('../../assets/images/others/skip.png')}
            style={styles.skipImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.checkContainer}>
          <Image
            source={require('../../assets/images/others/check.png')}
            style={styles.checkImage}
            resizeMode="contain"
          />
        </View>
      </View>

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
  blueText: {
    color: '#121F63',
  },
  orangeText: {
    color: '#E94C30',
  },
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
});
