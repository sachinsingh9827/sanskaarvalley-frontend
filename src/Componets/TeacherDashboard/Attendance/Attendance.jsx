import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [attendanceData, setAttendanceData] = useState({});
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [classTime, setClassTime] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "https://sanskaarvalley-backend.vercel.app/class/active"
        );
        setClasses(response.data.classes || []);
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Failed to load classes.");
      }
    };

    const fetchStudents = async () => {
      // Simulated student data
      const studentData = [
        {
          id: 1,
          name: "John Doe",
          rollNo: "A001",
          classId: "674fdec02b5e4ad1ef608e45",
        },
        {
          id: 2,
          name: "Jane Smith",
          rollNo: "A002",
          classId: "674fdec02b5e4ad1ef608e45",
        },
        {
          id: 3,
          name: "Alice Brown",
          rollNo: "B001",
          classId: "674fdec02b5e4ad1ef608e46",
        },
        {
          id: 4,
          name: "Bob Johnson",
          rollNo: "C001",
          classId: "674fdec02b5e4ad1ef608e47",
        },
      ];
      setStudents(studentData);

      const initialAttendance = {};
      studentData.forEach((student) => {
        initialAttendance[student.id] = "Absent";
      });
      setAttendance(initialAttendance);
    };

    fetchClasses();
    fetchStudents();

    const today = new Date().toISOString().split("T")[0];
    setDate(today);
    setIsLoading(false); // Set loading to false after fetching
  }, []);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    const today = new Date().toISOString().split("T")[0];

    if (date !== today) {
      toast.error("Attendance can only be submitted for today's date.");
      return;
    }

    if (!selectedClass || !classTime) {
      toast.error("Please select a class and time.");
      return;
    }

    const submissionData = students
      .filter((student) => student.classId === selectedClass)
      .map((student) => ({
        rollNo: student.rollNo,
        studentId: student.id,
        attendance: attendance[student.id],
      }));

    const dataToSubmit = {
      class: selectedClass,
      date,
      classTime,
      students: submissionData,
    };

    try {
      console.log("Submitting Attendance Data:", dataToSubmit);
      setAttendanceData((prevData) => ({
        ...prevData,
        [date]: submissionData,
      }));
      setSubmitted(true);
      toast.success("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("Failed to submit attendance.");
    }
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  const renderTable = () => {
    const selectedAttendance = attendanceData[date];

    if (!selectedAttendance) {
      return (
        <tr>
          <td colSpan="4" className="text-center text-gray-500 px-6 py-3">
            No attendance data for this date.
          </td>
        </tr>
      );
    }

    return selectedAttendance.map((student, index) => (
      <tr key={student.studentId} className="bg-white border-b">
        <td className="px-6 py-3">{index + 1}.</td>
        <td className="px-6 py-3">
          {students.find((s) => s.id === student.studentId).name}
        </td>
        <td className="px-6 py-3">{student.rollNo}</td>
        <td className="px-6 py-3">
          <span className={getAttendanceColor(student.attendance)}>
            {student.attendance}
          </span>
        </td>
      </tr>
    ));
  };

  const getAttendanceColor = (status) => {
    switch (status) {
      case "Present":
        return "text-green-500";
      case "Absent":
        return "text-red-500";
      case "Leave":
        return "text-yellow-500";
      default:
        return "";
    }
  };

  // Filter students by selected class
  const filteredStudents = students.filter(
    (student) => student.classId === selectedClass
  );

  return (
    <div className="container mx-auto p-6 font-montserrat">
      <div className="flex flex-col sm:flex-row justify-between p-2 border-b-2 border-[#105183]">
        <h1 className="text-2xl text-center sm:text-left text-[#105183] mb-2 sm:mb-0">
          Attendance
        </h1>
      </div>
      <div className="border p-4 rounded-lg mt-4">
        <div className="flex md:flex-row justify-between gap-4">
          <div className="w-full md:w-auto">
            <label className="font-medium text-gray-700">
              Select Class:{" "}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border rounded px-2 w-full"
                disabled={submitted}
              >
                <option value="">-- Select Class --</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.className}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full overflow-x-auto mt-4">
          <div className="w-full md:w-auto">
            <label className="font-medium text-gray-700">
              Class Time:{" "}
              <input
                type="time"
                value={classTime}
                onChange={(e) => setClassTime(e.target.value)}
                className="border rounded px-2 w-full"
                disabled={submitted}
              />
            </label>
          </div>
          <div className="w-full md:w-auto">
            <label className="font-medium text-gray-700">
              Date:{" "}
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded px-2 w-full"
                disabled={submitted}
              />
            </label>
          </div>
        </div>
        <div className="mt-4 text-center text-xl font-semibold text-[#105183] border rounded p-2">
          Class:{" "}
          {classes.find((cls) => cls._id === selectedClass)?.className ||
            "No class selected"}
        </div>
      </div>

      {submitted ? (
        <div className="overflow-x-auto rounded-lg border mt-4">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-[#105183]">
              <tr>
                <th className="px-6 py-3">SN</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Roll No</th>
                <th className="px-6 py-3">Attendance</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
          <div className="mt-4 text-center">
            <p className="text-lg">Total Students: {filteredStudents.length}</p>
            <div className="flex justify-between m-2 gap-4">
              <p className="text-green-500">
                Present:{" "}
                {
                  filteredStudents.filter((s) => attendance[s.id] === "Present")
                    .length
                }
              </p>
              <p className="text-red-500">
                Absent:{" "}
                {
                  filteredStudents.filter((s) => attendance[s.id] === "Absent")
                    .length
                }
              </p>
              <p className="text-yellow-500">
                Leave:{" "}
                {
                  filteredStudents.filter((s) => attendance[s.id] === "Leave")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border mt-4">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-[#105183]">
              <tr>
                <th className="px-6 py-3">SN</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Roll No</th>
                <th className="px-6 py-3">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student.id} className="bg-white border-b">
                    <td className="px-6 py-3">{index + 1}.</td>
                    <td className="px-6 py-3">{student.name}</td>
                    <td className="px-6 py-3">{student.rollNo}</td>
                    <td className="px-6 py-3">
                      <select
                        value={attendance[student.id]}
                        onChange={(e) =>
                          handleAttendanceChange(student.id, e.target.value)
                        }
                        className="border rounded px-2"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Leave">Leave</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-3">
                    No students available for this class.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4">
        {!submitted && (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit Attendance
          </button>
        )}
        {submitted && (
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white py-2 px-4 rounded ml-2"
          >
            Edit Attendance
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AttendancePage;
