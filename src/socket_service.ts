import { camelToSnake, snakeToCamel } from "./case_conversion";

export default class SocketService {
    private ws?: WebSocket;
    private callbackOnMessage?: (data: object) => void;
    private callbackOnError?: (e: any) => void;

    constructor(private url: string) { }

    public onMessage(callback: (data: object) => void) {
        this.callbackOnMessage = callback;
    }

    public onError(callback: (e: any) => void) {
        this.callbackOnError = callback;
    }

    public send(data: object) {
        this.ws?.send(JSON.stringify(camelToSnake(data)));
    }

    public connect(playerId: string) {
        const fullUrl = this.url + "?player_id=" + playerId;
        try {
            this.ws = new WebSocket(fullUrl);
            this.ws.onopen = () => {
                console.log("Socket connected");
            };
            this.ws.onmessage = (event) => {
                this.callbackOnMessage?.(snakeToCamel(JSON.parse(event.data)));
            };
            this.ws.onclose = () => {
                console.log("Socket closed");
            };
            this.ws.onerror = (error) => {
                this.callbackOnError?.(error);
            }
        }
        catch (error) {
            this.callbackOnError?.(error);
        }
    }
}