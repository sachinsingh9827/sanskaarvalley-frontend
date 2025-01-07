// Tabs.jsx
import React, { useState } from "react";
import LeaveCalendar from "../Reusable/LeaveCalendar"; // Import LeaveCalendar
import OwnerDetails from "../Reusable/OwnerDetails";

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
            activeTab === "owner-details"
              ? "bg-sky-500 text-white"
              : "bg-gray-200 text-gray"
          } hover:bg-sky-500 hover:text-black transition duration-300`}
          onClick={() => handleTabClick("owner-details")}
        >
          Owner Details
        </button>
      </div>
      {/* Tab Content */}
      <div>
        {activeTab === "leave" && (
          <div>
            <LeaveCalendar /> {/* Call the LeaveCalendar component */}
          </div>
        )}

        {activeTab === "owner-details" && <OwnerDetails />}
      </div>
    </div>
  );
};

export default Tabs;
