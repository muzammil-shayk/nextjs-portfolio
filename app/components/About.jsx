import { assets, infoList, toolsData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <div id="about" className="w-full px-6 sm:px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center -mt-5 text-lg font-ovo">Introduction</h4>
      <h2 className="text-center text-4xl sm:text-5xl font-ovo">About Me</h2>

      <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-10 sm:gap-20 my-10">
        {/* Image */}
        <div className="w-48 sm:w-80 rounded-3xl max-w-none mx-auto">
          <Image
            src={assets.user_image}
            alt="user"
            className="w-full rounded-3xl"
          />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-10 max-w-xl mx-auto lg:mx-0 font-ovo">
            I am a beginner full stack developer passionate about building
            projects that connect frontend and backend. My journey began with
            C++ which strengthened my problem solving foundation, and I later
            expanded into JavaScript, React.js, and Next.js for modern web
            development. On the backend I work with NestJS and SQL, while also
            using MongoDB for database management. I am currently exploring
            Angular at an introductory level to broaden my understanding of
            frameworks. I focus on learning through projects, experimenting with
            new tools, and improving my coding practices to grow into a
            versatile developer.
          </p>

          {/* Info List */}
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0">
            {infoList.map(({ icon, title, description }, index) => (
              <li
                key={index}
                className="border-[0.5px] border-gray-400 rounded-xl cursor-pointer p-6 hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black"
              >
                <Image
                  src={icon}
                  alt={title}
                  className="w-7 mt-3 mx-auto lg:mx-0"
                />
                <h3 className="my-4 font-semibold text-gray-700">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </li>
            ))}
          </ul>

          {/* Tools */}
          <h4 className="my-6 text-gray-700 font-ovo">Tools I use</h4>
          <ul className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-5">
            {toolsData.map((tool, index) => (
              <li
                key={index}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500"
              >
                <Image src={tool} alt="tool" className="w-5 sm:w-7" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
