'use client';
import { assets, infoList, toolsData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';
import ThemeImage from './ThemeImage';

const viewport = { once: true, amount: 0.2 };

const About = () => {
  return (
    <section
      id="about"
      className="w-full px-6 sm:px-[12%] py-10 scroll-mt-24 mt-16"
    >
      <motion.h4
        className="text-center mt-2 text-lg font-ovo"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5 }}
      >
        Introduction
      </motion.h4>
      <motion.h2
        className="text-center text-4xl sm:text-5xl font-ovo"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        About Me
      </motion.h2>

      <div className="max-w-6xl mx-auto">
        <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-10 sm:gap-20 my-10">
          <motion.div
            className="w-48 sm:w-80 rounded-3xl max-w-none mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src={assets.user_image}
              alt="Muhammad Muzammil"
              className="w-full rounded-3xl"
            />
          </motion.div>
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="mb-10 max-w-xl mx-auto lg:mx-0 font-ovo">
              I am a beginner full stack developer passionate about building
              projects that connect frontend and backend. My journey began with
              C++ which strengthened my problem solving foundation, and I later
              expanded into JavaScript, React.js, and Next.js for modern web
              development. On the backend I work with NestJS and SQL, while also
              using MongoDB for database management. I am currently exploring
              Angular at an introductory level to broaden my understanding of
              frameworks. I focus on learning through projects, experimenting
              with new tools, and improving my coding practices to grow into a
              versatile developer.
            </p>

            {/* Info List */}
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0">
              {infoList.map(({ icon, iconDark, title, description }, index) => (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  key={title}
                  className="border-[0.5px] border-gray-400 rounded-xl p-6 hover:bg-lightHover hover:shadow-black duration-500 dark:border-white dark:hover:shadow-white/50 dark:hover:bg-darkHover/50"
                >
                  <ThemeImage
                    light={icon}
                    dark={iconDark}
                    alt=""
                    className="w-7 mt-3 mx-auto lg:mx-0"
                  />
                  <h3 className="my-4 font-semibold text-gray-700 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm dark:text-white/80">
                    {description}
                  </p>
                </motion.li>
              ))}
            </ul>

            {/* Tools */}
            <motion.h4
              className="my-6 text-gray-700 font-ovo dark:text-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              My Expertise
            </motion.h4>
            <ul className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-5">
              {toolsData.map((tool, index) => (
                <motion.li
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewport}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  key={index}
                  className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg duration-500"
                >
                  <Image src={tool} alt="" className="w-5 sm:w-7" />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
