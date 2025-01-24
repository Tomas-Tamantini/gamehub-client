import GameService from "../game_service";
import State from "../state";

export default class JoinGameComponent {
    private joinBtn = document.getElementById('join-btn');

    constructor(private gameService: GameService) {
        this.joinBtn?.addEventListener('click', this.onJoinBtnClick.bind(this));
    }

    private onJoinBtnClick() {
        this.gameService.joinGame();
    }

    public update(state: State) {
        if (state.playerId && !state.roomId) {
            this.joinBtn?.classList.remove('hidden');
        }
        else {
            this.joinBtn?.classList.add('hidden');
        }
    }
}