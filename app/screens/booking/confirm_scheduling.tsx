import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Subcategories from '../../interfaces/subcategories';
import AppbarDefault from '../../components/bars/appbar_default';
import dimensions from '../../utils/sizing';
import { Session } from '@supabase/supabase-js';
import MainContPlain from '../../components/general/background_plain';
import Title1 from '../../components/texts/title1';
import DefaultListIcon from '../../components/svgs/home/services/DefaultListIcon';
import SvgValue from '../../hooks/fetchSvg';
import moment from 'moment';
import Price from '../../components/general/price';
import { Ionicons } from '@expo/vector-icons';
import Spacer from '../../components/general/spacer';
import { PaymentMethod, paymentMethods } from '../../hooks/fetchPaymentMethod';
import TitleValue from '../../components/list/title_value';
import { Divider } from '@rneui/themed/dist/Divider';
import Button1 from '../../components/buttons/button1';


type Pet = {
  id: string;
  name: string;
  weight: number;
  size: string;
  to_add_price: number;
  pet_type: string;
};

const ConfirmScheduling = () => {
  const { selectedDate, selectedTime, groomingDetails, appointedPets } = useLocalSearchParams();
  const [session, setSession] = useState<Session | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const parsedGrooming: Subcategories = JSON.parse(groomingDetails as string);
  const parsedPets: Pet[] = JSON.parse(appointedPets as string);

  const icon = parsedGrooming.svg_icon ? (
    <SvgValue
      svgIcon={parsedGrooming.svg_icon}
      color="#fff"
      width={dimensions.screenWidth * 0.11}
      height={dimensions.screenWidth * 0.11}
    />
  ) : null;

  return (
    // <ScrollView contentContainerStyle={styles.container}>
    //   <Text style={styles.header}>Confirm Scheduling</Text>

    //   <View style={styles.section}>
    //     <Text style={styles.title}>Selected Date:</Text>
    //     <Text>{selectedDate}</Text>
    //   </View>

    //   <View style={styles.section}>
    //     <Text style={styles.title}>Selected Time:</Text>
    //     <Text>{selectedTime}</Text>
    //   </View>

    //   <View style={styles.section}>
    //     <Text style={styles.title}>Grooming Service:</Text>
    //     <Text>{parsedGrooming.title}</Text>
    //     <Text>{parsedGrooming.description}</Text>
    //     <Text>Base Price: ₱{parsedGrooming.price}</Text>
    //   </View>

    //   <View style={styles.section}>
    //     <Text style={styles.title}>Chosen Pet(s):</Text>
    //     {parsedPets.map((pet, index) => (
    //       <View key={pet.id} style={styles.petItem}>
    //         <Text style={styles.petName}>{pet.name} ({pet.pet_type})</Text>
    //         <Text>Weight: {pet.weight}kg</Text>
    //         <Text>Size: {pet.size}</Text>
    //         <Text>Additional Price: ₱{pet.to_add_price}</Text>
    //         <Text>Pet Type: {pet.pet_type}</Text>
    //       </View>
    //     ))}
    //   </View>
    // </ScrollView>
    <View style={{ height: '100%', backgroundColor: '#F8F8FF' }}>
      {(
        <AppbarDefault
          title="Confirm Booking"
          subtitleSize={dimensions.screenWidth * 0.03}
          subtitleFont="Poppins-Regular"
          session={session}
          showLeading={false}
          leadingChildren
          titleSize={dimensions.screenWidth * 0.045}
        />
      )}
      <MainContPlain>
        <View style={styles.cont1}>
          <Title1 text="Booking Details" fontSize={dimensions.screenWidth * 0.05} />
          <View style={[styles.groomMainCont]}>
            <View style={styles.groomTypeCont}>
              <View style={[styles.listSvgIconBG, {
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
              }]}>
                <Text
                  style={{
                    fontSize: dimensions.screenWidth * 0.05,
                    fontFamily: 'Poppins-SemiBold',
                    lineHeight: dimensions.screenWidth * 0.06,
                    textAlign: 'center'
                  }}
                >{`${parsedPets.length}\n`}
                  <Text
                    style={{
                      color: '#808080',
                      fontSize: dimensions.screenWidth * 0.028,
                      lineHeight: dimensions.screenWidth * 0.03,
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center'
                    }}
                  >Pets</Text>
                </Text>
              </View>
              <View style={styles.listItemDetails}>
                <Text style={styles.l1title}>{parsedGrooming.title}</Text>
                <Text style={styles.l1description}>{`${moment(selectedDate).format('MMM D, YYYY')} - ${moment(selectedTime, 'HH:mm').format('h:mm A')}`}</Text>
              </View>
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
                  <Price
                    value={parsedGrooming.price ?? 0.0}
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
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: dimensions.screenWidth * 0.035,
                paddingBottom: dimensions.screenHeight * 0.02
              }}
            >
              <Text
                style={{
                  color: '#808080',
                  fontFamily: 'Poppins-Regular',
                  fontSize: dimensions.screenWidth * 0.03
                }}
              >Appointed Pets:</Text>
              {parsedPets.map((pet, index) => (
                <View
                  style={{
                    backgroundColor: '#e2e7f3',
                    paddingHorizontal: dimensions.screenWidth * 0.035,
                    paddingVertical: dimensions.screenHeight * 0.01,
                    borderRadius: 30,
                    marginBottom: dimensions.screenHeight * 0.01,
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                  key={pet.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <SvgValue svgIcon={pet.pet_type.toLocaleLowerCase()} color='#466AA2' width={dimensions.screenWidth * 0.05} height={dimensions.screenWidth * 0.05} />
                    <Spacer width={dimensions.screenWidth * 0.02} />
                    <View style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'column',

                    }}>
                      <Title1 fontSize={dimensions.screenWidth * 0.038} text={pet.name} lineHeight={dimensions.screenWidth * 0.045} />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      display: 'flex',
                      alignItems: 'flex-end'
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: '#808080'
                        }}
                      >{pet.size}: <Text style={{ color: '#ED7964', fontFamily: 'Poppins-SemiBold' }}>+ </Text></Text>
                      <Price value={`+${pet.to_add_price}`} color='#ED7964' fontFamily='Poppins-SemiBold' />
                    </View>
                  </View>
                </View>
              ))}
              <Text
                style={{
                  color: '#808080',
                  fontFamily: 'Poppins-Regular',
                  fontSize: dimensions.screenWidth * 0.028
                }}
              >💡 Tip: Cats have a fixed additional rate of ₱50.00 for any size.</Text>
            </View>
          </View>
        </View>
        <Spacer height={dimensions.screenHeight * 0.03} />
        <View style={[{ paddingHorizontal: 0, backgroundColor: 'white' }]}>
          <View style={[styles.cont1, { paddingBottom: 0, paddingTop: 0 }]}>
            <Title1 text="Voucher" fontSize={dimensions.screenWidth * 0.05} />
            <Spacer height={dimensions.screenHeight * 0.01} />
            <View style={styles.cont2main}>
              <View style={styles.cont2}>
                <Text style={styles.cont2title}>Select Voucher</Text>
                <Text style={styles.cont2desc}>Choose a voucher for this booking</Text>
              </View>
              <View style={[styles.cont2, { alignItems: 'flex-end', flex: 1 }]}>
                <Ionicons name="pricetag" size={dimensions.screenWidth * 0.06} color="#B5B5B5" />
              </View>
            </View>
            <Spacer height={dimensions.screenHeight * 0.02} />
            <View
              style={{
                borderColor: false ? '#466AA2' : '#D1D1D1',
                backgroundColor: false ? '#e2e7f3' : '#fff',
                borderWidth: 1.7,
                borderRadius: 10,
                paddingHorizontal: dimensions.screenWidth * 0.04,
                paddingVertical: dimensions.screenHeight * 0.017,
                width: '100%',
                marginBottom: dimensions.screenHeight * 0.015,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Ionicons
                name='add-circle-outline'
                size={dimensions.screenWidth * 0.06}
                color={false ? '#466AA2' : '#808080'}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  marginHorizontal: dimensions.screenWidth * 0.025,
                  flex: 1,
                  color: false ? '#466AA2' : '#808080'
                }}
              >{'Add Voucher'}</Text>
              {
                false ? (
                  <></>
                ) : (
                  <Ionicons
                    name='arrow-forward'
                    size={dimensions.screenWidth * 0.04}
                    color={false ? '#466AA2' : '#808080'}
                  />
                )
              }
            </View>
          </View>
        </View>
        <Spacer height={dimensions.screenHeight * 0.03} />
        <View style={[{ paddingHorizontal: 0, backgroundColor: 'white' }]}>
          <View style={[styles.cont1, { paddingBottom: 0, paddingTop: 0 }]}>
            <Title1 text="Payment" fontSize={dimensions.screenWidth * 0.05} />
            <Spacer height={dimensions.screenHeight * 0.01} />
            <View style={styles.cont2main}>
              <View style={styles.cont2}>
                <Text style={styles.cont2title}>Select Payment Method</Text>
                <Text style={styles.cont2desc}>Choose a payment method for this booking</Text>
              </View>
              <View style={[styles.cont2, { alignItems: 'flex-end', flex: 1 }]}>
                <Ionicons name="cash" size={dimensions.screenWidth * 0.06} color="#B5B5B5" />
              </View>
            </View>
            <Spacer height={dimensions.screenHeight * 0.02} />
            <FlatList
              data={paymentMethods}
              scrollEnabled={false}
              style={{
                width: '100%',
              }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (paymentMethod?.id === item.id) {
                        setPaymentMethod(null);
                      } else {
                        setPaymentMethod(item);
                      }
                    }}

                  >
                    <View
                      style={{
                        paddingHorizontal: dimensions.screenWidth * 0.04,
                        paddingVertical: dimensions.screenHeight * 0.013,
                        borderColor: paymentMethod != null && paymentMethod.id == item.id ? '#466AA2' : '#D1D1D1',
                        backgroundColor: paymentMethod != null && paymentMethod.id == item.id ? '#e2e7f3' : '#fff',
                        borderWidth: 2.5,
                        borderRadius: 10,
                        width: '100%',
                        marginBottom: dimensions.screenHeight * 0.015,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <SvgValue
                        svgIcon={item.icon ?? ''}
                        color='#466AA2'
                        width={dimensions.screenWidth * 0.08}
                        height={dimensions.screenWidth * 0.08} />
                      <Spacer width={dimensions.screenWidth * 0.04} />
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold',
                          fontSize: dimensions.screenWidth * 0.037
                        }}
                      >{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <Spacer height={dimensions.screenHeight * 0.03} />
        <View style={[{ paddingHorizontal: 0, backgroundColor: 'white' }]}>
          <View style={[styles.cont1, { paddingBottom: 0, paddingTop: 0 }]}>
            <Title1 text="Summary" fontSize={dimensions.screenWidth * 0.05} />
            <Divider color='#D1D1D1' width={1}>
              <Spacer height={dimensions.screenHeight * 0.01} />
              <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}>
                <View style={styles.cont2}>
                  <Text style={styles.cont2desc}>Summary of the booking appointment</Text>
                </View>
                <View style={[{ width: '100%', marginTop: dimensions.screenHeight * 0.01 }]}>
                  <TitleValue
                    title="Grooming Price"
                    isSub={false}
                    isBold={true}
                    value={`₱${parsedPets.reduce((sum, p) => sum + ((p.to_add_price || 0) + (parsedGrooming.price ?? 0)), 0).toFixed(2)
                      }`}
                  />
                  <View
                    style={{
                      paddingHorizontal: dimensions.screenWidth * 0.03
                    }}
                  >
                    <TitleValue
                      title="Dogs"
                      isSub={true}
                      isBold={false}
                      value={`₱${parsedPets
                        .filter((p) => p.pet_type === 'Dog')
                        .reduce((sum, p) => sum + ((p.to_add_price || 0) + (parsedGrooming.price ?? 0)), 0).toFixed(2)
                        }`}
                    />
                    <TitleValue
                      title="Cats"
                      isSub={true}
                      isBold={false}
                      value={`₱${parsedPets
                        .filter((p) => p.pet_type === 'Cat')
                        .reduce((sum, p) => sum + ((p.to_add_price || 0) + (parsedGrooming.price ?? 0)), 0).toFixed(2)
                        }`}
                    />
                  </View>
                </View>
              </View>
              <Spacer height={dimensions.screenHeight * 0.01} />
            </Divider>

            <Divider color='#D1D1D1' width={1}>
              <Spacer height={dimensions.screenHeight * 0.01} />
              <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}>
                <View style={[{ width: '100%', marginTop: dimensions.screenHeight * 0.01 }]}>
                  <TitleValue
                    title="Subtotal"
                    isSub={false}
                    isBold={true}
                    value={`₱${parsedPets.reduce((sum, p) => sum + ((p.to_add_price || 0) + (parsedGrooming.price ?? 0)), 0).toFixed(2)}`}
                  />
                  <TitleValue
                    title="Voucher"
                    isSub={false}
                    isBold={true}
                    value={`₱${(150).toFixed(2)
                      }`}
                  />
                  <View
                    style={{
                      paddingHorizontal: dimensions.screenWidth * 0.03
                    }}
                  >
                    <TitleValue
                      title="FIRSTGROOM (10% LESS)"
                      isSub={true}
                      isBold={false}
                      value={`-₱${(150.0).toFixed(2)
                        }`}
                    />
                  </View>
                </View>
              </View>
              <Spacer height={dimensions.screenHeight * 0.01} />
            </Divider>

            <Divider color='#D1D1D1' width={1}>
              <Spacer height={dimensions.screenHeight * 0.01} />
              <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}>
                <View style={[{ width: '100%', marginTop: dimensions.screenHeight * 0.01 }]}>
                  <TitleValue
                    title="Total"
                    isSub={false}
                    isBold={true}
                    value={`₱${(1000).toFixed(2)
                      }`}
                  />
                  <View
                    style={{
                      paddingHorizontal: dimensions.screenWidth * 0.03
                    }}
                  >
                    <TitleValue
                      title="Subtotal"
                      isSub={true}
                      isBold={false}
                      value={`₱${parsedPets.reduce((sum, p) => sum + ((p.to_add_price || 0) + (parsedGrooming.price ?? 0)), 0).toFixed(2)}`}
                    />
                    <TitleValue
                      title="Voucher"
                      isSub={true}
                      isBold={false}
                      value={`-₱${(150.0).toFixed(2)
                        }`}
                    />
                  </View>
                </View>
              </View>
              <Spacer height={dimensions.screenHeight * 0.01} />
            </Divider>
          </View>
        </View>
      </MainContPlain>
      <View
        style={{
          paddingHorizontal: dimensions.screenWidth * 0.05,
          paddingBottom: dimensions.screenHeight * 0.03,
          paddingTop: dimensions.screenHeight * 0.02,
          backgroundColor: 'white'
        }}>
        <View style={{
          marginBottom: dimensions.screenHeight * 0.01,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          // backgroundColor: 'red'
        }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: dimensions.screenWidth * 0.04
            }}
          >Total</Text>
          <Price
            fontSize={dimensions.screenWidth * 0.05}
            fontFamily="Poppins-SemiBold"
            value={1000}
          />
        </View>
        <Button1
          title='Confirm Booking'
          isPrimary={true}
          onPress={() => { }}
          borderRadius={16}
        />
      </View>
    </View>
  );
};

