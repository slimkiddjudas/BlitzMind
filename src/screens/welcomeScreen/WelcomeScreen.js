import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
const { height } = Dimensions.get("window");

function WelcomeScreen() {

    const navigation = useNavigation()

    return (
        <SafeAreaView>
            <View>
                {/*<ImageBackground
                    style={{
                        height: height / 2.5,
                    }}
                    resizeMode="contain"
                    source={require("../../../assets/deneme.jpg")}
                />*/}
                <View
                    style={{
                        paddingHorizontal: Spacing * 4,
                        paddingTop: Spacing * 4,
                    }}
                >
                    <Text
                        style={{
                            fontSize: FontSize.xxLarge,
                            color: Colors.primary,
                            //fontFamily: Font["poppins-bold"],
                            textAlign: "center",
                        }}
                    >
                        BlitzMind
                    </Text>

                    <Text
                        style={{
                            fontSize: FontSize.small,
                            color: Colors.text,
                            //fontFamily: Font["poppins-regular"],
                            textAlign: "center",
                            marginTop: Spacing * 2,
                        }}
                    >
                        Hafızanı, Refleksini ve Zekanı Ölçmeye Hazır mısın?
                        Yıldırım Gibi!
                    </Text>
                </View>
                <View
                    style={{
                        paddingHorizontal: Spacing * 2,
                        paddingTop: Spacing * 6,
                        flexDirection: "row",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("LoginScreen")}
                        style={{
                            backgroundColor: Colors.primary,
                            paddingVertical: Spacing * 1.5,
                            paddingHorizontal: Spacing * 2,
                            width: "48%",
                            borderRadius: Spacing,
                            shadowColor: Colors.primary,
                            shadowOffset: {
                                width: 0,
                                height: Spacing,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: Spacing,
                        }}
                    >
                        <Text
                            style={{
                                //fontFamily: Font["poppins-bold"],
                                color: Colors.onPrimary,
                                fontSize: FontSize.large,
                                textAlign: "center",
                            }}
                        >
                            Giriş Yap
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("RegisterScreen")}
                        style={{
                            paddingVertical: Spacing * 1.5,
                            paddingHorizontal: Spacing * 2,
                            width: "48%",
                            borderRadius: Spacing,
                        }}
                    >
                        <Text
                            style={{
                                //fontFamily: Font["poppins-bold"],
                                color: Colors.text,
                                fontSize: FontSize.large,
                                textAlign: "center",
                            }}
                        >
                            Kayıt Ol
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default WelcomeScreen;