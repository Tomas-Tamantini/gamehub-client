import { Card } from "./card";
import SocketService from "./socket_service";
import StateStore from "./state_store";

export default class GameService {
    constructor(private socketService: SocketService, private stateStore: StateStore) { }

    public joinGameByType() {
        this.socketService.send({
            playerId: this.stateStore.getState().playerId,
            requestType: "JOIN_GAME_BY_TYPE",
            payload: { gameType: "chinese_poker" }
        });
    }

    public makeMove(cards: Card[]) {
        const { playerId, roomId } = this.stateStore.getState();
        this.socketService.send({
            playerId,
            requestType: "MAKE_MOVE",
            payload: { roomId, move: { cards } }
        });
    }
}