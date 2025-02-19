import { Card } from "./card";

export enum GameStatus {
    START_GAME = "START_GAME",
    START_MATCH = "START_MATCH",
    DEAL_CARDS = "DEAL_CARDS",
    START_ROUND = "START_ROUND",
    START_TURN = "START_TURN",
    AWAIT_PLAYER_ACTION = "AWAIT_PLAYER_ACTION",
    END_TURN = "END_TURN",
    END_ROUND = "END_ROUND",
    END_MATCH = "END_MATCH",
    UPDATE_POINTS = "UPDATE_POINTS",
    END_GAME = "END_GAME"
}

export interface SharedPlayerState {
    playerId: string;
    numPoints: number;
    numCards: number;
}

export interface Move {
    playerId: string;
    cards: Card[];
}

export interface PlayerResult {
    playerId: string;
    distToAvg: number;
}

export interface Result {
    players: PlayerResult[];
}

export interface SharedGameState {
    status: GameStatus;
    currentPlayerId?: string;
    players: SharedPlayerState[];
    moveHistory: Move[];
    result?: Result;
}

export interface GlobalState {
    playerId?: string;
    roomId?: number;
    alertMsg?: string;
    sharedGameState?: SharedGameState;
    myCards?: Card[];
    selectedCards?: Card[];
    isMobile?: boolean;
    offlinePlayers?: string[];
}