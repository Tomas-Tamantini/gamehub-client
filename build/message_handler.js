export default class MessageHandler {
    constructor(stateStore) {
        this.stateStore = stateStore;
    }
    handle(message) {
        if (message.messageType === "PLAYER_JOINED") {
            this.handlePlayerJoined(message.payload);
        }
    }
    handlePlayerJoined(payload) {
        const alertMsg = `Players in room: ${payload.playerIds.join(", ")}`;
        this.stateStore.update((state) => (Object.assign(Object.assign({}, state), { alertMsg, roomId: payload.roomId })));
    }
}
