import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MainContCircle from '../../components/general/background_circle'
import Title1 from '../../components/texts/title1'
import dimensions from '../../utils/sizing'
import Subtitle1 from '../../components/texts/subtitle1'
import CustomTextInput from '../../components/inputs/custom_text_input1'
import Button1 from '../../components/buttons/button1'
import { router } from 'expo-router'
import supabase from '../../utils/supabase'

type Props = {}

const SignUp = (props: Props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
      setLoading(false)
      return;
    }

    if (!session) {
      Alert.alert('Please check your inbox for email verification!')
      setLoading(false)
      return;
    }

    // Insert first_name and last_name as user metadata
    const { user } = session;

    const { error: metadataError } = await supabase.auth.updateUser({
      data: {
        first_name: firstname,
        last_name: lastname,
      },
    })

    if (metadataError) {
      Alert.alert("Error updating user metadata", metadataError.message)
    } else {
      Alert.alert("Account created successfully, check your email for verification!")
    }

    setLoading(false)
  }

  return (
    <MainContCircle showPetImage={true} paddingHorizontal={dimensions.screenWidth * 0.08}>
      <View style={styles.header}>
        <Title1 
          text='Sign Up' 
          fontSize={dimensions.screenWidth * 0.08} 
          lineHeight={dimensions.screenWidth * 0.1}
        />
        <Subtitle1 
          text='Start today your Furry Account'
          fontSize={dimensions.screenWidth * 0.038}
          fontFamily='Poppins-Regular'
          opacity={0.7}
        />
      </View>
      <View>
        <CustomTextInput
          label="First Name"
          value={firstname}
          onChangeText={setFirstname}
          placeholder="Enter your First Name"
          iconName="account"
          marginTop={dimensions.screenHeight * 0.035}
          marginBottom={dimensions.screenHeight * 0.03}
        />
        <CustomTextInput
          label="Last Name"
          value={lastname}
          onChangeText={setLastname}
          placeholder="Enter your Last Name"
          iconName="account"
          marginTop={dimensions.screenHeight * 0.0}
          marginBottom={dimensions.screenHeight * 0.03}
        />
        <CustomTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          iconName="email"
          keyboardType="email-address"
          marginBottom={dimensions.screenHeight * 0.03}
        />
        <CustomTextInput
          value={password}
          label="Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
          iconName="lock"
          marginBottom={dimensions.screenHeight * 0.07}
        />
        <Button1 title="Continue" isPrimary={true} borderRadius={15} onPress={signUpWithEmail} />
      </View>
    </MainContCircle>
  )
}

export default SignUp

const styles = StyleSheet.create({
  header: {
    marginTop: dimensions.screenHeight * 0.1,
    alignItems: 'flex-start'
  }
})
