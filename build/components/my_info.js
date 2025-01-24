export default class MyInfoComponent {
    constructor() {
        this.myInfoSpan = document.getElementById('my-info');
        this.myCardsContainer = document.getElementById('my-cards');
    }
    reset() {
        var _a;
        if (this.myInfoSpan)
            this.myInfoSpan.innerHTML = '';
        while ((_a = this.myCardsContainer) === null || _a === void 0 ? void 0 : _a.firstChild) {
            this.myCardsContainer.removeChild(this.myCardsContainer.firstChild);
        }
    }
    cardToStr(card) {
        const suitSymbols = { 'd': '♦', 'c': '♣', 'h': '♥', 's': '♠' };
        return `${card.rank}${suitSymbols[card.suit]}`;
    }
    update(state) {
        var _a;
        this.reset();
        const me = (_a = state.sharedGameState) === null || _a === void 0 ? void 0 : _a.players.find(p => p.playerId === state.playerId);
        if (!me)
            return;
        const text = `${me.playerId} - ${me.numPoints}pts`;
        if (this.myInfoSpan)
            this.myInfoSpan.innerHTML = text;
        const cards = state.myCards;
        if (cards) {
            cards.forEach(card => {
                var _a;
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
                (_a = this.myCardsContainer) === null || _a === void 0 ? void 0 : _a.appendChild(cardDiv);
            });
        }
    }
}
