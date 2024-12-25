import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noDataFound from "./Images/No data-rafiki.svg";

// Function to download selected applications in PDF format
const downloadPDF = (selectedApplications) => {
  const doc = new jsPDF();

  // Set document title
  doc.setFontSize(16);
  doc.text("Selected Job Applications", 20, 10);

  // Add table headers
  doc.setFontSize(12);
  doc.text("Name", 20, 20);
  doc.text("Email", 60, 20);
  doc.text("Mobile", 120, 20);

  // Add a line for separation between headers and data
  doc.line(20, 22, 180, 22);

  // Add application data with proper row spacing
  selectedApplications.forEach((app, index) => {
    const yPosition = 30 + index * 10;
    doc.text(app.name, 20, yPosition);
    doc.text(app.email, 60, yPosition);
    doc.text(app.mobile, 120, yPosition);
  });

  // Add space after last row
  const totalRows = selectedApplications.length;
  const lastRowYPosition = 30 + totalRows * 10;
  doc.line(20, lastRowYPosition + 2, 180, lastRowYPosition + 2); // Line after the last row

  // Save PDF
  doc.save("selected_applications.pdf");

  // Show success toast
  toast.success("PDF downloaded successfully!");
};

const JobApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [statusMap, setStatusMap] = useState({}); // Store status of each application
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Fetch all job applications
  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/career");
      setApplications(response.data.applications);

      // Initialize statusMap with the current status of each application
      const initialStatusMap = response.data.applications.reduce((map, app) => {
        map[app._id] = app.status; // Use the application's current status
        return map;
      }, {});
      setStatusMap(initialStatusMap); // Set the statusMap with initial values

      setLoading(false);
    } catch (err) {
      setError("Failed to load applications.");
      setLoading(false);
      toast.error("Failed to load applications.");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle Select All checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedApplications(applications.map((app) => app._id));
    } else {
      setSelectedApplications([]);
    }
  };

  // Handle individual application selection
  const handleSelectApplication = (id) => {
    setSelectedApplications((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((appId) => appId !== id)
        : [...prevSelected, id]
    );
  };

  // Show the delete confirmation modal
  const handleShowDeleteModal = () => {
    setShowModal(true);
  };

  // Confirm deletion of selected applications
  const handleConfirmDelete = async () => {
    if (selectedApplications.length === 0) {
      toast.error("No applications selected to delete.");
      return;
    }

    try {
      const response = await axios.delete(
        "http://localhost:5000/career/delete",
        {
          data: { ids: selectedApplications }, // Send the array in the data field
        }
      );

      if (response.data.success) {
        setApplications((prevApplications) =>
          prevApplications.filter(
            (app) => !selectedApplications.includes(app._id)
          )
        );
        setSelectedApplications([]);
        setShowModal(false);
        toast.success(
          response.data.message || "Selected applications deleted successfully!"
        );
      } else {
        toast.error(
          response.data.message || "Failed to delete selected applications."
        );
      }
    } catch (err) {
      toast.error("Failed to delete selected applications.");
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setShowModal(false); // Close the modal
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/career/status/${id}`,
        { status: newStatus }
      );

      if (response.data.success) {
        // Update the statusMap with the new status for the specific application ID
        setStatusMap((prev) => ({
          ...prev,
          [id]: newStatus, // Update the specific application by ID
        }));

        // Also update the application's status in the applications array
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app
          )
        );

        toast.success("Status updated successfully!");
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  // Filter applications that are shortlisted
  const shortlistedApplications = applications.filter(
    (app) => app.status === "Shortlisted"
  );

  if (loading)
    return (
      <p className="text-center font-montserrat">Loading applications...</p>
    );
  if (error)
    return (
      <p className="error flex flex-col text-center font-montserrat ">
        <img src={noDataFound} alt="noDataFound" className="w-1/2 mx-auto" />
        {error}
      </p>
    );

  return (
    <div className="p-4 font-montserrat">
      <h1 className="flex justify-center text-3xl font-bold text-[#105183]">
        Job Applications
      </h1>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={
              applications.length > 0 &&
              selectedApplications.length === applications.length
            }
          />
          <span className="ml-2">Select All</span>
        </div>
        <div>
          <button
            className={
              selectedApplications.length > 0
                ? "bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                : "bg-red-300 text-white px-4 py-2 rounded-md mr-2 cursor-not-allowed"
            }
            onClick={handleShowDeleteModal} // Show confirmation modal
            disabled={selectedApplications.length === 0} // Disable if no applications are selected
          >
            Delete Selected
          </button>
          <button
            className={
              shortlistedApplications.length > 0 &&
              selectedApplications.length > 0
                ? "bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                : "bg-green-300 text-white px-4 py-2 rounded-md mr-2 cursor-not-allowed"
            }
            onClick={() => {
              // Filter shortlisted applications that are selected
              const filteredShortlistedApplications =
                shortlistedApplications.filter(
                  (app) => selectedApplications.includes(app._id) // Ensure selectedApplications contains the application ID
                );
              downloadPDF(filteredShortlistedApplications); // Pass the filtered applications to the PDF download function
            }}
            disabled={selectedApplications.length === 0} // Disable if no selected applications
          >
            Download Shortlisted (PDF)
          </button>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => downloadPDF(applications)} // Download all applications
          >
            Download All (PDF)
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="overflow-x-auto rounded-lg border mt-4">
        <table className="w-full text-sm text-left text-gray-800 font-montserrat">
          <thead className="text-xs text-white uppercase bg-sky-500">
            <tr>
              <th scope="col" className="py-3 px-6"></th>
              <th className="py-3 px-4 text-left text-white">SN.</th>
              <th className="py-3 px-4 text-left text-white">Name</th>
              <th className="py-3 px-4 text-left text-white">Email</th>
              <th className="py-3 px-4 text-left text-white">Mobile</th>
              <th className="py-3 px-4 text-left text-white">Position</th>
              <th className="py-3 px-4 text-left text-white">Applied Date</th>
              <th className="py-3 px-4 text-left text-white">Status</th>
              <th className="py-3 px-4 text-left text-white">Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr key={app._id}>
                  <td className="py-2 px-2">
                    <input
                      type="checkbox"
                      checked={selectedApplications.includes(app._id)} // Match against application ID
                      onChange={() => handleSelectApplication(app._id)} // Pass app._id for correct selection
                    />
                  </td>
                  <td className="py-2 px-2">{index + 1}.</td>
                  <td className="py-2 px-2">{app.name}</td>
                  <td className="py-2 px-2">{app.email}</td>
                  <td className="py-2 px-2">{app.mobile}</td>
                  <td className="py-2 px-2">{app.position}</td>
                  <td className="py-2 px-2">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-2 px-2">
                    <select
                      value={statusMap[app._id] || app.status} // Use statusMap if available, fallback to app.status
                      onChange={(e) =>
                        handleStatusChange(app._id, e.target.value)
                      } // Pass app._id for correct mapping
                      className={`
      ${
        app.status === "Pending"
          ? "bg-yellow-200 border-2 border-yellow-500"
          : ""
      }
      ${
        app.status === "Shortlisted"
          ? "bg-green-200 border-2 border-green-500"
          : ""
      }
      ${app.status === "Rejected" ? "bg-red-200 border-2 border-red-500" : ""}
      ${
        !["Pending", "Shortlisted", "Rejected"].includes(app.status)
          ? "bg-gray-200"
          : ""
      } 
      bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    `}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="">
                    {app.resume ? (
                      <a
                        href={`http://localhost:5000/career/download/${app.resume
                          .split("/")
                          .pop()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="border-2 mr-2 border-sky-300  rounded">
                          Download Resume
                        </button>
                      </a>
                    ) : (
                      <span>No Resume Available</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <img
                    src={noDataFound}
                    alt="No data found"
                    className="w-1/3 mx-auto"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete the selected applications?
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
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

export default JobApplicationsPage;
