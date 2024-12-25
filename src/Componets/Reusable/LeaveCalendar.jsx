import React, { useState } from "react";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import "tailwindcss/tailwind.css"; // Assuming you're using Tailwind CSS for styling

const LeaveCalendar = () => {
  // Manually defined leave dates (you can replace this with your dynamic data later)
  const leaveData = [
    { title: "New Year's Day", date: "2024-01-01" },
    { title: "Republic Day", date: "2024-01-26" },
    { title: "Nawroz", date: "2024-03-21" },
    { title: "Holi", date: "2024-03-25" },
    { title: "Id-ul-fitr", date: "2024-04-11" },
    { title: "Mahavir Jayanti", date: "2024-04-21" },
    { title: "Buddha Purnima", date: "2024-05-23" },
    { title: "Id-ul-Zuha (Bakrid)", date: "2024-06-17" },
    { title: "Muharram", date: "2024-07-17" },
    { title: "Independence Day", date: "2024-08-15" },
    { title: "Janmashtami", date: "2024-08-26" },
    { title: "Milad-un-Nabi (Prophet’s Birthday)", date: "2024-09-16" },
    { title: "Mahatma Gandhi’s Birthday", date: "2024-10-02" },
    { title: "Iraqi Independence Day", date: "2024-10-03" },
    { title: "Dussehra", date: "2024-10-12" },
    { title: "Diwali", date: "2024-10-31" },
    { title: "Christmas Day", date: "2024-12-25" },
  ];

  // State for selected date and current month/year
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());

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

  // Check if the day is a leave date
  const isLeaveDate = (day) => {
    const formattedDate = formatDate(day);
    return leaveData.some((leave) => leave.date === formattedDate);
  };

  // Handle date click
  const handleDateClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    setDate(selectedDate);
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
            School Calendar
          </h3>
          <p className="welcome-title text-sm  mb-6">
            Stay up-to-date with all the important events, holidays, and school
            schedules at Sanskaar Valley School.
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4 bg-white font-montserrat border-2 border-sky-500 rounded-lg bg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray">
          Leave Calendar for {currentYear}
        </h1>

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
            <div className="text-center py-2 font-bold text-gray bor" key={day}>
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {createCalendar().map((day, index) => (
            <div
              key={index}
              className={`text-center py-2 rounded-lg cursor-pointer ${
                day
                  ? isLeaveDate(day)
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                  : ""
              } ${day === date.getDate() ? "border-2 border-sky-500" : ""} ${
                index % 7 === 0 ? "text-red-500" : "" // Apply red color to Sundays
              }`}
              onClick={() => day && handleDateClick(day)}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Display selected date */}
        <div className="mt-4 text-center border-t-2 border-sky-500 pt-4">
          {date ? (
            <p className="text-lg">
              Date: {date.toLocaleDateString("en-GB")},{" "}
              {date.toLocaleDateString("en-GB", { weekday: "long" })}
              {/* Check if the selected date is a leave date */}
              {leaveData.some(
                (leave) => leave.date === formatDate(date.getDate())
              ) && (
                <span className="ml-2 text-red-500 font-semibold">
                  (
                  {
                    leaveData.find(
                      (leave) => leave.date === formatDate(date.getDate())
                    ).title
                  }
                  )
                </span>
              )}
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
