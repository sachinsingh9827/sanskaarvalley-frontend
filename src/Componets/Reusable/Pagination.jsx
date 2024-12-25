import React, { useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Initialize current page to 1 if not set
  useEffect(() => {
    if (!currentPage) onPageChange(1);
  }, [currentPage, onPageChange]);

  // Function to handle page click
  const handlePageClick = (page) => {
    // Ensure the page is within valid bounds
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center my-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 border rounded ${
          currentPage === 1
            ? "text-gray-400 font-montserrat cursor-not-allowed"
            : "text-sky-500 font-montserrat hover:bg-sky-200"
        }`}
      >
        Previous
      </button>

      {/* Display Current Page Indicator */}
      <span className="px-3 py-1 mx-1 font-montserrat">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 mx-1 border rounded ${
          currentPage === totalPages
            ? "text-gray-400 font-montserrat cursor-not-allowed"
            : "text-sky-500 font-montserrat hover:bg-sky-200"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
