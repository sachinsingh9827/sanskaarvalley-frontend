import React, { useState } from "react";
import { FaLanguage, FaMoon, FaSun } from "react-icons/fa";

const SettingsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [theme, setTheme] = useState("light");

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`settings-page font-montserrat p-4 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      <h2 className="text-3xl font-semibold mb-6">Settings</h2>

      {/* Language Selection */}
      <div className="mb-6">
        <label className="block text-xl font-medium mb-2">
          Select Language
        </label>
        <div className="flex items-center">
          <FaLanguage className="mr-2 text-xl" />
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            {/* Add more languages here */}
          </select>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="mb-6">
        <label className="block text-xl font-medium mb-2">Theme</label>
        <div className="flex items-center">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded border bg-gray-200 dark:bg-gray-700"
          >
            {theme === "light" ? (
              <FaMoon className="text-2xl" />
            ) : (
              <FaSun className="text-2xl" />
            )}
          </button>
          <span className="ml-2 text-xl">
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
        </div>
      </div>

      {/* Add other settings here */}
    </div>
  );
};

export default SettingsPage;
