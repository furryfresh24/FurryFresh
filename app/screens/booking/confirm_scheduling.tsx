import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Subcategories from '../../interfaces/subcategories';


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

  const parsedGrooming: Subcategories = JSON.parse(groomingDetails as string);
  const parsedPets: Pet[] = JSON.parse(appointedPets as string);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Confirm Scheduling</Text>

      <View style={styles.section}>
        <Text style={styles.title}>Selected Date:</Text>
        <Text>{selectedDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Selected Time:</Text>
        <Text>{selectedTime}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Grooming Service:</Text>
        <Text>{parsedGrooming.title}</Text>
        <Text>{parsedGrooming.description}</Text>
        <Text>Base Price: ₱{parsedGrooming.price}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Chosen Pet(s):</Text>
        {parsedPets.map((pet, index) => (
          <View key={pet.id} style={styles.petItem}>
            <Text style={styles.petName}>{pet.name} ({pet.pet_type})</Text>
            <Text>Weight: {pet.weight}kg</Text>
            <Text>Size: {pet.size}</Text>
            <Text>Additional Price: ₱{pet.to_add_price}</Text>
            <Text>Pet Type: {pet.pet_type}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ConfirmScheduling;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  petItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  petName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
