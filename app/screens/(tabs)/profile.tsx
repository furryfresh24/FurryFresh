import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import MainContPaw from "../../components/general/background_paw";
import dimensions from "../../utils/sizing";
import Icon from "react-native-vector-icons/FontAwesome";
import { usePet } from "../../context/pet_context";
import { useSession } from "../../context/sessions_context";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../../components/general/spacer";
import { router, useFocusEffect } from "expo-router";

const Profile = () => {
  const { session } = useSession();
  const { pets } = usePet();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const menuItems = [
    {
      id: '1',
      title: 'Settings and privacy',
      onPress: () => router.push('../profile/settings'),
    },
    { id: '2', title: 'Kakabit dito' },
    { id: '3', title: 'Boss Popoy' },
    { id: '4', title: '....' },
  ];

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false);
    }, [])
  );

  const renderProfileHeader = () => (
    <View style={styles.titlePage}>
      <View style={{ flex: 1 }}></View>
      <Text style={styles.titleText}>Profile</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={dimensions.screenWidth * 0.06}
            color="black"
          />
        </TouchableOpacity>
        <Spacer width={dimensions.screenWidth * 0.02} />
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons
            name="menu"
            size={dimensions.screenWidth * 0.07}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProfileInfo = () => (
    <View style={styles.profileContainer}>
      <View style={styles.profilePicContainer}>
        <View style={styles.profilePic}>
          {session?.user.user_metadata['avatar_url'] ? (
            <Image
              source={require("../../assets/images/general/pet-enjoy.png")}
              style={styles.profilePic}
            />
          ) : (
            <Ionicons
              name="person"
              style={{ alignSelf: 'center', color: 'white' }}
              size={dimensions.screenWidth * 0.12}
            />
          )}
        </View>
        <TouchableOpacity style={styles.cameraButton}>
          <Icon name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.userName}>
        {session?.user.user_metadata['first_name'] + ' ' + session?.user.user_metadata['last_name']}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('../profile/edit_profile')}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
          <Icon name="edit" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewPetsButton}
          onPress={() => router.push('../pets/pets')}
        >
          <Text style={styles.buttonText}>View Pets</Text>
          <Icon name="paw" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={[styles.statsContainer, { paddingTop: dimensions.screenWidth * 0.025 }]}>
        <View style={[styles.statItem, { flex: 1, alignItems: 'flex-start' }]}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.statNumber}>{pets.length}</Text>
            <Text style={styles.statLabel}>Pets</Text>
          </View>
        </View>
        <View style={[styles.statItem, { flex: 2 }]}>
          <Text style={styles.statNumber}>{moment(session?.user.created_at).format('MMM DD, YYYY')}</Text>
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
  );

  const renderAboutSection = () => (
    <View style={styles.aboutContainer}>
      <View style={styles.aboutHeader}>
        <Text style={[styles.aboutTitle, { fontFamily: 'Poppins-SemiBold' }]}>About Me</Text>
        <Icon name="user" size={dimensions.screenWidth * 0.04} color="white" />
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
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[{ key: 'header' }, { key: 'profile' }, { key: 'about' }]}
        renderItem={({ item }) => {
          switch (item.key) {
            case 'header':
              return renderProfileHeader();
            case 'profile':
              return renderProfileInfo();
            case 'about':
              return renderAboutSection();
            default:
              return null;
          }
        }}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: dimensions.screenHeight * 0.15 }}
      />
      {menuVisible && (
        <View style={styles.menuOverlay}>
          <TouchableOpacity style={styles.overlayBackground} onPress={toggleMenu} />
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.menuItem} 
                onPress={item.onPress}
              >
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: dimensions.screenWidth * 0.03,
  },
  titlePage: {
    marginTop: dimensions.screenHeight * 0.04,
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
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-end',
    flex: 1,
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
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: "#b1bfda",
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
    fontFamily: 'Poppins-SemiBold',
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
    marginLeft: dimensions.screenWidth * 0.03,
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
    marginRight: dimensions.screenWidth * 0.03,
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
    marginLeft: dimensions.screenWidth * 0.03,
    marginRight: dimensions.screenWidth * 0.03,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: dimensions.screenWidth * 0.041,
    lineHeight: dimensions.screenWidth * 0.05,
    margin: 0,
    fontFamily: "Poppins-SemiBold",
  },
  statLabel: {
    fontSize: dimensions.screenWidth * 0.03,
    fontFamily: "Poppins-Regular",
    lineHeight: dimensions.screenWidth * 0.04,
    color: "#888",
  },
  aboutContainer: {
    borderRadius: dimensions.screenHeight * 0.01,
    margin: dimensions.screenWidth * 0.05,
    marginTop: dimensions.screenHeight * 0.02,
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
    fontSize: dimensions.screenWidth * 0.035,
    lineHeight: dimensions.screenWidth * 0.05,
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
    fontFamily: "Poppins-Regular",
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
  menuOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  overlayBackground: {
    flex: 1,
  },
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: dimensions.screenHeight * 0.01,
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: dimensions.screenHeight * 0.02,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: dimensions.screenWidth * 0.002,
  },
  menuItemText: {
    fontSize: dimensions.screenWidth * 0.04,
    textAlign: "center",
  },
});
