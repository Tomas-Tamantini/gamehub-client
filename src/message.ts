export interface Message {
    messageType: "ERROR" | "PLAYER_JOINED";
    payload: any;
}

export interface PlayerJoinedPayload {
    roomId: number;
    playerIds: string[];
}

export interface ErrorPayload {
    error: string;
}