import { Card } from "../card";
import { GlobalState } from "../state";
import StateStore from "../state_store";

export default class MyInfoComponent {
    private myInfoSpan = document.getElementById('my-info');
    private myCardsContainer = document.getElementById('my-cards');
    private myDealerToken = document.getElementById('my-dealer-token');

    constructor(private stateStore: StateStore) { }

    private reset() {
        if (this.myInfoSpan) this.myInfoSpan.innerHTML = '';
        while (this.myCardsContainer?.firstChild) {
            this.myCardsContainer.removeChild(this.myCardsContainer.firstChild);
        }
        if (this.myDealerToken) this.myDealerToken.style.display = 'none';
    }

    private cardToStr(card: Card) {
        const suitSymbols = { 'd': '♦', 'c': '♣', 'h': '♥', 's': '♠' };
        return `${card.rank}${suitSymbols[card.suit]}`;
    }

    private cardIsSelected(card: Card, selectedCards: Card[]) {
        return selectedCards.some(c => c.rank === card.rank && c.suit === card.suit);
    }

    private toggleSelection(card: Card, selectedCards: Card[]) {
        const idx = selectedCards.findIndex(c => c.rank === card.rank && c.suit === card.suit);
        if (idx === -1) {
            return [...selectedCards, card];
        }
        else {
            return selectedCards.filter(c => c.rank !== card.rank || c.suit !== card.suit);
        }
    }

    public update(state: GlobalState) {
        this.reset();
        const me = state.sharedGameState?.players.find(p => p.playerId === state.playerId);
        if (!me) return;
        const text = `${me.playerId} - ${me.numPoints}pts`;
        if (this.myInfoSpan) this.myInfoSpan.innerHTML = text;
        if (state.sharedGameState?.currentPlayerId === state.playerId) {
            if (this.myDealerToken) this.myDealerToken.style.display = 'block';
        }
        const cards = state.myCards;
        if (cards) {
            cards.forEach(card => {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                cardDiv.classList.add('card-front');
                if (this.cardIsSelected(card, state.selectedCards || [])) {
                    cardDiv.classList.add('selected');
                }
                if (card.suit === 'd' || card.suit === 'h') {
                    cardDiv.classList.add('red');
                }
                else {
                    cardDiv.classList.add('black');
                }
                const text = this.cardToStr(card);
                cardDiv.innerHTML = text;
                cardDiv.onclick = () => {
                    this.stateStore.update(state => {
                        const selectedCards = this.toggleSelection(card, state.selectedCards || []);
                        return { ...state, selectedCards };
                    });
                }
                this.myCardsContainer?.appendChild(cardDiv);
            })
        }
    }
}