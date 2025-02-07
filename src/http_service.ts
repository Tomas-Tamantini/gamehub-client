import { snakeToCamel } from "./case_conversion";
import { GameRoomsResponse } from "./message";

export default class HttpService {
    constructor(private url: string) { }

    private getHeaders() {
        // This is necessary to bypass free-tier ngrok browser warning
        return { "ngrok-skip-browser-warning": "true" }
    }

    public getRooms(callback: (rooms: GameRoomsResponse) => void) {
        const queryParameters = new URLSearchParams({ game_type: 'chinese_poker' })
        const endpoint = `${this.url}/rooms?${queryParameters.toString()}`;
        fetch(endpoint, { headers: this.getHeaders() })
            .then((response) => response.json())
            .then((data) => callback(snakeToCamel(data) as GameRoomsResponse));
    }
}