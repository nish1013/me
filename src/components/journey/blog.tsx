import React from 'react';
import Posts from './posts';
import { Link } from 'gatsby';
import './styles.css';

export default function Journey() {
  return (
    <div className="flex flex-col items-center py-10 mx-10">
      <Link to="/">⌂ Home</Link>
      <h1 className="text-4xl font-black">Journey</h1>
      <Posts />
    </div>
  );
}
