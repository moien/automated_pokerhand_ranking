'use client';
import Image from "next/image";
import React, { useState, useEffect } from 'react'




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

  return (    
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <style>{css}</style>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3>Poker hands</h3>
        <small><i>by Magnus</i></small>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleGenerateHands}>
          Generate hands
        </button>
        <div key="hand-container">
          {data ?
            data.map((hand) => (
              <ul key={hand[0].key} className="block hand-container">
                {hand.map((card) => (
                  <li key={card.key} className="inline mr-2 card-container">
                    <span style={{color: card.color}}>{card.symbol}</span>{card.rank}
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
