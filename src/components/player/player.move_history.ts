import { Card } from "../../card";
import cardToStr from "../card_to_str";

export default function moveHistoryComponent(moveHistory: Card[][]) {
    const div = document.createElement('div');
    div.classList.add('move-history');
    if (moveHistory.length > 1) {
        const moveBeforeLast = moveHistory[moveHistory.length - 2];
        div.appendChild(moveContainer(moveBeforeLast, 'micro'));
    }
    if (moveHistory.length > 0) {
        const lastMove = moveHistory[moveHistory.length - 1];
        div.appendChild(moveContainer(lastMove, 'mini'));
    }
    return div;
}

function moveContainer(move: Card[], size: 'mini' | 'micro') {
    if (move.length === 0) return passDiv(size);
    const div = document.createElement('div');
    div.classList.add('hand-container');
    move.forEach(card => {
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