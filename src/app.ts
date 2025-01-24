import AuthComponent from "./components/auth";
import JoinGameComponent from "./components/join_game";
import GameService from "./game_service";
import Message from "./message";
import MessageHandler from "./message_handler";
import SocketService from "./socket_service";
import StateStore from "./state_store";

const messageHandler = new MessageHandler();

const socketService = new SocketService();
socketService.connect("ws://localhost:8765");
socketService.onMessage((message) => { messageHandler.handle(message as Message) });


const stateStore = new StateStore();
const gameService = new GameService(socketService, stateStore);

const authComponent = new AuthComponent(stateStore);
stateStore.subscribe(authComponent);

const joinGameComponent = new JoinGameComponent(gameService);
stateStore.subscribe(joinGameComponent);