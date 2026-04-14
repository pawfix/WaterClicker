import {userBalance, userStats} from "./data.ts";
import {userSettings} from "../settings/settings.ts";

interface saveJsonAttributes {
    balance: {
        pearls: number;
        gems: number;
    },
    stats: {
        clicks: number;
        pearls: number;
        gems: number;
    }
    settings: {
        bgMusic: boolean,
    }
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
        }
    };

    console.log(jsonAttributes);
    localStorage.setItem("saveJsonAttributes", JSON.stringify(jsonAttributes));
}




