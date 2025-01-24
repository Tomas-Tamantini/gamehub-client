import AlertMsgComponent from "./components/alert_msg.js";
import AuthComponent from "./components/auth.js";
import JoinGameComponent from "./components/join_game.js";
import MyInfoComponent from "./components/my_info.js";
import TableComponent from "./components/table.js";
import GameService from "./game_service.js";
import MessageHandler from "./message_handler.js";
import SocketService from "./socket_service.js";
import StateStore from "./state_store.js";
const stateStore = new StateStore();
const messageHandler = new MessageHandler(stateStore);
const socketService = new SocketService();
const serverUrl = prompt("Enter server URL", "ws://localhost:8765");
socketService.connect(serverUrl);
socketService.onMessage((message) => { messageHandler.handle(message); });
const gameService = new GameService(socketService, stateStore);
const authComponent = new AuthComponent(stateStore);
stateStore.subscribe(authComponent);
const joinGameComponent = new JoinGameComponent(gameService);
stateStore.subscribe(joinGameComponent);
const alertMsgComponent = new AlertMsgComponent();
stateStore.subscribe(alertMsgComponent);
const tableComponent = new TableComponent();
stateStore.subscribe(tableComponent);
const myInfoComponent = new MyInfoComponent(stateStore, gameService);
stateStore.subscribe(myInfoComponent);
