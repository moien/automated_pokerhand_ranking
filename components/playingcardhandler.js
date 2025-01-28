import { off } from "process";

const suits = ["H", "S", "D", "C"];

const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

var handRankings = ['Royal Flush', 'Straight Flush', 'Four of a Kind', 'Full House', 'Flush', 'Straight', 'Three of a Kind', 'Two Pair', 'One Pair'];

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
                color: suit == 'H' || suit == 'D' ? '#8B0000' : '#000',
                symbol: suit == 'H' ? '♥' : suit == 'D' ? "♦" : suit == 'S' ? "♠" : "♣",
                key: `${suit}${rank}`
            };
            cards.push(card);
        }
    }
    console.log('Cards:', cards);
    console.log('Cards no: ' + cards.length);

    return ShuffleDeck(cards);
}


export function GenerateHandFromDeck(deck) {
    let hand = [];
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

    if (!hand)
        return null;

    hand.sort((a, b) => b.value - a.value)
    //return whichHand();
    //console.log('hand::::::::', hand)
    console.log('HIGHEST: ' + hand[0].value)  ;
    const handHasSameSuite =
        hand.every(card => card.suit == hand[0].suit);

    let handHasStraight = false;
    for (let index = 0; index < 5; index++) {
        const card = hand[index];
        if (index < 4) {
          //  console.log('       ' + card.value - 1  + ' expects: ' + hand[index + 1].value )  ;
            if (hand[index + 1].value === card.value - 1) {
                handHasStraight = true;
            }
            else { handHasStraight = false; }
        }
    }

    //peoples.filter(p => p.age > 30).map(p => p.name).sort((p1, p2) => p1 > p2 ? 1 : -1);
    let fullHouse = false;
    let handHasPair = false;
    
    fullHouse = hand[0].value === hand[1].value === hand[2].value && hand[2].value != hand[3].value && hand[3].value === hand[4].value ||
    hand[0].value === hand[1].value && hand[1].value != hand[2].value && hand[2].value === hand[3].value === hand[4].value;
    
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
    
    if (handHasSameSuite) {
        return handHasStraight ? hand[0].value === 13 ? 'Royal Straight flush' : 'Straight flush' : 'Flush';
    } else if (handHasStraight) {
        return "Straight";
    }
    else if (handHasStraight) {
        return "Straight";
    }
    else if (fullHouse) {
        return "FullHouse";
    }
    
    //console.log('Ranking hand:', handHasSameSuite);
    return 'High card ' + ranks[hand[0].value];
}

// function sorted() {
//     let sortedHand = [];
//     for (let i = 0; i < ranks.length; i++) {
//         for (let j = 0; j < arrayHandOne.length; j++) {
//             if (ranks[i] === arrayHandOne[j].charAt(0)) {
//                 sortedHand.push(arrayHandOne[j]);
//             }
//         }
//     }
//     return sortedHand;
// }

// console.log(sorted());

// let sortedHandOne = sorted(arrayHandOne);
// //let sortedHandTwo = sortedHand(arrayHandTwo);
// console.log(sortedHandOne);
// function suitAndRank(sortedHandOne) {
//     console.log(sorted);
//     for (let i = 0; i < sortedHandOne.length; i++) {
//         let sted = sortedHandOne;
//         rankArray.push(sted[i].charAt(0));
//         suitArray.push(sted[i].charAt(1));
//     }
// }

// suitAndRank(sortedHandOne);

// console.log(rankArray, suitArray);

// function countSuites(suitArray) {
//     let suitCount = {};
//     suitArray.forEach(function (x) {
//         suitCount[x] = (suitCount[x] || 0) + 1;
//     });
//     return suitCount;
// }

// function countRanks(rankArray) {
//     let rankCount = {};
//     rankArray.forEach(function (x) {
//         rankCount[x] = (rankCount[x] || 0) + 1;
//     });
//     return rankCount;
// }

// function isFlush() {
//     let cS = countSuites(suitArray);
//     if (Object.keys(cS).find(key => cS[key] === 5)) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function isStraight() {
//     let index = ranks.indexOf(rankArray[0]);
//     let ref = ranks.slice(index, index + 5).join("");
//     let section = rankArray.slice(0).join("");
//     if (section === "10JQKA" && section === ref) {
//         return "ROYALSTRAIGHT";
//     } else if (section === "A2345" || section === ref) {
//         return "STRAIGHT";
//     } else {
//         return "FALSE";
//     }
// }

// function pairs() {
//     let rS = countRanks(rankArray);
//     return Object.keys(rS).filter(key => rS[key] === 2).length;
// }

// function whichHand() {
//     let rS = countRanks(rankArray);
//     if (isFlush() === true && isStraight() === "ROYALSTRAIGHT") {
//         console.log("Royal Flush");
//     } else if (isFlush() === true && isStraight() === "STRAIGHT") {
//         console.log("Straight Flush");
//     } else if (Object.keys(rS).find(key => rS[key] === 4)) {
//         console.log("Four of a Kind");
//     } else if (Object.keys(rS).find(key => rS[key] === 3) && pairs() === 1) {
//         console.log("Full House");
//     } else if (isFlush() /*First issue*/ === true) {
//         console.log("Flush");
//     } else if (isStraight() /*Second issue*/ === "STRAIGHT") {
//         console.log("Straight");
//     } else if (Object.keys(rS).find(key => rS[key] === 3)) {
//         console.log("Three of a Kind");
//     } else if (pairs() === 2) {
//         console.log("Two Pair");
//     } else if (pairs() === 1) {
//         console.log("Pair");
//     } else {
//         console.log("High Card", rankArray[rankArray.length - 1]);
//     }
// }


