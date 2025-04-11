import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Ionicons } from "@expo/vector-icons";
import MainContPlain from "../../components/general/background_plain";
import dimensions from "../../utils/sizing";
import { router } from "expo-router";
import supabase from "../../utils/supabase";
import { Session } from "@supabase/supabase-js";
import PetCareIcon from "../../components/svgs/home/PetCareIcon";
import PetSuppliesIcon from "../../components/svgs/home/PetSuppliesIcon";
import type { Voucher } from "../../interfaces/voucher";
import VoucherTemp1 from "../../components/vouchers/voucher1";
import Button1 from "../../components/buttons/button1";
import Category from "../../interfaces/categories";
import Title1 from "../../components/texts/title1";
import { Icon, ListItem } from "@rneui/themed";
import DefaultListIcon from "../../components/svgs/home/services/DefaultListIcon";
import Subcategories from "../../interfaces/subcategories";
import Price from "../../components/general/price";
import SvgValue from "../../hooks/fetchSvg";
import HorizontalButtonList from "../../components/list/horizontal_button_list";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import MainContCircle from "../../components/general/background_circle";
import { LinearGradient } from "expo-linear-gradient";
import Subtitle1 from "../../components/texts/subtitle1";
import { Grooming, Inclusion } from "../../interfaces/grooming";

type Service = {
  id: number;
  title: string;
  icon: any;
};

const services = [
  {
    id: 1,
    title: "Pet Care",
    icon: PetCareIcon,
  },
  {
    id: 2,
    title: "Pet Supplies",
    icon: PetSuppliesIcon,
  },
];

const vouchers: Voucher[] = [
  {
    id: "voucher1",
    title: "20% First Pet Care Service",
    description: "Enjoy 20% off on your pet's first grooming session.",
    discountValue: 10,
    discountType: "percentage",
    forFirstTime: true,
    code: "GROOM10",
    isActive: true,
    usageLimit: 1,
    minOrderValue: 20,
    applicableCategories: ["Grooming"],
  },
];

