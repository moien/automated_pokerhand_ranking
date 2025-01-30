import { off } from "process";

const suits = ["h", "s", "d", "c"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const rankTexts = ["deuces", "threes", "fours", "fives", "sixes", "sevens", "eights", "nines", "tens", "jacks", "queens", "kings", "aces"];

export function GenerateDeck() {
    let cards = [];

    for (const suitNo in suits) {

        const suit = suits[suitNo];

        for (let valueNo = 0; valueNo < 13; valueNo++) {
            const rank = ranks[valueNo]
            const card = {
                suit: suit,
                rank: rank,
                value: valueNo,
                color: suit == 'h' || suit == 'd' ? '#8B0000' : '#000', // TODO Move to UI
                symbol: suit == 'h' ? '♥' : suit == 'd' ? "♦" : suit == 's' ? "♠" : "♣",
                key: `${rank}${suit}`
            };
            cards.push(card);
        }
    }

    return ShuffleDeck(cards);
}


export function GenerateHandFromDeck(deck) {
    let hand = {
        cards: [],
        key: ''
    };

    let handKey = '';

    for (let cardCount = 0; cardCount < 5; cardCount++) {
        let card = deck[cardCount];
        if (card) {
            if (cardCount > 0) {
                handKey += '-';
            }
            handKey += card.key;
            hand.cards.push(card);
        }
    }

    hand.key = handKey;
    deck.splice(0, 5);

    return hand;
}

export function RankHands(hand) {

    if (!hand)
        return null;

    hand.sort((a, b) => b.value - a.value)
    
    const handHasSameSuite = hand.every(card => card.suit == hand[0].suit);
    
    let handHasStraight = false;

    for (let index = 0; index < 5; index++) {
        const card = hand[index];
        if (index < 4) {            
            const nextCardValueChecksOut = hand[index + 1].value === card.value - 1;
            if (nextCardValueChecksOut) {
                handHasStraight = true;
            }
            else { handHasStraight = false; break; }
        }
    }

    if (!handHasStraight) {
        let cardString = '';
        hand.map((x) => cardString += `${x.value} `);
        if (cardString == '12 3 2 1 0') {
            handHasStraight = true;
        }
    }

    let fullHouse = (hand[0].value === hand[1].value && hand[1].value === hand[2].value && hand[2].value != hand[3].value && hand[3].value === hand[4].value) ||
        (hand[0].value === hand[1].value && hand[1].value != hand[2].value && hand[2].value === hand[3].value && hand[3].value === hand[4].value);

    let equalCards = hand.reduce((prevCard, currCard) => {
        isNaN(prevCard[currCard.value]) ? prevCard[currCard.value] = 1 : prevCard[currCard.value]++;
        return prevCard;
    }, {});

    if (handHasSameSuite) {
        return handHasStraight ? hand[0].value === 13 ? { text: 'Royal Straight flush', rank: 10 } : { text: `Straight flush (${hand[0].rank} high)`, rank: 9 } : { text: `Flush (${hand[0].rank} high)`, rank: 6 };
    } else if (handHasStraight) {
        return hand[4].value == 1 ? { text: `Straight (${hand[1].rank} high)`, rank: 5 } : { text: `Straight (${hand[0].rank} high)`, rank: 5 };
    }
    else if (fullHouse) {
        let threes = Object.keys(equalCards).find(key => equalCards[key] === 3);
        let pair = Object.keys(equalCards).find(key => equalCards[key] === 2);
        return { text: `Full house (${rankTexts[threes]} over ${rankTexts[pair]})`, rank: 7, rank2: threes[0].key, rank3: pair[0].key };
    }
    else {

        let pairs = Object.keys(equalCards).filter(key => equalCards[key] === 2).sort((a, b) => b[0] - a[0]);
        let threes = Object.keys(equalCards).filter(key => equalCards[key] === 3).sort((a, b) => b[0] - a[0]);

        if (pairs.length === 2) {
            return { text: `Two pair (${rankTexts[pairs[0]]} and ${rankTexts[pairs[1]]} )`, rank: 3, rank2: pairs[0], rank3: pairs[1] };
        }

        for (const [key, value] of Object.entries(equalCards).sort((a, b) => b[0] - a[0])) {

            if (value === 4) { return { text: `Four of a kind (${rankTexts[key]})`, rank: 8 }; }
            if (value === 3) { return { text: `Three of a kind (${rankTexts[key]})`, rank: 4, rank2: threes[0] }; }
            if (value === 2) {
                return { text: `Pair of ${rankTexts[key]}`, rank: 2, rank2: pairs[0], }
            }
        }

        return { text: `High card (${hand[0].rank})`, rank: 1 };
    }
}

function ShuffleDeck(deck) {
    let shuffled = deck
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    return shuffled;
}




