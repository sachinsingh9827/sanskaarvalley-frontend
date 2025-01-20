import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { AiOutlineCalendar } from "react-icons/ai"; // Calendar Icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Date picker styles

const TeacherDashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for the selected date
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State to toggle calendar visibility

  // Update the date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="flex font-sans h-screen">
      <TeacherSidebar />
      <div className="flex-1 p-2 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center text-md font-semibold bg-white p-2 rounded shadow">
          <span className="text-[#105183]">
            {formatDate(currentDateTime)}
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="ml-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <AiOutlineCalendar className=" hover:text-black  " />
            </button>
          </span>

          <span className="text-[#105183]">{formatTime(currentDateTime)}</span>
        </div>
        <h1 className="flex justify-center text-md font-montserrat bg-[#105183] text-white p-2 rounded">
          Welcome to the Teacher Dashboard
        </h1>
        {/* Calendar Popup */}
        {isCalendarOpen && (
          <div className="absolute z-50 bg-white p-4 shadow-lg rounded mt-2">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
            />
          </div>
        )}
        <Outlet /> {/* This will render nested routes */}
      </div>
    </div>
  );
};

export default TeacherDashboard;
