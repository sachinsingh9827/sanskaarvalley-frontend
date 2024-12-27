import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import logo from "./assets/sanskaarvalley.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const [contactInfo, setContactInfo] = React.useState(null);
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const data = localStorage.getItem("user");
    console.log(JSON.parse(data));
    if (JSON.parse(data)?.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

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

  return (
    <>
      <footer
        className="text-white py-4 rounded-t-3xl mt-1"
        style={{ background: "linear-gradient(to right, #105183, #252472)" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Us */}
            <div>
              <div className="welcome-title flex items-center font-bold font-montserrat text-white ml-2">
                <Link to="/">
                  <img
                    className="max-w-[50px] h-auto rounded-full mr-2"
                    src={logo}
                    alt="logo"
                  />
                </Link>
                Sanskaar Valley
              </div>
              <p className="text-white text-sm font-montserrat mt-4">
                Sanskaar Valley School is dedicated to fostering excellence in
                education while promoting holistic growth. We aim to cultivate
                curiosity, creativity, and character in every student, preparing
                them for a successful future both academically and socially.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-lg font-semibold font-montserrat mb-4">
                Quick Links
              </h2>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-white hover:text-sky-600 font-montserrat transition duration-300 no-underline"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/services"
                    className="text-white hover:text-sky-600 font-montserrat transition duration-300 no-underline"
                  >
                    Services
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/about"
                    className="text-white hover:text-sky-600 font-montserrat transition duration-300 no-underline"
                  >
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/careers"
                    className="text-white hover:text-sky-600 font-montserrat transition duration-300 no-underline"
                  >
                    Careers
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/contact"
                    className="text-white hover:text-sky-600 font-montserrat transition duration-300 no-underline"
                  >
                    Contact
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/login"
                    className="text-white hover:text-sky-600 font-montserrat transition duration-300 no-underline"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-lg font-semibold font-montserrat mb-4">
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
              <h2 className="text-lg font-semibold font-montserrat mb-4">
                Follow Us
              </h2>
              <div className="flex space-x-6">
                <a
                  href={contactInfo?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray p-2 rounded-full transition-colors hover:text-sky-500"
                >
                  <FaFacebookF className="text-2xl" />
                </a>
                <a
                  href={contactInfo?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray p-2 rounded-full transition-colors hover:text-sky-500"
                >
                  <FaTwitter className="text-2xl" />
                </a>
                <a
                  href={contactInfo?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray p-2 rounded-full transition-colors hover:text-sky-500"
                >
                  <FaLinkedinIn className="text-2xl" />
                </a>
                <a
                  href={contactInfo?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray p-2 rounded-full transition-colors hover:text-sky-500"
                >
                  <FaInstagram className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
          {/* Footer bottom */}
          <div className="flex flex-col sm:flex-row justify-between px-4 border-t border-gray-700 font-montserrat pt-2 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Sanskaar Valley School. All
              rights reserved.
            </p>

            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-2 sm:mt-0">
              <Link
                className="text-gray font-montserrat font-bold no-underline hover:text-sky-600"
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-gray font-montserrat font-bold no-underline hover:text-sky-600"
                to="/terms-and-conditions"
              >
                Terms of Use
              </Link>
              <Link
                className="text-gray font-montserrat font-bold no-underline hover:text-sky-600"
                to="/faq"
              >
                f&#38;c
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
