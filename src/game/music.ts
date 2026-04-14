import {userSettings} from "../settings/settings.ts";

const bgMusic = new Audio("../assets/bgMusic.wav")
bgMusic.volume = 0.4
bgMusic.loop = true;

export function playMusic() {
    if (userSettings.bgMusic) {
        console.log("playing music")
        bgMusic.play();
    } else {
        console.log("No music playing")
        bgMusic.pause();
    }
}
