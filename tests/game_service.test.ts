import { Card } from "../src/card";
import GameService from "../src/game_service";
import SocketService from "../src/socket_service";
import StateStore from "../src/state_store";

describe("GameService", () => {
    let socketServiceMock: jest.Mocked<SocketService>;
    let stateStore: StateStore;
    let gameService: GameService;

    beforeEach(() => {
        socketServiceMock = {
            send: jest.fn(),
        } as unknown as jest.Mocked<SocketService>;
        stateStore = new StateStore();
        gameService = new GameService(socketServiceMock, stateStore);
    });

    it("should send a join game request by game type", () => {
        stateStore.update(() => ({ playerId: "Alice" }));

        gameService.joinGameByType();

        expect(socketServiceMock.send).toHaveBeenCalledWith({
            playerId: "Alice",
            requestType: "JOIN_GAME_BY_TYPE",
            payload: { gameType: "chinese_poker" },
        });
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

    it("should query game rooms", () => {
        stateStore.update(() => ({ playerId: "Alice" }));

        gameService.queryRooms();

        expect(socketServiceMock.send).toHaveBeenCalledWith({
            playerId: "Alice",
            requestType: "QUERY_ROOMS",
            payload: { gameType: "chinese_poker" },
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
});
