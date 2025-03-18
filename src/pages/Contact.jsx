import React from "react";
import { FaPhone } from "react-icons/fa6";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import ContactusForm from "../components/common/ContactusForm";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
const contactDetails = [
  {
    id: 1,
    heading: "Chat on us",
    subheading: "Our friendly team is here to help.",
    contact: "@mail address",
    icon: <HiChatBubbleLeftRight />,
  },
  {
    id: 2,
    heading: "Visit us",
    subheading: "Come and say hello at our office HQ.",
    contact: "Here is the location/ address",
    icon: <BsGlobeEuropeAfrica />,
  },
  {
    id: 3,
    heading: "Call us",
    subheading: "Mon - Fri From 8am to 5pm",
    contact: "+123 456 7890",
    icon: <FaPhone />,
  },
];
const Contact = () => {
  return (
    <div>
      {/* section1 */}
      <div className="max-w-maxContent w-11/12 mx-auto py-8 md:py-16 lg:py-[90px] flex gap-8 lg:gap-10 xl:gap-[52px] lg:flex-row flex-col">
        <div className="rounded-xl bg-richblack-800  p-6 flex flex-col gap-6 h-fit w-full lg:w-[37%]">
          {contactDetails.map((detail) => (
            <div key={detail.id} className="flex gap-[9px] p-3">
              <div className="text-richblack-100 text-2xl">{detail.icon}</div>
              <div className="flex flex-col gap-[2px]">
                <h3 className="text-richblack-5 text-lg font-semibold">
                  {detail.heading}
                </h3>
                <p className="font-medium text-sm text-richblack-200">
                  {detail.subheading}
                </p>
                <p className="font-semibold text-sm text-richblack-200">
                  {detail.contact}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-8 p-6 sm:p-8 md:p-[52px] rounded-xl border border-richblack-600 w-full lg:w-[63%]">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-3xl lg:text-4xl text-richblack-5">
              Got a Idea? We’ve got the skills. Let’s team up
            </h2>
            <p className="text-richblack-300 font-medium">
              Tall us more about yourself and what you’re got in mind.
            </p>
          </div>
          <ContactusForm />
        </div>
      </div>
      {/* section2 */}
      <ReviewSlider />
      {/* section3 */}
      <Footer />
    </div>
  );
};

export default Contact;
