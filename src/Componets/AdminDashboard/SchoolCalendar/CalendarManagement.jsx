import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../Reusable/Pagination";
import dataNotFound from "./Images/No data-rafiki.svg";
const CalendarManagement = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch events from the API
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://sanskaarvalley-backend.vercel.app/school-calendar"
      );
      setEvents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Event title is required"),
    type: Yup.string().required("Event type is required"),
    dates: Yup.array()
      .of(Yup.date().required("Date is required"))
      .min(1, "At least one date is required"),
  });

  // Handle adding/updating events
  const handleSubmit = async (values, { resetForm }) => {
    const eventData = {
      title: values.title,
      dates: values.dates.map((date) => new Date(date).toISOString()), // Convert to ISO format
      type: values.type,
    };

    try {
      setIsLoading(true); // Set loading state to true

      if (editingEvent) {
        // Update existing event
        await axios.put(
          `https://sanskaarvalley-backend.vercel.app/school-calendar/${editingEvent._id}`,
          eventData
        );
        toast.success("Event updated successfully");
      } else {
        // Add new event
        await axios.post(
          "https://sanskaarvalley-backend.vercel.app/school-calendar",
          eventData
        );
        toast.success("Event added successfully");
      }

      resetForm();
      setIsModalOpen(false); // Close the modal
      fetchEvents(currentPage); // Fetch events for the current page after submitting
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("Error saving event");
      setIsLoading(false); // Set loading state to false in case of error
    }
  };

  // Handle deleting an event
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://sanskaarvalley-backend.vercel.app/school-calendar/${id}`
      );
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event");
    }
  };

  // Handle editing an event
  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true); // Open the modal for editing
  };

  // Open delete confirmation modal
  const openDeleteConfirm = (event) => {
    setEventToDelete(event);
    setIsDeleteConfirmOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setEventToDelete(null);
  };
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
  //     </div>
  //   );
  // }
  return (
    <div className="container mx-auto pb-2 font-montserrat">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between p-2 border-b-2 border-[#105183]">
        <h2 className="text-3xl text-[#105183] uppercase mt-2">
          Existing Events
        </h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingEvent(null); // Reset for new event
          }}
          className="border-2 border-[#105183] hover:bg-[#105183] hover:text-white p-2 rounded-lg hover:shadow-lg hover:shadow-[#105183] transition duration-300 ease-in-out"
        >
          Add New Event
        </button>
      </div>

      {/* Modal for Adding/Editing Event */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="flex justify-center text-sky-600 text-2xl font-bold mb-4">
              {editingEvent ? "Edit Event" : "Add Event"}
            </h2>
            <Formik
              initialValues={{
                title: editingEvent ? editingEvent.title : "",
                type: editingEvent ? editingEvent.type : "event",
                dates: editingEvent
                  ? editingEvent.dates.map((date) => date.split("T")[0])
                  : [""], // Convert to YYYY-MM-DD format
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="mb-4">
                    <label
                      className="block text-sky-600 text-lg font-semibold mb-2"
                      htmlFor="title"
                    >
                      Event Title :
                    </label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sky-600 text-lg font-semibold mb-2"
                      htmlFor="type"
                    >
                      Event Type :
                    </label>
                    <Field
                      as="select"
                      name="type"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      <option value="event">Event</option>
                      <option value="holiday">Holiday</option>
                    </Field>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4 border border-sky-500 p-2 rounded">
                    <label className="block text-sky-600 text-lg font-semibold mb-2">
                      Event Dates
                    </label>
                    {values.dates.map((date, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Field
                          type="date"
                          name={`dates[${index}]`}
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newDates = values.dates.filter(
                              (_, i) => i !== index
                            );
                            setFieldValue("dates", newDates);
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue("dates", [...values.dates, ""])
                      }
                      className="w-full p-2 border-2 border-sky-500 rounded-full hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-md hover:shadow-sky-500"
                    >
                      Add Date
                    </button>
                    <ErrorMessage
                      name="dates"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="border-2 border-green-500 py-2 px-4 rounded hover:bg-green-500 hover:text-white"
                    >
                      {editingEvent ? "Update Event" : "Add Event"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="border-2 border-gray py-2 px-4 rounded hover:bg-gray hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete the event{" "}
              <span className="text-red-500 uppercase">
                {eventToDelete?.title}
              </span>{" "}
              ?
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={closeDeleteConfirm}
                className="mr-2 border rounded py-2 px-4 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(eventToDelete._id);
                  closeDeleteConfirm();
                }}
                className="bg-red-500 text-white rounded py-2 px-4"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src={dataNotFound}
            alt="No notifications found"
            className="max-w-xs mb-4"
          />
          <p className="text-center font-montserrat">No Events Found</p>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto rounded-lg border mt-2">
            <table className="w-full text-sm font-montserrat text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-sky-500">
                <tr className="bg-gray-200">
                  <th className="px-6 py-3">SN.</th>
                  <th className="px-6 py-3">Event Title</th>
                  <th className="px-6 py-3">Event Type</th>
                  <th className="px-6 py-3">Event Dates</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event._id} className="hover:bg-gray-100">
                    <td className="px-6 py-3">{index + 1}.</td>
                    <td className="px-6 py-3">{event.title}</td>
                    <td
                      className={`px-6 py-3 ${
                        event.type === "holiday"
                          ? "text-red-500 font-bold"
                          : event.type === "event"
                          ? "text-green-500 font-bold"
                          : ""
                      }`}
                    >
                      {event.type}
                    </td>

                    <td className="px-6 py-3">
                      {event.dates
                        .map((date) => new Date(date).toLocaleDateString())
                        .join(", ")}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleEdit(event)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(event)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{" "}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => fetchEvents(page)}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarManagement;
