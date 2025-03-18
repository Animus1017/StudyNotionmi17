import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuDivider,
} from "@szhsin/react-menu";
import Hamburger from "hamburger-react";
import "@szhsin/react-menu/dist/index.css";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import Modal from "./Modal";
import { logoutFn } from "../../services/operations/authAPI";

const NavbarMenu = ({ loading, subLinks }) => {
  const [isOpen, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [confirmationModal, setConfirmationModal] = useState(null);
  // Handle menu state changes from any source (click, outside click, etc.)
  const handleMenuChange = (e) => {
    setOpen(e.open);
  };

  return (
    <div>
      <Menu
        menuButton={({ open }) => (
          <MenuButton>
            {!token ? (
              <Hamburger
                toggled={open} // Use Menu's open state directly
                toggle={setOpen}
                rounded
                color="#F9F9F9"
              />
            ) : (
              <button className="flex items-center gap-1">
                <img
                  src={user?.image}
                  alt={`profile-${user?.firstName}`}
                  className="rounded-full w-8 object-cover aspect-square border bg-richblack-5"
                />
                <AiOutlineCaretDown
                  className={`${
                    isOpen ? "rotate-180" : ""
                  } transition-all duration-300 text-richblack-25`}
                />
              </button>
            )}
          </MenuButton>
        )}
        onMenuChange={handleMenuChange}
        menuClassName="bg-richblack-800 p-3 rounded-md border border-richblack-700 transition-all duration-300"
      >
        {NavbarLinks.map((link, index) =>
          link.title === "Catalog" ? (
            <SubMenu
              key={index}
              label={link.title}
              menuClassName=" rounded-lg bg-richblack-5 text-richblack-900 transition-all duration-200 p-4"
              className={`text-richblack-25 rounded-md transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-100 p-3`}
            >
              {loading ? (
                <MenuItem className="p-4 ">Loading...</MenuItem>
              ) : subLinks.length > 0 ? (
                subLinks
                  ?.filter((subLink) => subLink?.courses?.length > 0)
                  ?.map((subLink, subIndex) => (
                    <MenuItem
                      className="rounded-lg bg-transparent hover:bg-richblack-50 p-4 capitalize"
                      key={subIndex}
                    >
                      <Link
                        to={`/catalog/${subLink.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                      >
                        {subLink.name}
                      </Link>
                    </MenuItem>
                  ))
              ) : (
                <MenuItem className="p-4 ">No Categories Available</MenuItem>
              )}
            </SubMenu>
          ) : (
            <MenuItem
              key={index}
              className={`text-richblack-100 p-3 rounded-md transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-25 ${
                matchPath(link.path, location.pathname)
                  ? "bg-richblack-700"
                  : "text-richblack-25"
              }`}
            >
              <Link to={link.path}>{link.title}</Link>
            </MenuItem>
          )
        )}
        <MenuDivider className="bg-richblack-600" />
        {!token ? (
          <div className="flex flex-col gap-3 items-center">
            <MenuItem className="border-richblack-500 rounded-lg border px-3 py-2 text-richblack-100 bg-richblack-700 font-medium">
              <Link to="/login">
                <button>Login</button>
              </Link>
            </MenuItem>

            <MenuItem className=" border-richblack-500 rounded-lg border px-3 py-2 text-richblack-100 bg-richblack-700 font-medium">
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
            </MenuItem>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <MenuItem
              className={`text-richblack-100 p-3 rounded-md transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-25`}
            >
              <Link
                to="/dashboard/my-profile"
                className="flex items-center gap-1"
              >
                <VscDashboard className="text-lg" />
                Dashboard
              </Link>
            </MenuItem>
            <MenuItem
              className={`text-richblack-100 p-3 rounded-md transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-25`}
            >
              <div
                className="cursor-pointer flex items-center gap-1"
                onClick={() => {
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out of your account.",
                    btn1: {
                      text: "Logout",
                      action: () => {
                        dispatch(logoutFn(navigate));
                      },
                    },
                    btn2: {
                      text: "Cancel",
                      action: () => {
                        setConfirmationModal(null);
                      },
                    },
                  });
                }}
              >
                <VscSignOut className="text-lg" />
                Logout
              </div>
            </MenuItem>
          </div>
        )}
      </Menu>
      {confirmationModal && (
        <Modal {...confirmationModal} setHandler={setConfirmationModal} />
      )}
    </div>
  );
};

export default NavbarMenu;
