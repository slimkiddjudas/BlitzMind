import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import {useNavigation} from "@react-navigation/native";

const stages = [
    { numbers: 1, digits: 2 },
    { numbers: 2, digits: 2 },
    { numbers: 3, digits: 2 },
    { numbers: 4, digits: 3 },
    { numbers: 5, digits: 3 },
];

const MemoryGameScreen = () => {
    const [currentStage, setCurrentStage] = useState(0);
    const [currentNumbers, setCurrentNumbers] = useState([]);
    const [userInputs, setUserInputs] = useState([]);
    const [showNumbers, setShowNumbers] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        startNewStage();
    }, []);

    const startNewStage = () => {
        const stage = stages[currentStage];
        setCurrentStage(currentStage + 1);
        const newNumbers = Array.from({ length: stage.numbers }, () =>
            getRandomNumber(stage.digits)
        );
        setCurrentNumbers(newNumbers);
        setShowNumbers(true);
        setTimeout(() => {
            setShowNumbers(false);
        }, 3000);
    };

    const getRandomNumber = (digits) => {
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const checkUserInput = () => {
        const expectedNumbers = currentNumbers.map((num) => num.toString());
        if (userInputs.length !== expectedNumbers.length) {
            setGameOver(true);
            return;
        }
        for (let i = 0; i < expectedNumbers.length; i++) {
            if (expectedNumbers[i] !== userInputs[i]) {
                setGameOver(true);
                return;
            }
        }
        if (currentStage === stages.length - 1) {
            alert("Tebrikler! Kazandınız!");
            navigation.navigate("HomeScreen")
        } else {
            //setCurrentStage(currentStage + 1);
            setUserInputs([]);
            setGameOver(false);
            startNewStage();
        }
    };

    const restartGame = () => {
        /*setCurrentStage(0);
        setGameOver(false);
        setUserInputs([]);
        setCurrentNumbers([])
        startNewStage();*/
        navigation.navigate("HomeScreen")
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hafıza Oyunu</Text>
            <View style={styles.numbersContainer}>
                {showNumbers ? (
                    currentNumbers.map((number, index) => (
                        <View key={index} style={styles.numberBox}>
                            <Text style={styles.numberText}>{number}</Text>
                        </View>
                    ))
                ) : (
                    Array.from({ length: stages[currentStage].numbers - 1 }, (_, index) => (
                        <View key={index} style={styles.inputBox}>
                            <TextInput
                                style={styles.input}
                                maxLength={stages[currentStage].digits} // Her kutunun uzunluğu hanelere göre ayarlanacak
                                keyboardType="numeric"
                                placeholder={`${index + 1 }. sayı`}
                                value={userInputs[index] || ""}
                                onChangeText={(text) => {
                                    const newInputs = [...userInputs];
                                    newInputs[index] = text;
                                    setUserInputs(newInputs);
                                }}
                            />
                        </View>
                    ))
                )}
            </View>
            {!gameOver && (
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={checkUserInput}
                    >
                        <Text style={styles.submitButtonText}>Gönder</Text>
                    </TouchableOpacity>
                </View>
            )}
            {gameOver && (
                <View style={styles.gameOverContainer}>
                    <Text style={styles.gameOverText}>Oyun Bitti!</Text>
                    <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                        <Text style={styles.restartButtonText}>Ana Menüye Dön</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    numbersContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    numberBox: {
        backgroundColor: "lightblue",
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    numberText: {
        fontSize: 24,
    },
    inputContainer: {
        alignItems: "center",
    },
    inputBox: {
        marginVertical: 10,
    },
    input: {
        width: 45,
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        textAlign: "center",
    },
    submitButton: {
        backgroundColor: "blue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    submitButtonText: {
        fontSize: 16,
        color: "white",
    },
    gameOverContainer: {
        alignItems: "center",
    },
    gameOverText: {
        fontSize: 24,
        marginBottom: 10,
    },
    restartButton: {
        backgroundColor: "blue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    restartButtonText: {
        fontSize: 16,
        color: "white",
    },
});

export default MemoryGameScreen;
