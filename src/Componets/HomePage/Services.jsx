import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { People, School, DirectionsBus } from "@mui/icons-material";

// Services Data
const servicesData = [
  {
    title: "Admissions",
    description:
      "Our admissions process is straightforward and supportive, with dedicated counselors available to assist families every step of the way.",
    icon: "🎓",
  },
  {
    title: "Academics",
    description:
      "We offer a comprehensive curriculum emphasizing holistic development, ensuring personalized attention for every student.",
    icon: "📚",
  },
  {
    title: "Transportation",
    description:
      "Our reliable transportation services ensure safe and efficient travel for students, covering essential routes.",
    icon: "🚌",
  },
  {
    title: "Extracurricular Activities",
    description:
      "A diverse range of extracurricular activities, including sports, music, and arts, to promote well-rounded development.",
    icon: "⚽",
  },
  {
    title: "Field Trips",
    description:
      "Engaging and educational field trips enrich learning and foster a sense of adventure among students.",
    icon: "🌳",
  },
  {
    title: "Teacher Management",
    description:
      "Our teacher management system organizes schedules, classes, and performance evaluations to enhance educational quality.",
    icon: "👨‍🏫",
  },
];

// Dashboard Data
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
    count: 20,
    icon: <DirectionsBus fontSize="large" />,
    color: "from-yellow-400 to-yellow-600",
  },
];

const Services = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) =>
        prevIndex === servicesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto py-8 px-6 font-montserrat">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#105183] to-[#252472] text-center text-white p-8 sm:p-12 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Discover Our School Services
        </h2>
        <p className="welcome-title text-sm font-medium max-w-2xl mx-auto">
          Explore our comprehensive services, from admissions to extracurricular
          activities, designed to support students and families.
        </p>
      </div>

      {/* Service Carousel for Mobile View */}
      <div className="flex justify-center mb-8 sm:hidden">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="p-6 text-center space-y-4">
            <div className="text-2xl font-bold text-sky-600">
              {servicesData[currentServiceIndex].icon} -{" "}
              {servicesData[currentServiceIndex].title}
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              {servicesData[currentServiceIndex].description}
            </p>
          </div>
        </div>
      </div>

      {/* Service Cards Section for Larger Screens */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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

      {/* Dashboard Section */}
      <div className="container mx-auto py-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
          {dashboardData.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${item.color} text-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center hover:scale-105 hover:shadow-2xl transition-transform duration-500`}
            >
              <div className="text-white bg-white/20 p-4 rounded-full mb-4 shadow-md">
                {item.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-2xl font-bold">
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
          className="no-underline text-sm sm:text-base font-semibold px-4 py-2 sm:px-6 sm:py-2 rounded-full border-2 border-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300"
        >
          Contact Us for More Information
        </Link>
      </div>
    </div>
  );
};

export default Services;
