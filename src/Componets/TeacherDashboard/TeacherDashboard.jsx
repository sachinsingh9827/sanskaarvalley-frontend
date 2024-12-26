import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "./assets/sanskaarvalley.png"; // Assuming the logo is imported
import { logout } from "../../store/authSlice"; // Assuming there's a logout function in your redux slice

const TeacherDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-[#152259] p-4 transition-all duration-300 h-full fixed lg:relative lg:w-64 lg:block overflow-y-auto lg:h-full`}
      >
        {/* Logo and Links */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center text-2xl font-bold text-white mb-4">
            <Link to="/">
              <img
                className="max-w-[50px] h-auto rounded-full mr-2"
                src={logo}
                alt="logo"
              />
            </Link>
            <span>Sanskaar Valley</span>
          </div>

          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/teacher/dashboard"
                  className="block py-2 px-4 text-white hover:bg-gray-600"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="send-notification"
                  className="block py-2 px-4 text-white hover:bg-gray-600"
                >
                  Send Notification
                </Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </nav>

          <div className="mt-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 hover:bg-red-600 rounded-3xl"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white px-4 py-2 hover:bg-sky-500 rounded-3xl"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 lg:ml-64 bg-gray-100 overflow-y-auto">
        {/* Menu button for mobile screens */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden mb-4 py-2 px-4 bg-sky-500 text-white font-bold rounded"
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        {/* Main content like dashboard or other pages */}
        <div>
          {/* You can replace this with your Outlet for nested routing */}
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          {/* More dashboard content goes here */}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#152259] text-white p-4 mt-auto">
        <p className="text-center">© 2024 Sanskaar Valley School</p>
      </footer>
    </div>
  );
};

export default TeacherDashboard;
