import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MainContPaw from "../../components/general/background_paw";
import dimensions from "../../utils/sizing";
import Icon from "react-native-vector-icons/FontAwesome";
import Subtitle1 from "../../components/texts/subtitle1";

const Profile = () => {
  return (
    <MainContPaw>
      <View style={styles.topContainer}>
        <View style={styles.titlePage}>
          <Text style={styles.titleText}>Profile</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Icon name="envelope" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="th"
                size={20}
                color="black"
                style={styles.iconMargin}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicContainer}>
            <Image
              source={require("../../assets/images/general/pet-enjoy.png")}
              style={styles.profilePic}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Edber Pogi</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
              <Icon name="edit" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewPetsButton}>
              <Text style={styles.buttonText}>View Pets</Text>
              <Icon name="paw" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            <View style={[styles.statItem, { flex: 1, alignItems: 'flex-start' }]}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Pets</Text>
              </View>
            </View>
            <View style={[styles.statItem, { flex: 2 }]}>
              <Text style={styles.statNumber}>May 23, 2002</Text>
              <Text style={styles.statLabel}>Joined On</Text>
            </View>
            <View style={[styles.statItem, { flex: 1, alignItems: 'flex-end' }]}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.statNumber}>10</Text>
                <Text style={styles.statLabel}>Playdates</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.aboutContainer}>
        <View style={styles.aboutHeader}>
          <Text style={styles.aboutTitle}>About Me</Text>
          <Icon
            name="user"
            size={dimensions.screenWidth * 0.04}
            color="white"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.aboutInput}>
            <Text style={styles.aboutPlaceholder}>
              Say something about you as a pet owner...
            </Text>
          </View>
          <TouchableOpacity style={styles.editIconButton}>
            <Icon name="edit" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </MainContPaw>
  );
};

export default Profile;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: dimensions.screenHeight * 0.01,
    paddingHorizontal: dimensions.screenWidth * 0.03,
  },
  titlePage: {
    marginTop: dimensions.screenHeight * 0.038,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: dimensions.screenWidth * 0.046,
    flex: 1,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginVertical: dimensions.screenHeight * 0.03,
    paddingLeft: dimensions.screenHeight * 0.05,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconMargin: {
    marginLeft: dimensions.screenHeight * 0.015,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: dimensions.screenHeight * 0.014,
  },
  profilePicContainer: {
    position: "relative",
    paddingBottom: dimensions.screenHeight * 0.009,
    paddingTop: dimensions.screenHeight * 0.009,
  },
  profilePic: {
    width: dimensions.screenHeight * 0.18,
    height: dimensions.screenHeight * 0.18,
    backgroundColor: "#5d86c5",
    borderRadius: 100,
  },
  cameraButton: {
    position: "absolute",
    bottom: dimensions.screenHeight * 0.007,
    right: dimensions.screenHeight * 0.003,
    width: dimensions.screenHeight * 0.05,
    height: dimensions.screenHeight * 0.05,
    borderRadius: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: dimensions.screenHeight * 0.009,
    paddingBottom: dimensions.screenHeight * 0.009,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 25,
    marginTop: dimensions.screenHeight * 0.009,
  },
  editButton: {
    borderColor: "#E0E0E0",
    borderWidth: dimensions.screenHeight * 0.001,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: dimensions.screenHeight * 0.18,
    flex: 1,
    backgroundColor: "white",
  },
  editButtonText: {
    color: "black",
    fontFamily: "Poppins-SemiBold",
    fontSize: dimensions.screenWidth * 0.036,
    marginRight: dimensions.screenHeight * 0.01,
  },
  viewPetsButton: {
    backgroundColor: "#FF6F61",
    flex: 1,
    borderRadius: dimensions.screenHeight * 0.01,
    flexDirection: "row",
    paddingVertical: dimensions.screenHeight * 0.008,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: dimensions.screenWidth * 0.036,
    marginRight: dimensions.screenHeight * 0.01,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F7F7F7",
    padding: dimensions.screenHeight * 0.01,
    borderRadius: 15,
    paddingHorizontal: dimensions.screenWidth * 0.05,
    marginTop: dimensions.screenHeight * 0.02,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#888",
  },
  aboutContainer: {
    borderRadius: dimensions.screenHeight * 0.01,
    margin: dimensions.screenWidth * 0.05,
    marginTop: dimensions.screenHeight * 0.02,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  aboutHeader: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#466AA2",
    borderRadius: 30,
    paddingVertical: dimensions.screenHeight * 0.0035,
    paddingHorizontal: dimensions.screenHeight * 0.013,
    width: dimensions.screenHeight * 0.14,
  },
  aboutTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginRight: dimensions.screenHeight * 0.01,
  },
  inputContainer: {
    position: "relative",
  },
  aboutInput: {
    borderColor: "transparent",
    backgroundColor: "white",
    borderWidth: 1,
    elevation: 0,
    minHeight: dimensions.screenHeight * 0.17,
    borderRadius: 15,
    padding: dimensions.screenWidth * 0.035,
    maxHeight: dimensions.screenHeight * 0.1,
    paddingRight: dimensions.screenHeight * 0.05,
    marginTop: dimensions.screenHeight * 0.01,
  },
  aboutPlaceholder: {
    fontFamily: "Poppins-light",
    color: "#808080",
  },
  editIconButton: {
    backgroundColor: "#FF6F61",
    borderRadius: 100,
    padding: dimensions.screenHeight * 0.005,
    alignItems: "center",
    justifyContent: "center",
    width: dimensions.screenHeight * 0.05,
    height: dimensions.screenHeight * 0.05,
    position: "absolute",
    right: dimensions.screenWidth * 0.04,
    bottom: dimensions.screenHeight * 0.02,
  },
});
