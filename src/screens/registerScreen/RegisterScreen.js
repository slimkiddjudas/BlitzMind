import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, {useState} from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {auth} from "../../../firebaseConfig";
import AppTextInput from "../../components/AppTextInput";

const RegisterScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match");
        }
        else{
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    const userId = user.uid;
                    console.log("User", user.email);
                    Alert.alert(
                        "Kayıt Başarılı",
                        "Başarılı bir biçimde kaydoldunuz.",
                        [{ text: "Tamam", onPress: () => console.log("OK Pressed") }]
                    );
                    navigation.navigate("HomeScreen");
                })
                .catch((error) => alert(error.message));
        }
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    padding: Spacing * 2,
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: FontSize.xLarge,
                            color: Colors.primary,
                            marginVertical: Spacing * 3,
                        }}
                    >
                        Hesap Oluştur
                    </Text>
                    <Text
                        style={{
                            fontSize: FontSize.small,
                            maxWidth: "80%",
                            textAlign: "center",
                        }}
                    >
                        Birbirinden eğlenceli oyunlara erişebilmek için üye ol!
                    </Text>
                </View>
                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}
                >
                    <AppTextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" />
                    <AppTextInput secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} placeholder="Password" />
                    <AppTextInput secureTextEntry={true} value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} placeholder="Confirm Password" />
                </View>

                <TouchableOpacity
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: Colors.primary,
                        marginVertical: Spacing * 3,
                        borderRadius: Spacing,
                        shadowColor: Colors.primary,
                        shadowOffset: {
                            width: 0,
                            height: Spacing,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: Spacing,
                    }}
                    onPress={() => handleRegister()}
                >
                    <Text
                        style={{
                            color: Colors.onPrimary,
                            textAlign: "center",
                            fontSize: FontSize.large,
                        }}
                    >
                        Kayıt Ol
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("LoginScreen")}
                    style={{
                        padding: Spacing,
                    }}
                >
                    <Text
                        style={{
                            color: Colors.text,
                            textAlign: "center",
                            fontSize: FontSize.small,
                        }}
                    >
                        Hesabın Var Mı?
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}
                >
                    <Text
                        style={{
                            color: Colors.primary,
                            textAlign: "center",
                            fontSize: FontSize.small,
                        }}
                    >
                        Veya Şununla Devam Et
                    </Text>

                    <View
                        style={{
                            marginTop: Spacing,
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: Colors.gray,
                                borderRadius: Spacing / 2,
                                marginHorizontal: Spacing,
                            }}
                        >
                            <Ionicons
                                name="logo-google"
                                color={Colors.text}
                                size={Spacing * 2}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: Colors.gray,
                                borderRadius: Spacing / 2,
                                marginHorizontal: Spacing,
                            }}
                        >
                            <Ionicons
                                name="logo-apple"
                                color={Colors.text}
                                size={Spacing * 2}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: Colors.gray,
                                borderRadius: Spacing / 2,
                                marginHorizontal: Spacing,
                            }}
                        >
                            <Ionicons
                                name="logo-facebook"
                                color={Colors.text}
                                size={Spacing * 2}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;