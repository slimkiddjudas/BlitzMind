import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Pressable,
    Alert,
} from "react-native";
import Cell from "../../../components/ticTacToe/Cell";

const emptyMap = [
    ["", "", ""], // 1st row
    ["", "", ""], // 2nd row
    ["", "", ""], // 3rd row
];

const copyArray = (original) => {
    const copy = original.map((arr) => {
        return arr.slice();
    });
    return copy;
};

export default function TicTacToeGameScreen() {
    const [map, setMap] = useState(emptyMap);
    const [currentTurn, setCurrentTurn] = useState("x");
    const [gameMode, setGameMode] = useState("BOT_MEDIUM");

    useEffect(() => {
        if (currentTurn === "o" && gameMode !== "LOCAL") {
            botTurn();
        }
    }, [currentTurn, gameMode]);

    useEffect(() => {
        const winner = getWinner(map);
        if (winner) {
            gameWon(winner);
        } else {
            checkTieState();
        }
    }, [map]);

    const onPress = (rowIndex, columnIndex) => {
        if (map[rowIndex][columnIndex] !== "") {
            Alert.alert("Bu kare zaten alınmış.");
            return;
        }

        setMap((existingMap) => {
            const updatedMap = [...existingMap];
            updatedMap[rowIndex][columnIndex] = currentTurn;
            return updatedMap;
        });

        setCurrentTurn(currentTurn === "x" ? "o" : "x");
    };

    const getWinner = (winnerMap) => {
        for (let i = 0; i < 3; i++) {
            const isRowXWinning = winnerMap[i].every((cell) => cell === "x");
            const isRowOWinning = winnerMap[i].every((cell) => cell === "o");

            if (isRowXWinning) {
                return "x";
            }
            if (isRowOWinning) {
                return "o";
            }
        }

        for (let col = 0; col < 3; col++) {
            let isColumnXWinner = true;
            let isColumnOWinner = true;

            for (let row = 0; row < 3; row++) {
                if (winnerMap[row][col] !== "x") {
                    isColumnXWinner = false;
                }
                if (winnerMap[row][col] !== "o") {
                    isColumnOWinner = false;
                }
            }

            if (isColumnXWinner) {
                return "x";
            }
            if (isColumnOWinner) {
                return "o";
            }
        }

        let isDiagonal1OWinning = true;
        let isDiagonal1XWinning = true;
        let isDiagonal2OWinning = true;
        let isDiagonal2XWinning = true;
        for (let i = 0; i < 3; i++) {
            if (winnerMap[i][i] !== "o") {
                isDiagonal1OWinning = false;
            }
            if (winnerMap[i][i] !== "x") {
                isDiagonal1XWinning = false;
            }

            if (winnerMap[i][2 - i] !== "o") {
                isDiagonal2OWinning = false;
            }
            if (winnerMap[i][2 - i] !== "x") {
                isDiagonal2XWinning = false;
            }
        }

        if (isDiagonal1OWinning || isDiagonal2OWinning) {
            return "o";
        }
        if (isDiagonal1XWinning || isDiagonal2XWinning) {
            return "x";
        }
    };

    const checkTieState = () => {
        if (!map.some((row) => row.some((cell) => cell === ""))) {
            Alert.alert(`Berabere!`, `tie`, [
                {
                    text: "Yeniden Başla",
                    onPress: resetGame,
                },
            ]);
        }
    };

    const gameWon = (player) => {
        Alert.alert(`İşte buuuu!`, `${player} kazandı!`, [
            {
                text: "Yeniden Başla",
                onPress: resetGame,
            },
        ]);
    };

    const resetGame = () => {
        setMap([
            ["", "", ""], // 1st row
            ["", "", ""], // 2nd row
            ["", "", ""], // 3rd row
        ]);
        setCurrentTurn("x");
    };

    const botTurn = () => {
        const possiblePositions = [];
        map.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell === "") {
                    possiblePositions.push({ row: rowIndex, col: columnIndex });
                }
            });
        });

        let chosenOption;

        if (gameMode === "BOT_MEDIUM") {
            // Attack
            possiblePositions.forEach((possiblePosition) => {
                const mapCopy = copyArray(map);

                mapCopy[possiblePosition.row][possiblePosition.col] = "o";

                const winner = getWinner(mapCopy);
                if (winner === "o") {
                    // Attack that position
                    chosenOption = possiblePosition;
                }
            });

            if (!chosenOption) {
                // Defend
                // Check if the opponent WINS if it takes one of the possible Positions
                possiblePositions.forEach((possiblePosition) => {
                    const mapCopy = copyArray(map);

                    mapCopy[possiblePosition.row][possiblePosition.col] = "x";

                    const winner = getWinner(mapCopy);
                    if (winner === "x") {
                        // Defend that position
                        chosenOption = possiblePosition;
                    }
                });
            }
        }

        // choose random
        if (!chosenOption) {
            chosenOption =
                possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
        }

        if (chosenOption) {
            onPress(chosenOption.row, chosenOption.col);
        }
    };

    return (
        <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 24,
                        color: "white",
                        position: "absolute",
                        top: 50,
                    }}
                >
                    Current Turn: {currentTurn.toUpperCase()}
                </Text>
                <View style={styles.map}>
                    {map.map((row, rowIndex) => (
                        <View key={`row-${rowIndex}`} style={styles.row}>
                            {row.map((cell, columnIndex) => (
                                <Cell
                                    key={`row-${rowIndex}-col-${columnIndex}`}
                                    cell={cell}
                                    onPress={() => onPress(rowIndex, columnIndex)}
                                />
                            ))}
                        </View>
                    ))}
                </View>

                <View style={styles.buttons}>
                    <Text
                        onPress={() => setGameMode("LOCAL")}
                        style={[
                            styles.button,
                            { backgroundColor: gameMode === "LOCAL" ? "#4F5686" : "#191F24" },
                        ]}
                    >
                        Local
                    </Text>
                    <Text
                        onPress={() => setGameMode("BOT_EASY")}
                        style={[
                            styles.button,
                            {
                                backgroundColor:
                                    gameMode === "BOT_EASY" ? "#4F5686" : "#191F24",
                            },
                        ]}
                    >
                        Easy Bot
                    </Text>
                    <Text
                        onPress={() => setGameMode("BOT_MEDIUM")}
                        style={[
                            styles.button,
                            {
                                backgroundColor:
                                    gameMode === "BOT_MEDIUM" ? "#4F5686" : "#191F24",
                            },
                        ]}
                    >
                        Medium Bot
                    </Text>
                </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7D0D0",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "80%",
        aspectRatio: 1,
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    buttons: {
        position: "absolute",
        bottom: 50,
        flexDirection: "row",
    },
    button: {
        color: "white",
        margin: 10,
        fontSize: 16,
        backgroundColor: "#191F24",
        padding: 10,
        paddingHorizontal: 15,
    },
});