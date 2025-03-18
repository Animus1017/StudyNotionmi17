import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLinks from "./SidebarLinks";
import Spinner from "../../common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { logoutFn } from "../../../services/operations/authAPI";
import Modal from "../../common/Modal";

const Sidebar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  if (authLoading || profileLoading) return <Spinner />;

  return (
    <div className="w-fit md:w-1/6 bg-richblack-800 border-r border-r-richblack-700 py-[30px] flex flex-col gap-[10px] h-full">
      {sidebarLinks.map((link) =>
        link?.type && link?.type !== user?.accountType ? null : (
          <SidebarLinks link={link} key={link.id} />
        )
      )}
      <div className=" py-1 px-4 ">
        <div className="bg-richblack-600 w-full h-[1px]"></div>
      </div>
      <div>
        <SidebarLinks
          link={{
            name: "Settings",
            path: "/dashboard/settings",
            icon: "VscSettingsGear",
          }}
        ></SidebarLinks>
        <button
          className="w-full py-2 px-3 lg:px-6 flex gap-3 text-sm font-medium items-center text-richblack-300"
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
          <VscSignOut className="text-2xl md:text-lg" />
          <span className="md:inline hidden">Log Out</span>
        </button>
      </div>
      {confirmationModal && (
        <Modal {...confirmationModal} setHandler={setConfirmationModal} />
      )}
    </div>
  );
};

export default Sidebar;
