import React from "react";
import SectionTitle from "./SectionTitle";

const AboutMe = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <SectionTitle
          heading="About Me"
          subHeading="I am a passionate and skilled developer with expertise in building dynamic, responsive web applications. With a strong foundation in both front-end and back-end technologies, I strive to create efficient and user-friendly solutions that meet both client and user needs. 📊"
        ></SectionTitle>
        {/* <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          About Me
        </h2> */}
        <p className="text-lg text-gray-700 dark:text-gray-300">
          I am a dedicated journalist with a passion for delivering timely,
          accurate, and compelling news. With a strong focus on investigative
          reporting and in-depth analysis, I strive to inform and engage readers
          on local, national, and global issues. My work is grounded in
          integrity, curiosity, and a commitment to truth, ensuring every story
          reflects a balanced and insightful perspective.
        </p>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          I believe in the power of storytelling to drive change, inspire
          thought, and promote understanding. I aim to be a trusted source of
          information, one that educates and empowers my audience to stay
          informed and make meaningful decisions.
        </p>
        <p>
          I am a passionate Web Developer with a strong foundation in front-end
          and back-end technologies. I specialize in building dynamic,
          responsive, and user-friendly web applications using React, Tailwind
          CSS, Node.js, Express, and MongoDB. With experience in full-stack
          development, I enjoy crafting seamless digital experiences that
          combine creativity with functionality. I am always eager to learn new
          technologies and stay updated with the latest trends in web
          development. Whether it's designing engaging UI/UX or developing
          robust backend systems, I strive to create high-quality, efficient,
          and scalable solutions. Let's build something amazing together! 🚀
        </p>
      </section>
    </div>
  );
};

export default AboutMe;
