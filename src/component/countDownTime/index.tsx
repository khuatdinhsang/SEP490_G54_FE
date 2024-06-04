import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const CountdownTimer = ({ setTimeUp, time, checkResetTime }: { setTimeUp: Function, time: number, checkResetTime: boolean }) => {
    const [remainingTime, setRemainingTime] = useState(time * 60); // Convert minutes to seconds

    useEffect(() => {
        setRemainingTime(time * 60);
        // Reset the remaining time when time changes
    }, [checkResetTime, time]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    setTimeUp(true)
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [checkResetTime]);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
        <Text>{`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}</Text>
    );
};

export default CountdownTimer;
