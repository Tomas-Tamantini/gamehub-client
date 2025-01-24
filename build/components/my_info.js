export default class MyInfoComponent {
    constructor() {
        this.myInfoSpan = document.getElementById('my-info');
        this.myCardsContainer = document.getElementById('my-cards');
    }
    reset() {
        var _a;
        if (this.myInfoSpan)
            this.myInfoSpan.innerHTML = '';
        while ((_a = this.myCardsContainer) === null || _a === void 0 ? void 0 : _a.firstChild) {
            this.myCardsContainer.removeChild(this.myCardsContainer.firstChild);
        }
    }
    update(state) {
        var _a;
        this.reset();
        const me = (_a = state.sharedGameState) === null || _a === void 0 ? void 0 : _a.players.find(p => p.playerId === state.playerId);
        if (!me)
            return;
        const text = `${me.playerId} - ${me.numPoints}pts`;
        if (this.myInfoSpan)
            this.myInfoSpan.innerHTML = text;
    }
}
