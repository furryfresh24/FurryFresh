import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContPaw from '../../components/general/background_paw';
import AppbarDefault from '../../components/bars/appbar_default';
import { useSession } from '../../context/sessions_context';
import dimensions from '../../utils/sizing';
import PlainTextInput from '../../components/inputs/custom_text_input2';
import supabase from '../../utils/supabase';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const EditProfile = () => {
  const { session } = useSession();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    if (session) {
      const metadata = session.user?.user_metadata || {};
      setFirstName(metadata['first_name'] || '');
      setLastName(metadata['last_name'] || '');
      setContactNumber(metadata['contact_number'] || '');
      setBio(metadata['bio'] || '');
      setAddress(metadata['address'] || '');
      const birthdayString = metadata['Birthday'] || '';
      setBirthday(birthdayString ? new Date(birthdayString) : new Date());
    }
  };

  const handleSave = async () => {
    if (!session?.user?.id) return;
  
    setLoading(true);
  
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          contact_number: contactNumber,
          bio,
          address,
          Birthday: moment(birthday).format('YYYY-MM-DD'),
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);
  
      if (profileError) throw profileError;
  
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
          contact_number: contactNumber,
          bio,
          address,
          Birthday: moment(birthday).format('YYYY-MM-DD'),
        },
      });
  
      if (authError) throw authError;
  
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) throw refreshError;
  
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (error: any) { // Specify the error type here
      console.error("Error updating user:", error); 
      Alert.alert('Update Failed', error.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  // Updated onDateChange function with types
  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthday;
    setShowPicker(false);
    setBirthday(currentDate);
  };

  return (
    <View style={{ height: '100%', backgroundColor: '#F8F8FF' }}>
      <AppbarDefault
        title="Edit Profile"
        session={session}
        showBack={true}
        showLeading={false}
        leadingChildren={null}
        titleSize={dimensions.screenWidth * 0.045}
        paddingBottom={dimensions.screenHeight * 0.02}
      />
      <MainContPaw>
        <ScrollView contentContainerStyle={styles.content}>
          <PlainTextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
            autoCapitalize="words"
          />
          <PlainTextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
            autoCapitalize="words"
          />
          <PlainTextInput
            value={contactNumber}
            onChangeText={setContactNumber}
            placeholder="Contact Number"
            keyboardType="phone-pad"
          />
          <PlainTextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
          />
          <PlainTextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />
          <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
            <Text style={styles.dateText}>
              {moment(birthday).format('MMM D, YYYY')}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={birthday}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </MainContPaw>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: dimensions.screenHeight * 0.02,
  },
  button: {
    backgroundColor: '#4B9CD3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: dimensions.screenWidth * 0.04,
  },
  dateInput: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    color: '#000',
    fontSize: dimensions.screenWidth * 0.04,
  },
});