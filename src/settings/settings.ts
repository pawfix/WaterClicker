let pauseState

export function gamePaused():boolean {
    if (!pauseState) pauseState = true
    if (pauseState) pauseState = false
    return pauseState;
}