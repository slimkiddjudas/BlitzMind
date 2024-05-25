import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NUMBERS_COUNT = 10; // Toplam sayı miktarı
const DISPLAY_TIME = 6000; // Sayıların ekranda kalma süresi (milisaniye cinsinden)

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const EvenOddReflexGameScreen = () => {
    const [numbers, setNumbers] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isOdd, setIsOdd] = useState(true); // true: tek sayılar, false: çift sayılar

    useEffect(() => {
        const randomNumbers = Array.from({ length: NUMBERS_COUNT }, () =>
            getRandomInt(1, 100)
        );
        setNumbers(randomNumbers);

        const displayTimeout = setTimeout(() => {
            setNumbers([]);
            setIsOdd(Math.random() < 0.5); // Rastgele tek ya da çift sayılar seç
            setTimeout(() => {
                const randomIndex = getRandomInt(0, NUMBERS_COUNT - 1);
                setSelectedIndices([randomIndex]);
            }, 1000);
        }, DISPLAY_TIME);

        return () => clearTimeout(displayTimeout);
    }, []);

    const handleNumberPress = (index) => {
        if (gameOver || selectedIndices.includes(index)) return;

        const number = numbers[index];
        const isNumberOdd = number % 2 !== 0;

        if ((isOdd && isNumberOdd) || (!isOdd && !isNumberOdd)) {
            setScore((prevScore) => prevScore + 1);
        } else {
            setGameOver(true);
        }

        setSelectedIndices((prevIndices) => [...prevIndices, index]);

        if (selectedIndices.length + 1 === NUMBERS_COUNT) {
            const allOddSelected = numbers.every((num, i) => (num % 2 !== 0 && selectedIndices.includes(i)));
            const allEvenSelected = numbers.every((num, i) => (num % 2 === 0 && selectedIndices.includes(i)));
            if ((isOdd && allOddSelected) || (!isOdd && allEvenSelected)) {
                setGameOver(true);
            }
        }
    };

    const renderNumbers = () => {
        return numbers.map((number, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.numberButton,
                    selectedIndices.includes(index) && styles.selectedNumberButton,
                ]}
                onPress={() => handleNumberPress(index)}
                disabled={gameOver}
            >
                <Text style={styles.numberText}>{number}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.score}>Puan: {score}</Text>
            <Text style={styles.instructions}>
                {isOdd ? 'Tek sayıları işaretleyin' : 'Çift sayıları işaretleyin'}
            </Text>
            <View style={styles.numbersContainer}>{renderNumbers()}</View>
            {gameOver && <Text style={styles.gameOverText}>Oyunu kaybettiniz!</Text>}
            {score === NUMBERS_COUNT && !gameOver && (
                <Text style={styles.gameOverText}>Oyunu kazandınız!</Text>
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
        marginBottom: 10,
    },
    instructions: {
        fontSize: 18,
        marginBottom: 20,
    },
    numbersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    numberButton: {
        width: 80,
        height: 80,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
    },
    selectedNumberButton: {
        backgroundColor: 'lightgreen',
    },
    numberText: {
        fontSize: 24,
    },
    gameOverText: {
        fontSize: 24,
        marginTop: 20,
        color: 'red',
    },
});

export default EvenOddReflexGameScreen;
