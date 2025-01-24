import cardToStr from "./card_to_str.js";
export default function createOpponentComponent(player, position, isTheirTurn, lastMove) {
    // TODO: Join the arguments player / isTheirTurn / lastMove into a single object
    // TODO: Reduce cognitive complexity
    const div = document.createElement('div');
    div.classList.add('opponent');
    div.classList.add(position);
    const childDiv = document.createElement('div');
    childDiv.classList.add('opponent-info');
    if (!isTheirTurn) {
        childDiv.innerHTML = `
                            <span>${player.playerId} - ${player.numPoints}pts</span>
                            <div class="card card-back">${player.numCards}</div>
                            `;
    }
    else {
        childDiv.innerHTML = `<div class="player-status">
                                <span>${player.playerId} - ${player.numPoints}pts</span>
                                <div class="dealer-token"></div>
                            </div>
                            <div class="card card-back">${player.numCards}</div>`;
    }
    div.appendChild(childDiv);
    if (lastMove) {
        const lastMoveDiv = document.createElement('div');
        lastMoveDiv.classList.add('hand-container');
        if (lastMove.cards.length === 0) {
            const passDiv = document.createElement('div');
            passDiv.classList.add('pass-move');
            passDiv.innerHTML = 'Pass';
            lastMoveDiv.appendChild(passDiv);
        }
        else {
            lastMove.cards.forEach(card => {
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
                lastMoveDiv.appendChild(cardDiv);
            });
        }
        div.appendChild(lastMoveDiv);
    }
    return div;
}
