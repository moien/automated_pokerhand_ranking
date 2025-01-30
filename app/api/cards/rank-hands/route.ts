import { RankHands } from "../../../../components/playingcardhandler";

export async function POST(request: Request) {

  let result = [];

  const hands = await request.json();

  for (let index = 0; index < hands.length; index++) {
    const hand = hands[index];
    let handRanking = await RankHands(hand.cards);
    const totalCardsValueList = hand.cards.map(card => card.value);
    handRanking.key = hand.key;
    result.push({ handRanking, totalCardsValueList });
  }

  return new Response(JSON.stringify(result), { status: 200 });

}