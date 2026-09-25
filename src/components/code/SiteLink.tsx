import React from 'react';
import { Link } from 'gatsby';

interface SiteLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function SiteLink({ href, className, children }: SiteLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
