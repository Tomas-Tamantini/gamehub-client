import SocketService from "./socket_service";

const socketService = new SocketService();
socketService.connect("ws://localhost:8765");
