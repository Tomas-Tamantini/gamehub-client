import { Card } from "./card";
import HttpService from "./http_service";
import { roomToJoin, roomToRejoin } from "./room_picker";
import SocketService from "./socket_service";
import StateStore from "./state_store";


export default class GameService {
    constructor(
        private socketService: SocketService,
        private httpService: HttpService,
        private stateStore: StateStore
    ) { }

    public joinGameById(roomId: number) {
        this.socketService.send({
            playerId: this.stateStore.getState().playerId,
            requestType: "JOIN_GAME_BY_ID",
            payload: { roomId }
        });
    }

    public rejoinGame(roomId: number) {
        this.socketService.send({
            playerId: this.stateStore.getState().playerId,
            requestType: "REJOIN_GAME",
            payload: { roomId }
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

    public joinGame() {
        this.httpService.getRooms(
            roomsResponse => {
                const rooms = roomsResponse.items;
                const playerId = this.stateStore.getState().playerId;
                const rejoin = roomToRejoin(playerId, rooms);
                const join = roomToJoin(rooms);
                if (rejoin) this.rejoinGame(rejoin.roomId);
                else if (join) this.joinGameById(join.roomId);
                else this.stateStore.update((state) => ({ ...state, alertMsg: "No rooms available" }));
            }
        );
    }
}