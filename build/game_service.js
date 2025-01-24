export default class GameService {
    constructor(socketService, stateStore) {
        this.socketService = socketService;
        this.stateStore = stateStore;
    }
    joinGame() {
        this.socketService.send({
            playerId: this.stateStore.getState().playerId,
            requestType: "JOIN_GAME_BY_TYPE",
            payload: { gameType: "chinese_poker" }
        });
    }
}
