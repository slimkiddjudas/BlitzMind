import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../firebaseConfig';
import Colors from "../../constants/Colors";
import Categories from '../../components/categories/Categories';

function HomeScreen() {
    const navigation = useNavigation();

    const screens = [
        { screenId: 1, screenName: "Kutuyu Yakala Skorboard", component: "CatchTheBoxScoreBoardScreen" },
        { screenId: 2, screenName: "Refleks Oyunu Skorboard", component: "ReflexGameScoreBoardScreen" }
    ];

    const handleRenderItem = (component) => {
        navigation.navigate(component);
    };

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            navigation.navigate("WelcomeScreen");
        } catch (error) {
            console.error("Çıkış yaparken bir hata oluştu:", error);
        }
    };

    const data = [
        { key: 'header' },
        ...screens
    ];

    const renderItem = ({ item }) => {
        if (item.key === 'header') {
            return (
                <>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>BlitzMind</Text>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
                        </TouchableOpacity>
                    </View>
                    <Categories />
                    <Text style={styles.sectionTitle}>Skor Tabloları</Text>
                </>
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.scoreButton}
                    onPress={() => handleRenderItem(item.component)}
                >
                    <Text style={styles.scoreButtonText}>{item.screenName}</Text>
                </TouchableOpacity>
            );
        }
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.accent,
    },
    logoutButton: {
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent,
        marginVertical: 10,
        textAlign: 'center',
    },
    scoreButton: {
        backgroundColor: Colors.secondary,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 5,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    scoreButtonText: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
