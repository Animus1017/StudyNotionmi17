import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPaymentsHistoryData } from "../../../../services/operations/paymentAPI";
import Spinner from "../../../common/Spinner";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../services/formatData";

const PurchaseHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetchPaymentsHistoryData(token);
      if (response) setPurchaseHistory(response);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentLoading]);

  useEffect(() => {
    console.log(purchaseHistory);
  }, [purchaseHistory]);

  if (loading) return <Spinner />;

  return (
    <div className="w-full md:w-[98%] xl:w-[90%] flex flex-col">
      {/* Header Section */}
      <div className="p-4 md:p-6 flex flex-col gap-3">
        <p className="text-sm text-richblack-300">
          <Link to="/">Home</Link> /{" "}
          <Link to="/dashboard/student">Dashboard</Link> /{" "}
          <Link>
            <span className="text-yellow-50 font-medium">Purchase History</span>
          </Link>
        </p>
        <h2 className="text-richblack-5 font-medium text-2xl sm:text-3xl">
          Purchase History
        </h2>
      </div>

      {/* Table Section */}
      <div className="border border-richblack-700 rounded-lg m-4 md:m-6">
        {/* Table Header */}
        <div className="hidden lg:flex border-b border-b-richblack-700 p-4 gap-4 rounded-t-lg bg-richblack-700 text-richblack-50 text-sm font-medium">
          <p className="w-[12%] xl:w-[35%]">Courses</p>
          <p className="w-[30%]">Order Id</p>
          <p className="w-[27%]">Payment Id</p>
          <p className="w-[30%]">Created At</p>
          <p className="w-[13%]">Amount</p>
        </div>

        {/* Table Body */}
        <div>
          {!purchaseHistory.length ? (
            <p className="text-richblack-400 p-4">No purchases done</p>
          ) : (
            purchaseHistory.map((payment, index) => (
              <div
                key={payment?._id}
                className={`p-4 flex flex-col sm:flex-row gap-4 ${
                  index === purchaseHistory.length - 1
                    ? ""
                    : "border-b border-b-richblack-700"
                }`}
              >
                {/* Course Details */}
                <div className="flex flex-col gap-3 w-full sm:w-1/2 lg:w-[10%] xl:w-1/4">
                  {payment?.courseIds.map((course) => (
                    <div
                      className="flex items-center lg:items-start xl:items-center xl:flex-row flex-row lg:flex-col gap-3 xl:gap-5"
                      key={course?._id}
                    >
                      <img
                        src={course?.courseThumbnail}
                        alt={`course-${course?.courseName}`}
                        className="h-12 sm:h-[52px] aspect-square rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-[2px] flex-grow">
                        <h6 className="text-richblack-5 font-medium text-sm sm:text-base">
                          {course?.courseName}
                        </h6>
                        <p className="text-richblack-300 text-sm sm:text-lg">
                          Rs. {course?.coursePrice}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Other Details (stack vertically on mobile) */}
                <div className="flex flex-col gap-2 lg:flex-row flex-grow ">
                  <div className="flex flex-col w-full lg:w-[30%]">
                    <p className="text-richblack-400 lg:hidden font-medium">
                      Order Id
                    </p>
                    <p className="font-medium text-richblack-50">
                      {payment?.orderId}
                    </p>
                  </div>
                  <div className="flex flex-col w-full lg:w-[27%]">
                    <p className="text-richblack-400 lg:hidden font-medium">
                      Payment Id
                    </p>
                    <p className="font-medium text-richblack-50">
                      {payment?.paymentId}
                    </p>
                  </div>
                  <div className="flex flex-col w-full lg:w-[30%]">
                    <p className="text-richblack-400 lg:hidden font-medium">
                      Created At
                    </p>
                    <p className="font-medium text-richblack-50">
                      {formatDate(payment?.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col w-full lg:w-[13%]">
                    <p className="text-richblack-400 lg:hidden font-medium">
                      Amount
                    </p>
                    <p className="font-medium text-richblack-50">
                      Rs. {payment?.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
