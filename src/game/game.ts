import {pauseState} from "../settings/settings.ts";
import {updateRightPanelDisplay} from "../index/rightDisplay.ts";
import {initIndex} from "../index";
import { addShopForItems } from "../index/rightPanelShop.ts";



function gameLoop() {
    if (!pauseState) {
        updateRightPanelDisplay()
    }

    requestAnimationFrame(gameLoop)
}

function init() {
    initIndex()
    gameLoop()
    addShopForItems()
}

document.addEventListener("DOMContentLoaded", init);