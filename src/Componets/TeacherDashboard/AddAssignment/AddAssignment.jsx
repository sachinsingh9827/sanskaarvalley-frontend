import React, { useState } from "react";

const AddAssignment = () => {
  const [assignments, setAssignments] = useState([
    { name: "", dueDate: "", subject: "", description: "", file: null },
  ]);

  const handleInputChange = (index, event) => {
    const values = [...assignments];
    values[index][event.target.name] = event.target.value;
    setAssignments(values);
  };

  const handleFileChange = (index, event) => {
    const values = [...assignments];
    values[index].file = event.target.files[0];
    setAssignments(values);
  };

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { name: "", dueDate: "", subject: "", description: "", file: null },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(assignments);
    // You can add logic to handle form submission here (e.g., API call)
  };

  return (
    <div className="container mx-auto p-4 font-montserrat">
      <div className="flex flex-col sm:flex-row justify-between p-2 border-b-2 border-[#105183]">
        <h1 className="text-2xl text-center sm:text-left text-[#105183] mb-2 sm:mb-0">
          Add Assignment
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        {assignments.map((assignment, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-gray-300 rounded-lg"
          >
            <label className="block mb-2">Assignment Name</label>
            <input
              type="text"
              name="name"
              value={assignment.name}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />

            <label className="block mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={assignment.dueDate}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />

            <label className="block mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={assignment.subject}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />

            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={assignment.description}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              rows="4"
            ></textarea>

            <label className="block mb-2">File Upload</label>
            <input
              type="file"
              name="file"
              onChange={(e) => handleFileChange(index, e)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addAssignment}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
        >
          Add More Assignment
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
        >
          Submit Assignments
        </button>
      </form>
    </div>
  );
};

export default AddAssignment;
