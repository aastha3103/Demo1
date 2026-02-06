export type TileType = 'PROPERTY' | 'CORNER' | 'CHANCE' | 'COMMUNITY' | 'TAX' | 'UTILITY' | 'RAILROAD' | 'STATION';

export interface Tile {
    id: number;
    name: string;
    type: TileType;
    price?: number;
    rent?: number[];
    color?: string;
    ownerId?: number | null;
    mortgaged?: boolean;
    description?: string;
    lesson?: string;
}

export interface Player {
    id: number;
    name: string;
    money: number;
    position: number;
    color: string;
    inJail?: boolean;
}

export interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    diceRoll: number[];
}
