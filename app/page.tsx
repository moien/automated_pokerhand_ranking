'use client';
import Image from "next/image";
import React, { useState, useEffect } from 'react'





export default function Home() {
  const [data, setData] = useState(null);
  const handleGenerateHands = async () => {
    console.log("data from server")

    const response = await fetch('api/cards/draw-hands');

    const hands = await response.json();
    console.log('DATA: ', hands);
    setData(hands);


  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3>Poker hands</h3>
        <small><i>by Magnus</i></small>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleGenerateHands}>
          Generate hands
        </button>
        <div key="hand-container">
          {data ?
            data.map((hand) => (
              <ul key={hand[0].key} className="inline-block row-start-2 mr-4">
                {hand.map((card) => (
                  <li key={card.key}>{card.suit}{card.rank}</li>
                ))}
              </ul>
            ))
            : 'No hands generated yet.'
          }
        </div>
      </main>
    </div>

  );
}
