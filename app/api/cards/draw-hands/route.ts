import { NextApiRequest, NextApiResponse } from "next";

import {GenerateDeck, GenerateHandFromDeck } from "../../../../components/playingcardhandler";

export async function GET(req: Request) {
  
  const deck = GenerateDeck();
  const hand1 = GenerateHandFromDeck(deck);
  const hand2 = GenerateHandFromDeck(deck);
  const hand3 = GenerateHandFromDeck(deck);
  const hand4 = GenerateHandFromDeck(deck);
   
  return new Response(JSON.stringify([hand1, hand2, hand3, hand4]), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}