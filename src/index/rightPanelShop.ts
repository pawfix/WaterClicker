import {userBalance} from "../game/data.ts";
import {createPearlIcon} from "./rightDisplay.ts";

export interface shopEntry {
    name: string;
    price: number;
    basePrice: number;
    maxAmount: number;
    ownedAmount: number;
}

export const power: shopEntry = {
    name: "Power",
    basePrice: 25,
    price: 25,
    maxAmount: 50,
    ownedAmount: 1,
}
export const multi: shopEntry = {
    name: "Multiplier",
    basePrice: 125,
    price: 125,
    maxAmount: 25,
    ownedAmount: 1,
}

function buyItem(item: shopEntry):boolean {
    if (userBalance.pearls < item.price) {
        return false;
    } else if (item.ownedAmount >= item.maxAmount) {
        return false;
    } else {


        try {
            userBalance.pearls -= item.price;
            item.ownedAmount ++;

            updateItemPrice(item)
            console.log("buyItem", item.name);
            return true;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }
}

export function updateItemPrice(item: shopEntry):void {
    item.price = item.basePrice * (item.ownedAmount);
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
    text.dataset.name = item.name;

    text.className = "shopItemText";

    itemPrice.append(text, icon)

    itemPrice.id = String(item.price);
    itemPrice.className = "shopItemPrice";

    const itemAmount: HTMLParagraphElement = document.createElement("p");
    itemAmount.innerText = item.ownedAmount + " / " + item.maxAmount;
    itemAmount.id = String(item.ownedAmount);
    itemAmount.className = "shopItemAmount";
    itemAmount.dataset.name = item.name;

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

export function updateShopItemDisplay(): void {
    const shopItems = document.querySelectorAll<HTMLParagraphElement>('.shopItemText');
    const shopAmount = document.querySelectorAll<HTMLParagraphElement>('.shopItemAmount');

    shopItems.forEach((item) => {
        const itemType = item.dataset.name?.toLowerCase();

        switch (itemType) {
            case "power":
                item.textContent = String(power.price);
                break;
            case "multiplier":
                item.textContent = String(multi.price);
                break;
            default:
                console.log(`Item ${itemType} is not supported`);
        }

    })

    shopAmount.forEach((item) => {
        const itemType = item.dataset.name?.toLowerCase();

        switch (itemType) {
            case "power":
                item.textContent = String(power.ownedAmount) + " / " + String(power.maxAmount);
                break;
            case "multiplier":
                item.textContent = String(multi.ownedAmount) + " / " + String(multi.maxAmount);
                break;
            default:
                console.log(`Item ${itemType} is not supported`);
        }
    })
}

export function addShopForItems(): void {
    generateShop(power);
    generateShop(multi);
}