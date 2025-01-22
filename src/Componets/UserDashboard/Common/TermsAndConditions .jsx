import React, { useState, useEffect } from "react";
import axios from "axios";
import dataNotFound from "../../image.svg"; // Placeholder image for missing content

const TermsAndConditions = () => {
  const [terms, setTerms] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state
  const [language, setLanguage] = useState("en"); // Default language is English

  // Translation function
  const translateText = async (text, targetLang) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Translation API failed");
      }
      const data = await res.json();
      return data[0][0][0];
    } catch (error) {
      console.error("Error during translation:", error);
      return text; // Return original text if there was an error
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
  };

  // Fetch Terms and Conditions content from the API
  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      setLoading(true);
      setError(""); // Reset any previous errors
      try {
        const response = await axios.get(
          "https://sanskaarvalley-backend.vercel.app/terms-and-conditions/active" // Replace with your API endpoint
        );
        console.log(response.data); // Log the entire response for debugging

        // Check if activeTerms array has data
        if (response.data.activeTerms && response.data.activeTerms.length > 0) {
          const termsData = response.data.activeTerms;

          // Translate content if the language is not English
          if (language !== "en") {
            const translatedTerms = await Promise.all(
              termsData.map(async (term) => {
                const translatedTitle = await translateText(
                  term.title,
                  language
                );
                const translatedContent = await translateText(
                  term.content,
                  language
                );
                return {
                  ...term,
                  title: translatedTitle,
                  content: translatedContent,
                };
              })
            );
            setTerms(translatedTerms);
          } else {
            setTerms(termsData); // Set original content for English
          }
        } else {
          setError("No active terms and conditions available.");
        }
      } catch (err) {
        setError(
          "Failed to load Terms and Conditions. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTermsAndConditions();
  }, [language]); // Adding language to dependency array to refetch when language changes

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="welcome-title bg-gradient-to-r font-montserrat from-[#105183] to-[#252472] text-center text-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
        <p className="font-montserrat text-gray-600 text-xl max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using our
          services.
        </p>
      </div>

      {/* Language Selector */}
      <div className="flex justify-end mb-4">
        <select
          className="text-lg border border-[#105183] rounded-full p-2 hover:bg-[#105183] hover:text-white"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
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
          {/* Displaying Terms and Conditions Content */}
          <div className="max-w mx-auto py-2 px-2 rounded">
            {terms.length > 0 ? (
              terms.map((term, index) => (
                <div key={index} className="space-y-4 mb-6">
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
