import { GlobalState } from "../state";
import StateStore from "../state_store";

export default class AuthComponent {
    private authBtn = document.getElementById('auth-btn');
    private playerIdSpan = document.getElementById('player-id');

    constructor(private stateStore: StateStore) {
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
                this.stateStore.update(
                    (state: GlobalState) => ({ ...state, playerId })
                )
            }
        }
    }
}