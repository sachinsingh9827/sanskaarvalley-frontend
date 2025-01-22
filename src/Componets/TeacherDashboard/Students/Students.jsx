import React, { useState, useEffect } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Simulating data fetching
    const fetchStudents = async () => {
      const studentData = [
        { id: 1, name: "John Doe", class: "10th", rollNo: "A001" },
        { id: 2, name: "Jane Smith", class: "10th", rollNo: "A002" },
        { id: 3, name: "Alice Brown", class: "9th", rollNo: "B001" },
        { id: 4, name: "Bob Johnson", class: "8th", rollNo: "C001" },
      ];
      setStudents(studentData);
    };

    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto p-6 font-montserrat">
      <div className="flex flex-col sm:flex-row justify-between p-2 border-b-2 border-[#105183]">
        <h1 className="text-2xl text-center sm:text-left text-[#105183] mb-2  sm:mb-0">
          Student List
        </h1>
      </div>
      <div className="overflow-x-auto rounded-lg border mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-[#105183]">
            <tr>
              <th className="px-6 py-3 font-montserrat">SN</th>
              <th className="px-6 py-3 font-montserrat">Name</th>
              <th className="px-6 py-3 font-montserrat">Class</th>
              <th className="px-6 py-3 font-montserrat">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id} className="bg-white border-b">
                  <td className="px-6 py-3">{index + 1}.</td>
                  <td className="px-6 py-3">{student.name}</td>
                  <td className="px-6 py-3">{student.class}</td>
                  <td className="px-6 py-3">{student.rollNo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 px-6 py-3">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
