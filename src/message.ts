import { SharedGameState } from "./state";

export interface Message {
    messageType: "ERROR" | "PLAYER_JOINED" | "GAME_STATE";
    payload: any;
}

export interface PlayerJoinedPayload {
    roomId: number;
    playerIds: string[];
}

export interface ErrorPayload {
    error: string;
}

export interface SharedViewPayload {
    roomId: number;
    sharedView: SharedGameState;
}