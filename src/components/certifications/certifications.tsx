import React from 'react';
import Certification from './certification';
import './styles.css';
import { CERTIFICATIONS } from './data';

export default function Certifications() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Certifications</h1>
      <div className="space-y-3">
        {CERTIFICATIONS.map((c, i) => (
          <Certification key={i} title={c.title} uri={c.uri} />
        ))}
      </div>
    </div>
  );
}
