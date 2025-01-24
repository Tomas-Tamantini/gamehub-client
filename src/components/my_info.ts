import { Card } from "../card";
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

    private cardToStr(card: Card) {
        const suitSymbols = { 'd': '♦', 'c': '♣', 'h': '♥', 's': '♠' };
        return `${card.rank}${suitSymbols[card.suit]}`;
    }

    public update(state: GlobalState) {
        this.reset();
        const me = state.sharedGameState?.players.find(p => p.playerId === state.playerId);
        if (!me) return;
        const text = `${me.playerId} - ${me.numPoints}pts`;
        if (this.myInfoSpan) this.myInfoSpan.innerHTML = text;
        const cards = state.myCards;
        if (cards) {
            cards.forEach(card => {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                cardDiv.classList.add('card-front');
                if (card.suit === 'd' || card.suit === 'h') {
                    cardDiv.classList.add('red');
                }
                else {
                    cardDiv.classList.add('black');
                }
                const text = this.cardToStr(card);
                cardDiv.innerHTML = text;
                this.myCardsContainer?.appendChild(cardDiv);
            })
        }
    }
}