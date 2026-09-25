import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { name } from '../../data/profile';

interface SiteBuild {
  buildYear: string;
}

interface FooterQuery {
  site: SiteBuild;
}

// Build year, not the visitor's clock: the page is pre-rendered, so a client-side year would mismatch on hydration.
export default function Footer() {
  const { site } = useStaticQuery<FooterQuery>(graphql`
    query FooterBuildYear {
      site {
        buildYear: buildTime(formatString: "YYYY")
      }
    }
  `);

  return (
    <footer className="max-w-4xl mx-auto px-6 py-8 text-xs text-slate-500">
      © {site.buildYear} {name}
    </footer>
  );
}
