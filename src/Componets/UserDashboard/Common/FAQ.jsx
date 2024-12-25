import React, { useState, useEffect } from "react";
import axios from "axios";
import dataNotFound from "../../image.svg";
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch FAQs from the API
  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true);
      setError(""); // Reset any previous errors
      try {
        const response = await axios.get("http://localhost:5000/faq/active"); // Replace with your API endpoint
        setFaqs(response.data.faqs); // Assuming the response contains an array of FAQs
      } catch (err) {
        setError("Failed to load FAQs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []); // Empty dependency array means it will run once when the component mounts

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="welcome-title bg-gradient-to-r font-montserrat from-[#105183] to-[#252472] text-center text-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Frequently Asked Questions
        </h1>
        <p className="font-montserrat text-gray-600 text-xl max-w-2xl mx-auto">
          Find answers to common questions about Sanskaar Valley School. If you
          don't find the answer you're looking for, feel free to contact us.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading FAQs...</div>
      ) : error ? (
        <div className="text-center text-xl text-red-500">
          <div className="flex flex-col items-center justify-center">
            <img
              src={dataNotFound}
              alt="No notifications found"
              className="max-w-xs mb-4"
            />
            <p className="text-center font-montserrat">No Data Found</p>
          </div>
        </div>
      ) : (
        <div className="font-montserrat mx-auto px-6 py-6 space-y-8">
          {/* FAQ List */}
          <div className="max-w mx-auto">
            {faqs.length === 0 ? (
              <div className="text-center text-xl text-gray-500">
                No FAQs available at the moment.
              </div>
            ) : (
              faqs.map((faq, index) => (
                <div
                  key={faq._id} // Use a unique identifier from your API response
                  className="mb-6 bg-white rounded-lg shadow-md p-6 transition-shadow duration-300 hover:shadow-xl cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-sky-600">
                      {faq.question}
                    </h3>
                    <span className="text-primary text-2xl">
                      {activeIndex === index ? "-" : "+"}
                    </span>
                  </div>
                  {activeIndex === index && (
                    <p className="mt-4 text-gray text-base">{faq.answer}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;