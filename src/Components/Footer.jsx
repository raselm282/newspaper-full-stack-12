import React from "react";
import useAuth from "../Hooks/useAuth";
import logo from '../assets/Newspaper_logo.png'
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";


const Footer = () => {

  return (
    <div>
      <footer className="footer footer-horizontal footer-center text-black p-10">
        <aside className="dark:bg-gray-900 dark:text-white/60">
          <img className="w-20 h-20 rounded-full" src={logo} alt="" />
          <p className="font-bold">
            Md Rasel Mahmud
            <br />
            Providing reliable tech since 2024
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
          <a
          href="https://github.com/raselm282"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 text-3xl transition duration-300"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/raselm282"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-3xl transition duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.facebook.com/raselm282"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 text-3xl transition duration-300"
        >
          <FaFacebook />
        </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
