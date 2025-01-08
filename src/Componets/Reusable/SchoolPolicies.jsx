import React, { useState } from "react";
import BusFeesDetails from "../UserDashboard/Common/BusFeesDetails";
import UniformDetails from "../UserDashboard/Common/UniformDetails ";

const SchoolPolicies = () => {
  const [activeTab, setActiveTab] = useState("moreInfo");

  const tabContent = {
    busFees: (
      <div>
        <BusFeesDetails />
      </div>
    ),
    dressCode: (
      <div>
        <UniformDetails />
      </div>
    ),
    moreInfo: (
      <div>
        <h2 className="text-xl font-bold">More Information</h2>
        <p>
          For additional details about school policies, events, and guidelines,
          please contact the administration office or visit our website.
        </p>
      </div>
    ),
  };

  return (
    <div className="p-6 max-w-full font-montserrat mx-auto mt-10 bg-white rounded-lg shadow-md">
      {/* Tabs */}
      <div className="flex justify-around mb-6 pb-2">
        <button
          onClick={() => setActiveTab("busFees")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "busFees"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-[#105183]"
          }`}
        >
          Bus Fees
        </button>
        <button
          onClick={() => setActiveTab("dressCode")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "dressCode"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-[#105183]"
          }`}
        >
          Dress Code
        </button>
        <button
          onClick={() => setActiveTab("moreInfo")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "moreInfo"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-[#105183]"
          }`}
        >
          More Info
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">{tabContent[activeTab]}</div>
    </div>
  );
};

export default SchoolPolicies;
