# 🚀 swipe-list-sdk

**A zero-dependency, themeable React & React Native swipe-to-watchlist component**  
Bring addictive Tinder-style discovery to any app—web or mobile—in minutes.

---

## 📂 Repository Structure

swipe-list-sdk/
├── dist/ # Built bundles (CJS + ESM + types)
├── src/
│ └── index.tsx # Main SwipeList component
├── rollup.config.mjs # Bundler config
├── tsconfig.json # TypeScript config
├── package.json # Package metadata & scripts
└── README.md # You are here!

---

## 🔑 Key Features

- **Simple API** — One component, two callbacks: `onAdd` and `onDismiss`  
- **Zero UI deps** — No CSS frameworks required  
- **Theming** — Pass custom card sizes and style via your own CSS or styled-components  
- **Web & Native** — Same codebase works in React and React Native  
- **Lightweight** — Only `react-spring` + `@use-gesture/react` under the hood  

---

## ⚙️ Installation

npm install swipe-list-sdk
# or
yarn add swipe-list-sdk

Peer dependencies (make sure you have these installed):

npm install react react-dom react-spring @use-gesture/react

# OR for React Native:
npm install react react-native react-spring @use-gesture/react

🚀 Quick Start (Web)

// pages/swipe.tsx
import React, { useEffect, useState } from 'react';
import { SwipeList, DeckItem } from 'swipe-list-sdk';
import { fetchSwipeDeck, addToWatchlist } from '../shared/src/api';

export default function SwipePage() {
  const [deck, setDeck] = useState<DeckItem[]>([]);
  useEffect(() => {
    fetchSwipeDeck('user-123').then(setDeck);
  }, []);

  return (
    <div className="bg-black min-h-screen p-6">
      <h1 className="text-3xl text-white mb-4">Discover</h1>
      <SwipeList
        deck={deck}
        onAdd={item => addToWatchlist('user-123', item.id)}
        onDismiss={item => console.log('Skipped', item.id)}
        cardSize={{ width: 280, height: 420 }}
      />
    </div>
  );
}

📱 Quick Start (React Native)

// App.js
import React, { useEffect, useState } from 'react';
import { SwipeList } from 'swipe-list-sdk';
import { fetchSwipeDeck, addToWatchlist } from './api'; // your API

export default function App() {
  const [deck, setDeck] = useState([]);
  useEffect(() => {
    fetchSwipeDeck('user-123').then(setDeck);
  }, []);

  return (
    <SwipeList
      deck={deck}
      onAdd={item => addToWatchlist('user-123', item.id)}
      onDismiss={item => console.log('Skipped', item.id)}
      cardSize={{ width: 200, height: 300 }}
    />
  );
}

🔍 API Reference

SwipeList props
Prop	Type	Description
deck	DeckItem[]	Array of { id, title, overview, posterUrl } cards
onAdd	(item: DeckItem) => void	Called on right-swipe (add to watchlist)
onDismiss	(item: DeckItem) => void	Called on left-swipe (dismiss)
cardSize	{ width: number; height: number } (optional)	Card dimensions in pixels (defaults to 240×360)

DeckItem
ts
Copy
Edit
interface DeckItem {
  id: string;
  title: string;
  overview: string;
  posterUrl: string;
}

🛠️ Development & Build

# install dev-deps
npm install

# build bundles (CJS + ESM + d.ts)
npm run build

# run example storybook or local demo (if configured)
npm run dev

📜 License
MIT © devjohxylon

Questions? Issues? Feature requests?
Drop a GitHub issue