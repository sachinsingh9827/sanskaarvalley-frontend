// src/utils/errorMessages.js
export const errorMessages = {
  NotificationErrors: {
    FETCH_NOTIFICATIONS: "Failed to fetch notifications.",
    ADD_NOTIFICATION: "Failed to send notification.",
    DELETE_NOTIFICATION: "Failed to delete notification.",
    DELETE_MULTIPLE_NOTIFICATIONS: "Failed to delete selected notifications.", // For bulk deletion
    FORM_REQUIRED: "Title and message are required.",
    INVALID_TITLE_FORMAT: "Title contains invalid characters.",
    INVALID_MESSAGE_FORMAT: "Message contains invalid characters.",
    SHORT_TITLE: "Title must be at least 5 characters.",
    LONG_TITLE: "Title cannot exceed 50 characters.",
    SHORT_MESSAGE: "Message must be at least 10 characters.",
    LONG_MESSAGE: "Message cannot exceed 500 characters.",
  },

  StudentErrors: {
    FETCH_STUDENTS: "Failed to fetch students.",
    ADD_STUDENT: "Failed to add student.",
    DELETE_STUDENT: "Failed to delete student.",
    UPDATE_STUDENT: "Failed to update student information.",
  },

  TeacherErrors: {
    FETCH_TEACHERS: "Failed to fetch teachers.",
    ADD_TEACHER: "Failed to add teacher.",
    DELETE_TEACHER: "Failed to delete teacher.",
    UPDATE_TEACHER: "Failed to update teacher information.",
  },

  SubjectErrors: {
    FETCH_SUBJECTS: "Failed to load subjects.",
    ADD_SUBJECT: "Failed to add subject.",
    DELETE_SUBJECT: "Failed to delete subject.",
    UPDATE_SUBJECT: "Failed to update subject information.",
    INVALID_SUBJECT_NAME: "Subject name contains invalid characters.",
    SHORT_SUBJECT_NAME: "Subject name must be at least 3 characters.",
    LONG_SUBJECT_NAME: "Subject name cannot exceed 100 characters.",
    SUBJECT_ACTIVE_STATUS: "Failed to update subject's active status.",
    SUBJECT_STATUS_UPDATED_SUCCESSFULLY: "Subject status updated successfully!",
    SUBJECT_CREATED_SUCCESSFULLY: "Subject added successfully!",
    SUBJECT_DELETED_SUCCESSFULLY: "Subject deleted successfully!",
    SUBJECT_DELETE_FAILED: "Failed to delete subject.",
    SUBJECT_SAVE_FAILED: "Failed to save subject.",
    SUBJECT_UPDATED_SUCCESSFULLY: "Subject updated successfully!",
    SUBJECT_FETCH_FAILED: "Failed to fetch subjects.",
  },

  GeneralErrors: {
    NETWORK_ERROR: "Network error. Please check your connection.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    NOT_FOUND: "Requested resource not found.",
    SERVER_ERROR: "An internal server error occurred. Please try again later.",
    FORM_VALIDATION: "Please fill out all required fields correctly.",
  },

  // Add more error categories as needed
};
