import {multi, power} from "../index/rightPanelShop.ts";
import {triggerPop} from "../index/rightDisplay.ts";
import {userStats} from "./data.ts";


export function doClickerClick():number {
    const pearlsDisplay: HTMLParagraphElement = document.querySelector('#pearls');
    triggerPop(pearlsDisplay);

    userStats.clicks++;
    userStats.pearls += power.ownedAmount * multi.ownedAmount;

    return power.ownedAmount * multi.ownedAmount
}