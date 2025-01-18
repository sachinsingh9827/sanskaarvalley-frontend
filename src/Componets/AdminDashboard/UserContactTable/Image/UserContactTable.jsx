import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Pagination from "../../../Reusable/Pagination";
import noContacts from "./Image/No data-rafiki.svg";
import { CiSaveDown2 } from "react-icons/ci";
import { LinearProgress } from "@mui/material";

const UserContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch Contacts with Pagination
  const fetchContacts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://sanskaarvalley-backend.vercel.app/user-contact?page=${page}`
      );
      console.log(response.data); // Log the response to check the structure
      const data = response.data;
      setContacts(data.contacts);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Error fetching contact information");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchContacts(currentPage);
    }, 15000);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [currentPage]);

  // Delete Contact Function
  const handleDeleteContact = async () => {
    try {
      await axios.delete(
        `https://sanskaarvalley-backend.vercel.app/user-contact/${contactToDelete}`
      );
      toast.success("Contact deleted successfully");
      fetchContacts(currentPage); // Refresh the contacts list after deletion
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Error deleting contact");
    }
  };

  // Export contacts to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["ID", "Name", "Phone", "Email"]],
      body: contacts.map((contact, index) => [
        index + 1,
        contact.name,
        contact.mobile,
        contact.email,
      ]),
    });
    doc.save("contacts.pdf");
  };

  useEffect(() => {
    fetchContacts(); // Fetch contacts when the component mounts
  }, []);

  return (
    <div className="container mx-auto pb-2 max-w-full font-montserrat">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex justify-between whitespace-nowrap border-b-2 border-[#105183] p-2 mb-4 mt-2">
        <h2 className="text-3xl text-[#105183] uppercase mt-2">
          User Contacts
        </h2>
        <button
          onClick={handleExportPDF}
          className="border-2 border-[#105183] px-4 py-2 rounded transition-colors duration-300 hover:bg-[#105183] hover:text-white hover:shadow-lg hover:shadow-[#105183]/50 flex items-center"
        >
          <CiSaveDown2 className="mr-2" /> Export to PDF
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <LinearProgress color="primary" className="w-full rounded-full" />
        </div>
      ) : contacts.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-lg border mt-4">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-sky-500">
                <tr>
                  <th className="px-6 py-3 font-montserrat">ID</th>
                  <th className="px-6 py-3 font-montserrat">Name</th>
                  <th className="px-6 py-3 font-montserrat">Phone</th>
                  <th className="px-6 py-3 font-montserrat">Email</th>
                  <th className="px-6 py-3 font-montserrat">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={contact._id} className="bg-white border-b">
                    <td className="px-6 py-3">{index + 1} .</td>
                    <td className="px-6 py-3">{contact.name}</td>
                    <td className="px-6 py-3">{contact.mobile}</td>
                    <td className="px-6 py-3">{contact.email}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => {
                          setContactToDelete(contact._id);
                          setIsModalOpen(true);
                        }}
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
            onPageChange={(page) => fetchContacts(page)}
          />
        </>
      ) : (
        <div className="text-center font-montserrat py-4">
          <img
            src={noContacts}
            alt="No data"
            className="flex mx-auto max-w-xs mb-4"
          />
          No contacts found
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-[#105183] rounded shadow-lg p-6 w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
            <h3 className="text-xl text-center mb-4">Are you sure?</h3>
            <p className="text-center mb-6">
              You are about to delete this contact.
            </p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-700"
                onClick={handleDeleteContact}
              >
                Yes, Delete
              </button>
              <button
                className="border-2 border-gray-300 text-gray-500 px-4 py-2 rounded shadow hover:bg-gray-200"
                onClick={() => setIsModalOpen(false)}
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

export default UserContactTable;
