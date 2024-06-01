import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {firebase} from "../../../../firebaseConfig";
import {useNavigation} from "@react-navigation/native";

const CatchTheBoxGameScreen = () => {
    const [squarePosition, setSquarePosition] = useState({ x: 0, y: 0 });
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const { width, height } = Dimensions.get('window'); // Ekranın genişliği ve yüksekliği
    const userId = firebase.auth().currentUser.uid;
    const navigation = useNavigation();

    useEffect(() => {
        const gameTimer = setTimeout(() => {
            setGameOver(true);
        }, 20000); // Oyun süresi 20 saniye olarak değiştirildi
        return () => clearTimeout(gameTimer);
    }, []);

    useEffect(() => {
        if (!gameOver) {
            const squareInterval = setInterval(() => {
                const randomX = Math.floor(Math.random() * (width - 100)); // Kare boyutu 100x100 olarak ayarlandı
                const randomY = Math.floor(Math.random() * (height - 100)); // Kare boyutu 100x100 olarak ayarlandı
                setSquarePosition({ x: randomX, y: randomY });
            }, 1200); // Kare belirme gecikmesi 1.2 saniye olarak değiştirildi
            return () => clearInterval(squareInterval);
        }
    }, [width, height, gameOver]); // Genişlik, yükseklik ve gameOver bağımlılıkları eklendi

    const handleSquarePress = () => {
        if (!gameOver) {
            setScore(prevScore => prevScore + 1);
            const randomX = Math.floor(Math.random() * (width - 100)); // Kare boyutu 100x100 olarak ayarlandı
            const randomY = Math.floor(Math.random() * (height - 100)); // Kare boyutu 100x100 olarak ayarlandı
            setSquarePosition({ x: randomX, y: randomY });
        }
    };

    const handleRestartGame = async () => {
        const scoreRef = firebase.firestore().collection('CatchTheBoxScoreBoard').doc(userId);
        const doc = await scoreRef.get();

        if (doc.exists) {
            const existingScore = doc.data().score;
            if (score > existingScore) {
                await scoreRef.update({ score: score });
            }
        } else {
            await scoreRef.set({ userId: userId, score: score });
        }

        navigation.navigate("HomeScreen");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.score}>Skor: {score}</Text>
            <TouchableOpacity
                style={[styles.square, { left: squarePosition.x, top: squarePosition.y }]}
                onPress={handleSquarePress}
                disabled={gameOver}
            />
            {gameOver && (
                <View>
                    <Text style={styles.gameOverText}>Oyun bitti!</Text>
                    <TouchableOpacity style={styles.restartButton} onPress={handleRestartGame}>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    score: {
        fontSize: 24,
        marginBottom: 20,
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        position: 'absolute',
    },
    gameOverText: {
        fontSize: 24,
        color: 'red',
        marginBottom: 20,
    },
    restartButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 10,
    },
    restartButtonText: {
        fontSize: 18,
    },
});

export default CatchTheBoxGameScreen;
