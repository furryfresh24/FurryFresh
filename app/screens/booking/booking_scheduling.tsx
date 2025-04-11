import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import MainContPlain from '../../components/general/background_plain';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import AppbarDefault from '../../components/bars/appbar_default';
import { Session } from '@supabase/supabase-js';
import dimensions from '../../utils/sizing';
import Title1 from '../../components/texts/title1';
import Subcategories from '../../interfaces/subcategories';
import DefaultListIcon from '../../components/svgs/home/services/DefaultListIcon';
import SvgValue from '../../hooks/fetchSvg';
import Spacer from '../../components/general/spacer';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';

const BookingScheduling = () => {
    const navigation = useNavigation();
    const [session, setSession] = useState<Session | null>(null);
    const { object } = useLocalSearchParams();
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    if (!object) {
        return (
            <MainContPlain>
                <View style={styles.errorCont}>
                    <Text style={styles.errorText}>Error: No grooming data provided.</Text>
                </View>
            </MainContPlain>
        );
    }

    let grooming: Subcategories;
    try {
        grooming = typeof object === 'string' ? JSON.parse(object) : object;
    } catch (error) {
        return (
            <MainContPlain>
                <View style={styles.errorCont}>
                    <Text style={styles.errorText}>Error: Invalid grooming data.</Text>
                </View>
            </MainContPlain>
        );
    }

    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

    const generateNext7Dates = () => {
        return Array.from({ length: 30 }, (_, i) => {
            const date = moment().add(i, 'days');
            return {
                value: date.format('YYYY-MM-DD'),
                month: date.format('MMM'),
                day: date.format('D'),
            };
        });
    };

    const getTimeSlots = (date: string) => {
        const day = moment(date).format('dddd').toLowerCase();
    
        let start = '08:00';
        let end = '19:30';
    
        if (day === 'sunday') {
            end = '16:30';
        } else if (['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].includes(day)) {
            end = '18:30';
        }
    
        const slots: string[] = [];
        let current = moment(start, 'HH:mm');
        const last = moment(end, 'HH:mm');
    
        const isToday = moment().isSame(date, 'day');
    
        while (current <= last) {
            // If booking for today, include the slot only if it's after the current time.
            if (!isToday || current.isAfter(moment())) {
                slots.push(current.format('HH:mm'));
            }
            current.add(30, 'minutes');
        }
    
        return slots;
    };
    
    
    
    
    

    const dateOptions = generateNext7Dates();

    const icon = grooming.svg_icon ? (
        <SvgValue
            svgIcon={grooming.svg_icon}
            color="#fff"
            width={dimensions.screenWidth * 0.11}
            height={dimensions.screenWidth * 0.11}
        />
    ) : null;


    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <AppbarDefault
                    title="Booking"
                    subtitle={grooming.title}
                    subtitleSize={dimensions.screenWidth * 0.03}
                    subtitleFont="Poppins-Regular"
                    session={session}
                    showLeading={false}
                    leadingChildren
                    titleSize={dimensions.screenWidth * 0.045}
                />
            ),
        });
    }, [navigation, session]);

    return (
        <MainContPlain>
            <View style={styles.cont1}>
                <Title1 text="To Book Service" fontSize={dimensions.screenWidth * 0.05} />
                <View style={styles.groomTypeCont}>
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
                            {grooming.title}
                        </Text>
                        <Text style={styles.l1description}>
                            {grooming.description}
                        </Text>
                    </View>
                </View>
            </View>
            <Spacer height={dimensions.screenHeight * 0.02}/>
            <View style={[{ paddingHorizontal: 0, backgroundColor: 'white' }]}>
                <View style={[styles.cont1, { paddingBottom: 0, paddingTop: 0 }]}>
                    <Title1 text="Schedule Appointment" fontSize={dimensions.screenWidth * 0.05} />
                    <Spacer height={dimensions.screenHeight * 0.01} />
                    <View style={styles.cont2main}>
                        <View style={styles.cont2}>
                            <Text style={styles.cont2title}>Select Date</Text>
                            <Text style={styles.cont2desc}>Choose a date for this booking</Text>
                        </View>
                        <View style={[styles.cont2, { alignItems: 'flex-end', flex: 1 }]}>
                            <Ionicons name='calendar' size={dimensions.screenWidth * 0.06} color="#B5B5B5" />
                        </View>
                    </View>
                </View>
                <FlatList
                    data={dateOptions}
                    style={{ paddingBottom: dimensions.screenHeight * 0.01 }}
                    keyExtractor={(item) => item.value}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: 15 }}
                    renderItem={({ item, index }) => {
                        const isSelected = item.value === selectedDate;

                        return (
                            <TouchableOpacity
                                style={[
                                    styles.dateButton,
                                    isSelected && styles.dateButtonSelected,
                                    {
                                        borderColor: isSelected ? '#ED7964' : '#D1D1D1',
                                        marginLeft: index == 0 ? dimensions.screenWidth * 0.05 : 0
                                    }
                                ]}
                                onPress={() => { setSelectedTime(null); setSelectedDate(item.value); }}
                            >
                                <Text
                                    style={[
                                        styles.dateText,
                                        isSelected && styles.dateTextSelected,
                                        {
                                            textAlign: 'center',
                                            color: isSelected ? 'white' : '#808080',
                                            fontSize: dimensions.screenWidth * 0.04
                                        }
                                    ]}
                                >
                                    {item.month}
                                </Text>
                                <Text
                                    style={[
                                        styles.dateText,
                                        isSelected && styles.dateTextSelected,
                                        {
                                            textAlign: 'center', fontFamily: 'Poppins-SemiBold',
                                            color: isSelected ? 'white' : 'black'
                                        }
                                    ]}
                                >
                                    {item.day}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
                <View style={[styles.cont1, { paddingBottom: 0, paddingTop: 0 }]}>
                    <View style={styles.cont2main}>
                        <View style={styles.cont2}>
                            <Text style={styles.cont2title}>Select Desired Time Slot</Text>
                            <Text style={styles.cont2desc}>Choose a specific time for this booking</Text>
                        </View>
                        <View style={[styles.cont2, { alignItems: 'flex-end', flex: 1 }]}>
                            <Ionicons name='time' size={dimensions.screenWidth * 0.06} color="#B5B5B5" />
                        </View>
                    </View>
                    <View style={styles.wrapContainer}>
                        {getTimeSlots(selectedDate).map((time, idx) => {
                            const isSelected = time === selectedTime;
                            return (
                                <TouchableOpacity
                                    key={idx}
                                    style={[
                                        styles.dateButton,
                                        isSelected && styles.dateButtonSelected,
                                        {
                                            borderColor: isSelected ? '#ED7964' : '#D1D1D1',
                                            backgroundColor: isSelected ? '#ED7964' : '#FFF',
                                            width: dimensions.screenWidth * 0.265,
                                            marginBottom: dimensions.screenHeight * 0.015
                                        }
                                    ]}
                                    onPress={() => setSelectedTime(time)}
                                >
                                    <Text style={[
                                        styles.dateText,
                                        isSelected && styles.dateTextSelected,
                                        {
                                            textAlign: 'center',
                                            color: isSelected ? '#FFF' : '#7E7E7E',
                                        }
                                    ]}>
                                        {moment(time, 'HH:mm').format('h:mm A')}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </View>
        </MainContPlain>
    );
};

export default BookingScheduling;

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
        justifyContent: 'space-between'
    },
    cont2: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    cont2title: {
        fontFamily: 'Poppins-Bold',
        fontSize: dimensions.screenWidth * 0.04
    },
    cont2desc: {
        fontFamily: 'Poppins-Regular',
        fontSize: dimensions.screenWidth * 0.033,
        lineHeight: dimensions.screenWidth * 0.04,
        color: '#808080'
    },
    groomTypeCont: {
        backgroundColor: 'white',
        elevation: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        marginTop: dimensions.screenHeight * 0.013,
        marginBottom: dimensions.screenHeight * 0.013,
        paddingHorizontal: dimensions.screenWidth * 0.025,
        paddingVertical: dimensions.screenWidth * 0.025,
    },
    errorCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
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
    dateButton: {
        paddingVertical: dimensions.screenHeight * 0.015,
        paddingHorizontal: dimensions.screenWidth * 0.04,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: '#D1D1D1',
        borderWidth: 1.5,
        marginRight: dimensions.screenWidth * 0.032,
    },
    dateButtonSelected: {
        backgroundColor: '#ED7964',
    },
    dateText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: dimensions.screenWidth * 0.035,
        lineHeight: dimensions.screenWidth * 0.045,
        color: '#555',
    },
    dateTextSelected: {
        color: '#fff',
    },
    wrapContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: dimensions.screenHeight * 0.02,
        marginBottom: dimensions.screenHeight * 0.05,
    },
});
