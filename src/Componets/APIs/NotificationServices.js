import axios from "axios";
import { toast } from "react-toastify";
import { errorMessages } from "../../utils/errorMessages"; // Adjust the import path
import { BASE_URL } from "../APIs/Api"; // Adjust the import path

// Fetch notifications
const fetchNotifications = async (
  page,
  setNotifications,
  setTotalPages,
  setCurrentPage
) => {
  try {
    const response = await axios.get(
      BASE_URL.Notifications.FETCH_NOTIFICATIONS,
      {
        params: {
          page,
          limit: 10,
        },
      }
    );
    console.log("API response:", response.data);

    if (response.data && Array.isArray(response.data.notifications)) {
      // Call state setters to update the component's state
      setNotifications(response.data.notifications); // Set notifications state
      setTotalPages(response.data.totalPages || 1); // Default to 1 if totalPages is not available
      setCurrentPage(page); // Update current page state
    } else {
      toast.error(errorMessages.NotificationErrors.FETCH_NOTIFICATIONS);
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    toast.error(errorMessages.NotificationErrors.FETCH_NOTIFICATIONS);
  }
};

// Create notification
const addNotification = async (notificationData) => {
  try {
    const response = await axios.post(
      BASE_URL.Notifications.CREATE_NOTIFICATION,
      notificationData
    );
    console.log("Notification added:", response.data);
  } catch (error) {
    console.error("Error adding notification:", error);
    toast.error(errorMessages.NotificationErrors.ADD_NOTIFICATION);
  }
};

// Delete notification
const deleteNotification = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL.Notifications.DELETE_NOTIFICATION}/${id}`
    );
    console.log("Notification deleted:", response.data);
  } catch (error) {
    console.error("Error deleting notification:", error);
    toast.error(errorMessages.NotificationErrors.DELETE_NOTIFICATION);
  }
};

export { fetchNotifications, addNotification, deleteNotification };
