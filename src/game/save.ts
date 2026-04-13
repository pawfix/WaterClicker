import {userBalance} from "./data.ts";
import {userSettings} from "../settings/settings.ts";

interface saveJsonAttributes {
    balance: {
        pearls: number;
        gems: number;
    },
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
        settings: {
            bgMusic: userSettings.bgMusic,
        }
    };

    console.log(jsonAttributes);
    localStorage.setItem("saveJsonAttributes", JSON.stringify(jsonAttributes));
}




