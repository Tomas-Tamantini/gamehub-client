import AuthComponent from "./components/auth.js";
import SocketService from "./socket_service.js";
import StateStore from "./state_store.js";
const socketService = new SocketService();
socketService.connect("ws://localhost:8765");
const stateStore = new StateStore();
const authComponent = new AuthComponent(stateStore);
stateStore.subscribe(authComponent);
