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
        var _a, _b, _c;
        if ((state.playerId && !state.roomId) || ((_a = state.sharedGameState) === null || _a === void 0 ? void 0 : _a.status) === 'END_GAME') {
            (_b = this.joinBtn) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        }
        else {
            (_c = this.joinBtn) === null || _c === void 0 ? void 0 : _c.classList.add('hidden');
        }
    }
}
