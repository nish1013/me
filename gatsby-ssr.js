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

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement('script', {
      key: 'theme',
      dangerouslySetInnerHTML: { __html: applyTheme },
    }),
  ]);
};
