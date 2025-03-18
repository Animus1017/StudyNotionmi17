import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  if (authLoading || profileLoading) return <Spinner />;
  return (
    <div className="h-full flex">
      <Sidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
