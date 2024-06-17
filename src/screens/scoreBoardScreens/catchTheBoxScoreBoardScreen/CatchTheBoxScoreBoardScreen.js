import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../../firebaseConfig';

function CatchTheBoxScoreBoardScreen() {
    const [scoreBoard, setScoreBoard] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const scoreSnapshot = await firebase.firestore()
                    .collection("CatchTheBoxScoreBoard")
                    .orderBy("score", "desc")
                    .get();

                const scores = scoreSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));

                const userPromises = scores.map(score =>
                    firebase.firestore().collection("users").doc(score.userId).get()
                );

                const userSnapshots = await Promise.all(userPromises);
                const users = userSnapshots.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const scoresWithUserDetails = scores.map(score => {
                    const user = users.find(user => user.id === score.userId);
                    return {
                        ...score,
                        firstName: user ? user.firstName : 'Bilinmeyen',
                        lastName: user ? user.lastName : 'Bilinmeyen'
                    };
                });

                setScoreBoard(scoresWithUserDetails);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={styles.backButtonText}>{"< Geri"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Kutuyu Yakala Skorboard</Text>
            <ScrollView contentContainerStyle={styles.scoreBoard}>
                {scoreBoard.map((score, index) => (
                    <View key={index} style={styles.scoreCard}>
                        <Text style={styles.scoreName}>
                            {score.firstName} {score.lastName}
                        </Text>
                        <Text style={styles.scoreValue}>
                            {score.score}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate('CatchTheBoxGame')}>
                <Text style={styles.playButtonText}>Oyunu Oyna</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3E50',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 20,
        padding: 10,
        backgroundColor: '#E74C3C',
        borderRadius: 12,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 23,
        color: '#ECF0F1',
    },
    scoreBoard: {
        alignItems: 'center',
        paddingVertical: 12,
        flexGrow: 1,
        justifyContent: 'center',
    },
    scoreCard: {
        backgroundColor: '#34495E',
        width: '90%',
        padding: 20,
        marginVertical: 10,
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scoreName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ECF0F1',
    },
    scoreValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F1C40F',
    },
    playButton: {
        marginTop: 15,
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#E74C3C',
        borderRadius: 10,
        alignItems: 'center',
    },
    playButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CatchTheBoxScoreBoardScreen;
