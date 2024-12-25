import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClasses } from "../../store/teacherSlice";
import StudentAttendance from "../StudentAttendance/StudentAttendance"; // Import the StudentAttendance component

const ManageClasses = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.teacher.classes);
  const [newClass, setNewClass] = useState("");
  const [showAttendance, setShowAttendance] = useState(false); // State to toggle attendance view

  const addClass = () => {
    const updatedClasses = [
      ...classes,
      { id: classes.length + 1, name: newClass },
    ];
    dispatch(setClasses(updatedClasses));
    setNewClass("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
    
     

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Mark Attendance</h2>
        <button
          onClick={() => setShowAttendance(!showAttendance)}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded mb-2"
        >
          {showAttendance ? "Hide Attendance" : "Show Attendance"}
        </button>
        {showAttendance && <StudentAttendance />}
      </div>
    </div>
  );
};

export default ManageClasses;
