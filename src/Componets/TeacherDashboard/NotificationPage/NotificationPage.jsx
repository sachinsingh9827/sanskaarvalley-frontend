import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <div className="bg-sky-100 p-4 rounded shadow-lg w-11/12 md:w-1/2 border-2 border-[#105183]">
        <h2 className="flex justify-center text-xl font-mont mb-4 text-[#105183]">
          {isEditing ? "Edit Notification" : "Send Notification"}
        </h2>
        <div className="mt-4">
          <label className="block ">Select Class:</label>
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

const NotificationDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);

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

    if (editIndex !== null) {
      setNotifications((prev) => {
        const updatedNotifications = [...prev];
        updatedNotifications[editIndex] = newNotification;
        return updatedNotifications;
      });
      toast.success("Notification updated successfully!");
    } else {
      setNotifications((prev) => [...prev, newNotification]);
      toast.success("Notification sent successfully!");
    }

    resetForm();
    setModalOpen(false);
  }, [selectedClass, notificationTitle, notificationMessage, editIndex]);

  const resetForm = () => {
    setSelectedClass("");
    setNotificationTitle("");
    setNotificationMessage("");
    setEditIndex(null);
  };

  return (
    <div className="flex font-sans h-screen font-montserrat">
      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-montserrat text-center mb-4">
          Notifications
        </h1>
        <table className="min-w-full mt-4 bg-white border border-gray-300 font-montserrat">
          <thead>
            <tr>
              <th className="border px-4 py-2">Class ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1} .</td>
                <td className="border px-4 py-2">{notification.title}</td>
                <td className="border px-4 py-2">{notification.message}</td>
                <td className="border px-4 py-2">
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
                    onClick={() =>
                      setNotifications((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Notification
        </button>
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default NotificationDashboard;
