import { View, Text, Alert, StyleSheet } from "react-native";
import React from "react";
import MainCont from "../components/general/background";
import Title1 from "../components/texts/title1";
import dimensions from "../utils/sizing"
import Subtitle1 from "../components/texts/subtitle1";
import Button1 from "../components/buttons/button1";

const GetStarted = () => {
  return (
    <MainCont>
      <View style={styles.top}>
        <Title1 text="Welcome" fontSize={dimensions.screenHeight * 0.038} lineHeight={dimensions.screenHeight * 0.044} />
        <Subtitle1 
          text="Your trusted partner for stress-free pet grooming nad care!" 
          fontSize={dimensions.screenHeight * 0.018} 
          fontFamily="Poppins-Regular"
          opacity={0.8}
          marginTop={dimensions.screenHeight * 0.01}
        />
      </View>
      <View style={styles.bottom}>
        <Button1 title="Get Started" isPrimary={false} borderRadius={15} onPress={() => {}}/>
      </View>
    </MainCont>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  top: {
    marginTop: dimensions.screenHeight * 0.1
  },
  bottom: {
    marginTop: dimensions.screenHeight * 0.02
  }
});
