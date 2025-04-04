import React, { useState, useEffect, useRef } from "react";
import { TextInput, StyleSheet, View, Text, Animated, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dimensions from '../../utils/sizing';

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  label?: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap; 
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  marginBottom?: number;
  marginTop?: number;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  iconName = "email-outline",
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "none",
  autoCorrect = true,
  marginTop = 0,
  marginBottom = dimensions.screenHeight * 0.04,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(labelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const labelStyle = {
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [dimensions.screenHeight * 0.022, dimensions.screenHeight * 0.01],
    }),
    left: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [dimensions.screenHeight * 0.07, dimensions.screenHeight * 0.068],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [dimensions.screenWidth * 0.035, dimensions.screenWidth * 0.03],
    }),
  };

  return (
    <View style={[styles.container, { marginTop, marginBottom }]}>
      <View
        style={[styles.inputContainer, { borderColor: isFocused || value ? "#D97662" : "#ccc" }]}
      >
        {label && (
          <Animated.Text
            style={[styles.label, labelStyle]}
          >
            {label}
          </Animated.Text>
        )}
        <MaterialCommunityIcons name={iconName} size={20} color="#D97662" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor="transparent"
          secureTextEntry={isPasswordVisible}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.eyeIconContainer}>
            <MaterialCommunityIcons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#D97662"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    position: "absolute",
    left: 10,
    color: "#888",
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#F8F8FF',
    borderRadius: 15,
    paddingHorizontal: dimensions.screenWidth * 0.05,
    height: dimensions.screenHeight * 0.072,
    borderWidth: 2,
    position: "relative",
  },
  icon: {
    marginRight: dimensions.screenWidth * 0.05,
  },
  input: {
    flex: 1,
    fontSize: dimensions.screenWidth * 0.035,
    fontFamily: "Poppins-Regular",
    color: "#333",
    paddingVertical: 1,
    marginTop: dimensions.screenHeight * 0.015
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomTextInput;
