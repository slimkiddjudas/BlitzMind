import React from 'react';
import {Pressable, Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Categories from "../../components/categories/Categories";
import {ScreenWrapper} from "react-native-screen-wrapper";

function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>BlitzMind</Text>
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.banner}>
                <Image source={require('../../../assets/deneme.jpg')} style={ {width: 250, height: 250} }/>
            </View>
            <Categories />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#ffffff',
        paddingTop: 15
    },
    headerContainer: {
        backgroundColor: '#ffffff',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    headerText: {
        color: '#000000',
        fontWeight: "bold",
        fontSize: 40
    },
    logoutButton: {
        padding: 7,
        margin: 7,
        backgroundColor: "white",
        borderRadius: 5
    },
    logoutText: {
        fontSize: 20
    },
    banner: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#7ac4ff",
        borderRadius: 15,
        marginHorizontal: 5
    }
})