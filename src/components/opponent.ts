import { SharedPlayerState } from "../state";

export default function createOpponentComponent(player: SharedPlayerState, position: 'table-top' | 'table-left' | 'table-right'): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('opponent');
    div.classList.add(position);
    div.innerHTML = `
        <div class="opponent-info">
            <span>${player.playerId} - ${player.numPoints}pts</span>
            <div class="card card-back">${player.numCards}</div>
        </div>
    `;
    return div;
}