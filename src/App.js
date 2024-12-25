import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import Navbar from "./Componets/Navbar/Navbar";
import Footer from "./Componets/Footer/Footer";
import ProtectedRoute from "./Componets/ProtectedRoute";
import AdminDashboard from "./Componets/AdminDashboard/AdminDashboard";
import Home from "./Componets/HomePage/Home";
import AboutUs from "./Componets/HomePage/AboutUs";
import Services from "./Componets/HomePage/Services";
import Login from "./Componets/Login/Login";
import TeacherDashboard from "./Componets/TeacherDashboard/TeacherDashboard";
import Reports from "./Componets/AdminDashboard/Reports";
import ManageUsers from "./Componets/AdminDashboard/ManageUsers";
import Attendance from "./Componets/AdminDashboard/Attendance";
import DashboardContent from "./Componets/AdminDashboard/DashboardContent";
import Notifications from "./Componets/AdminDashboard/Notifications/Notifications";
import Subjects from "./Componets/AdminDashboard/Subjects/Subjects";
import ContactPage from "./Componets/AdminDashboard/ContactPage/ContactPage";
import UserContactTable from "./Componets/AdminDashboard/UserContactTable/Image/UserContactTable";
import SchoolClasses from "./Componets/AdminDashboard/ClassManagement/ViewClass";
import AddClass from "./Componets/AdminDashboard/ClassManagement/AddClass";
import Tabs from "./Componets/HomePage/Tabs";
import LeaveCalendar from "./Componets/Reusable/LeaveCalendar";
import PrivacyPolicy from "./Componets/UserDashboard/Common/PrivacyPolicy ";
import ContactUs from "./Componets/ContactUs/ContactUs";
import TermsAndConditions from "./Componets/UserDashboard/Common/TermsAndConditions ";
import FAQ from "./Componets/UserDashboard/Common/FAQ";
import AddMainSubject from "./Componets/AdminDashboard/Subjects/MainSubjects/MainSubjects";
import AdminFAQ from "./Componets/AdminDashboard/Common/FAQ/Faq";
import AdminTermsAndConditions from "./Componets/AdminDashboard/Common/TermsAndConditions/TermsAndConditions";
import AdminPrivacyPolicy from "./Componets/AdminDashboard/Common/PrivacyPolicy/PrivacyPolicy";
import ViewStudents from "./Componets/AdminDashboard/Students/ViewStudent";
import PageNotFound from "./Componets/AdminDashboard/pageNotFound.png";
import AddStudent from "./Componets/AdminDashboard/Students/AddStudent";
import Career from "./Componets/HomePage/Career";
import AdminJobPostings from "./Componets/AdminDashboard/Career/AdminJobPostings";
import JobApplicationsPage from "./Componets/AdminDashboard/Career/JobApplicationsPage";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="tabs" element={<Tabs />} />
          <Route path="leave-calendar" element={<LeaveCalendar />} />
          <Route path="careers" element={<Career />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard /> {/* AdminDashboard wraps all admin routes */}
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="main-subject" element={<AddMainSubject />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="view-class" element={<SchoolClasses />} />
            <Route path="add-class" element={<AddClass />} />
            <Route path="user-contact" element={<UserContactTable />} />
            <Route path="faq" element={<AdminFAQ />} />
            <Route
              path="terms-and-conditions"
              element={<AdminTermsAndConditions />}
            />
            <Route path="privacy-policy" element={<AdminPrivacyPolicy />} />
            <Route path="view-student" element={<ViewStudents />} />
            <Route path="add-student" element={<AddStudent />} />
            <Route path="career" element={<AdminJobPostings />} />
            <Route path="Job-applications" element={<JobApplicationsPage />} />
            <Route
              path="*"
              element={
                <>
                  <Link to="/admin/dashboard">
                    <button className="flex justify-center border-2 border-sky-500  text-[#105183] hover:bg-sky-500 hover:text-white font-bold py-2 px-4 rounded">
                      back to home
                    </button>
                  </Link>
                  <div className="text-3xl flex flex-col justify-center items-center">
                    <img
                      src={PageNotFound}
                      alt=" 404 Not Found"
                      className="w-1/2"
                    />
                    <span className="text-2xl font-montserrat text-red-500">
                      {" "}
                      Opps! 404 Not Found...
                    </span>
                  </div>
                </>
              }
            />
          </Route>

          {/* Teacher Routes */}
          <Route
            path="/teacher/*"
            element={
              <ProtectedRoute role="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          {/* Student Routes */}
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
