import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Flat config only picks up .js/.mjs/.cjs by default, so `eslint .` would
  // skip every component. The `--ext` flag used to cover this, but it is gone
  // in ESLint 10.
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];

export default eslintConfig;
