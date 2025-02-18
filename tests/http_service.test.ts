import HttpService from "../src/http_service";
import { GameRoomsResponse } from "../src/message";

global.fetch = jest.fn();

describe("HttpService", () => {
    const mockUrl = "http://localhost:8000";
    let httpService: HttpService;

    beforeEach(() => {
        httpService = new HttpService(mockUrl);
        jest.clearAllMocks();
    });

    it("should call fetch with the correct URL", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue([]),
        });

        const callback = jest.fn();
        httpService.getRooms(callback);

        await new Promise(setImmediate);

        expect(fetch).toHaveBeenCalledWith(`${mockUrl}/rooms/?game_type=chinese_poker`, { "headers": { "ngrok-skip-browser-warning": "true" } });
    });

    it("should convert server snake_case to camelCase", async () => {
        const mockResponse = { "items": [{ "room_id": 1, "player_ids": ["A", "B"], "offline_players": [], "is_full": false }] };

        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const callback = jest.fn();
        httpService.getRooms(callback);

        await new Promise(setImmediate);

        expect(callback).toHaveBeenCalledWith({
            items: [
                { roomId: 1, playerIds: ["A", "B"], offlinePlayers: [], isFull: false },
            ]
        });
    });
});
