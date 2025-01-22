import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

const TeacherCalendar = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get(
        "https://sanskaarvalley-backend.vercel.app/school-calendar"
      );
      setLeaveData(response.data);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth, 1).getDay();
  };

  const getDaysInMonth = () => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  };

  const createCalendar = () => {
    const firstDay = getFirstDayOfMonth();
    const daysInMonth = getDaysInMonth();
    const calendar = [];

    for (let i = 0; i < firstDay; i++) {
      calendar.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push(i);
    }

    return calendar;
  };

  const formatDate = (day) => {
    const month = (currentMonth + 1).toString().padStart(2, "0");
    const dayStr = day.toString().padStart(2, "0");
    return `${currentYear}-${month}-${dayStr}`;
  };

  const getLeaveDetails = (day) => {
    if (day === null) return [];
    const formattedDate = formatDate(day);
    return leaveData.filter((leave) =>
      leave.dates.some((date) => date.split("T")[0] === formattedDate)
    );
  };

  const handleDateClick = (day) => {
    if (day) {
      const selectedDate = new Date(currentYear, currentMonth, day);
      setDate(selectedDate);
    }
  };

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
    setDate(new Date(newYear, newMonth, 1));
  };

  return (
    <div className="container mx-auto mt-4 font-montserrat">
      <div className="flex flex-col sm:flex-row justify-between p-2 border-b-2 border-[#105183]">
        <h1 className="text-2xl text-center sm:text-left text-[#105183] mb-2  sm:mb-0">
          Calendar
        </h1>
      </div>
      {/* Calendar Container */}
      <div className="bg-white rounded-lg shadow-md p-2 sm:p-2 mt-4">
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <button
            className="text-lg border border-indigo-500 rounded-full p-2 hover:bg-indigo-500 hover:text-white"
            onClick={() => handleMonthChange(-1)}
          >
            <BiChevronsLeft />
          </button>
          <span className="text-lg sm:text-xl font-bold text-[#105183]">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
            })}{" "}
            {currentYear}
          </span>
          <button
            className="text-lg border border-indigo-500 rounded-full p-2 hover:bg-indigo-500 hover:text-white"
            onClick={() => handleMonthChange(1)}
          >
            <BiChevronsRight />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 text-xs sm:text-sm">
          {["S", "M", "Tu", "W", "Th", "F", "Sa"].map((day) => (
            <div className="text-center font-medium text-gray-500" key={day}>
              {day}
            </div>
          ))}
          {createCalendar().map((day, index) => {
            const leaveDetails = getLeaveDetails(day);
            const isHoliday = leaveDetails.some(
              (leave) => leave.type === "holiday"
            );
            const isEvent = leaveDetails.some(
              (leave) => leave.type === "event"
            );

            const isSelectedDate =
              day === date.getDate() &&
              currentMonth === date.getMonth() &&
              currentYear === date.getFullYear();

            return (
              <div
                key={index}
                className={`p-2 sm:p-4 rounded-lg cursor-pointer text-center text-xs sm:text-sm ${
                  day
                    ? isSelectedDate
                      ? " text-indigo-600 font-bold"
                      : isHoliday
                      ? "bg-red-100 text-red-600"
                      : isEvent
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-50"
                    : ""
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day}
                {leaveDetails.length > 0 && (
                  <div className="text-xs mt-1">
                    {leaveDetails.map((leave) => leave.title[0]).join(", ")}...
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Details */}
      <div className="mt-4 text-center">
        {date ? (
          <p className="text-sm sm:text-lg">
            Selected Date:{" "}
            <span className="font-bold text-[#105183]">
              {date.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {getLeaveDetails(date.getDate()).length > 0 && (
              <span>
                {" "}
                (
                {getLeaveDetails(date.getDate()).map((leave, index) => (
                  <span
                    key={index}
                    className={`${
                      leave.type === "holiday"
                        ? "text-red-600"
                        : leave.type === "event"
                        ? "text-green-600"
                        : ""
                    }`}
                  >
                    {leave.title}
                    {index < getLeaveDetails(date.getDate()).length - 1 && ", "}
                  </span>
                ))}
                )
              </span>
            )}
          </p>
        ) : (
          <p className="text-sm sm:text-lg text-gray-500">No date selected</p>
        )}
      </div>
    </div>
  );
};

export default TeacherCalendar;
