import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import MainContPaw from "../../components/general/background_paw";
import { petsStyles } from "./components/petsStyles";
import supabase from "../../utils/supabase";
import React, { useState } from "react";
import dimensions from "../../utils/sizing";
import HorizontalButtonList from "../../components/list/horizontal_button_list";
import DogIcon from "../../components/svgs/signUp/DogIcon";
import CatIcon from "../../components/svgs/signUp/CatIcon";
import { usePet } from "../../context/pet_context";
import Pets from "../../interfaces/pets";
import SvgValue from "../../hooks/fetchSvg";

type PetType = "Dog" | "Cat";
type PetGender = "Male" | "Female";

const PetsMain = () => {
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showPetDetailsModal, setShowPetDetailsModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pets | null>(null);
  const [activeService, setActiveService] = useState<number | string>("all");

  // Form states
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState<PetType>("Dog");
  const [petGender, setPetGender] = useState<PetGender>("Male");
  const [petBirthday, setPetBirthday] = useState("");
  const [petBio, setPetBio] = useState("");
  const { pets, fetchPets, addToPetContext, updatePetContext } = usePet();

  const filteredPets =
    activeService === "all"
      ? pets
      : pets.filter((pet) => pet.pet_type.toLowerCase() === activeService);

  const handleAddPet = () => {
    console.log("Adding pet:", {
      petName,
      petType,
      petGender,
      petBirthday,
      petBio,
    });

    setPetName("");
    setPetType("Dog");
    setPetGender("Male");
    setPetBirthday("");
    setPetBio("");

    setShowAddPetModal(false);
  };

  const handlePetPress = (pet: Pets) => {
    setSelectedPet(pet);
    setShowPetDetailsModal(true);
  };

  const renderPetItem = ({ item, index }: { item: Pets, index: number }) => (
    <TouchableOpacity
      style={petsStyles.petItem}
      onPress={() => handlePetPress(item)}
    >
      <View
        style={{
          position: "relative",
          width: dimensions.screenWidth * 0.18,
          // backgroundColor: "red",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: dimensions.screenWidth * 0.16,
          marginRight: dimensions.screenWidth * 0.03,
        }}
      >
        {item.pet_avatar ? (
          <Image
            source={{ uri: item.pet_avatar }}
            style={petsStyles.petImage}
          />
        ) : (
          <View
            style={[
              petsStyles.petImage,
              {
                backgroundColor: "#D1D1D1",
                marginBottom:
                  index != pets.length - 1
                    ? dimensions.screenHeight * 0.01
                    : dimensions.screenHeight * 0.015,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
            ]}
          >
            <SvgValue
              svgIcon={item.pet_type == 'Dog' ? "dog" : "cat"}
              color="#fff"
              width={dimensions.screenWidth * 0.07}
              height={dimensions.screenWidth * 0.07}
            />
          </View>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={[
              petsStyles.genderTag,
              {
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                gap: dimensions.screenWidth * 0.01,
              },
              item.gender === "Male"
                ? petsStyles.maleTag
                : petsStyles.femaleTag,
            ]}
          >
            <Ionicons
              name={item.gender == "Male" ? "male" : "female"}
              size={dimensions.screenWidth * 0.03}
              color="#fff"
            />
            <Text style={petsStyles.genderText}>{item.gender}</Text>
          </View>
        </View>
      </View>
      <View style={petsStyles.petInfo}>
        <Text style={petsStyles.petName}>{item.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5
            name={item.pet_type.toLowerCase() === "dog" ? "dog" : "cat"}
            size={12}
            color="#777"
          />
          <Text style={petsStyles.petType}> {item.pet_type}</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#466AA2",
          alignItems: "center",
          display: "flex",
          paddingVertical: dimensions.screenHeight * 0.025,
          alignContent: "center",
          borderRadius: 30,
        }}
      >
        <MaterialIcons
          name="chevron-right"
          size={24}
          color="#fff"
          style={petsStyles.chevron}
        />
      </View>
    </TouchableOpacity>
  );

  const servicesFromSubcategories = [
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

  const servicesWithAll = [
    { id: "all", title: "All" },
    ...servicesFromSubcategories,
  ];

  const mainContent = (
    <View style={petsStyles.container}>
      {/* Filter Buttons */}
      <View style={petsStyles.filterContainer}>
        <HorizontalButtonList
          services={servicesWithAll}
          activeService={activeService}
          setActiveService={(id) => {
            setActiveService(id);
            // fetchMoreProducts(true, id);
          }}
          paddingHorizontal={dimensions.screenWidth * 0.06}
        />
      </View>

      <View style={{ paddingBottom: 120 }}>
        {filteredPets.map((item, index) => (
          <View key={item.id}>{renderPetItem({ item, index })}</View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{
      height: '100%',
      backgroundColor: 'red',
      width: '100%',
      position: 'relative'
    }}>
      <MainContPaw>{mainContent}</MainContPaw>

      {/* Add Pet Modal */}
      <Modal
        visible={showAddPetModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowAddPetModal(false)}
      >
        <SafeAreaView style={petsStyles.addPetContainer}>
          <View style={petsStyles.header}>
            <TouchableOpacity onPress={() => setShowAddPetModal(false)}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={petsStyles.headerTitle}>Add a Pet</Text>
          </View>

          <ScrollView>
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
                      backgroundColor:
                        petType === "Dog" ? "#4a7fff" : "#f1f1f1",
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
                      backgroundColor:
                        petType === "Cat" ? "#4a7fff" : "#f1f1f1",
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
                      backgroundColor:
                        petGender === "Male" ? "#007bff" : "#f1f1f1",
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
                  <Text
                    style={{ color: petGender === "Male" ? "#fff" : "#777" }}
                  >
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
                  <Text
                    style={{ color: petGender === "Female" ? "#fff" : "#777" }}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Pet Birthday */}
            <View style={petsStyles.formGroup}>
              <Text style={petsStyles.formLabel}>
                Pet's Birthday (Optional)
              </Text>
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
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Pet Details Modal */}
      <Modal
        visible={showPetDetailsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPetDetailsModal(false)}
      >
        {selectedPet && (
          <View style={styles.petDetailsModalContainer}>
            <View style={styles.petDetailsModalContent}>
              <View style={styles.petDetailsHeader}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowPetDetailsModal(false)}
                >
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.petProfileSection}>
                <View style={styles.petImageContainer}>
                  <Image
                    source={{ uri: selectedPet.pet_avatar }}
                    style={styles.petDetailImage}
                  />
                </View>
                <Text style={styles.petDetailName}>{selectedPet.name}</Text>
                <View style={styles.petDetailTags}>
                  <View
                    style={[
                      styles.petDetailTag,
                      { backgroundColor: "#4a7fff" },
                    ]}
                  >
                    <FontAwesome5
                      name={
                        selectedPet.pet_type.toLowerCase() === "dog"
                          ? "dog"
                          : "cat"
                      }
                      size={12}
                      color="#fff"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={styles.petDetailTagText}>
                      {selectedPet.pet_type}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.petDetailTag,
                      selectedPet.gender === "Male"
                        ? styles.maleTagDetail
                        : styles.femaleTagDetail,
                    ]}
                  >
                    <Ionicons
                      name={
                        selectedPet.gender.toLowerCase() === "male"
                          ? "male"
                          : "female"
                      }
                      size={12}
                      color="#fff"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={styles.petDetailTagText}>
                      {selectedPet.gender}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.petInfoSection}>
                {selectedPet.birthday && (
                  <View style={styles.petInfoItem}>
                    <Ionicons name="calendar-outline" size={20} color="#666" />
                    <View style={styles.petInfoTextContainer}>
                      <Text style={styles.petInfoLabel}>Birthday</Text>
                      <Text style={styles.petInfoValue}>
                        {/* {selectedPet.birthday ?? ''} */}
                      </Text>
                    </View>
                  </View>
                )}

                {selectedPet.bio && (
                  <View style={styles.petInfoItem}>
                    <Ionicons
                      name="information-circle-outline"
                      size={20}
                      color="#666"
                    />
                    <View style={styles.petInfoTextContainer}>
                      <Text style={styles.petInfoLabel}>Bio</Text>
                      <Text style={styles.petInfoValue}>{selectedPet.bio}</Text>
                    </View>
                  </View>
                )}
              </View>

              <TouchableOpacity style={styles.editPetButton}>
                <Text style={styles.editPetButtonText}>Edit Pet Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>


      <TouchableOpacity
        style={[petsStyles.addButton,
          {
            position: 'absolute',
            bottom: dimensions.screenHeight * 0.2,
            left: dimensions.screenWidth * 0.07,
            right: dimensions.screenWidth * 0.07,
            backgroundColor: '#466AA2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: dimensions.screenHeight * 0.018,
            borderRadius: 15,
            flexDirection: 'row'
          }
        ]}
        onPress={() => setShowAddPetModal(true)}
      >
        <Text style={[petsStyles.addButtonText,
          {
            fontFamily: 'Poppins-SemiBold',
            fontSize: dimensions.screenWidth * 0.043,
            marginRight: dimensions.screenWidth * 0.02
          }
        ]}>Add a Pet</Text>
        <Ionicons 
          name="paw"
          color="#fff"
          size={dimensions.screenWidth * 0.04}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  petDetailsModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  petDetailsModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    maxHeight: "90%",
  },
  petDetailsHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  closeButton: {
    padding: 5,
  },
  petProfileSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  petImageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 75,
    backgroundColor: "#fff",
    padding: 2,
  },
  petDetailImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  petDetailName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },
  petDetailTags: {
    flexDirection: "row",
    marginTop: 10,
  },
  petDetailTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  maleTagDetail: {
    backgroundColor: "#007bff",
  },
  femaleTagDetail: {
    backgroundColor: "#ff6b6b",
  },
  petDetailTagText: {
    color: "#fff",
    fontSize: 14,
  },
  petInfoSection: {
    marginTop: 20,
  },
  petInfoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  petInfoTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  petInfoLabel: {
    fontSize: 14,
    color: "#666",
  },
  petInfoValue: {
    fontSize: 16,
    marginTop: 3,
  },
  editPetButton: {
    backgroundColor: "#4a7fff",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  editPetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PetsMain;
