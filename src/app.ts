import AuthComponent from "./components/auth";
import SocketService from "./socket_service";
import StateStore from "./state_store";

const socketService = new SocketService();
socketService.connect("ws://localhost:8765");


const stateStore = new StateStore();
const authComponent = new AuthComponent(stateStore);
stateStore.subscribe(authComponent);