// Checks the no-flash theme script in app/layout.js against the cases that
// caused the original flash-of-wrong-theme bug. Run with: npm test
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

assert.equal(
  run({ stored: 'dark', systemDark: false }),
  true,
  'stored dark wins over light system'
);
assert.equal(
  run({ stored: 'light', systemDark: true }),
  false,
  'stored light wins over dark system'
);
assert.equal(
  run({ stored: undefined, systemDark: true }),
  true,
  'no choice follows dark system'
);
assert.equal(
  run({ stored: undefined, systemDark: false }),
  false,
  'no choice follows light system'
);

// The toggle in Navbar.jsx must write back a value the script above understands.
const navbar = readFileSync(
  new URL('../app/components/Navbar.jsx', import.meta.url),
  'utf8'
);
assert.match(
  navbar,
  /localStorage\.theme = isDark \? 'dark' : 'light'/,
  "toggle must persist 'dark' or 'light' (an empty string would look like 'never chosen')"
);

console.log('theme: 5 checks passed');
