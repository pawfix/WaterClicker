import {userSettings} from "./settings.ts";
import {playMusic} from "../game/music.ts";
import { saveData} from "../game/save.ts";

export function addSettingsFormListeners(): void {

    console.log("Settings form listeners loaded");

    const settingsForm = document.getElementById('settingsForm');
    const musicButtonChoice: HTMLInputElement | null = document.querySelector('#bgMusicInput');

    if (settingsForm) {
        settingsForm.addEventListener('submit', event => {
            event.preventDefault();
            event.stopPropagation();
            console.log("submited" + musicButtonChoice?.checked);
            applyMusicBgSettings(musicButtonChoice?.checked || true)
            console.log(userSettings)
        })
    }
}

export function addSettingsSaveListeners(): void {
    console.log("Settings save & load listeners loaded");
    const saveBtn = document.getElementById('settingsSave');
    const loadBtn = document.getElementById('settingsLoad');
    if (saveBtn) {
        saveBtn.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            saveData()
            window.electronAPI.saveSettings({
                bgMusic: userSettings.bgMusic
            });
        })
    }

    if (loadBtn) {
        loadBtn.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            window.electronAPI.loadMainData();
        });
    }
}

function applyMusicBgSettings(checked: boolean ) : void {
    userSettings.bgMusic = checked;
    playMusic()
}