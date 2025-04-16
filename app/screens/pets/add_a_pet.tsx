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

  const handleAddPet = () => {};

  return (
    <View style={petsStyles.addPetContainer}>
      <View style={{ zIndex: 1 }}>
        <AppbarDefault
          title="Add Pet"
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
        <View style={petsStyles.photoUploadContainer}>
          <View style={petsStyles.photoPlaceholder}>
            <Ionicons name="image-outline" size={40} color="#aaa" />
          </View>
          <Text style={petsStyles.photoPlaceholderText}>
            Attach a Photo of your pet
          </Text>
          <TouchableOpacity style={petsStyles.cameraIcon}>
            <Ionicons name="camera" size={18} color="#777" />
          </TouchableOpacity>
        </View>

        {/* Pet Name */}
        <View style={petsStyles.formGroup}>
          <Text style={petsStyles.formLabel}>Pet's Name</Text>
          <TextInput
            style={petsStyles.textInput}
            placeholder="Your pet's name"
            value={petName}
            onChangeText={setPetName}
          />
        </View>

        {/* Pet Type */}
        <View style={petsStyles.formGroup}>
          <Text style={petsStyles.formLabel}>Pet Type</Text>
          <View style={petsStyles.pickerRow}>
            <TouchableOpacity
              style={[
                petsStyles.optionButton,
                {
                  backgroundColor: petType === "Dog" ? "#4a7fff" : "#f1f1f1",
                },
              ]}
              onPress={() => setPetType("Dog")}
            >
              <FontAwesome5
                name="dog"
                size={16}
                color={petType === "Dog" ? "#fff" : "#777"}
                style={petsStyles.optionIcon}
              />
              <Text style={{ color: petType === "Dog" ? "#fff" : "#777" }}>
                Dog
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                petsStyles.optionButton,
                {
                  backgroundColor: petType === "Cat" ? "#4a7fff" : "#f1f1f1",
                },
              ]}
              onPress={() => setPetType("Cat")}
            >
              <FontAwesome5
                name="cat"
                size={16}
                color={petType === "Cat" ? "#fff" : "#777"}
                style={petsStyles.optionIcon}
              />
              <Text style={{ color: petType === "Cat" ? "#fff" : "#777" }}>
                Cat
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pet Gender */}
        <View style={petsStyles.formGroup}>
          <Text style={petsStyles.formLabel}>Pet Gender</Text>
          <View style={petsStyles.pickerRow}>
            <TouchableOpacity
              style={[
                petsStyles.optionButton,
                {
                  backgroundColor: petGender === "Male" ? "#007bff" : "#f1f1f1",
                },
              ]}
              onPress={() => setPetGender("Male")}
            >
              <Ionicons
                name="male"
                size={16}
                color={petGender === "Male" ? "#fff" : "#777"}
                style={petsStyles.optionIcon}
              />
              <Text style={{ color: petGender === "Male" ? "#fff" : "#777" }}>
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                petsStyles.optionButton,
                {
                  backgroundColor:
                    petGender === "Female" ? "#ff6b6b" : "#f1f1f1",
                },
              ]}
              onPress={() => setPetGender("Female")}
            >
              <Ionicons
                name="female"
                size={16}
                color={petGender === "Female" ? "#fff" : "#777"}
                style={petsStyles.optionIcon}
              />
              <Text style={{ color: petGender === "Female" ? "#fff" : "#777" }}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pet Birthday */}
        <View style={petsStyles.formGroup}>
          <Text style={petsStyles.formLabel}>Pet's Birthday (Optional)</Text>
          <TouchableOpacity style={petsStyles.textInput}>
            <Text style={{ color: petBirthday ? "#000" : "#999" }}>
              {petBirthday || "Select your Pet's Birthday"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pet Bio */}
        <View style={petsStyles.formGroup}>
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

const styles = StyleSheet.create({});
