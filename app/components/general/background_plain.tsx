import { StyleSheet, View, Image } from 'react-native';
import dimensions from '../../utils/sizing';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface MainContPlainProps {
  children: React.ReactNode;
  showPetImage?: boolean;
  paddingHorizontal?: number | null;
  paddingVertical?: number | null;
}

const MainContPlain: React.FC<MainContPlainProps> = ({
  children,
  showPetImage = false,
  paddingHorizontal = null,
  paddingVertical = null,
}) => {
  return (
    <View style={styles.container}>

      {showPetImage && (
        <Image 
          source={require('../../assets/images/general/pet-enjoy.png')}
          style={styles.petenjoy} 
        />
      )}

      <View style={{ paddingHorizontal, paddingVertical }}>
        {children}
      </View>
    </View>
  );
};

export default MainContPlain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    position: 'relative',
  },
  petenjoy: {
    position: 'absolute',
    width: dimensions.screenWidth * 0.42,
    height: dimensions.screenWidth * 0.42,
    bottom: -dimensions.screenHeight * 0.04,
    left: dimensions.screenWidth * 0.28,
    right: dimensions.screenWidth * 0.28,
  }
});
