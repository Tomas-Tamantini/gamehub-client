export default class MyInfoComponent {
    constructor(stateStore, gameService) {
        var _a;
        this.stateStore = stateStore;
        this.gameService = gameService;
        this.myInfoSpan = document.getElementById('my-info');
        this.myCardsContainer = document.getElementById('my-cards');
        this.myDealerToken = document.getElementById('my-dealer-token');
        this.makeMoveBtn = document.getElementById('make-move-btn');
        this.myHistoryContainer = document.getElementById('my-history');
        (_a = this.makeMoveBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.gameService.makeMove();
        });
    }
    reset() {
        var _a, _b;
        if (this.myInfoSpan)
            this.myInfoSpan.innerHTML = '';
        while ((_a = this.myCardsContainer) === null || _a === void 0 ? void 0 : _a.firstChild) {
            this.myCardsContainer.removeChild(this.myCardsContainer.firstChild);
        }
        if (this.myDealerToken)
            this.myDealerToken.style.display = 'none';
        if (this.makeMoveBtn)
            this.makeMoveBtn.style.display = 'none';
        while ((_b = this.myHistoryContainer) === null || _b === void 0 ? void 0 : _b.firstChild) {
            this.myHistoryContainer.removeChild(this.myHistoryContainer.firstChild);
        }
    }
    cardToStr(card) {
        const suitSymbols = { 'd': '♦', 'c': '♣', 'h': '♥', 's': '♠' };
        return `${card.rank}${suitSymbols[card.suit]}`;
    }
    cardIsSelected(card, selectedCards) {
        return selectedCards.some(c => c.rank === card.rank && c.suit === card.suit);
    }
    toggleSelection(card, selectedCards) {
        const idx = selectedCards.findIndex(c => c.rank === card.rank && c.suit === card.suit);
        if (idx === -1) {
            return [...selectedCards, card];
        }
        else {
            return selectedCards.filter(c => c.rank !== card.rank || c.suit !== card.suit);
        }
    }
    update(state) {
        var _a, _b, _c;
        this.reset();
        const me = (_a = state.sharedGameState) === null || _a === void 0 ? void 0 : _a.players.find(p => p.playerId === state.playerId);
        if (!me)
            return;
        const text = `${me.playerId} - ${me.numPoints}pts`;
        if (this.myInfoSpan)
            this.myInfoSpan.innerHTML = text;
        if (((_b = state.sharedGameState) === null || _b === void 0 ? void 0 : _b.currentPlayerId) === state.playerId) {
            if (this.myDealerToken)
                this.myDealerToken.style.display = 'block';
            if (this.makeMoveBtn)
                this.makeMoveBtn.style.display = 'block';
        }
        const cards = state.myCards;
        if (cards) {
            cards.forEach(card => {
                var _a;
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
                        return Object.assign(Object.assign({}, state), { selectedCards });
                    });
                };
                (_a = this.myCardsContainer) === null || _a === void 0 ? void 0 : _a.appendChild(cardDiv);
            });
        }
        const history = (_c = state.sharedGameState) === null || _c === void 0 ? void 0 : _c.moveHistory;
        const myLastMove = history === null || history === void 0 ? void 0 : history.reverse().find(m => m.playerId === state.playerId);
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
                    var _a;
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');
                    cardDiv.classList.add('card-mini');
                    if (card.suit === 'd' || card.suit === 'h') {
                        cardDiv.classList.add('red');
                    }
                    else {
                        cardDiv.classList.add('black');
                    }
                    const text = this.cardToStr(card);
                    cardDiv.innerHTML = text;
                    (_a = this.myHistoryContainer) === null || _a === void 0 ? void 0 : _a.appendChild(cardDiv);
                });
            }
        }
    }
}
