import React, { useState } from 'react';

// Sample uniform data (JSON format)
const uniformData = {
  "uniformDetails": [
    { "class": "Class 1", "uniformCost": 800, "uniformImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe65Y3ZGz9n1-PlpJBcll3dPL4cgo4d1aL5g&s" },
    { "class": "Class 2", "uniformCost": 900, "uniformImage": "link-to-class-2-uniform-image.jpg" },
    { "class": "Class 3", "uniformCost": 1000, "uniformImage": "link-to-class-3-uniform-image.jpg" },
    { "class": "Class 4", "uniformCost": 1100, "uniformImage": "link-to-class-4-uniform-image.jpg" },
    { "class": "Class 5", "uniformCost": 1200, "uniformImage": "link-to-class-5-uniform-image.jpg" },
    { "class": "Class 6", "uniformCost": 1300, "uniformImage": "link-to-class-6-uniform-image.jpg" },
    { "class": "Class 7", "uniformCost": 1400, "uniformImage": "link-to-class-7-uniform-image.jpg" },
    { "class": "Class 8", "uniformCost": 1500, "uniformImage": "link-to-class-8-uniform-image.jpg" },
    { "class": "Class 9", "uniformCost": 1600, "uniformImage": "link-to-class-9-uniform-image.jpg" },
    { "class": "Class 10", "uniformCost": 1700, "uniformImage": "link-to-class-10-uniform-image.jpg" },
    { "class": "Class 11", "uniformCost": 1800, "uniformImage": "link-to-class-11-uniform-image.jpg" },
    { "class": "Class 12", "uniformCost": 1900, "uniformImage": "link-to-class-12-uniform-image.jpg" }
  ]
};

const UniformDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);  // State to manage selected image
  const [isModalOpen, setIsModalOpen] = useState(false);     // State to manage modal open/close

  // Function to handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {/* Back Button */}
      <button 
        onClick={() => window.history.back()} 
        className='border-2 border-sky-500 m-4 text-[#105183] hover:bg-sky-500 hover:text-white font-bold py-2 px-4 rounded'
      >
        Back
      </button>

      {/* Uniform Details Section */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-semibold text-gray text-center mb-8">Uniform Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniformData.uniformDetails.map((uniformDetail, index) => (
            <div 
              key={index} 
              className="border-2 border-gray hover:scale-105 transition-transform duration-300 normalize-space p-4 rounded-lg shadow-lg text-center"
              onClick={() => handleImageClick(uniformDetail.uniformImage)}
            >
              <h2 className="text-2xl font-semibold text-gray mb-2">{uniformDetail.class}</h2>
              <img 
                src={uniformDetail.uniformImage} 
                alt={`${uniformDetail.class}`} 
                className="w-full h-40 rounded-lg object-cover mb-2" 
              />
              <p className="text-lg font-semibold text-gray">Cost: ₹{uniformDetail.uniformCost}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg relative">
            {/* Close Button */}
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>

            {/* Display Large Image */}
            <img 
              src={selectedImage} 
              alt="Selected Uniform" 
              className="max-w-full max-h-screen rounded-lg" 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UniformDetails;
