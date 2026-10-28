// Checks the no-flash theme script in app/layout.js follows the system theme.
// Run with: npm test
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const layout = readFileSync(
  new URL('../app/layout.js', import.meta.url),
  'utf8'
);
const script = layout.match(/const themeScript = `([^`]+)`/)[1];

// Runs the inline script against a stub document/localStorage and reports
// whether <html> ended up with the "dark" class.
const run = ({ stored, systemDark }) => {
  const classes = new Set();
  const fn = new Function('localStorage', 'document', 'matchMedia', script);
  fn(
    stored === undefined ? {} : { theme: stored },
    { documentElement: { classList: { add: c => classes.add(c) } } },
    () => ({ matches: systemDark })
  );
  return classes.has('dark');
};

assert.equal(run({ systemDark: true }), true, 'follows dark system');
assert.equal(run({ systemDark: false }), false, 'follows light system');
// There is no toggle any more, so a choice stored by the old one must not stick.
assert.equal(
  run({ stored: 'dark', systemDark: false }),
  false,
  'old stored dark is ignored'
);

console.log('theme: 3 checks passed');
