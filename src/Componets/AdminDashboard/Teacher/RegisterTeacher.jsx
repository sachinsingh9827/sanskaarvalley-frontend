import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const RegisterTeacher = () => {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [classes, setClasses] = useState([]);

  // Formik setup with validation using Yup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      aadhaarNumber: "",
      class: "",
      subjectsTaught: [],
      image: null, // Store file as a value
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone is required"),
      aadhaarNumber: Yup.string()
        .matches(/^\d{12}$/, "Aadhaar number must be 12 digits")
        .required("Aadhaar number is required"),
      class: Yup.string().required("Class is required"),
      subjectsTaught: Yup.array().min(1, "At least one subject is required"),
      image: Yup.mixed().required("Image is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);

      try {
        // Convert the form values to FormData
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("aadhaarNumber", values.aadhaarNumber);
        formData.append("class", values.class);
        formData.append(
          "subjectsTaught",
          JSON.stringify(values.subjectsTaught)
        );
        formData.append("image", values.image);

        // Submit formData to the API
        const response = await axios.post(
          "https://sanskaarvalley-backend.vercel.app/teachers",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success(response.data.message); // Show success message
        console.log("Submitted data:", formData); // Log formData for testing
      } catch (error) {
        console.error("Error submitting teacher data:", error);
        toast.error("Error adding teacher. Please try again."); // Show error message
      }
    },
  });

  // Add subject handler
  const handleAddSubject = () => {
    if (subject && !subjects.includes(subject)) {
      setSubjects((prevSubjects) => [...prevSubjects, subject]);
      formik.setFieldValue("subjectsTaught", [...subjects, subject]);
      setSubject(""); // Clear subject input field
    }
  };

  // Handle file input
  const handleFileChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "https://sanskaarvalley-backend.vercel.app/class"
        ); // Replace with your API endpoint
        setClasses(response.data); // Assuming response.data is an array of classes
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Failed to fetch classes. Please try again.");
      }
    };

    fetchClasses();
  }, []);
  return (
    <div className="container mt-5 font-montserrat">
      <div className="flex justify-between mb-4 border-b-2 border-[#105183] pb-2">
        <h2 className=" font-bold py-2 px-4">Register Teacher</h2>
        <button className="bg-[#105183] text-white font-bold py-2 px-4 rounded hover:bg-[#539bd7]">
          view teachers
        </button>
      </div>

      <form onSubmit={formik.handleSubmit}>
        {/* First Name */}
        <div className="form-group py-2 py-2">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-danger">{formik.errors.firstName}</div>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group py-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-danger">{formik.errors.lastName}</div>
          )}
        </div>

        {/* Email */}
        <div className="form-group py-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>

        {/* Phone */}
        <div className="form-group py-2">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-danger">{formik.errors.phone}</div>
          )}
        </div>

        {/* Aadhaar Number */}
        <div className="form-group py-2">
          <label htmlFor="aadhaarNumber">Aadhaar Number</label>
          <input
            type="text"
            className="form-control"
            id="aadhaarNumber"
            name="aadhaarNumber"
            onChange={formik.handleChange}
            value={formik.values.aadhaarNumber}
            onBlur={formik.handleBlur}
          />
          {formik.touched.aadhaarNumber && formik.errors.aadhaarNumber && (
            <div className="text-danger">{formik.errors.aadhaarNumber}</div>
          )}
        </div>

        {/* Class */}
        <div className="form-group py-2">
          <label htmlFor="class">Class</label>
          <select
            className="form-control"
            id="class"
            name="class"
            onChange={formik.handleChange}
            value={formik.values.class}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>
          {formik.touched.class && formik.errors.class && (
            <div className="text-danger">{formik.errors.class}</div>
          )}
        </div>

        {/* Subjects Taught */}
        <div className="form-group py-2">
          <label htmlFor="subjectsTaught">Subjects Taught</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddSubject}
            >
              Add Subject
            </button>
          </div>
          <ul className="list-group mt-2">
            {subjects.map((sub, index) => (
              <li key={index} className="list-group-item">
                {sub}
              </li>
            ))}
          </ul>
          {formik.touched.subjectsTaught && formik.errors.subjectsTaught && (
            <div className="text-danger">{formik.errors.subjectsTaught}</div>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-group py-2">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
          {formik.touched.image && formik.errors.image && (
            <div className="text-danger">{formik.errors.image}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-success m"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Registering Teacher..." : "Register Teacher"}
        </button>
      </form>
    </div>
  );
};

export default RegisterTeacher;
