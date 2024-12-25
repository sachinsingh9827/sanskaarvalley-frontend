import React, { useState, useEffect } from "react";
import axios from "axios";
import dataNotFound from "./Image/No data-rafiki.svg";
import { FormControlLabel, styled, Switch } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SchoolClasses = () => {
  const [classes, setClasses] = useState([]); // To hold classes data from the API
  const [selectedClass, setSelectedClass] = useState(null); // To store the selected class
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To handle any errors
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "200ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "skyblue",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 200,
      }),
    },
  }));

  // Fetch classes from the API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/class"); // Replace with your API endpoint
        setClasses(response.data); // Assuming the API response contains an array of classes
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch classes. Please try again.");
        setLoading(false);
        console.error("Error fetching classes:", err); // Log error for debugging
      }
    };

    fetchClasses();
  }, []); // Empty dependency array means this runs once after component mounts

  const openDeleteModal = (classInfo) => {
    setSelectedClass(classInfo);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setSelectedClass(null);
    setShowDeleteModal(false);
  };

  const handleDelete = (classInfo) => {
    axios
      .delete(`http://localhost:5000/class/${classInfo._id}`)
      .then(() => {
        setClasses((prevClasses) =>
          prevClasses.filter((classItem) => classItem._id !== classInfo._id)
        );
        setShowDeleteModal(false);
        toast.success("Class deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting class:", error);
        toast.error("Failed to delete class.");
      });
  };

  const handleEdit = (classInfo) => {
    navigate("/admin/add-class", {
      state: { classData: classInfo },
    });
  };

  const toggleActiveStatus = async (classId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the current status
      await axios.put(`http://localhost:5000/class/toggle-status/${classId}`, {
        isActive: updatedStatus,
      });

      setClasses((prevClasses) =>
        prevClasses.map((classInfo) =>
          classInfo._id === classId
            ? { ...classInfo, isActive: updatedStatus }
            : classInfo
        )
      );
      toast.success("Status updated successfully.");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        Loading classes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <img
          src={dataNotFound}
          alt="No classes found"
          className="max-w-xs mb-4"
        />
        <p className="text-center font-montserrat">No Classes Found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 bg-gray-100 font-montserrat">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between border-b-2 p-2">
        <h1 className="text-3xl font-montserrat text-center text-gray-800 mb-6">
          School Classes
        </h1>
        <Link to="/admin/add-class">
          <button className="flex p-2 border-2 border-sky-500 text-black rounded hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500">
            Add Class
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg border mt-4">
        <table className="w-full text-sm text-left text-gray-800 font-montserrat">
          <thead className="text-xs text-white uppercase bg-sky-500">
            <tr>
              <th className="py-3 px-4 text-left text-white">SN.</th>
              <th className="py-3 px-4 text-left text-white">Class Name</th>
              <th className="py-3 px-4 text-left text-white">Section</th>
              <th className="py-3 px-4 text-left text-white">Class Status</th>
              <th className="py-3 px-4 text-left text-white">Subjects</th>
              <th className="py-3 px-4 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classInfo, index) => (
              <tr key={classInfo._id}>
                <td className="py-3 px-4 border-b border-gray-200">
                  {index + 1}.
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  Class {classInfo.className}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {classInfo.section}
                </td>
                <td className="px-6 py-3 font-montserrat border-b border-gray-200">
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        checked={classInfo.isActive}
                        onChange={() =>
                          toggleActiveStatus(classInfo._id, classInfo.isActive)
                        }
                      />
                    }
                    label=""
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {classInfo.subjects.map((subject, i) => (
                    <span key={i}>
                      {subject.name}
                      {i < classInfo.subjects.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 mr-2 cursor-not-allowed"
                    // onClick={() => handleEdit(classInfo)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 "
                    onClick={() => openDeleteModal(classInfo)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-md shadow-md w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this class?
            </h3>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(selectedClass)}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={closeModal}
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

export default SchoolClasses;
