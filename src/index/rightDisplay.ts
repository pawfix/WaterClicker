import {userBalance} from "../game/data.ts";

export function updateRightPanelDisplay() {
    updatePearls()
    requestAnimationFrame(updateRightPanelDisplay)
}
function updatePearls() {
    console.log("Updating pearl")
    const pearlDisplay:HTMLParagraphElement | null = document.querySelector('#pearls');
    pearlDisplay!.innerText = String(userBalance.pearls);
}