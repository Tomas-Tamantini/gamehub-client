import SocketService from "./socket_service.js";
const socketService = new SocketService();
socketService.connect("ws://localhost:8765");
