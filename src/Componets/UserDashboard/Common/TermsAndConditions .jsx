import React, { useState, useEffect } from "react";
import axios from "axios";
import dataNotFound from "../../image.svg"; // Placeholder image for missing content

const TermsAndConditions = () => {
  const [terms, setTerms] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state

  // Fetch Terms and Conditions content from the API
  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      setLoading(true);
      setError(""); // Reset any previous errors
      try {
        const response = await axios.get(
          "http://localhost:5000/terms-and-conditions/active" // Replace with your API endpoint
        );

        // Debugging response data
        console.log(response.data);

        // Check if the activeTerms array exists and has data
        if (response.data.activeTerms?.length > 0) {
          setTerms(response.data.activeTerms); // Set the terms content
        } else {
          setError("No active terms and conditions available.");
        }
      } catch (err) {
        setError(
          "Failed to load Terms and Conditions. Please try again later."
        );
      } finally {
        setLoading(false); // Always stop loading after the fetch
      }
    };

    fetchTermsAndConditions();
  }, []); // Run only once when the component mounts

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Header Section */}
      <div className="welcome-title bg-gradient-to-r font-montserrat from-[#105183] to-[#252472] text-center text-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold  mb-6">Terms and Conditions</h1>
        <p className="font-montserrat text-gray-600 text-xl max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using our
          services.
        </p>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="text-center text-xl text-gray-500">
          Loading Terms and Conditions...
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
        <div className="font-montserrat mx-auto px-6 py-6 space-y-8">
          {/* Displaying Terms and Conditions Content */}
          <div className="max-w mx-auto py-2 px-2 rounded">
            {terms.length > 0 ? (
              terms.map((term, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-xl font-bold text-sky-600">
                    {index + 1}. {term.title}
                  </h2>
                  <p className="text-base text-gray-700 select-text">
                    {term.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-xl text-gray-500">
                No Terms and Conditions available at the moment.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsAndConditions;
