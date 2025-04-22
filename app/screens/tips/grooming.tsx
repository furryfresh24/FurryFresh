import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import dimensions from "../../utils/sizing";

const TrainingTipsScreen = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.push("../tips/home"); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle} onPress={handleBackPress}>
        <Image
          source={require("../../assets/images/others/arrowBack.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TrainingTipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0DFF4",
    padding: 20,
  },
  circle: {
    width: dimensions.screenWidth * 0.13,
    height: dimensions.screenWidth * 0.13,
    backgroundColor: "#466AA2",
    borderRadius: (dimensions.screenWidth * 0.13) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: dimensions.screenWidth * 0.06,
    marginLeft: dimensions.screenWidth * 0.03,
  },
  image: {
    width: dimensions.screenWidth * 0.05,
    height: dimensions.screenWidth * 0.05,
  },
});
