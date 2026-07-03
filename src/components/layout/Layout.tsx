import React from 'react';
import AlertInfo from '../alert/AlertInfo';
import { navigate } from 'gatsby';

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
      <main>{children}</main>
    </div>
  );
}
