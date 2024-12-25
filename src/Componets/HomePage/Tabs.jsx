// Tabs.jsx
import React, { useState } from "react";
import LeaveCalendar from "../Reusable/LeaveCalendar"; // Import LeaveCalendar

const Tabs = () => {
  // State to handle active tab
  const [activeTab, setActiveTab] = useState("leave"); // 'leave' for the leave tab

  // Handle the change in tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-montserrat">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-6 mb-8">
        <button
          className={`py-2 px-4 rounded-lg font-semibold text-lg ${
            activeTab === "leave"
              ? "bg-sky-500 text-white"
              : "bg-gray-100 text-gray-800"
          } hover:bg-sky-500 hover:text-black transition duration-300`}
          onClick={() => handleTabClick("leave")}
        >
          Leave Calendar
        </button>
        <button
          className={`py-2 px-4 rounded-lg font-semibold text-lg ${
            activeTab === "other"
              ? "bg-sky-500 text-white"
              : "bg-gray-200 text-gray"
          } hover:bg-sky-500 hover:text-black transition duration-300`}
          onClick={() => handleTabClick("other")}
        >
          Other Tab
        </button>
      </div>
      {/* Tab Content */}
      <div>
        {activeTab === "leave" && (
          <div>
            <LeaveCalendar /> {/* Call the LeaveCalendar component */}
          </div>
        )}

        {activeTab === "other" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Other Tab Content</h1>
            <p>This is a placeholder for the content of the other tab.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
