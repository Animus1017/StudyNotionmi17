import React, { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { Link, useNavigate } from "react-router-dom";
import { logoutFn } from "../../../services/operations/authAPI";
import Modal from "../../common/Modal";

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const user = useSelector((state) => state.profile?.user);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useOnClickOutside(ref, (event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target)) return;
    setOpen(false);
  });
  if (!user) return null;
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1"
        ref={buttonRef}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="rounded-full w-8 object-cover aspect-square border bg-richblack-5"
        />
        <AiOutlineCaretDown
          className={`${
            open ? "rotate-180" : ""
          } transition-all duration-300 text-richblack-25`}
        />
      </button>
      {open && (
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          className={`right-0 top-[120%] flex flex-col gap-2 bg-richblack-800 p-3 rounded-md border border-richblack-700 transition-all duration-300 z-50 absolute ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            to="/dashboard/my-profile"
            className="flex text-richblack-100 items-center gap-1 p-3 rounded-md transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-25"
            onClick={() => {
              setOpen(false);
            }}
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </Link>
          <div className="bg-richblack-700 h-[1px] rounded-sm max-h-full"></div>
          <div
            className="cursor-pointer flex text-richblack-100 items-center gap-1 p-3 rounded-md transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-25"
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
          {confirmationModal && (
            <Modal {...confirmationModal} setHandler={setConfirmationModal} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
