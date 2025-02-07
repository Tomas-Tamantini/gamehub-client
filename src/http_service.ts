import { snakeToCamel } from "./case_conversion";
import { GameRoomsResponse } from "./message";

export default class HttpService {
    constructor(private url: string) { }

    public getRooms(callback: (rooms: GameRoomsResponse) => void) {
        const queryParameters = new URLSearchParams({ game_type: 'chinese_poker' })
        const endpoint = `${this.url}/rooms?${queryParameters.toString()}`;
        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => callback(snakeToCamel(data) as GameRoomsResponse));
    }
}