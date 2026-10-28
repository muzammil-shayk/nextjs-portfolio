import { Mona_Sans } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import SmoothScroll from './components/SmoothScroll';
import Pointer from './components/Pointer';

const mona = Mona_Sans({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-mona',
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

// Runs before first paint so the system theme is applied without a flash.
const themeScript = `try{if(matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark')}}catch(e){}`;

// Lets CSS hide intro-animated type only when JS is there to reveal it.
const jsScript = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={mona.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: jsScript }} />
      </head>
      <body className="overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-5 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Pointer />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
