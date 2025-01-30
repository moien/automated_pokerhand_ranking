import { NextApiRequest, NextApiResponse } from "next";

import {GenerateDeck, GenerateHandFromDeck } from "../../../../components/playingcardhandler";

export async function GET(req: Request) {
  
  const {searchParams} = new URL(req.url);
  let handsNo = searchParams.get("count");
  
  if(!handsNo || handsNo <= 0){
    handsNo = 2;
  }
  if(handsNo > 9 ){
    handsNo = 9; // 50 cards is max (five each).
  }
  let deck = await GenerateDeck();
  let handsList = [];
  for (let index = 1; index <= handsNo; index++) {
    
    const hand = GenerateHandFromDeck(deck);
    handsList.push(hand);
    console.log('Dealing hand ' + index + ' of ' + handsNo + ' - Cards left: ' + deck.length);
  }
  // const deck = GenerateDeck();
  // const hand1 = GenerateHandFromDeck(deck);
  // const hand2 = GenerateHandFromDeck(deck);
  // const hand3 = GenerateHandFromDeck(deck);
  // const hand4 = GenerateHandFromDeck(deck);
   
  return new Response(JSON.stringify(handsList), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}