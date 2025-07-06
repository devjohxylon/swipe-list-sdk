# swipe-list-sdk

A themable, zero-dependency React SwipeList component.

## Install

npm install swipe-list-sdk

## Usage

```tsx
import { SwipeList, DeckItem } from 'swipe-list-sdk';

<SwipeList
  deck={deck}
  onAdd={item => /* watchlist API */}
  onDismiss={item => /* analytics */}
  cardSize={{ width: 280, height: 420 }}
/>
