import { useEffect, useRef } from "react"
import { animatePomio } from "../utils";

export const usePomio = (id: number) => {
    const interval = useRef<number>(0);
    const timeout = useRef<number>(0);

    useEffect(() => {
            const appearingTimeout: number = setTimeout(() => {
                const animationInterval: number = setInterval(() => {
                    animatePomio(id);
                }, Math.random() * 5000 + 5000);
                interval.current = animationInterval;
            }, Math.random() * 4000 + 1000);
            timeout.current = appearingTimeout;

        return () => {
            clearInterval(interval.current);
            clearTimeout(timeout.current);
        };
    }, []);
}