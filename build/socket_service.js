export default class SocketService {
    onMessage(callback) {
        this.callbackOnMessage = callback;
    }
    send(data) {
        var _a;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(data));
    }
    connect(url) {
        try {
            this.ws = new WebSocket(url);
            this.ws.onopen = () => {
                console.log("Socket connected");
            };
            this.ws.onmessage = (event) => {
                var _a;
                (_a = this.callbackOnMessage) === null || _a === void 0 ? void 0 : _a.call(this, JSON.parse(event.data));
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
