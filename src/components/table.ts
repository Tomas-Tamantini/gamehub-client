import { GlobalState } from "../state";

export default class TableComponent {
    private table = document.getElementById('table');

    private reset() {
        while (this.table?.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
    }

    public update(state: GlobalState) {
        this.reset();
        const players = state.sharedGameState?.players;
        if (players) {
            const myIdx = players.findIndex(p => p.playerId === state.playerId);
            players.forEach((player, idx) => {
                const offset = (idx - myIdx + players.length) % players.length;
                // Create child component of table            
            });
        }
    }
}