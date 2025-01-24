import { NextApiRequest, NextApiResponse } from "next";

import { RankHands } from "../../../../components/playingcardhandler";

export async function GET(req: Request) {
  
  const handRanking = RankHands();
  
  return new Response(JSON.stringify(handRanking), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}