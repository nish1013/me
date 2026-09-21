const React = require('react');

const applyTheme = `
(function () {
  try {
    var saved = localStorage.getItem('nish-theme');
    var wantsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = saved === 'dark' || ((!saved || saved === 'auto') && wantsDark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement('script', {
      key: 'theme',
      dangerouslySetInnerHTML: { __html: applyTheme },
    }),
  ]);
};
