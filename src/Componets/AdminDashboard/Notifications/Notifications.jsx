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
import { LinearProgress } from "@mui/material";

// Function to format date
const formatDate = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return "Invalid Date";
  }
  const options = { year: "numeric", month: "long", day: "numeric" };
  return parsedDate.toLocaleDateString(undefined, options);
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    message: "",
  });

  // Fetch notifications function
  const fetchNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://sanskaarvalley-backend.vercel.app/notifications",
        {
          params: { page, limit: 10 },
        }
      );

      if (response.data && Array.isArray(response.data.notifications)) {
        setNotifications(response.data.notifications);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(page);
      } else {
        toast.error("Failed to load notifications: Invalid data format.");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []); // Fetch notifications on mount

  useEffect(() => {
    if (editId) {
      const notificationToEdit = notifications.find((n) => n._id === editId);
      if (notificationToEdit) {
        setInitialValues({
          title: notificationToEdit.title,
          message: notificationToEdit.message,
        });
      }
    }
  }, [editId, notifications]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      let response;
      if (editId) {
        // Make sure the correct URL is used with the correct notification ID
        response = await axios.put(
          `https://sanskaarvalley-backend.vercel.app/notifications/${editId}`,
          values
        );
        toast.success("Notification updated successfully.");
      } else {
        response = await axios.post(
          "https://sanskaarvalley-backend.vercel.app/notifications",
          values
        );
        toast.success("Notification created successfully.");
      }
      resetForm();
      fetchNotifications(currentPage); // Refresh notifications list
      setEditId(null); // Reset editing state
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting notification:", error);
      toast.error("Failed to submit notification.");
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s.,-]*$/,
        errorMessages.NotificationErrors.INVALID_TITLE_FORMAT
      )
      .min(5, errorMessages.NotificationErrors.SHORT_TITLE)
      .max(50, errorMessages.NotificationErrors.LONG_TITLE)
      .required(errorMessages.NotificationErrors.FORM_REQUIRED),

    message: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s.,?!()-]*$/,
        errorMessages.NotificationErrors.INVALID_MESSAGE_FORMAT
      )
      .min(10, errorMessages.NotificationErrors.SHORT_MESSAGE)
      .max(500, errorMessages.NotificationErrors.LONG_MESSAGE)
      .required(errorMessages.NotificationErrors.FORM_REQUIRED),
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://sanskaarvalley-backend.vercel.app/notifications/${id}`
      );
      toast.success("Notification deleted successfully.");
      fetchNotifications(currentPage); // Refresh notifications list
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification.");
    }
  };

  return (
    <div className="container mx-auto pb-2 font-montserrat">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex justify-between whitespace-nowrap border-b-2 border-[#105183] p-2 mb-4 mt-2">
        <h2 className="text-3xl text-[#105183] uppercase mt-2">
          Notifications
        </h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditId(null); // Make sure editId is reset when creating new notification
          }}
          className="border-2 border-[#105183] px-4 py-2 rounded transition-colors duration-300 hover:bg-[#105183] hover:text-white hover:shadow-lg hover:shadow-[#105183]/50"
        >
          Create New Notification
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center ">
          <LinearProgress color="primary" className="w-full rounded-full" />
        </div>
      ) : notifications.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-lg border mt-4">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-sky-500">
                <tr>
                  <th className="px-6 py-3 font-montserrat">SN</th>
                  <th className="px-6 py-3 font-montserrat">Title</th>
                  <th className="px-6 py-3 font-montserrat">Date</th>
                  <th className="px-6 py-3 font-montserrat">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={notification._id} className="bg-white border-b">
                    <td className="px-6 py-3">{index + 1} .</td>
                    <td className="px-6 py-3">{notification.title}</td>
                    <td className="px-6 py-3">
                      {formatDate(notification.createdAt)}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => {
                          setEditId(notification._id); // Set the ID for editing
                          setIsModalOpen(true);
                        }}
                        className="text-blue-500  mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setNotificationToDelete(notification._id);
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
        </>
      ) : (
        <div className="text-center font-montserrat py-4">
          <img
            src={dataNotFound}
            alt="No data"
            className="flex mx-auto max-w-xs mb-4"
          />
          No notifications found
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-sky-100 border-2 border-[#105183] rounded shadow-lg p-6 w-full sm:w-1/2 md:w-1/2 lg:w-1/2">
            <h3 className="text-xl font-montserrat mb-4 text-center">
              {editId ? "Edit This Notification" : "Create a New Notification"}
            </h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title :
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className="w-full px-2 py-2 border rounded-md mt-2"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message :
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    className="w-full px-2 py-2 border rounded-md mt-2"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="flex justify-end gap-2 items-center p-2">
                  <button
                    type="button"
                    className="border border-gray-300  px-4 py-2 rounded shadow hover:bg-gray hover:text-white"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditId(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-sky-500 text-white px-6 py-2 rounded shadow hover:bg-sky-700"
                  >
                    {editId ? "Update" : "Create"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-[#105183] rounded shadow-lg p-6 w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
            <h3 className="text-xl text-center mb-4">Are you sure?</h3>
            <p className="text-center mb-6">
              You are about to delete this notification.
            </p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-700"
                onClick={() => handleDelete(notificationToDelete)}
              >
                Yes, Delete
              </button>
              <button
                className="border-2 border-gray-300 text-gray-500 px-4 py-2 rounded shadow hover:bg-gray-200"
                onClick={() => setIsDeleteModalOpen(false)}
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

export default Notifications;
