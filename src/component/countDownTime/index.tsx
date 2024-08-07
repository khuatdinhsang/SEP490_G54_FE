import React, { useState, useEffect } from "react";
import { Text } from "react-native";

interface CountdownProps {
    setTimeUp: Function,
    time: number,
    checkResetTime: boolean,
    isTimerRunning: boolean,
    setIsGetCode: (values: boolean) => void
}
const CountdownTimer = ({ setTimeUp, time, checkResetTime, isTimerRunning, setIsGetCode }: CountdownProps) => {
    const [remainingTime, setRemainingTime] = useState(time * 60); // Convert minutes to seconds

    useEffect(() => {
        setRemainingTime(time * 60);
        // Reset the remaining time when time changes
    }, [checkResetTime, time]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime > 0 && isTimerRunning) {
                    return prevTime - 1;
                } else {
                    if (prevTime === 0) {
                        setIsGetCode(false)
                        setTimeUp(true)
                    }
                    clearInterval(interval);
                    return prevTime;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [checkResetTime, isTimerRunning]);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
        <Text>{`${minutes?.toString()?.padStart(2, "0")}:${seconds
            ?.toString()
            ?.padStart(2, "0")}`}</Text>
    );
};

export default CountdownTimer;
