import ActionButtonsComponent from "./components/action_buttons";
import AlertMsgComponent from "./components/alert_msg";
import AuthComponent from "./components/auth";
import JoinGameComponent from "./components/join_game";
import TableComponent from "./components/table";
import GameService from "./game_service";
import { Message } from "./message";
import MessageHandler from "./message_handler";
import SocketService from "./socket_service";
import StateStore from "./state_store";

const stateStore = new StateStore();
const messageHandler = new MessageHandler(stateStore);

const socketService = new SocketService();
const serverUrl = prompt("Enter server URL", "ws://localhost:8765");
socketService.connect(serverUrl!);
socketService.onMessage((message) => { messageHandler.handle(message as Message) });


const gameService = new GameService(socketService, stateStore);

const authComponent = new AuthComponent(stateStore);
stateStore.subscribe(authComponent);

const joinGameComponent = new JoinGameComponent(gameService);
stateStore.subscribe(joinGameComponent);

const alertMsgComponent = new AlertMsgComponent();
stateStore.subscribe(alertMsgComponent);

const tableComponent = new TableComponent(stateStore);
stateStore.subscribe(tableComponent);

const actionButtonsComponent = new ActionButtonsComponent(stateStore, gameService);
stateStore.subscribe(actionButtonsComponent);