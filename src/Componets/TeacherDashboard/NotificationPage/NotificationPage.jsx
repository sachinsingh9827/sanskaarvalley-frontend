import React, { useState } from "react";
import axios from "axios";

const NotificationPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClass || !title || !text) {
      setMessage("All fields are required");
      return;
    }

    axios
      .post("http://localhost:5000/api/send-notification", {
        selectedClass,
        title,
        text,
      })
      .then((response) => {
        setMessage("Notification sent successfully!");
        setTitle("");
        setText("");
      })
      .catch((error) => {
        setMessage("Error sending notification");
        console.error(error);
      });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-2xl mb-4">Send Notification</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="class"
            className="block text-sm font-medium text-gray-700"
          >
            Select Class
          </label>
          <select
            id="class"
            name="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          >
            <option value="">Select a Class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Notification Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Notification Text
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Send Notification
        </button>
      </form>

      {message && (
        <div className="mt-4 p-2 text-center text-sm">
          <span
            className={
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }
          >
            {message}
          </span>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
