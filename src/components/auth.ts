import SocketService from "../socket_service";
import { GlobalState } from "../state";
import StateStore from "../state_store";

export default class AuthComponent {
    private authBtn = document.getElementById('auth-btn');
    private playerIdSpan = document.getElementById('player-id');

    constructor(private stateStore: StateStore, private socketService: SocketService) {
        this.authBtn?.addEventListener('click', this.onAuthBtnClick.bind(this));
    }

    public update(state: GlobalState) {
        if (this.playerIdSpan) {
            this.playerIdSpan.innerText = state.playerId ? state.playerId : "";
        }
        if (this.authBtn) {
            this.authBtn.style.display = state.playerId ? "none" : "block";
        }
    }

    private onAuthBtnClick() {
        if (!this.stateStore.getState().playerId) {
            const playerId = prompt("Enter your player ID");
            if (playerId) {
                const trimmedPlayerId = playerId.trim();
                this.socketService.connect(trimmedPlayerId);
                this.stateStore.update(
                    (state: GlobalState) => ({ ...state, playerId: trimmedPlayerId })
                )
            }
        }
    }
}