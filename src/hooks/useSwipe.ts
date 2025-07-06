import { useGesture } from '@use-gesture/react';
import { useSpring } from 'react-spring';

export function useSwipe(onLeft: () => void, onRight: () => void) {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useGesture({
    onDrag: ({ down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      if (!down && vx > 0.2) {
        if (xDir > 0) onRight();
        else onLeft();
        api.start({ x: 0 });
      } else {
        api.start({ x: down ? mx : 0 });
      }
    },
  });

  return { bind, style: { x } };
}
