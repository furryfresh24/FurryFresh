import { StyleSheet, Text, View, Animated, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import dimensions from '../../utils/sizing';
import { router, useLocalSearchParams } from 'expo-router';
import { useSession } from '../../context/sessions_context';
import { usePet } from '../../context/pet_context';
import Pets from '../../interfaces/pets';
import { Ionicons } from '@expo/vector-icons';

type Props = {};

const MatchedScreen = (props: Props) => {
    const { session } = useSession();
    const { pets } = usePet();

    const moveAnim = useRef(new Animated.Value(0)).current;
    const detailsOpacity = useRef(new Animated.Value(0)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;

    const { mutualMath, insertedMatch, usedPet, matchedPet } = useLocalSearchParams();

    const parsedMutualMatch = mutualMath ? JSON.parse(mutualMath as string) : null;
    const parsedInsertedMatch = insertedMatch ? JSON.parse(insertedMatch as string) : null;
    const parsedUsedPet = usedPet ? JSON.parse(usedPet as string) as Pets : null;
    const parsedMatchedPet = matchedPet ? JSON.parse(matchedPet as string) as Pets : null;

    const petUsed = pets.find((pet) => pet.id == parsedInsertedMatch?.used_pet_id);

    useEffect(() => {
        const timer = setTimeout(() => {
            Animated.sequence([
                Animated.timing(moveAnim, {
                    toValue: -dimensions.screenHeight * 0.13,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(detailsOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.delay(500),
                Animated.timing(buttonOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleContinue = () => {
        console.log('Continue pressed!');

        router.back();
    };

    return (
        <View style={styles.mainCont}>
            <Ionicons name='paw' size={dimensions.screenWidth * 0.5} color="#f29430" style={[styles.pawStyle, styles.topPaw]} />
            <Ionicons name='paw' size={dimensions.screenWidth * 0.5} color="#f29430" style={[styles.pawStyle, styles.bottomPaw]} />

            <Animated.View style={[styles.headerCont, { transform: [{ translateY: moveAnim }] }]}>
                <Text style={styles.headerTitle}>Match Found!</Text>
            </Animated.View>

            <Animated.View style={[styles.detailsCont, { opacity: detailsOpacity }]}>
                <View style={styles.petImageCont}>
                    <Image
                        source={{ uri: parsedUsedPet?.pet_avatar ?? '' }}
                        style={styles.petImage}
                    />
                    <Image
                        source={{ uri: parsedMatchedPet?.pet_avatar ?? '' }}
                        style={styles.petImage}
                    />
                </View>
                <Text style={styles.detailsText}>{parsedUsedPet?.name} has found a playmate!</Text>
            </Animated.View>

            <Animated.View style={[styles.buttonCont, { opacity: buttonOpacity }]}>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default MatchedScreen;

const styles = StyleSheet.create({
    pawStyle: {
        position: 'absolute',
    },
    topPaw: {
        top: -dimensions.screenHeight * 0.045,
        left: -dimensions.screenWidth * 0.06,
        transform: 'rotate(120deg)'
    },
    bottomPaw: {
        bottom: -dimensions.screenHeight * 0.045,
        right: -dimensions.screenWidth * 0.06,
        transform: 'rotate(-30deg)'
    },
    mainCont: {
        backgroundColor: '#ffa545',
        flex: 1,
        width: dimensions.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    headerCont: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
        fontSize: dimensions.screenWidth * 0.1,
    },
    detailsCont: {
        marginTop: 0,
        alignItems: 'center',
    },
    detailsText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        color: '#fff',
    },
    petImageCont: {
        flexDirection: 'row',
        gap: dimensions.screenWidth * 0.05,
        marginBottom: dimensions.screenHeight * 0.02,
    },
    petImage: {
        width: dimensions.screenWidth * 0.22,
        height: dimensions.screenWidth * 0.22,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2,
    },
    buttonCont: {
        position: 'absolute',
        bottom: dimensions.screenHeight * 0.1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: dimensions.screenHeight * 0.02,
        paddingHorizontal: 40,
        borderRadius: 30,
        width: dimensions.screenWidth * 0.8,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#ffa545',
    },
});
