import React from 'react'
import {Logo} from "../index";
import { Link } from 'react-router-dom';
import { TwitterX, Instagram, Linkedin } from "react-bootstrap-icons"

const Footer = () => {
 
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        <ul className="-m-5 flex flex-wrap items-center">
          <li className="p-5">
            <Link 
            to="/privacy-policy"
            className="font-medium link link-hover transition-all">
              Privacy Policy
            </Link>
          </li>

          <li className="p-5">
            <Link 
            to="/terms-condition"
            className="font-medium link link-hover transition-all">
              Terms of Service
            </Link>
          </li>

          <li className="p-5">
            <Link
            to="/about-us"
            className="font-medium link link-hover transition-all">
              About Us
            </Link>
          </li>

          <li className="p-5">
            <Link
            to="/contact-us"
            className="font-medium link link-hover transition-all">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav> 

      <nav>
        <div className="-m-1.5 flex flex-wrap">
          <div className="w-auto p-1.5">
            <Link to="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DADADA] transition-all translate-y-1">
                <Linkedin/>
              </div>
            </Link>
          </div>

          <div className="w-auto p-1.5">
            <Link to="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DADADA] transition-all translate-y-1">
                <TwitterX/>
              </div>
            </Link>
          </div>
 
          <div className="w-auto p-1.5">
            <Link to="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DADADA] transition-all translate-y-1">
                <Instagram/>
              </div>
            </Link>
          </div>
        </div>
      </nav> 

      <aside>
        <p>Copyright © 2025 - All right reserved by SUTIBLOG</p>
      </aside>
    </footer>
  )
}

export default Footer;