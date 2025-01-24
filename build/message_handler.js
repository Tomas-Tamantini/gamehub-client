export default class MessageHandler {
    constructor(stateStore) {
        this.stateStore = stateStore;
    }
    handle(message) {
        if (message.messageType === "ERROR") {
            this.handleErrorMessage(message.payload);
        }
        else if (message.messageType === "PLAYER_JOINED") {
            this.handlePlayerJoined(message.payload);
        }
        else if (message.messageType === "GAME_STATE") {
            if (message.payload.sharedView) {
                const payload = message.payload;
                this.handleSharedGameState(payload.sharedView);
            }
            else if (message.payload.privateView) {
                const payload = message.payload;
                this.handlePrivateGameState(payload.privateView);
            }
        }
    }
    handlePlayerJoined(payload) {
        const alertMsg = `Players in room: ${payload.playerIds.join(", ")}`;
        this.stateStore.update((state) => (Object.assign(Object.assign({}, state), { alertMsg, roomId: payload.roomId })));
    }
    handleErrorMessage(payload) {
        this.stateStore.update((state) => (Object.assign(Object.assign({}, state), { alertMsg: `Error: ${payload.error}` })));
    }
    handleSharedGameState(sharedGameState) {
        this.stateStore.update((state) => (Object.assign(Object.assign({}, state), { sharedGameState })));
    }
    handlePrivateGameState(privateView) {
        this.stateStore.update((state) => (Object.assign(Object.assign({}, state), { myCards: privateView.cards })));
    }
}
