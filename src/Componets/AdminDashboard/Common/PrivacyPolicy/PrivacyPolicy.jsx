import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataNotFound from "../Images/No data-rafiki.svg";
import Pagination from "../../../Reusable/Pagination";

const PrivacyPolicy = () => {
  const [privacyPolicies, setPrivacyPolicies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePolicyId, setDeletePolicyId] = useState(null);
  const [editPolicy, setEditPolicy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Privacy Policies
  const fetchPrivacyPolicies = async () => {
    try {
      const response = await axios.get(
        `https://sanskaarvalley-backend.vercel.app/privacy-policies?page=${currentPage}`
      );
      if (response.data && Array.isArray(response.data.privacyPolicies)) {
        setPrivacyPolicies(response.data.privacyPolicies);
        setTotalPages(response.data.pagination.totalPages); // Set total pages from the response
      }
    } catch (error) {
      console.error("Error fetching privacy policies:", error);
    }
  };

  useEffect(() => {
    fetchPrivacyPolicies();
  }, [currentPage]);

  // Validation schema for Formik
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .trim()
      .min(1, "Title must be at least 1 character long")
      .max(255, "Title must be 255 characters or less")
      .matches(/^(?!\s*$).+/, "Title cannot be empty or just spaces")
      .matches(
        /^[a-zA-Z0-9\s\-,.?;:!&]*$/,
        "Title contains invalid characters"
      ),

    content: Yup.string()
      .required("Content is required")
      .trim()
      .min(1, "Content must be at least 1 character long")
      .max(1000, "Content must be 1000 characters or less")
      .matches(/^(?!\s*$).+/, "Content cannot be empty or just spaces")
      .matches(
        /^[a-zA-Z0-9\s\-,.?;:!&]*$/,
        "Content contains invalid characters"
      ),
  });

  // Add or Edit Privacy Policy
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const isUnchanged =
        editPolicy &&
        editPolicy.title === values.title &&
        editPolicy.content === values.content;

      if (isUnchanged) {
        toast.info("No changes made.");
        setIsModalOpen(false);
        return;
      }

      // Clean up spaces in the values
      const cleanedValues = {
        title: values.title.trim(),
        content: values.content.trim(),
      };

      if (editPolicy) {
        await axios.put(
          `https://sanskaarvalley-backend.vercel.app/privacy-policies/${editPolicy._id}`,
          cleanedValues
        );
        toast.success("Privacy Policy updated successfully");
      } else {
        await axios.post(
          "https://sanskaarvalley-backend.vercel.app/privacy-policies",
          cleanedValues
        );
        toast.success("Privacy Policy added successfully");
      }

      fetchPrivacyPolicies();
      resetForm();
      setIsModalOpen(false);
      setEditPolicy(null);
    } catch (error) {
      console.error("Error saving Privacy Policy:", error);
      toast.error("Failed to save Privacy Policy.");
    }
  };

  // Delete Privacy Policy
  const handleDelete = async () => {
    if (!deletePolicyId) return;
    try {
      await axios.delete(
        `https://sanskaarvalley-backend.vercel.app/privacy-policies/${deletePolicyId}`
      );
      toast.success("Privacy Policy deleted successfully");
      fetchPrivacyPolicies();
      setIsDeleteModalOpen(false);
      setDeletePolicyId(null);
    } catch (error) {
      console.error("Error deleting Privacy Policy:", error);
      toast.error("Failed to delete Privacy Policy.");
    }
  };

  return (
    <div className="font-montserrat mx-auto px-4 py-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between border-b-2 border-sky-500 pb-2 p-4">
        <h1 className="text-3xl text-sky-600 font-bold mb-4">
          Privacy Policies
        </h1>
        <button
          onClick={() => {
            setEditPolicy(null);
            setIsModalOpen(true);
          }}
          className="flex whitespace-nowrap font-montserrat mb-4 px-4 py-2 border-2 border-sky-500 text-black rounded hover:bg-sky-500 hover:text-white hover:shadow-md hover:shadow-sky-500"
        >
          Add Privacy Policy
        </button>
      </div>

      {/* Privacy Policy Table */}
      {privacyPolicies.length > 0 ? (
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
                {privacyPolicies.map((policy, index) => (
                  <tr key={policy._id} className="bg-white border-b">
                    <td className="px-6 py-3">{index + 1}.</td>
                    <td className="px-6 py-3">{policy.title}</td>
                    <td className="px-6 py-3">{policy.content}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => {
                          setEditPolicy(policy);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-500 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeletePolicyId(policy._id);
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
        <div className="flex flex-col items-center justify-center">
          <img
            src={dataNotFound}
            alt="No privacy policies found"
            className="max-w-xs mb-4"
          />
        </div>
      )}

      {/* Privacy Policy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-sky-100 p-6 rounded shadow-lg w-96">
            <h2 className="text-center text-xl text-sky-600 font-bold mb-4">
              {editPolicy ? "Edit Privacy Policy" : "Add Privacy Policy"}
            </h2>
            <Formik
              initialValues={{
                title: editPolicy?.title || "",
                content: editPolicy?.content || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ handleSubmit, resetForm }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block font-bold mb-2">
                      Title:
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="border w-full p-2 rounded"
                      placeholder="Enter title"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="content" className="block font-bold mb-2">
                      Content:
                    </label>
                    <Field
                      as="textarea"
                      name="content"
                      className="border w-full p-2 rounded"
                      placeholder="Enter content"
                    />
                    <ErrorMessage
                      name="content"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setIsModalOpen(false);
                        setEditPolicy(null);
                      }}
                      className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-sky-500 text-white px-4 py-2 rounded"
                    >
                      {editPolicy ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-center text-xl font-bold mb-4">
              Are you sure you want to delete this Privacy Policy?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
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

export default PrivacyPolicy;
