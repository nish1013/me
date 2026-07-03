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
      className="flex flex-col items-center py-12 px-6 max-w-2xl mx-auto"
    >
      <ProfileImage />
      <p className="text-slate-500 text-sm text-center mt-2 mb-2">{tagline}</p>
      <Specialties />

      <div className="flex flex-col items-center mt-6 w-full">
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
    </animated.div>
  );
}
