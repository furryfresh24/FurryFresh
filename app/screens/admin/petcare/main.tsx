import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import dimensions from '../../../utils/sizing'
import Spacer from '../../../components/general/spacer'
import Booking from '../../../interfaces/booking'
import supabase from '../../../utils/supabase'

type Props = {}

const MainPetCare = (props: Props) => {
    const [bookings, setBookings] = useState<Booking[]>([]);

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
            console.log('Fetch all completed!');
        };

        fetchBookings();
    }, []);

    const totalSales = bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
    const totalOrders = bookings.length;
    const totalCompleted = bookings.filter(b => b.status === 'completed').length;
    const totalPending = bookings.filter(b => b.status === 'pending').length;

    return (
        <View>
            <View style={[styles.container, { alignItems: 'flex-start' }]}>
                <View style={styles.activityCard}>
                    <Text style={styles.cardLabel}>Booking Sales</Text>
                    <Text style={styles.salesAmount}>${totalSales.toFixed(2)}</Text>
                    <Text style={styles.growthText}>+34%</Text>
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
    )
}

export default MainPetCare



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

