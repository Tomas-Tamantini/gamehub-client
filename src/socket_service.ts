export default class SocketService {
    private ws?: WebSocket;
    private callbackOnMessage?: (data: any) => void;

    public onMessage(callback: (data: object) => void) {
        this.callbackOnMessage = callback;
    }

    private camelToSnake(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map(this.camelToSnake);
        }
        else if (obj && typeof obj === "object") {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [
                    key.replace(/([A-Z])/g, "_$1").toLowerCase(),
                    this.camelToSnake(value),
                ])
            );
        }
        else return obj;
    }

    private snakeToCamel(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map(this.snakeToCamel);
        } else if (obj && typeof obj === "object") {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [
                    key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()),
                    this.snakeToCamel(value),
                ])
            );
        }
        return obj;
    }



    public send(data: object) {
        this.ws?.send(JSON.stringify(this.camelToSnake(data)));
    }

    public connect(url: string) {
        try {
            this.ws = new WebSocket(url);
            this.ws.onopen = () => {
                console.log("Socket connected");
            };
            this.ws.onmessage = (event) => {
                this.callbackOnMessage?.(this.snakeToCamel(JSON.parse(event.data)));
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