'use client';
import { serviceData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';

const viewport = { once: true, amount: 0.2 };

const Services = () => {
  return (
    <section
      id="services"
      className="w-full px-6 sm:px-[12%] py-10 scroll-mt-24 mt-16"
    >
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5 }}
        className="text-center mt-2 text-lg font-ovo"
      >
        What I offer
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-4xl sm:text-5xl font-ovo"
      >
        My Services
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
        I offer full stack development services with a focus on building clean,
        functional, and responsive web applications. On the frontend I work with
        React.js and Next.js to deliver smooth user experiences, while on the
        backend I use SQL, MongoDB, and NestJS to create reliable and scalable
        systems. I also bring strong problem solving skills from my C++
        background and am exploring Angular to expand my toolkit. Whether
        it&apos;s designing databases, connecting APIs, or crafting interactive
        interfaces, I enjoy turning ideas into working solutions.
      </motion.p>
      <div className="grid grid-cols-auto gap-6 my-10">
        {serviceData.map(({ icon, title, description }, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            key={title}
            className="border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black hover:bg-lightHover duration-500 dark:hover:bg-darkHover dark:hover:shadow-white/50"
          >
            <Image src={icon} alt="" className="w-10" />
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
