import {initSettings, pauseState} from "../settings/settings.ts";
import {updateRightPanelDisplay} from "../index/rightDisplay.ts";
import {initIndex} from "../index";
import {addShopForItems, updateShopItemDisplay} from "../index/rightPanelShop.ts";
import {playMusic} from "./music.ts";




function gameLoop() {
    if (!pauseState) {
        updateRightPanelDisplay()
        updateShopItemDisplay()
    }

    requestAnimationFrame(gameLoop)
}

function init() {
    console.log("Starting game");
    console.log("Starting index")
    initIndex()
    console.log("Starting settings")
    initSettings()
    console.log("Starting game loop");
    gameLoop()
    console.log("Adding items to shop")
    addShopForItems()
    console.log("Starting music")
    playMusic()

}


document.addEventListener("DOMContentLoaded", init);