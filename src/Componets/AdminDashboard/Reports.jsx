import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for the school report
const schoolData = {
  name: "Greenwood High School",
  students: [
    {
      id: 1,
      name: "Alice Johnson",
      grades: [90, 85, 95], // Example grades for different subjects
      attendance: "95%",
      teacher: "Mr. Smith",
    },
    {
      id: 2,
      name: "Bob Smith",
      grades: [80, 75, 88],
      attendance: "88%",
      teacher: "Ms. Johnson",
    },
    {
      id: 3,
      name: "Charlie Brown",
      grades: [85, 90, 92],
      attendance: "90%",
      teacher: "Mr. Lee",
    },
    {
      id: 4,
      name: "Daisy Miller",
      grades: [70, 75, 80],
      attendance: "85%",
      teacher: "Ms. Davis",
    },
  ],
  teachers: [
    { id: 1, name: "Mr. Smith", subject: "Mathematics", students: 25 },
    { id: 2, name: "Ms. Johnson", subject: "Science", students: 30 },
    { id: 3, name: "Mr. Lee", subject: "History", students: 20 },
    { id: 4, name: "Ms. Davis", subject: "English", students: 22 },
  ],
};

const Reports = () => {
  const [view, setView] = useState("main"); // "main", "students", "teachers"
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleBackClick = () => {
    setView("main");
    setSelectedStudent(null);
    setSelectedTeacher(null);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setView("students");
  };

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setView("teachers");
  };

  const getStudentChartData = (student) => ({
    labels: ["Subject 1", "Subject 2", "Subject 3"],
    datasets: [
      {
        label: "Grades",
        data: student.grades,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  const getTeacherChartData = (teacher) => ({
    labels: ["Number of Students"],
    datasets: [
      {
        label: teacher.name,
        data: [teacher.students],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{schoolData.name} - Reports</h1>
      {view === "main" && (
        <div style={styles.cardContainer}>
          <div style={styles.card} onClick={() => handleViewChange("students")}>
            <h3>Student Reports</h3>
            <p>Click to view student reports</p>
          </div>
          <div style={styles.card} onClick={() => handleViewChange("teachers")}>
            <h3>Teacher Reports</h3>
            <p>Click to view teacher reports</p>
          </div>
        </div>
      )}
      {view === "students" && selectedStudent && (
        <div>
          <h2>{selectedStudent.name}'s Report</h2>
          <Bar data={getStudentChartData(selectedStudent)} />
          <p>Attendance: {selectedStudent.attendance}</p>
          <button onClick={handleBackClick} style={styles.backButton}>
            Back
          </button>
        </div>
      )}
      {view === "teachers" && selectedTeacher && (
        <div>
          <h2>{selectedTeacher.name}' s Report</h2>
          <Bar data={getTeacherChartData(selectedTeacher)} />
          <p>Subject: {selectedTeacher.subject}</p>
          <p>Number of Students: {selectedTeacher.students}</p>
          <button onClick={handleBackClick} style={styles.backButton}>
            Back
          </button>
        </div>
      )}
      {view === "students" && !selectedStudent && (
        <div>
          <h2>Student Reports</h2>
          <button onClick={handleBackClick} style={styles.backButton}>
            Back
          </button>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.header}>ID</th>
                <th style={styles.header}>Name</th>
                <th style={styles.header}>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {schoolData.students.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => handleStudentClick(student)}
                >
                  <td style={styles.cell}>{student.id}</td>
                  <td style={styles.cell}>{student.name}</td>
                  <td style={styles.cell}>{student.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === "teachers" && !selectedTeacher && (
        <div>
          <h2>Teacher Reports</h2>
          <button onClick={handleBackClick} style={styles.backButton}>
            Back
          </button>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.header}>ID</th>
                <th style={styles.header}>Name</th>
                <th style={styles.header}>Subject</th>
                <th style={styles.header}>Number of Students</th>
              </tr>
            </thead>
            <tbody>
              {schoolData.teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  onClick={() => handleTeacherClick(teacher)}
                >
                  <td style={styles.cell}>{teacher.id}</td>
                  <td style={styles.cell}>{teacher.name}</td>
                  <td style={styles.cell}>{teacher.subject}</td>
                  <td style={styles.cell}>{teacher.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Simple styles for the component
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    width: "200px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  header: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  backButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Reports;
