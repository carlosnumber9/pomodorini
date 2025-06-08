import { useEffect, useRef, useState } from "react";
import type { Mode } from "../declarations";
import { getMsFromHours, getRemainingTime } from "../utils";

export const usePomodorini = (hours: number, mode: Mode, setMode: React.Dispatch<React.SetStateAction<Mode>>) => {
    const totalWorkTime: number = getMsFromHours(hours);
    const [timeLeft, setTimeLeft] = useState<number>(totalWorkTime);
    const [activeCountdown, setActiveCountdown] = useState<number | undefined>(undefined);
    const startTime = useRef<number>(0);

    const secondlyCheck = () => {
        const timeRemaining: number = getRemainingTime(totalWorkTime, startTime.current);
        setTimeLeft(timeRemaining);
        if (timeRemaining <= 0) setMode('FINISHED');
    }

    const resetCountdown = () => {
        clearInterval(activeCountdown);
        setActiveCountdown(undefined);
    }

    useEffect(() => {
        if (mode === 'WORKING') {
            const newStartTime: number = Date.now();
            startTime.current = newStartTime;
            if (activeCountdown) {
                clearInterval(activeCountdown);
            }
            setActiveCountdown(setInterval(secondlyCheck, 1000));
        }
        if (mode === 'FINISHED') {
            resetCountdown();
        }
    }, [mode]);

    return timeLeft;
}