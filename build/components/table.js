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
    offsetToPosition(offset) {
        if (offset === 0)
            return 'bottom';
        else if (offset === 1)
            return 'left';
        else if (offset === 2)
            return 'top';
        else if (offset === 3)
            return 'right';
        throw new Error(`Invalid offset: ${offset}`);
    }
    update(state) {
        var _a;
        this.reset();
        const players = (_a = state.sharedGameState) === null || _a === void 0 ? void 0 : _a.players;
        if (players) {
            const myIdx = players.findIndex(p => p.playerId === state.playerId);
            players.forEach((player, idx) => {
                var _a, _b;
                const offset = (idx - myIdx + players.length) % players.length;
                if (offset != 0) {
                    const isTheirTurn = ((_a = state.sharedGameState) === null || _a === void 0 ? void 0 : _a.currentPlayerId) === player.playerId;
                    const opp = createOpponentComponent(player, this.offsetToPosition(offset), isTheirTurn);
                    (_b = this.table) === null || _b === void 0 ? void 0 : _b.appendChild(opp);
                }
            });
        }
    }
}
