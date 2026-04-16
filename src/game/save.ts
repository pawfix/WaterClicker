import { userBalance, userStats } from "./data.ts";
import { userSettings } from "../settings/settings.ts";
import { multi, power, updateItemPrice, updateShopItemDisplay } from "../index/rightPanelShop.ts";
import { createPopUp } from "./popup.ts";
import { achievements } from "./achievement.ts";

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

interface achievementSave {
    name: string;
    progress: boolean;
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
    achievements: achievementSave[];
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
        },
        achievements: achievements.map(a => ({
            name: a.name,
            progress: a.progress
        }))
    };

    localStorage.setItem("saveJsonAttributes", JSON.stringify(jsonAttributes));

    createPopUp(
        "Saved progress...",
        "Saved your progress to local storage. To load go to settings and saves",
        false
    );
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
        power.price = parsed.shop.power.price;

        multi.ownedAmount = parsed.shop.multi.ownedAmount;
        multi.price = parsed.shop.multi.price;

        updateItemPrice(power);
        updateItemPrice(multi);

        updateShopItemDisplay();

        if (parsed.achievements) {
            for (const saved of parsed.achievements) {
                const ach = achievements.find(a => a.name === saved.name);
                if (ach) {
                    ach.progress = saved.progress;
                }
            }
        }

        console.log("Data loaded successfully", parsed);
    } catch (err) {
        console.error("Failed to load save data:", err);
    }
}

export function autoSave(): void {
    setInterval(() => {
        saveData();
        console.log("autoSaved");
    }, 300000);
}