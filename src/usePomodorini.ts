import { useEffect, useRef, useState } from "react";
import type { Mode } from "./declarations";
import { getDetailedTime } from "./utils";

export const usePomodorini = (hours: number, mode: Mode, setMode: React.Dispatch<React.SetStateAction<Mode>>) => {
    const totalWorkTime: number = hours * 60 * 60 * 1000;
    const [timeLeft, setTimeLeft] = useState<number>(totalWorkTime);
    const [activeCountdown, setActiveCountdown] = useState<number | undefined>(undefined);
    const [detailedTimeLeft, setDetailedTimeLeft] = useState<string>('00:00:00');
    const startTime = useRef<number>(0);

    const getRemainingTime = (): number => {
        const msPassed: number = Date.now() - startTime.current;
        const timeRemaining: number = Math.abs(totalWorkTime - msPassed);
        return timeRemaining;
    }

    const secondlyCheck = () => {
        const timeRemaining: number = getRemainingTime();
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

    useEffect(() => setDetailedTimeLeft(getDetailedTime(timeLeft)), [timeLeft]);

    return detailedTimeLeft;
}