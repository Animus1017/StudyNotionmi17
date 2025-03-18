import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Error from "./components/common/Error";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings/Settings";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/Create Course/AddCourse";
import MyCourses from "./components/core/Dashboard/Instructor Courses/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import Cart from "./components/core/Dashboard/Cart/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";
import StudentDashboard from "./components/core/Dashboard/Student Dashboard/StudentDashboard";
import PurchaseHistory from "./components/core/Dashboard/Payment History/PurchaseHistory";
function App() {
  const { user } = useSelector((state) => state.profile);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="flex flex-col gap-8 md:gap-16">
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: "/about",
      element: (
        <div className="flex flex-col">
          <Navbar />
          <About />
        </div>
      ),
    },
    {
      path: "/contact",
      element: (
        <div>
          <Navbar />
          <Contact />
        </div>
      ),
    },
    {
      path: "*",
      element: (
        <div>
          <Navbar />
          <Error />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Navbar />
          <OpenRoute>
            <Login />
          </OpenRoute>
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div>
          <Navbar />
          <OpenRoute>
            <SignUp />
          </OpenRoute>
        </div>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <div className="w-full h-full">
          <Navbar />
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        </div>
      ),
    },
    {
      path: "/update-password/:id",
      element: (
        <div className="w-full h-full">
          <Navbar />
          <OpenRoute>
            <ResetPassword />
          </OpenRoute>
        </div>
      ),
    },
    {
      path: "/verify-email",
      element: (
        <div className="w-full h-full">
          <Navbar />
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        </div>
      ),
    },
    {
      element: (
        <div className="flex flex-grow flex-col">
          <Navbar />
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        </div>
      ),
      children: [
        {
          path: "/dashboard/my-profile",
          element: <MyProfile />,
        },
        {
          path: "/dashboard/settings",
          element: <Settings />,
        },
        ...(user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
          ? [
              {
                path: "/dashboard/add-course",
                element: <AddCourse />,
              },
              {
                path: "/dashboard/my-courses",
                element: <MyCourses />,
              },
              {
                path: "/dashboard/edit-course/:courseId",
                element: <EditCourse />,
              },
              {
                path: "/dashboard/instructor",
                element: <InstructorDashboard />,
              },
            ]
          : [
              {
                path: "/dashboard/cart",
                element: <Cart />,
              },
              {
                path: "/dashboard/enrolled-courses",
                element: <EnrolledCourses />,
              },
              {
                path: "/dashboard/student",
                element: <StudentDashboard />,
              },
              {
                path: "/dashboard/purchase-history",
                element: <PurchaseHistory />,
              },
            ]),
      ],
    },
    {
      path: "/catalog/:catalogName",
      element: (
        <div className="">
          <Navbar />
          <Catalog />
        </div>
      ),
    },
    {
      path: "/course/:courseId",
      element: (
        <div className="">
          <Navbar />
          <CourseDetails />
        </div>
      ),
    },
    {
      element: (
        <div className="flex flex-grow flex-col">
          <Navbar />
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        </div>
      ),
      children: [
        ...(user?.accountType === ACCOUNT_TYPE.STUDENT
          ? [
              {
                path: "/view-course/:courseId/section/:sectionId/sub-section/:subSectionId",
                element: <VideoDetails />,
              },
            ]
          : []),
      ],
    },
  ]);
  return (
    <div className="w-screen h-screen overflow-x-hidden box-border bg-richblack-900 font-inter flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
