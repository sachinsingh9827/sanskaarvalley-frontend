import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import dataNotFound from "./Images/No data-rafiki.svg";
import { toast, ToastContainer } from "react-toastify";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://sanskaarvalley-backend.vercel.app/contact/get"
      );

      setContacts(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleRowClick = (contact) => {
    setSelectedContact(contact);
    setDetailsModal(true); // Open the details modal when a row is clicked
  };

  const handleDeleteClick = (id) => {
    setDeleteContactId(id);
    setIsDeleteModalOpen(true);
  };
  if (isLoading) {
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
    </div>;
  }
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://sanskaarvalley-backend.vercel.app/contact/contact/${deleteContactId}`
      );
      setIsDeleteModalOpen(false);
      setDeleteContactId(null);
      fetchContacts();
      toast.success("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEditClick = (contact) => {
    setIsEditing(true);
    setIsAddingContact(true);
    setSelectedContact(contact); // Set the selected contact
    formik.setValues(contact); // Populate form fields with contact data
  };

  const formik = useFormik({
    initialValues: {
      address: "",
      mobile: "",
      email: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Address is required"),
      mobile: Yup.string()
        .required("Mobile number is required")
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      facebook: Yup.string()
        .url("Invalid Facebook URL")
        .required("Facebook URL is required"),
      twitter: Yup.string()
        .url("Invalid Twitter URL")
        .required("Twitter URL is required"),
      instagram: Yup.string()
        .url("Invalid Instagram URL")
        .required("Instagram URL is required"),
      linkedin: Yup.string()
        .url("Invalid LinkedIn URL")
        .required("LinkedIn URL is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Check for no changes
        const noChanges =
          isEditing &&
          selectedContact &&
          JSON.stringify(values) === JSON.stringify(selectedContact);

        if (noChanges) {
          toast.error(
            "No changes detected. Please update the form before submitting."
          );
          setIsAddingContact(false);
          return;
        }

        if (isEditing && selectedContact) {
          // Update the contact
          await axios.put(
            `https://sanskaarvalley-backend.vercel.app/contact/contact/${selectedContact._id}`,
            values
          );
          toast.success("Contact updated successfully!");
        } else {
          // Add a new contact
          await axios.post(
            "https://sanskaarvalley-backend.vercel.app/contact/add",
            values
          );
          toast.success("Contact saved successfully!");
        }

        setIsAddingContact(false);
        setIsEditing(false);
        fetchContacts(); // Refresh the contact list
        resetForm(); // Clear the form
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="container mx-auto pb-2 font-montserrat">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between whitespace-nowrap border-b-2 border-[#105183] p-2 mb-4 mt-2">
        <h2 className="text-3xl text-[#105183] uppercase mt-2">
          {isEditing ? "Edit Contact" : "Add New Contact"}
        </h2>
        <button
          onClick={() => {
            setIsAddingContact(!isAddingContact);
            setIsEditing(false);
            setSelectedContact(null);
            formik.resetForm();
          }}
          className="border-2 border-[#105183] hover:bg-[#105183] hover:text-white p-2 rounded-lg hover:shadow-lg hover:shadow-[#105183] transition duration-300 ease-in-out"
        >
          {isAddingContact ? "Back to Contacts" : "Add New Contact"}
        </button>
      </div>
      {isAddingContact ? (
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 border p-4 rounded-lg"
        >
          <h4 className="text-2xl text-[#105183] mb-4 flex justify-center">
            {isEditing ? "Edit Contact" : "Add Contact"}
          </h4>
          {Object.keys(formik.initialValues).map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)} :
              </label>
              <input
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="text-red-500 text-sm">
                  {formik.errors[field]} *
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="flex justify-center border-2 border-[#105183] hover:bg-[#105183] hover:text-white p-2 rounded-lg mb-6 w-full"
          >
            {isEditing ? "Update Contact" : "Add Contact"}
          </button>
        </form>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-sky-500">
              <tr>
                <th className="px-6 py-3">SN.</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Mobile</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts && contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <tr
                    key={contact._id}
                    className=""
                    // Only trigger on row clicks
                  >
                    <td className="px-6 py-3">{index + 1}.</td>
                    <td className="px-6 py-3">{contact.address}</td>
                    <td className="px-6 py-3">{contact.mobile}</td>
                    <td className="px-6 py-3">{contact.email}</td>
                    <td className="px-6 py-3 flex space-x-2">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleRowClick(contact)}
                      >
                        viwe
                      </button>
                      <button
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click event
                          handleEditClick(contact);
                          setIsEditing(true); // Mark editing mode
                          setIsAddingContact(true); // Open the form
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click event
                          handleDeleteClick(contact._id);
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    <div className="flex flex-col items-center">
                      <img
                        src={dataNotFound}
                        alt="No data found"
                        className="w-1/4 mb-4"
                      />
                      <p className="font-montserrat text-gray-600">
                        No Data Found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-sky-100 p-6 rounded-lg border-2 border-[#105183]">
            <h2 className="text-lg mb-4">
              Are you sure you want to delete this contact?
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="border border-gray  px-4 py-2 rounded hover:bg-gray hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {detailsModal && selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg  mw-1/2">
            <h2 className="text-xl text-sky-600 font-semibold mb-4 text-center">
              Contact Details
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-sky-100">
                    <th className="px-4 py-2  text-sky-700 border">Fields</th>
                    <th className="px-4 py-2  text-sky-700 border">Values</th>
                  </tr>
                </thead>
                <tbody className="">
                  {Object.keys(selectedContact).map(
                    (key) =>
                      key !== "_id" &&
                      key !== "__v" &&
                      !key.startsWith("v") && (
                        <tr key={key}>
                          <td className="px-4 py-2 text-[#105183] capitalize border">
                            {key.replace(/([A-Z])/g, " $1")} :
                          </td>
                          <td className="px-4 py-2 text-gray-800 border">
                            {selectedContact[key]}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setDetailsModal(false)}
                className="border-2 border-gray w-full px-4 py-2  rounded hover:bg-gray hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
