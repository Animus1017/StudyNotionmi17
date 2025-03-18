import React from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";

const SidebarLinks = ({ link }) => {
  const location = useLocation();
  const Icon = Icons[link.icon];
  return (
    <Link
      to={link.path}
      className={`${
        location.pathname === link.path
          ? "border-l-2 border-l-yellow-50 bg-yellow-800 text-yellow-50"
          : "text-richblack-300"
      } py-2 px-3 lg:px-6 flex gap-3 text-sm font-medium items-center`}
    >
      <div>
        <Icon className="text-2xl md:text-lg" />
      </div>

      <span className="md:inline hidden">{link.name}</span>
    </Link>
  );
};

export default SidebarLinks;
