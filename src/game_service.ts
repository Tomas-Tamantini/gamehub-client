import SocketService from "./socket_service";
import StateStore from "./state_store";

export default class GameService {
    constructor(private socketService: SocketService, private stateStore: StateStore) { }

    public joinGame() {
        this.socketService.send({
            playerId: this.stateStore.getState().playerId,
            requestType: "JOIN_GAME_BY_TYPE",
            payload: { gameType: "chinese_poker" }
        });
    }

    public makeMove() {
        const { playerId, selectedCards, roomId } = this.stateStore.getState();
        this.socketService.send({
            playerId,
            requestType: "MAKE_MOVE",
            payload: { roomId, move: { cards: selectedCards } }
        });
    }
}