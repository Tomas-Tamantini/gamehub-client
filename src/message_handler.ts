import { ErrorPayload, Message, PlayerJoinedPayload, SharedViewPayload } from "./message";
import { SharedGameState } from "./state";
import StateStore from "./state_store";

export default class MessageHandler {
    constructor(private stateStore: StateStore) { }

    handle(message: Message) {
        if (message.messageType === "ERROR") {
            this.handleErrorMessage(message.payload as ErrorPayload);
        }
        else if (message.messageType === "PLAYER_JOINED") {
            this.handlePlayerJoined(message.payload as PlayerJoinedPayload);
        }
        else if (message.messageType === "GAME_STATE") {
            if (message.payload.sharedView) {
                const payload = message.payload as SharedViewPayload;
                this.handleSharedGameState(payload.sharedView);
            }
        }
    }

    private handlePlayerJoined(payload: PlayerJoinedPayload) {
        const alertMsg = `Players in room: ${payload.playerIds.join(", ")}`;
        this.stateStore.update((state) => ({ ...state, alertMsg, roomId: payload.roomId }));
    }

    private handleErrorMessage(payload: ErrorPayload) {
        this.stateStore.update((state) => ({ ...state, alertMsg: `Error: ${payload.error}` }));
    }

    private handleSharedGameState(sharedGameState: SharedGameState) {
        this.stateStore.update((state) => ({ ...state, sharedGameState }));
    }
}