import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { firebase } from "../../../../firebaseConfig";

function CatchTheBoxScoreBoardScreen() {
    const [scoreBoard, setScoreBoard] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await firebase.firestore().collection("CatchTheBoxScoreBoard").get();
                const scores = snapshot.docs.map(doc => doc.data());
                setScoreBoard(scores);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <View>
            {scoreBoard.map((score, index) => (
                <Text key={index}>{score.score}</Text>
            ))}
        </View>
    );
}

export default CatchTheBoxScoreBoardScreen;