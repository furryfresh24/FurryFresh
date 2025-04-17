import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainContPaw from '../../components/general/background_paw'
import AppbarDefault from '../../components/bars/appbar_default'
import { useSession } from '../../context/sessions_context'
import dimensions from '../../utils/sizing'
import PlainTextInput from '../../components/inputs/custom_text_input2'
import supabase from '../../utils/supabase'

const EditProfile = () => {
  const { session } = useSession()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [bio, setBio] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [petTypes, setPetTypes] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {

    if (session) {
      setFirstName(session.user?.user_metadata['first_name'] || '')
      setLastName(session.user?.user_metadata['last_name'] || '')
      setContactNumber(session.user?.user_metadata['contact_number'] || '')
      setBio(session.user?.user_metadata['bio'] || '')
      setAddress(session.user?.user_metadata['address'] || '')
      setWebsite(session.user?.user_metadata['website'] || '')
      setAvatarUrl(session.user?.user_metadata['avatar_url'] || '')
      setPetTypes(session.user?.user_metadata['pet_types'] || '')
    }
  }

  const handleSave = async () => {
    if (!session?.user?.id) return

    setLoading(true)

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
        contact_num: contactNumber,
        bio,
        address,
        website,
        avatar_url: avatarUrl,
        pet_types: petTypes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', session.user.id)

    setLoading(false)

    if (error) {
      Alert.alert('Update Failed', error.message)
    } else {
      Alert.alert('Success', 'Profile updated successfully.')
    }
  }

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
          <PlainTextInput
            value={website}
            onChangeText={setWebsite}
            placeholder="Website"
          />
          <PlainTextInput
            value={avatarUrl}
            onChangeText={setAvatarUrl}
            placeholder="Avatar URL"
          />
          <PlainTextInput
            value={petTypes}
            onChangeText={setPetTypes}
            placeholder="Pet Types (e.g., Dog, Cat)"
          />

          <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </MainContPaw>
    </View>
  )
}

export default EditProfile

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
})
