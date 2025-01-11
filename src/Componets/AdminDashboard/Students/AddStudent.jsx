import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const initialValues = {
    firstName: "",
    lastName: "",
    class: "",
    batch: "",
    aadhaar: "",
    mobile: "",
    email: "",
    address: "",
    bankAccount: "",
    bankIFSC: "",
    parentName: "",
    parentMobile: "",
  };

  const validationSchema = [
    Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      class: Yup.string().required("Class is required"),
      batch: Yup.string(),
    }),
    Yup.object({
      aadhaar: Yup.string()
        .matches(/^\d{12}$/, "Aadhaar must be 12 digits")
        .required("Aadhaar is required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    Yup.object({
      address: Yup.string().required("Address is required"),
      bankAccount: Yup.string().required("Bank Account is required"),
      bankIFSC: Yup.string().required("Bank IFSC is required"),
      parentName: Yup.string().required("Parent Name is required"),
      parentMobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Parent Mobile number is required"),
    }),
  ];

  const onSubmit = (values, { resetForm }) => {
    console.log("Submitted Values:", values);
    toast.success("Student registered successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    resetForm();
    setCurrentStep(1);
  };

  return (
    <div className="font-montserrat bg-gray-100 min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-md w-full p-2">
        <h1 className="text-2xl mb-4 text-center">Student Register</h1>

        {/* Step Indicator */}
        <div className="flex justify-between mb-4">
          {["Step 1", "Step 2", "Step 3"].map((step, index) => (
            <div
              key={index}
              onClick={() => setCurrentStep(index + 1)}
              className={`step cursor-pointer text-center w-1/4 p-2 gap-2 rounded hover:bg-[#105183] hover:text-white ${
                currentStep === index + 1
                  ? "bg-[#105183] text-white"
                  : "border border-gray-300"
              }`}
            >
              {step}
            </div>
          ))}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema[currentStep - 1]}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {currentStep === 1 && (
                <>
                  {["firstName", "lastName", "class", "batch"].map(
                    (field, index) => (
                      <div className="mb-4" key={index}>
                        <label
                          className="block text-gray-700 mb-1 capitalize"
                          htmlFor={field}
                        >
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <Field
                          type="text"
                          id={field}
                          name={field}
                          className="w-full border rounded-md px-3 py-2"
                          placeholder={`Enter ${field.replace(
                            /([A-Z])/g,
                            " $1"
                          )}`}
                        />
                        <ErrorMessage
                          name={field}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    )
                  )}
                </>
              )}

              {currentStep === 2 && (
                <>
                  {["aadhaar", "mobile", "email"].map((field, index) => (
                    <div className="mb-4" key={index}>
                      <label
                        className="block text-gray-700 mb-1 capitalize"
                        htmlFor={field}
                      >
                        {field.replace(/([A-Z])/g, "$1")}
                      </label>
                      <Field
                        type="text"
                        id={field}
                        name={field}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder={`Enter ${field.replace(
                          /([A-Z])/g,
                          " $1"
                        )}`}
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ))}
                </>
              )}
              {currentStep === 3 && (
                <>
                  {[
                    "address",
                    "bankAccount",
                    "bankIFSC",
                    "parentName",
                    "parentMobile",
                  ].map((field, index) => (
                    <div className="mb-4" key={index}>
                      <label
                        className="block text-gray-700 mb-1 capitalize"
                        htmlFor={field}
                      >
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <Field
                        type="text"
                        id={field}
                        name={field}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder={`Enter ${field.replace(
                          /([A-Z])/g,
                          " $1"
                        )}`}
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ))}
                </>
              )}

              <div className="flex justify-between mt-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="border-2 border-gray-300 hover:bg-gray hover:text-white px-4 py-2 rounded-md"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="border-2 border-gray-300 hover:bg-gray hover:text-white px-4 py-2 rounded-md"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Submit
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StudentRegister;
