import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaClipboardList,
  FaBell,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { IoIosContact } from "react-icons/io";
import "./AdminSidebar.css";

const sidebarItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "dashboard" },
  { name: "Manage Users", icon: <FaUsers />, path: "manage-users" },
  { name: "Reports", icon: <FaChartBar />, path: "reports" },
  {
    name: "students",
    icon: <GrView />,
    path: "view-student",
    subItems: [
      { name: "Add Student", path: "add-student" },
      { name: "View Student", path: "view-student" },
    ],
  },
  { name: "Attendance", icon: <FaClipboardList />, path: "attendance" },
  {
    name: "Classes",
    icon: <FaClipboardList />,
    path: "view-class",
    subItems: [
      { name: "View Classes", path: "view-class" },
      { name: "Add Class", path: "add-class" },
    ],
  },
  // { name: "Subjects", icon: <FaClipboardList />, path: "subjects" },
  {
    name: "Subjects",
    icon: <FaClipboardList />,
    path: "subjects",
    subItems: [
      { name: "Subjects", path: "subjects" },
      { name: "Mian Subjects", path: "main-subject" },
    ],
  },
  { name: "Notifications", icon: <FaBell />, path: "notifications" },
  { name: "Contact", icon: <IoIosContact />, path: "contact" },
  { name: "User Contact", icon: <IoIosContact />, path: "user-contact" },
  {
    name: "Career",
    icon: <FaClipboardList />,
    path: "career",
    subItems: [
      { name: "Career", path: "career" },
      { name: "Applied jobs", path: "Job-applications" },
    ],
  },
  {
    name: "User Info",
    icon: <FaClipboardList />,
    path: "faq",
    subItems: [
      { name: "Faq", path: "faq" },
      { name: "Terms & Conditions", path: "terms-and-conditions" },
      { name: "Privacy Policy", path: "privacy-policy" },
    ],
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const activePath = location.pathname.split("/")[2];
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle sidebar for mobile

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

    // Add listener on component mount
    window.addEventListener("resize", handleResize);

    // Initial check for mobile screen size
    handleResize();

    // Clean up the listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`admin-sidebar font-montserrat p-4 text-white min-h-screen ${
        isSidebarOpen ? "w-64" : "w-16"
      } transition-all`}
    >
      <div className="flex items-center justify-between mb-6">
        {/* <h2
          className={`text-2xl font-montserrat ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          Admin Panel
        </h2> */}
        <button
          onClick={toggleSidebar}
          className="text-2xl md:hidden focus:outline-none"
        >
          {isSidebarOpen ? "☰" : "×"}
        </button>
      </div>
      <ul>
        {sidebarItems.map(({ name, icon, path, subItems }) => (
          <li key={path} className="mb-2">
            <div
              onClick={() => (subItems ? toggleDropdown(name) : null)}
              className={`flex items-center justify-between rounded-lg cursor-pointer mt-2 ${
                activePath === path
                  ? "bg-sky-500 mt-2"
                  : "hover:bg-sky-500 mt-2"
              }`}
            >
              <Link to={`/admin/${path}`} className="flex items-center">
                <div className="text-lg">{icon}</div>
                <span
                  className={`sidebar-text ml-2 ${
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
              <ul className=" mt-2">
                {subItems.map((subItem) => (
                  <li key={subItem.path} className="m-2">
                    <Link
                      to={`/admin/${subItem.path}`}
                      className={` p-2 rounded-lg ${
                        activePath === subItem.path
                          ? " bg-sky-500  hover:bg-sky-500"
                          : "hover:bg-sky-500 border-sky-500"
                      }`}
                    >
                      <span className="text-lg mr-2">{subItem.icon}</span>
                      <span>{subItem.name}</span>
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

export default AdminSidebar;
