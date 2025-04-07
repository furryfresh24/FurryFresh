import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  View,
  ActivityIndicator,
} from 'react-native';
import dimensions from '../../utils/sizing';

interface ButtonProps {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | null;
  isPrimary: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  borderRadius?: number;
  loading?: boolean;
}

const Button1: React.FC<ButtonProps> = ({
  title,
  onPress,
  isPrimary,
  style,
  textStyle,
  borderRadius,
  loading = false,
}) => {
  const isDisabled = loading || !onPress;

  return (
    <View style={[styles.buttonContainer, style]}>
      <TouchableOpacity
        style={[
          styles.button,
          isPrimary ? styles.primaryButton : styles.secondaryButton,
          isDisabled && styles.disabledButton,
          borderRadius ? { borderRadius } : null,
        ]}
        onPress={onPress ?? undefined}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#fff"
            style={{
              paddingVertical: dimensions.screenHeight * 0.008,
              transform: [{ scale: 1.5 }],
            }}
          />
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: dimensions.screenHeight * 0.017,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#466AA2',
  },
  secondaryButton: {
    backgroundColor: '#ED7964',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#fff',
    fontSize: dimensions.screenWidth * 0.045,
    marginTop: dimensions.screenHeight * 0.001,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Button1;
