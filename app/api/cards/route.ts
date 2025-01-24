import { NextApiRequest, NextApiResponse } from "next";

import GenerateDeck from "../../../components/playingcardhandler";

export async function GET(req: Request) {
  
  const deck = GenerateDeck();
  
  return new Response(JSON.stringify(deck), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}