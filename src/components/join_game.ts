import GameService from "../game_service";
import { GlobalState } from "../state";

export default class JoinGameComponent {
    private joinBtn = document.getElementById('join-btn');

    constructor(private gameService: GameService) {
        this.joinBtn?.addEventListener('click', this.onJoinBtnClick.bind(this));
    }

    private onJoinBtnClick() {
        this.gameService.joinGameByType();
    }

    public update(state: GlobalState) {
        if ((state.playerId && !state.roomId) || state.sharedGameState?.status === 'END_GAME') {
            this.joinBtn?.classList.remove('hidden');
        }
        else {
            this.joinBtn?.classList.add('hidden');
        }
    }
}