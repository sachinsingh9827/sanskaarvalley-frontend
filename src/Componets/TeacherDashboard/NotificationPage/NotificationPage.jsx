import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataNotFound from "../assets/No data-rafiki.svg";
// NotificationModal Component
const NotificationModal = ({
  isOpen,
  onClose,
  onSubmit,
  classes,
  selectedClass,
  setSelectedClass,
  notificationTitle,
  setNotificationTitle,
  notificationMessage,
  setNotificationMessage,
  isEditing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-sky-100 p-4 rounded shadow-lg w-11/12 md:w-1/3 border-2 border-[#105183]">
        <h2 className="flex justify-center text-xl mb-4 text-[#105183]">
          {isEditing ? "Edit Notification" : "Send Notification"}
        </h2>
        <div className="mt-4">
          <label className="block">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          >
            <option value="">-- Select a Class --</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.className}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Notification Title:</label>
          <input
            type="text"
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Enter notification title"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Notification Message:</label>
          <textarea
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Enter notification message"
            rows="4"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onSubmit}
            className="border-2 border-[#105183] px-4 py-2 rounded transition-colors duration-300 hover:bg-[#105183] hover:text-white hover:shadow-lg hover:shadow-[#105183]/50"
          >
            {isEditing ? "Update" : "Send"}
          </button>
          <button
            onClick={onClose}
            className="border-2 border-gray px-4 py-2 rounded transition-colors duration-300 hover:bg-gray hover:text-white hover:shadow-lg hover:shadow-gray/50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg w-11/12 md:w-1/3 border-2 border-[#105183]">
        <h2 className="text-xl mb-4 text-[#105183] text-center">
          Are you sure you want to delete this notification?
        </h2>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-red-600"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// NotificationDashboard Component
const NotificationDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // New state for confirmation modal
  const [selectedClass, setSelectedClass] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null); // To store the index of the notification to delete

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "https://sanskaarvalley-backend.vercel.app/class/active"
        );
        setClasses(response.data.classes || []);
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Failed to load classes.");
      }
    };

    fetchClasses();
  }, []);

  const handleSendNotification = useCallback(() => {
    if (!selectedClass || !notificationTitle || !notificationMessage) {
      toast.error("Please fill in all fields to send a notification.");
      return;
    }

    const newNotification = {
      classId: selectedClass,
      title: notificationTitle,
      message: notificationMessage,
    };

    try {
      if (editIndex !== null) {
        // Simulate updating existing notification
        setNotifications((prev) => {
          const updatedNotifications = [...prev];
          updatedNotifications[editIndex] = newNotification;
          return updatedNotifications;
        });
        toast.success("Notification updated successfully!");
      } else {
        // Simulate sending new notification
        setNotifications((prev) => [...prev, newNotification]);
        toast.success("Notification sent successfully!");
      }
      resetForm();
      setModalOpen(false);
    } catch (error) {
      console.error("Error submitting notification:", error);
      toast.error("Failed to send notification.");
    }
  }, [selectedClass, notificationTitle, notificationMessage, editIndex]);

  const resetForm = () => {
    setSelectedClass("");
    setNotificationTitle("");
    setNotificationMessage("");
    setEditIndex(null);
  };

  const handleDeleteNotification = () => {
    setNotifications((prev) => prev.filter((_, i) => i !== deleteIndex));
    toast.success("Notification deleted successfully!");
    setConfirmationModalOpen(false);
  };

  return (
    <div className="flex h-screen font-montserrat">
      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between p-2 border-b-2 border-[#105183]">
          <h1 className="text-2xl text-center sm:text-left text-[#105183] mb-2 sm:mb-0">
            Notifications
          </h1>
          <button
            onClick={() => setModalOpen(true)}
            className="border-2 border-[#105183] px-4 py-2 rounded transition-colors duration-300 hover:bg-[#105183] hover:text-white hover:shadow-lg hover:shadow-[#105183]/50"
          >
            Send Notification
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border mt-4">
          {notifications.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-[#105183]">
                <tr>
                  <th className="px-6 py-3">SN</th>
                  <th className="px-6 py-3">Class</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-3">{index + 1} .</td>
                    <td className="px-6 py-3">
                      {classes.find(
                        (classItem) => classItem._id === notification.classId
                      )?.className || "Unknown Class"}
                    </td>
                    <td className="px-6 py-3">{notification.title}</td>
                    <td className="px-6 py-3">{notification.message}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => {
                          setEditIndex(index);
                          setSelectedClass(notification.classId);
                          setNotificationTitle(notification.title);
                          setNotificationMessage(notification.message);
                          setModalOpen(true);
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteIndex(index);
                          setConfirmationModalOpen(true);
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center font-montserrat py-2">
              <img
                src={dataNotFound}
                alt="No data"
                className="flex mx-auto max-w-xs "
              />
              No notifications found
            </div>
          )}
        </div>

        <NotificationModal
          isOpen={modalOpen}
          onClose={() => {
            resetForm();
            setModalOpen(false);
          }}
          onSubmit={handleSendNotification}
          classes={classes}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          notificationTitle={notificationTitle}
          setNotificationTitle={setNotificationTitle}
          notificationMessage={notificationMessage}
          setNotificationMessage={setNotificationMessage}
          isEditing={editIndex !== null}
        />

        {/* Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={confirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
          onConfirm={handleDeleteNotification}
        />

        <ToastContainer />
      </div>
    </div>
  );
};

export default NotificationDashboard;
