import PlayerUI from "./player.model";

function playerNameComponent(player: PlayerUI) {
    const span = document.createElement('span');
    if (player.isOffline) span.classList.add('offline');
    span.textContent = player.playerId;
    return span;
}

function numPointsComponent(numPoints: number) {
    const span = document.createElement('span');
    span.classList.add('num-points');
    span.textContent = `${numPoints} pts`;
    return span;
}

export default function playerStatusComponent(player: PlayerUI) {
    const div = document.createElement('div');
    div.classList.add('player-status');
    if (player.isTheirTurn) div.classList.add('their-turn');
    div.appendChild(playerNameComponent(player));
    div.appendChild(numPointsComponent(player.numPoints));
    return div;
}