import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { petsStyles } from "./components/petsStyles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import MainContPaw from "../../components/general/background_paw";
import AppbarDefault from "../../components/bars/appbar_default";
import dimensions from "../../utils/sizing";
import { useSession } from "../../context/sessions_context";
import CustomTextInput from "../../components/inputs/custom_text_input1";
import PlainTextInput from "../../components/inputs/custom_text_input2";
import DogIcon from "../../components/svgs/signUp/DogIcon";
import CatIcon from "../../components/svgs/signUp/CatIcon";
import HorizontalButtonList from "../../components/list/horizontal_button_list";

interface AddPetProps {
  back: () => void;
}

type PetType = "Dog" | "Cat";
type PetGender = "Male" | "Female";

const AddPet = (addPet: AddPetProps) => {
  // Form states
  const { session } = useSession();
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState<PetType>("Dog");
  const [petGender, setPetGender] = useState<PetGender>("Male");
  const [petBirthday, setPetBirthday] = useState("");
  const [petBio, setPetBio] = useState("");

  const [activePetType, setActivePetType] = useState<number | string>("dog");
  const [activePetGender, setActivePetGender] = useState<number | string>("dog");

  const handleAddPet = () => {};

  const petTypes = [
    {
      id: "dog",
      title: "Dog",
      icon: DogIcon,
    },
    {
      id: "cat",
      title: "Cat",
      icon: CatIcon,
    },
  ];

  const petGenders = [
    {
      id: "male",
      title: "Male",
    },
    {
      id: "female",
      title: "Female",
    },
  ];

  return (
    <View style={petsStyles.addPetContainer}>
      <View style={{ zIndex: 1 }}>
        <AppbarDefault
          title="Add a Pet"
          session={session}
          showLeading={false}
          leadingChildren={null}
          leadFunction={() => {
            console.log("Close");
            addPet.back();
          }}
          titleSize={dimensions.screenWidth * 0.045}
        />
      </View>

      <MainContPaw>
        {/* Photo Upload */}
        <View style={styles.photoUploadContainer}>
          <View style={{ position: "relative" }}>
            <View style={styles.circleAdd}>
              <View style={styles.photoPlaceholder}>
                <Ionicons name="image-outline" size={40} color="#aaa" />
              </View>
              <Text style={styles.photoPlaceholderText}>
                {"Attach a Photo\nof your pet"}
              </Text>

              <TouchableOpacity style={styles.cameraIcon}>
                <Ionicons
                  name="camera"
                  size={dimensions.screenWidth * 0.055}
                  color="#777"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Pet Name */}
        <View style={styles.formGroup}>
          <Text style={petsStyles.formLabel}>Pet Name</Text>
          <PlainTextInput
            value={petName}
            onChangeText={setPetName}
            placeholder="Enter your pet's name"
            keyboardType="default"
            backgroundColor="white"
            height={dimensions.screenHeight * 0.065}
            marginBottom={dimensions.screenHeight * 0.0}
          />
        </View>

        {/* Pet Type */}
        <View>
          <View style={[styles.formGroup]}>
            <Text style={petsStyles.formLabel}>Pet Type</Text>
          </View>
          <HorizontalButtonList
            services={petTypes}
            activeService={activePetType}
            setActiveService={(id) => {
              setActivePetType(id);
            }}
            marginLeft={dimensions.screenWidth * 0.05}
            marginTop={0}
            paddingHorizontal={dimensions.screenWidth * 0.06}
          />
        </View>

        {/* Pet Gender */}
        <View>
          <View style={[styles.formGroup]}>
            <Text style={petsStyles.formLabel}>Pet Gender</Text>
          </View>
          <HorizontalButtonList
            services={petGenders}
            activeService={activePetGender}
            setActiveService={(id) => {
              setActivePetGender(id);
            }}
            activeColor="#466AA2"
            marginLeft={dimensions.screenWidth * 0.05}
            marginTop={0}
            paddingHorizontal={dimensions.screenWidth * 0.06}
          />
        </View>

        {/* Pet Birthday */}
        <View style={styles.formGroup}>
          <Text style={petsStyles.formLabel}>Pet's Birthday (Optional)</Text>
          <TouchableOpacity style={petsStyles.textInput}>
            <Text style={{ color: petBirthday ? "#000" : "#999" }}>
              {petBirthday || "Select your Pet's Birthday"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pet Bio */}
        <View style={styles.formGroup}>
          <Text style={petsStyles.formLabel}>Pet's Bio</Text>
          <TextInput
            style={[
              petsStyles.textInput,
              { height: 100, textAlignVertical: "top" },
            ]}
            placeholder="Tell us about your pet..."
            value={petBio}
            onChangeText={setPetBio}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        {/* Create Button */}
        <TouchableOpacity
          style={petsStyles.createButton}
          onPress={handleAddPet}
        >
          <Text style={petsStyles.createButtonText}>Create This Pet</Text>
        </TouchableOpacity>
      </MainContPaw>
    </View>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  photoUploadContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: dimensions.screenHeight * 0.02,
  },
  circleAdd: {
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    width: dimensions.screenWidth * 0.35,
    height: dimensions.screenWidth * 0.35,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#D1D1D1",
    borderWidth: 1.2,
  },
  photoPlaceholder: {},
  photoPlaceholderText: {
    textAlign: "center",
    color: "#A0A0A0",
    fontFamily: "Poppins-Regular",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: dimensions.screenSize * 0.005,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  formGroup: {
    marginHorizontal: dimensions.screenWidth * 0.05,
    marginTop: dimensions.screenHeight * 0.03,
  },
});
