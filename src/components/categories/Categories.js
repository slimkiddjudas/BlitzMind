import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import categories from './CategoryData';
import Colors from "../../constants/Colors";

function Categories() {
    const navigation = useNavigation();

    const handleOnPress = (component) => {
        navigation.navigate(component);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryButton}
            activeOpacity={0.7}
            onPress={() => handleOnPress(item?.component)}
        >
            <Text style={styles.categoryText}>{item.categoryName}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Oyunlar</Text>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item.categoryId}
                numColumns={2}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.accent,
        marginBottom: 15,
        textAlign: 'center',
    },
    listContent: {
        alignItems: 'center',
    },
    categoryButton: {
        backgroundColor: Colors.primary,
        borderRadius: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
});

export default Categories;
