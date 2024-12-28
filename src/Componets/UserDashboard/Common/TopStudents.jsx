import React, { useEffect, useState } from "react";

// Sample student images (replace these with actual URLs)
const studentImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Qv5s5REahX2Vcj11jPnU1ibiEUfTc-VMAQ&s", // John Doe image
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3R1ZGVudCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", // Jane Smith image
  "https://plus.unsplash.com/premium_photo-1670252109642-d76c2be775dc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Emily Johnson image
];

const TopStudents = () => {
  // Sample data for top students
  const topStudentsData = [
    {
      name: "John Doe",
      class: "Class 10",
      marks: "95%",
      icon: "🏆", // 1st rank icon (gold trophy)
      image: studentImages[0],
      achievements: "Scored highest in Math and Science.",
    },
    {
      name: "Jane Smith",
      class: "Class 12",
      marks: "93%",
      icon: "🥈", // 2nd rank icon (silver medal)
      image: studentImages[1],
      achievements: "Excelled in History and Geography.",
    },
    {
      name: "Emily Johnson",
      class: "Class 11",
      marks: "92%",
      icon: "🥉", // 3rd rank icon (bronze medal)
      image: studentImages[2],
      achievements: "Top performer in sports and academics.",
    },
  ];

  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStudentIndex((prevIndex) =>
        prevIndex === topStudentsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change student every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [topStudentsData.length]);

  return (
    <section className="px-4 sm:px-6 py-12 font-montserrat ">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="font-bold text-3xl sm:text-4xl text-gray-800 mb-6 text-[#105183]">
          Top Students of Last Year
        </h1>
        <p className="text-lg text-gray-600">
          Meet our shining stars who have excelled in both academics and
          extracurricular activities.
        </p>
      </div>

      {/* Cards container */}
      <div className="flex justify-center">
        <div className="w-full max-w-md sm:hidden">
          {/* Mobile view: Show one student at a time */}
          <div className="bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="w-full h-56 bg-gray-100 relative overflow-hidden">
              <img
                src={topStudentsData[currentStudentIndex].image}
                alt={topStudentsData[currentStudentIndex].name}
                className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
              />
            </div>
            <div className="p-6 text-center space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {topStudentsData[currentStudentIndex].name}
              </h2>
              <p className="text-lg text-gray-500">
                <span className="text-2xl text-yellow-500">
                  {topStudentsData[currentStudentIndex].icon}
                </span>{" "}
                {topStudentsData[currentStudentIndex].class} -{" "}
                {topStudentsData[currentStudentIndex].marks}
              </p>
              <p className="text-sm text-gray-600 mt-4 italic">
                {topStudentsData[currentStudentIndex].achievements}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {/* Desktop view: Show multiple students */}
          {topStudentsData.map((student, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="w-full h-56 bg-gray-100 relative overflow-hidden">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <div className="p-6 text-center space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {student.name}
                </h2>
                <p className="text-lg text-gray-500">
                  <span className="text-2xl text-yellow-500">
                    {student.icon}
                  </span>
                  {student.class} - {student.marks}
                </p>
                <p className="welcome-title text-sm text-gray-600 mt-4 italic">
                  {student.achievements}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <p className="text-lg text-gray-600 border-b-2 border-sky-300 pt-4">
          We are proud of the accomplishments of all our students. Keep up the
          great work!
        </p>
      </div>
    </section>
  );
};

export default TopStudents;
