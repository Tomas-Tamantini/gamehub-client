import GameService from "../game_service";
import { GameStatus, GlobalState } from "../state";
import StateStore from "../state_store";

export default class ActionButtonsComponent {
    private makeMoveBtn = document.getElementById('make-move-btn');
    private passBtn = document.getElementById('pass-btn');

    constructor(stateStore: StateStore, private gameService: GameService) {
        this.makeMoveBtn?.addEventListener('click', () => this.gameService.makeMove(stateStore.getState().selectedCards || []));
        this.passBtn?.addEventListener('click', () => this.gameService.makeMove([]));
    }

    private isMyTurn(state: GlobalState) {
        return state.sharedGameState?.status === GameStatus.AWAIT_PLAYER_ACTION &&
            state.sharedGameState?.currentPlayerId === state.playerId;
    }

    private updatePassBtn(state: GlobalState) {
        if (this.isMyTurn(state)) this.passBtn?.removeAttribute('disabled');
        else this.passBtn?.setAttribute('disabled', 'true');
    }

    private updateMakeMoveBtn(state: GlobalState) {
        const numSelectedCards = state.selectedCards?.length ?? 0;
        if (this.isMyTurn(state) && numSelectedCards > 0) this.makeMoveBtn?.removeAttribute('disabled');
        else this.makeMoveBtn?.setAttribute('disabled', 'true');
    }


    public update(state: GlobalState) {
        this.updatePassBtn(state);
        this.updateMakeMoveBtn(state);
    }
}