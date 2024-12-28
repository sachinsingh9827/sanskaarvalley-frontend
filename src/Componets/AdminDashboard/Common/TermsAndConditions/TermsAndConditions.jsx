import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataNotFound from "../Images/No data-rafiki.svg";
import Pagination from "../../../Reusable/Pagination";

const TermsAndConditions = () => {
  const [terms, setTerms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTermId, setDeleteTermId] = useState(null);
  const [editTerm, setEditTerm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Terms and Conditions
  const fetchTerms = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://sanskaarvalley-backend.vercel.app/terms-and-conditions?page=${currentPage}`
      );
      if (response.data && Array.isArray(response.data.termsAndConditions)) {
        setTerms(response.data.termsAndConditions);
        setTotalPages(response.data.pagination.totalPages || 1);
        setIsLoading(false);
      } else {
        setTerms([]);
      }
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, [currentPage]);

  // Validation schema for Formik
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(1, "Title must be at least 1 character long")
      .max(255, "Title must be 255 characters or less")
      .matches(/^(?!\s*$).+/, "Title cannot be empty or just spaces"),
    content: Yup.string()
      .required("Content is required")
      .min(1, "Content must be at least 1 character long")
      .max(1000, "Content must be 1000 characters or less")
      .matches(/^(?!\s*$).+/, "Content cannot be empty or just spaces"),
  });

  // Add or Edit Terms and Conditions
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const cleanedValues = {
        title: values.title.trim(),
        content: values.content.trim(),
      };
      const isUnchanged =
        editTerm &&
        editTerm.title === cleanedValues.title &&
        editTerm.content === cleanedValues.content;

      if (isUnchanged) {
        toast.info("Term is unchanged.");
        setIsModalOpen(false);
        return;
      }
      if (editTerm) {
        await axios.put(
          `https://sanskaarvalley-backend.vercel.app/terms-and-conditions/${editTerm._id}`,
          cleanedValues
        );
        toast.success("Term updated successfully!");
      } else {
        await axios.post(
          "https://sanskaarvalley-backend.vercel.app/terms-and-conditions",
          cleanedValues
        );
        toast.success("Term added successfully!");
      }

      fetchTerms();
      resetForm();
      setIsModalOpen(false);
      setEditTerm(null);
    } catch (error) {
      console.error("Error saving terms:", error);
      toast.error("Failed to save term.");
    }
  };

  // Delete Terms and Conditions
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://sanskaarvalley-backend.vercel.app/terms-and-conditions/${deleteTermId}`
      );
      toast.success("Term deleted successfully!");
      fetchTerms();
      setIsDeleteModalOpen(false);
      setDeleteTermId(null);
    } catch (error) {
      console.error("Error deleting term:", error);
      toast.error("Failed to delete term.");
    }
  };

  return (
    <div className="font-montserrat mx-auto px-4 py-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center pb-4 border-b-2 border-sky-500 ">
        <h1 className="text-3xl text-sky-600 font-bold">
          Terms and Conditions
        </h1>
        <button
          onClick={() => {
            setEditTerm(null);
            setIsModalOpen(true);
          }}
          className="flex whitespace-nowrap border-2 border-sky-500 p-2 rounded hover:bg-sky-500 hover:text-white hover:border-sky-500  hover:shadow-md hover:shadow-sky-500"
        >
          Add Term
        </button>
      </div>
      {!isLoading && (
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
          <span className="text-gray text-lg mt-2">Loading...</span>
        </div>
      )}
      {/* Terms Table */}
      {terms.length > 0 ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto rounded-lg border mt-4">
            <table className="w-full text-sm font-montserrat text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-sky-500">
                <tr>
                  <th className="px-6 py-3">SN</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Content</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {terms.map((term, index) => (
                  <tr key={term._id} className="bg-white border-b">
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{term.title}</td>
                    <td className="px-6 py-3">{term.content}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => {
                          setEditTerm(term);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-500 "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteTermId(term._id);
                          setIsDeleteModalOpen(true);
                        }}
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
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <img src={dataNotFound} alt="No data found" className="w-64 mb-4" />
          <p className="text-gray-500">No terms and conditions found.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-center text-xl font-bold text-sky-600 mb-4">
              {editTerm ? "Edit Term" : "Add Term"}
            </h2>
            <Formik
              initialValues={{
                title: editTerm?.title || "",
                content: editTerm?.content || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ handleSubmit, resetForm }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block font-semibold">
                      Title
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="w-full border rounded p-2 mt-1"
                      placeholder="Enter title"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="content" className="block font-semibold">
                      Content
                    </label>
                    <Field
                      as="textarea"
                      name="content"
                      rows="5"
                      className="w-full border rounded p-2 mt-1"
                      placeholder="Enter content"
                    />
                    <ErrorMessage
                      name="content"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setIsModalOpen(false);
                        setEditTerm(null);
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-sky-500 text-white rounded"
                    >
                      {editTerm ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-center text-xl font-bold text-red-600 mb-4">
              Confirm Delete
            </h2>
            <p className="text-center text-gray-600">
              Are you sure you want to delete this term?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsAndConditions;
