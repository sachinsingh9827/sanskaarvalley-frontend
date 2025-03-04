import React, { useState, useEffect } from "react";
import axios from "axios";

const SubmitResults = () => {
  const [classes, setClasses] = useState([]); // List of classes
  const [students, setStudents] = useState([]); // Students in the selected class
  const [subjects, setSubjects] = useState([]); // Subjects for the selected class
  const [selectedClass, setSelectedClass] = useState(""); // Currently selected class
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Control modal visibility
  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    marks: "",
  });

  // Static student data for the class with ID '674fe0032b5e4ad1ef608e59'
  const staticStudents = [
    { _id: "1", name: "John Doe" },
    { _id: "2", name: "Jane Smith" },
    { _id: "3", name: "Emily Johnson" },
    { _id: "4", name: "Michael Brown" },
    // Add more students as needed
  ];

  // Fetch available classes from the backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "https://sanskaarvalley-backend.vercel.app/class/active"
        ); // Replace with your API endpoint
        setClasses(response.data.classes || []);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch subjects when a class is selected
  const handleClassChange = async (classId) => {
    setSelectedClass(classId);
    setLoadingStudents(true);
    setLoadingSubjects(true);

    // Check if the selected class is the one with the static student data
    if (classId === "674fe0032b5e4ad1ef608e59") {
      setStudents(staticStudents);
    } else {
      setStudents([]);
    }

    try {
      // Fetch subjects for the selected class
      const subjectResponse = await axios.get(
        "https://sanskaarvalley-backend.vercel.app/subjects/all-subjects"
      ); // Replace with your API
      setSubjects(subjectResponse.data.subjects || []);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    } finally {
      setLoadingStudents(false);
      setLoadingSubjects(false);
    }
  };

  // Handle input changes in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit result via API
  const handleSubmitResult = async () => {
    if (!formData.studentId || !formData.subjectId || !formData.marks) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("https://yourapi.com/api/results", {
        ...formData,
        classId: selectedClass,
      });
      console.log("Result submitted:", response.data);
      setModalOpen(false);
      setFormData({ studentId: "", subjectId: "", marks: "" });
    } catch (error) {
      console.error("Failed to submit result:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 font-montserrat">
      <h1 className="text-2xl font-bold mb-6">Submit Results</h1>

      {/* Class Selector */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Select Class</label>
        <select
          className="border border-gray-300 p-2 rounded"
          onChange={(e) => handleClassChange(e.target.value)}
          value={selectedClass}
        >
          <option value="">-- Select Class --</option>
          {classes.map((classItem) => (
            <option key={classItem._id} value={classItem._id}>
              {classItem.className}
            </option>
          ))}
        </select>
      </div>

      {/* Students Table */}
      {loadingStudents ? (
        <p>Loading students...</p>
      ) : students.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Student Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {student.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setFormData({ ...formData, studentId: student._id });
                      setModalOpen(true);
                    }}
                  >
                    Submit Result
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found for the selected class.</p>
      )}

      {/* Modal for Submit Result */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Submit Result</h2>
            <form>
              {/* Subject Selector */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Select Subject
                </label>
                <select
                  name="subjectId"
                  className="border border-gray-300 p-2 rounded w-full"
                  onChange={handleInputChange}
                  value={formData.subjectId}
                >
                  <option value="">-- Select Subject --</option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Marks */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Marks
                </label>
                <input
                  type="number"
                  name="marks"
                  className="border border-gray-300 p-2 rounded w-full"
                  onChange={handleInputChange}
                  value={formData.marks}
                />
              </div>
              {/* Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleSubmitResult}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitResults;
