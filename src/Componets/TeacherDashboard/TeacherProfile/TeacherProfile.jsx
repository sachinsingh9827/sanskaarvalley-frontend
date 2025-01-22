import React, { useState, useEffect } from "react";

const TeacherProfile = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [studentCount, setStudentCount] = useState(0); // State to hold student count
  const [totalClasses, setTotalClasses] = useState(0); // State to hold total classes taught
  const [totalExams, setTotalExams] = useState(0); // State for total exams taught
  const [upcomingExams, setUpcomingExams] = useState(3); // State for upcoming exams (mock data)
  const [scheduledClasses, setScheduledClasses] = useState(8); // State for scheduled classes

  useEffect(() => {
    // Fetch teacher data from local storage
    try {
      const data = JSON.parse(localStorage.getItem("user"));
      if (data) setTeacherData(data);
    } catch (error) {
      console.error("Failed to parse teacher data:", error);
    }

    // Fetch student count and total classes taught (Mock data for now)
    const fetchStudentData = () => {
      // Assuming we are fetching data from an API (you can replace this with an actual API call)
      setStudentCount(50); // Replace with actual API call for student count
      setTotalClasses(10); // Replace with actual API call for total classes
      setTotalExams(5); // Replace with actual API call for total exams
      setUpcomingExams(3); // Replace with actual API call for upcoming exams
      setScheduledClasses(8); // Replace with actual API call for scheduled classes
    };

    fetchStudentData();
  }, []);

  if (!teacherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="teacher-profile font-montserrat rounded p-4">
      <div className="flex flex-col sm:flex-row justify-between p-2 border-b-2 border-[#105183]">
        <h1 className="text-2xl text-center sm:text-left text-[#105183] mb-2  sm:mb-0">
          Profile
        </h1>
      </div>
      <div className="teacher-profile flex flex-col md:flex-row justify-between border-2 border-[#105183] bg-white p-4 rounded shadow-md max-w-full w-full mx-auto mt-4">
        {/* Profile Image */}
        <div className="flex justify-center mb-4 md:mb-0 md:w-1/4">
          <img
            src={
              teacherData.profilePicture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZX50lN9UDKJALw9W8Lzes53T9GX8aKHIh15WJn4QBXx7ZjmAjsS5Yds&s"
            }
            alt="Teacher Profile"
            className="w-24 h-24 rounded-full border"
          />
        </div>

        {/* Profile Information */}
        <div className="text-center md:text-left md:w-3/4 md:ml-4">
          <h2 className="text-lg font-semibold text-[#105183]">
            {teacherData.name}
          </h2>
          <p className="text-sm text-gray-600 break-words">
            <strong className="text-[#105183]">Email:</strong>{" "}
            {teacherData.email}
          </p>
          <p className="text-sm">
            <strong className="text-[#105183]">Subject:</strong>{" "}
            {teacherData.subject || "Subject not specified"}
          </p>
          <p className="text-sm">
            <strong className="text-[#105183]">Class:</strong>{" "}
            {teacherData.class || "Class not specified"}
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Student Count Card */}
        <div className="bg-blue-100 p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold text-[#105183]">
            Total Students
          </h3>
          <p className="text-3xl font-bold text-[#105183]">{studentCount}</p>
        </div>

        {/* Total Classes Taught Card */}
        <div className="bg-green-100 p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold text-[#105183]">
            Total Classes Taught
          </h3>
          <p className="text-3xl font-bold text-[#105183]">{totalClasses}</p>
        </div>

        {/* Total Exams Taught Card */}
        <div className="bg-yellow-100 p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold text-[#105183]">
            Total Exams Taught
          </h3>
          <p className="text-3xl font-bold text-[#105183]">{totalExams}</p>
        </div>

        {/* Upcoming Exams Card */}
        <div className="bg-orange-100 p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold text-[#105183]">
            Upcoming Exams
          </h3>
          <p className="text-3xl font-bold text-[#105183]">{upcomingExams}</p>
        </div>

        {/* Scheduled Classes Card */}
        <div className="bg-purple-100 p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold text-[#105183]">
            Scheduled Classes
          </h3>
          <p className="text-3xl font-bold text-[#105183]">
            {scheduledClasses}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
