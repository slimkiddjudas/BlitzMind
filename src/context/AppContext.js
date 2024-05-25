import {createContext, useState} from "react";

const AppContext =createContext();

export const AppProvider =({children}) => {

    const [backgroundColor, setBackgroundColor] = useState('red');
    const [reactionTime, setReactionTime] = useState(null);
    const [startTime, setStartTime] = useState(null);

    const startGame = () => {
        setBackgroundColor('red')
        const randomTime = Math.floor(Math.random() * 10) + 1; // 1 to 10 seconds
        const timeout = setTimeout(() => {
            setBackgroundColor('green');
            setStartTime(new Date().getTime());
        }, randomTime * 500);

        return () => clearTimeout(timeout);
    };

    const values ={
        backgroundColor: backgroundColor,
        setBackgroundColor: setBackgroundColor,
        reactionTime: reactionTime,
        setReactionTime: setReactionTime,
        startTime: startTime,
        startGame: startGame
    }

    return(<AppContext.Provider value={values} >{children}</AppContext.Provider>)
}

export default AppContext