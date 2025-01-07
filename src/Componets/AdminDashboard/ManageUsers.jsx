import React, { useState, useEffect } from "react";

const ManageUser = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Fetch teachers (simulated API call)
  useEffect(() => {
    const fetchTeachers = async () => {
      // Simulated API response
      const data = [
        { id: 1, name: "John Doe", status: "Active" },
        { id: 2, name: "Jane Smith", status: "Inactive" },
      ];
      setTeachers(data);
      setLoading(false);
    };

    fetchTeachers();
  }, []);

  // Toggle status between Active/Inactive
  const toggleStatus = (id) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === id
          ? {
              ...teacher,
              status: teacher.status === "Active" ? "Inactive" : "Active",
            }
          : teacher
      )
    );
    setIsModalOpen(false); // Close the modal after confirming the action
  };

  // Open the confirmation modal
  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  if (loading) {
    return <div className="text-center mt-6">Loading teachers...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-montserrat">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Teachers</h1>
      <div className="bg-white shadow rounded p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="border px-4 py-2">{teacher.id}</td>
                <td className="border px-4 py-2">{teacher.name}</td>
                <td className="border px-4 py-2">{teacher.status}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => openModal(teacher)}
                    className={`px-4 py-2 rounded ${
                      teacher.status === "Active"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {teacher.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-6 w-1/3">
            <h3 className="text-xl font-bold text-center mb-4">
              Are you sure?
            </h3>
            <p className="mb-6 text-center">
              You are about to change the status of {selectedTeacher?.name} to{" "}
              {selectedTeacher?.status === "Active" ? "Inactive" : "Active"}.
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-2 px-4 py-2 font-montserrat border-2 border-gray-500 text-black rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toggleStatus(selectedTeacher.id);
                }}
                className="px-4 py-2 font-montserrat border-2 border-red-500 text-black rounded hover:bg-red-500 hover:text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
