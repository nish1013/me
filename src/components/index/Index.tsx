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
      {/* Mobile: simple stack, Desktop: card with grid */}
      <div className="w-full max-w-3xl md:bg-slate-50 md:rounded-2xl md:p-12 md:shadow-sm">
        {/* Profile Section - always centered */}
        <div className="flex flex-col items-center text-center mb-8">
          <ProfileImage />
          <p className="text-slate-500 text-sm mt-3 max-w-md">{tagline}</p>
          <Specialties />
        </div>

        {/* Links Grid - stacked on mobile, side by side on desktop */}
        <div className="flex flex-col md:flex-row md:justify-center md:gap-12">
          {/* Work */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">
              Work
            </p>
            {workLinks.map((l, i) => (
              <IndexLink key={i} url={l.url} text={l.text} />
            ))}
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center mt-6 md:mt-0">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">
              Connect
            </p>
            {socialLinks.map((l, i) => (
              <IndexLink key={i} url={l.url} text={l.text} />
            ))}
          </div>
        </div>
      </div>
    </animated.div>
  );
}
