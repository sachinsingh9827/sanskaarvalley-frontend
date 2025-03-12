import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

// Validation Schema
const reviewSchema = Yup.object({
  name: Yup.string().min(2, "Too Short!").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  rating: Yup.number().min(1).max(5).required("Rating is required"),
  comment: Yup.string()
    .min(5, "At least 5 characters")
    .required("Comment is required"),
});

function ReviewForm({ onClose, onReviewSubmit }) {
  const [submitted, setSubmitted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (submitted) {
      setTimeout(() => setFadeOut(true), 3000);
      setTimeout(() => {
        setFadeOut(false);
        onClose();
      }, 4000);
    }
  }, [submitted, onClose]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(
        "https://sanskaarvalley-backend.vercel.app/review/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) throw new Error("Failed to submit review");

      toast.success("Review submitted successfully!");
      setSubmitted(true);
      onReviewSubmit(); // Refresh reviews after submission
      resetForm();
    } catch (error) {
      toast.error("Error submitting review. Please try again.");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <Formik
          initialValues={{ name: "", email: "", rating: 5, comment: "" }}
          validationSchema={reviewSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <h3 className="text-lg font-semibold text-center mb-3 text-[#105183]">
                Leave a Review
              </h3>

              <Field
                name="name"
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                name="email"
                type="email"
                className="w-full p-2 border rounded-md mt-3 focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                name="comment"
                as="textarea"
                className="w-full p-2 border rounded-md mt-3 focus:outline-none focus:border-blue-500"
                placeholder="Enter your comment"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="text-red-500 text-sm"
              />

              <Stars
                rating={values.rating}
                onChange={(newRating) => setFieldValue("rating", newRating)}
                className="flex justify-start mt-3"
              />

              <button
                type="submit"
                className="mt-3 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Submit Review
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
}

function Stars({ rating, onChange }) {
  return (
    <div className="flex space-x-1 justify-center mt-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className="cursor-pointer text-2xl"
        >
          {rating >= star ? (
            <AiFillStar className="text-yellow-500" />
          ) : (
            <AiOutlineStar className="text-gray-400" />
          )}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReviewForm(true);
    }, 10000);
    fetchReviews(); // Fetch reviews on mount
    return () => clearTimeout(timer);
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        "https://sanskaarvalley-backend.vercel.app/review/get-approved-reviews"
      );
      if (!response.ok) throw new Error("Failed to fetch reviews");

      const data = await response.json();
      setReviews(data.reviews || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]); // Set an empty array in case of an error
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="flex font-montserrat rounded-lg  flex-col items-center justify-center font-montserrat bg-gray-50">
      <span className="flex justify-start m-3 text-2xl font-bold text-[#105183]">
        Your Review Matters
      </span>
      {showReviewForm && (
        <ReviewForm
          onClose={() => setShowReviewForm(false)}
          onReviewSubmit={fetchReviews} // Refresh reviews after submission
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl text-center"
      >
        {reviews?.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-xl p-2 flex flex-col items-start gap-2 hover:shadow-2xl transition-transform duration-300"
                style={{
                  background: "linear-gradient(to right, #105183, #252472)",
                  borderRadius: "15px",
                  color: "white",
                }}
              >
                <h3 className="font-bold text-lg text-gray-900">
                  Name : {review.name}
                </h3>
                <p className="text-sm text-gray-600 w-full">
                  Email : {review.email}
                </p>
                <p className="text-sm text-gray-600 w-full">
                  Comment : {review.comment}
                </p>

                <p className="text-yellow-500 font-semibold">
                  ⭐ {review.rating}/5
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500"
          >
            No reviews yet.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
