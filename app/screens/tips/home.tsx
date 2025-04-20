import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import dimensions from '../../utils/sizing';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  withTiming,
  interpolate,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

const Home = () => {
  const router = useRouter();

  const handlePress = () => router.push('../tips/training');

  const hoverStateTraining = useSharedValue(0);
  const hoverStateNutrition = useSharedValue(0);
  const trainingRotation = useSharedValue(0); 
  const nutritionRotation = useSharedValue(0); 

  const [flippedTraining, setFlippedTraining] = useState(false);
  const [flippedNutrition, setFlippedNutrition] = useState(false);

  const handlePressIn = () => {
    hoverStateTraining.value = withTiming(1, { duration: 150 });
  };

  const handlePressOut = () => {
    hoverStateTraining.value = withTiming(0, { duration: 150 });
  };

  const handlePressInNutrition = () => {
    hoverStateNutrition.value = withTiming(1, { duration: 150 });
  };

  const handlePressOutNutrition = () => {
    hoverStateNutrition.value = withTiming(0, { duration: 150 });
  };

  const clickBoxStyleTraining = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      hoverStateTraining.value,
      [0, 1],
      ['#FFFFFF', '#D0DFF4']
    );
    return { backgroundColor };
  });

  const clickBoxStyleNutrition = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      hoverStateNutrition.value,
      [0, 1],
      ['#FFFFFF', '#D0DFF4']
    );
    return { backgroundColor };
  });

  const frontAnimatedStyleTraining = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(trainingRotation.value, [0, 180], [0, 180])}deg` },
    ],
    backfaceVisibility: 'hidden',
  }));

  const backAnimatedStyleTraining = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(trainingRotation.value, [0, 180], [180, 360])}deg` },
    ],
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
  }));

  const frontAnimatedStyleNutrition = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(nutritionRotation.value, [0, 180], [0, 180])}deg` },
    ],
    backfaceVisibility: 'hidden',
  }));

  const backAnimatedStyleNutrition = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(nutritionRotation.value, [0, 180], [180, 360])}deg` },
    ],
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
  }));

  const handleTrainingCardFlip = () => {
    const newRotation = flippedTraining ? 0 : 180;
    trainingRotation.value = withTiming(newRotation, { duration: 800 });
    setFlippedTraining(!flippedTraining);
  };

  const handleNutritionCardFlip = () => {
    const newRotation = flippedNutrition ? 0 : 180;
    nutritionRotation.value = withTiming(newRotation, { duration: 800 });
    setFlippedNutrition(!flippedNutrition);
  };

  const handleNutritionClick = () => {
    router.push('../tips/nutrition');  
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLeftWrapper}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.coloredBox}>
            <Image
              source={require('../../assets/images/others/home.png')}
              style={styles.homeIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.textContainer}>
          <Text style={styles.backText}>Back to Home</Text>
          <Text style={styles.pageText}>Page</Text>
        </View>
      </View>

      <View style={styles.titleWrapper}>
        <View style={styles.inlineTitle}>
          <Text style={[styles.title, styles.blueText]}>PET CARE </Text>
          <Text style={[styles.title, styles.orangeText]}>TIPS</Text>
        </View>
        <Text style={styles.subtitle}>
          Please select a category to explore a wealth of helpful tips for your pets.
        </Text>

        <View style={styles.containerRow}>
          <TouchableWithoutFeedback onPress={handleTrainingCardFlip}>
            <View style={styles.cardContainer}>
              <Animated.View style={[styles.cardSide, styles.frontCard, frontAnimatedStyleTraining]}>
                <Image
                  source={require('../../assets/images/others/training.png')}
                  style={styles.trainingImage}
                  resizeMode="contain"
                />
                <Text style={styles.trainingLabel}>Training</Text>

                <TouchableWithoutFeedback
                  onPress={handlePress}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <Animated.View style={[styles.clickBox, clickBoxStyleTraining]}>
                    <Text style={styles.clickText}>Click This</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </Animated.View>

              <Animated.View style={[styles.cardSide, styles.backCard, backAnimatedStyleTraining]} pointerEvents="none">
                <Text style={styles.backTextCardTitle}>Training Tips</Text>
                <Text style={styles.backTextCard}>
                  Helpful training strategies for your furry friends.
                </Text>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={handleNutritionCardFlip}>
            <View style={styles.cardContainer}>
              <Animated.View style={[styles.cardSide, styles.frontCard, frontAnimatedStyleNutrition]}>
                <Image
                  source={require('../../assets/images/others/nutrition.png')}
                  style={styles.nutritionImage}
                  resizeMode="contain"
                />
                <Text style={styles.nutritionLabel}>Nutrition</Text>

                <TouchableWithoutFeedback
                  onPress={handleNutritionClick} 
                  onPressIn={handlePressInNutrition}
                  onPressOut={handlePressOutNutrition}
                >
                  <Animated.View style={[styles.clickBox, clickBoxStyleNutrition]}>
                    <Text style={styles.clickText}>Click This</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </Animated.View>

              <Animated.View style={[styles.cardSide, styles.backCard, backAnimatedStyleNutrition]} pointerEvents="none">
                <Text style={styles.backTextCardTitle}>Nutrition Tips</Text>
                <Text style={styles.backTextCard}>
                  Helpful tips to maintain a balanced diet for your pets.
                </Text>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
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
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inlineTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  title: {
    fontSize: dimensions.screenWidth * 0.07,
    fontFamily: 'Baloo-Regular',
    textAlign: 'center',
  },
  blueText: { color: '#121F63' },
  orangeText: { color: '#E94C30' },
  subtitle: {
    color: '#466AA2',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: screenWidth * 0.9,
    alignSelf: 'center',
  },
  cardContainer: {
    width: (screenWidth * 0.9 - 10) / 2,
    height: screenWidth * 0.6,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  cardSide: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#466AA2',
  },
  frontCard: {
    zIndex: 1,
  },
  backCard: {
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trainingImage: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.38,
    marginTop: -screenWidth * 0.07,
    marginBottom: -screenWidth * 0.01,
  },
  trainingLabel: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  nutritionImage: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.38,
    marginTop: -screenWidth * 0.07,
    marginBottom: -screenWidth * 0.01,
  },
  nutritionLabel: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  clickBox: {
    marginTop: screenWidth * 0.02,
    backgroundColor: '#FFFFFF',
    paddingVertical: screenWidth * 0.015,
    paddingHorizontal: screenWidth * 0.05,
    borderRadius: 15,
  },
  clickText: {
    color: '#466AA2',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
  },
  backTextCardTitle: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: screenWidth * 0.01,
  },
  backTextCard: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 10,
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
