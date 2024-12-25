import axios from "axios";
import React, { useEffect, useState } from "react";

const DashboardContent = () => {
  const [data, setData] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    notifications: 0,
    examResultsPending: 0,
    upcomingExams: 0,
    messages: 0,
    attendanceToday: 0,
    feesCollected: "$0",
    dueFees: "$0",
    eventsScheduled: 0,
    newAnnouncements: 0,
    recentActivities: 0,
    studentSchedules: 0,
  });

  const fetchData = async () => {
    try {
      const [
        notificationsResponse,
        activeSubjectsResponse,
        totalStudentsResponse,
      ] = await Promise.all([
        axios.get("http://localhost:5000/notifications"),
        axios.get("http://localhost:5000/subjects/active-subjects"),
        axios.get("http://localhost:5000/students"),
      ]);

      // Log the responses to check their structure
      console.log("Notifications Response:", notificationsResponse.data);
      console.log("Active Subjects Response:", activeSubjectsResponse.data);
      console.log("Total Students Response:", totalStudentsResponse.data);

      // Assuming notificationsResponse.data contains { totalNotifications }
      setData({
        totalStudents: totalStudentsResponse.data.total || 0,
        notifications: notificationsResponse.data.totalNotifications || 0, // Adjust to match the structure
        examResultsPending: 5, // Replace with API response if available
        upcomingExams: 3, // Replace with API response if available
        messages: 8, // Replace with API response if available
        attendanceToday: 420, // Replace with API response if available
        feesCollected: "$10,500", // Replace with API response if available
        dueFees: "$2,000", // Replace with API response if available
        eventsScheduled: 4, // Replace with API response if available
        newAnnouncements: 6, // Replace with API response if available
        recentActivities: 15, // Replace with API response if available
        studentSchedules: 20, // Replace with API response if available
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cardsData = [
    {
      title: "Total Students",
      count: data.totalStudents,
      icon: "👩‍🎓",
      path: "",
    },
    // { title: "Total Teachers", count: data.totalTeachers, icon: "👨‍🏫" },
    {
      title: "Notifications",
      count: data.notifications,
      icon: "🔔",
      path: "notifications",
    },
    {
      title: "Exam Results Pending",
      count: data.examResultsPending,
      icon: "📊",
    },
    { title: "Upcoming Exams", count: data.upcomingExams, icon: "📝" },
    {
      title: "Messages",
      count: data.messages,
      icon: "✉️",
      path: "user-contact",
    },
    { title: "Attendance Today", count: data.attendanceToday, icon: "📅" },
    { title: "Fees Collected", count: data.feesCollected, icon: "💵" },
    { title: "Due Fees", count: data.dueFees, icon: "💸" },
    { title: "Events Scheduled", count: data.eventsScheduled, icon: "🎉" },
    { title: "New Announcements", count: data.newAnnouncements, icon: "📢" },
    { title: "Recent Activities", count: data.recentActivities, icon: "🕒" },
    { title: "Student Schedules", count: data.studentSchedules, icon: "📆" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="bg-sky-100 shadow-md rounded-lg p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-100 cursor-pointer"
          onClick={() =>
            card.path ? (window.location.href = card.path) : null
          }
        >
          <div>
            <h3 className="text-xl font-montserrat text-gray-800">
              {card.title}
            </h3>
            <p className="text-3xl font-bold text-blue-600">{card.count}</p>
          </div>
          <div className="text-4xl">{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardContent;
