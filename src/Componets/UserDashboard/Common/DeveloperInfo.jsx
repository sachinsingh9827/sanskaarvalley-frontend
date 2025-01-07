import React, { useState } from "react";
import profileImage from "./assets/profile.png"; // Adjust the path to your image

const developers = [
  {
    id: 1,
    name: "Sachin Singh",
    image: profileImage,
    skills: ["MERN Stack", "JavaScript", "React", "Node.js"],
    contact: {
      email: "sachinsingh020406@gmail.com",
      phone: "+91 7987723186",
      linkedin: "https://www.linkedin.com/in/sachin-singh-a8a66327a/",
      github: "https://github.com/sachinsingh9827/sanskaarvalley-frontend",
    },
  },
  // You can add more developers here
];

const DeveloperInfo = () => {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleShowDetails = (developer) => {
    setSelectedDeveloper(developer);
  };

  const handleCloseDetails = () => {
    setSelectedDeveloper(null);
  };

  const handleImageClick = (developer) => {
    setSelectedDeveloper(developer);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-montserrat bg-sky-100">
      <h1 className="text-5xl font-bold text-center text-[#105183] mb-8">
        Explore Our Developer Profiles
      </h1>

      <div className="flex flex-col md:flex-row">
        {/* Developer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 md:w-full">
          {developers.map((developer) => (
            <div
              key={developer.id}
              className="p-4 border rounded-lg shadow-lg bg-sky-200 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={developer.image}
                alt={developer.name}
                className="w-40 h-40 rounded-full border-4 border-[#105183] shadow-lg mb-2 cursor-pointer"
                onClick={() => handleImageClick(developer)} // Click to open image modal
              />
              <p className="text-md font-semibold text-[#105183] text-center">
                {developer.name}
              </p>

              <button
                onClick={() => handleShowDetails(developer)}
                className="mt-2 px-4 py-2 bg-[#105183] text-white rounded hover:bg-[#0e3d5b] transition duration-200"
              >
                Show Contact Details
              </button>
            </div>
          ))}
        </div>

        {/* Modal for selected developer contact details */}
        {selectedDeveloper && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="max-w-md w-full border-2 border-[#105183] p-4 rounded-lg bg-white">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#105183] text-center">
                Contact Details for {selectedDeveloper.name}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-1">
                <strong>Email:</strong> {selectedDeveloper.contact.email}
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-1">
                <strong>Phone:</strong> {selectedDeveloper.contact.phone}
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-1">
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={selectedDeveloper.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all"
                >
                  {selectedDeveloper.contact.linkedin}
                </a>
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-1">
                <strong>GitHub:</strong>{" "}
                <a
                  href={selectedDeveloper.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all"
                >
                  {selectedDeveloper.contact.github}
                </a>
              </p>
              <button
                onClick={handleCloseDetails}
                className="mt-4 w-full px-4 py-2 bg-[#105183] text-white rounded hover:bg-[#0e3d5b]"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal for larger image view */}
        {isImageModalOpen && selectedDeveloper && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="relative">
              <img
                src={selectedDeveloper.image}
                alt={selectedDeveloper.name}
                className="max-w-full max-h-screen rounded-lg shadow-lg"
              />
              <button
                onClick={handleCloseImageModal}
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperInfo;
