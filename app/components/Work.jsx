'use client';
import { assets, workData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';
import ThemeImage from './ThemeImage';

const viewport = { once: true, amount: 0.2 };

const Work = () => {
  return (
    <section
      id="work"
      className="w-full px-6 sm:px-[12%] py-10 scroll-mt-24 mt-16"
    >
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5 }}
        className="text-center mt-2 text-lg font-ovo"
      >
        My Portfolio
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-4xl sm:text-5xl font-ovo"
      >
        My Latest Work
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
        Welcome to my portfolio. Explore a collection of projects showcasing my
        work.
      </motion.p>
      <div className="grid grid-cols-auto my-10 gap-5 dark:text-black">
        {workData.map((project, index) => (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square rounded-lg relative block overflow-hidden group"
          >
            <Image
              src={project.bgImage}
              alt={`${project.title} — ${project.description}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{project.title}</h3>
                <p className="text-sm text-gray-700 truncate">
                  {project.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="border rounded-full border-black w-9 shrink-0 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition"
              >
                <Image src={assets.send_icon} alt="" className="w-5" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.3 }}
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/muzammil-shayk"
        className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white/80 dark:hover:bg-darkHover"
      >
        Show more{' '}
        <ThemeImage
          light={assets.right_arrow_bold}
          dark={assets.right_arrow_bold_dark}
          alt=""
          className="w-4"
        />
      </motion.a>
    </section>
  );
};

export default Work;
