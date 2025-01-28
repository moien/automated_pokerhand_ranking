'use client';
import React, { useState } from 'react'

const css = `
    .hand-container {
    margin-bottom: 4rem;
    }
    .card-container  {
	    display: inline-block; width: 6rem; font-size: 3rem; background: #fff; color: #000; border: 1px solid; padding: 0rem 1.2rem 3rem 0.2rem; border-radius: 8px;"
    }
      
`

export default function Home() {

  var statusText = '';
  const [data, setData] = useState(null);



  const handleGenerateHands = async () => {
    statusText = 'Loading...';
    const response = await fetch('api/cards/draw-hands');

    const hands = await response.json();
    console.log('draw-hands: ', hands);
    setData(hands);
    statusText = '';

  }
  const rankHand = async (hands: []) => {

    const response = await fetch('api/cards/rank-hands', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(hands)
    });
    const responseBody = await response.json();
    //console.log('rank-hands: ', responseBody);
    return responseBody;
  }

  const rankHands = async () => {

    if (data) {
      let handRankings = await rankHand(data);
    }
    // const response = await fetch('api/cards/rank-hands');

    // const ranking = await response.json();
    // console.log('data: ', data);
    // console.log('rank-hands: ', ranking);
    //setData(hands);
  }
  const testMethod = async () => {
    let testDatA = [];
    var royalStraightFlush = [{ suit: 'S', rank: 'A', value: 13 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'S', rank: 'Q', value: 11 }, { suit: 'S', rank: 'J', value: 10 }, { suit: 'S', rank: '10', value: 9 }];
    var straightFlush = [{ suit: 'S', rank: '9', value: 8 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'S', rank: 'Q', value: 11 }, { suit: 'S', rank: 'J', value: 10 }, { suit: 'S', rank: '10', value: 9 }];
    var flush = [{ suit: 'S', rank: '5', value: 4 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'S', rank: 'Q', value: 11 }, { suit: 'S', rank: 'J', value: 10 }, { suit: 'S', rank: '10', value: 9 }];
    var straight = [{ suit: 'H', rank: '9', value: 8 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'S', rank: 'Q', value: 11 }, { suit: 'S', rank: 'J', value: 10 }, { suit: 'S', rank: '10', value: 9 }];
    var straight2 = [{ suit: 'H', rank: 'A', value: 13 }, { suit: 'S', rank: '2', value: 1 }, { suit: 'S', rank: '3', value: 2 }, { suit: 'S', rank: '4', value: 3 }, { suit: 'S', rank: '5', value: 4 }];
    var highCard = [{ suit: 'H', rank: '5', value: 4 }, { suit: 'S', rank: '2', value: 1 }, { suit: 'S', rank: '3', value: 2 }, { suit: 'S', rank: '4', value: 3 }, { suit: 'S', rank: '5', value: 4 }];

     console.log('royalStraightFlush: ', await rankHand(new Array(1).fill().map(u => (royalStraightFlush))));
     console.log('straightFlush: ', await rankHand(new Array(1).fill().map(u => (straightFlush))));
     console.log('FLUSH: ', await rankHand(new Array(1).fill().map(u => (flush))));
    // console.log('FLUSH: ', await rankHand(new Array(1).fill().map(u => (flush))));
    console.log('STRAIGHT: ', await rankHand(new Array(1).fill().map(u => (straight))));
    //console.log('STRAIGHT 2: ', await rankHand(new Array(1).fill().map(u => (straight2))));

  }
  testMethod();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <style>{css}</style>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3>Poker hands</h3>
        <small><i>by Magnus</i></small>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block" onClick={handleGenerateHands}>
          Generate hands
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block" onClick={rankHands}>
          Rank hands
        </button>
        <div key="hand-container">
          {data ?
            data.map((hand) => (
              <ul key={hand[0].key} className="block hand-container">
                {hand.map((card) => (
                  <li key={card.key} className="inline mr-2 card-container">
                    <span style={{ color: card.color }}>{card.symbol}</span>{card.rank}
                  </li>
                ))}
              </ul>
            ))
            : statusText
          }
        </div>
      </main>
    </div>

  );
}
