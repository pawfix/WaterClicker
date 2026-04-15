import { multi, power } from "../index/rightPanelShop.ts";
import {makeBubble, triggerPop} from "../index/rightDisplay.ts";
import {userBalance, userStats} from "./data.ts";

export function doClickerClick(): number {
    const pearlsDisplay: HTMLParagraphElement = document.querySelector("#pearls") as HTMLParagraphElement;
    const gemsDisplay: HTMLParagraphElement = document.querySelector('#pearls')


    makeBubble()

    userStats.clicks++;

    const amount = power.ownedAmount * multi.ownedAmount;

    if (Math.random() > 0.05) {
        console.log("Got Pearls")
        triggerPop(pearlsDisplay);
        userStats.pearls += amount;
    } else {
        triggerPop(gemsDisplay);
        userStats.gems += amount;
        console.log("Got jems")
        userBalance.gems ++;
        return 0;
    }

    return amount;
}