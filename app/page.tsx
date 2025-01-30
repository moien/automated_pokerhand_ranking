'use client';
import React, { useEffect, useState } from 'react'

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
  const [rankings, setRanking] = useState(null);
  const [autoRankchecked, setChecked] = useState(false);

  const handleautoRankCheckbox = (): void => {
    setChecked((value) => !value);
  };
  useEffect(() => {
    if (autoRankchecked) {
      rankHands();
    }
  }, [data])
  const handleGenerateHands = async () => {
    setRanking(null);
    statusText = 'Loading...';
    const response = await fetch('api/cards/draw-hands');

    const hands = await response.json();

    await setData(hands)
    console.log('draw-hands: ' + autoRankchecked, data);



    statusText = '';

  };
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
    console.log('rankHands:', data);
    if (data) {
      let handRankings = await rankHand(data);

      //data.forEach((hand, index) => hand.ranking == handRankings[index]);
      //setData(data);

      // const handRankingsExtended = handRankings.map((rank, index) => ({ ...rank,
      //   totalRankValue: data[index].value
      // }));
      handRankings.sort(function (a, b) {
        return b.handRanking.rank - a.handRanking.rank ||
          b.totalCardsValueList[0] - a.totalCardsValueList[0] ||
          b.totalCardsValueList[1] - a.totalCardsValueList[1] ||
          b.totalCardsValueList[2] - a.totalCardsValueList[2] ||
          b.totalCardsValueList[3] - a.totalCardsValueList[3] ||
          b.totalCardsValueList[4] - a.totalCardsValueList[4]
          ;
      });
      console.log('handRankings:', handRankings);

      setRanking(handRankings);
    }
    // const response = await fetch('api/cards/rank-hands');

    // const ranking = await response.json();
    // console.log('data: ', data);
    // console.log('rank-hands: ', ranking);

  }


  const testMethod = async () => {
    let testDatA = [];
    var royalStraightFlush = [{ suit: 'S', rank: 'A', value: 13 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'S', rank: 'Q', value: 11 }, { suit: 'S', rank: 'J', value: 10 }, { suit: 'S', rank: '10', value: 9 }];
    var straightFlush = [{ suit: 'S', rank: '9', value: 8 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'S', rank: 'Q', value: 11 }, { suit: 'S', rank: 'J', value: 10 }, { suit: 'S', rank: '10', value: 9 }];
    var flush = [{ suit: 'S', rank: '5', value: 4 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'S', rank: 'Q', value: 11 }, { suit: 'S', rank: 'J', value: 10 }, { suit: 'S', rank: '10', value: 9 }];
    var straight = [{ suit: 'H', rank: '9', value: 8 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'S', rank: 'Q', value: 11 }, { suit: 'S', rank: 'J', value: 10 }, { suit: 'S', rank: '10', value: 9 }];
    var straight2 = [{ suit: 'H', rank: 'A', value: 13 }, { suit: 'S', rank: '2', value: 1 }, { suit: 'S', rank: '3', value: 2 }, { suit: 'S', rank: '4', value: 3 }, { suit: 'S', rank: '5', value: 4 }];
    var fullHouse = [{ suit: 'H', rank: '5', value: 4 }, { suit: 'S', rank: '5', value: 4 }, { suit: 'D', rank: '5', value: 4 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'C', rank: 'K', value: 12 }];
    var fullHouse2 = [{ suit: 'H', rank: '5', value: 4 }, { suit: 'S', rank: '5', value: 4 }, { suit: 'D', rank: 'K', value: 12 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'C', rank: 'K', value: 12 }];
    var fourOfAKind = [{ suit: 'H', rank: '5', value: 4 }, { suit: 'H', rank: 'K', value: 12 }, { suit: 'D', rank: 'K', value: 12 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'C', rank: 'K', value: 12 }];
    var trips = [{ suit: 'H', rank: '5', value: 4 }, { suit: 'H', rank: '3', value: 2 }, { suit: 'D', rank: 'K', value: 12 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'C', rank: 'K', value: 12 }];
    var twoPair = [{ suit: 'H', rank: '5', value: 4 }, { suit: 'H', rank: '5', value: 4 }, { suit: 'D', rank: '6', value: 5 }, { suit: 'S', rank: 'J', value: 10 }, { suit: 'C', rank: 'J', value: 10 }];
    var pair = [{ suit: 'H', rank: '5', value: 4 }, { suit: 'H', rank: 'J', value: 10 }, { suit: 'D', rank: '6', value: 5 }, { suit: 'S', rank: 'K', value: 12 }, { suit: 'C', rank: 'K', value: 12 }];
    var highCard = [{ suit: 'H', rank: '5', value: 4 }, { suit: 'S', rank: '2', value: 1 }, { suit: 'S', rank: '3', value: 2 }, { suit: 'S', rank: 'J', value: 10 }, { suit: 'S', rank: '9', value: 8 }];

    console.log('royalStraightFlush: ', await rankHand(new Array(1).fill().map(u => (royalStraightFlush))));
    console.log('straightFlush: ', await rankHand(new Array(1).fill().map(u => (straightFlush))));
    console.log('FLUSH: ', await rankHand(new Array(1).fill().map(u => (flush))));
    // console.log('FLUSH: ', await rankHand(new Array(1).fill().map(u => (flush))));
    console.log('STRAIGHT: ', await rankHand(new Array(1).fill().map(u => (straight))));
    console.log('STRAIGHT2: ', await rankHand(new Array(1).fill().map(u => (straight2))));
    console.log('fullHouse: ', await rankHand(new Array(1).fill().map(u => (fullHouse))));
    console.log('fullHouse2: ', await rankHand(new Array(1).fill().map(u => (fullHouse2))));
    console.log('fourOfAKind: ', await rankHand(new Array(1).fill().map(u => (fourOfAKind))));
    console.log('trips: ', await rankHand(new Array(1).fill().map(u => (trips))));
    console.log('twoPair: ', await rankHand(new Array(1).fill().map(u => (twoPair))));
    console.log('pair: ', await rankHand(new Array(1).fill().map(u => (pair))));
    console.log('highCard: ', await rankHand(new Array(1).fill().map(u => (highCard))));
    //console.log('STRAIGHT 2: ', await rankHand(new Array(1).fill().map(u => (straight2))));

  }

  //testMethod();
  return (
    <div className="align-top items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <style>{css}</style>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3 className='inline-block'>Poker hands</h3>
        <small className='inline-block'><i>by Magnus</i></small>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block" onClick={handleGenerateHands}>
          Generate hands
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block" onClick={rankHands}>
          Rank hands
        </button>
        <label className='inline'>Rank automatically
          <input
            type="checkbox"
            id="autoRankCheckbox"
            className='mx-4 inline'
            checked={autoRankchecked}
            onChange={handleautoRankCheckbox}
          />
        </label>
        <div key="hand-container">
          {data ?
            data.map((hand, handIndex) => (
              <div key={hand[0].key}>
                <div className='inline-block mr-4 font-bold size-32 align-top '>
                  <h3 className=''>Hand {handIndex + 1}</h3>
                  <p className='text-[#c16512]'>{rankings ? (<span key={hand[0].key + handIndex}> {rankings[handIndex]['handRanking'].text} </span>) : ''}</p>
                </div>
                <ul className="inline-block hand-container ">
                  {hand.map((card) => (
                    <li key={card.key} className="inline mr-2 card-container">
                      <span style={{ color: card.color }}>{card.symbol}</span>{card.rank}
                    </li>
                  ))}
                </ul>

              </div>
            ))
            : statusText
          }
        </div>
      </main>
    </div>

  );
}
