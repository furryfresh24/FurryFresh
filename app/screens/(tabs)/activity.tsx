import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import MainContPaw from '../../components/general/background_paw';

const Activity = () => {
  const [activeTab, setActiveTab] = useState<'Ongoing' | 'Completed'>('Ongoing');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pet Care' | 'Pet Supplies'>('All');

  return (
    <MainContPaw showPetImage={true} paddingHorizontal={16} paddingVertical={16}>
      {/* Header */}
      <Text style={styles.header}>Activity</Text>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Ongoing' && styles.activeTab]}
          onPress={() => setActiveTab('Ongoing')}
        >
          <Text style={[styles.tabText, activeTab === 'Ongoing' && styles.activeTabText]}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Completed' && styles.activeTab]}
          onPress={() => setActiveTab('Completed')}
        >
          <Text style={[styles.tabText, activeTab === 'Completed' && styles.activeTabText]}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Filter butttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'All' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('All')}
        >
          <Text style={[styles.filterText, activeFilter === 'All' && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'Pet Care' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('Pet Care')}
        >
          <Text style={[styles.filterText, activeFilter === 'Pet Care' && styles.activeFilterText]}>Pet Care</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'Pet Supplies' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('Pet Supplies')}
        >
          <Text style={[styles.filterText, activeFilter === 'Pet Supplies' && styles.activeFilterText]}>Pet Supplies</Text>
        </TouchableOpacity>
      </View>

      {/* activity Caard */}
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={[styles.cardTitle, {color: '#4863A0'}]}>Basic Grooming</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.cardPrice}>P500.00</Text>
          </View>
        </View>
        <Text style={styles.cardSubtitle}>for Pet (Poppy)</Text>
        <Text style={styles.cardDate}>Scheduled for Feb 10, 2025 – 3:30 PM</Text>
      </View>
    </MainContPaw>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4863A0',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#4863A0',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  activeFilterButton: {
    backgroundColor: '#F76806',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  card: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    backgroundColor: '#fff',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  priceContainer: {
    borderWidth: 1,
    borderColor: '#F76806',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#F76806',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Activity;