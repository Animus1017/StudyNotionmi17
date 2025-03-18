import React from "react";
import BrighterFuture from "../components/core/About/BrighterFuture";
import QuoteStory from "../components/core/About/QuoteStory";
import Stats from "../components/core/About/Stats";
import LearningGrid from "../components/core/About/LearningGrid";
import ContactusForm from "../components/common/ContactusForm";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const About = () => {
  return (
    <div>
      {/* section1 */}
      <div>
        <BrighterFuture />
      </div>
      {/* section2 */}
      <QuoteStory />
      {/* section3 */}
      <Stats />
      {/* section4 */}
      <LearningGrid />
      {/* section5 */}
      <div className="max-w-maxContent w-11/12 mx-auto pt-8 md:pt-16 lg:pt-[90px]">
        <div className="flex flex-col gap-6 md:gap-8 items-center">
          <div className="flex flex-col gap-3 items-center">
            <h2 className="text-3xl lg:text-4xl text-richblack-5 font-semibold">
              Get in Touch
            </h2>
            <p className="font-medium text-richblack-300">
              We’d love to here for you, Please fill out this form.
            </p>
          </div>
          <div className="p-0 md:p-8 w-full md:w-9/12 lg:w-1/2">
            <ContactusForm />
          </div>
        </div>
      </div>
      {/* section7 */}
      <ReviewSlider />
      {/* section8 */}
      <Footer />
    </div>
  );
};

export default About;
