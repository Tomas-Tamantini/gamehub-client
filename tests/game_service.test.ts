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

    it("should send a join game request with the correct payload", () => {
        stateStore.update(() => ({ playerId: "Alice" }));

        gameService.joinGame();

        expect(socketServiceMock.send).toHaveBeenCalledWith({
            playerId: "Alice",
            requestType: "JOIN_GAME_BY_TYPE",
            payload: { gameType: "chinese_poker" },
        });
    });

    it("should send a make move request with the correct payload", () => {
        const cards: Card[] = [{ rank: 'A', suit: 'd' }];
        stateStore.update(() => ({
            playerId: "Alice",
            selectedCards: cards,
            roomId: 123
        }))
        gameService.makeMove();
        expect(socketServiceMock.send).toHaveBeenCalledWith({
            playerId: "Alice",
            requestType: "MAKE_MOVE",
            payload: { roomId: 123, move: { cards } },
        });
    });
});
