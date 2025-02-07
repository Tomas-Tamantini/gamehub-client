import { Card } from "../src/card";
import GameService from "../src/game_service";
import HttpService from "../src/http_service";
import SocketService from "../src/socket_service";
import StateStore from "../src/state_store";

describe("GameService", () => {
    let socketServiceMock: jest.Mocked<SocketService>;
    let httpServiceMock: HttpService;
    let stateStore: StateStore;
    let gameService: GameService;

    beforeEach(() => {
        socketServiceMock = {
            send: jest.fn(),
        } as unknown as jest.Mocked<SocketService>;
        httpServiceMock = {
            getRooms: jest.fn(),
        } as unknown as HttpService;
        stateStore = new StateStore();
        gameService = new GameService(socketServiceMock, httpServiceMock, stateStore);
    });

    it("should send a join game request by room id", () => {
        stateStore.update(() => ({ playerId: "Alice" }));

        gameService.joinGameById(2);

        expect(socketServiceMock.send).toHaveBeenCalledWith({
            playerId: "Alice",
            requestType: "JOIN_GAME_BY_ID",
            payload: { roomId: 2 },
        });
    });

    it("should send a rejoin game request by room id", () => {
        stateStore.update(() => ({ playerId: "Alice" }));

        gameService.rejoinGame(2);

        expect(socketServiceMock.send).toHaveBeenCalledWith({
            playerId: "Alice",
            requestType: "REJOIN_GAME",
            payload: { roomId: 2 },
        });
    });

    it("should send a make move request with the correct payload", () => {
        const cards: Card[] = [{ rank: 'A', suit: 'd' }];
        stateStore.update(() => ({
            playerId: "Alice",
            roomId: 123
        }))
        gameService.makeMove(cards);
        expect(socketServiceMock.send).toHaveBeenCalledWith({
            playerId: "Alice",
            requestType: "MAKE_MOVE",
            payload: { roomId: 123, move: { cards } },
        });
    });

    it("should query rooms before joining", () => {
        stateStore.update(() => ({ playerId: "Alice" }));
        gameService.joinGame();
        expect(httpServiceMock.getRooms).toHaveBeenCalled();
    });
});
