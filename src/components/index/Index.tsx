import React from 'react';
import { useSpring, animated } from 'react-spring';
import IndexLink from './IndexLink';
import { workLinks, socialLinks } from '../../data/MainLinks';
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
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      {/* Mobile: stacked, Desktop: side by side */}
      <div className="flex flex-col md:flex-row md:gap-16 md:items-center max-w-4xl">
        {/* Left: Profile */}
        <div className="flex flex-col items-center md:items-start">
          <ProfileImage />
          <p className="text-slate-500 text-sm text-center md:text-left mt-2 mb-2 max-w-xs">
            {tagline}
          </p>
          <Specialties />
        </div>

        {/* Right: Links */}
        <div className="flex flex-col items-center md:items-start mt-8 md:mt-0">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">
            Work
          </p>
          {workLinks.map((l, i) => (
            <IndexLink key={i} url={l.url} text={l.text} />
          ))}

          <p className="text-xs text-slate-400 uppercase tracking-wider mt-6 mb-3">
            Connect
          </p>
          {socialLinks.map((l, i) => (
            <IndexLink key={i} url={l.url} text={l.text} />
          ))}
        </div>
      </div>
    </animated.div>
  );
}
