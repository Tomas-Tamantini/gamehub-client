import SocketService from '../src/socket_service';

describe('SocketService', () => {
    let socketService: SocketService;
    let mockWebSocket: jest.Mocked<WebSocket>;

    beforeEach(() => {
        mockWebSocket = {
            onmessage: jest.fn(),
            send: jest.fn(),
        } as any;
        global.WebSocket = jest.fn(() => mockWebSocket) as any;
        socketService = new SocketService('ws://localhost:3000/ws');
        socketService.connect("testPlayerId");
    });

    it('should connect to the given url with proper player id', () => {
        expect(global.WebSocket).toHaveBeenCalledWith('ws://localhost:3000/ws?player_id=testPlayerId');
    });

    it('should send message to given url', () => {
        socketService.send({ message: 'Hello' });
        expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify({ message: 'Hello' }));
    });

    it('should callback on connection error', () => {
        const callback = jest.fn();
        socketService.onError(callback);
        mockWebSocket.onerror!({} as Event);
        expect(callback).toHaveBeenCalled();
    })

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