import { assets } from '@/assets/assets';
import React from 'react';
import ThemeImage from './ThemeImage';

const socials = [
  { label: 'Github', href: 'https://github.com/muzammil-shayk' },
  {
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/muhammad-muzammil-8771a4309/',
  },
];

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="text-center">
        <ThemeImage
          light={assets.logo}
          dark={assets.logo_dark}
          alt="Muhammad Muzammil"
          className="w-36 mx-auto -mb-20"
        />
      </div>
      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
        <p>© {new Date().getFullYear()} M. Muzammil. All rights reserved.</p>
        <ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
          {socials.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
