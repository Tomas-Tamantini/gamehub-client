import { GlobalState } from "../state";
import createOpponentComponent from "./opponent";

export default class TableComponent {
    private table = document.getElementById('table');

    private reset() {
        while (this.table?.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
    }

    private offsetToPosition(offset: number): 'top' | 'left' | 'right' | 'bottom' {
        if (offset === 0) return 'bottom';
        else if (offset === 1) return 'left';
        else if (offset === 2) return 'top';
        else if (offset === 3) return 'right';
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
                    const isTheirTurn = state.sharedGameState?.currentPlayerId === player.playerId;
                    const lastMove = state.sharedGameState?.moveHistory.filter(m => m.playerId === player.playerId).pop();
                    const opp = createOpponentComponent(player, this.offsetToPosition(offset), isTheirTurn, lastMove);
                    this.table?.appendChild(opp);
                }
            });
        }
    }
}