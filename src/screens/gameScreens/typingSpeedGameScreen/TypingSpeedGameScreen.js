import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {words} from "../../../constants/Words";

function TypingSpeedGameScreen() {

    const [typedWord, setTypedWord] = useState("");
    const [randomWord, setRandomWord] = useState(words[Math.floor(Math.random() * words.length)])
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const gameTimer = setTimeout(() => {
            setGameOver(true);
        }, 30000); // Oyun süresi 30 saniye olarak değiştirildi
        return () => clearTimeout(gameTimer);
    }, []);

    useEffect(() => {
        if (!gameOver) {
            if (typedWord === randomWord) {
                setScore(score + 1);
                setRandomWord(words[Math.floor(Math.random() * words.length)])
                setTypedWord("")
            }
        }
        return () => alert("Oyun Bitti!");
    }, []);

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text>
                {randomWord}
            </Text>
            <TextInput value={typedWord} onChangeText={(text) => setTypedWord(text)} />
            <Text>{score}</Text>
        </View>
    );
}

export default TypingSpeedGameScreen;