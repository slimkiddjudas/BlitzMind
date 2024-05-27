import React from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const windowWidth = Dimensions.get('window').width;

function CategoryItem({name}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        padding: 5,
        width: windowWidth / 3 - 10, // İkonlar arasındaki boşluğu ayarlayabilirsiniz.
        aspectRatio: 1, // Kare şeklindeki kutuları sağlar,
        backgroundColor: "#F7D0D0",
        borderRadius: 10
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
    }
});

export default CategoryItem;