import { GlobalState } from "../state";
import createOpponentComponent from "./opponent";

export default class TableComponent {
    private table = document.getElementById('table');

    private reset() {
        while (this.table?.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
    }

    private opponentPosition(offset: number): 'table-top' | 'table-left' | 'table-right' {
        if (offset === 1) return 'table-left';
        if (offset === 2) return 'table-top';
        if (offset === 3) return 'table-right';
        throw new Error(`Invalid offset: ${offset}`);
    }

    public update(state: GlobalState) {
        this.reset();
        const players = state.sharedGameState?.players;
        if (players) {
            const myIdx = players.findIndex(p => p.playerId === state.playerId);
            players.forEach((player, idx) => {
                const offset = (idx - myIdx + players.length) % players.length;
                if (offset != 0) {
                    const opp = createOpponentComponent(player, this.opponentPosition(offset));
                    this.table?.appendChild(opp);
                }
            });
        }
    }
}