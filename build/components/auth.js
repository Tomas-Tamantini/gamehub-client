export default class AuthComponent {
    constructor(stateStore) {
        var _a;
        this.stateStore = stateStore;
        this.authBtn = document.getElementById('auth-btn');
        this.playerIdSpan = document.getElementById('player-id');
        (_a = this.authBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.onAuthBtnClick.bind(this));
    }
    update(state) {
        if (this.playerIdSpan) {
            this.playerIdSpan.innerText = state.playerId ? state.playerId : "";
        }
        if (this.authBtn) {
            this.authBtn.innerText = state.playerId ? "Logout" : "Login";
        }
    }
    onAuthBtnClick() {
        if (this.stateStore.getState().playerId) {
            this.stateStore.update((state) => (Object.assign(Object.assign({}, state), { playerId: "" })));
        }
        else {
            const playerId = prompt("Enter your player ID");
            if (playerId) {
                this.stateStore.update((state) => (Object.assign(Object.assign({}, state), { playerId })));
            }
        }
    }
}
