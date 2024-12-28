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
const UserContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  // Fetch Contacts with Pagination
  const fetchContacts = async (page = 1) => {
    setLoading(true); // Set loading to true when the fetch starts

    try {
      const response = await axios.get(
        `https://sanskaarvalley-backend.vercel.app/user-contact?page=${page}`
      );
      const data = response.data;
      setContacts(data.contacts);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setLoading(false); // Set loading to false when the fetch is complete
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Error fetching contact information");
    }
  };

  // Delete Contact Function
  const handleDelete = async (contactId) => {
    try {
      const response = await axios.delete(
        `https://sanskaarvalley-backend.vercel.app/user-contact/${contactId}`
      );
      if (response.status === 200) {
        toast.success("Contact deleted successfully");
        fetchContacts(currentPage); // Fetch the updated contacts list
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  // Fetch contacts on component mount and page change
  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  // Open/Close Delete Confirmation Modal
  const openModal = (id) => {
    setContactToDelete(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  // PDF Download Function
  const handleDownload = () => {
    const doc = new jsPDF();
    const table = document.getElementById("contact-table");

    doc.setFontSize(16);
    doc.text("SANSKAAR VALLEY SCHOOL USER CONTACT DETAILS", 14, 16);

    const tableRows = [];
    const tableHeaders = [
      "Check",
      "SN",
      "Name",
      "Email",
      "Mobile",
      "Subject",
      "Message",
    ];

    Array.from(
      table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")
    ).forEach((row) => {
      const rowData = ["[ ]"]; // Checkbox placeholder
      Array.from(row.getElementsByTagName("td")).forEach((cell) => {
        rowData.push(cell.innerText);
      });
      tableRows.push(rowData);
    });

    doc.autoTable({
      startY: 20,
      head: [tableHeaders],
      body: tableRows,
      theme: "striped",
      didDrawPage: (data) => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(
          `Page ${pageCount}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    });

    doc.save("sanskaarvalley-user-contacts.pdf");
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="flex justify-between whitespace-nowrap border-b-2 border-sky-500 pb-2">
        <h2 className="text-4xl text-sky-600 ">Contacts</h2>
        <button
          onClick={handleDownload}
          className={`border-2 border-sky-500 font-montserrat text-black px-4 py-2 rounded transition-colors duration-300 ${
            contacts.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500/50"
          }`}
          disabled={contacts.length === 0}
        >
          <CiSaveDown2 />
        </button>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto rounded-lg border mt-4">
          <table
            id="contact-table"
            className="w-full text-sm text-left text-gray-500"
          >
            <thead className="text-xs text-white uppercase bg-sky-500">
              <tr>
                <th className="px-2 py-3 font-montserrat">SN.</th>
                <th className="px-6 py-3 font-montserrat">Name</th>
                <th className="px-6 py-3 font-montserrat">Email</th>
                <th className="px-6 py-3 font-montserrat">Mobile</th>
                <th className="px-6 py-3 font-montserrat">Subject</th>
                <th className="px-6 py-3 font-montserrat">Message</th>
                <th className="px-6 py-3 font-montserrat">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={contact.id} className="bg-white border-b">
                  <td className="px-2 py-2 font-montserrat">{index + 1}.</td>
                  <td className="px-6 py-3 font-montserrat">{contact.name}</td>
                  <td className="px-6 py-3 font-montserrat">{contact.email}</td>
                  <td className="px-6 py-3 font-montserrat">
                    {contact.mobile}
                  </td>
                  <td className="px-6 py-3 font-montserrat">
                    {contact.subject}
                  </td>
                  <td className="px-6 py-2 font-montserrat">
                    {contact.message}
                  </td>
                  <td className="px-6 py-2 border-b text-sm text-gray-800">
                    <button
                      onClick={() => openModal(contact._id)}
                      className="font-montserrat text-red-500 px-4 py-1 rounded"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {contacts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
        {contacts.length === 0 && contacts.length === 0 && (
          <div className="text-center font-montserrat py-4">
            <img
              src={noContacts}
              alt="No contacts"
              className="flex mx-auto text-center max-w-xs mb-4"
            />
            No contacts found
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-sky-100 border-2 border-sky-500 rounded shadow-lg p-6 w-96">
            <h3 className="text-xl font-montserrat mb-4 text-center">
              Are you sure you want to delete this contact?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  handleDelete(contactToDelete);
                  closeModal();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded font-montserrat hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-black font-montserrat border-2 border-gray rounded hover:bg-gray-400"
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
