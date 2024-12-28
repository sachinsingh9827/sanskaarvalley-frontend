import React, { useEffect, useRef } from "react";
import me1 from "./assets/me1.svg"; // You can replace these images with teacher/student images
import me2 from "./assets/me2.svg";
import me3 from "./assets/me3.svg";
import me4 from "./assets/me4.svg";
import { Link } from "react-router-dom";

const OurTeam = () => {
  const teamMembers = [
    { id: 1, src: me1, name: "John Doe", role: "Principal" },
    { id: 2, src: me2, name: "Jane Smith", role: "Math Teacher" },
    { id: 3, src: me3, name: "Mark Johnson", role: "Science Teacher" },
    { id: 4, src: me4, name: "Emily Davis", role: "History Teacher" },
  ];
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (window.innerWidth <= 640) {
      const scrollInterval = setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollBy({
            left: scrollContainer.offsetWidth,
            behavior: "smooth",
          });
          if (
            scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
            scrollContainer.scrollWidth
          ) {
            scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
          }
        }
      }, 1000);

      return () => clearInterval(scrollInterval); // Cleanup on unmount
    }
  }, []);

  return (
    <>
      <div className="container mx-auto font-montserrat px-2 py-2">
        <div
          className="welcome-section text-center py-8 px-6"
          style={{
            background: "linear-gradient(to right, #105183, #252472)",
            borderRadius: "15px",
            color: "white",
          }}
        >
          <h2 className="text-white font-semibold text-4xl sm:text-5xl mb-6 animate__animated animate__fadeIn">
            Meet Our Educators
          </h2>

          {/* Introduction Section */}

          <p className="welcome-title text-white text-sm  font-medium max-w-3xl mx-auto">
            At MP Public School, we are dedicated to providing the highest level
            of education to our students. Our team of educators brings a wealth
            of knowledge and experience to foster a nurturing learning
            environment.
          </p>
        </div>
      </div>
      <section className="flex flex-col font-montserrat items-center px-4 py-4">
        {/* Section Heading */}

        {/* Team Grid */}
        <div className="font-montserrat grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`relative flex flex-col items-center bg-white shadow-lg rounded-lg p-4 transition-transform duration-300 hover:scale-105 ${
                index % 1 === 0 ? "animate-fadeIn" : "animate-zoomIn"
              }`}
            >
              {/* Member Image */}
              <div className="w-full h-56 overflow-hidden rounded-lg mb-4">
                <img
                  src={member.src}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Member Details */}
              <h3 className="text-lg font-montserrat font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
        <Link
          to="/careers"
          className="border-2 border-sky-500 m-4 text-[#105183] hover:bg-sky-500 hover:text-white font-bold py-2 px-4 rounded-full w-full justify-center items-center flex"
        >
          join our team
        </Link>
      </section>
    </>
  );
};

export default OurTeam;
