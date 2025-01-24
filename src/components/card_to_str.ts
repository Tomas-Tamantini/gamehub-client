import { Card } from "../card";

export default function cardToStr(card: Card) {
    const suitSymbols = { 'd': '♦', 'c': '♣', 'h': '♥', 's': '♠' };
    return `${card.rank}${suitSymbols[card.suit]}`;
}