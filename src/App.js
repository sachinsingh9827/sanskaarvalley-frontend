import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
import NotificationPage from "./Componets/TeacherDashboard/NotificationPage/NotificationPage";
import TeacherProfile from "./Componets/TeacherDashboard/TeacherProfile/TeacherProfile";
import ShelfDeclaration from "./Componets/Login/ShelfDeclaration";
import DeveloperInfo from "./Componets/UserDashboard/Common/DeveloperInfo";
import CalendarManagement from "./Componets/AdminDashboard/SchoolCalendar/CalendarManagement";
import RegisterTeacher from "./Componets/AdminDashboard/Teacher/RegisterTeacher";
import OwnerDetails from "./Componets/Reusable/OwnerDetails";
import SchoolPolicies from "./Componets/Reusable/SchoolPolicies";
import TeacherCalendar from "./Componets/TeacherDashboard/TeacherCalendar/TeacherCalendar";
import StudentList from "./Componets/TeacherDashboard/Students/Students";
import AttendancePage from "./Componets/TeacherDashboard/Attendance/Attendance";
import Courses from "./Componets/TeacherDashboard/Courses/Courses";
import AddAssignment from "./Componets/TeacherDashboard/AddAssignment/AddAssignment";
import TeacherTermsAndConditions from "./Componets/TeacherDashboard/TeacherTermsAndConditions/TeacherTermsAndConditions";
import SubmitResults from "./Componets/TeacherDashboard/SubmitResults/SubmitResults";
import PaymentPage from "./Componets/StudentDashboard/Home/PaymentPage";
import ReviewForm from "./Componets/Reusable/ReviewForm";
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
          <Route path="/ShelfDeclaration" element={<ShelfDeclaration />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="tabs" element={<Tabs />} />
          <Route path="leave-calendar" element={<LeaveCalendar />} />
          <Route path="owner-details" element={<OwnerDetails />} />
          <Route path="careers" element={<Career />} />
          <Route path="developerInfo" element={<DeveloperInfo />} />
          <Route path="school-policies" element={<SchoolPolicies />} />
          {/* <Route path="/reviews" element={<ReviewForm />} /> */}
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
              path="calendar-management"
              element={<CalendarManagement />}
            />
            <Route path="register-teacher" element={<RegisterTeacher />} />
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
          >
            <Route path="dashboard" element={<TeacherProfile />} />{" "}
            {/* Default Profile Page */}
            <Route path="send-notification" element={<NotificationPage />} />
            <Route path="teacher-calendar" element={<TeacherCalendar />} />
            <Route path="student-list" element={<StudentList />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="courses" element={<Courses />} />
            <Route path="add-assignment" element={<AddAssignment />} />
            <Route
              path="teacher-term-condition"
              element={<TeacherTermsAndConditions />}
            />
            <Route path="submit-results" element={<SubmitResults />} />
            {/* Add more routes here */}
          </Route>
          {/* Student Routes */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute role="student">
                <Routes>
                  {" "}
                  {/* Wrap routes inside <Routes> */}
                  <Route path="/dashboard" element={<studentDashboard />} />
                  <Route path="/payment" element={<PaymentPage />} />
                </Routes>
              </ProtectedRoute>
            }
          />{" "}
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
