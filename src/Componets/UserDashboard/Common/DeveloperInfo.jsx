import React, { useState } from "react";
import profileImage from "./assets/profile.png"; // Adjust the path to your image

const DeveloperInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-montserrat bg-sky-100">
      <h1 className="text-5xl font-bold text-center text-[#105183] mb-8">
        Meet Your Developer
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center mb-8">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-[#105183] shadow-lg cursor-pointer transition-transform transform hover:scale-110"
            onClick={handleImageClick} // Click to open modal
          />
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <p className="text-md font-semibold text-white bg-[#105183] rounded-full px-4 py-1">
              Sachin singh
            </p>
          </div>
        </div>
      </div>
      <div className="border-2 border-[#105183] p-2 rounded-lg">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 ">
          <h2 className="text-3xl font-semibold mb-4 text-[#105183]">
            About Me
          </h2>
          <p className="text-lg text-gray-700">
            I am a passionate MERN Stack Developer with a focus on creating
            responsive and user-friendly web applications. My goal is to deliver
            high-quality solutions that meet the needs of my clients and enhance
            user experiences.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            I thrive in collaborative environments and am always eager to learn
            new technologies and improve my skills. Let's work together to bring
            your ideas to life!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <h2 className="text-3xl font-semibold mb-4 text-[#105183]">
              Skills
            </h2>
            <div className="text-lg text-gray-700">
              <p>• MongoDB</p>
              <p>• Express.js</p>
              <p>• React.js</p>
              <p>• Node.js</p>
              <p>• JavaScript</p>
              <p>• HTML & CSS</p>
              <p>• RESTful APIs</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4 text-[#105183]">
              Projects
            </h2>
            <div className="text-lg text-gray-700">
              <p>
                <strong>School Website:</strong> Developed a comprehensive
                school website with features like contact forms, information
                pages, and responsive design.
              </p>
              <p>
                <strong>Portfolio Website:</strong> Created a personal portfolio
                website to showcase my projects and skills.
              </p>
              <p>
                <strong>Learn and Grow:</strong>{" "}
                <p> Contributed to open-source projects, learning new</p>
              </p>
              <span>And more...</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg ">
          <h2 className="text-3xl font-semibold mb-4 text-[#105183]">
            Contact Me
          </h2>
          <p className="text-lg text-gray-700 mb-1">
            <strong>Email:</strong>
            <span className="ml-2 break-all">sachinsingh020406@gmail.com</span>
          </p>
          <p className="text-lg text-gray-700 mb-1">
            <strong>Phone:</strong>+91 7987723186
          </p>
          <p className="text-lg text-gray-700 mb-1">
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              linkedin.com/in/yourprofile
            </a>
          </p>
          <p className="text-lg text-gray-700 mb-1">
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              github.com/yourusername
            </a>
          </p>
          <p className="text-lg text-gray-700 mt-4">
            <strong>Let's Collaborate!</strong> If you're interested in working
            together or have a project in mind, feel free to reach out. I'm
            excited to hear your ideas!
          </p>
        </div>
      </div>
      {/* Modal for Image */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <img
              src={profileImage}
              alt="Profile"
              className="w-96 h-96 rounded-lg"
            />
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-[#105183] text-white rounded hover:bg-[#0e3d5b]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperInfo;
