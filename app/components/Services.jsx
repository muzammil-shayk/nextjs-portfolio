import { assets, serviceData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Services = () => {
  return (
    <div id="services" className="w-full px-6 sm:px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center -mt-5 text-lg font-ovo">What I offer</h4>
      <h2 className="text-center text-4xl sm:text-5xl font-ovo">My Services</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo">
        I offer full stack development services with a focus on building clean,
        functional, and responsive web applications. On the frontend I work with
        React.js and Next.js to deliver smooth user experiences, while on the
        backend I use SQL, MongoDB, and NestJS to create reliable and scalable
        systems. I also bring strong problem solving skills from my C++
        background and am exploring Angular to expand my toolkit. Whether it’s
        designing databases, connecting APIs, or crafting interactive
        interfaces, I enjoy turning ideas into working solutions.
      </p>
      <div className="grid grid-cols-auto gap-6 my-10">
        {serviceData.map(({ icon, title, description, link }, index) => (
          <div
            key={index}
            className="border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500"
          >
            <Image src={icon} alt="" className="w-10" />
            <h3 className="text-lg my-4 text-gray-700">{title}</h3>
            <p className="text-sm text-gray-600 leading-5">{description}</p>
            <a href={link} className="flex items-center gap-2 text-sm mt-5">
              Read More{' '}
              <Image src={assets.right_arrow} alt="" className="w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
