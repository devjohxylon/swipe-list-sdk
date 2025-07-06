import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { SwipeList } from 'swipe-list-sdk';

const sampleDeck = Array.from({ length: 5 }, (_, i) => {
  const num = i + 1;
  return {
    id: String(num),
    title: 'Movie ' + num,
    overview: 'Overview for movie ' + num,
    posterUrl: 'https://via.placeholder.com/240x360?text=Movie+' + num,
  };
});

function App() {
  const [deck, setDeck] = useState([]);  // no <DeckItem[]>

  useEffect(() => {
    setTimeout(() => setDeck(sampleDeck), 500);
  }, []);

  return (
    <div style={{ padding: 20, background: '#141414', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', fontFamily: 'sans-serif', marginBottom: 20 }}>
        SwipeList SDK Demo
      </h1>
      {deck.length === 0 ? (
        <p style={{ color: '#ccc' }}>Loading...</p>
      ) : (
        <SwipeList
          deck={deck}
          onAdd={item => alert('Added ' + item.title)}
          onDismiss={item => alert('Dismissed ' + item.title)}
          cardSize={{ width: 240, height: 360 }}
        />
      )}
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
