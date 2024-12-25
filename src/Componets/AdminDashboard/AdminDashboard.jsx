import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex font-sans h-screen">
      <AdminSidebar />
      <div className="flex-1  p-6 bg-gray-100 overflow-y-auto">
        <h1 className=" flex justify-center text-3xl font-montserrat mb-6 bg-[#105183] text-white p-2 rounded">
          Welcome to the Admin Dashboard
        </h1>
        <Outlet /> {/* This will render nested routes */}
      </div>
    </div>
  );
};

export default AdminDashboard;
