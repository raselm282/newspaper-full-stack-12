import React from "react";
import useAuth from "../Hooks/useAuth";
import logo from '../assets/Newspaper_logo.png'


const Footer = () => {
  const { signOutUser } = useAuth();

  return (
    <footer className="footer bg-base-200 text-base-content p-10 dark:bg-gray-900 dark:text-white/60">
      <aside>
      <img className="w-20 dark:bg-gray-900 dark:text-white/60" src={logo} alt="" />
        <p className="font-bold">
          Newspaper Full Stack Website
          <br />
          Providing reliable tech since 2025
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
