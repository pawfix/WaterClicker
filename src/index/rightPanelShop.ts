import { triggerPop } from "./rightDisplay.ts";
import {userBalance, userStats} from "../game/data.ts";

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
};

export const multi: shopEntry = {
    name: "Multiplier",
    basePrice: 125,
    price: 125,
    maxAmount: 25,
    ownedAmount: 1,
};

export const gemExchange: shopEntry = {
    name: "Gem Exchange",
    basePrice: 0,
    price: 0,
    maxAmount: 999999,
    ownedAmount: 0,
};

export const pearlExchange: shopEntry = {
    name: "Pearl Exchange",
    basePrice: 0,
    price: 0,
    maxAmount: 999999,
    ownedAmount: 0,
};

export const finishGame: shopEntry = {
    name: "FINISH GAME",
    basePrice: 250,
    price: 250,
    maxAmount: 1,
    ownedAmount: 0,
};

function syncUI(): void {
    const gems = document.querySelector("#gems") as HTMLParagraphElement;
    const pearls = document.querySelector("#pearls") as HTMLParagraphElement;

    if (gems) gems.textContent = `${userStats.gems} gems`;
    if (pearls) pearls.textContent = `${userStats.pearls} pearls`;

    updateShopItemDisplay();
}

export function convertGemToPearls(): boolean {
    if (userBalance.gems < 1) return false;

    userBalance.gems -= 1;

    userBalance.pearls += 10;

    syncUI();
    return true;
}

export function convertPearlsToGem(): boolean {
    if (userBalance.pearls < 100) return false;

    userBalance.pearls -= 100;
    userBalance.gems += 1;

    syncUI();
    return true;
}

export function finishGameCheck(): boolean {
    if (userStats.gems < 250) return false;

    userStats.gems -= 250;

    console.log("GAME COMPLETED");

    syncUI();
    return true;
}

function buyItem(item: shopEntry): boolean {
    let success = false;

    console.log("CLICK", {
        pearls: userBalance.pearls,
        price: item.price,
        name: item.name
    });

    console.log(item.name)
    switch (item.name) {
        case "Gem Exchange":
            success = convertGemToPearls();
            console.log(item.name)
            break;

        case "Pearl Exchange":
            success = convertPearlsToGem();
            console.log(item.name)

            break;

        case "FINISH GAME":
            console.log(item.name)
            success = finishGameCheck();
            break;

        default:
            if (userBalance.pearls < item.price) {
                console.log("NOT ENOUGH PEARLS", userBalance.pearls, item.price);
                return false;
            }

            if (item.ownedAmount >= item.maxAmount) {
                console.log("MAX REACHED");
                return false;
            }

            userBalance.pearls -= item.price;
            item.ownedAmount++;

            updateItemPrice(item);

            const pearlsDisplay = document.querySelector("#pearls") as HTMLParagraphElement;
            if (pearlsDisplay) triggerPop(pearlsDisplay);

            success = true;
            break;
    }
    if (success) {
        updateShopItemDisplay();
        syncUI();
    }

    return success;
}

export function updateItemPrice(item: shopEntry): void {
    if (item.ownedAmount <= 0) {
        item.ownedAmount = 1;
    }

    item.price = item.basePrice * item.ownedAmount;
}

export function setUserPrices(): void {
    updateItemPrice(power);
    updateItemPrice(multi);
}
function generateShop(item: shopEntry): void {
    const shopWrap = document.getElementById("rightPanelShop");
    if (!shopWrap) return;

    // Remove this line: shopWrap.innerHTML = "";
    shopWrap.append(makeShopDisplayItem(item));
}

function makeShopDisplayItem(item: shopEntry): HTMLElement {
    const itemSpace = document.createElement("div");

    itemSpace.dataset.name = item.name;
    itemSpace.dataset.price = String(item.price);
    itemSpace.dataset.maxAmount = String(item.maxAmount);
    itemSpace.dataset.ownedAmount = String(item.ownedAmount);

    itemSpace.classList.add("shopItem");

    const itemName = document.createElement("p");
    itemName.innerText = item.name;
    itemName.className = "shopItemName";

    const itemPrice = document.createElement("div");
    const text = document.createElement("p");

    text.innerHTML = String(item.price);
    text.dataset.name = item.name;
    text.className = "shopItemText";

    itemPrice.append(text);
    itemPrice.className = "shopItemPrice";

    const itemAmount = document.createElement("p");
    itemAmount.innerText = `${item.ownedAmount} / ${item.maxAmount}`;
    itemAmount.dataset.name = item.name;
    itemAmount.className = "shopItemAmount";

    itemSpace.addEventListener("click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (itemSpace.contains(target)) {
            console.log(buyItem(item))
        }
    });

    itemSpace.append(itemName, itemPrice, itemAmount);

    return itemSpace;
}

export function updateShopItemDisplay(): void {
    const shopItems = document.querySelectorAll<HTMLParagraphElement>(".shopItemText");
    const shopAmount = document.querySelectorAll<HTMLParagraphElement>(".shopItemAmount");

    shopItems.forEach((item) => {
        const type = item.dataset.name?.toLowerCase();

        switch (type) {
            case "power":
                item.textContent = String(power.price);
                break;
            case "multiplier":
                item.textContent = String(multi.price);
                break;
            case "gem exchange":
                item.textContent = "1 gem → 10 pearls";
                break;
            case "pearl exchange":
                item.textContent = "100 pearls → 1 gem";
                break;
            case "finish game":
                item.textContent = "250 gems";
                break;
        }
    });

    shopAmount.forEach((item) => {
        const type = item.dataset.name?.toLowerCase();

        switch (type) {
            case "power":
                item.textContent = `${power.ownedAmount} / ${power.maxAmount}`;
                break;
            case "multiplier":
                item.textContent = `${multi.ownedAmount} / ${multi.maxAmount}`;
                break;
            case "gem exchange":
            case "pearl exchange":
            case "finish game":
                item.textContent = "";
                break;
        }
    });
}

export function addShopForItems(): void {
    const shopWrap = document.getElementById("rightPanelShop");
    if (shopWrap) shopWrap.innerHTML = "";  // Clear once here

    generateShop(power);
    generateShop(multi);
    generateShop(gemExchange);
    generateShop(pearlExchange);
    generateShop(finishGame);
}