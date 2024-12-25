import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { People, School, DirectionsBus } from "@mui/icons-material";

const servicesData = [
  {
    title: "Admissions",
    description:
      "Our admissions process is designed to be straightforward and supportive, with dedicated counselors available to assist families every step of the way.",
    icon: "🎓",
  },
  {
    title: "Academics",
    description:
      "We offer a comprehensive curriculum that emphasizes holistic development, ensuring personalized attention for every student to thrive academically.",
    icon: "📚",
  },
  {
    title: "Transportation",
    description:
      "Our reliable transportation services ensure that students travel safely and efficiently to and from school, covering all essential routes.",
    icon: "🚌",
  },
  {
    title: "Extracurricular Activities",
    description:
      "We provide a diverse range of extracurricular activities, including sports, music, and arts, to promote well-rounded development in our students.",
    icon: "⚽",
  },
  {
    title: "Field Trips",
    description:
      "We organize engaging and educational field trips that enrich the learning experience and foster a sense of adventure among students.",
    icon: "🌳",
  },
  {
    title: "Teacher Management",
    description:
      "Our teacher management system streamlines the organization of schedules, classes, and performance evaluations to enhance educational quality.",
    icon: "👨‍🏫",
  },
];

// Fallback data if no props are passed
const dashboardData = [
  {
    title: "Students",
    count: 1200,
    icon: <People fontSize="large" />,
    color: "from-indigo-400 to-indigo-600",
  },
  {
    title: "Teachers",
    count: 100,
    icon: <School fontSize="large" />,
    color: "from-green-400 to-green-600",
  },
  {
    title: "Buses",
    count: 2,
    icon: <DirectionsBus fontSize="large" />,
    color: "from-yellow-400 to-yellow-600",
  },
];

const Services = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [dashboardDataIndex, setDashboardDataIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) =>
        prevIndex === servicesData.length - 1 ? 0 : prevIndex + 1
      );
      setDashboardDataIndex((prevIndex) =>
        prevIndex === dashboardData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change service every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="container mx-auto py-4 font-montserrat px-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#105183] to-[#252472] text-center text-white p-8 sm:p-12 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl text-white sm:text-4xl font-bold mb-4 animate__animated animate__fadeIn">
          Discover Our School Services
        </h2>
        <p className="welcome-title text-sm font-medium max-w-2xl mx-auto">
          We offer a variety of services designed to support students and
          families, from admissions to extracurricular activities, ensuring a
          well-rounded educational experience.
        </p>
      </div>
      {/* Service Carousel for Mobile View */}
      <div className="flex justify-center mb-8 sm:hidden">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="p-6 text-center space-y-4">
            <p className="text-lg text-gray-500">
              <span className="text-2xl font-bold text-sky-600">
                {servicesData[currentServiceIndex].icon} -{" "}
                {servicesData[currentServiceIndex].title}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-4 italic">
              {servicesData[currentServiceIndex].description}
            </p>
          </div>
        </div>
      </div>
      {/* Dashboard Section for Mobile View */}
      <div className="flex flex-col mb-8 sm:hidden">
        <div className="grid grid-cols-1 gap-6">
          <p
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-50 bg-gradient-to-br ${dashboardData[dashboardDataIndex].color}`}
          >
            <div className="flex justify-center  text-4xl mb-4">
              <span className="text-2xl font-bold ">
                {dashboardData[dashboardDataIndex].icon}{" "}
              </span>
              {dashboardData[dashboardDataIndex].title}
            </div>
            <p className="flex justify-center  text-2xl text-gray-600">
              {dashboardData[dashboardDataIndex].count} +
            </p>
          </p>
        </div>
      </div>
      {/* Service Cards Section for Larger Screens */}{" "}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-50"
          >
            <div className="text-4xl mb-4 text-blue-600">
              {service.icon} {service.title}
            </div>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
      {/* Dashboard Section for Larger Screens */}
      <div className="hidden sm:block container mx-auto py-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {dashboardData.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${
                item.color
              } text-white shadow-lg rounded-lg p-6 w-full h-auto flex flex-col justify-center items-center animate__animated animate__fadeIn animate__delay-${
                index * 200
              }ms hover:scale-105 hover:shadow-2xl transition-transform duration-500 transform-gpu`}
            >
              <div className="text-white bg-white/20 p-4 rounded-full mb-4 shadow-md">
                {item.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-center">
                {item.title}
              </h2>
              <p className="text-2xl font-bold text-center">
                {item.count.toLocaleString()}+
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Call-to-Action Section */}
      <div className="mt-12 text-center">
        <Link
          to="/contact"
          className="no-underline text-sm sm:text-base font-semibold px-4 py-2 sm:px-6 sm:py-2 rounded-full border-2 border-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300 transform sm:w-auto text-center mx-auto block hover:shadow-lg hover:shadow-sky-500"
        >
          Contact Us for More Information
        </Link>
      </div>
    </div>
  );
};

export default Services;
