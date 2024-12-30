import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Career.css";

const Career = () => {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null); // Create a ref for the form section
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch job positions on component mount
  useEffect(() => {
    const fetchPositions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://sanskaarvalley-backend.vercel.app/job-requirement/active"
        );
        setPositions(response.data.jobs || []);

        // Set a timer to keep loading state for a specific duration (e.g., 3 seconds)
        setTimeout(() => {
          setIsLoading(false);
        }, 3000); // Change 3000 to the desired duration in milliseconds
      } catch (error) {
        console.error("Error fetching positions:", error);
        toast.error("Failed to load job positions.");
        setIsLoading(false); // Ensure loading state is false on error
      }
    };

    fetchPositions();
  }, []);

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    resume: Yup.mixed()
      .required("Resume is required")
      .test("fileType", "Only PDF or Word files are accepted", (value) =>
        value
          ? [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(value.type)
          : false
      ),
    coverLetter: Yup.string(),
  });

  // Form submission handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);

      // Check if a resume file is selected
      if (values.resume) {
        formData.append("resume", values.resume);
      } else {
        toast.error("Resume file is required."); // Notify user if no file is selected
        return; // Exit the function if no file is provided
      }

      formData.append("coverLetter", values.coverLetter);
      formData.append("position", selectedPosition.title);

      // Send the POST request to the backend
      const response = await axios.post(
        "https://sanskaarvalley-backend.vercel.app/career",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check the response from the server
      if (response.data.success) {
        toast.success("Application Submitted Successfully!");
        resetForm(); // Reset the form fields
        setSelectedPosition(null); // Reset selected position after submission
      } else {
        toast.info(response.data.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred while submitting your application.");
    }
  };

  // Function to handle applying for a position
  const handleApplyNow = (position) => {
    setSelectedPosition(position);
    // Scroll to the form section
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to handle viewing details of a position
  const handleViewDetails = (position) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  return (
    <div className="career-page font-montserrat bg-sky-100 p-6">
      <ToastContainer />
      {/* Always show the heading */}
      <h1 className="w-full p-4 text-4xl bg-[#105183] text-white rounded-lg font-semibold text-gray mb-8 text-center">
        Current Open Positions
      </h1>
      {isLoading ? (
        <div className="positions-list max-w-4xl mx-auto animate-pulse m-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="position-card bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-all"
              >
                <div className="flex justify-between gap-2">
                  <div className="h-8 bg-teal-300 rounded w-1/2 block "></div>
                  <div className="h-8 text-gray-600 font-semibold bg-sky-100 px-2 py-1 rounded-full"></div>
                </div>

                <div className="h-6 bg-red-300 w-1/3 rounded mt-4"></div>
                <div className="h-6 bg-pink-300 rounded w-2/3 block mt-4"></div>
                <div className="flex justify-between gap-2">
                  <div className="h-8 bg-teal-300 rounded w-full block mt-4 p-2"></div>
                  <div className="h-8 bg-gray rounded w-full block mt-4 p-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : positions.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-auto bg-gray-50 p-8 animate-fade-in">
          <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-3xl font-bold text-[#105183] mb-4 animate-bounce -mt-6">
              {" "}
              {/* Negative margin added */}
              <span
                role="img"
                aria-label="sad face"
                className="mr-2 rotate-180 transform text-4xl"
              >
                😞
              </span>
              Oops! No Positions Found
            </h2>
            <p className="text-gray-600 mb-6">
              It seems we don't have any job openings at the moment. Please
              check back later or try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()} // Reload the page when clicked
              className="bg-[#105183] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0e3a5b] transition duration-200 transform hover:scale-110 animate-pulse"
            >
              Refresh
            </button>
          </div>
        </div>
      ) : (
        <div className="positions-list max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <div
                key={position._id}
                className="position-card bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-all"
              >
                <div className="flex justify-between">
                  <h2 className="text-2xl font-semibold text-[#105183]">
                    {position.title}
                  </h2>
                  <div className="text-gray-600 font-semibold bg-sky-100 px-2 py-1 rounded-full">
                    {index + 1}
                  </div>
                </div>
                <p className="text-gray-600 mt-4 font-semibold">
                  <span className="text-[#105183]">Min Experience: </span>
                  {position.experience} years
                </p>
                <p className="text-gray-600 mt-2 font-semibold">
                  <span className="text-[#105183]">Last Date to Apply: </span>
                  <span
                    className={`${
                      new Date(position.closingDate) - new Date() <=
                      3 * 24 * 60 * 60 * 1000
                        ? "text-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    {new Date(position.closingDate).toLocaleDateString()}
                  </span>
                </p>
                <div className="flex justify-between mt-4 gap-4">
                  <button
                    onClick={() => handleApplyNow(position)}
                    className="w-full bg-[#105183] text-white font-semibold py-2 rounded-md hover:bg-[#0e3a5b]"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleViewDetails(position)}
                    className="w-full bg-[#105183] text-white font-semibold py-2 rounded-md hover:bg-[#0e3a5b]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Application Form */}
      <div ref={formRef}>
        {selectedPosition && (
          <div className="box bg-white p-8 rounded-lg shadow-md mt-8">
            <div className="flex justify-between mt-8 mb-4">
              <h2 className="text-2xl font-semibold text-[#105183]  ">
                Apply for -
                <span className="text-sky-600">{selectedPosition.title}</span>
              </h2>
              <button
                onClick={() => setSelectedPosition(null)}
                className=" bg-[#105183] text-white font-semibold py-2 px-2 rounded-md hover:bg-[#0e3a5b]"
              >
                close
              </button>
            </div>
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobile: "",
                resume: null,
                coverLetter: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mobile" className="block text-gray-700">
                      Mobile Number
                    </label>
                    <Field
                      type="text"
                      id="mobile"
                      name="mobile"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="resume" className="block text-gray-700">
                      Resume (PDF/Word)
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf, .doc, .docx"
                      onChange={(event) => {
                        setFieldValue("resume", event.currentTarget.files[0]);
                      }}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    <ErrorMessage
                      name="resume"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="coverLetter"
                      className="block text-gray-700"
                    >
                      Cover Letter (optional)
                    </label>
                    <Field
                      as="textarea"
                      id="coverLetter"
                      name="coverLetter"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      rows="4"
                    />
                    <ErrorMessage
                      name="coverLetter"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#105183] text-white font-semibold py-2 rounded-md hover:bg-[#0e3a5b]"
                  >
                    Submit Application
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
      {isModalOpen && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="flex justify-center text-xl font-semibold text-[#105183]">
              {selectedPosition.title}
            </h3>
            <p className="mt-4">
              <span className="font-semibold text-[#105183]">Location: </span>{" "}
              {selectedPosition.location}
            </p>
            <p className="mt-2">
              <span className="font-semibold text-[#105183]">Salary: </span>
              {selectedPosition?.salary
                ? selectedPosition.salary
                : "Not mentioned"}
            </p>
            <p className="mt-2">
              <span className="font-semibold text-[#105183]">Experience: </span>
              {selectedPosition?.experience
                ? `${selectedPosition.experience} years`
                : "Not mentioned"}
            </p>
            <p className="mt-4">
              <span className="font-semibold text-[#105183]">
                Description:{" "}
              </span>
              {selectedPosition.description}
            </p>
            <div className="mt-6">
              <button
                onClick={handleModalClose}
                className="w-full font-semibold px-4 py-2 bg-sky-500 text-white rounded-full hover:bg -sky-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Career;
