import {initSettingsBtn, pauseState, userSettings} from "../settings/settings.ts";
import {updateRightPanelDisplay} from "../index/rightDisplay.ts";
import {initIndex} from "../index";
import {addShopForItems, updateShopItemDisplay} from "../index/rightPanelShop.ts";
import {playMusic} from "./music.ts";
import {autoSave, loadData, saveData} from "./save.ts";
import {checkAchievements} from "./achievement.ts";




function gameLoop() {
    if (!pauseState) {
        updateRightPanelDisplay()
        updateShopItemDisplay()
        checkAchievements()
    }

    requestAnimationFrame(gameLoop)
}

function init() {
    console.log("Starting game");
    console.log("Starting index")
    initIndex()
    console.log("Starting game loop");
    gameLoop()
    console.log("Starting settings listenet")
    initSettingsBtn()
    console.log("Adding items to shop")
    addShopForItems()
    console.log("Starting music")
    playMusic()
    console.log("Start auto saves")
    autoSave()

    console.log("Starting save listener on electron side")
    window.electronAPI.onSettingsApply((data) => {
        userSettings.bgMusic = data.bgMusic;
        saveData();
    });

    window.electronAPI.onRunLoadData(() => {
        loadData();
    });

    console.log("INIT DONE")

}


document.addEventListener("DOMContentLoaded", init);