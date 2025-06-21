export function throttle(ms, callback) {
    let last = 0;
    return (...args) => {
        const now = (new Date).getTime();
        if (now - last >= ms) {
            last = now;
            callback(...args);
        }
    };
}
