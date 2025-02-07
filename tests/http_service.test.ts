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

        expect(fetch).toHaveBeenCalledWith(`${mockUrl}/rooms?game_type=chinese_poker`);
    });

    it("should invoke the callback with parsed JSON data", async () => {
        const mockResponse: GameRoomsResponse = {
            items: [
                { roomId: 1, playerIds: ["A", "B"], offlinePlayers: [], isFull: false },
            ]
        };

        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const callback = jest.fn();
        httpService.getRooms(callback);

        await new Promise(setImmediate);

        expect(callback).toHaveBeenCalledWith(mockResponse);
    });
});
