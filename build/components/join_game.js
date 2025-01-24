export default class JoinGameComponent {
    constructor(gameService) {
        var _a;
        this.gameService = gameService;
        this.joinBtn = document.getElementById('join-btn');
        (_a = this.joinBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.onJoinBtnClick.bind(this));
    }
    onJoinBtnClick() {
        this.gameService.joinGame();
    }
    update(state) {
        var _a, _b;
        if (state.playerId) {
            (_a = this.joinBtn) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        }
        else {
            (_b = this.joinBtn) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
        }
    }
}
