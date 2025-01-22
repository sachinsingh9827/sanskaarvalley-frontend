import React, { useState, useEffect } from "react";
import axios from "axios";
import dataNotFound from "../../image.svg";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading as true
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en"); // Default language is English

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

  const translateFAQContent = async (faqList, targetLang) => {
    const translatedFaqs = [];
    for (const faq of faqList) {
      const translatedQuestion = await translateText(faq.question, targetLang);
      const translatedAnswer = await translateText(faq.answer, targetLang);
      translatedFaqs.push({
        ...faq,
        question: translatedQuestion,
        answer: translatedAnswer,
      });
    }
    return translatedFaqs; // Return translated FAQs to update state later
  };

  // Fetch FAQs from the API
  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true);
      setError(""); // Reset any previous errors
      try {
        const response = await axios.get(
          "https://sanskaarvalley-backend.vercel.app/faq/active"
        ); // Replace with your API endpoint
        const fetchedFaqs = response.data.faqs;

        // Translate FAQ content if the language is not English
        if (language !== "en") {
          const translatedFaqs = await translateFAQContent(
            fetchedFaqs,
            language
          );
          setFaqs(translatedFaqs); // Set the translated FAQs
        } else {
          setFaqs(fetchedFaqs); // Set original content for English
        }
      } catch (err) {
        setError("Failed to load FAQs. Please try again later.");
      } finally {
        setLoading(false); // Stop loading once the data is fetched or error occurs
      }
    };

    fetchFAQs();
  }, [language]); // Adding `language` to the dependency array ensures the content is re-fetched and re-translated

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
              alt="No notifications found"
              className="max-w-xs mb-4"
            />
            <p className="text-center font-montserrat">No Data Found</p>
          </div>
        </div>
      ) : (
        <div className="font-montserrat mx-auto px-6 py-6 space-y-8 border-2 border-gray rounded-lg">
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
