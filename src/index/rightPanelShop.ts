import {userBalance} from "../game/data.ts";
import {createPearlIcon} from "./rightDisplay.ts";

export interface shopEntry {
    name: string;
    price: number;
    maxAmount: number;
    ownedAmount: number;
}

export const power: shopEntry = {
    name: "Power",
    price: 25,
    maxAmount: 50,
    ownedAmount: 1,
}
export const multi: shopEntry = {
    name: "Multiplier",
    price: 125,
    maxAmount: 25,
    ownedAmount: 1,
}

function buyItem(item: shopEntry):boolean {
    console.log("buyItem", item);
    if (userBalance.pearls < item.price) {
        return false;
    } else if (item.ownedAmount >= item.maxAmount) {
        return false;
    }

    try {
        userBalance.pearls -= item.price;
        updateItemPrice(item)
        return true;
    }
    catch (error) {
        console.warn(error);
        return false;
    }
}

export function updateItemPrice(item: shopEntry):void {
    item.price = item.price * (item.ownedAmount + 1);
}

export function setUserPrices():void {
    updateItemPrice(power);
    updateItemPrice(multi);
}


// ====================
// SHOP DISPLAYS
// ====================

function generateShop(item: shopEntry):void {
    const shopWrap = document.getElementById("rightPanelShop");

    shopWrap?.append(makeShopDisplayItem(item))
}

function makeShopDisplayItem(item: shopEntry):HTMLElement {
    const itemSpace: HTMLDivElement = document.createElement("div");

    itemSpace.dataset.name = item.name;
    itemSpace.dataset.price = String(item.price);
    itemSpace.dataset.maxAmount = String(item.maxAmount);
    itemSpace.dataset.ownedAmount = String(item.ownedAmount);
    itemSpace.classList.add("shopItem");

    const itemName: HTMLParagraphElement = document.createElement("p");
    itemName.innerText = item.name;
    itemName.id = item.name;
    itemName.className = "shopItemName";

    const itemPrice: HTMLDivElement = document.createElement("div");
    const icon:SVGSVGElement = createPearlIcon();
    const text:HTMLParagraphElement = document.createElement("p");
    text.innerHTML = String(item.price);

    itemPrice.append(text, icon)

    itemPrice.id = String(item.price);
    itemPrice.className = "shopItemPrice";

    const itemAmount: HTMLParagraphElement = document.createElement("p");
    itemAmount.innerText = item.ownedAmount + " / " + item.maxAmount;
    itemAmount.id = String(item.ownedAmount);
    itemAmount.className = "shopItemAmount";

    itemSpace.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        const clickedInside = itemSpace.contains(target);

        if (clickedInside) {
            buyItem(item);
        }
    });

    itemSpace.append(itemName, itemPrice, itemAmount);

    return itemSpace;
}

export function addShopForItems(): void {
    console.log("Making shop")
    generateShop(power);
    generateShop(multi);
}