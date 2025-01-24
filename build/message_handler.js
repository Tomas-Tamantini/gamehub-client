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
        this.stateStore.update((state) => (Object.assign(Object.assign({}, state), { alertMsg: `Error: ${payload.error}`, selectedCards: [] })));
    }
    handleSharedGameState(sharedGameState) {
        var _a;
        let alertMsg = undefined;
        if (sharedGameState.result) {
            alertMsg = `Game over. Results: ${(_a = sharedGameState.result) === null || _a === void 0 ? void 0 : _a.players.map(p => `${p.playerId}: ${p.distToAvg}`).join(' / ')}`;
        }
        const myCards = sharedGameState.status == "UPDATE_POINTS" ? [] : this.stateStore.getState().myCards;
        this.stateStore.update((state) => (Object.assign(Object.assign({}, state), { sharedGameState, alertMsg, myCards })));
    }
    handlePrivateGameState(privateView) {
        this.stateStore.update((state) => (Object.assign(Object.assign({}, state), { myCards: privateView.cards, alertMsg: undefined, selectedCards: [] })));
    }
}
