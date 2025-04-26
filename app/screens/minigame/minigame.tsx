import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated';
import dimensions from '../../utils/sizing';

const Minigame = () => {
  const [catImage] = useState(require('../../assets/images/others/miniGameCatOpen.png'));
  const [fishImage] = useState(require('../../assets/images/others/miniGameFish.png')); // Fish image

  const translateX = useSharedValue(0); // Shared value to track the horizontal movement
  const translateY = useSharedValue(-dimensions.screenHeight * 0.1); // Initial position above the screen for the fish
  const catContainerWidth = dimensions.screenWidth * 0.2; // Width of the cat container
  const platformWidth = dimensions.screenWidth * 0.8; // Width of the platform container
  const platformHeight = dimensions.screenHeight * 0.02; // Height of the platform container
  const platformStartX = (dimensions.screenWidth - platformWidth) / 2; // Start X position of the platform container
  const platformY = dimensions.screenHeight * 0.05; // Y position of the platform container

  // Fish falling animation
  const startFishFall = () => {
    translateY.value = withTiming(dimensions.screenHeight - platformHeight - dimensions.screenHeight * 0.07, {
      duration: 2000,
      easing: Easing.linear,
    });
  };

  useEffect(() => {
    startFishFall();
  }, []);

  // Cast the event to the correct type
  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;

    // Limit the translationX to ensure it doesn't surpass the platformContainer boundaries
    const maxTranslationX = platformWidth - catContainerWidth; // Maximum allowable translation
    const minTranslationX = 0; // Minimum allowable translation (start point)

    // Apply the limit for the translation
    let newTranslationX = translationX;

    if (newTranslationX < minTranslationX) {
      newTranslationX = minTranslationX; // Prevent moving left beyond the platform container
    } else if (newTranslationX > maxTranslationX) {
      newTranslationX = maxTranslationX; // Prevent moving right beyond the platform container
    }

    translateX.value = newTranslationX; // Update the position of the catContainer
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === 5) { // End of the gesture (GESTURE_STATE_END)
      translateX.value = withSpring(translateX.value); // Smooth transition when drag is finished
    }
  };

  const catContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const fishStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      position: 'absolute',
      left: (dimensions.screenWidth - dimensions.screenWidth * 0.15) / 2, // Center horizontally
    };
  });

  return (
    <View style={styles.container}>
      {/* Fish image falling from top to bottom */}
      <Animated.Image
        source={fishImage}
        style={[styles.fish, fishStyle]} // Apply the falling animation style
        resizeMode="contain"
      />

      <View style={styles.platformContainer} />

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.catContainer, catContainerStyle]}>
          <Image
            source={catImage}
            style={styles.cat}
            resizeMode="contain"
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0DFF4',
  },
  platformContainer: {
    width: dimensions.screenWidth * 0.8,
    height: dimensions.screenHeight * 0.02,
    backgroundColor: '#466AA2',
    borderRadius: dimensions.screenWidth * 0.03,
    alignSelf: 'center',
    position: 'absolute',
    bottom: dimensions.screenHeight * 0.05,
  },
  catContainer: {
    position: 'absolute',
    bottom: dimensions.screenHeight * 0.07, // Positioning it above the platformContainer
    left: dimensions.screenWidth * 0.1, // Adjust to center the container
    width: dimensions.screenWidth * 0.2, // Adjust width for the cat container
    height: dimensions.screenHeight * 0.12, // Adjust height for the cat container
    backgroundColor: '#F1C1C1', // Cat container background color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dimensions.screenWidth * 0.02, // Optional border radius for rounded corners
  },
  cat: {
    width: '100%',
    height: '100%',
  },
  fish: {
    width: dimensions.screenWidth * 0.15,
    height: dimensions.screenHeight * 0.05,
  },
});

export default Minigame;
