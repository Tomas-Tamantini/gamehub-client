function camelToSnake(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(camelToSnake);
    }
    else if (obj && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key.replace(/([A-Z])/g, "_$1").toLowerCase(),
                camelToSnake(value),
            ])
        );
    }
    else return obj;
}

function snakeToCamel(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(snakeToCamel);
    } else if (obj && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()),
                snakeToCamel(value),
            ])
        );
    }
    return obj;
}

export default class SocketService {
    private ws?: WebSocket;
    private callbackOnMessage?: (data: any) => void;

    public onMessage(callback: (data: object) => void) {
        this.callbackOnMessage = callback;
    }

    public send(data: object) {
        this.ws?.send(JSON.stringify(camelToSnake(data)));
    }

    public connect(url: string) {
        try {
            this.ws = new WebSocket(url);
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
                console.log(`Socket error: ${error}`);
            }
        }
        catch (error) {
            console.log(`Socket error: ${error}`);
        }
    }
}