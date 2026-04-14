export interface GameCurrency {
    pearls: number;
    gems: number;
}

export interface gameStats {
    clicks: number,
    pearls: number,
    gems: number,
}

export let userBalance: GameCurrency = {
    pearls: 0,
    gems: 0,
}

export let userStats: gameStats = {
    clicks: 0,
    pearls: 0,
    gems: 0,
}
