import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from "../../../constants/Colors";
import { words } from '../../../constants/Words';
import {firebase} from "../../../../firebaseConfig";

const TypingSpeedGameScreen = () => {
    const navigation = useNavigation();
    const [typedWord, setTypedWord] = useState("");
    const [randomWord, setRandomWord] = useState(words[Math.floor(Math.random() * words.length)]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const userId = firebase.auth().currentUser.uid;

    useEffect(() => {
        const gameTimer = setTimeout(() => {
            setGameOver(true);
        }, 30000); // Oyun süresi 30 saniye

        const timerInterval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => {
            clearTimeout(gameTimer);
            clearInterval(timerInterval);
        };
    }, []);

    useEffect(() => {
        if (typedWord === randomWord && !gameOver) {
            setScore(score + randomWord.length);
            setRandomWord(words[Math.floor(Math.random() * words.length)]);
            setTypedWord("");
        }
    }, [typedWord, randomWord, gameOver, score]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const saveScoreToFirestore = async () => {
        const scoreRef = firebase.firestore().collection('TypingSpeedGameScoreboard').doc(userId);
        const doc = await scoreRef.get();

        if (doc.exists) {
            const existingScore = doc.data().score;
            if (score > existingScore) {
                await scoreRef.update({ score: score });
            }
        } else {
            await scoreRef.set({ userId: userId, score: score });
        }
    };

    const handleRestartGame = async () => {
        await saveScoreToFirestore();  // Restart game olduğunda mevcut skoru kaydet
        setTypedWord("");
        setRandomWord(words[Math.floor(Math.random() * words.length)]);
        setScore(0);
        setGameOver(false);
        setTimeLeft(30);
    };

    const handleGoHome = async () => {
        await saveScoreToFirestore();  // Home button pressed olduğunda mevcut skoru kaydet
        navigation.navigate("HomeScreen");
    };

    return (
        <View style={styles.container}>
            {!gameOver && (
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>Geri</Text>
                </TouchableOpacity>
            )}
            {!gameOver ? (
                <>
                    <Text style={styles.wordText}>
                        {randomWord}
                    </Text>
                    <TextInput
                        value={typedWord}
                        onChangeText={setTypedWord}
                        style={styles.input}
                        editable={!gameOver}
                        placeholder="Kelimeyi yazın"
                        placeholderTextColor={Colors.textSecondary}
                    />
                    <Text style={styles.scoreText}>Skor: {score}</Text>
                    <Text style={styles.timerText}>Kalan Süre: {timeLeft} sn</Text>
                </>
            ) : (
                <View style={styles.gameOverContainer}>
                    <Text style={styles.gameOverText}>Oyun Bitti!</Text>
                    <Text style={styles.finalScoreText}>Skor: {score}</Text>
                    <TouchableOpacity style={styles.restartButton} onPress={handleRestartGame}>
                        <Text style={styles.restartButtonText}>Yeniden Başlat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
                        <Text style={styles.homeButtonText}>Anasayfaya Dön</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    wordText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.accent,
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: Colors.primary,
        borderWidth: 2,
        width: '80%',
        textAlign: 'center',
        color: Colors.textPrimary,
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        marginBottom: 20,
    },
    gameOverContainer: {
        alignItems: 'center',
    },
    gameOverText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.accent,
        marginBottom: 20,
    },
    finalScoreText: {
        fontSize: 24,
        color: Colors.textPrimary,
        marginBottom: 20,
    },
    restartButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 10,
    },
    restartButtonText: {
        color: Colors.textSecondary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    homeButton: {
        backgroundColor: Colors.secondary,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 10,
    },
    homeButtonText: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    scoreText: {
        fontSize: 24,
        color: Colors.textPrimary,
        marginTop: 20,
    },
    timerText: {
        fontSize: 20,
        color: Colors.textPrimary,
        marginTop: 10,
    },
});

export default TypingSpeedGameScreen;
