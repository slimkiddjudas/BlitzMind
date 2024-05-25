import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const ArithmeticSpeedGameScreen = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const TIME_LIMIT = 18000; // 18 saniye

    useEffect(() => {
        generateQuestions();
        const timer = setTimeout(() => {
            setGameOver(true);
        }, TIME_LIMIT);
        return () => clearTimeout(timer);
    }, []);

    const generateQuestions = () => {
        const newQuestions = [];
        const newAnswers = [];
        for (let i = 0; i < 5; i++) {
            const num1 = Math.floor(Math.random() * 20) + 1;
            const num2 = Math.floor(Math.random() * 20) + 1;
            const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
            let question;
            let answer;
            switch (operator) {
                case '+':
                    question = `${num1} + ${num2}`;
                    answer = num1 + num2;
                    break;
                case '-':
                    question = `${num1} - ${num2}`;
                    answer = num1 - num2;
                    break;
                case '*':
                    question = `${num1} * ${num2}`;
                    answer = num1 * num2;
                    break;
                case '/':
                    question = `${num1 * num2} / ${num2}`;
                    answer = num1;
                    break;
                default:
                    break;
            }
            newQuestions.push(question);
            newAnswers.push(answer);
        }
        setQuestions(newQuestions);
        setAnswers(newAnswers);
        setUserAnswers(new Array(5).fill(''));
    };

    const handleAnswerChange = (text) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = text;
        setUserAnswers(newAnswers);
    };

    const handleAnswerSubmit = () => {
        const userAnswer = parseFloat(userAnswers[currentQuestionIndex]);
        if (!isNaN(userAnswer) && userAnswer === answers[currentQuestionIndex]) {
            setScore((prevScore) => prevScore + 1);
        } else {
            setGameOver(true); // Yanlış cevap verildiğinde oyunu sonlandır
            //setScore(0); // Yanlış cevap verildiğinde skoru sıfırla
        }
        if (currentQuestionIndex === 4) {
            setGameOver(true);
        } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <View style={styles.container}>
            {gameOver ? (
                <Text style={styles.gameOverText}>Oyun Bitti! Skor: {score}</Text>
            ) : (
                <>
                    <Text style={styles.score}>Score: {score}</Text>
                    <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
                    <TextInput
                        style={styles.answerInput}
                        keyboardType="numeric"
                        onChangeText={handleAnswerChange}
                        value={userAnswers[currentQuestionIndex]}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleAnswerSubmit}>
                        <Text style={styles.buttonText}>Cevapla</Text>
                    </TouchableOpacity>
                </>
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
    question: {
        fontSize: 18,
        marginBottom: 20,
    },
    answerInput: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
    },
    gameOverText: {
        fontSize: 24,
        color: 'red',
    },
});

export default ArithmeticSpeedGameScreen;
