import { Card } from "../../card";

export default interface Hand {
    cards: Card[];
    isHandToBeat: boolean;
}