import { SharedPlayerState } from "../../state";
import CardUI from "./card.model";
import Hand from "./hand.model";



export default interface PlayerUI extends SharedPlayerState {
    offset: number;
    cards?: CardUI[];
    isTheirTurn: boolean;
    handHistory: Hand[];
}

