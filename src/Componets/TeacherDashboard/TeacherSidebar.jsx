import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaCalendarAlt,
  FaUserCheck,
  FaBell,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./TeacherSidebar.css";

const sidebarItems = [
  { name: "Dashboard", icon: <FaChalkboardTeacher />, path: "dashboard" },
  { name: "Courses", icon: <FaBook />, path: "courses" },
  { name: "Attendance", icon: <FaClipboardList />, path: "attendance" },
  { name: "Calendar", icon: <FaCalendarAlt />, path: "teacher-calendar" },
  { name: "Students", icon: <FaUserCheck />, path: "student-list" },
  { name: "Notifications", icon: <FaBell />, path: "send-notification" },
  {
    name: "Assignments",
    icon: <FaClipboardList />,
    path: "assignments",
    subItems: [
      { name: "Add Assignment", path: "add-assignment" },
      { name: "View Assignments", path: "view-assignments" },
    ],
  },
  {
    name: "Terms & Conditions",
    path: "teacher-term-condition",
    icon: <FaBook />,
  },
];

const TeacherSidebar = () => {
  const location = useLocation();
  const activePath = location.pathname.split("/")[2];
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState({});
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    const isActiveLink = (path) => location.pathname === path;
    // Add listener on component mount
    window.addEventListener("resize", handleResize);

    // Initial check for mobile screen size
    handleResize();

    // Clean up the listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    // Get teacher data from localStorage
    const data = JSON.parse(localStorage.getItem("user"));
    // If data exists, set it in the state
    if (data) {
      setUser(data);
    }
  }, []);

  return (
    <div
      className={`admin-sidebar font-montserrat p-4 text-white min-h-screen ${
        isSidebarOpen ? "w-64" : "w-16"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2
          className={`text-2xl font-montserrat ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          {user.name}
        </h2>
        <button
          onClick={toggleSidebar}
          className="text-2xl md:hidden focus:outline-none"
        >
          {isSidebarOpen ? "×" : "☰"}
        </button>
      </div>

      <ul>
        {sidebarItems.map(({ name, icon, path, subItems }) => (
          <li key={path} className="mb-2">
            <div
              onClick={() => (subItems ? toggleDropdown(name) : null)}
              className={`flex items-center justify-between rounded-lg cursor-pointer mt-2 ${
                isSidebarOpen && activePath === path
                  ? "bg-sky-500 mt-2"
                  : isSidebarOpen && activePath !== path
                  ? "hover:bg-sky-500 mt-2"
                  : "mt-2" // No background when sidebar is closed
              }`}
            >
              <Link to={`/teacher/${path}`} className="flex items-center">
                <div className="text-lg">{icon}</div>
                <span
                  className={`text-sm ml-2 ${
                    isSidebarOpen ? "block" : "hidden"
                  }`}
                >
                  {name}
                </span>
              </Link>
              {subItems && (
                <span className="ml-auto pr-2">
                  {openDropdown === name ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              )}
            </div>
            {openDropdown === name && subItems && (
              <ul className="mt-2 border p-2 rounded-lg bg-gray">
                {subItems.map((subItem) => (
                  <li key={subItem.path} className="m-2">
                    <Link
                      to={`/teacher/${subItem.path}`}
                      className={`p-2 rounded-lg border flex items-center ${
                        activePath === subItem.path
                          ? "bg-sky-500 hover:bg-sky-500"
                          : "bg-gray hover:bg-sky-500"
                      }`}
                    >
                      <span className="text-lg mr-2">{subItem.icon}</span>
                      <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                        {subItem.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherSidebar;
