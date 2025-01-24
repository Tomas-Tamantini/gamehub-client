export default class GameService {
    constructor(socketService, stateStore) {
        this.socketService = socketService;
        this.stateStore = stateStore;
    }
    joinGame() {
        this.socketService.send({
            player_id: this.stateStore.getState().playerId,
            request_type: "JOIN_GAME_BY_TYPE",
            payload: { game_type: "chinese_poker" }
        });
    }
}
