import React from 'react'
import {Logo} from "../index";
import { Link } from 'react-router-dom';
import { TwitterX, Instagram, Linkedin } from "react-bootstrap-icons"

const Footer = () => {
 
  return (
    <footer className="relative overflow-hidden bg-[#050404] py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto p-8">
            <a href="#">
              <div className="inline-flex items-center">
                <Link>
                  <Logo/>
                </Link>
              </div>
            </a>
          </div>
          <div className="w-auto p-8">
            <ul className="-m-5 flex flex-wrap items-center">
              <li className="p-5">
                <Link 
                to="/privacy-policy"
                className="font-medium text-[#DADADA] hover:text-[#951ABE] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li className="p-5">
                <Link 
                to="/terms-condition"
                className="font-medium text-[#DADADA] hover:text-[#951ABE] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li className="p-5">
                <Link
                to="/about-us"
                className="font-medium text-[#DADADA] hover:text-[#951ABE] transition-colors">
                  About Us
                </Link>
              </li>
              <li className="p-5">
                <Link
                to="/contact-us"
                className="font-medium text-[#DADADA] hover:text-[#951ABE] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-auto p-8">
            <div className="-m-1.5 flex flex-wrap">
              <div className="w-auto p-1.5">
                <Link to="/">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DADADA] hover:border-[#951ABE] transition-all translate-y-1">
                    <Linkedin/>
                  </div>
                </Link>
              </div>
              <div className="w-auto p-1.5">
                <Link to="/">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DADADA] hover:border-[#951ABE] transition-all translate-y-1">
                    <TwitterX/>
                  </div>
                </Link>
              </div>
              <div className="w-auto p-1.5">
                <Link to="/">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DADADA] hover:border-[#951ABE] transition-all translate-y-1">
                    <Instagram/>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-[#DADADA] text-center">© 2025 sutiblog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;