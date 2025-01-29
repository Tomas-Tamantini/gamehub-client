import { Card } from "../../card";
import StateStore from "../../state_store";
import cardToStr from "../card_to_str";
import CardUI from "./card.model";

export function hiddenCardsComponent(numCards: number) {
    const div = document.createElement('div');
    div.classList.add('hand-container');
    div.innerHTML = `<div class="card card-back">${numCards}</div>`;
    return div;
}

export function privateCardsComponent(cards: CardUI[], stateStore: StateStore) {
    const div = document.createElement('div');
    div.classList.add('hand-container');
    cards.forEach(card => {
        div.appendChild(privateCardComponent(card, stateStore));
    });
    return div;
}

function* cardStyles(card: CardUI) {
    yield 'card';
    yield 'card-front';
    if (card.suit === 'd' || card.suit === 'h') yield 'red';
    else yield 'black';
    if (card.isSelected) yield 'selected';
}

function privateCardComponent(card: CardUI, stateStore: StateStore) {
    const div = document.createElement('div');
    for (const style of cardStyles(card)) div.classList.add(style);
    div.innerHTML = cardToStr(card);
    div.onclick = () => {
        stateStore.update(state => {
            const selectedCards = toggleSelection(card, state.selectedCards || []);
            return { ...state, selectedCards };
        });
    }
    div.ondblclick = () => {
        stateStore.update(state => ({ ...state, selectedCards: [] }));
    };
    return div;
}

function toggleSelection(card: Card, selectedCards: Card[]) {
    if (selectedCards.some(c => c.rank === card.rank && c.suit === card.suit))
        return selectedCards.filter(c => c.rank !== card.rank || c.suit !== card.suit);
    else return [...selectedCards, card];

}