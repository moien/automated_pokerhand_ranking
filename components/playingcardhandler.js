import { off } from "process";

const suits = ["h", "s", "d", "c"];

const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const rankTexts = ["deuces", "threes", "fours", "fives", "sixes", "sevens", "eights", "nines", "tens", "jacks", "queens", "kings", "aces"];

//var handRankings = ['Royal Flush', 'Straight Flush', 'Four of a Kind', 'Full House', 'Flush', 'Straight', 'Three of a Kind', 'Two Pair', 'One Pair'];

function ShuffleDeck(deck) {
    let shuffled = deck
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    return shuffled;
}

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
                color: suit == 'h' || suit == 'd' ? '#8B0000' : '#000',
                symbol: suit == 'h' ? '♥' : suit == 'd' ? "♦" : suit == 's' ? "♠" : "♣",
                key: `${rank}${suit}`
            };
            cards.push(card);
        }
    }
    console.log('Cards:', cards);
    console.log('Cards no: ' + cards.length);

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
        deck.splice(cardCount, 1);
        handKey += card.key;
        hand.cards.push(card);
    }
    
    hand.key = handKey;
    console.log('Hand:', hand);
    return hand;
}

export function RankHands(hand) {

    if (!hand)
        return null;

    hand.sort((a, b) => b.value - a.value)
    //return whichHand();
    //console.log('hand::::::::', hand)
    //console.log('HIGHEST: ' + hand[0].value)  ;
    const handHasSameSuite =
        hand.every(card => card.suit == hand[0].suit);

    // const handHasStraight =
    // hand.every((card, index) => index < hand.length+1 ? card.value + 1 == hand[index + 1].value : false);
    let handHasStraight = false;

    for (let index = 0; index < 5; index++) {
        const card = hand[index];
        if (index < 4) {
            //  console.log('       ' + card.value - 1  + ' expects: ' + hand[index + 1].value )  ;
            //const mightBeFiveHighStraight = hand[0].rank == 'A' && hand[index + 1].value === 0;
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
        if (cardString == '13 4 3 2 1 ') {
            handHasStraight = true;
        }
    }

    //peoples.filter(p => p.age > 30).map(p => p.name).sort((p1, p2) => p1 > p2 ? 1 : -1);
    let fullHouse = false;
    let handHasPair = false;

    fullHouse = (hand[0].value === hand[1].value && hand[1].value === hand[2].value && hand[2].value != hand[3].value && hand[3].value === hand[4].value) ||
        (hand[0].value === hand[1].value && hand[1].value != hand[2].value && hand[2].value === hand[3].value && hand[3].value === hand[4].value);


    // let fourOfAKind = equalCards.find(x => x === 4);
    // let threeOfAKind = equalCards.find(x => x === 3);
    // let twoOfAKind = equalCards.find(x => x === 3);

    // for (let index = hand.length-1; index >= 0; index--) {
    //     const card = hand[index];
    //     //console.log('       ' + card.value - 1  + ' expects: ' + hand[index - 1].value )  ;
    //     if(index - 1 >= 0 && card.value + 1 === hand[index - 1].value) {
    //         handHasStraight = true;
    //     }
    //     else{
    //         handHasStraight = false;
    //     }
    // }
    let equalCards = hand.reduce((prevCard, currCard) => {
        isNaN(prevCard[currCard.value]) ? prevCard[currCard.value] = 1 : prevCard[currCard.value]++;
        return prevCard;
    }, {});
    
    console.log('equalCards',equalCards);

    if (handHasSameSuite) {
        return handHasStraight ? hand[0].value === 13 ? { text: 'Royal Straight flush', rank: 10 } : { text: `Straight flush (${hand[0].rank} high)`, rank: 9 } : { text: `Flush (${hand[0].rank} high)`, rank: 6};
    } else if (handHasStraight) {
        return hand[4].value == 1 ? { text: `Straight (${hand[1].rank} high)`, rank: 5 } : { text: `Straight (${hand[0].rank} high)`, rank: 5 };
    }
    else if (fullHouse) {
        let threes = Object.keys(equalCards).find(key => equalCards[key] === 3);
        let pair = Object.keys(equalCards).find(key => equalCards[key] === 2);
        return { text: `Full house (${rankTexts[threes]} over ${rankTexts[pair]})`, rank: 7, rank2: threes[0].key, rank3: pair[0].key  };
    }
    else {

        let pairs = Object.keys(equalCards).filter(key => equalCards[key] === 2);
        if (pairs.length === 2) {
            return { text: `Two pair (${rankTexts[pairs[0]]} and ${rankTexts[pairs[1]]} )`, rank: 3, rank2: pairs[0], rank3: pairs[1] };
        }

        for (const [key, value] of Object.entries(equalCards).sort((a, b) => b[0] - a[0])) {
            if (value === 4) { return { text: `Four of a kind (${rankTexts[key]})`, rank: 8 }; }
            if (value === 3) { return { text: `Three of a kind (${rankTexts[key]})`, rank: 4 }; }
            if (value === 2) {
                return { text: `Pair of ${rankTexts[key]}`, rank: 2, rank2: pairs[0], }
            }
        }

        //console.log('Ranking hand:', handHasSameSuite);
        return { text: `High card (${hand[0].rank})`, rank: 1};
    }
}




