import { GenerateDeck, GenerateHandFromDeck } from "../../../../components/playingcardhandler";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  let handsNo = searchParams.get("count");

  if (!handsNo || handsNo <= 0) {
    handsNo = 2;
  }
  if (handsNo > 10) {
    handsNo = 10; // 50 cards is max (five each).
  }
  
  let deck = await GenerateDeck();
  let handsList = [];

  for (let index = 1; index <= handsNo; index++) {
    const hand = GenerateHandFromDeck(deck);
    handsList.push(hand);    
  }

  return new Response(JSON.stringify(handsList), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}