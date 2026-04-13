import {userBalance} from "./data.ts";

export function updateRightPanelDisplay() {
    updatePearls()
    requestAnimationFrame(updateRightPanelDisplay)
}
function updatePearls() {
    const pearlDisplay:HTMLParagraphElement | null = document.querySelector('#pearls');
    pearlDisplay!.innerText = String(userBalance.pearls);
}