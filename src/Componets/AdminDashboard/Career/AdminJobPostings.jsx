import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import dataNotFound from "./Images/No data-rafiki.svg"; // Replace with your own "no data found" image
import { FormControlLabel, styled, Switch } from "@mui/material";
import Pagination from "../../Reusable/Pagination";

const AdminJobPostings = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);
  const [editJobId, setEditJobId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "200ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "skyblue",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 200,
      }),
    },
  }));
  const fetchPositions = async () => {
    try {
      const response = await axios.get(
        "https://sanskaarvalley-backend.vercel.app/job-requirement"
      );
      setJobPosts(response.data.jobs);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };
  useEffect(() => {
    fetchPositions();
    // Fetch job postings from the API
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .matches(/^[a-zA-Z0-9\s.,-]+$/, "Job title contains invalid characters")
      .required("Job title is required")
      .max(100, "Job title must be less than 100 characters"),

    description: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s.,!?-]+$/,
        "Job description contains invalid characters"
      )
      .required("Job description is required")
      .min(20, "Job description must be at least 20 characters")
      .max(1000, "Job description must be less than 1000 characters"),

    qualifications: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s.,!?-]+$/,
        "Qualifications contain invalid characters"
      )
      .required("Qualifications are required")
      .min(5, "Qualifications must be at least 5 characters")
      .max(500, "Qualifications must be less than 500 characters"),

    experience: Yup.number()
      .typeError("Experience must be a number")
      .min(0, "Experience cannot be negative")
      .max(50, "Experience cannot exceed 50 years")
      .required("Experience is required"),

    location: Yup.string()
      .matches(/^[a-zA-Z\s,-]+$/, "Location contains invalid characters")
      .required("Location is required")
      .max(100, "Location must be less than 100 characters"),

    closingDate: Yup.date()
      .required("Closing date is required")
      .min(new Date(), "Closing date cannot be in the past")
      .typeError("Invalid date format"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const method = editJobId ? "put" : "post";
    const url = editJobId
      ? `https://sanskaarvalley-backend.vercel.app/job-requirement/${editJobId}`
      : "https://sanskaarvalley-backend.vercel.app/job-requirement";

    axios({
      method,
      url,
      data: values,
    })
      .then((response) => {
        const updatedJob = response.data;
        if (editJobId) {
          setJobPosts((prev) =>
            prev.map((job) => (job.id === editJobId ? updatedJob : job))
          );
        } else {
          setJobPosts((prev) => [...prev, updatedJob]);
        }
        setShowForm(false);
        resetForm();
        setEditJobId(null);
        toast.success(
          editJobId ? "Job updated successfully!" : "Job posted successfully!"
        );
        fetchPositions();
      })
      .catch((error) => {
        toast.error("Error submitting job: " + error.message);
        console.error("Error submitting job:", error);
      });
  };

  const handleEdit = (job) => {
    setEditJobId(job._id); // Set the job ID for editing
    setShowForm(true); // Show the form
  };

  const handleDeleteConfirmation = (job) => {
    setJobToDelete(job._id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting job:", jobToDelete);

      // Send DELETE request to the server
      await axios.delete(
        `https://sanskaarvalley-backend.vercel.app/job-requirement/${jobToDelete}`
      );

      // Update the job posts state
      setJobPosts((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobToDelete)
      );

      // Display success toast notification
      toast.success("Job deleted successfully!");

      // Reset modal state and selected job
      setShowDeleteModal(false);
      setJobToDelete(null);
    } catch (error) {
      // Display error toast notification and log error
      toast.error(
        `Error deleting job: ${error?.response?.data?.message || error.message}`
      );
      console.error("Error deleting job:", error);
    }
  };

  const toggleActiveStatus = async (jobId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the current status
      await axios.put(
        `https://sanskaarvalley-backend.vercel.app/toggle-status/${jobId}`,
        {
          isActive: updatedStatus,
        }
      );
      setJobPosts((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, isActive: updatedStatus } : job
        )
      );
      toast.success("Status updated successfully.");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="admin-job-postings p-4 font-montserrat ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-[#105183]">
          {" "}
          {editJobId ? "Update Job" : "Post New Job"}
        </h1>
        {/* Form Toggle */}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditJobId(null);
          }}
          className="flex font-montserrat p-2 border-2 border-sky-500 text-black rounded hover:bg-sky-500 hover:text-white hover:border-sky-500  hover:shadow-md hover:shadow-sky-500"
        >
          {showForm ? "Close Form" : "Post Job"}
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Job Form */}
      {showForm && (
        <Formik
          initialValues={
            editJobId
              ? {
                  ...jobPosts.find((job) => job._id === editJobId),
                  closingDate: jobPosts
                    .find((job) => job._id === editJobId)
                    ?.closingDate?.split("T")[0], // Format date as YYYY-MM-DD
                }
              : {
                  title: "",
                  description: "",
                  qualifications: "",
                  experience: "",
                  location: "",
                  closingDate: "",
                }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="mt-6 space-y-4 border border-gray-300 rounded-lg p-4">
            {/* Fields here */}
            <div>
              <label htmlFor="title" className="block font-medium">
                Job Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block font-medium">
                Job Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="qualifications" className="block font-medium">
                Qualifications
              </label>
              <Field
                type="text"
                id="qualifications"
                name="qualifications"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage
                name="qualifications"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="experience" className="block font-medium">
                Experience (Years)
              </label>
              <Field
                type="number"
                id="experience"
                name="experience"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage
                name="experience"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="location" className="block font-medium">
                Location
              </label>
              <Field
                type="text"
                id="location"
                name="location"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="closingDate" className="block font-medium">
                Closing Date
              </label>
              <Field
                type="date"
                id="closingDate"
                name="closingDate"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage
                name="closingDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full border-2 border-sky-600  font-bold py-2 px-4 rounded-lg hover:bg-sky-600 hover:text-white hover:border-sky-600 hover:shadow-md hover:shadow-sky-500"
            >
              {editJobId ? "Update Job" : "Post Job"}
            </button>
          </Form>
        </Formik>
      )}
      {/* Job Postings List */}
      {!showForm && (
        <div className="overflow-x-auto rounded-lg border mt-4">
          <table className="w-full text-sm text-left text-gray-800 font-montserrat">
            <thead className="text-xs text-white uppercase bg-sky-500">
              <tr>
                <th className="py-2 px-2 text-left text-white">SN.</th>
                <th className="py-2 px-2 text-left text-white">Title</th>
                <th className="py-2 px-2 text-left text-white">Description</th>
                <th className="py-2 px-2 text-left text-white">
                  Qualifications
                </th>
                <th className="py-2 px-2 text-left text-white">Experience</th>
                <th className="py-2 px-2 text-left text-white">Location</th>
                <th className="py-2 px-2 text-left text-white">Closing Date</th>
                <th className="py-2 px-2 text-left text-white">Status</th>
                <th className="py-2 px-2 text-left text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobPosts.length > 0 ? (
                jobPosts.map((job, index) => (
                  <tr key={job._id}>
                    <td className="py-2 px-2">{index + 1}.</td>
                    <td className="py-2 px-2 ">{job.title}</td>
                    <td className="py-2 px-2 ">{job.description}</td>
                    <td className="py-2 px-2 ">{job.qualifications}</td>
                    <td className="py-2 px-2 ">{job.experience} years</td>
                    <td className="py-2 px-2 ">{job.location}</td>
                    <td className="py-2 px-2 ">
                      {formatDate(job.closingDate)}
                    </td>
                    <td className="px-4 py-2 font-montserrat ">
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            checked={job.isActive}
                            onChange={() =>
                              toggleActiveStatus(job._id, job.isActive)
                            }
                          />
                        }
                        label=""
                      />
                    </td>
                    <td className="flex py-2 px-2 ">
                      <button
                        onClick={() => handleEdit(job)} // Trigger Edit
                        className="bg-yellow-500 text-white p-2 mr-2 font-medium rounded-lg hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteConfirmation(job)} // Trigger Delete
                        className="bg-red-600 text-white font-medium p-2  rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    <img
                      src={dataNotFound}
                      alt="No data found"
                      className="w-32 mx-auto"
                    />
                    <p>No job postings available.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => fetchPositions(page)}
      />
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this job?
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-black font-medium py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobPostings;
