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

const socketService = new SocketService();
const stateStore = new StateStore();
const gameService = new GameService(socketService, stateStore);
const messageHandler = new MessageHandler(stateStore, gameService);

const serverUrl = prompt("Enter server URL", "ws://localhost:8000");
socketService.connect(serverUrl!);
socketService.onMessage((message) => { messageHandler.handle(message as Message) });
socketService.onError(() => { stateStore.update(state => ({ ...state, alertMsg: "Error: Could not connect to server" })) });



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

function handleScreenSizeChange(e: MediaQueryList) {
    stateStore.update(state => ({ ...state, isMobile: e.matches }));
}

const mediaQuery = window.matchMedia("(max-width: 600px), (max-height: 620px)");
mediaQuery.addEventListener("change", () => handleScreenSizeChange(mediaQuery));

handleScreenSizeChange(mediaQuery);