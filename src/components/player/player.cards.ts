import { Card } from "../../card";
import { GlobalState } from "../../state";
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
    div.appendChild(handContainer(cards, stateStore));
    if (cards.length > 1) div.appendChild(sortButton(stateStore));
    return div;
}

export function handContainer(cards: CardUI[], stateStore: StateStore) {
    const div = document.createElement('div');
    div.classList.add('hand-container');
    div.classList.add('my-hand');
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

function cardValue(card: Card) {
    const sortedRanks = "3456789TJQKA2";
    const sortedSuits = "dhsc";
    const suitValue = sortedSuits.indexOf(card.suit);
    const rankValue = sortedRanks.indexOf(card.rank);
    return rankValue * 4 + suitValue;
}

function sortButton(stateStore: StateStore) {
    const button = document.createElement('button');
    button.classList.add('icon-btn');
    button.textContent = '⇄';
    button.onclick = () => {
        stateStore.update(sortCards);
    }
    return button;
}

function sortCards(state: GlobalState): GlobalState {
    if (!state.myCards || state.myCards.length === 0) return { ...state, selectedCards: [] };
    let myCards = state.myCards?.slice().sort((a, b) => cardValue(a) - cardValue(b));
    const isAscending = state.myCards.every((card, i, arr) => i === 0 || cardValue(arr[i - 1]) <= cardValue(card));
    if (isAscending) myCards = myCards.reverse();
    return { ...state, myCards, selectedCards: [] };
}