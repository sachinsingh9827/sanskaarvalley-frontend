import React from "react";

const studentDashboard = () => {
  return (
    <div>
      <div className="bg-purple-100 min-h-screen flex flex-col">
        <div className="flex flex-1">
          <aside className="w-64 bg-purple-700 text-white p-6">
            <div className="flex items-center mb-8">
              <img
                src="https://placehold.co/40x40"
                alt="Logo"
                className="w-10 h-10 mr-2"
              />
              <span className="text-xl font-bold">Dashboard</span>
            </div>
            <nav className="space-y-4">
              <a href="#" className="flex items-center space-x-2 text-white">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-white">
                <i className="fas fa-credit-card"></i>
                <span>Payment Info</span>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
                  <p>Payment-related information will be displayed here.</p>
                </div>
              </a>
              <a href="#" className="flex items-center space-x-2 text-white">
                <i className="fas fa-clipboard-list"></i>
                <span>Registration</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-white">
                <i className="fas fa-book"></i>
                <span>Courses</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-white">
                <i className="fas fa-calendar-times"></i>
                <span>Drop Semester</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-white">
                <i className="fas fa-chart-bar"></i>
                <span>Result</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-white">
                <i className="fas fa-bell"></i>
                <span>Notice</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-white">
                <i className="fas fa-calendar-alt"></i>
                <span>Schedule</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-white">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
            </nav>
          </aside>
          <main className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <input
                type="text"
                placeholder="Search"
                className="w-1/3 p-2 rounded-lg shadow-md"
              />
              <div className="flex items-center space-x-4">
                <img
                  src="https://placehold.co/40x40"
                  alt="User "
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-sm text-gray-500">3rd year</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md mb-6">
              <p className="text-sm">September 4, 2023</p>
              <h2 className="text-2xl font-bold">Welcome back, John!</h2>
              <p>Always stay updated in your student portal</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="https://placehold.co/50x50"
                  alt="Total Payable"
                  className="mx-auto mb-4"
                />
                <p className="text-xl font-bold">$ 10,000</p>
                <p className="text-gray-500">Total Payable</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-purple-500">
                <img
                  src="https://placehold.co/50x50"
                  alt="Total Paid"
                  className="mx-auto mb-4"
                />
                <p className="text-xl font-bold">$ 5,000</p>
                <p className="text-gray-500">Total Paid</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="https://placehold.co/50x50"
                  alt="Others"
                  className="mx-auto mb-4"
                />
                <p className="text-xl font-bold">$ 300</p>
                <p className="text-gray-500">Others</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Enrolled Courses</h3>
              <a href="#" className="text-purple-500">
                See all
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="https://placehold.co/50x50"
                  alt="Object Oriented Programming"
                  className="mx-auto mb-4"
                />
                <p className="text-lg font-bold">Object Oriented Programming</p>
                <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
                  View
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="https://placehold.co/50x50"
                  alt="Fundamentals of Database Systems"
                  className="mx-auto mb-4"
                />
                <p className="text-lg font-bold">
                  Fundamentals of Database Systems
                </p>
                <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
                  View
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Course Instructors</h3>
              <a href="#" className="text-purple-500">
                See all
              </a>
            </div>
            <div className="flex space-x-4 mb-6">
              <img
                src="https://placehold.co/50x50"
                alt="Instructor 1"
                className="w-12 h-12 rounded-full"
              />
              <img
                src="https://placehold.co/50x50"
                alt="Instructor 2"
                className="w-12 h-12 rounded-full"
              />
              <img
                src="https://placehold.co/50x50"
                alt="Instructor 3"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Daily Notice</h3>
              <a href="#" className="text-purple-500">
                See all
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <h4 className="font-bold">Prelim payment due</h4>
                <p className="text-gray-500">
                  Sorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <a href="#" className="text-purple-500">
                  See more
                </a>
              </div>
              <div>
                <h4 className="font-bold">Exam schedule</h4>
                <p className="text-gray-500">
                  Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
                <a href="#" className="text-purple-500">
                  See more
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default studentDashboard;