export default ConfirmScheduling;

const styles = StyleSheet.create({
  cont1: {
    marginTop: dimensions.screenHeight * 0.03,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: dimensions.screenWidth * 0.05,
    paddingVertical: dimensions.screenHeight * 0.025,
  },
  cont2main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cont2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cont2title: {
    fontFamily: 'Poppins-Bold',
    fontSize: dimensions.screenWidth * 0.04,
  },
  cont2desc: {
    fontFamily: 'Poppins-Regular',
    fontSize: dimensions.screenWidth * 0.033,
    lineHeight: dimensions.screenWidth * 0.04,
    color: '#808080',
  },
  groomMainCont: {
    backgroundColor: 'white',
    marginTop: dimensions.screenHeight * 0.013,
    marginBottom: dimensions.screenHeight * 0.013,
    elevation: 3,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
  },
  groomTypeCont: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dimensions.screenWidth * 0.025,
    paddingVertical: dimensions.screenWidth * 0.025,
  },
  listSvgIconBG: {
    backgroundColor: '#fff',
    width: dimensions.screenSize * 0.05,
    height: dimensions.screenSize * 0.05,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 100,
    borderColor: '#D1D1D1',
    borderWidth: 1,
    marginRight: dimensions.screenWidth * 0.03,
  },
  listItemDetails: {
    flexGrow: 1,
    width: '0%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: dimensions.screenWidth * 0.02,
  },
  l1title: {
    fontFamily: 'Poppins-SemiBold',
    color: '#466AA2',
    fontSize: dimensions.screenWidth * 0.04,
    lineHeight: dimensions.screenWidth * 0.055,
  },
  l1description: {
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    fontSize: dimensions.screenWidth * 0.029,
    lineHeight: dimensions.screenWidth * 0.045,
    letterSpacing: 0.4,
  },
});
