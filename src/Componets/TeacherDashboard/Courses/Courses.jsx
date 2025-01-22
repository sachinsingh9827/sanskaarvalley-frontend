import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCourseId, setDeleteCourseId] = useState(null);

  // Fetch available classes
  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        "https://sanskaarvalley-backend.vercel.app/class/active"
      );
      setClasses(response.data.classes || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Failed to load classes.");
    }
  };

  // Fetch mock courses (replace this with an actual API call if needed)
  useEffect(() => {
    const fetchCoursesData = () => {
      const mockCourses = [
        {
          id: 1,
          name: "Mathematics",
          description: "An advanced course on algebra, calculus, and geometry.",
          videoURL: "https://www.youtube.com/watch?v=xOjg4fwp7bM",
          classID: "class1", // Use classID instead of className
        },
        {
          id: 2,
          name: "Science",
          description:
            "A comprehensive course covering biology, chemistry, and physics.",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          classID: "class2", // Use classID instead of className
        },
      ];
      setCourses(mockCourses);
    };

    fetchCoursesData();
    fetchClasses(); // Fetch classes when component mounts
  }, []);

  const extractVideoID = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/[^\n]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),
    description: Yup.string().required("Description is required"),
    videoURL: Yup.string()
      .url("Invalid URL format")
      .required("Video URL is required"),
    classID: Yup.string().required("Class is required"),
  });

  const handleEdit = (course) => {
    setEditCourse(course);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setDeleteCourseId(id);
  };

  const confirmDelete = () => {
    setCourses(courses.filter((course) => course.id !== deleteCourseId));
    setShowDeleteModal(false);
    setDeleteCourseId(null);
  };

  return (
    <div className="courses-page font-montserrat p-6">
      <div className="flex flex-col sm:flex-row justify-between mb-2 p-2 border-b-2 border-[#105183]">
        <h1 className="text-2xl text-center sm:text-left text-[#105183]  sm:mb-0">
          Courses
        </h1>
        <div className="flex justify-end">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="border-2 border-[#105183] px-4 py-2 rounded transition-colors duration-300 hover:bg-[#105183] hover:text-white hover:shadow-lg hover:shadow-[#105183]/50"
            >
              Add New Course
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <Formik
          initialValues={
            editCourse || {
              name: "",
              description: "",
              videoURL: "",
              classID: "",
            }
          }
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (editCourse) {
              setCourses((prevCourses) =>
                prevCourses.map((course) =>
                  course.id === editCourse.id
                    ? { ...course, ...values }
                    : course
                )
              );
              setEditCourse(null);
            } else {
              const newCourse = {
                id: courses.length + 1,
                ...values,
              };
              setCourses((prevCourses) => [...prevCourses, newCourse]);
            }
            resetForm();
            setShowForm(false);
          }}
        >
          {({ isSubmitting, resetForm }) => (
            <Form className="mb-8 border-2 border-[#105183] p-4 rounded">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm text-gray-700">
                  Course Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Course Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm text-gray-700"
                >
                  Course Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Course Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="videoURL"
                  className="block text-sm text-gray-700"
                >
                  Video URL (YouTube/Vimeo/Shorts)
                </label>
                <Field
                  type="url"
                  id="videoURL"
                  name="videoURL"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Video URL"
                />
                <ErrorMessage
                  name="videoURL"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="classID"
                  className="block text-sm text-gray-700"
                >
                  Class
                </label>
                <Field
                  as="select"
                  id="classID"
                  name="classID"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Class</option>
                  {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem._id}>
                      {classItem.className}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="classID"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="border-2 border-gray px-2 py-2 rounded transition-colors duration-300 hover:bg-gray hover:text-white hover:shadow-lg hover:shadow-gray/50"
                  onClick={() => {
                    resetForm();
                    setEditCourse(null);
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border-2 border-[#105183] px-2 py-2 rounded transition-colors duration-300 hover:bg-[#105183] hover:text-white hover:shadow-lg hover:shadow-[#105183]/50"
                  disabled={isSubmitting}
                >
                  {editCourse ? "Update Course" : "Upload Course"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const classData = classes.find(
            (classItem) => classItem._id === course.classID
          );
          const className = classData ? classData.className : "Unknown Class";

          return (
            <div
              key={course.id}
              className="course-card bg-blue-100 p-4 rounded-lg shadow-md mt-4"
            >
              <h3 className="text-xl text-[#105183]">{course.name}</h3>
              <p className="text-sm text-gray-600">{course.description}</p>
              <p className="text-sm text-gray-600">Class: {className}</p>

              <div className="mt-4">
                {course.videoURL && (
                  <iframe
                    width="100%"
                    height="100"
                    src={`https://www.youtube.com/embed/${extractVideoID(
                      course.videoURL
                    )}`}
                    title="Course Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                )}
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-800 text-lg mb-4">
              Are you sure you want to delete this course?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg mr-4"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-6 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
