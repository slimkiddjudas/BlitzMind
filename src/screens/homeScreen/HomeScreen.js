import React from 'react';
import {Pressable, Text, View, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Categories from "../../components/categories/Categories";

function HomeScreen() {
    return (
        <View style={styles.container}>
            <Categories/>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7D0D0"
    },
    gameButton : {
        margin: 50,
        backgroundColor: "red",
        borderRadius: 5,
        padding: 20
    },
    buttonText: {
        color: "white"
    }
})