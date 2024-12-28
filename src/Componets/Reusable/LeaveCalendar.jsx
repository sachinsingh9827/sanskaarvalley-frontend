import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import "tailwindcss/tailwind.css"; // Assuming you're using Tailwind CSS for styling

const LeaveCalendar = () => {
  const [leaveData, setLeaveData] = useState([]); // State for leave data
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());

  // Fetch leave data from the API
  const fetchLeaveData = async () => {
    try {
      const response = await axios.get(
        "https://sanskaarvalley-backend.vercel.app/school-calendar"
      ); // Replace with your API URL
      setLeaveData(response.data);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  // Get the first day of the current month and the number of days in the month
  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth, 1).getDay();
  };

  const getDaysInMonth = () => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  };

  // Create an array of days for the current month
  const createCalendar = () => {
    const firstDay = getFirstDayOfMonth();
    const daysInMonth = getDaysInMonth();
    const calendar = [];

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendar.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push(i);
    }

    return calendar;
  };

  // Format a date to "YYYY-MM-DD" for comparison with leave data
  const formatDate = (day) => {
    const month = (currentMonth + 1).toString().padStart(2, "0");
    const dayStr = day.toString().padStart(2, "0");
    return `${currentYear}-${month}-${dayStr}`;
  };

  // Get all leave titles for a specific day and their types
  const getLeaveDetails = (day) => {
    if (day === null) return []; // Return empty array if day is null
    const formattedDate = formatDate(day);
    return leaveData.filter((leave) =>
      leave.dates.some((date) => date.split("T")[0] === formattedDate)
    );
  };

  // Handle date click
  const handleDateClick = (day) => {
    if (day) {
      const selectedDate = new Date(currentYear, currentMonth, day);
      setDate(selectedDate);
    }
  };

  // Handle month navigation
  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setDate(new Date(newYear, newMonth, 1)); // Reset the date to the first day of the new month
  };

  return (
    <>
      <div className="container mx-auto font-montserrat">
        <div
          className="welcome-section text-center mb-8 py-12 px-6"
          style={{
            background: "linear-gradient(to right, #105183, #252472)",
            borderRadius: "15px",
            color: "white",
          }}
        >
          <h3 className="text-3xl font-semibold text-center mb-4">
            School Calendar{" "}
          </h3>
          <p className="welcome-title text-sm mb-6">
            Stay up-to-date with all the important events, holidays, and school
            schedules at Sanskaar Valley School.
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4 bg-white font-montserrat border-2 border-sky-500 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray">
          Leave Calendar for {currentYear}
        </h1>

        <div className="flex items-center m-4">
          <div className="flex items-center mr-4">
            <div className="h-5 w-5 rounded-full bg-red-500 mr-2" />
            <span className="text-red-700">-Holidays</span>
          </div>

          <div className="flex items-center">
            <div className="h-5 w-5 rounded-full bg-green-500 mr-2" />
            <span className="text-green-700">-Events</span>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-lg border-2 border-sky-500 rounded-full p-2 hover:bg-sky-500 hover:text-white"
            onClick={() => handleMonthChange(-1)} // Navigate to previous month
          >
            <BiChevronsLeft />
          </button>
          <span className="text-xl font-semibold text-sky-500">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
            })}
          </span>
          <button
            className="text-lg border-2 border-sky-500 rounded-full p-2 hover:bg-sky-500 hover:text-white"
            onClick={() => handleMonthChange(1)} // Navigate to next month
          >
            <BiChevronsRight />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 border-t-2 border-sky-500">
          {/* Days of the week header */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div className="text-center py-2 font-bold text-gray" key={day}>
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {createCalendar().map((day, index) => {
            const leaveDetails = getLeaveDetails(day);
            const isHoliday = leaveDetails.some(
              (leave) => leave.type === "holiday"
            );
            const isEvent = leaveDetails.some(
              (leave) => leave.type === "event"
            );

            return (
              <div
                key={index}
                className={`text-center py-2 rounded-lg cursor-pointer ${
                  day
                    ? isHoliday
                      ? "bg-red-500 text-white"
                      : isEvent
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                    : ""
                } ${day === date.getDate() ? "border-2 border-sky-500" : ""} ${
                  index % 7 === 0 ? "text-red-500" : "" // Apply red color to Sundays
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day}
                {leaveDetails.length > 0 && (
                  <div className="text-xs">
                    {leaveDetails.map((leave) => leave.title[0]).join(", ")}...
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Display selected date */}
        <div className="mt-4 text-center border-t-2 border-sky-500 pt-4">
          {date ? (
            <p className="text-lg">
              Date: {date.toLocaleDateString("en-GB")},{" "}
              {date.toLocaleDateString("en-GB", { weekday: "long" })}
              {/* Get leave details for the selected date */}
              {(() => {
                const leaveDetails = getLeaveDetails(date.getDate());
                const isHoliday = leaveDetails.some(
                  (leave) => leave.type === "holiday"
                );
                const isEvent = leaveDetails.some(
                  (leave) => leave.type === "event"
                );

                // Check if there are leave details and display them
                if (leaveDetails.length > 0) {
                  return (
                    <span
                      className={`${
                        isHoliday ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      ({leaveDetails.map((leave) => leave.title).join(", ")})
                    </span>
                  );
                }
              })()}
            </p>
          ) : (
            <p className="text-lg">No Date Selected</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaveCalendar;
