import SocketService from '../src/socket_service';

describe('SocketService', () => {
    let socketService: SocketService;
    let mockWebSocket: jest.Mocked<WebSocket>;

    beforeEach(() => {
        socketService = new SocketService();
        mockWebSocket = {
            onmessage: jest.fn(),
            send: jest.fn(),
        } as any;
        global.WebSocket = jest.fn(() => mockWebSocket) as any;
        socketService = new SocketService();
        socketService.connect('ws://localhost:3000');
    });

    it('should connect to the given url', () => {
        expect(global.WebSocket).toHaveBeenCalledWith('ws://localhost:3000');
    });

    it('should send message to given url', () => {
        socketService.send({ message: 'Hello' });
        expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify({ message: 'Hello' }));
    });

    it('should convert camel to snake case when sending', () => {
        socketService.send({ firstKey: { secondKey: "Hello" } });
        expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify({ first_key: { second_key: "Hello" } }));
    });

    it('should send parsed message to subscribed callback', () => {
        const callback = jest.fn();
        socketService.onMessage(callback);
        const data = JSON.stringify({ message: 'Hello' });
        mockWebSocket.onmessage!({ data } as MessageEvent);
        expect(callback).toHaveBeenCalledWith({ message: 'Hello' });
    });

    it('should convert snake to camel case in incoming messages', () => {
        const callback = jest.fn();
        socketService.onMessage(callback);
        const data = JSON.stringify({ first_key: { second_key: "Hello" } });
        mockWebSocket.onmessage!({ data } as MessageEvent);
        expect(callback).toHaveBeenCalledWith({ firstKey: { secondKey: "Hello" } });
    });
});