import { useEffect, useState } from "react"
import { animatePomio } from "./utils";

export const usePomio = () => {
    const [pomios, _setPomios] = useState<number[]>(Array.from({ length: Math.random() * 10 }, (_, i) => i + 1));

    useEffect(() => {
        const intervals: number[] = pomios.map((id: number) => setInterval(() => {
            animatePomio(id);
        }, 5000)
        );

        return () => {
            intervals.forEach((interval: number) => clearInterval(interval));
        };
    }, []);

    return pomios;
}