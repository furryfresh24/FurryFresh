import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import dimensions from '../../../utils/sizing'
import Spacer from '../../../components/general/spacer'
import Booking from '../../../interfaces/booking'
import supabase from '../../../utils/supabase'
import HorizontalButtonList from '../../../components/list/horizontal_button_list'
import Button1 from '../../../components/buttons/button1'
import { router } from 'expo-router'

const timeFilters = [
  { id: 'all', title: 'Overall' },
  { id: '24h', title: 'Last 24 Hours' },
  { id: '7d', title: 'Last 7 Days' },
  { id: '30d', title: 'Last 30 Days' }
];

const MainPetCare = (props: {}) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [activeFilter, setActiveFilter] = useState<string | number>('all');
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings);

    useEffect(() => {
        const fetchBookings = async () => {
            const { data, error } = await supabase
                .from('bookings')
                .select();

            if (error) {
                console.error('Error encountered while fetching bookings:', error.message);
                return;
            }

            setBookings(data as Booking[]);
            setFilteredBookings(data as Booking[]);
            console.log('Fetch all completed!');
        };

        fetchBookings();
    }, []);

    const applyTimeFilter = (filter: string) => {
        setActiveFilter(filter);

        let filtered: Booking[];
        const now = new Date();

        switch (filter) {
            case '24h':
                filtered = bookings.filter(booking => {
                    const bookingDate = new Date(booking.created_at);
                    return (now.getTime() - bookingDate.getTime()) <= 24 * 60 * 60 * 1000; // 24 hours
                });
                break;
            case '7d':
                filtered = bookings.filter(booking => {
                    const bookingDate = new Date(booking.created_at);
                    return (now.getTime() - bookingDate.getTime()) <= 7 * 24 * 60 * 60 * 1000; // 7 days
                });
                break;
            case '30d':
                filtered = bookings.filter(booking => {
                    const bookingDate = new Date(booking.created_at);
                    return (now.getTime() - bookingDate.getTime()) <= 30 * 24 * 60 * 60 * 1000; // 30 days
                });
                break;
            default:
                filtered = bookings;
                break;
        }

        setFilteredBookings(filtered);
    };

    const totalSales = filteredBookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
    const totalOrders = filteredBookings.length;
    const totalCompleted = filteredBookings.filter(b => b.status === 'completed').length;
    const totalPending = filteredBookings.filter(b => b.status === 'pending').length;

    return (
        <View>
            <HorizontalButtonList
                services={timeFilters}
                activeService={activeFilter}
                setActiveService={setActiveFilter}
                onServiceClick={(item) => applyTimeFilter(item.id as string)} 
            />
            <Spacer height={dimensions.screenHeight * 0.02} />
            <View style={[styles.container, { alignItems: 'flex-start' }]}>
                <View style={styles.activityCard}>
                    <Text style={styles.cardLabel}>Booking Sales</Text>
                    <Text style={styles.salesAmount}>₱{totalSales.toFixed(2)}</Text>
                    <Text style={styles.growthText}>+34%</Text>
                </View>

                <View style={{ width: '100%', marginTop: dimensions.screenHeight * 0.02 }}>
                    <Button1 
                        title='Manage Orders'
                        isPrimary={false}
                        borderRadius={15}
                        onPress={() => router.push('../petcare/manage_petcare')}
                    />
                </View>

                <View style={styles.summaryContainer}>
                    <View style={[styles.summaryBox, { borderColor: '#466AA2' }]}>
                        <View>
                            <Text style={styles.summaryValue}>{totalOrders}</Text>
                            <Text style={styles.summaryLabel}>Total Orders</Text>
                        </View>
                        <View>
                            <Text style={[styles.summaryPercent, { color: '#4CAF50' }]}>↑ 56%</Text>
                        </View>
                    </View>

                    <View style={[styles.summaryBox, { borderColor: '#466AA2' }]}>
                        <View>
                            <Text style={styles.summaryValue}>{totalCompleted}</Text>
                            <Text style={styles.summaryLabel}>Total Completed</Text>
                        </View>
                        <View>
                            <Text style={[styles.summaryPercent, { color: '#F44336' }]}>↓ 56%</Text>
                        </View>
                    </View>

                    <View style={[styles.summaryBox, { borderColor: '#466AA2' }]}>
                        <View>
                            <Text style={styles.summaryValue}>{totalPending}</Text>
                            <Text style={styles.summaryLabel}>Total Pending</Text>
                        </View>
                        <View>
                            <Text style={[styles.summaryPercent, { color: '#FFC107' }]}>↔ 56%</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={dimensions.screenHeight * 0.1} />
        </View>
    );
}

export default MainPetCare;


const styles = StyleSheet.create({
    container: {
        padding: dimensions.screenWidth * 0.05,
        marginHorizontal: dimensions.screenWidth * 0.05,
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 15,
        marginBottom: dimensions.screenHeight * 0.01,
    },
    activityCard: {
        backgroundColor: 'white',
        padding: dimensions.screenWidth * 0.05,
        borderRadius: dimensions.screenWidth * 0.04,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        width: '100%'
    },
    cardLabel: {
        fontSize: dimensions.screenWidth * 0.04,
        fontFamily: 'Poppins-Medium',
        color: '#333',
    },
    salesAmount: {
        fontSize: dimensions.screenWidth * 0.08,
        fontFamily: 'Poppins-Bold',
        marginTop: dimensions.screenHeight * 0.01,
        color: '#111',
    },
    growthText: {
        color: '#4CAF50',
        marginTop: dimensions.screenHeight * 0.005,
        fontFamily: 'Poppins-Regular',
        fontSize: dimensions.screenWidth * 0.04,
    },
    summaryContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: dimensions.screenHeight * 0.03,
        gap: dimensions.screenWidth * 0.02,
        width: '100%'
    },
    summaryBox: {
        flex: 1,
        backgroundColor: '#f0f2f7',
        padding: dimensions.screenWidth * 0.04,
        borderRadius: dimensions.screenWidth * 0.03,
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryValue: {
        fontSize: dimensions.screenWidth * 0.05,
        fontFamily: 'Poppins-Bold',
        lineHeight: dimensions.screenWidth * 0.07,
    },
    summaryLabel: {
        fontSize: dimensions.screenWidth * 0.035,
        lineHeight: dimensions.screenWidth * 0.05,
        fontFamily: 'Poppins-Regular',
        color: '#666',
        marginTop: dimensions.screenHeight * 0.005,
        textAlign: 'center',
    },
    summaryPercent: {
        marginTop: dimensions.screenHeight * 0.005,
        fontSize: dimensions.screenWidth * 0.035,
        fontFamily: 'Poppins-SemiBold',
    },
})

