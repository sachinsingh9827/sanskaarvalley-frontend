import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  };

  // Validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[6789][0-9]{9}$/, "Mobile number not valid")
      .required("Mobile number is required"),
    subject: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s]+$/, // Only allows letters, numbers, and spaces
        "Subject can only contain letters, numbers, and spaces"
      )
      .required("Subject is required"),
    message: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s!?'"()]+$/, // Allows letters, numbers, spaces, and some punctuation
        "Message can only contain letters, numbers, and certain punctuation"
      )
      .required("Message is required"),
  });

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    axios
      .post("https://sanskaarvalley-backend.vercel.app/user-contact", values)
      .then((response) => {
        toast.success("Your message has been sent successfully!"); // Success toast
        resetForm();
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message || error.message); // Display error from the server
        } else if (error.request) {
          toast.error("No response from the server. Please try again later.");
        } else {
          toast.error(error.message); // Generic error message for other cases
        }
      });
  };

  return (
    <div className="container mx-auto py-8 px-6 font-montserrat">
      <div className="bg-gradient-to-r  from-[#105183] to-[#252472] text-center text-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
        <p className="welcome-title text-sm font-medium">
          Get in touch with us for any inquiries, support, or more information
          about our school and services.
        </p>
      </div>
      <h1 className="text-center text-2xl font-semibold text-[#105183]  mt-8">
        Get in Touch – We’re Ready to Assist You!
      </h1>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Flexbox Layout for Form and Map */}
      <div className="flex flex-col border border-gray-300 mt-8 p-2 rounded-lg bg-smoke-white">
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Left Side - Form */}
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 w-full md:w-1/2">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="grid grid-cols-1 gap-6">
                  {/* Name Input */}
                  <div className="">
                    <label
                      htmlFor="name"
                      className="block text-sm  text-sm font-bold"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className="  block w-full p-2 border border-sky-500 rounded-md"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm  text-gray-700 text-sm font-bold"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="abc@gmail.com"
                      className="  block w-full p-2 border border-sky-500 rounded-md"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
                  {/* Mobile Input */}
                  <div className="">
                    <label
                      htmlFor="mobile"
                      className="block text-sm  text-gray-700 text-sm font-bold"
                    >
                      Mobile
                    </label>
                    <Field
                      type="text"
                      id="mobile"
                      name="mobile"
                      placeholder="1234567890"
                      className=" mt-1 block w-full p-2 border border-sky-500 rounded-md"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-sm  text-gray-700 text-sm font-bold"
                    >
                      Subject
                    </label>
                    <Field
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Subject of your message"
                      className=" mt-1 block w-full p-2 border border-sky-500 rounded-md"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block  text-gray-700 text-sm font-bold"
                  >
                    Message
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    placeholder="Type your message here"
                    className=" mt-1 block w-full p-2 border border-sky-500 rounded-md"
                    rows="6"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mb-4 text-center">
                  <button
                    type="submit"
                    className="w-full mt-4 bg-[#539bd7]  py-2 px-4 rounded-md hover:bg-[#105183] hover:text-white"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
            {/* ToastContainer to show notifications */}
            <ToastContainer position="top-right" autoClose={5000} />
          </div>
          {/* Right Side - Map */}
          <div className="w-full md:w-1/3 md:h-screen">
            <div className="h-full w-full mt-8">
              <iframe
                title="Map of Empire State Building" // Add a descriptive title here
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2603.6447793129446!2d81.00483791752863!3d24.55339580000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39846342c48bfa0b%3A0x3d376405cd191bb8!2sSanskaar%20Valley%20School!5e1!3m2!1sen!2sin!4v1731905162582!5m2!1sen!2sin"
                width="100%"
                height="480"
                frameBorder="0"
                style={{
                  backgroundColor: "#105183",
                  borderRadius: "4px",
                }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
