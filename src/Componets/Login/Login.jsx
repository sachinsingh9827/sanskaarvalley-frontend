import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import loginImage from "./assets/6343845.jpg";
import "./Login.css";
import { BiAperture, BiCheckCircle } from "react-icons/bi";

const Login = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const users = [
    {
      id: 1,
      name: "Admin",
      email: "sachinsingh.dollop@gmail.com",
      password: "Sachin@98",
      role: "admin",
      shelfdeclaration: true,
    },
    {
      id: 2,
      name: "Sachin Singh",
      email: "sachinsingh020406@gmail.com",
      password: "Sachin@98",
      role: "teacher",
    },

    // {
    //   id: 2,
    //   name: "Sachin Singh",
    //   email: "sachinsingh0204@gmail.com",
    //   password: "Sachin@98",
    //   role: "student",
    // },

    // Add your user data here
  ];

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email must not contain spaces or invalid characters"
      ),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters")
      .required("Password is required")
      .matches(
        /^[A-Za-z0-9@#$%^&+=]*$/,
        "Password must not contain spaces or invalid characters"
      )
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one digit")
      .matches(
        /[@#$%^&+=]/,
        "Password must contain at least one special character (@, #, $, %, etc.)"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const user = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            shelfdeclaration: user.shelfdeclaration,
          })
        );

        // Check if shelf declaration is true
        if (user.shelfdeclaration) {
          // Navigate to the shelf declaration page
          navigate("/ShelfDeclaration");
        } else {
          // Navigate based on user role
          switch (user.role) {
            case "admin":
              navigate("/admin/dashboard");
              break;
            case "teacher":
              navigate("/teacher/dashboard");
              break;
            case "student":
              navigate("/student/dashboard");
              break;
            default:
              alert("Invalid role.");
          }
        }
      } else {
        formik.setFieldError("password", "Invalid email or password");
      }
    },
  });

  return (
    <div className="min-h-screen bg-sky-100 font-montserrat flex items-center justify-center  relative overflow-hidden">
      {/* Bubble animation container */}
      <div className="bubble-container">
        {[...Array(15)].map((_, index) => (
          <div key={index} className="bubble"></div>
        ))}
      </div>

      <div className="w-full max-w-4xl bg-transparent shadow-lg rounded-lg overflow-hidden md:flex z-10">
        <div
          className="hidden md:block md:w-1/2 bg-cover rounded-r-3xl"
          style={{
            backgroundImage: `url(${loginImage})`,
          }}
        ></div>
        <div className="w-full md:w-1/2 p-8 ">
          <h1 className="text-4xl font-bold text-center  text-gray mb-4">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Login to your account to continue
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full border-2 border-sky-500 py-2 rounded-lg font-bold hover:sky-500 transition duration-300 flex items-center justify-center relative overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Login Text */}
              <span className="relative z-10">Login</span>

              {/* Moving Icon */}
              <span
                className={`absolute left-0 inset-y-0 flex items-center pl-2 text-sky-500 text-xl transition-transform duration-500 group-hover:translate-x-full`}
              >
                {isHovered ? (
                  <span className="rotate-360 duration-500 transition-transform">
                    <BiCheckCircle className="text-green-500" />
                  </span>
                ) : (
                  <span className="animate-rotate text-sky-500">
                    <BiAperture />
                  </span>
                )}
              </span>
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Note: Only
            <span className="font-bold text-primary ml-2">Teachers</span>, and{" "}
            <span className="font-bold text-primary">Students</span> are allowed
            to login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
