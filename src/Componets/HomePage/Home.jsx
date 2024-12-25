import React from "react";
import Services from "./Services";
import AboutUs from "./AboutUs";
import WelcomePage from "./Welcome";
import OurTeam from "./OurTeam";
import ContactUs from "../ContactUs/ContactUs";
import Tabs from "./Tabs";
import TopStudents from "../UserDashboard/Common/TopStudents";
const Home = () => {
  return (
    <div className="bg-sky-100">
      <WelcomePage />
      {/* <SearchPage /> */}
      <TopStudents />

      <section id="about" className="">
        <div className="container mx-auto">
          <AboutUs />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="">
        <div className="container mx-auto">
          <Services />
        </div>
      </section>
      <Tabs />
      <section id="services" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <OurTeam />
        </div>
      </section>
      <section id="services" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <ContactUs />
        </div>
      </section>
    </div>
  );
};

export default Home;
