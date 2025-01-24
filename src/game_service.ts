import SocketService from "./socket_service";
import StateStore from "./state_store";

export default class GameService {
    constructor(private socketService: SocketService, private stateStore: StateStore) { }

    public joinGame() {
        this.socketService.send({
            player_id: this.stateStore.getState().playerId,
            request_type: "JOIN_GAME_BY_TYPE",
            payload: { game_type: "chinese_poker" }
        });
    }
}