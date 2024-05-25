import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';

function CategoryHeader({name}) {
    return (
        <View style={styles.container}>
            <FontAwesome6 name="gamepad" size={36} color="black" style={{marginRight: 10}}/>
            <Text style={styles.text}>Oyunlar</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 5,
        marginVertical: 5
    },
    text : {
        fontSize: 30
    }
})

export default CategoryHeader;