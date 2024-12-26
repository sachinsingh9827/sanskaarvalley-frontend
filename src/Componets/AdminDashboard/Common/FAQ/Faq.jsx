import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataNotFound from "../Images/No data-rafiki.svg";
import Pagination from "../../../Reusable/Pagination";
const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteFaqId, setDeleteFaqId] = useState(null);
  const [editFaq, setEditFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch FAQs
  const fetchFAQs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/faq");
      if (response.data && Array.isArray(response.data.faqs)) {
        setFaqs(response.data.faqs);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast.error("Failed to fetch FAQs.");
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  // Validation schema for Formik
  const validationSchema = Yup.object({
    question: Yup.string()
      .required("Question is required")
      .trim() // Remove leading/trailing spaces
      .min(1, "Question must be at least 1 character long")
      .max(255, "Question must be 255 characters or less")
      .matches(/^(?!\s*$).+/, "Question cannot be empty or just spaces") // Prevent spaces-only
      .matches(
        /^[a-zA-Z0-9\s\-,.?;:!&]*$/,
        "Question contains invalid characters"
      ), // Allow only safe characters

    answer: Yup.string()
      .required("Answer is required")
      .trim() // Remove leading/trailing spaces
      .min(1, "Answer must be at least 1 character long")
      .max(1000, "Answer must be 1000 characters or less")
      .matches(/^(?!\s*$).+/, "Answer cannot be empty or just spaces") // Prevent spaces-only
      .matches(
        /^[a-zA-Z0-9\s\-,.?;:!&]*$/,
        "Answer contains invalid characters"
      ), // Allow only safe characters
  });

  // Add or Edit FAQ
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Check if the form values are the same as the values in `editFaq`
      const isUnchanged =
        editFaq &&
        editFaq.question === values.question &&
        editFaq.answer === values.answer;

      // If the values have not changed, show a message and don't call the API
      if (isUnchanged) {
        toast.info("No changes made.");
        setIsModalOpen(false);
        return;
      }

      // Proceed with the API call if the values have changed
      if (editFaq) {
        await axios.put(`http://localhost:5000/faq/${editFaq._id}`, values);
        toast.success("FAQ updated successfully");
      } else {
        await axios.post("http://localhost:5000/faq", values);
        toast.success("FAQ added successfully");
      }

      // Fetch FAQs and reset form state
      fetchFAQs();
      resetForm();
      setIsModalOpen(false);
      setEditFaq(null);
    } catch (error) {
      console.error("Error saving FAQ:", error);
      toast.error("Failed to save FAQ.");
    }
  };

  // Delete FAQ
  const handleDelete = async () => {
    if (!deleteFaqId) return;
    try {
      await axios.delete(`http://localhost:5000/faq/${deleteFaqId}`);
      toast.success("FAQ deleted successfully");
      fetchFAQs();
      setIsDeleteModalOpen(false);
      setDeleteFaqId(null);
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ.");
    }
  };

  return (
    <div className="font-montserrat mx-auto px-4 py-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between border-b-2 border-sky-500 pb-2 p-4">
        <h1 className="text-3xl text-sky-600 font-bold mb-4">
          Frequently Asked Questions
        </h1>

        <div className="flex items-end mb-4">
          {" "}
          <button
            onClick={() => {
              setEditFaq(null);
              setIsModalOpen(true);
            }}
            className="flex  border-2 border-sky-500 p-2 rounded hover:bg-sky-500 hover:text-white hover:border-sky-500  hover:shadow-md hover:shadow-sky-500 whitespace-nowrap"
          >
            Add FAQ
          </button>
        </div>
      </div>
      {/* FAQ Table */}
      {faqs.length > 0 ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto rounded-lg border mt-4">
            <table className="w-full text-sm font-montserrat text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-sky-500">
                <tr>
                  <th className="px-6 py-3">SN</th>
                  <th className="px-6 py-3">Question</th>
                  <th className="px-6 py-3">Answer</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq, index) => (
                  <tr key={faq._id} className="bg-white border-b">
                    <td className="px-6 py-3 font-montserrat">{index + 1}.</td>
                    <td className="px-6 py-3 font-montserrat">
                      {faq.question}
                    </td>
                    <td className="px-6 py-3 font-montserrat">{faq.answer}</td>
                    <td className="px-6 py-3 font-montserrat">
                      <button
                        onClick={() => {
                          setEditFaq(faq);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-500 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteFaqId(faq._id);
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
            // onPageChange={(page) => (page)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src={dataNotFound}
            alt="No notifications found"
            className="max-w-xs mb-4"
          />
        </div>
      )}

      {/* FAQ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-sky-100 p-6 rounded shadow-lg w-1/2">
            <h2 className="flex justify-center text-xl text-sky-600 font-bold mb-4">
              {editFaq ? "Edit FAQ" : "Add FAQ"}
            </h2>
            <Formik
              initialValues={{
                question: editFaq?.question || "",
                answer: editFaq?.answer || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ handleSubmit, resetForm }) => (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="question" className="block mb-2 font-bold">
                    Question:
                  </label>
                  <Field
                    type="text"
                    name="question"
                    className="border w-full p-2 rounded mb-4"
                    placeholder="Enter question"
                  />
                  <ErrorMessage
                    name="question"
                    component="div"
                    className="text-red-500 mb-2"
                  />

                  <label htmlFor="answer" className="block mb-2 font-bold">
                    Answer:
                  </label>
                  <Field
                    as="textarea"
                    name="answer"
                    className="border w-full p-2 rounded mb-4"
                    placeholder="Enter answer"
                  />
                  <ErrorMessage
                    name="answer"
                    component="div"
                    className="text-red-500 mb-2"
                  />

                  <div className="flex justify-end space-x-4">
                    <button
                      type="submit"
                      className="px-4 py-2 font-montserrat border-2 border-sky-500 text-black rounded hover:bg-sky-500 hover:text-white"
                    >
                      {editFaq ? "Update" : "Add"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setIsModalOpen(false);
                        setEditFaq(null);
                      }}
                      className="mr-2 px-4 py-2 font-montserrat border-2 border-gray text-black rounded hover:bg-gray hover:text-white"
                    >
                      Cancel
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
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this FAQ?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteFaqId(null);
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded"
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

export default FAQ;
