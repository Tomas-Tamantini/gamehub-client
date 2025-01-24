export interface Message {
    messageType: "PLAYER_JOINED";
    payload: any;
}

export interface PlayerJoinedPayload {
    roomId: number;
    playerIds: string[];
}

