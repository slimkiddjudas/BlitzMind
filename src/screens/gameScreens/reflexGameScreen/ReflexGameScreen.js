import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from "@react-navigation/native";
import AppContext from "../../../context/AppContext";

const ReflexGameScreen = () => {

    const {backgroundColor, setBackgroundColor,  setReactionTime, startGame, startTime} = useContext(AppContext)
    const navigation = useNavigation();

    useEffect(() => {
        startGame();
    }, []);

    const handleButtonPress = () => {
        if (backgroundColor === 'green') {
            const endTime = new Date().getTime();
            const reaction = (endTime - startTime) / 1000; // Reaction time in seconds
            setReactionTime(reaction.toFixed(2)); // Rounded to 2 decimal places
            navigation.navigate("ReflexGameFinish")
        } else {
            // Handle premature button press
            alert('Beklemeden butona basıldı!');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.text}>Ekran Yeşile Dönünce Butona Bas ve Refleksini ölç!</Text>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>BUTON</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
    }
});

export default ReflexGameScreen;
