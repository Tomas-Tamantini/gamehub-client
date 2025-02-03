import { Card } from "./card";
import { SharedGameState, GameStatus } from "./state";

export interface Message {
    messageType: "ERROR" | "GAME_ROOMS" | "GAME_ROOM_UPDATE" | "GAME_STATE";
    payload: any;
}

export interface GameRoomPayload {
    roomId: number;
    playerIds: string[];
    offlinePlayers: string[];
    isFull: boolean;
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

export interface GameRoomsResponsePayload {
    rooms: GameRoomPayload[];
}