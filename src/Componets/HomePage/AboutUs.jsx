import React from "react";
import { FaClock, FaUser, Graduate, FaUniversity } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="container mx-auto font-montserrat py-4 px-4">
      {/* Welcome Section */}
      <div
        className="welcome-section text-center mb-12 py-12 px-4"
        style={{
          background: "linear-gradient(to right, #105183, #252472)",
          borderRadius: "15px",
          color: "white",
        }}
      >
        <h2 className="text-white font-semibold sm:text-4xl mb-6 animate__animated animate__fadeIn">
          Shaping Future Innovators
        </h2>
        <p className="welcome-title text-white text-sm font-medium max-w-3xl mx-auto">
          At Sanskaar Valley School, we are dedicated to nurturing creativity,
          critical thinking, and a passion for learning in every student.
        </p>
      </div>

      {/* Our Mission Section */}
      <section className="text-center mt-12 mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-sky-600 mb-4">
          Our Mission
        </h3>
        <p className="text-gray-700 max-w mx-auto">
          At Sanskaar Valley School, our mission is to create a dynamic and
          inclusive learning environment where every student feels valued and
          inspired. We are dedicated to nurturing creativity, critical thinking,
          and resilience, equipping our students with the skills they need to
          thrive in an ever-evolving world. Together, we strive for academic
          excellence while fostering personal growth and social responsibility.
        </p>
      </section>

      {/* Key Highlights Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center mt-12">
        <div
          className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
          style={{
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease, background-color 0.3s ease",
          }}
        >
          <FaClock className="text-sky-600 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            A Decade of Excellence
          </h3>
          <p className="text-gray-600">
            With over 10 years of experience, we have built a legacy of academic
            excellence, preparing students for success in their future
            endeavors.
          </p>
        </div>

        <div
          className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:scale-105"
          style={{
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease, background-color 0.3s ease",
          }}
        >
          <FaUser Graduate className="text-sky-600 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Passionate Educators
          </h3>
          <p className="text-gray-600">
            Our dedicated faculty members are committed to nurturing each
            student's potential and guiding them on their academic and personal
            journeys.
          </p>
        </div>

        <div
          className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
          style={{
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease, background-color 0.3s ease",
          }}
        >
          <FaUniversity className="text-sky-600 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            State-of-the-Art Facilities
          </h3>
          <p className="text-gray-600">
            Our modern campus is equipped with cutting-edge facilities that
            enhance the learning experience, including advanced laboratories and
            collaborative spaces.
          </p>
        </div>
      </section>

      {/* Join Us Call to Action */}
      <section className="text-center mt-12">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-sky-600">
          Join Us in Shaping Tomorrow's Leaders!
        </h3>
        <p className="text-gray-700 max-w mx-auto mb-8">
          Together, we can inspire the next generation of thinkers, innovators,
          and leaders. Join us on this journey to excellence and help us build a
          brighter future for our students.
        </p>
        <a
          href="/contact"
          className="no-underline text-sm sm:text-base font-semibold px-4 py-2 sm:px-6 sm:py-2 rounded-full  border-2 border-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300 transform text-center mx-auto block hover:shadow-lg hover:shadow-sky-500"
        >
          Connect with Us Today
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
