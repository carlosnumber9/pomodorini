export const getDetailedTime = (ms: number): string => {
    const hh = Math.floor(ms / (1000 * 60 * 60));
    const mm = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const ss = Math.floor((ms % (1000 * 60)) / 1000);
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}