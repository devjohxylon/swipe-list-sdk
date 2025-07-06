import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { SwipeList, DeckItem } from 'swipe-list-sdk';

const sampleDeck = Array.from({ length: 5 }, (_, i) => ({
  id: String(i + 1),
  title: \`Movie \${i + 1}\`,
  overview: \`Overview for movie \${i + 1}\`,
  posterUrl: \`https://via.placeholder.com/240x360?text=Movie+\${i + 1}\`,
}));

function App() {
  const [deck, setDeck] = useState([]);
  useEffect(() => {
    setTimeout(() => setDeck(sampleDeck), 500);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: '#fff', fontFamily: 'sans-serif' }}>SwipeList Demo</h1>
      <SwipeList
        deck={deck}
        onAdd={item => alert(\`Added \${item.title}\`)}
        onDismiss={item => alert(\`Dismissed \${item.title}\`)}
        cardSize={{ width: 240, height: 360 }}
      />
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
