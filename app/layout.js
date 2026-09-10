import { Outfit, Ovo } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

const ovo = Ovo({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-ovo-family',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-outfit-family',
});

const siteUrl = 'https://m-muzammil.vercel.app';
const description =
  'Muhammad Muzammil — full stack developer working with React, Next.js, NestJS, SQL and MongoDB. Selected projects, services and contact.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Muhammad Muzammil — Full Stack Developer',
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Muhammad Muzammil — Full Stack Developer',
    description,
    url: siteUrl,
    siteName: 'Muhammad Muzammil',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Muzammil — Full Stack Developer',
    description,
  },
  icons: {
    icon: [
      { url: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
  other: {
    'google-site-verification': 'sQvmL0WADTzA0_IXlqlnFwWW2QberYsEZXoWkgY2eH0',
  },
};

// Runs before first paint so the stored theme is applied without a flash.
const themeScript = `try{var t=localStorage.theme;if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${outfit.variable} ${ovo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-outfit antialiased leading-8 overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-black focus:px-5 focus:py-2 focus:text-white dark:focus:bg-white dark:focus:text-black"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
