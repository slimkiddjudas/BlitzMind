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
        backgroundColor: "blue",
        borderRadius: 10
    },
    icon: {
        backgroundColor: Colors.primary500,
        //borderRadius: iconSize / 2, // Kare içindeki yuvarlaklık
        alignItems: 'center',
        justifyContent: 'center',
        //width: iconSize + 20,
        //height: iconSize + 20,
        marginBottom: 5, // İkon altındaki boşluğu ayarlar
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