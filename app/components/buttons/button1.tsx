import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle, View } from 'react-native';
import dimensions from '../../utils/sizing';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  isPrimary: boolean;  // Determines if the button is primary
  style?: ViewStyle;
  textStyle?: TextStyle;
  borderRadius?: number;
}

const Button1: React.FC<ButtonProps> = ({ title, onPress, isPrimary, style, textStyle, borderRadius }) => {
  return (
    <View style={[styles.buttonContainer, style]}>
      <TouchableOpacity
        style={[
          styles.button,
          isPrimary ? styles.primaryButton : styles.secondaryButton,
          borderRadius ? { borderRadius } : null,
        ]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%', // Ensures the container takes full width
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: dimensions.screenHeight * 0.017,
    width: '100%', // Makes the button take full width of its container
  },
  primaryButton: {
    backgroundColor: '#466AA2',  // Primary color
  },
  secondaryButton: {
    backgroundColor: '#ED7964',  // Secondary color
  },
  buttonText: {
    color: '#fff',
    fontSize: dimensions.screenWidth * 0.045,
    marginTop: dimensions.screenHeight * 0.001,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Button1;
