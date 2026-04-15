import { multi, power } from "../index/rightPanelShop.ts";
import { triggerPop } from "../index/rightDisplay.ts";
import {userBalance, userStats} from "./data.ts";

export function doClickerClick(): number {
    const pearlsDisplay: HTMLParagraphElement = document.querySelector("#pearls") as HTMLParagraphElement;
    const gemsDisplay: HTMLParagraphElement = document.querySelector('#pearls')

    userStats.clicks++;

    const amount = power.ownedAmount * multi.ownedAmount;

    if (Math.random() < 0.05) {

        triggerPop(pearlsDisplay);
        userStats.pearls += amount;
    } else {
        triggerPop(gemsDisplay);
        userStats.gems += amount;
        console.log("Got jems")
        userBalance.gems ++;
    }

    return amount;
}