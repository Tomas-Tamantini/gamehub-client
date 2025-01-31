import PlayerUI from "./player.model";

function playerNameComponent(playerName: string) {
    const span = document.createElement('span');
    span.textContent = playerName;
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
    div.appendChild(playerNameComponent(player.playerId));
    div.appendChild(numPointsComponent(player.numPoints));
    return div;
}