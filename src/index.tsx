import React, { useState } from 'react';
import { useSpring, animated, to as interpolate, SpringValue } from 'react-spring';
import { useDrag } from '@use-gesture/react';

export interface DeckItem {
  id: string;
  title: string;
  overview: string;
  posterUrl: string;
}
export interface SwipeListProps {
  deck: DeckItem[];
  onAdd: (item: DeckItem) => void;
  onDismiss: (item: DeckItem) => void;
  cardSize?: { width: number; height: number };
}

export function SwipeList({
  deck,
  onAdd,
  onDismiss,
  cardSize = { width: 240, height: 360 },
}: SwipeListProps) {
  const [index, setIndex] = useState(0);
  const [springs, api] = useSpring(() => ({
    x: 0 as unknown as SpringValue<number>,
    rot: 0 as unknown as SpringValue<number>,
    config: { tension: 400, friction: 35 },
  }));

  const bind = useDrag(({ down, movement: [mx], velocity }) => {
    if (down) {
      api.start({ x: mx, rot: mx / 80, immediate: true });
    } else {
      const trigger = Math.abs(mx) > cardSize.width / 2 || vx > 0.5;
      const dir = mx > 0 ? 1 : -1;
      if (trigger) {
        const flyX = dir * (cardSize.width + window.innerWidth);
          api.start(
            { x: flyX, rot: dir * 20 },
            { onRest: () => {
          onRest: () => {
            const item = deck[index];
            dir > 0 ? onAdd(item) : onDismiss(item);
            setIndex(i => i + 1);
            api.set({ x: 0, rot: 0 });
          }
        });
      } else {
        api.start({ x: 0, rot: 0 });
      }
    }
  }, { pointer: { touch: true }, from: () => [springs.x.get(), 0], filterTaps: true });

  if (index >= deck.length) return <div style={{ color:'#fff' }}>No more titles.</div>;
  const current = deck[index], next = deck[index+1];
  const { x, rot } = springs;

  return (
    <div {...bind()} style={{ position:'relative', width:cardSize.width, height:cardSize.height, touchAction:'none', cursor:'grab' }}>
      {next && (
        <div style={{
          position:'absolute', top:8, left:8,
          width:cardSize.width, height:cardSize.height,
          transform:'scale(0.95)', borderRadius:8, overflow:'hidden',
          boxShadow:'0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <img src={next.posterUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
        </div>
      )}
      <animated.div style={{
        width:cardSize.width, height:cardSize.height, borderRadius:8, overflow:'hidden',
        boxShadow:'0 8px 10px rgba(0,0,0,0.4)',
        transform: interpolate([x, rot], (x, r) => `translate3d(${x}px,0,0) rotate(${r}deg)`)
      }}>
        <img src={current.posterUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
      </animated.div>
    </div>
  );
}
