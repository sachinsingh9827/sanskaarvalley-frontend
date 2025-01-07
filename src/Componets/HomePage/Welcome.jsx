import React from "react";
import "./Welcome.css";

const WelcomePage = () => {
  return (
    <>
      {/* Top Info Bar */}
      <div className="font-montserrat flex justify-between bg-gradient-to-r from-[#105183] to-[#252472] px-4 py-2 ">
        <p className="text-white uppercase">Dise Code: 23130600413</p>
        <p className="text-white uppercase">School ID: 13080217/74579</p>
      </div>

      {/* Welcome Container */}
      <div className="welcome-container font-montserrat bg-white p-8 rounded-b-3xl shadow-lg">
        {/* Welcome Title */}
        <div className="welcome-title text-center mb-6">
          <h1 className="font-poppins font-bold text-4xl text-gray">
            Welcome to Sanskaar Valley School
          </h1>
        </div>

        {/* Welcome Message */}
        <div className="welcome-message text-center mb-6">
          <p className="text-lg text-gray-700">
            At Sanskaar Valley School, we focus on nurturing young minds through
            innovative learning and holistic development. Join us in shaping a
            brighter future for your child.
          </p>
        </div>

        {/* Get Started Button */}
        <div className="text-center">
          <a
            href="/services"
            className="border-2 border-sky-500 no-underline text-black hover:text-white font-bold py-3 px-6 rounded-full hover:bg-sky-500 transition duration-300  hover:shadow-lg hover:shadow-sky-500"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
