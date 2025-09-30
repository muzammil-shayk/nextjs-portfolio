import { Outfit, Ovo } from 'next/font/google';
import './globals.css';

const ovo = Ovo({
  subsets: ['latin'],
  weight: ['400'],
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Portfolio - Muzammil',
  description: '',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
