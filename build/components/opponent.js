export default function createOpponentComponent(player, position) {
    const div = document.createElement('div');
    div.classList.add('opponent');
    div.classList.add(position);
    div.innerHTML = `
        <div class="opponent-info">
            <div>${player.playerId} - ${player.numPoints}pts</div>
            <div class="card card-back">${player.numCards}</div>
        </div>
    `;
    return div;
}
