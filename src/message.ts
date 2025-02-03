import { Card } from "./card";
import { SharedGameState, GameStatus } from "./state";

export interface Message {
    messageType: "ERROR" | "PLAYER_JOINED" | "PLAYER_DISCONNECTED" | "GAME_STATE";
    payload: any;
}

export interface PlayerJoinedPayload {
    roomId: number;
    playerIds: string[];
}

export interface PlayerDisconnectedPayload {
    disconnectedPlayerId: string;
    room: PlayerJoinedPayload;
}

export interface ErrorPayload {
    error: string;
}

export interface SharedViewPayload {
    roomId: number;
    sharedView: SharedGameState;
}

export interface PrivateView {
    status: GameStatus;
    cards: Card[];
}

export interface PrivateViewPayload {
    roomId: number;
    privateView: PrivateView;
}