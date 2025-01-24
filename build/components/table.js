export default class TableComponent {
    constructor() {
        this.table = document.getElementById('table');
    }
    reset() {
        var _a;
        while ((_a = this.table) === null || _a === void 0 ? void 0 : _a.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
    }
    update(state) {
        var _a;
        this.reset();
        const players = (_a = state.sharedGameState) === null || _a === void 0 ? void 0 : _a.players;
        if (players) {
            const myIdx = players.findIndex(p => p.playerId === state.playerId);
            players.forEach((player, idx) => {
                const offset = (idx - myIdx + players.length) % players.length;
                // Create child component of table            
            });
        }
    }
}
