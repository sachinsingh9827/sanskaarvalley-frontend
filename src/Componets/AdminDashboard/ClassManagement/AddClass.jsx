import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const [subjects, setSubjects] = useState([]);
  const [mainSubjects, setMainSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [className, setClassName] = useState("");
  const navigate = useNavigate();
  // Fetch general subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/subjects/active-subjects"
        );
        setSubjects(response.data.data || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setSubjects([]);
      }
    };
    fetchSubjects();
  }, []);

  // Fetch main subjects
  useEffect(() => {
    const fetchMainSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/main-subject/active"
        );
        setMainSubjects(response.data.activeSubjects || []);
      } catch (error) {
        console.error("Error fetching main subjects:", error);
        setMainSubjects([]);
      }
    };
    fetchMainSubjects();
  }, []);

  // Validation schema
  const validationSchema = Yup.object({
    className: Yup.string().required("Class Name is required"),
    section: Yup.string().required("Section is required"),
    timing: Yup.string().required("Timing is required"),
    roomNumber: Yup.string().required("Room Number is required"),
    mainSubject: Yup.string().test(
      "main-subject-required",
      "Main Subject is required",
      function (value) {
        const { className } = this.parent;
        if (["11", "12"].includes(className)) {
          return !!value;
        }
        return true;
      }
    ),
    subjects: Yup.array().min(1, "At least one subject is required"),
  });

  // Form submission handler
  const handleSubmit = async (values, { resetForm }) => {
    const classData = {
      ...values,
      subjects: selectedSubjects,
    };
    try {
      await axios.post("http://localhost:5000/class", classData);
      toast.success("Class added successfully!");
      setSelectedSubjects([]);
      resetForm();
      navigate("/admin/view-class");
    } catch (error) {
      console.error("Error adding class:", error);
      toast.error("Failed to add class");
    }
  };

  // Handle subject selection
  const handleSubjectChange = (selectedOptions, setFieldValue) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedSubjects(selectedValues);
    setFieldValue("subjects", selectedValues);
  };

  // Handle class change
  const handleClassChange = (e, setFieldValue) => {
    const value = e.target.value || "";
    setClassName(value);
    setFieldValue("className", value);
  };

  return (
    <div className="p-4 border rounded font-montserrat text-gray">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-2xl font-bold text-center mb-6">Add New Class</h2>
      <Formik
        initialValues={{
          className: "",
          section: "",
          timing: "",
          roomNumber: "",
          teacherName: "",
          mainSubject: "",
          subjects: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Class Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Class Name
                </label>
                <Field
                  as="select"
                  name="className"
                  onChange={(e) => handleClassChange(e, setFieldValue)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Class</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={(i + 1).toString()}>
                      Class {i + 1}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="className"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Section */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Section
                </label>
                <Field
                  type="text"
                  name="section"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter section"
                />
                <ErrorMessage
                  name="section"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Timing */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Timing
                </label>
                <Field
                  type="time"
                  name="timing"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="timing"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Room Number */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Room Number
                </label>
                <Field
                  type="text"
                  name="roomNumber"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter room number"
                />
                <ErrorMessage
                  name="roomNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Main Subject */}
            {["11", "12"].includes(className) && (
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Main Subject
                </label>
                <Field
                  as="select"
                  name="mainSubject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Main Subject</option>
                  {mainSubjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="mainSubject"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            )}

            {/* Subjects */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Select Subjects
              </label>
              <Select
                isMulti
                name="subjects"
                options={subjects.map((subject) => ({
                  value: subject._id,
                  label: subject.name,
                }))}
                onChange={(selectedOptions) =>
                  handleSubjectChange(selectedOptions, setFieldValue)
                }
                className="react-select-container"
              />
              <ErrorMessage
                name="subjects"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 border-2 border-sky-500 hover:bg-sky-500 hover:text-white rounded-lg"
              >
                Add Class
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddClass;
