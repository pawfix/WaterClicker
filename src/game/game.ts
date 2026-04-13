import {gamePaused} from "../settings/settings.ts";
import {updateRightPanelDisplay} from "../index/rightDisplay.ts";
import {initIndex} from "../index";

function init() {
    initIndex()


    while (!gamePaused) {
        updateRightPanelDisplay()
    }

}

document.addEventListener("DOMContentLoaded", init);