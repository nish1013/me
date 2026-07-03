export interface MainLink {
  url: string;
  text: string;
}

export const workLinks: MainLink[] = [
  { url: '/about', text: 'About' },
  { url: '/portfolio', text: 'Portfolio' },
  { url: '/blog', text: 'Blog' },
  { url: '/certifications', text: 'Certifications' },
  { url: '/journey', text: 'Journey' },
];

export const socialLinks: MainLink[] = [
  { url: 'https://linkedin.com/in/nish1013', text: 'LinkedIn' },
  { url: 'https://github.com/nish1013', text: 'GitHub' },
  { url: 'https://youtube.com/@nish1013?si=Z26HkrcIES8YXEaz', text: 'YouTube' },
  { url: '/podcasts', text: 'Podcasts' },
];

// Keep for backwards compatibility
export const mainLinks: MainLink[] = [...workLinks, ...socialLinks];
