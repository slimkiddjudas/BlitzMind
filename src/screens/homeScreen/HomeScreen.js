import React from 'react';
import {Pressable, Text, View, StyleSheet, TouchableOpacity, Image, FlatList} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Categories from "../../components/categories/Categories";
import {ScreenWrapper} from "react-native-screen-wrapper";

function HomeScreen() {

    const navigation = useNavigation();
    const screens = [
        {
            screenId: 1,
            screenName: "Catch The Box ScoreBoard",
            component: "CatchTheBoxScoreBoardScreen",
        },
        {
            screenId: 2,
            screenName: "Reflex Game ScoreBoard",
            component: "ReflexGameScoreBoardScreen",
        }
    ];
    const handleRenderItem = (component) => {
        navigation.navigate(component)
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>BlitzMind</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("WelcomeScreen")}>
                    <Text style={styles.logoutText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.banner}>
                <Image source={require('../../../assets/deneme.jpg')} style={ {width: 250, height: 250} }/>
                {screens.map((item) => (<TouchableOpacity key={item.screenId} onPress={() => handleRenderItem(item.component)}>
                    <Text>{item.screenName}</Text>
                </TouchableOpacity>))}
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