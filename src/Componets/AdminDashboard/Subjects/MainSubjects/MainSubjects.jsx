import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FormControlLabel, styled, Switch } from "@mui/material";
import { FaPen, FaTrash } from "react-icons/fa";
import dataNotFound from "../Images/No data-rafiki.svg";
import Pagination from "../../../Reusable/Pagination";
import { errorMessages } from "../../../../utils/errorMessages";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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
    },
  },
  "& .MuiSwitch-thumb": {
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 13,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 200,
    }),
  },
}));

const MainSubjectsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null); // For edit functionality
  const [editMode, setEditMode] = useState(false); // To toggle between add and edit

  // Fetch subjects from the server
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "https://sanskaarvalley-backend.vercel.app/main-subject"
      );
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to load subjects. Please try again.");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Main Subject Name is required")
      .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed"),
    description: Yup.string()
      .max(200, "Description cannot exceed 200 characters")
      .optional(),
  });

  // Add or Edit a subject
  const handleSubmit = async (values, { resetForm }) => {
    if (
      values.name === currentSubject?.name &&
      values.description === currentSubject?.description
    ) {
      toast.info("No changes made to the main subject.");
      setIsModalOpen(false);
      return;
    }

    try {
      if (editMode) {
        // Edit existing subject
        const response = await axios.put(
          `https://sanskaarvalley-backend.vercel.app/main-subject/${currentSubject._id}`,
          values
        );
        toast.success(
          response.data.message ||
            errorMessages.SubjectErrors.SUBJECT_UPDATED_SUCCESSFULLY
        );
      } else {
        // Add new subject
        const response = await axios.post(
          "https://sanskaarvalley-backend.vercel.app/main-subject/add",
          values
        );
        toast.success(
          response.data.message || "Main Subject added successfully!"
        );
      }
      resetForm();
      setIsModalOpen(false);
      fetchSubjects();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save changes. Try again."
      );
    }
  };

  // Open the edit modal
  const handleEdit = (subject) => {
    setCurrentSubject(subject);
    setEditMode(true);
    setIsModalOpen(true);
  };

  // Open the delete confirmation modal
  const confirmDelete = (subject) => {
    setCurrentSubject(subject);
    setIsDeleteModalOpen(true);
  };

  // Delete a subject
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://sanskaarvalley-backend.vercel.app/main-subject/${currentSubject._id}`
      );
      toast.success("Subject deleted successfully.");
      setIsDeleteModalOpen(false);
      fetchSubjects();
    } catch (error) {
      toast.error("Failed to delete subject. Please try again.");
    }
  };
  const toggleActiveStatus = async (subjectId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the current status
      await axios.put(
        `https://sanskaarvalley-backend.vercel.app/main-subject/${subjectId}`, // Update the URL as per your API endpoint
        { isActive: updatedStatus }
      );

      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject._id === subjectId
            ? { ...subject, isActive: updatedStatus }
            : subject
        )
      );
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };
  return (
    <div className="overflow-x-auto font-montserrat">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Header */}
      <div className="flex justify-between border-b-2 p-2">
        <h2 className="text-2xl text-bold text-sky-600">
          Main Subjects for 11th and 12th class
        </h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditMode(false);
            setCurrentSubject(null); // Clear current subject
          }}
          className="flex px-4 py-2 border-2 border-sky-500 text-black rounded hover:bg-sky-500 hover:text-white"
        >
          Add Main Subject
        </button>
      </div>

      <div className="overflow-x-auto">
        {subjects.length > 0 ? (
          <div className="flex flex-col">
            <div className="overflow-x-auto rounded-lg border mt-4">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs uppercase bg-sky-500 text-white">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Active</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={subject._id} className="bg-white border-b">
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3">{subject.name}</td>
                      <td className="px-6 py-3">
                        <FormControlLabel
                          control={
                            <IOSSwitch
                              checked={subject.isActive}
                              onChange={() =>
                                toggleActiveStatus(
                                  subject._id,
                                  subject.isActive
                                )
                              }
                            />
                          }
                        />
                      </td>
                      <td className="px-6 py-3">
                        {subject.description || "N/A"}
                      </td>
                      <td className="px-6 py-3 flex space-x-2">
                        <button
                          onClick={() => handleEdit(subject)}
                          className="text-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(subject)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => fetchSubjects(page)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <img
              src={dataNotFound}
              alt="No data"
              className="w-64 h-64 object-contain mb-4"
            />
            <p className="text-gray-500">No Main Subjects Found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="flex justify-center text-lg font-bold mb-4">
              {editMode ? "Edit Main Subject" : "Add Main Subject"}
            </h2>
            <Formik
              initialValues={{
                name: currentSubject ? currentSubject.name : "",
                description: currentSubject ? currentSubject.description : "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block mb-1 font-semibold">Name :</label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full border px-3 py-2 rounded"
                      placeholder="Enter name"
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-semibold">
                      Description :
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      className="w-full border px-3 py-2 rounded"
                      placeholder="Optional"
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="mr-2 px-4 py-2 border-2 border-gray rounded hover:bg-gray hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border-2 border-sky-500 text-black rounded hover:bg-sky-500 hover:text-white font-montserrat"
                    >
                      {editMode ? "Save Changes" : "Add"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white border-2 border-red-500 rounded-lg p-6 w-full max-w-sm">
            <h2 className="flex justify-center text-red-500 border-b bg-red-100 text-lg font-bold mb-4">
              Delete
            </h2>
            <p className="mb-4">
              Are you sure you want to delete this main subject{" "}
              <span className="text-red-500">{currentSubject?.name}</span>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border-gray-500 hover:bg-gray hover:text-white rounded"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSubjectsPage;
