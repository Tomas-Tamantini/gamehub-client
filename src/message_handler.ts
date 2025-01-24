import { Message, PlayerJoinedPayload } from "./message";
import StateStore from "./state_store";

export default class MessageHandler {
    constructor(private stateStore: StateStore) { }

    handle(message: Message) {
        if (message.messageType === "PLAYER_JOINED") {
            this.handlePlayerJoined(message.payload as PlayerJoinedPayload);
        }
    }

    private handlePlayerJoined(payload: PlayerJoinedPayload) {
        const alertMsg = `Players in room: ${payload.playerIds.join(", ")}`;
        this.stateStore.update((state) => ({ ...state, alertMsg, roomId: payload.roomId }));
    }
}