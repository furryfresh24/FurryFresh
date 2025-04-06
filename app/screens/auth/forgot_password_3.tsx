import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import MainContCircle from "../../components/general/background_circle";
import Title1 from "../../components/texts/title1";
import Subtitle1 from "../../components/texts/subtitle1";
import CustomTextInput from "../../components/inputs/custom_text_input1";
import Button1 from "../../components/buttons/button1";
import { router } from "expo-router";
import dimensions from "../../utils/sizing";

type Props = {};

const SignUpOTP = (props: Props) => {
  const [password, setPassword] = useState("");

  const handleSendCode = () => {
    router.push("./sign_in");
  };

  return (
    <MainContCircle
      showPetImage={true}
      paddingHorizontal={dimensions.screenWidth * 0.08}
    >
      <View style={styles.header}>
        <Title1
          text="Set A New   Password"
          fontSize={dimensions.screenWidth * 0.08}
          lineHeight={dimensions.screenWidth * 0.1}
          style={styles.title}
        />
        <Subtitle1
          text="Enter a strong new password. Make sure it’s different from your previous one."
          fontSize={dimensions.screenWidth * 0.038}
          fontFamily="Poppins-Regular"
          opacity={0.7}
          textAlign="left"
          style={styles.subtitle}
        />
      </View>

      <View style={styles.container}>
        <CustomTextInput
          value={password}
          label="New Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
          iconName="lock"
          marginBottom={dimensions.screenHeight * 0.03}
        />
        <CustomTextInput
          value={password}
          label="Confirm New Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
          iconName="lock"
          marginBottom={dimensions.screenHeight * 0.005}
        />
      </View>
      <View>
        <Button1
          title="Reset"
          isPrimary
          borderRadius={15}
          onPress={handleSendCode}
        />
      </View>
    </MainContCircle>
  );
};

export default SignUpOTP;

const styles = StyleSheet.create({
  header: {
    marginTop: dimensions.screenHeight * 0.1,
    width: "100%",
  },
  title: {
    textAlign: "left",
    marginBottom: dimensions.screenHeight * 0.01
  },
  subtitle: {
    textAlign: "left",
    opacity: 0.7,
  },
  container: {
    marginTop: dimensions.screenHeight * 0.03,
    marginBottom: dimensions.screenHeight * 0.03,
  },
});
