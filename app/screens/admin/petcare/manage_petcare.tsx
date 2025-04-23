import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import MainContPaw from '../../../components/general/background_paw';
import AppbarDefault from '../../../components/bars/appbar_default';
import dimensions from '../../../utils/sizing';
import { useSession } from '../../../context/sessions_context';
import HorizontalButtonList from '../../../components/list/horizontal_button_list';
import { useGlobalBooking } from '../../../context/global_booking_context';
import BookingItem from '../../../components/activity/booking_item';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { ChevronDown } from 'lucide-react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import Subcategories from '../../../interfaces/subcategories';
import { Portal, PortalProvider } from '@gorhom/portal';
import MainContPlain from '../../../components/general/background_plain';
import supabase from '../../../utils/supabase';

const ManagePetCare = () => {
  const [selectedTab, setSelectedTab] = useState<'ongoing' | 'completed'>('ongoing');
  const [selectedMenu, setSelectedMenu] = useState<'all' | 'pet-care'>('all');
  const [isLoading, setLoading] =  useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'overall' | '24h' | '7d' | '30d'>('overall');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const { session } = useSession();
  const { globalBookings, updateGlobalBookingContext } = useGlobalBooking();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%"], []);
  const openSheet = () => sheetRef.current?.expand();

  const backDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={[props.style, { zIndex: 0 }]}
      />
    ),
    []
  );

  const handleSheetChange = (index: number) => {
    if (index === 0) {
      sheetRef.current?.close();
    }
  };

  const menus = [
    { id: 'all', title: 'All' },
    { id: 'pet-care', title: 'Pet Care' },
  ];

  const bookingAsActivity = globalBookings.map((booking) => ({
    id: booking.id,
    pet_ids: booking.pet_ids,
    sharraine_id: booking.grooming_id,
    time: booking.time_start,
    date: booking.date,
    note: booking.note || 'No note',
    status: booking.status,
    amount: booking.amount ?? 0,
    type: 'booking' as const,
    category: 'pet-care',
  }));

  const now = new Date();
  const filterByTime = (activityDate: string) => {
    const date = new Date(activityDate);
    switch (selectedFilter) {
      case '24h':
        return now.getTime() - date.getTime() <= 24 * 60 * 60 * 1000;
      case '7d':
        return now.getTime() - date.getTime() <= 7 * 24 * 60 * 60 * 1000;
      case '30d':
        return now.getTime() - date.getTime() <= 30 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  };

  const filteredActivities = bookingAsActivity.filter((activity) => {
    const isCorrectStatus =
      selectedTab === 'ongoing' ? activity.status !== 'completed' : activity.status === 'completed';
    const isCorrectCategory =
      selectedMenu === 'all' || activity.category === selectedMenu;
    const isCorrectTime = filterByTime(activity.date);
    return isCorrectStatus && isCorrectCategory && isCorrectTime;
  });

  type toUpdate = {
    status: string,
    id: string
  }

  const updateBooking = async (passedData: toUpdate) => {
    const { data, error } = await supabase
      .from('bookings')
      .update({'status': passedData.status})
      .eq('id', passedData.id)
      .select()
      .single();

    if(error) {
      console.error('Error encountered: ', error);
      return;
    }

    updateGlobalBookingContext(data);
    
    console.log('Successfully updated data: ', data);
  }

  return (
    <PortalProvider>
      <View style={{ flex: 1, backgroundColor: '#F8F8FF' }}>
        <AppbarDefault
          title="Manage Pet Care"
          session={session}
          showBack={true}
          showLeading={false}
          zIndex={0}
          leadingChildren={null}
          titleSize={dimensions.screenWidth * 0.045}
          paddingBottom={dimensions.screenHeight * 0.01}
        >
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('ongoing')}>
              <Text style={[styles.tabText, selectedTab === 'ongoing' && styles.tabTextActive]}>
                Ongoing
              </Text>
              {selectedTab === 'ongoing' && <View style={styles.underline} />}
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('completed')}>
              <Text style={[styles.tabText, selectedTab === 'completed' && styles.tabTextActive]}>
                Completed
              </Text>
              {selectedTab === 'completed' && <View style={styles.underline} />}
            </TouchableOpacity>
          </View>
        </AppbarDefault>

        <MainContPlain>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, marginTop: dimensions.screenHeight * 0.015 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <HorizontalButtonList
                services={menus}
                activeService={selectedMenu}
                setActiveService={(id) => setSelectedMenu(id as any)}
                marginTop={dimensions.screenHeight * 0}
                removeLeftPadding={false}
              />
            </View>
            <TouchableOpacity onPress={openSheet}>
              <View style={styles.filterResults}>
                <Text style={styles.filterText}>{selectedFilter === 'overall' ? 'Overall' : selectedFilter === '24h' ? 'Last 24 Hours' : selectedFilter === '7d' ? 'Last 7 Days' : 'Last 30 Days'}</Text>
                <ChevronDown width={dimensions.screenWidth * 0.04} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: dimensions.screenHeight * 0.13 }}>
            {filteredActivities.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
                No bookings found.
              </Text>
            ) : (
              filteredActivities.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    const bookingData = globalBookings.find((book) => book.id === item.id);
                    setSelectedBooking(bookingData);
                    setIsModalVisible(true);
                  }}

                >
                  <BookingItem item={item} />
                </TouchableOpacity>
              ))
            )}
          </View>
        </MainContPlain>
      </View>
      <Portal>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          handleComponent={null}
          backgroundStyle={{ backgroundColor: "fff", zIndex: 100 }}
          backdropComponent={backDrop}
          onChange={handleSheetChange}
          style={{ zIndex: 100 }}
        >
          <BottomSheetView style={bs.mainCont}>
            <View style={{ padding: 16 }}>
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginBottom: 12 }}>
                Filter by Time
              </Text>
              {[
                { label: 'Overall', value: 'overall' },
                { label: 'Last 24 Hours', value: '24h' },
                { label: 'Last 7 Days', value: '7d' },
                { label: 'Last 30 Days', value: '30d' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => {
                    setSelectedFilter(option.value as any);
                    sheetRef.current?.close(); // Auto-close after selecting
                  }}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                    backgroundColor: selectedFilter === option.value ? '#466AA2' : '#F0F0F0',
                    marginBottom: 8,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: selectedFilter === option.value ? 'white' : '#333',
                      fontFamily: 'Poppins-Regular',
                    }}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center'
          }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginBottom: 12 }}>
              Mark this booking as completed?
            </Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginBottom: 20 }}>
              Pet(s): {selectedBooking?.pet_ids.join(', ')}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: dimensions.screenWidth * 0.03 }}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ flex: 1, padding: 10, alignItems: 'center', backgroundColor: '#E1E1E1', borderRadius: 30 }}
              >
                <Text style={{ color: '#808080', fontFamily: 'Poppins-SemiBold' }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={ async () => {
                  console.log('Marking as completed:', selectedBooking?.id);
                  setLoading(true);

                  await updateBooking({ id: selectedBooking.id, status: 'completed' });
                  
                  setLoading(false);
                  setIsModalVisible(false);
                }}
                style={{ flex: 1, padding: 10, alignItems: 'center',  backgroundColor: '#466AA2', borderRadius: 30 }}
              >
                {
                  isLoading ? <ActivityIndicator size="small" /> :
                  <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold' }}>Confirm</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </PortalProvider>
  );
};

export default ManagePetCare;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
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
  activityItem: {
    marginBottom: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateStatus: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    color: '#555',
  },
  filterResults: {
    alignItems: 'center',
    paddingVertical: dimensions.screenHeight * 0.01,
    paddingHorizontal: dimensions.screenWidth * 0.04,
    borderRadius: 8,
    borderColor: '#808080',
    backgroundColor: '#466AA2',
    flexDirection: 'row',
    gap: dimensions.screenWidth * 0.01
  },
  filterText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white'
  }
});

const bs = StyleSheet.create({
  mainCont: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 3
  }
});
