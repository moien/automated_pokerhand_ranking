import { NextApiRequest, NextApiResponse } from "next";

import { RankHands } from "../../../../components/playingcardhandler";

export async function POST(request: Request) {

  //console.log('Received POST: ')
  let result = [];
  //let res = await request.json() // gave me the same error.
  
  const hands = await request.json();

  //  let data = {
  //   suit: res.get('Suit'),
  //   rank: res.get('Rank'),
  // }
  //console.log('Received POST res: ', res);
  //console.log('Received POST body json length: ', hands.length);
  //console.log('Received POST text: ', text);

  for (let index = 0; index < hands.length; index++) {
    const hand = hands[index];
    const handRanking = await RankHands(hand);
    result.push(handRanking)
  }


  return new Response(JSON.stringify(result), { status: 200 });

  // return new Response(JSON.stringify(result), {
  //   status: 200,
  //   headers: { "Content-Type": "application/json" }
  // })
}