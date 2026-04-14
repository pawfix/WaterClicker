import {multi, power} from "../index/rightPanelShop.ts";

export function doClickerClick():number {
    console.log(power.ownedAmount, multi.ownedAmount);
    return power.ownedAmount * multi.ownedAmount
}