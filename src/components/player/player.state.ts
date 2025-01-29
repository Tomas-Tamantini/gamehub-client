import StateStore from "../../state_store";
import { hiddenCardsComponent, privateCardsComponent } from "./player.cards";
import PlayerUI from "./player.model";
import playerStatusComponent from "./player.status";

export default function playerStateComponent(player: PlayerUI, stateStore: StateStore) {
    const div = document.createElement('div');
    div.classList.add('player-state');
    div.appendChild(playerStatusComponent(player));
    if (player.cards !== undefined) div.appendChild(privateCardsComponent(player.cards, stateStore));
    else
        div.appendChild(hiddenCardsComponent(player.numCards));
    return div;
}