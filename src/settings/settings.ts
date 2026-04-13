let pauseState

export function gamePaused():boolean {
    if (!pauseState) pauseState = true
    if (pauseState) pauseState = false
    return pauseState;
}

interface userSettings {
    bgMusic: boolean
}

export let userSettings: userSettings = {
    bgMusic: true,
}