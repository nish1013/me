import React, { useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import AlertInfo from '../alert/AlertInfo';
import { navLinks } from '../../data/MainLinks';

interface LayoutProps {
  children: JSX.Element;
}

function getPageLabel(pathname: string): string | null {
  if (pathname === '/') return null;
  const match = navLinks.find((link) => link.url === pathname);
  return match?.text ?? null;
}

function linkClassName(pathname: string, url: string) {
  const active = pathname === url;
  return active
    ? 'text-slate-900 font-medium'
    : 'text-slate-600 hover:text-slate-900';
}

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const pageLabel = getPageLabel(pathname);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="w-full min-h-screen bg-white">
      <AlertInfo
        title="Built with TypeScript, React & Node.js"
        label="View Code"
        onClick={() => navigate('https://github.com/nish1013/me')}
      />
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-slate-100 z-10">
        <nav className="max-w-4xl mx-auto flex items-center justify-between gap-4 px-6 py-3">
          <Link
            to="/"
            className={`shrink-0 text-xs md:text-sm whitespace-nowrap ${linkClassName(pathname, '/')}`}
          >
            Home
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                className={`whitespace-nowrap ${linkClassName(pathname, link.url)}`}
              >
                {link.text}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 px-6 py-3">
            <div className="flex flex-col gap-3 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.url}
                  to={link.url}
                  className={linkClassName(pathname, link.url)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        )}

        {pageLabel && (
          <div className="md:hidden border-t border-slate-100 px-6 py-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-slate-700">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-700">{pageLabel}</span>
          </div>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
