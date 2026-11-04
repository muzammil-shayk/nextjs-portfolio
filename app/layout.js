import { Mona_Sans } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import SmoothScroll from './components/SmoothScroll';
import Pointer from './components/Pointer';
import { site } from '@/assets/assets';

const mona = Mona_Sans({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-mona',
});

const siteUrl = site.url;
const title = 'Muhammad Muzammil | Full-Stack Engineer, Lahore';
const description =
  'Full-stack engineer in Lahore building web, React Native and Electron apps. Next.js, Node.js, MongoDB. Open to remote roles or on-site in Lahore.';
const ogTitle = 'Muhammad Muzammil, full-stack engineer';
const ogDescription =
  'Web, mobile and desktop. See Byters, Marginalia, AirBeam and more.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: siteUrl,
    siteName: site.name,
    locale: 'en_US',
    type: 'profile',
    firstName: 'Muhammad',
    lastName: 'Muzammil',
  },
  twitter: {
    card: 'summary_large_image',
    title: ogTitle,
    description: ogDescription,
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

// Person schema for search engines; '<' is escaped per the Next.js JSON-LD guide.
const personLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: siteUrl,
  email: `mailto:${site.email}`,
  image: `${siteUrl}/opengraph-image`,
  sameAs: [site.linkedin, site.github],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'React Native',
    'Electron',
    'Node.js',
    'NestJS',
    'MongoDB',
    'SQL',
  ],
}).replace(/</g, '\\u003c');

// Lets CSS hide intro-animated type only when JS is there to reveal it.
const jsScript = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={mona.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: jsScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personLd }}
        />
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
