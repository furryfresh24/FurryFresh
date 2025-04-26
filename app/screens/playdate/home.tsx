import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import dimensions from '../../utils/sizing';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import Pets from '../../interfaces/pets';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal, PortalProvider } from '@gorhom/portal';
import { usePet } from '../../context/pet_context';
import { FlatList } from 'react-native-gesture-handler';
import { petsStyles } from '../pets/components/petsStyles';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import SvgValue from '../../hooks/fetchSvg';
import supabase from '../../utils/supabase';
import { useSession } from '../../context/sessions_context';
import TinderCard from 'react-tinder-card';
import { GestureHandlerRootView, GestureDetector, Gesture, PanGestureHandler } from 'react-native-gesture-handler';

const screenWidth = dimensions.screenWidth;
const screenHeight = dimensions.screenHeight;

const Home = () => {
  const alreadyRemoved: string[] = [];
  const router = useRouter();
  const { session } = useSession();
  const { pets } = usePet();
  const [isStartUp, setStartUp] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedPets, setFetchedPets] = useState<Pets[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pets | null>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);
  const snapPoints = useMemo(() => ["50%"], []);
  const childRefs = useMemo(
    () =>
      Array(fetchedPets.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    [fetchedPets]
  );

  const swiped = (direction: string, idToDelete: string) => {
    console.log('removing: ' + idToDelete + ' to the ' + direction)
  };

  const swipe = async (dir: 'left' | 'right') => {
    const cardsLeft = fetchedPets.filter((pet) => !alreadyRemoved.includes(pet.id));
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id;
      const index = fetchedPets.map(pet => pet.id).indexOf(toBeRemoved);
      alreadyRemoved.push(toBeRemoved);
      await childRefs[index]?.current?.swipe(dir);
    }
  };

  const openSheet = () => sheetRef.current?.expand();

  const filterMyPetsData = () => {
    const val = pets.filter((pet) => pet.is_playdate_allowed);
    return val;
  };

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

  const handlePress = () => router.push('../../screens/(tabs)/home');
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    if (!isStartUp) {
      setStartUp(true);
      const fetchPets = async () => {
        const { data, error } = await supabase
          .from('pets')
          .select()
          .eq('is_playdate_allowed', true)
          .neq('user_id', session?.user.id);
        if (data) {
          setFetchedPets(data as Pets[]);
        }
        if (error) {
          console.error(error);
        }
      };
      fetchPets();
    }
  }, []);

  useEffect(() => {
    if (selectedPet === null) {
      setTimeout(function () {
        openSheet();
      }, 500);
    }
  }, []);

  return (
    <PortalProvider>
      <View style={styles.container}>
        <View style={styles.topLeftWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles.coloredBox} onPress={handlePress}>
              <Image
                source={require('../../assets/images/others/home.png')}
                style={styles.homeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.backText}>Back to Home</Text>
              <Text style={styles.pageText}>Page</Text>
            </View>
          </View>
          <View>
            <Image 
              source={{ uri: selectedPet?.pet_avatar }}
              style={{ 
                width: dimensions.screenWidth * 0.14, 
                height: dimensions.screenWidth * 0.14, 
                borderRadius: 100,
                borderColor: 'white',
                borderWidth: 2
              }}
            />
          </View>
        </View>

        <View style={styles.titleWrapper}>
          <Text style={[styles.title, styles.blueText]}>FIND YOUR PLAY </Text>
          <Text style={[styles.title, styles.orangeText]}>DATE</Text>
        </View>

        <View style={styles.line} />

        {fetchedPets.map((pet, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={pet.id}
            onSwipe={(dir) => swiped(dir, pet.id)}
            onCardLeftScreen={() => { }}
            preventSwipe={['up', 'down']}
          >
            <View key={index} style={[styles.whiteContainer]}>
              <Image
                source={{ uri: pet.pet_avatar }}
                style={styles.petImage}
                resizeMode="contain"
              />
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.containerTitle}>{pet.name}</Text>
                  <Text style={styles.containerSubtitle}>{pet.breed}</Text>
                </View>
                <Image
                  source={
                    pet.gender.toLowerCase() == 'male'
                      ? require('../../assets/images/others/male.png')
                      : require('../../assets/images/others/female.png')
                  }
                  style={styles.genderIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TinderCard>
        ))}

        <View style={styles.detailsContainer}>
          <View style={styles.detailsContent}>
            <Image
              source={require('../../assets/images/others/i.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailsText}>PlayDate Details</Text>
          </View>
        </View>

        <View style={styles.containerRow}>
          <TouchableOpacity style={styles.skipContainer} onPress={() => swipe('left')}>
            <Image
              source={require('../../assets/images/others/skip.png')}
              style={styles.skipImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkContainer} onPress={() => swipe('right')}>
            <Image
              source={require('../../assets/images/others/check.png')}
              style={styles.checkImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
            <View style={bs.header}>
              <Text style={bs.headTitle}>Select a Pet that you want to use</Text>
            </View>
            <FlatList
              data={filterMyPetsData()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.petItemCont}
                  onPress={() => {
                    setSelectedPet(item);
                    sheetRef.current?.close();
                  }}
                >
                  <View style={{
                    position: "relative",
                    width: dimensions.screenWidth * 0.18,
                    alignItems: "center",
                    justifyContent: "center",
                    height: dimensions.screenWidth * 0.16,
                    marginRight: dimensions.screenWidth * 0.03,
                  }}>
                    {item.pet_avatar ? (
                      <Image source={{ uri: item.pet_avatar }} style={petsStyles.petImage} />
                    ) : (
                      <View style={[petsStyles.petImage, {
                        backgroundColor: "#D1D1D1",
                        alignItems: 'center',
                        justifyContent: 'center'
                      }]}>
                        <SvgValue
                          svgIcon={item.pet_type == 'Dog' ? "dog" : "cat"}
                          color="#fff"
                          width={dimensions.screenWidth * 0.07}
                          height={dimensions.screenWidth * 0.07}
                        />
                      </View>
                    )}
                    <View style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      alignItems: "center",
                    }}>
                      <View style={[
                        petsStyles.genderTag,
                        item.gender === "Male" ? petsStyles.maleTag : petsStyles.femaleTag,
                        { flexDirection: "row", gap: dimensions.screenWidth * 0.01 }
                      ]}>
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
                </TouchableOpacity>
              )}
            />
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </PortalProvider>
  );
};


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0DFF4',
    paddingTop: 60,
    paddingHorizontal: 20,
    position: 'relative',
  },
  petItemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedPetItemCont: {
    borderColor: '#466AA2',
    borderWidth: 2,
    backgroundColor: '#ebf0f7'
  },
  topLeftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  coloredBox: {
    width: 55,
    height: 55,
    backgroundColor: '#466AA2',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: 28,
    height: 28,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  backText: {
    color: '#121F63',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  pageText: {
    color: '#121F63',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: -3,
  },
  titleWrapper: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: dimensions.screenWidth * 0.07,
    fontFamily: 'Baloo-Regular',
    textAlign: 'center',
  },
  blueText: { color: '#121F63' },
  orangeText: { color: '#E94C30' },
  line: {
    marginTop: 10,
    width: '27%',
    height: 8,
    backgroundColor: '#121F63',
    alignSelf: 'center',
  },
  whiteContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 30,
    width: '73%',
    height: dimensions.screenHeight * 0.36,
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    position: 'absolute',
    paddingVertical: dimensions.screenHeight * 0.02,
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  petImage: {
    width: dimensions.screenHeight * 0.23,
    height: dimensions.screenHeight * 0.23,
    borderRadius: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
  },
  containerTitle: {
    fontSize: 20,
    color: '#121F63',
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  containerSubtitle: {
    fontSize: 13,
    color: '#828282',
    fontFamily: 'Poppins-Regular',
    marginTop: -5,
  },
  genderIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  detailsContainer: {
    backgroundColor: '#466AA2',
    borderRadius: 30,
    marginTop: dimensions.screenHeight * 0.45,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 25,
  },
  detailsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  detailsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  skipContainer: {
    backgroundColor: '#DA8474',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 78,
    height: 78,
    marginRight: 15,
  },
  checkContainer: {
    backgroundColor: '#96AFD5',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 78,
    height: 78,
  },
  skipImage: {
    width: 28,
    height: 28,
  },
  checkImage: {
    width: 37,
    height: 37,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalLogo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#121F63',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#466AA2',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  modalButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
});

const bs = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    position: "relative",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  header: {
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.02
  },
  headTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: dimensions.screenWidth * 0.04,
  }
});
