import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import AppbarDefault from '../../../components/bars/appbar_default'
import { useSession } from '../../../context/sessions_context'
import dimensions from '../../../utils/sizing'
import { Ionicons } from '@expo/vector-icons'
import Spacer from '../../../components/general/spacer'
import MainContPaw from '../../../components/general/background_paw'
import MainPetCare from '../petcare/main'

type Props = {}

const Dashboard = (props: Props) => {
  const { session } = useSession();

  const [selectedTab, setSelectedTab] = useState<'petcare' | 'petsupplies'>('petcare');

  return (
    <View style={{ flex: 1 }}>
      {
        <AppbarDefault
          session={session}
          leadingChildren={null}
          showLeading={false}
          showBack={false}
          titleSize={0}
          paddingBottom={dimensions.screenHeight * 0.013}
          paddingTop={dimensions.screenHeight * 0.05}
        >
          <View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={styles.profileImage}>
                {
                  session?.user.user_metadata['avatar_url'] ? (
                    <Image
                      source={require("../../../assets/images/general/pet-enjoy.png")}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Ionicons name="person" style={{ alignSelf: 'center', alignContent: 'center', color: 'white' }} size={dimensions.screenWidth * 0.05} />
                  )
                }
              </View>
              <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: dimensions.screenWidth * 0.03,
                    lineHeight: dimensions.screenWidth * 0.04,
                    color: '#808080'
                  }}
                >Admin</Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: dimensions.screenWidth * 0.037,
                    lineHeight: dimensions.screenWidth * 0.05
                  }}
                >{session?.user.user_metadata['first_name']}</Text>
              </View>
            </View>
            <Spacer height={dimensions.screenHeight * 0.02} />
            <View style={[styles.tabContainer, { backgroundColor: 'white' }]}>
              <TouchableOpacity style={[styles.tab, selectedTab === 'petcare' && styles.activeTabCont]} onPress={() => setSelectedTab('petcare')}>
                <Text style={[styles.tabText, selectedTab === 'petcare' && styles.tabTextActive]}>
                  Pet Care
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.tab, selectedTab === 'petsupplies' && styles.activeTabCont]} onPress={() => setSelectedTab('petsupplies')}>
                <Text style={[styles.tabText, selectedTab === 'petsupplies' && styles.tabTextActive]}>
                  Pet Supplies
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </AppbarDefault>
      }
      <MainContPaw> 
        { 
          selectedTab === 'petcare' ? <MainPetCare /> : <></>
        }
      </MainContPaw>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: dimensions.screenHeight * 0.01
  },
  activeTabCont: {
    backgroundColor: '#466AA2',
    borderRadius: 30
  }, 
  tabText: {
    fontSize: dimensions.screenWidth * 0.035,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  tabTextActive: {
    color: '#fff',
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
  profileImage: {
    width: dimensions.screenWidth * 0.1,
    height: dimensions.screenWidth * 0.1,
    marginRight: dimensions.screenWidth * 0.04,
    borderRadius: 100,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: "#b1bfda",
  },
});