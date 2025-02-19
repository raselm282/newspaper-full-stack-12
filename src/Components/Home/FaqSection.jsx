import React from "react";
import SectionTitle from "./SectionTitle";
import faq from "../../assets/faq.png";

const FaqSection = () => {
  return (
    <div>
      <div className=" max-w-full mx-auto mb-6">
        <SectionTitle heading="FAQ"></SectionTitle>
        {/* <h2 className="text-3xl font-bold">FAQ</h2> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mx-auto">
          <img className="w-[400px] h-[400px]" src={faq} alt="" />
        </div>
        <div>
          <div className="collapse collapse-plus bg-base-200 dark:bg-gray-900 dark:text-white">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              1. What technologies do you specialize in?
            </div>
            <div className="collapse-content dark:bg-gray-900 dark:text-white">
              <p>
                I specialize in full-stack web development, with expertise in
                React, Tailwind CSS, Node.js, Express, MongoDB, and Firebase. I
                also have experience with authentication, API integration, and
                responsive design to build modern, scalable web applications.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 dark:bg-gray-900 dark:text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              2. Can you develop both front-end and back-end applications?
            </div>
            <div className="collapse-content dark:bg-gray-900 dark:text-white">
              <p>
                Yes! I have strong skills in both front-end and back-end
                development. I create intuitive user interfaces using React and
                Tailwind CSS while handling server-side logic, databases, and
                authentication with Node.js, Express, and MongoDB.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 dark:bg-gray-900 dark:text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              3. Do you offer freelance or contract work?
            </div>
            <div className="collapse-content dark:bg-gray-900 dark:text-white">
              <p>
                Yes! I am open to freelance projects, contract work, and
                collaborations. Whether you need a website, web app, or
                full-stack solution, feel free to reach out to discuss your
                project. Let me know if you want me to customize these further!
                🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
