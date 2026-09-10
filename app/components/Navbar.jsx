'use client';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ThemeImage from './ThemeImage';

const links = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'My Work' },
  { href: '#contact', label: 'Contact Me' },
];

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScroll(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = e => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden"
      >
        <Image
          src={assets.header_bg_color}
          alt=""
          priority
          className="w-full"
        />
      </div>
      <nav
        className={`w-full h-24 fixed px-5 lg:px-8 xl:px-[8%] flex items-center justify-between z-50 transition-colors duration-300 ${
          isScroll
            ? 'bg-white/50 backdrop-blur-lg shadow-sm dark:bg-darkTheme/80 dark:shadow-white/20'
            : ''
        }`}
      >
        <a href="#top" aria-label="Back to top">
          <ThemeImage
            light={assets.logo}
            dark={assets.logo_dark}
            alt="Muhammad Muzammil"
            priority
            className="w-36 cursor-pointer mr-2"
          />
        </a>
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 transition-colors duration-300 ${
            isScroll
              ? ''
              : 'bg-white/30 shadow-sm dark:border dark:border-white/50 dark:bg-transparent'
          }`}
        >
          {links.map(({ href, label }) => (
            <li key={href} className="font-ovo">
              <a href={href} className="hover:opacity-70 transition-opacity">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            <ThemeImage
              light={assets.moon_icon}
              dark={assets.sun_icon}
              alt=""
              className="w-6 cursor-pointer"
            />
          </button>
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-ovo dark:border-white/50 hover:bg-lightHover dark:hover:bg-darkHover transition-colors duration-300"
          >
            Contact{' '}
            <ThemeImage
              light={assets.arrow_icon}
              dark={assets.arrow_icon_dark}
              alt=""
              className="w-3"
            />
          </a>
          <button
            type="button"
            className="block md:hidden ml-3"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <ThemeImage
              light={assets.menu_black}
              dark={assets.menu_white}
              alt=""
              className="w-6 cursor-pointer"
            />
          </button>
        </div>

        <ul
          id="mobile-menu"
          inert={!menuOpen}
          className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed right-0 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition-transform duration-500 dark:bg-darkHover dark:text-white ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <li className="absolute right-6 top-6">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <ThemeImage
                light={assets.close_black}
                dark={assets.close_white}
                alt=""
                className="w-5 cursor-pointer"
              />
            </button>
          </li>
          {links.map(({ href, label }) => (
            <li key={href} className="font-ovo">
              <a href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setMenuOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-500 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
};

export default Navbar;
