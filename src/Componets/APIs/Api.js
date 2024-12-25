// src/utils/apiUrls.js
export const BASE_URL = {
  Notifications: {
    FETCH_NOTIFICATIONS: "http://localhost:5000/notifications",
    CREATE_NOTIFICATION: "http://localhost:5000/notifications",
    UPDATE_NOTIFICATION: "http://localhost:5000/notifications",
    DELETE_NOTIFICATION: "http://localhost:5000/notifications",
  },
  Students: {
    FETCH_STUDENTS: "http://localhost:5000/students",
    CREATE_STUDENT: "http://localhost:5000/students",
    UPDATE_STUDENT: "http://localhost:5000/students",
    DELETE_STUDENT: "http://localhost:5000/students",
  },
  Teachers: {
    FETCH_TEACHERS: "http://localhost:5000/teachers",
    CREATE_TEACHER: "http://localhost:5000/teachers",
    UPDATE_TEACHER: "http://localhost:5000/teachers",
    DELETE_TEACHER: "http://localhost:5000/teachers",
  },
  // Add more URLs as needed
};
