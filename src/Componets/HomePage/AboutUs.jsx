import React from "react";
import { FaClock, FaUserGraduate, FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="container mx-auto py-8 px-6 font-montserrat">
      {/* Welcome Section */}
      <div
        className="text-center py-12 px-6 mb-12 rounded-lg shadow-lg"
        style={{
          background: "linear-gradient(to right, #105183, #252472)",
          color: "white",
        }}
      >
        <h2 className=" text-4xl font-bold mb-4 animate__animated animate__fadeIn">
          Welcome to Sanskaar Valley School
        </h2>
        <p className="welcome-title text-sm max-w-2xl mx-auto leading-relaxed">
          Empowering young minds to become future leaders through holistic
          education, creativity, and innovation.
        </p>
      </div>

      {/* Our Mission Section */}
      <section className="text-center mb-12">
        <h3 className="text-3xl font-bold text-[#105183] mb-6">Our Mission</h3>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Our mission is to foster a vibrant and inclusive learning environment
          where students are encouraged to explore, learn, and grow. We are
          committed to providing a balanced education that nurtures both
          academic excellence and personal development.
        </p>
      </section>

      {/* Key Highlights Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center mb-12">
        {/* Highlight Card */}
        <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transform hover:scale-105 transition-all">
          <FaClock className="text-[#105183] text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Decade of Excellence</h3>
          <p className="text-gray-600">
            Over 10 years of delivering top-notch education, empowering students
            to excel in every aspect of their lives.
          </p>
        </div>
        {/* Highlight Card */}
        <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transform hover:scale-105 transition-all">
          <FaUserGraduate className="text-[#105183] text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Dedicated Educators</h3>
          <p className="text-gray-600">
            A team of passionate educators who inspire and mentor students to
            reach their highest potential.
          </p>
        </div>
        {/* Highlight Card */}
        <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transform hover:scale-105 transition-all">
          <FaUniversity className="text-[#105183] text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">World-Class Facilities</h3>
          <p className="text-gray-600">
            A modern campus with state-of-the-art labs, libraries, and
            collaborative spaces for an enhanced learning experience.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h3 className="text-3xl font-bold text-[#105183] mb-6">
          Join Our Learning Community
        </h3>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
          Be a part of a thriving educational institution that nurtures
          creativity, builds resilience, and inspires future leaders.
        </p>
        <Link
          to="/contact"
          className="no-underline text-sm sm:text-base font-semibold px-4 py-2 sm:px-6 sm:py-2 rounded-full border-2 border-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
