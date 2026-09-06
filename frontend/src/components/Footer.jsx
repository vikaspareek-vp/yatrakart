import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-[#DDD6CE]">

      {/* Main Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 py-16">

        {/* Brand */}
        <div>
          <img
            className="w-32 mb-6"
            src={assets.logo}
            alt="YatraKart"
          />

          <p className="max-w-md text-sm text-[#6B6B6B] leading-7">
            Discover timeless fashion and modern everyday styles
            at YatraKart. Shop quality clothing designed to make
            every look feel effortless.
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="text-sm font-semibold tracking-[0.15em] text-[#222] mb-6">
            COMPANY
          </p>

          <ul className="flex flex-col gap-3 text-sm text-[#6B6B6B]">
            <li>
              <Link
                to="/"
                 onClick={() => window.scrollTo(0, 0)}
                className="hover:text-[#A66A45] transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/collection"
                className="hover:text-[#A66A45] transition"
              >
                Collection
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-[#A66A45] transition"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-[#A66A45] transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold tracking-[0.15em] text-[#222] mb-6">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-3 text-sm text-[#6B6B6B]">
            <li>+91 7877XXXXXX</li>
            <li>support@yatrakart.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-[#DDD6CE]">
        <p className="py-6 text-xs sm:text-sm text-center text-[#6B6B6B]">
          © {new Date().getFullYear()} YatraKart. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;