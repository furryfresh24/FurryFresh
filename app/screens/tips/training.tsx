import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
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

      <View style={styles.centerBox}>
        <Text style={styles.centerText}>Tip #1</Text>
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
    marginTop: dimensions.screenWidth * 0.07,
    marginLeft: dimensions.screenWidth * 0.03,
  },
  image: {
    width: dimensions.screenWidth * 0.05,
    height: dimensions.screenWidth * 0.05,
  },
  centerBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 9,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: dimensions.screenWidth * 0.13,
    width: dimensions.screenWidth * 0.3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  centerText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    color: "#466AA2",
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
