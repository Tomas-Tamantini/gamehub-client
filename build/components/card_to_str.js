export default function cardToStr(card) {
    const suitSymbols = { 'd': '♦', 'c': '♣', 'h': '♥', 's': '♠' };
    return `${card.rank}${suitSymbols[card.suit]}`;
}
