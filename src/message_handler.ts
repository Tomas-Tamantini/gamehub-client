import { ErrorPayload, Message, PlayerJoinedPayload, PrivateView, PrivateViewPayload, SharedViewPayload } from "./message";
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
            else if (message.payload.privateView) {
                const payload = message.payload as PrivateViewPayload;
                this.handlePrivateGameState(payload.privateView);
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
        let alertMsg: string | undefined = undefined;
        if (sharedGameState.result) {
            alertMsg = `Game over. Results: ${sharedGameState.result?.players.map(p => `${p.playerId}: ${p.distToAvg}`).join(' / ')}`;
        }
        const myCards = sharedGameState.status == "UPDATE_POINTS" ? [] : this.stateStore.getState().myCards;
        this.stateStore.update((state) => ({ ...state, sharedGameState, alertMsg, myCards }));
    }

    private handlePrivateGameState(privateView: PrivateView) {
        this.stateStore.update((state) => ({ ...state, myCards: privateView.cards, alertMsg: undefined, selectedCards: [] }));
    }
}