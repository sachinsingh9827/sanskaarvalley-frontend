import React, { useEffect, useState } from "react";
import axios from "axios";
import dataNotFound from "./Image/No data-rafiki.svg";
import Pagination from "../../Reusable/Pagination";

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of students per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get(
          "http://localhost:5000/students/all-students"
        );
        setStudents(studentsResponse.data.students || []);
        setFilteredStudents(studentsResponse.data.students || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const filtered = students.filter(
        (student) => student.class === selectedClass
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
    setCurrentPage(1); // Reset to the first page when filtering
  }, [selectedClass, students]);

  // Calculate pagination details
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentData = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="font-montserrat">
        <div className="flex p-2 justify-between items-center border-b-2 border-gray-300">
          <h4 className="text-2xl font-bold text-sky-600">View Students</h4>
          <h4 className="text-2xl font-bold text-sky-600">
            Total Students:{" "}
            <span className="text-black">{filteredStudents.length}</span>
          </h4>
          <div>
            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border border-sky-300 rounded-md p-2 w-full max-w-md"
            >
              <option value="">-- Select a class --</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          {filteredStudents.length > 0 ? (
            <div className="flex flex-col">
              <div className="overflow-x-auto rounded-lg border mt-4">
                <table className="w-full text-sm font-montserrat text-left text-gray-500">
                  <thead className="text-xs text-white uppercase bg-sky-500">
                    <tr>
                      <th className="px-6 py-3">SN.</th>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Class</th>
                      <th className="px-6 py-3">Image</th>{" "}
                      {/* New Image Column */}
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((student, index) => (
                      <tr key={student.studentId} className="bg-white border-b">
                        <td className="px-6 py-3">
                          {(currentPage - 1) * itemsPerPage + index + 1}.
                        </td>
                        <td className="px-6 py-3">{student.studentId}</td>
                        <td className="px-6 py-3">{student.name}</td>
                        <td className="px-6 py-3">{student.class}</td>
                        {console.log(student.image)}

                        <td className="px-6 py-3">
                          <img
                            src={`http://localhost:5000/students/image/${student.studentId}`} // Update the URL if needed
                            alt="Student Image"
                            width="100"
                            height="100"
                            onError={(e) => (e.target.src = dataNotFound)} // Fallback image in case of error
                          />
                        </td>

                        <td className="px-6 py-3">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="mr-2 font-bold text-green-500"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img
                src={dataNotFound}
                alt="No notifications found"
                className="max-w-xs mb-4"
              />
              <p className="text-center font-montserrat">No Students Found!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Student Details */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-sky-100 p-4 border border-sky-300 rounded-lg w-1/2 ">
            <h2 className="flex justify-center text-xl font-bold text-sky-600 mb-4 uppercase">
              {selectedStudent.name}
            </h2>
            <p>
              <strong>ID:</strong> {selectedStudent.studentId}
            </p>
            <p>
              <strong>Name:</strong> {selectedStudent.name}
            </p>
            <p>
              <strong>Class:</strong> {selectedStudent.class}
            </p>
            <p>
              <strong>Email:</strong> {selectedStudent.email}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(selectedStudent.dob).toLocaleDateString()}
            </p>
            <p>
              <strong>Father's Name:</strong>{" "}
              {selectedStudent.parentContact?.fatherName}
            </p>
            <p>
              <strong>Mother's Name:</strong>{" "}
              {selectedStudent.parentContact?.motherName}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {`${selectedStudent.address?.street}, ${selectedStudent.address?.city}, ${selectedStudent.address?.state}, ${selectedStudent.address?.zipCode}`}
            </p>
            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full border-2 border-gray hover:bg-gray hover:text-white px-3 py-1 rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewStudent;
