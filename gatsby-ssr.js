const React = require('react');

const applyTheme = `
(function () {
  try {
    var saved = localStorage.getItem('nish-theme');
    var wantsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var light = saved === 'light' || (saved === 'auto' && !wantsDark);
    document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

const FONTS =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500&family=Sora:wght@600;700;800&display=swap';

// Loaded as print, then switched to all: the font CSS no longer blocks the first paint.
const enableFonts = `(function(){var l=document.getElementById('site-fonts');if(!l)return;var on=function(){l.media='all'};if(l.sheet)on();else l.addEventListener('load',on);})();`;

exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    React.createElement('link', {
      key: 'gf-pre',
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    }),
    React.createElement('link', {
      key: 'gs-pre',
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    }),
    React.createElement('link', {
      key: 'fonts',
      id: 'site-fonts',
      rel: 'stylesheet',
      href: FONTS,
      media: 'print',
    }),
    React.createElement('script', {
      key: 'fonts-on',
      dangerouslySetInnerHTML: { __html: enableFonts },
    }),
    React.createElement(
      'noscript',
      { key: 'fonts-noscript' },
      React.createElement('link', { rel: 'stylesheet', href: FONTS })
    ),
  ]);
  setPreBodyComponents([
    React.createElement('script', {
      key: 'theme',
      dangerouslySetInnerHTML: { __html: applyTheme },
    }),
  ]);
};
