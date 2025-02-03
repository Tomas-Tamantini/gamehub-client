import { GlobalState, Move, SharedPlayerState } from "../state";
import StateStore from "../state_store";
import CardUI from "./player/card.model";
import playerComponent from "./player/player.container";

export default class TableComponent {
    private table = document.getElementById('table');

    constructor(private stateStore: StateStore) { }

    private reset() {
        while (this.table?.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
    }

    private cardsUI(playerOffset: number, state: GlobalState): CardUI[] | undefined {
        if (playerOffset !== 0 || state.myCards === undefined) return undefined;
        if (state.selectedCards === undefined) return state.myCards.map(card => ({ ...card, isSelected: false }));
        else return state.myCards.map(card => (
            {
                ...card,
                isSelected: state.selectedCards!.some(c => c.rank === card.rank && c.suit === card.suit)
            }));
    }

    private isHandToBeat(move: Move, moves: Move[] | undefined): boolean {
        const lastNonPassMove = moves?.slice().reverse().find(m => m.cards.length > 0);
        return move === lastNonPassMove;
    }

    private playerDiv(player: SharedPlayerState, offset: number, state: GlobalState) {
        const cards = this.cardsUI(offset, state);
        const isTheirTurn = state.sharedGameState?.currentPlayerId === player.playerId;
        const moveHistory = state.sharedGameState?.moveHistory.filter(m => m.playerId === player.playerId) || [];
        const handHistory = moveHistory.map(m => (
            {
                cards: m.cards,
                isHandToBeat: this.isHandToBeat(m, state.sharedGameState?.moveHistory),
            }))
        const isOffline = state.offlinePlayers?.includes(player.playerId) ?? false;
        const playerInfo = { ...player, offset, cards, isTheirTurn, handHistory, isOffline };
        return playerComponent(playerInfo, this.stateStore);
    }

    public update(state: GlobalState) {
        this.reset();
        const players = state.sharedGameState?.players;
        if (players) {
            const myIdx = players.findIndex(p => p.playerId === state.playerId);
            players.forEach((player, idx) => {
                const offset = (idx - myIdx + players.length) % players.length;
                this.table?.appendChild(this.playerDiv(player, offset, state));
            });
        }
    }
}