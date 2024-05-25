import React from 'react';
import {FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View} from "react-native";
import CategoryHeader from "./CategoryHeader";
import categories from "./CategoryData";
import {useNavigation} from "@react-navigation/native";
import CategoryItem from "./CategoryItem";

function Categories() {

    const navigation = useNavigation()

    const handleOnPress = (component) => {
        navigation.navigate(component)
    }

    const renderItem = ({item}) => (
        <View>
            <TouchableOpacity activeOpacity={.1} onPress={() => handleOnPress(item?.component)}>
                <CategoryItem name={item.categoryName} />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <CategoryHeader name="Oyunlar"/>
            <FlatList
                horizontal={false}
                numColumns={2}
                keyExtractor={(item) => item.categoryId}
                data={categories}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Categories;