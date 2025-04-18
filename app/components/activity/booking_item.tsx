import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type BookingItemProps = {
  item: {
    id: string;
    date: string;
    status: string;
    note: string;
    type: 'booking';
    category: string;
  };
};

const BookingItem = ({ item }: BookingItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dateStatus}>{item.date} - {item.status}</Text>
      <Text style={styles.noteText}>🧼 Booking: {item.note}</Text>
    </View>
  );
};

export default BookingItem;

const styles = StyleSheet.create({
  container: {
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
});
