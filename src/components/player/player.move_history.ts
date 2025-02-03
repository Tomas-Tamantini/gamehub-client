import { Card } from "../../card";
import cardToStr from "../card_to_str";
import Hand from "./hand.model";

export default function moveHistoryComponent(handHistory: Hand[], isMobile: boolean) {
    const div = document.createElement('div');
    div.classList.add('move-history');
    if (!isMobile && handHistory.length > 1) {
        const handBeforeLast = handHistory[handHistory.length - 2];
        div.appendChild(moveContainer(handBeforeLast, 'micro'));
    }
    if (handHistory.length > 0) {
        const lastHand = handHistory[handHistory.length - 1];
        div.appendChild(moveContainer(lastHand, 'mini'));
    }
    return div;
}

function moveContainer(hand: Hand, size: 'mini' | 'micro') {
    if (hand.cards.length === 0) return passDiv(size);
    const div = document.createElement('div');
    div.classList.add('hand-container');
    if (hand.isHandToBeat) div.classList.add('hand-to-beat');
    hand.cards.forEach(card => {
        div.appendChild(cardDiv(card, size));
    });
    return div;
}

function passDiv(size: 'mini' | 'micro') {
    const div = document.createElement('div');
    div.classList.add('pass-move');
    div.classList.add(size);
    div.innerHTML = 'Pass';
    return div;
}

function cardDiv(card: Card, size: 'mini' | 'micro') {
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add(`card-${size}`);
    if (card.suit === 'd' || card.suit === 'h') {
        div.classList.add('red');
    }
    else {
        div.classList.add('black');
    }
    div.innerHTML = cardToStr(card);
    return div;
}