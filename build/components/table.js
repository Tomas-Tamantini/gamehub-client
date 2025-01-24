import createOpponentComponent from "./opponent.js";
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
    opponentPosition(offset) {
        if (offset === 1)
            return 'table-left';
        if (offset === 2)
            return 'table-top';
        if (offset === 3)
            return 'table-right';
        throw new Error(`Invalid offset: ${offset}`);
    }
    update(state) {
        var _a;
        this.reset();
        const players = (_a = state.sharedGameState) === null || _a === void 0 ? void 0 : _a.players;
        if (players) {
            const myIdx = players.findIndex(p => p.playerId === state.playerId);
            players.forEach((player, idx) => {
                var _a;
                const offset = (idx - myIdx + players.length) % players.length;
                if (offset != 0) {
                    const opp = createOpponentComponent(player, this.opponentPosition(offset));
                    (_a = this.table) === null || _a === void 0 ? void 0 : _a.appendChild(opp);
                }
            });
        }
    }
}
