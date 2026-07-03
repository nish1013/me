import React from 'react';
import { useSpring, animated } from 'react-spring';
import { socialLinks } from '../../data/MainLinks';
import { tagline } from '../../data/profile';
import ProfileImage from './ProfileImage';
import Specialties from './Specialties';

export default function Index() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      style={fadeIn}
      className="flex items-center justify-center px-6 py-16"
    >
      <div className="flex flex-col items-center text-center max-w-lg">
        <ProfileImage />
        <p className="text-slate-500 text-sm mt-3 max-w-md">{tagline}</p>
        <Specialties />

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {socialLinks.map((l, i) => (
            <a
              key={i}
              href={l.url}
              className="text-slate-500 hover:text-slate-800 text-sm transition-colors"
              target={l.url.startsWith('http') ? '_blank' : undefined}
              rel={l.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {l.text}
            </a>
          ))}
        </div>
      </div>
    </animated.div>
  );
}
