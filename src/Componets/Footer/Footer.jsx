import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import logo from "./assets/sanskaarvalley.png"; // Adjust the path as necessary
import { Link } from "react-router-dom";

const Footer = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    axios
      .get("https://sanskaarvalley-backend.vercel.app/contact/get")
      .then((response) => {
        setContactInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contact information:", error);
      });
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="text-white py-4 rounded-t-3xl mt-1 font-montserrat"
      style={{ background: "linear-gradient(to right, #105183, #252472)" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <div className="welcome-title flex items-center font-bold font-montserrat text-white ml-2">
              <Link to="/" onClick={handleScrollToTop}>
                <img
                  className="max-w-[50px] h-auto rounded-full mr-2"
                  src={logo}
                  alt="logo"
                />
              </Link>
              Sanskaar Valley
            </div>
            <p className="text-white text-md mt-4">
              Sanskaar Valley School is dedicated to fostering excellence in
              education while promoting holistic growth. We aim to cultivate
              curiosity, creativity, and character in every student, preparing
              them for a successful future both academically and socially.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold font-montserrat mb-4 mt-2">
              Quick Links
            </h2>
            <ul className="grid grid-cols-1  ">
              {[
                "/",
                "/services",
                "/about",
                "/careers",
                "/contact",
                "/login",
              ].map((path, index) => (
                <li className="mb-2" key={index}>
                  <Link
                    to={path}
                    onClick={handleScrollToTop}
                    className="hover:text-sky-500 font-montserrat transition duration-300 no-underline "
                  >
                    {path === "/"
                      ? "Home"
                      : path.replace("/", "").charAt(0).toUpperCase() +
                        path.slice(2)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold font-montserrat mb-4 mt-2">
              Contact Us
            </h2>
            <p className="text-white font-montserrat mb-2">
              <span className="text-black font-bold"> Address: </span>
              {contactInfo?.address || "N/A"}
            </p>
            <p className="text-white font-montserrat mb-2">
              <span className="text-black font-bold"> Phone:</span>{" "}
              {contactInfo?.mobile || "N/A"}
            </p>
            <p className="text-white font-montserrat mb-2">
              <span className="text-black font-bold"> Email:</span>{" "}
              {contactInfo?.email || "N/A"}
            </p>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold font-montserrat mb-4 mt-2">
              Follow Us
            </h2>
            <div className="flex space-x-6">
              {[
                {
                  icon: <FaFacebookF className="text-2xl" />,
                  link: contactInfo?.facebook,
                },
                {
                  icon: <FaTwitter className="text-2xl" />,
                  link: contactInfo?.twitter,
                },
                {
                  icon: <FaLinkedinIn className="text-2xl" />,
                  link: contactInfo?.linkedin,
                },
                {
                  icon: <FaInstagram className="text-2xl" />,
                  link: contactInfo?.instagram,
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray p-2 rounded-full transition-colors hover:text-sky-500"
                  onClick={handleScrollToTop}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between px-4 border-t border-gray-700 font-montserrat pt-2 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Sanskaar Valley School. All rights
            reserved.
          </p>

          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-2 sm:mt-0">
            <Link
              className="text-gray font-montserrat font-bold no-underline hover:text-sky-600"
              to="/privacy-policy"
              onClick={handleScrollToTop}
            >
              Privacy Policy
            </Link>
            <Link
              className="text-gray font-montserrat font-bold no-underline hover:text-sky-600"
              to="/terms-and-conditions"
              onClick={handleScrollToTop}
            >
              Terms of Use
            </Link>
            <Link
              className="text-gray font-montserrat font-bold no-underline hover:text-sky-600"
              to="/faq"
              onClick={handleScrollToTop}
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
