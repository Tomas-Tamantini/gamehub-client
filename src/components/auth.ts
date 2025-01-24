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
            this.authBtn.innerText = state.playerId ? "Logout" : "Login";
        }
    }

    private onAuthBtnClick() {
        if (this.stateStore.getState().playerId) {
            this.stateStore.update(
                (state: GlobalState) => ({ ...state, playerId: "" })
            )
        }
        else {
            const playerId = prompt("Enter your player ID");
            if (playerId) {
                this.stateStore.update(
                    (state: GlobalState) => ({ ...state, playerId })
                )
            }
        }
    }
}