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

    test("should send a JOIN_GAME_BY_TYPE request with the correct payload", () => {
        stateStore.update(() => ({ playerId: "12345" }));

        gameService.joinGame();

        expect(socketServiceMock.send).toHaveBeenCalledWith({
            playerId: "12345",
            requestType: "JOIN_GAME_BY_TYPE",
            payload: { gameType: "chinese_poker" },
        });
    });
});
