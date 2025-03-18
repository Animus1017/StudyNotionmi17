import React from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FooterLink2 } from "../../data/footer-links";
const BottomFooter = ["Privacy Policy", "", "Cookie Policy", "", "Terms"];

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const Footer = () => {
  return (
    <div className="bg-richblack-800 border-t border-richblack-600 py-8 md:py-[52px]">
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-4 md:gap-6 lg:gap-8 leading-6 text-richblack-400">
        {/* top */}
        <div className="flex flex-col sm:flex-row gap-6 md:gap-[52px]">
          {/* left */}
          <div className="flex gap-3 justify-between w-full sm:w-1/2">
            {/* company */}
            <div className="flex flex-col gap-3 w-1/2 md:w-[30%]">
              <Link to="/">
                <img
                  src={logo}
                  alt="logo"
                  className="object-contain w-40 h-8 aspect-auto"
                />
              </Link>
              <h6 className="font-semibold text-richblack-100">Company</h6>
              <div className="flex flex-col gap-2 ">
                {["About", "Careers", "Affiliates"].map((element, index) => (
                  <Link
                    key={index}
                    to={element.toLowerCase()}
                    className="text-richblack-400 font-normal text-sm hover:text-richblack-50 transition-all duration-200"
                  >
                    {element}
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 text-xl items-center">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
              {/* plans */}
              <div className="flex md:hidden flex-col gap-3">
                <h6 className="font-semibold text-richblack-100">Plans</h6>
                <div className="flex flex-col gap-2">
                  {Plans.map((element, index) => (
                    <Link
                      key={index}
                      to={element.split(" ").join("-").toLowerCase()}
                      className="text-richblack-400 font-normal text-sm hover:text-richblack-50 transition-all duration-200"
                    >
                      {element}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* resources */}
            <div className="flex flex-col gap-3 md:gap-9 w-1/2 md:w-[30%]">
              <div className="flex flex-col gap-3">
                <h6 className="font-semibold text-richblack-100">Resources</h6>
                <div className="flex flex-col gap-2">
                  {Resources.map((element, index) => (
                    <Link
                      key={index}
                      to={element.split(" ").join("-").toLowerCase()}
                      className="text-richblack-400 font-normal text-sm hover:text-richblack-50 transition-all duration-200"
                    >
                      {element}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h6 className="font-semibold text-richblack-100">Support</h6>
                <Link
                  to="help-center"
                  className="text-richblack-400 font-normal text-sm hover:text-richblack-50 transition-all duration-200"
                >
                  Help Center
                </Link>
              </div>
              {/* community */}
              <div className="flex flex-col gap-3 md:hidden">
                <h6 className="font-semibold text-richblack-100">Community</h6>
                <div className="flex flex-col gap-2">
                  {Community.map((element, index) => (
                    <Link
                      key={index}
                      to={element.toLowerCase()}
                      className="text-richblack-400 font-normal text-sm hover:text-richblack-50 transition-all duration-200"
                    >
                      {element}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* plans */}
            <div className="md:flex hidden flex-col gap-9 w-[30%]">
              <div className="flex flex-col gap-3">
                <h6 className="font-semibold text-richblack-100">Plans</h6>
                <div className="flex flex-col gap-2">
                  {Plans.map((element, index) => (
                    <Link
                      key={index}
                      to={element.split(" ").join("-").toLowerCase()}
                      className="text-richblack-400 font-normal text-sm hover:text-richblack-50 transition-all duration-200"
                    >
                      {element}
                    </Link>
                  ))}
                </div>
              </div>
              {/* community */}
              <div className="flex flex-col gap-3">
                <h6 className="font-semibold text-richblack-100">Community</h6>
                <div className="flex flex-col gap-2">
                  {Community.map((element, index) => (
                    <Link
                      key={index}
                      to={element.toLowerCase()}
                      className="text-richblack-400 font-normal text-sm hover:text-richblack-50 transition-all duration-200"
                    >
                      {element}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* line */}
          <div className="bg-richblack-700 w-[1px] max-h-full sm:inline-block hidden"></div>
          <div className="bg-richblack-700 h-[1px] max-w-full sm:hidden inline-block"></div>
          {/* right */}
          <div className="flex gap-3 justify-between w-full sm:w-1/2">
            {FooterLink2.map((element, index) =>
              index === 1 ? (
                <div
                  className="flex flex-col gap-3 w-1/2 md:w-[30%]"
                  key={index}
                >
                  {element.map((ele, index) => (
                    <div
                      key={index}
                      className={`flex-col gap-3 w-full sm:w-1/2 md:w-[30%] ${
                        ele.title === "Career building"
                          ? "flex md:hidden"
                          : "flex"
                      }`}
                    >
                      <h6 className="font-semibold text-richblack-100">
                        {ele.title}
                      </h6>
                      <div className="flex flex-col gap-2">
                        {ele.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            to={link.link.toLowerCase()}
                            className="text-richblack-400 font-normal text-sm hover:text-richblack-50 transition-all duration-200"
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  key={index}
                  className={`flex-col gap-3 w-1/2 md:w-[30%] ${
                    element.title === "Career building"
                      ? "hidden md:flex"
                      : "flex"
                  }`}
                >
                  <h6 className="font-semibold text-richblack-100">
                    {element.title}
                  </h6>
                  <div className="flex flex-col gap-2">
                    {element.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.link.toLowerCase()}
                        className="text-richblack-400 font-normal text-sm hover:text-richblack-50 transition-all duration-200"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        {/* line */}
        <div className="h-[1px] max-w-full bg-richblack-700"></div>
        {/* bottom */}
        <div className="flex flex-col gap-3 sm:flex-row justify-between items-center text-sm text-richblack-300">
          <div className="flex gap-2">
            {BottomFooter.map((element, index) =>
              index & 1 ? (
                <div
                  key={index}
                  className="w-[1px] max-h-full bg-richblack-700"
                ></div>
              ) : (
                <Link
                  key={index}
                  to={element.split(" ").join("-").toLowerCase()}
                  className="text-richblack-400 hover:text-richblack-50 transition-all duration-200"
                >
                  {element}
                </Link>
              )
            )}
          </div>
          <p>Made with🍎 for MI17 © 2025 Studynotion</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
