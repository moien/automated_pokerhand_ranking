import { NextApiRequest, NextApiResponse } from "next";

import {GenerateDeck, GenerateHandFromDeck } from "../../../../components/playingcardhandler";

export async function GET(req: Request) {
  
  const deck = GenerateDeck();
  const hand1 = GenerateHandFromDeck(deck);
  const hand2 = GenerateHandFromDeck(deck);
   
  return new Response(JSON.stringify([hand1, hand2]), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}