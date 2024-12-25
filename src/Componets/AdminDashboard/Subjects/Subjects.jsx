import React, { useState, useEffect } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataNotFound from "./Images/No data-rafiki.svg";
import Pagination from "../../Reusable/Pagination";
import { errorMessages } from "../../../utils/errorMessages";
import Switch from "@mui/material/Switch";
import { FormControlLabel, styled } from "@mui/material";

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

// Subjects Component
const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
  });

  const fetchSubjects = async (page) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/subjects/all-subjects",
        {
          params: { page, limit: 10 },
        }
      );
      if (response.data && Array.isArray(response.data.subjects)) {
        setSubjects(response.data.subjects);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(page);
      } else {
        toast.error(errorMessages.SubjectErrors.SUBJECT_FETCH_FAILED);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error(errorMessages.SubjectErrors.SUBJECT_FETCH_FAILED);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (editId) {
      const subjectToEdit = subjects.find((s) => s._id === editId);
      if (subjectToEdit) {
        setInitialValues({
          name: subjectToEdit.name,
          description: subjectToEdit.description,
        });
      }
    }
  }, [editId, subjects]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Invalid name format.")
      .min(2, "Name is too short.")
      .max(50, "Name is too long.")
      .required("Name is required."),
    description: Yup.string().max(200, "Description is too long."),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (editId) {
        const existingSubject = subjects.find(
          (subject) => subject._id === editId
        );

        const noChanges =
          existingSubject &&
          existingSubject.name === values.name &&
          existingSubject.description === values.description;

        if (noChanges) {
          toast.info(
            "No changes detected. Please update the form before submitting."
          );
          setIsModalOpen(false);
          return;
        }

        const response = await axios.put(
          `http://localhost:5000/subjects/update/${editId}`,
          values
        );
        setSubjects((prev) =>
          prev.map((subject) =>
            subject._id === editId ? response.data : subject
          )
        );
        toast.success("Subject updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:5000/subjects",
          values
        );
        setSubjects((prev) => [...prev, response.data]);
        toast.success("Subject created successfully!");
      }

      resetForm();
      setIsModalOpen(false);
      setEditId(null);
      fetchSubjects();
    } catch (error) {
      console.error("Error saving subject:", error);
      toast.error("Failed to save subject.");
    }
  };

  const handleEdit = (subject) => {
    setIsModalOpen(true);
    setEditId(subject._id);
    setInitialValues({
      name: subject.name,
      description: subject.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/subjects/delete/${id}`);
      setSubjects((prev) => prev.filter((subject) => subject._id !== id));
      toast.success(errorMessages.SubjectErrors.SUBJECT_DELETED_SUCCESSFULLY);
    } catch (error) {
      console.error("Error deleting subject:", error);
      toast.error(errorMessages.SubjectErrors.SUBJECT_DELETE_FAILED);
    }
  };

  const openDeleteModal = (subject) => {
    setSubjectToDelete(subject);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSubjectToDelete(null);
  };
  const toggleActiveStatus = async (subjectId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the current status
      const response = await axios.put(
        `http://localhost:5000/subjects/toggle-status/${subjectId}`, // Update the URL as per your API endpoint
        { isActive: updatedStatus }
      );

      // Update the local state to reflect the new status
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject._id === subjectId
            ? { ...subject, isActive: updatedStatus }
            : subject
        )
      );

      toast.success(response.data.message || "Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };
  return (
    <div className="overflow-x-auto font-montserrat">
      <ToastContainer position="top-right" />
      <div className="flex justify-between border-b-2 p-2">
        <h2 className="text-2xl text-sky-600">Subjects for all classes</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditId(null);
            setInitialValues({
              name: "",
              description: "",
            });
          }}
          className="flex p-2 border-2 border-sky-500 text-black rounded hover:bg-sky-500 hover:text-white"
        >
          Add Subject
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-sky-100 border-2 border-sky-500 rounded shadow-lg p-6 w-96">
            <h3 className="flex justify-center text-xl mb-4">
              {editId ? "Edit Subject" : "New Subject"}
            </h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-black font-montserrat">
                      Subject Name:
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter subject name"
                        className="m-2 px-2 block w-full border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-black font-montserrat">
                      Description:
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Enter description"
                        className="m-2 px-2 block w-full border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </label>
                  </div>
                  <div className="flex justify-end font-montserrat">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="mr-2 px-4 py-2 border- 2 border-gray rounded hover:bg-gray hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border-2 border-sky-500 text-black rounded hover:bg-sky-500 hover:text-white font-montserrat"
                    >
                      {editId ? "Update Subject" : "Add Subject"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {isDeleteModalOpen && subjectToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-gray rounded shadow-lg p-6 w-96">
            <h3 className="flex justify-center text-red-500 border-b bg-red-100 text-lg font-bold mb-4 p-2">
              Are you sure you want to delete this subject -{" "}
              {subjectToDelete.name}?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  handleDelete(subjectToDelete._id);
                  closeDeleteModal();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        {Array.isArray(subjects) && subjects.length > 0 ? (
          <div className="flex flex-col">
            <div className="overflow-x-auto rounded-lg border mt-4">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-sky-500">
                  <tr>
                    <th className="px-6 py-3 font-montserrat">SN.</th>
                    <th className="px-6 py-3 font-montserrat">Name</th>
                    <th className="px-6 py-3 font-montserrat">Description</th>
                    <th className="px-6 py-3 font-montserrat">Status</th>
                    <th className="px-6 py-3 font-montserrat">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={subject._id} className="bg-white border-b">
                      <td className="px-6 py-3 font-montserrat">
                        {index + 1}.
                      </td>
                      <td className="px-6 py-3 font-montserrat">
                        {subject.name}
                      </td>
                      <td className="px-6 py-3 font-montserrat">
                        {subject.description}
                      </td>
                      <td className="px-6 py-3 font-montserrat">
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
                        <button
                          onClick={() => handleEdit(subject)}
                          className="mr-2 text-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(subject)}
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
          <div className="flex flex-col items-center justify-center">
            <img
              src={dataNotFound}
              alt="No subjects found"
              className="max-w-xs mb-4"
            />
            <p className="text-center font-montserrat">No Subjects Found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={fetchSubjects}
        />
      )}
    </div>
  );
};

export default Subjects;
