import React from 'react';
import Portfolio from './portfolio';
import { Link } from 'gatsby';
import './styles.css';
import { PORTFOLIO } from './data';

export default function Portfolios() {
  return (
    <div className="flex flex-col items-center py-10 mx-10">
      <Link to="/">⌂ Home</Link>
      <h1 className="text-4xl font-black">Portfolio</h1>
      {PORTFOLIO.map((c, i) => (
        <Portfolio key={i} title={c.title} uri={c.uri} />
      ))}
    </div>
  );
}
