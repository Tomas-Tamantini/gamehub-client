import { GlobalState } from "../state";

export default class MyInfoComponent {
    private myInfoSpan = document.getElementById('my-info');
    private myCardsContainer = document.getElementById('my-cards');

    private reset() {
        if (this.myInfoSpan) this.myInfoSpan.innerHTML = '';
        while (this.myCardsContainer?.firstChild) {
            this.myCardsContainer.removeChild(this.myCardsContainer.firstChild);
        }
    }

    public update(state: GlobalState) {
        this.reset();
        const me = state.sharedGameState?.players.find(p => p.playerId === state.playerId);
        if (!me) return;
        const text = `${me.playerId} - ${me.numPoints}pts`;
        if (this.myInfoSpan) this.myInfoSpan.innerHTML = text;
    }
}