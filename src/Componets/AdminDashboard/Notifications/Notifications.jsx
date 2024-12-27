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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      let response;
      if (editId) {
        response = await axios.put(
          `https://sanskaarvalley-backend.vercel.app/notifications/${editId}`,
          values
        );
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === editId ? response.data : notification
          )
        );
        toast.success("Notification updated successfully!");
      } else {
        response = await axios.post(
          "https://sanskaarvalley-backend.vercel.app/notifications",
          values
        );
        setNotifications((prev) => [...prev, response.data]);
        toast.success("Notification created successfully!");
      }
      resetForm();
      setIsModalOpen(false);
      setEditId(null);
      setTimeout(() => fetchNotifications(currentPage), 1000); // Refetch notifications after a delay
    } catch (error) {
      console.error("Error saving notification:", error);
      toast.error("Failed to save notification.");
    }
  };

  const handleEdit = (notification) => {
    setIsModalOpen(true);
    setEditId(notification._id);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://sanskaarvalley-backend.vercel.app/notifications/${id}`
      );
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
      toast.success("Notification deleted successfully!");
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification.");
    }
  };

  const openDeleteModal = (notification) => {
    setNotificationToDelete(notification);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setNotificationToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="p-5 mb-8 font-montserrat">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between border-b-2 p-2">
        <h2 className="text-4xl  text-sky-600 ">Notifications</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditId(null);
          }}
          className="flex font-montserrat p-2 border-2 border-sky-500 text-black rounded hover:bg-sky-500 hover:text-white hover:border-sky-500  hover:shadow-md hover:shadow-sky-500"
        >
          Send Notification
        </button>
      </div>

      {/* Modal for Create/Edit Notification */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-sky-200   rounded shadow-lg p-6 w-1/2">
            <h3 className="flex justify-center text-xl font-montserrat mb-4">
              {editId ? "Edit Notification" : "New Notification"}
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
                      Title:
                      <Field
                        type="text"
                        name="title"
                        className="px-2 font-montserrat block w-full rounded-md border"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-black font-montserrat">
                      Message:
                      <Field
                        as="textarea"
                        name="message"
                        className="px-2 font-montserrat block w-full rounded-md border"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="mr-2 px-4 py-2 font-montserrat border-2 border-gray text-black rounded hover:bg-gray hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 font-montserrat border-2 border-sky-500 text-black rounded hover:bg-sky-500 hover:text-white"
                    >
                      {editId ? "Update Notification" : "Send Notification"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && notificationToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-sky-100 border-2 border-sky-500 rounded shadow-lg p-6 w-96">
            <h3 className="text-xl font-montserrat mb-4 text-center">
              Are you sure you want to delete this notification -
              <span className="text-red-500 ">
                {notificationToDelete.title}
              </span>{" "}
              ?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  handleDelete(notificationToDelete._id);
                  closeDeleteModal();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded font-montserrat hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-black font-montserrat border-2 border-gray rounded hover:bg-gray hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Table */}
      {Array.isArray(notifications) && notifications.length > 0 ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto rounded-lg border mt-4">
            <table className="w-full text-sm font-montserrat text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-sky-500">
                <tr>
                  <th className="px-6 py-3">SN.</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={notification._id} className="bg-white border-b">
                    <td className="px-6 py-3 font-montserrat">{index + 1}.</td>
                    <td className="px-6 py-3 font-montserrat">
                      {notification.title}
                    </td>
                    <td className="px-6 py-3 font-montserrat">
                      {notification.message}
                    </td>
                    <td className="px-6 py-3 font-montserrat">
                      {formatDate(notification.createdAt)}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleEdit(notification)}
                        className="mr-2 text-blue-500"
                      >
                        <FaPen />
                      </button>
                      <button
                        onClick={() => openDeleteModal(notification)}
                        className="text-red-500"
                      >
                        <FaTrash />
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
            onPageChange={(page) => fetchNotifications(page)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src={dataNotFound}
            alt="No notifications found"
            className="max-w-xs mb-4"
          />
          <p className="text-center font-montserrat">No Notifications Found</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
