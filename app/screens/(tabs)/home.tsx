import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import MainContPlain from '../../components/general/background_plain'
import dimensions from '../../utils/sizing'
import { router } from 'expo-router'
import supabase from '../../utils/supabase'
import { Session } from '@supabase/supabase-js'
import PetCareIcon from '../../components/svgs/home/PetCareIcon'
import PetSuppliesIcon from '../../components/svgs/home/PetSuppliesIcon'
import Voucher from '../../interfaces/voucher'
import VoucherTemp1 from '../../components/vouchers/voucher1'

type Service = {
  id: number;
  title: string;
  icon: any;
};

const services = [
  {
    id: 1,
    title: 'Pet Care',
    icon: PetCareIcon
  },
  {
    id: 2,
    title: 'Pet Supplies',
    icon: PetSuppliesIcon
  }
];

const vouchers: Voucher[] = [
  {
    id: 'voucher1',
    title: '20% First Pet Care Service',
    description: "Enjoy 20% off on your pet's first grooming session.",
    discountValue: 10,
    discountType: 'percentage',
    forFirstTime: true,
    code: 'GROOM10',
    isActive: true,
    usageLimit: 1,
    minOrderValue: 20,
    applicableCategories: ['Grooming'],
  }
];

const Home = () => {
  const [activeService, setActiveService] = useState<number | null>(1);


  const renderItem = ({ item }: { item: Service }) => {
    const isActive = item.id === activeService;
    const id = item.id;
    const IconComponent = item.icon;
    const iconColor = isActive ? '#fff' : '#808080';
  
    return (
      <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton, { marginLeft: id == 1 ? dimensions.screenWidth * 0.02 : 0 }]}
      onPress={() => setActiveService(item.id)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <IconComponent
          color={iconColor}
          width={dimensions.screenWidth * 0.05}
          height={dimensions.screenWidth * 0.05}
        />
        <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
    );
  };
  
 
  return (
    <MainContPlain paddingHorizontal={dimensions.screenWidth * 0.02}>
      <View style={styles.search}>
        <Ionicons 
          name='search' 
          style={{
            marginRight: dimensions.screenWidth * 0.04,
          }}
          size={dimensions.screenWidth * 0.05}
          color="#808080"
        />
        <Text style={styles.searchText}>Search something here</Text>
      </View>
      <View>
      <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>
        <VoucherTemp1 voucher={vouchers[0]} />
      </View>
    </MainContPlain>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  profileImage: {
    width: dimensions.screenWidth * 0.12,
    height: dimensions.screenWidth * 0.12,
    backgroundColor: '#466AA2',
    marginRight: dimensions.screenWidth * 0.04,
    borderRadius: 100
  },
  pets: {
    backgroundColor: '#fff',
    padding: dimensions.screenWidth * 0.02,
    borderRadius: 10,
    elevation: 5,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row'
  },
  header: { 
    backgroundColor: '#fff',
    paddingTop: dimensions.screenHeight * 0.06,
    paddingBottom: dimensions.screenHeight * 0.014,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: dimensions.screenWidth * 0.03,
    lineHeight: dimensions.screenWidth * 0.04,
    fontFamily: 'Poppins-Regular',
    padding: 0,
    opacity: 0.5,
    marginTop: dimensions.screenHeight * 0.005,
    margin: 0
  },
  subtitle: {
    fontSize: dimensions.screenWidth * 0.05,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: dimensions.screenWidth * 0.06,
    padding: 0,
    margin: 0
  },
  search: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: dimensions.screenWidth * 0.06,
    marginHorizontal: dimensions.screenWidth * 0.02,
    paddingVertical: dimensions.screenHeight * 0.021,
    marginTop: dimensions.screenHeight * 0.03,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  searchText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: dimensions.screenWidth * 0.035,
    color: '#808080'
  },
  button: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: dimensions.screenHeight * 0.01,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  
  buttonText: {
    color: '#808080',
    fontFamily: 'Poppins-SemiBold',
    fontSize: dimensions.screenWidth * 0.035
  },
  
  activeButton: {
    backgroundColor: '#ED7964',
  },
  
  activeButtonText: {
    color: '#fff',
  },
})

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
          <Text style={styles.subtitle}>{session?.user.user_metadata['first_name'] ?? 'User'}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push('../pets/pets')} style={styles.pets}>
        <Ionicons name="paw-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  )
}


