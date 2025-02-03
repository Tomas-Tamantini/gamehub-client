import StateStore from "../../state_store";
import PlayerUI from "./player.model";
import moveHistoryComponent from "./player.move_history";
import playerStateComponent from "./player.state";

function offsetToPosition(offset: number): 'top' | 'left' | 'right' | 'bottom' {
    if (offset === 0) return 'bottom';
    else if (offset === 1) return 'left';
    else if (offset === 2) return 'top';
    else if (offset === 3) return 'right';
    throw new Error(`Invalid offset: ${offset}`);
}

export default function playerComponent(player: PlayerUI, stateStore: StateStore) {
    const div = document.createElement('div');
    const position = offsetToPosition(player.offset);
    div.classList.add('player');
    div.classList.add(position);
    div.appendChild(playerStateComponent(player, stateStore));
    if (player.handHistory.length > 0) {
        const isMobile = stateStore.getState().isMobile ?? false;
        div.appendChild(moveHistoryComponent(player.handHistory, isMobile));
    }
    return div;
}


