import React, { useState, useEffect } from "react";
import axios from "axios";
import dataNotFound from "../../image.svg"; // Placeholder image for missing content

const PrivacyPolicy = () => {
  const [content, setContent] = useState([]); // Use an empty array initially
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Privacy Policy content from the API
  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      setLoading(true);
      setError(""); // Reset any previous errors
      try {
        const response = await axios.get(
          "https://sanskaarvalley-backend.vercel.app/privacy-policies/active" // Replace with your API endpoint
        );
        console.log(response.data); // Log the entire response for debugging

        // Check if activePolicies array has data
        if (
          response.data.activePolicies &&
          response.data.activePolicies.length > 0
        ) {
          setContent(response.data.activePolicies); // Set the entire array
        } else {
          setError("No active policies available.");
        }
      } catch (err) {
        setError("Failed to load Privacy Policy. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []); // Empty dependency array means it will run once when the component mounts

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="welcome-title bg-gradient-to-r font-montserrat from-[#105183] to-[#252472] text-center text-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold  mb-6">Privacy Policy</h1>
        <p className="font-montserrat text-gray-600 text-xl max-w-2xl mx-auto">
          Your privacy is important to us. Below is our Privacy Policy
          explaining how we handle your data.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
          <span className="text-gray text-lg mt-2">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-xl text-red-500">
          <div className="flex flex-col items-center justify-center">
            <img
              src={dataNotFound}
              alt="No data found"
              className="max-w-xs mb-4"
            />
            <p className="text-center font-montserrat">{error}</p>
          </div>
        </div>
      ) : (
        <div className="font-montserrat mx-auto px-6 py-6 space-y-8 border-2 border-gray rounded">
          {/* Displaying Privacy Policy Content */}
          <div className="max-w mx-auto py-2 px-2 rounded">
            {content.length > 0 ? (
              content.map((policy, index) => (
                <div key={index} className="space-y-4 mb-6">
                  <h2 className="text-xl font-bold text-sky-600">
                    {index + 1}. {policy.title}
                  </h2>
                  {/* Tailwind's select-text class to allow text selection */}
                  <p className="text-base text-gray-700 select-text">
                    {policy.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-xl text-gray-500">
                No Privacy Policy available at the moment.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
