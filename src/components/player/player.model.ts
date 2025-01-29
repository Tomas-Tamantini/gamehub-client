import { Card } from "../../card";
import { SharedPlayerState } from "../../state";
import CardUI from "./card.model";



export default interface PlayerUI extends SharedPlayerState {
    offset: number;
    cards?: CardUI[];
    isTheirTurn: boolean;
    moveHistory: Card[][];
}

