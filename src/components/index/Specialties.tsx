import React from 'react';
import { useTrail, animated, config } from 'react-spring';
import { specialtiesHighlight } from '../../data/profile';

export default function Specialties() {
  const trail = useTrail(specialtiesHighlight.length, {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle,
  });

  return (
    <div className="flex flex-wrap justify-center gap-2 py-4 max-w-md">
      {trail.map((animationStyles, index) => (
        <animated.span
          key={index}
          style={animationStyles}
          className="bg-white text-slate-700 px-3 py-1.5 rounded-md text-sm font-medium border border-slate-200"
        >
          {specialtiesHighlight[index]}
        </animated.span>
      ))}
    </div>
  );
}
