const suits = ["H", "S", "C", "D"];

const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

var handRankings = ['Royal Flush', 'Straight Flush', 'Four of a Kind', 'Full House', 'Flush', 'Straight', 'Three of a Kind', 'Two Pair', 'One Pair'];

export function GenerateDeck() {
    let cards = [];
    console.log('Generating deck...');
    for (const suitNo in suits) {

        const suit = suits[suitNo];

        for (let valueNo = 0; valueNo < 13; valueNo++) {
            const rank = ranks[valueNo]
            const card = {
                suit: suit,
                rank: rank,
                value: valueNo,
                key: `${suit}${rank}`
            };
            cards.push(card);
        }
    }
    console.log('Cards:', cards);
    console.log('Cards no: ' + cards.length);

    return ShuffleDeck(cards);    
}

export function ShuffleDeck(deck) {
    let shuffled = deck
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    return shuffled;
}

export function GenerateHandFromDeck(deck) {
    let hand = [] ;
    let handKey = '';
    for (let cardCount = 0; cardCount < 5; cardCount++) {
        let card = deck[cardCount];        
        deck.splice(cardCount, 1);
        handKey += card.key;
        hand.push(card);
    }
    console.log('Hand:', hand);
    hand.key = handKey;
    return hand;
}

export function RankHands(hand) {
        
    console.log('Ranking hand:', hand);
    return handRankings[0];
}
