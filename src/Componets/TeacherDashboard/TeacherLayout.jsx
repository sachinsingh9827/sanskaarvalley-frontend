import React from "react";
import TeacherSidebar from "./TeacherSidebar";

const TeacherLayout = ({ children }) => {
  return (
    <div className="flex">
      <TeacherSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default TeacherLayout;
