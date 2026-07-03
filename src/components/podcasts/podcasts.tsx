import React from 'react';
import './styles.css';
import Spotify from './spotify/spotify';
import Apple from './apple';

export default function Podcasts() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Podcasts</h1>
      <Spotify />
      <Apple />
    </div>
  );
}
