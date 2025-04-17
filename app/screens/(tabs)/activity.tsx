import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MainContPaw from '../../components/general/background_paw';
import AppbarDefault from '../../components/bars/appbar_default';
import dimensions from '../../utils/sizing';
import { useSession } from '../../context/sessions_context';
import HorizontalButtonList from '../../components/list/horizontal_button_list';
import { useBooking } from '../../context/booking_context';

const Activity = () => {
  const [selectedTab, setSelectedTab] = useState<'ongoing' | 'completed'>('ongoing');
  const [selectedMenu, setSelectedMenu] = useState<number | string>("all");

  const { session } = useSession();
  const { bookings } = useBooking();

  const menus = [
    { id: 'all', title: 'All' },
    { id: 'pet-care', title: 'Pet Care' },
    { id: 'pet-supplies', title: 'Pet Supplies' }
  ];

  const filteredBookings = bookings.filter((booking) => {
    const isCorrectStatus = selectedTab === "ongoing" ? booking.status !== "completed"  : booking.status === "completed";

    const mockCategory = booking.note?.includes("Supplies") ? "pet-supplies" : "pet-care";
    const isCorrectCategory =
      selectedMenu === "all" || mockCategory === selectedMenu;

    return isCorrectStatus && isCorrectCategory;
  });

  return (
    <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: '#F8F8FF' }}>
      <AppbarDefault
        title={"Activity"}
        session={session}
        showBack={false}
        showLeading={false}
        leadingChildren={null}
        titleSize={dimensions.screenWidth * 0.045}
        paddingBottom={dimensions.screenHeight * 0.01}
      >
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab('ongoing')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'ongoing' && styles.tabTextActive 
            ]}>Ongoing</Text>
            {selectedTab === 'ongoing' && <View style={styles.underline} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab('completed')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'completed' && styles.tabTextActive
            ]}>Completed</Text>
            {selectedTab === 'completed' && <View style={styles.underline} />}
          </TouchableOpacity>
        </View>
      </AppbarDefault>

      <MainContPaw>
        <HorizontalButtonList
          services={menus}
          activeService={selectedMenu}
          setActiveService={(id) => setSelectedMenu(id)}
          paddingHorizontal={dimensions.screenWidth * 0.06}
          marginTop={dimensions.screenHeight * 0.015}
        />
        <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
          {filteredBookings.map((booking) => (
            <View key={booking.id} style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{booking.date} - {booking.status}</Text>
              <Text style={{ fontSize: 14 }}>{booking.note}</Text>
            </View>
          ))}
        </View>
      </MainContPaw>
    </View>
  )
}

export default Activity;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 0
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: dimensions.screenWidth * 0.035,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  tabTextActive: {
    color: '#466AA2',
    fontFamily: 'Poppins-SemiBold',
  },
  underline: {
    height: 2,
    width: '100%',
    backgroundColor: '#466AA2',
    marginTop: 4,
    borderRadius: 1,
  },
});
