import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import MainContPaw from "../../components/general/background_paw";
import dimensions from "../../utils/sizing";
import Icon from "react-native-vector-icons/FontAwesome";
import Subtitle1 from "../../components/texts/subtitle1";
import { usePet } from "../../context/pet_context";
import { useSession } from "../../context/sessions_context";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../../components/general/spacer";
import { router } from "expo-router";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

const Profile = () => {
  const { session } = useSession();
  const { pets, fetchPets, addToPetContext, updatePetContext } = usePet();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["33%"], []);
  const openSheet = () => sheetRef.current?.expand();

  const backDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const handleSheetChange = (index: number) => {
    if (index === 0) {
      sheetRef.current?.close();
    }
  };

  type SheetItemProps = {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
    toRoute?: string;
  };

  const SheetItem = ({ title, icon, onPress, toRoute }: SheetItemProps) => {
    return (
      <TouchableOpacity onPress={onPress != null ? onPress : () => {sheetRef.current?.close(); router.push(toRoute ?? ''); } }>
        <View style={bs.itemCont}>
          <Ionicons name={icon} size={dimensions.screenWidth * 0.055} />
          <Spacer width={dimensions.screenWidth * 0.025} />
          <Text style={bs.itemTitle}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainContPaw>
      <View style={styles.topContainer}>
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
            <TouchableOpacity onPress={openSheet}>
              <Ionicons
                name="menu"
                size={dimensions.screenWidth * 0.07}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicContainer}>
            <View style={styles.profilePic}>
              {
                session?.user.user_metadata['avatar_url'] ? (
                  <Image source={require("../../assets/images/general/pet-enjoy.png")} style={styles.profilePic} />
                ) : (
                  <Ionicons name="person" style={{ alignSelf: 'center', alignContent: 'center', color: 'white' }} size={dimensions.screenWidth * 0.12} />
                )
              }
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{session?.user.user_metadata['first_name'] + ' ' + session?.user.user_metadata['last_name']}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => router.push('../profile/edit_profile')}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
              <Icon name="edit" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewPetsButton} onPress={() => router.push('../pets/pets')}>
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
      </View>
      <View style={styles.aboutContainer}>
        <View style={styles.aboutHeader}>
          <Text style={[styles.aboutTitle, { fontFamily: 'Poppins-SemiBold' }]}>About Me</Text>
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
      <Portal>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          handleComponent={null}
          backgroundStyle={{ backgroundColor: "transparent" }}
          backdropComponent={backDrop}
          onChange={handleSheetChange}
        >
          <BottomSheetView style={bs.mainCont}>
            <SheetItem 
              icon="settings-outline" 
              title="Settings and Privacy" 
              toRoute="../profile/settings"
            />
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </MainContPaw>
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
    flex: 1
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
});

const bs = StyleSheet.create({
  mainCont: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  itemCont: {
    // backgroundColor: 'red',
    paddingVertical: dimensions.screenHeight * 0.025,
    borderBottomColor: '#bbb',
    borderBottomWidth: .2,
    marginHorizontal: dimensions.screenWidth * 0.05,
    paddingHorizontal: dimensions.screenWidth * 0.01,
    flexDirection: 'row'
  },
  itemTitle: {
    fontSize: dimensions.screenWidth * 0.042,
    fontFamily: 'Poppins-Medium'
  }
});
