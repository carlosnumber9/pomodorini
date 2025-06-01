import { useEffect, useState } from "react"
import { generateCoordinates } from "./utils";
import type { Coordinates } from "./declarations";

export const usePomio = () => {
    const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });

    useEffect(() => {
        setCoords(generateCoordinates());
    }, []);

    return coords;
}