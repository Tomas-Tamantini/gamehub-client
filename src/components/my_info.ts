import { Card } from "../card";
import GameService from "../game_service";
import { GlobalState } from "../state";
import StateStore from "../state_store";
import cardToStr from "./card_to_str";

export default class MyInfoComponent {
    private myInfoSpan = document.getElementById('my-info');
    private myCardsContainer = document.getElementById('my-cards');
    private myDealerToken = document.getElementById('my-dealer-token');
    private makeMoveBtn = document.getElementById('make-move-btn');
    private myHistoryContainer = document.getElementById('my-history');

    constructor(private stateStore: StateStore, private gameService: GameService) {
        this.makeMoveBtn?.addEventListener('click', () => {
            this.gameService.makeMove();
        });
    }

    private reset() {
        if (this.myInfoSpan) this.myInfoSpan.innerHTML = '';
        while (this.myCardsContainer?.firstChild) {
            this.myCardsContainer.removeChild(this.myCardsContainer.firstChild);
        }
        if (this.myDealerToken) this.myDealerToken.style.display = 'none';
        if (this.makeMoveBtn) this.makeMoveBtn.style.display = 'none';
        while (this.myHistoryContainer?.firstChild) {
            this.myHistoryContainer.removeChild(this.myHistoryContainer.firstChild);
        }
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
            if (this.makeMoveBtn) this.makeMoveBtn.style.display = 'block';
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
                const text = cardToStr(card);
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

        const history = state.sharedGameState?.moveHistory;
        const myLastMove = history?.filter(m => m.playerId === state.playerId).pop();
        if (myLastMove) {
            if (myLastMove.cards.length === 0) {
                if (this.myHistoryContainer) {
                    const passDiv = document.createElement('div');
                    passDiv.classList.add('pass-move');
                    passDiv.innerHTML = 'Pass';
                    this.myHistoryContainer.appendChild(passDiv);
                }
            }
            else {
                myLastMove.cards.forEach(card => {
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');
                    cardDiv.classList.add('card-mini');
                    if (card.suit === 'd' || card.suit === 'h') {
                        cardDiv.classList.add('red');
                    }
                    else {
                        cardDiv.classList.add('black');
                    }
                    const text = cardToStr(card);
                    cardDiv.innerHTML = text;
                    this.myHistoryContainer?.appendChild(cardDiv);
                });
            }
        }
    }
}