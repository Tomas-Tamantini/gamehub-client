export default function createOpponentComponent(player, position, isTheirTurn) {
    const div = document.createElement('div');
    div.classList.add('opponent');
    div.classList.add(position);
    if (!isTheirTurn) {
        div.innerHTML = `<div class="opponent-info">
                            <span>${player.playerId} - ${player.numPoints}pts</span>
                            <div class="card card-back">${player.numCards}</div>
                        </div>`;
    }
    else {
        div.innerHTML = `<div class="opponent-info">
                            <div class="player-status">
                                <span>${player.playerId} - ${player.numPoints}pts</span>
                                <div class="dealer-token"></div>
                            </div>
                            <div class="card card-back">${player.numCards}</div>
                        </div>`;
    }
    return div;
}
