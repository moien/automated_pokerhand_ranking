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
  const [handsCount, setHandsCount] = useState(2);

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
    const response = await fetch('api/cards/draw-hands/?count=' + handsCount);
    const hands = await response.json();

    await setData(hands)
    
    statusText = '';
  };
  const rankHand = async (hands: []) => {
    const response = await fetch('api/cards/rank-hands', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(hands)
    });
    const responseBody = await response.json();
    return responseBody;
  }

  const rankHands = async () => {
    
    if (data) {
      let handRankings = await rankHand(data);

      handRankings.sort(function (a, b) {
        return b.handRanking.rank - a.handRanking.rank ||
          b.handRanking.rank2 - a.handRanking.rank2 ||
          b.handRanking.rank3 - a.handRanking.rank3 ||
          b.totalCardsValueList[0] - a.totalCardsValueList[0] ||
          b.totalCardsValueList[1] - a.totalCardsValueList[1] ||
          b.totalCardsValueList[2] - a.totalCardsValueList[2] ||
          b.totalCardsValueList[3] - a.totalCardsValueList[3] ||
          b.totalCardsValueList[4] - a.totalCardsValueList[4]
          ;
      });

      // TODO - Check if the pot should split by two or more hands
      handRankings[0].winner = true;
      
      setRanking(handRankings);
    }

  }
  const handsNoChanged = async (e) => {
    setHandsCount(e.target.value);
  }

  return (
    <div className="align-top items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <style>{css}</style>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3 className='inline-block'>Poker hands</h3>
        <small className='inline-block'><i>by Magnus</i></small>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block" onClick={handleGenerateHands}>
          Generate hands
        </button>
        <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white inline">Hands:
          <input type="number" id="number-input" min="1" max="10" value={handsCount} onChange={(e) => handsNoChanged(e)} aria-describedby="helper-text-explanation" className="ms-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 inline" placeholder="2" required />
        </label>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block" onClick={rankHands}>
          Rank hands
        </button>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoRankCheckbox"
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            checked={autoRankchecked}
            onChange={handleautoRankCheckbox}
          />
          <label htmlFor="autoRankCheckbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rank automatically</label>
        </div>
        <div key="hand-container" id="hand-container">
          {data ?
            data.map((hand, handIndex) => (
              <div key={hand.key}>
                <div className='inline-block mr-4 font-bold size-32 align-top '>
                  <h3 className=''>Hand {handIndex + 1}</h3>
                  <p className='text-[#c16512]'>{rankings ? (<span key={hand.key + handIndex}> {rankings.find(x => x.handRanking.key === hand.key)['handRanking'].text} </span>) : ''}</p>
                  <p className='text-[#d90f90] text-2xl'>{rankings ? (<span key={hand.key + handIndex} > {rankings.find(x => x.handRanking.key === hand.key).winner ? '⇾ Winner!' : ''} </span>) : ''}</p>

                </div>
                <ul className="inline-block hand-container ">
                  {hand.cards.map((card) => (
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
