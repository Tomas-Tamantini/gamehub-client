export default class SocketService {
    private ws?: WebSocket;
    private callbackOnMessage?: (data: any) => void;

    public onMessage(callback: (data: object) => void) {
        this.callbackOnMessage = callback;
    }

    public send(data: object) {
        this.ws?.send(JSON.stringify(data));
    }

    public connect(url: string) {
        try {
            this.ws = new WebSocket(url);
            this.ws.onopen = () => {
                console.log("Socket connected");
            };
            this.ws.onmessage = (event) => {
                this.callbackOnMessage?.(JSON.parse(event.data));
            };
            this.ws.onclose = () => {
                console.log("Socket closed");
            };
            this.ws.onerror = (error) => {
                console.log(`Socket error: ${error}`);
            }
        }
        catch (error) {
            console.log(`Socket error: ${error}`);
        }
    }
}