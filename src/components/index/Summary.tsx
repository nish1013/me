import React from 'react';
import { profileSummary } from '../../data/profile';

export default function Summary() {
  return (
    <p className="text-slate-600 text-center leading-relaxed max-w-lg mx-auto my-6 text-sm">
      {profileSummary}
    </p>
  );
}
