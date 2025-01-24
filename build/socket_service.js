export default class SocketService {
    onMessage(callback) {
        this.callbackOnMessage = callback;
    }
    camelToSnake(obj) {
        if (Array.isArray(obj)) {
            return obj.map(this.camelToSnake);
        }
        else if (obj && typeof obj === "object") {
            return Object.fromEntries(Object.entries(obj).map(([key, value]) => [
                key.replace(/([A-Z])/g, "_$1").toLowerCase(),
                this.camelToSnake(value),
            ]));
        }
        else
            return obj;
    }
    snakeToCamel(obj) {
        if (Array.isArray(obj)) {
            return obj.map(this.snakeToCamel);
        }
        else if (obj && typeof obj === "object") {
            return Object.fromEntries(Object.entries(obj).map(([key, value]) => [
                key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()),
                this.snakeToCamel(value),
            ]));
        }
        return obj;
    }
    send(data) {
        var _a;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(this.camelToSnake(data)));
    }
    connect(url) {
        try {
            this.ws = new WebSocket(url);
            this.ws.onopen = () => {
                console.log("Socket connected");
            };
            this.ws.onmessage = (event) => {
                var _a;
                (_a = this.callbackOnMessage) === null || _a === void 0 ? void 0 : _a.call(this, this.snakeToCamel(JSON.parse(event.data)));
            };
            this.ws.onclose = () => {
                console.log("Socket closed");
            };
            this.ws.onerror = (error) => {
                console.log(`Socket error: ${error}`);
            };
        }
        catch (error) {
            console.log(`Socket error: ${error}`);
        }
    }
}
