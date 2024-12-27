import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShelfDeclaration = () => {
  const navigate = useNavigate();
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Get user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserRole(user.role);
    }
  }, []);

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "checkbox1") {
      setCheckbox1(checked);
    } else if (name === "checkbox2") {
      setCheckbox2(checked);
    }
  };

  // Check if both checkboxes are checked
  const isShelfDeclarationTrue = checkbox1 && checkbox2;

  // Handle feedback change
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (isShelfDeclarationTrue) {
      // Navigate based on user role
      switch (userRole) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "teacher":
          navigate("/teacher/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        default:
          alert("Invalid role.");
      }
    } else {
      alert(
        "Please confirm that the shelf is organized and stocked correctly."
      );
    }
  };

  return (
    <div className="max-w-full border-2 border-gray-300 mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg font-montserrat">
      <h1 className="text-3xl font-bold text-center text-[#105183] mb-4">
        Shelf Declaration for use this Application
      </h1>
      <p className="text-gray-600 mb-4">
        This application helps you declare the organization and stocking of
        shelves in your project. Proper shelf management is crucial for
        maintaining an efficient workspace and ensuring that all materials are
        easily accessible.
      </p>

      {userRole === "admin" ? (
        <>
          <h2 className="text-xl font-semibold mb-2 text-[#105183]">
            Admin Instructions
          </h2>
          <p className="text-gray-600 mb-4">
            As an admin, you are responsible for overseeing the organization of
            shelves across all departments. Please ensure that all shelves are
            compliant with the project guidelines.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2 text-[#105183]">
            User Instructions
          </h2>
          <p className="text-gray-600 mb-4">
            As a user, please confirm that your assigned shelves are organized
            and stocked correctly. This ensures that all team members can find
            the materials they need quickly and efficiently.
          </p>
        </>
      )}

      <h2 className="text-xl font-semibold mb-2 text-[#105183]">
        Terms and Conditions
      </h2>
      <ul className="list-disc list-inside mb-4 text-gray-600">
        <li>
          You must ensure that the shelf is organized according to the project
          guidelines.
        </li>
        <li>
          All items on the shelf must be stocked correctly and labeled
          appropriately.
        </li>
        <li>
          Failure to comply with these terms may result in project penalties.
        </li>
        <li>
          Regular audits may be conducted to ensure compliance with shelf
          organization standards.
        </li>
        <li>
          By using this application, you agree to adhere to the guidelines set
          forth by your project supervisor.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2 text-[#105183]">
        Usage Instructions
      </h2>
      <p className="text-gray-600 mb-4">
        To use this application, please check the boxes below to confirm that
        you have organized and stocked the shelf correctly. Once both boxes are
        checked, a confirmation message will appear. Additionally, you can
        provide feedback on your experience with the shelf organization process.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="checkbox1"
              checked={checkbox1}
              onChange={handleCheckboxChange}
              className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">
              I declare that the shelf is organized.
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="checkbox2"
              checked={checkbox2}
              onChange={handleCheckboxChange}
              className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">
              I declare that the shelf is stocked correctly.
            </span>
          </label>
        </div>

        {isShelfDeclarationTrue ? (
          <>
            <div className="mt-4 p-4 bg-sky-100 text-sky-800 border border-green-300 rounded">
              Thank you for your confirmation.
            </div>
          </>
        ) : (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded">
            <strong>Note:</strong> Please confirm your shelf declaration to
            access the website. After confirming, you can proceed with the
            application.
          </div>
        )}

        <h2 className="text-xl font-semibold mt-4 text-[#105183]">Feedback</h2>
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Please provide any feedback or comments about the shelf organization process."
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />

        <button
          type="submit"
          className="flex w-full justify-center mt-4 font-montserrat p-2 border-2 border-sky-500 text-black rounded-full hover:bg-sky-500 hover:text-white hover:border-sky-500  hover:shadow-md hover:shadow-sky-500"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default ShelfDeclaration;
