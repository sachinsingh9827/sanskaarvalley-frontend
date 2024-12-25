import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // If the user does not have the required role, redirect to their dashboard
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoute;
