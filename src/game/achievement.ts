import { userStats } from "./data";
import { createPopUp } from "./popup";

export interface achievement {
    name: string;
    target: number;
    type: string;
    progress: boolean
}
export const achievements: achievement[] = [
    {
        name: "First click",
        target: 1,
        type: "clicks",
        progress: false
    },
    {
        name: "First 100 clicks",
        target: 100,
        type: "clicks",
        progress: false
    },
    {
        name: "First 1000 clicks",
        target: 1000,
        type: "clicks",
        progress: false
    },

    {
        name: "First pearl",
        target: 1,
        type: "pearls",
        progress: false
    },
    {
        name: "First 100 pearls",
        target: 100,
        type: "pearls",
        progress: false
    },
    {
        name: "First 10000 pearls",
        target: 10000,
        type: "pearls",
        progress: false
    },

    {
        name: "First gem",
        target: 1,
        type: "gems",
        progress: false
    },
    {
        name: "First 50 gems",
        target: 50,
        type: "gems",
        progress: false
    },
    {
        name: "First 1000 gems",
        target: 1000,
        type: "gems",
        progress: false
    }
];
export function checkAchievements(): void {
    for (const ach of achievements) {
        if (ach.progress) continue;

        let value = 0;

        switch (ach.type) {
            case "clicks":
                value = userStats.clicks;
                break;
            case "pearls":
                value = userStats.pearls;
                break;
            case "gems":
                value = userStats.gems;
                break;
        }

        if (value >= ach.target) {
            ach.progress = true;

            createPopUp(
                "Achievement unlocked!",
                ach.name,
                false
            );
        }
    }
}