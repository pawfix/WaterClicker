import {userBalance, userStats} from "./data.ts";
import {userSettings} from "../settings/settings.ts";
import {multi, power, updateItemPrice, updateShopItemDisplay } from "../index/rightPanelShop.ts";

interface shopSave {
    power: {
        ownedAmount: number;
        price: number;
    };
    multi: {
        ownedAmount: number;
        price: number;
    };
}

interface saveJsonAttributes {
    balance: {
        pearls: number;
        gems: number;
    },
    stats: {
        clicks: number;
        pearls: number;
        gems: number;
    },
    settings: {
        bgMusic: boolean;
    },
    shop: shopSave;
}

export function saveData() {
    console.log("Saving data");

    const jsonAttributes: saveJsonAttributes = {
        balance: {
            pearls: userBalance.pearls,
            gems: userBalance.gems
        },
        stats: {
            clicks: userStats.clicks,
            pearls: userStats.pearls,
            gems: userStats.gems
        },
        settings: {
            bgMusic: userSettings.bgMusic,
        },
        shop: {
            power: {
                ownedAmount: power.ownedAmount,
                price: power.price
            },
            multi: {
                ownedAmount: multi.ownedAmount,
                price: multi.price
            }
        }
    };

    localStorage.setItem("saveJsonAttributes", JSON.stringify(jsonAttributes));
}


export function loadData(): void {
    console.log("Loading data");

    const data = localStorage.getItem("saveJsonAttributes");
    if (!data) {
        console.log("No save data found");
        return;
    }

    try {
        const parsed: saveJsonAttributes = JSON.parse(data);

        userBalance.pearls = parsed.balance.pearls;
        userBalance.gems = parsed.balance.gems;

        userStats.clicks = parsed.stats.clicks;
        userStats.pearls = parsed.stats.pearls;
        userStats.gems = parsed.stats.gems;

        userSettings.bgMusic = parsed.settings.bgMusic;


        power.ownedAmount = parsed.shop.power.ownedAmount;
        multi.ownedAmount = parsed.shop.multi.ownedAmount;

        // recalc prices AFTER restoring
        updateItemPrice(power);
        updateItemPrice(multi);

        // refresh UI
        updateShopItemDisplay();

        console.log("Data loaded successfully", parsed);
    } catch (err) {
        console.error("Failed to load save data:", err);
    }
}


