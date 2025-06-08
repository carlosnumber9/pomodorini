import gsap from "gsap";

export const getDetailedTime = (ms: number): string => {
    const hh = Math.floor(ms / (1000 * 60 * 60));
    const mm = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const ss = Math.floor((ms % (1000 * 60)) / 1000);
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}

export const getRemainingTime = (totalWorkTime: number, startTime: number): number => {
    const msPassed: number = Date.now() - startTime;
    const timeRemaining: number = Math.abs(totalWorkTime - msPassed);
    return timeRemaining;
}

export const animatePomio = (id: number): void => {
    gsap.to(`#pomio-${id}`, {
        scale: 0,
        duration: 0.2,
    });
    gsap.set(`#pomio-${id}`, {
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        delay: 1,
    }
    );
    gsap.to(`#pomio-${id}`, {
        scale: 1,
        duration: 0.2,
        delay: 1.5,
    });
}

export const getMsFromHours = (hours: number): number => hours * 60 * 60 * 1000;