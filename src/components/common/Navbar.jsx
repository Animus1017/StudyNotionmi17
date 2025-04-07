import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { fetchCourseCategories } from "../../services/operations/CourseDetailsAPI";
import NavbarMenu from "./NavbarMenu";
import { ACCOUNT_TYPE } from "../../utils/constants";
const Navbar = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.profile?.user);
  const { loading } = useSelector((state) => state.auth);
  const totalItems = useSelector((state) => state.cart?.totalItems);
  const [subLinks, setSubLinks] = useState([]);
  const { course } = useSelector((state) => state.course);

  async function fetchSublinks() {
    const response = await fetchCourseCategories();
    if (response.length) setSubLinks(response);
  }
  useEffect(() => {
    fetchSublinks();
  }, [course]);
  return (
    <div className="bg-richblack-900 border-b border-richblack-700">
      <div className="w-11/12 max-w-maxContent mx-auto py-3 flex items-center justify-between">
        {/* logo */}
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="object-contain w-40 h-8"
            loading="lazy"
          />
        </Link>
        {/* navlinks */}
        <nav className="hidden md:inline-block">
          <ul className="flex gap-6 text-richblack-25">
            {NavbarLinks.map((link, index) =>
              link.title === "Catalog" ? (
                <div
                  key={index}
                  className="flex items-center gap-1 group relative"
                >
                  <p>{link.title}</p>
                  <MdOutlineKeyboardArrowDown className="text-richblack-100" />
                  <div
                    className="absolute top-[165%] -left-[165%] invisible group-hover:visible flex flex-col rounded-lg bg-richblack-5
                   text-richblack-900 transition-all duration-200 opacity-0 group-hover:opacity-100 p-4 w-72 z-[500]"
                  >
                    <div className="absolute left-2/3 -top-[1%] w-6 h-6 rounded rotate-45 bg-richblack-5 -z-10"></div>

                    {loading ? (
                      <div className="p-4 ">Loading...</div>
                    ) : subLinks.length > 0 ? (
                      subLinks
                        ?.filter((subLink) => subLink?.courses?.length > 0)
                        ?.map((subLink, subIndex) => (
                          <Link
                            key={subIndex}
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent hover:bg-richblack-50 p-4 capitalize"
                          >
                            {subLink.name}
                          </Link>
                        ))
                    ) : (
                      <div className="p-4 ">No Categories Available</div>
                    )}
                  </div>
                </div>
              ) : (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`${
                      matchPath(link.path, location.pathname)
                        ? "text-yellow-50"
                        : ""
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
        {/* login/signup/dashboard */}
        <div className="items-center gap-5 hidden md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <MdOutlineShoppingCart className="text-richblack-200 text-2xl" />
              {totalItems > 0 ? (
                <div className="bg-caribbeangreen-100 rounded-full w-4 aspect-square flex justify-center items-center absolute top-0 animate-bounce right-0">
                  <span className="text-[10px] text-richblack-5">
                    {totalItems}
                  </span>
                </div>
              ) : null}
            </Link>
          )}
          {!token && (
            <Link
              to="/login"
              className=" border-richblack-700 rounded-lg border px-3 py-2 text-richblack-100 bg-richblack-800 font-medium"
            >
              <button>Login</button>
            </Link>
          )}
          {!token && (
            <Link
              to="/signup"
              className="border-richblack-700 rounded-lg border px-3 py-2 text-richblack-100 bg-richblack-800 font-medium"
            >
              <button>Sign Up</button>
            </Link>
          )}
          {token && <ProfileDropDown />}
        </div>
        {/* Hamburger */}
        <div className="flex md:hidden relative gap-2 items-center">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <MdOutlineShoppingCart className="text-richblack-200 text-2xl" />
              {totalItems > 0 ? (
                <div className="bg-caribbeangreen-100 rounded-full w-4 aspect-square flex justify-center items-center absolute top-0 animate-bounce right-0">
                  <span className="text-[10px] text-richblack-5">
                    {totalItems}
                  </span>
                </div>
              ) : null}
            </Link>
          )}
          <NavbarMenu loading={loading} subLinks={subLinks} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
