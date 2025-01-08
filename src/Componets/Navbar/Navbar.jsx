import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import logo from "./assets/sanskaar valley.png";
import { logout } from "../../store/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation(); // Get the current route
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const data = localStorage.getItem("user");
    console.log(JSON.parse(data));
    if (JSON.parse(data)?.role || "" === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Function to determine if a link is active
  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav className="w-full flex flex-col bg-[#152259]">
      <div className="container mx-auto flex justify-between items-center p-2">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold font-montserrat text-white ml-2">
          <Link to="/">
            <img
              className="max-w-[50px] h-auto  rounded-full mr-2"
              src={logo}
              alt="logo"
            />
          </Link>
          Sanskaar Valley
        </div>

        {/* Menu Icon for Mobile */}
        <div className="block lg:hidden mt-2 mr-4 text-white">
          <button
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle Menu"
            className="focus:outline-none transition-transform duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Links for Desktop */}
        <div className="hidden font-montserrat lg:flex space-x-10">
          <Link
            to="/"
            className={`font-semibold transition duration-300 no-underline ${
              isActiveLink("/")
                ? "text-sky-500"
                : "text-white hover:text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`font-semibold transition duration-300 no-underline ${
              isActiveLink("/about")
                ? "text-sky-500"
                : "text-white hover:text-gray-300"
            }`}
          >
            About
          </Link>
          <Link
            to="/services"
            className={`font-semibold transition duration-300 no-underline ${
              isActiveLink("/services")
                ? "text-sky-500"
                : "text-white hover:text-gray-300"
            }`}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className={`font-semibold transition duration-300 no-underline ${
              isActiveLink("/contact")
                ? "text-sky-500"
                : "text-white hover:text-gray-300"
            }`}
          >
            Contact
          </Link>

          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="text-white px-4 hover:bg-red-600 rounded-3xl ml-4 font-semibold border-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white px-4 hover:bg-sky-500 rounded-3xl ml-4 font-montserrat no-underline border-2 border-sky-500"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div
        className={`${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } lg:hidden transition-all duration-100 ease-in-out overflow-hidden bg-[#152259] mt-4 space-y-4 p-2`}
      >
        <Link
          to="/"
          className={`block font-semibold transition duration-300 no-underline ${
            isActiveLink("/")
              ? "text-sky-500"
              : "text-white hover:text-green-300"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`block font-semibold transition duration-300 no-underline ${
            isActiveLink("/about")
              ? "text-sky-500"
              : "text-white hover:text-green-300"
          }`}
        >
          About
        </Link>
        <Link
          to="/services"
          className={`block font-semibold transition duration-300 no-underline ${
            isActiveLink("/services")
              ? "text-sky-500"
              : "text-white hover:text-green-300"
          }`}
        >
          Services
        </Link>
        <Link
          to="/contact"
          className={`block font-semibold transition duration-300 no-underline ${
            isActiveLink("/contact")
              ? "text-sky-500"
              : "text-white hover:text-green-300"
          }`}
        >
          Contact
        </Link>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="block w-full text-left font-semibold text-white hover:text-red-500 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="block font-semibold text-white transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
      <div className="border-b border-white pb-2" />
    </nav>
  );
};

export default Navbar;
