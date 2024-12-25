import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

const AddStudent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [classes, setClasses] = useState([]);
  const [mainSubjects, setMainSubjects] = useState([]);
  const [specialSubjects, setSpecialSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const relationOptions = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "other", label: "Other" },
  ];

  const initialValues = {
    name: "",
    dob: "",
    email: "",
    mobile: "",
    image: null,
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    parentContact: {
      fatherName: "",
      motherName: "",
      fatherPhone: "",
      motherPhone: "",
      email: "",
    },
    dateOfEnrollment: "",
    emergencyContact: {
      name: "",
      relation: "",
      phone: "",
    },
    bankDetails: {
      accountNumber: "",
      ifscNumber: "",
      aadhaarCardNumber: "",
      samagraId: "",
    },
    classId: "",
    specialSubject: "",
    mainSubject: "",
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:5000/class/active");
        const data = await response.json();
        if (Array.isArray(data.classes)) {
          setClasses(data.classes);
        } else {
          console.error("Expected an array but got:", data.classes);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  const fetchMainSubjects = useCallback(async (classId) => {
    try {
      const response = await fetch(`http://localhost:5000/subjects/${classId}`);
      const data = await response.json();
      if (Array.isArray(data.subjects)) {
        setMainSubjects(data.subjects);
      } else {
        console.error("Expected an array but got:", data.subjects);
      }
    } catch (error) {
      console.error("Error fetching main subjects:", error);
    }
  }, []);

  const handleClassChange = (classId) => {
    setSpecialSubjects(
      classId === "11" || classId === "12" ? ["Math", "Science", "Arts"] : []
    );
    fetchMainSubjects(classId);
  };

  const validationSchemas = [
    Yup.object({
      name: Yup.string().required("Name is required"),
      dob: Yup.date().required("Date of Birth is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      image: Yup.mixed().required("Image is required"),
      classId: Yup.string().required("Class is required"),
    }),
    Yup.object({
      address: Yup.object({
        street: Yup.string().required("Street is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zipCode: Yup.string().matches(/^\d{6}$/, "ZIP code must be 6 digits"),
      }),
    }),
    Yup.object({
      parentContact: Yup.object({
        fatherName: Yup.string().required("Father's name is required"),
        motherName: Yup.string().required("Mother's name is required"),
        fatherPhone: Yup.string()
          .matches(/^\d{10}$/, "Phone number must be 10 digits")
          .required("Father's phone is required"),
        motherPhone: Yup.string()
          .matches(/^\d{10}$/, "Phone number must be 10 digits")
          .required("Mother's phone is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      }),
    }),
    Yup.object({
      emergencyContact: Yup.object({
        name: Yup.string().required("Emergency contact name is required"),
        relation: Yup.string().required("Relation is required"),
        phone: Yup.string()
          .matches(/^\d{10}$/, "Phone number must be 10 digits")
          .required("Emergency contact phone is required"),
      }).test(
        "not-same-as-student-mobile",
        "Emergency contact phone cannot be the same as student mobile",
        function (value) {
          return value.phone !== this.parent.mobile;
        }
      ),
    }),
    Yup.object({
      bankDetails: Yup.object({
        accountNumber: Yup.string()
          .matches(/^\d{10}$/, "Account number must be 10 digits")
          .required("Account number is required"),
        ifscNumber: Yup.string().required("IFSC code is required"),
        aadhaarCardNumber: Yup.string()
          .matches(/^\d{12}$/, "Aadhaar card number must be 12 digits")
          .required("Aadhaar card number is required"),
        samagraId: Yup.string()
          .required("Samagra ID is required")
          .matches(/^\d{10}$/, "Samagra ID must be 10 digits"),
      }),
    }),
  ];

  const handleSubmit = async (values) => {
    setLoading(true); // Set loading to true when starting the submission
    try {
      const formData = new FormData();

      // Append all fields to FormData
      formData.append("name", values.name);
      formData.append("dob", values.dob);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("image", values.image); // This should be a File object
      formData.append("dateOfEnrollment", values.dateOfEnrollment);
      formData.append("specialSubject", values.specialSubject);
      formData.append("mainSubject", values.mainSubject);
      formData.append("address", JSON.stringify(values.address));
      formData.append("parentContact", JSON.stringify(values.parentContact));
      formData.append(
        "emergencyContact",
        JSON.stringify(values.emergencyContact)
      );
      formData.append("bankDetails", JSON.stringify(values.bankDetails));
      formData.append("classId", values.classId);
      formData.append("stream", "YourStreamValue"); // Add stream value here
      formData.append(
        "aadhaarCardNumber",
        values.bankDetails.aadhaarCardNumber
      ); // Add Aadhaar number
      formData.append("samagraId", values.bankDetails.samagraId); // Add Samagra ID

      const response = await fetch("http://localhost:5000/students/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Student added successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add student.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto p-4 font-montserrat">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[currentStep - 1]}
        onSubmit={handleSubmit}
      >
        {({ validateForm, setFieldValue, setTouched }) => (
          <Form className="bg-white shadow-lg p-6 rounded-lg">
            {currentStep === 1 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-sky-600">
                  Basic Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Date of Birth
                    </label>
                    <Field
                      type="date"
                      name="dob"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Mobile</label>
                    <Field
                      type="text"
                      name="mobile"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("image", file);
                      }}
                      className="w-full p-1 border rounded-md"
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Class</label>
                    <Field
                      as="select"
                      name="classId"
                      onChange={(e) => {
                        handleClassChange(e.target.value);
                        setFieldValue("classId", e.target.value);
                      }}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Class</option>
                      {classes.map((classItem) => (
                        <option key={classItem._id} value={classItem._id}>
                          {classItem.className}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="classId"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-sky-600">Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">Street</label>
                    <Field
                      type="text"
                      name="address.street"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter street address"
                    />
                    <ErrorMessage
                      name="address.street"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">City</label>
                    <Field
                      type="text"
                      name="address.city"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter city"
                    />
                    <ErrorMessage
                      name="address.city"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">State</label>
                    <Field
                      type="text"
                      name="address.state"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="address.state"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">ZIP Code</label>
                    <Field
                      type="text"
                      name="address.zipCode"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="address.zipCode"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-sky-600">
                  Parent Contact
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">
                      Father's Name
                    </label>
                    <Field
                      type="text"
                      name="parentContact.fatherName"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="parentContact.fatherName"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Mother's Name
                    </label>
                    <Field
                      type="text"
                      name="parentContact.motherName"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="parentContact.motherName"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Father's Phone
                    </label>
                    <Field
                      type="text"
                      name="parentContact.fatherPhone"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="parentContact.fatherPhone"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Mother's Phone
                    </label>
                    <Field
                      type="text"
                      name="parentContact.motherPhone"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="parentContact.motherPhone"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <Field
                      type="email"
                      name="parentContact.email"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="parentContact.email"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
              </>
            )}
            {currentStep === 4 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-sky-600">
                  Emergency Contact
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <Field
                      type="text"
                      name="emergencyContact.name"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="emergencyContact.name"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Relation</label>
                    <Field
                      as="select"
                      name="emergencyContact.relation"
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Relation</option>
                      {relationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="emergencyContact.relation"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Phone</label>
                    <Field
                      type="text"
                      name="emergencyContact.phone"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="emergencyContact.phone"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
              </>
            )}
            {currentStep === 5 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-sky-600">
                  Bank Details & More
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">
                      Account Number
                    </label>
                    <Field
                      type="text"
                      name="bankDetails.accountNumber"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="bankDetails.accountNumber"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">IFSC Code</label>
                    <Field
                      type="text"
                      name="bankDetails.ifscNumber"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="bankDetails.ifscNumber"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Aadhaar Card Number
                    </label>
                    <Field
                      type="text"
                      name="bankDetails.aadhaarCardNumber"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter Aadhaar Card Number"
                    />
                    <ErrorMessage
                      name="bankDetails.aadhaarCardNumber"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Samagra ID</label>
                    <Field
                      type="text"
                      name="bankDetails.samagraId"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter Samagra ID"
                    />
                    <ErrorMessage
                      name="bankDetails.samagraId"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-between mt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Previous
                </button>
              )}
              {currentStep < validationSchemas.length ? (
                <button
                  type="button"
                  onClick={async () => {
                    setTouched({
                      name: true,
                      dob: true,
                      email: true,
                      mobile: true,
                      image: true,
                      classId: true,
                      address: {
                        street: true,
                        city: true,
                        state: true,
                        zipCode: true,
                      },
                      parentContact: {
                        fatherName: true,
                        motherName: true,
                        fatherPhone: true,
                        motherPhone: true,
                        email: true,
                      },
                      emergencyContact: {
                        name: true,
                        relation: true,
                        phone: true,
                      },
                      bankDetails: {
                        accountNumber: true,
                        ifscNumber: true,
                        aadhaarCardNumber: true,
                        samagraId: true,
                      },
                    });
                    const errors = await validateForm();
                    if (Object.keys(errors).length === 0) {
                      setCurrentStep(currentStep + 1);
                    }
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStudent;
