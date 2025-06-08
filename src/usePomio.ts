import { useEffect, useRef } from "react"
import { animatePomio } from "./utils";

export const usePomio = () => {
    const pomios = useRef<number[]>(
        Array.from({ length: Math.floor(Math.random() * 2) + 1 }, (_, i) => i + 1)
    );

    const intervals: number[] = [];
    const timeouts: number[] = [];

    useEffect(() => {
        pomios.current.map((id: number) => {
            const timeout: number = setTimeout(() => {
                const interval: number = setInterval(() => {
                    animatePomio(id);
                }, Math.random() * 5000 + 5000);
                intervals.push(interval);
            }, Math.random() * 4000 + 1000);
            timeouts.push(timeout);
        }
        );

        return () => {
            intervals.forEach((interval: number) => clearInterval(interval));
            timeouts.forEach((timeout: number) => clearTimeout(timeout));
        };
    }, []);

    return pomios.current;
}