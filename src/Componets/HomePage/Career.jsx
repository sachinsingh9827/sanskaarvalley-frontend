import React, { useState, useEffect } from "react";
import axios from "axios";
import schoolCareerImage from "./assets/schoolcareer.jpg";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Career = () => {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch job positions on component mount
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/job-requirement/active"
        );
        setPositions(response.data.jobs || []);
      } catch (error) {
        console.error("Error fetching positions:", error);
        toast.error("Failed to load job positions.");
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
      formData.append("resume", values.resume);
      formData.append("coverLetter", values.coverLetter);
      formData.append("position", selectedPosition.title);

      const response = await axios.post(
        "http://localhost:5000/career/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Application Submitted Successfully!");
        resetForm();
      } else {
        toast.info(response.data.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred while submitting your application.");
    }
  };

  // Function to toggle modal visibility
  const handleShowDetails = (position) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  return (
    <div className="career-page font-montserrat  bg-sky-100 p-6">
      <ToastContainer />
      {!selectedPosition ? (
        <div className="positions-list max-w-4xl mx-auto">
          <h1 className="w-full p-4 text-4xl bg-[#105183] text-white rounded-lg font-semibold text-gray mb-8 text-center">
            Current Open Positions
          </h1>
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

                <button
                  onClick={() => setSelectedPosition(position)}
                  className="w-full mt-4 font-semibold px-2 py-2 border-2 border-sky-500 hover:bg-sky-500 hover:text-white rounded-full transition-all duration-300"
                >
                  Apply Now
                </button>

                {/* Show Details button */}
                <button
                  onClick={() => handleShowDetails(position)} // Open modal with details
                  className="w-full mt-4 font-semibold px-4 py-2 border-2 border-sky-500 hover:bg-sky-500 hover:text-white rounded-full transition-all duration-300"
                >
                  Show Details
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="form-section max-w-5xl mx-auto">
          <button
            onClick={() => setSelectedPosition(null)}
            className="mb-4 font-semibold px-4 py-2 border-2 border-sky-500 hover:bg-sky-500 hover:text-white rounded-full transition-all duration-300"
          >
            Go Back
          </button>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="form-container max-w-lg w-full bg-white shadow-xl rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Apply for {selectedPosition.title}
              </h2>
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
                  <Form className="space-y-4">
                    <div>
                      <label className="block font-medium text-gray-700">
                        Full Name
                      </label>
                      <Field
                        name="name"
                        className="w-full p-2 border rounded-lg focus:ring focus:ring-sky-300"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700">
                        Email Address
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="w-full p-2 border rounded-lg focus:ring focus:ring-sky-300"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700">
                        Mobile Number
                      </label>
                      <Field
                        type="tel"
                        name="mobile"
                        className="w-full p-2 border rounded-lg focus:ring focus:ring-sky-300"
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700">
                        Upload Resume
                      </label>
                      <input
                        type="file"
                        onChange={(event) =>
                          setFieldValue("resume", event.currentTarget.files[0])
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                      <ErrorMessage
                        name="resume"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700">
                        Cover Letter (Optional)
                      </label>
                      <Field
                        as="textarea"
                        name="coverLetter"
                        className="w-full p-2 border rounded-lg focus:ring focus:ring-sky-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full font-semibold px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600"
                    >
                      Submit Application
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <img
              src={schoolCareerImage}
              alt="Career"
              className="hidden md:block w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Modal for Showing Job Details */}
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
              <span className="font-semibold text-[#105183]"> Salary: </span>
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
            <p className=" mt-4">
              <span className="font-semibold text-[#105183]">
                Description:{" "}
              </span>
              {selectedPosition.description}
            </p>
            <div className="mt-6">
              <button
                onClick={handleCloseModal}
                className="w-full font-semibold px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600"
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
