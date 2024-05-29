import React, {useContext, useEffect} from 'react';
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import AppContext from "../../../context/AppContext";
import {firebase} from "../../../../firebaseConfig";

function ReflexGameFinishScreen() {

    const {backgroundColor, reactionTime} = useContext(AppContext)
    const navigation = useNavigation()
    const userId = firebase.auth().currentUser.uid;

    const restartGame = async () => {
        const scoreData = {userId: userId, reactionTime: reactionTime};
        await firebase.firestore().collection('ReflexGameScoreBoard').add(scoreData).then()
        navigation.navigate("HomeScreen")
    }

    return (
        <View style={[styles.container, {backgroundColor} ]}>
            <View>
                <Text style={styles.reactionTimeText}>
                    Tepki süresi: {reactionTime} saniye
                </Text>
                <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                    <Text style={styles.restartButtonText}>Ana Sayfaya Dön</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reactionTimeText: {
        fontSize: 16,
        color: 'white',
        marginTop: 20,
    },
    restartButton: {
        marginTop: 20,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    restartButtonText: {
        fontSize: 16,
    },
})

export default ReflexGameFinishScreen;