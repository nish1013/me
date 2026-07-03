import React from 'react';
import { useTrail, animated, config } from 'react-spring';

const specialties = [
  'TypeScript',
  'React',
  'Node.js',
  'Microservices',
  'Full-Stack',
];

export default function Specialties() {
  const trail = useTrail(specialties.length, {
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
          className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-sm font-medium border border-slate-200"
        >
          {specialties[index]}
        </animated.span>
      ))}
    </div>
  );
}
