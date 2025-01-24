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
    makeMove() {
        const { playerId, selectedCards, roomId } = this.stateStore.getState();
        this.socketService.send({
            playerId,
            requestType: "MAKE_MOVE",
            payload: { roomId, move: { cards: selectedCards } }
        });
    }
}
