import React, { useState, useEffect } from "react";

const TeacherProfile = () => {
  // State to hold teacher data
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    // Get teacher data from localStorage
    const data = JSON.parse(localStorage.getItem("user"));

    // If data exists, set it in the state
    if (data) {
      setTeacherData(data);
    }
  }, []);

  // If teacher data is not available, return a loading state
  if (!teacherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="teacher-profile-container font-montserrat bg-white p-4 rounded shadow-md max-w-full mt-4 mx-auto">
      <div className="flex justify-center mb-4">
        {/* Use a placeholder image for the teacher profile */}
        <img
          src="https://via.placeholder.com/150" // Replace with the actual teacher image if available
          alt="Teacher"
          className="rounded-full h-32 w-32 object-cover border-4 border-[#105183]"
        />
      </div>
      <h1 className="text-center text-2xl font-bold mb-2">
        {teacherData.name}
      </h1>
      {/* <p className="text-center text-lg text-gray-700">{teacherData.role}</p> */}
      <div className="mt-4">
        <div className="flex items-center mb-2">
          <strong className="w-24">Email:</strong>
          <span className="text-gray-700">{teacherData.email}</span>
          <strong className="w-24">Phone:</strong>
          <span className="text-gray-700">{teacherData.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
