import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/homeScreen/HomeScreen";
import ReflexGameScreen from "./src/screens/gameScreens/reflexGameScreen/ReflexGameScreen";
import MemoryGameScreen from "./src/screens/gameScreens/memoryGameScreen/MemoryGameScreen";
import ArithmeticSpeedGameScreen from "./src/screens/gameScreens/arithmeticSpeedGameScreen/ArithmeticSpeedGameScreen";
import CatchTheBoxGameScreen from "./src/screens/gameScreens/catchTheBoxGameScreen/CatchTheBoxGameScreen";
import EvenOddReflexGameScreen from "./src/screens/gameScreens/evenOddReflexGameScreen/EvenOddReflexGameScreen";
import TicTacToeGameScreen from "./src/screens/gameScreens/ticTacToeGameScreen/TicTacToeGameScreen";
import ReflexGameFinishScreen from "./src/screens/gameScreens/reflexGameScreen/ReflexGameFinishScreen";
import {AppProvider} from "./src/context/AppContext";
import LoginScreen from "./src/screens/loginScreen/LoginScreen";
import WelcomeScreen from "./src/screens/welcomeScreen/WelcomeScreen";
import RegisterScreen from "./src/screens/registerScreen/RegisterScreen";
import CatchTheBoxScoreBoardScreen
    from "./src/screens/scoreBoardScreens/catchTheBoxScoreBoardScreen/CatchTheBoxScoreBoardScreen";
import ReflexGameScoreBoardScreen
    from "./src/screens/scoreBoardScreens/reflexGameScoreBoardScreen/ReflexGameScoreBoardScreen";
import TypingSpeedGameScreen from "./src/screens/gameScreens/typingSpeedGameScreen/TypingSpeedGameScreen";

const Stack =createNativeStackNavigator();

export default function App() {
  return (
      <AppProvider>
          <NavigationContainer>
              <Stack.Navigator screenOptions={ {headerShown: false} }>
                  <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={ {title: "Welcome"} } />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} options={ {title: "Login Screen"} } />
                  <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={ {title: "Register Screen"} } />
                  <Stack.Screen name="HomeScreen" component={HomeScreen} options={ {title: "BlitzMind"/*, statusBarColor: "#F7D0D0", navigationBarColor: "#F7D0D0"*/} }/>
                  <Stack.Screen name="ReflexGame" component={ReflexGameScreen} options={ {title: "Refleks Oyunu"} }/>
                  <Stack.Screen name="MemoryGame" component={MemoryGameScreen} options={ {title: "Hafıza Oyunu"} }/>
                  <Stack.Screen name="ArithmeticSpeedGame" component={ArithmeticSpeedGameScreen} options={ {title: "Aritmetik Hız"} }/>
                  <Stack.Screen name="CatchTheBoxGame" component={CatchTheBoxGameScreen} options={ {title: "Kutuyu Yakala"} }/>
                  <Stack.Screen name="EvenOddReflexGame" component={EvenOddReflexGameScreen} options={ {title: "Tek-Çift Refleks"} }/>
                  <Stack.Screen name="TicTacToeGame" component={TicTacToeGameScreen} options={ {title: "XOX Oyunu"} } />
                  <Stack.Screen name="ReflexGameFinish" component={ReflexGameFinishScreen} options={ {title: "Refleks Oyunu"} }/>
                  <Stack.Screen name="CatchTheBoxScoreBoardScreen" component={CatchTheBoxScoreBoardScreen} options={ {title: "Catch The Box ScoreBoard"} } />
                  <Stack.Screen name="ReflexGameScoreBoardScreen" component={ReflexGameScoreBoardScreen} options={ {title: "Reflex Game ScoreBoard"} } />
                  <Stack.Screen name="TypingSpeedGame" component={TypingSpeedGameScreen} options={ {title: "Typing Speed Game"} } />
              </Stack.Navigator>
          </NavigationContainer>
      </AppProvider>
  );
}
