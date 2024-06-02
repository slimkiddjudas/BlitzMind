import {
    Alert,
    KeyboardAvoidingView,
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
import {auth, firebase} from "../../../firebaseConfig";
import AppTextInput from "../../components/AppTextInput";

const RegisterScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match");
        }
        else{
            signUp(email, password, firstName, lastName)
            Alert.alert(
                "Kayıt Başarılı",
                "Başarılı bir biçimde kaydoldunuz.",
                [{ text: "Tamam", onPress: () => console.log("OK Pressed") }]
            )
            navigation.navigate("HomeScreen");
            /*auth
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
                .catch((error) => alert(error.message));*/
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
                    <AppTextInput value={firstName} onChangeText={(text) => setFirstName(text)} placeholder="İsim" />
                    <AppTextInput value={lastName} onChangeText={(text) => setLastName(text)} placeholder="Soyisim" />
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
            </View>
        </SafeAreaView>
    );
};

const signUp = async (email, password, firstName, lastName) => {
    try {
        // Kullanıcıyı Firebase Authentication ile kaydet
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Firestore'da kullanıcı bilgilerini sakla
        await firebase.firestore().collection('users').doc(user.uid).set({
            firstName: firstName,
            lastName: lastName,
            email: email
        });

        console.log('User account created & signed in!');
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }

        console.error(error);
    }
};

export default RegisterScreen;