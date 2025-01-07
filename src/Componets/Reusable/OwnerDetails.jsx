import React from "react";

const OwnerDetails = () => {
  const ownerDetails = {
    name: "Anudayal Singh",
    position: "School Owner",
    email: "sanskaarvalleysatna@example.com",
    phone: "+91 9074737262",
    address: "Village- Bamhauri, Post- Bathiya, Madhya Pradesh 485111",
    bio: "Anudayal Singh has been running this School for over 08 years. He is passionate about providing quality education and fostering a nurturing environment for students.",
    achievements: [
      "Established the school in 2015 with 200+ students in the first year.",
      "Expanded to include state-of-the-art facilities and labs.",
    ],
    mission:
      "To provide an inclusive and supportive environment where every student can achieve academic excellence and personal growth.",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjUoFgKgRHPIGw07c_ueEHa2yyEgMAjD1KD-Mw517gkH9JycD-Q=w90-h90-p-rp-mo-br100", // Replace with actual image URL
  };

  return (
    <div className="owner-container bg-gray-100 p-6 rounded-lg shadow-lg max-w-full mx-auto mt-10">
      <div className="flex flex-col md:flex-row items-center md:items-start bg-white p-6 rounded-md shadow-md">
        {/* Image Section */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
          <img
            src={ownerDetails.image}
            alt="Owner"
            className="rounded-full shadow-md w-40 h-40 object-cover"
          />
          <h2 className="mt-4 text-xl md:text-2xl font-semibold text-[#105183] text-center md:text-left">
            {ownerDetails.name}
          </h2>{" "}
          <p className="text-gray-500 text-center md:text-left">
            {ownerDetails.position}
          </p>
        </div>

        {/* Details Section */}
        <div className="flex-grow">
          <div className="mt-4 space-y-2">
            <p className="text-sm md:text-base ">
              <strong className="text-[#105183]">Email:</strong>{" "}
              {ownerDetails.email}
            </p>
            <p className="text-sm md:text-base">
              <strong className="text-[#105183]">Phone:</strong>{" "}
              {ownerDetails.phone}
            </p>
            <p className="text-sm md:text-base">
              <strong className="text-[#105183]">Address:</strong>{" "}
              {ownerDetails.address}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg md:text-xl font-bold text-[#105183] text-center md:text-left">
              About
            </h3>
            <p className="text-sm md:text-base text-gray-600 mt-2 text-justify">
              {ownerDetails.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Content */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-[#105183]">Achievements</h3>
        <ul className="flex justify-start gap-2 mt-2 text-sky-600">
          {ownerDetails.achievements.map((achievement, index) => (
            <p key={index}>
              {index + 1}. {achievement}
            </p>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-[#105183]">Mission Statement</h3>
        <p className="text-gray-600 mt-2">{ownerDetails.mission}</p>
      </div>
    </div>
  );
};

export default OwnerDetails;