const Home = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGrooming, setSelectedGrooming] = useState<Subcategories>();
  const snapPoints = useMemo(() => ["95%"], []);
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

  const [categories, setCategories] = useState<Category[]>([]);
  const [grooming, setGroomings] = useState<Grooming[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategories[]>([]);
  const [activeService, setActiveService] = useState<number | string>(1);

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const fetchCategories = async (): Promise<void> => {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }

    const parsed = data?.map((item) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
    })) as Category[];

    // console.log(parsed.length);

    setCategories(parsed);
  };

  const fetchSubcategories = async (): Promise<void> => {
    const { data, error } = await supabase.from("subcategories").select("*");

    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }

    const parsed = data?.map((item) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
    })) as Subcategories[];

    // console.log(parsed);

    setSubcategories(parsed);
  };

  const basic = [
    {
      title: "Bath & Blow Dry",
      svg: "",
    },
    {
      title: "Hair Trimming",
      svg: "",
    },
  ];

  const fetchGroomings = async (): Promise<void> => {
    const { data, error } = await supabase.from("groomings").select("*");

    if (error) {
      console.error("Error fetching groomings: ", error);
      return;
    }

    const parsed = data?.map((item) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
      inclusions: item.inclusions as Inclusion[],
    })) as Grooming[];

    console.log(parsed[0].inclusions[0].title);
    setGroomings(parsed);
  };

  const handleSheetChange = (index: number) => {
    if (index === 0) {
      sheetRef.current?.close();
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchGroomings();
  }, []);

  return (
    <MainContPlain paddingHorizontal={0}>
      {homeOptions.header(session)}
      <View style={{ paddingHorizontal: dimensions.screenWidth * 0.02 }}>
        <View style={styles.search}>
          <Ionicons
            name="search"
            style={{
              marginRight: dimensions.screenWidth * 0.04,
            }}
            size={dimensions.screenWidth * 0.05}
            color="#808080"
          />
          <Text style={styles.searchText}>Search something here</Text>
        </View>
        <View>
          <HorizontalButtonList
            services={services}
            activeService={activeService}
            setActiveService={setActiveService}
          />
        </View>
        <View>
          <VoucherTemp1 voucher={vouchers[0]} />
          <View style={{ marginTop: dimensions.screenHeight * 0.025 }}>
            <FlatList
              data={categories.filter((cat) =>
                activeService === 1
                  ? cat.category === "PetCare"
                  : cat.category === "PetSupplies"
              )}
              scrollEnabled={false}
              keyExtractor={(catItem) => catItem.id}
              renderItem={({ item: catItem, index: catIndex }) => (
                <View style={[styles.listCont]}>
                  <Title1 style={styles.catTitle} text={catItem.title} />
                  <FlatList
                    data={subcategories.filter(
                      (subcat) => subcat.category_id == catItem.id
                    )}
                    keyExtractor={(subcatItem) => subcatItem.id}
                    scrollEnabled={false}
                    renderItem={({ item: subcatItem, index: subcatIndex }) => {
                      const icon = subcatItem.svg_icon ? (
                        <SvgValue
                          svgIcon={subcatItem.svg_icon}
                          color="#fff"
                          width={dimensions.screenWidth * 0.11}
                          height={dimensions.screenWidth * 0.11}
                        />
                      ) : null;

                      return (
                        <TouchableOpacity
                          onPress={() => {
                            if (catItem.category == "PetSupplies") {
                              router.push({
                                pathname: "../shop/shop",
                                params: {
                                  title: subcatItem.title,
                                  id: subcatItem.id,
                                },
                              });
                            } else {
                              setSelectedGrooming(subcatItem);
                              openSheet();
                            }
                          }}
                        >
                          <View
                            style={[
                              styles.listItem,
                              {
                                marginTop:
                                  subcatIndex == 0
                                    ? dimensions.screenHeight * 0.02
                                    : 0,
                              },
                            ]}
                          >
                            <View style={styles.listSvgIconBG}>
                              {!icon ? (
                                <DefaultListIcon
                                  color="#fff"
                                  width={dimensions.screenWidth * 0.11}
                                  height={dimensions.screenWidth * 0.11}
                                  props
                                />
                              ) : (
                                icon
                              )}
                            </View>
                            <View style={styles.listItemDetails}>
                              <Text style={styles.l1title}>
                                {subcatItem.title}
                              </Text>
                              <Text style={styles.l1description}>
                                {subcatItem.description}
                              </Text>
                            </View>
                            {subcatItem.price ? (
                              <View style={{ height: "100%" }}>
                                <View
                                  style={{
                                    backgroundColor: "#ED7964",
                                    paddingVertical:
                                      dimensions.screenHeight * 0.001,
                                    paddingHorizontal:
                                      dimensions.screenWidth * 0.02,
                                    borderRadius: 10,
                                    marginTop: dimensions.screenHeight * 0.01,
                                  }}
                                >
                                  {subcatItem.price ? (
                                    <Price
                                      value={subcatItem.price ?? 0.0}
                                      color="#fff"
                                      fontFamily="Poppins-SemiBold"
                                      fontSize={dimensions.screenWidth * 0.03}
                                      lineHeight={
                                        dimensions.screenWidth * 0.045
                                      }
                                      currencySize={
                                        dimensions.screenWidth * 0.03
                                      }
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </View>
                              </View>
                            ) : (
                              <></>
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}
            />
          </View>

          <Button1
            title="Force Logout"
            isPrimary={true}
            onPress={async () => {
              await supabase.auth.signOut();
              router.replace("../auth/sign_in");
            }}
          />
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
          <BottomSheetView style={styles.bottomSheet}>
            <LinearGradient
              colors={["transparent", "#466AA2"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.circle, styles.topRightCircle]}
            />

            <LinearGradient
              colors={["transparent", "#466AA2"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.circle, styles.bottomLeftCircle]}
            />

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <View>
                <View style={styles.handleBarCont}>
                  <View style={styles.handleBar}></View>
                </View>
                <View style={styles.closeAndTitleBoxCont}>
                  <View style={styles.titleBox}>
                    <Title1
                      text={selectedGrooming?.title ?? ""}
                      style={{ fontFamily: "Poppins-Bold" }}
                    />
                    <Subtitle1
                      text={"Starts at ₱" + selectedGrooming?.price + ".00"}
                      style={{
                        color: "#ED7964",
                        fontSize: dimensions.screenWidth * 0.035,
                        fontFamily: "Poppins-SemiBold",
                        alignSelf: "flex-start",
                        textAlign: "left",
                        letterSpacing: 0.3,
                      }}
                    />
                  </View>
                  <TouchableOpacity onPress={() => sheetRef.current?.close()}>
                    <View style={styles.closeBox}>
                      <Ionicons
                        name="close"
                        color="#949494"
                        size={dimensions.screenWidth * 0.11}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.inclusions}>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: dimensions.screenWidth * 0.035,
                      color: "#808080",
                    }}
                  >
                    Inclusions for this package:
                  </Text>
                  <View style={styles.wrapContainer}>
                    {(
                      grooming.find(
                        (g) => g.subcategory_id == (selectedGrooming?.id ?? "")
                      )?.inclusions ?? []
                    ).map((item, index) => {
                      const title = item.title;
                      const icon = item.svg ? (
                        <SvgValue
                          svgIcon={item.svg}
                          color="#466AA2"
                          width={dimensions.screenWidth * 0.1}
                          height={dimensions.screenWidth * 0.1}
                        />
                      ) : null;

                      return (
                        <View key={(selectedGrooming?.id ?? '') + index} style={styles.inclusion}>
                          {icon}
                          <Text
                            style={{
                              fontFamily: "Poppins-SemiBold",
                              fontSize: dimensions.screenWidth * 0.033,
                              color: "#466AA2",
                              textAlign: "center",
                            }}
                          >
                            {title}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View
                  style={{
                    height: 0.8,
                    backgroundColor: "#DEE4F2",
                    marginHorizontal: dimensions.screenWidth * 0.16,
                  }}
                />
                <View style={styles.aboutPackageCont}>
                  <Subtitle1
                    text="About this Package"
                    color="#ED7964"
                    style={{
                      letterSpacing: 0.2,
                      fontFamily: "Poppins-SemiBold",
                    }}
                    fontSize={dimensions.screenWidth * 0.038}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Poppins-Regular",
                      fontSize: dimensions.screenWidth * 0.033,
                      marginHorizontal: dimensions.screenWidth * 0.08,
                      marginTop: dimensions.screenHeight * 0.015,
                      lineHeight: dimensions.screenWidth * 0.055,
                      color: "#808080",
                    }}
                  >
                    {
                      grooming.find(
                        (g) => g.subcategory_id == (selectedGrooming?.id ?? "")
                      )?.description
                    }
                  </Text>
                </View>
              </View>
              <View style={styles.bottomPartView}>
                <View
                  style={{
                    marginBottom: dimensions.screenHeight * 0.02,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    gap: 30,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#e2e7f3",
                      borderRadius: 10,
                      paddingHorizontal: dimensions.screenWidth * 0.02,
                      flex: 1,
                      paddingVertical: dimensions.screenHeight * 0.01,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#466AA2",
                        borderRadius: 100,
                        width: dimensions.screenWidth * 0.08,
                        height: dimensions.screenWidth * 0.08,
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        marginRight: dimensions.screenWidth * 0.02,
                      }}
                    >
                      <Ionicons
                        name="heart"
                        size={dimensions.screenWidth * 0.05}
                        color="white"
                      />
                    </View>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <Text
                        style={{
                          color: "#808080",
                          fontFamily: "Poppins-Regular",
                          fontSize: dimensions.screenWidth * 0.025,
                          lineHeight: dimensions.screenWidth * 0.04,
                        }}
                      >
                        Package Ratings
                      </Text>
                      <Text
                        style={{
                          color: "#808080",
                          fontFamily: "Poppins-SemiBold",
                          fontSize: dimensions.screenWidth * 0.04,
                          lineHeight: dimensions.screenWidth * 0.05,
                        }}
                      >
                        4.5
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#e2e7f3",
                      borderRadius: 10,
                      paddingHorizontal: dimensions.screenWidth * 0.02,
                      flex: 1,
                      paddingVertical: dimensions.screenHeight * 0.01,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#466AA2",
                        borderRadius: 100,
                        width: dimensions.screenWidth * 0.08,
                        height: dimensions.screenWidth * 0.08,
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        marginRight: dimensions.screenWidth * 0.02,
                      }}
                    >
                      <Ionicons
                        name="chatbox"
                        size={dimensions.screenWidth * 0.05}
                        color="white"
                      />
                    </View>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <Text
                        style={{
                          color: "#808080",
                          fontFamily: "Poppins-Regular",
                          fontSize: dimensions.screenWidth * 0.025,
                          lineHeight: dimensions.screenWidth * 0.04,
                        }}
                      >
                        Package Comments
                      </Text>
                      <Text
                        style={{
                          color: "#808080",
                          fontFamily: "Poppins-SemiBold",
                          fontSize: dimensions.screenWidth * 0.04,
                          lineHeight: dimensions.screenWidth * 0.05,
                        }}
                      >
                        56
                      </Text>
                    </View>
                  </View>
                </View>
                <Button1
                  isPrimary={false}
                  onPress={() => { router.push(
                    {
                      pathname: '../booking/booking_scheduling',
                      params: {
                        object: JSON.stringify(selectedGrooming)
                      }
                    }
                  ) }}
                  title={"Choose Package"}
                  borderRadius={16}
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </MainContPlain>
  );
};

export default Home;

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    position: "relative",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  bottomPartView: {
    paddingHorizontal: dimensions.screenWidth * 0.05,
    paddingBottom: dimensions.screenHeight * 0.05,
    paddingTop: dimensions.screenHeight * 0.03,
  },
  wrapContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: dimensions.screenHeight * 0.02,
    marginBottom: dimensions.screenHeight * 0.03,
    gap: 15,
  },
  handleBarCont: {
    position: "absolute",
    width: dimensions.screenWidth,
    top: 0,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeAndTitleBoxCont: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  inclusions: {
    marginTop: dimensions.screenHeight * 0.025,
    paddingHorizontal: dimensions.screenWidth * 0.05,
  },
  inclusion: {
    backgroundColor: "#e2e7f3",
    borderRadius: 20,
    width: dimensions.screenWidth * 0.25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: dimensions.screenWidth * 0.03,
    paddingVertical: dimensions.screenWidth * 0.03,
  },
  aboutPackageCont: {
    marginTop: dimensions.screenHeight * 0.026,
  },
  titleBox: {
    marginTop: dimensions.screenHeight * 0.05,
    marginLeft: dimensions.screenWidth * 0.045,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  closeBox: {
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E4E4E4",
    marginTop: dimensions.screenHeight * 0.035,
    marginRight: dimensions.screenWidth * 0.045,
    padding: dimensions.screenWidth * 0.025,
  },
  handleBar: {
    width: dimensions.screenWidth * 0.1,
    height: dimensions.screenHeight * 0.01,
    backgroundColor: "#D9D9D9",
    marginTop: dimensions.screenHeight * 0.02,
    borderRadius: 20,
  },
  circle: {
    position: "absolute",
    width: dimensions.screenWidth * 0.45,
    height: dimensions.screenWidth * 0.45,
    borderRadius: 1000,
    opacity: 0.5,
  },
  topRightCircle: {
    top: -dimensions.screenWidth * 0.23,
    right: -dimensions.screenWidth * 0.13,
    borderTopRightRadius: 30,
  },
  bottomLeftCircle: {
    bottom: -dimensions.screenWidth * 0.2,
    left: -dimensions.screenWidth * 0.15,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
  },
  profileImage: {
    width: dimensions.screenWidth * 0.12,
    height: dimensions.screenWidth * 0.12,
    backgroundColor: "#466AA2",
    marginRight: dimensions.screenWidth * 0.04,
    borderRadius: 100,
  },
  pets: {
    backgroundColor: "#fff",
    padding: dimensions.screenWidth * 0.02,
    borderRadius: 10,
    elevation: 5,
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: dimensions.screenHeight * 0.06,
    paddingBottom: dimensions.screenHeight * 0.014,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: dimensions.screenWidth * 0.03,
    lineHeight: dimensions.screenWidth * 0.04,
    fontFamily: "Poppins-Regular",
    padding: 0,
    opacity: 0.5,
    marginTop: dimensions.screenHeight * 0.005,
    margin: 0,
  },
  subtitle: {
    fontSize: dimensions.screenWidth * 0.05,
    fontFamily: "Poppins-SemiBold",
    lineHeight: dimensions.screenWidth * 0.06,
    padding: 0,
    margin: 0,
  },
  search: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: dimensions.screenWidth * 0.06,
    marginHorizontal: dimensions.screenWidth * 0.02,
    paddingVertical: dimensions.screenHeight * 0.021,
    marginTop: dimensions.screenHeight * 0.03,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
  },
  searchText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: dimensions.screenWidth * 0.035,
    color: "#808080",
  },
  button: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingVertical: dimensions.screenHeight * 0.01,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  buttonText: {
    color: "#808080",
    fontFamily: "Poppins-SemiBold",
    fontSize: dimensions.screenWidth * 0.035,
  },
  activeButton: {
    backgroundColor: "#ED7964",
  },
  activeButtonText: {
    color: "#fff",
  },
  listCont: {
    width: "100%",
    textAlign: "left",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingHorizontal: dimensions.screenWidth * 0.02,
  },
  catTitle: {
    alignSelf: "flex-start",
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: dimensions.screenWidth * 0.03,
    paddingVertical: dimensions.screenHeight * 0.01,
    marginBottom: dimensions.screenHeight * 0.02,
    borderRadius: 12,
    elevation: 7,
    alignItems: "center",
    width: "100%",
    alignSelf: "stretch",
  },
  listSvgIconBG: {
    backgroundColor: "#466AA2",
    borderRadius: 12,
    marginRight: dimensions.screenWidth * 0.03,
    padding: (dimensions.screenWidth + dimensions.screenHeight) * 0.008,
  },
  listItemDetails: {
    flexGrow: 1,
    width: "0%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: dimensions.screenWidth * 0.02,
  },
  l1title: {
    fontFamily: "Poppins-SemiBold",
    color: "#466AA2",
    fontSize: dimensions.screenWidth * 0.04,
    lineHeight: dimensions.screenWidth * 0.055,
  },
  l1description: {
    fontFamily: "Poppins-Regular",
    color: "#808080",
    fontSize: dimensions.screenWidth * 0.029,
    lineHeight: dimensions.screenWidth * 0.045,
    letterSpacing: 0.4,
  },
});

export const homeOptions = {
  header: (session: Session | null) => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image
          source={require("../../assets/images/general/pet-enjoy.png")}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.title}>Hello!</Text>
          <Text style={styles.subtitle}>
            {session?.user.user_metadata["first_name"] ?? "User"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push("../pets/pets")}
        style={styles.pets}
      >
        <Ionicons name="paw-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  ),
};
