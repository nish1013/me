import React from 'react';
import { Link, navigate } from 'gatsby';
import AlertInfo from '../alert/AlertInfo';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen bg-white">
      <AlertInfo
        title="Built with TypeScript, React & Node.js"
        label="View Code"
        onClick={() => navigate('https://github.com/nish1013/me')}
      />
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-slate-100 z-10">
        <nav className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-slate-800 hover:text-slate-600">
            Home
          </Link>
          <div className="flex gap-3 md:gap-6 text-xs md:text-sm overflow-x-auto">
            <Link to="/about" className="text-slate-600 hover:text-slate-900 whitespace-nowrap">
              About
            </Link>
            <Link to="/portfolio" className="text-slate-600 hover:text-slate-900 whitespace-nowrap">
              Projects
            </Link>
            <Link to="/blog" className="text-slate-600 hover:text-slate-900 whitespace-nowrap">
              Blog
            </Link>
            <Link to="/certifications" className="text-slate-600 hover:text-slate-900 whitespace-nowrap">
              Certs
            </Link>
            <Link to="/journey" className="text-slate-600 hover:text-slate-900 whitespace-nowrap">
              Journey
            </Link>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
