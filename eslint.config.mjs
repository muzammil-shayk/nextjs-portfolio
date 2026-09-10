import next from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      '.lighthouseci/**',
      'next-env.d.ts',
    ],
  },
  // Flat config only picks up .js/.mjs/.cjs by default, so `eslint .` would
  // skip every component. The `--ext` flag used to cover this, but it is gone
  // in ESLint 10.
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
  },
  ...next,
];

export default eslintConfig;
