import React from 'react';
import { useTrail, animated, config } from 'react-spring';

// TODO: move to resources
const specialties = [
  'web3',
  'blockchain',
  'crypto',
  'wallets',
  'gaming'
];

export default function Specialties() {
  const trail = useTrail(specialties.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  });

  return (
    <div className="specialties-container flex space-x-2 overflow-x-auto py-4">
      {trail.map((animationStyles, index) => (
        <animated.span key={index} style={animationStyles} className="specialty-item bg-amber-200 px-2 py-1 rounded">
          {specialties[index]}
        </animated.span>
      ))}
    </div>
  );
}
