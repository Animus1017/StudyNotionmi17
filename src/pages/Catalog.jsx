import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCourseCategories } from "../services/operations/CourseDetailsAPI";
import { fetchCatalogData } from "../services/operations/catalogAPI";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Spinner from "../components/common/Spinner";
import CourseCard from "../components/core/Catalog/CourseCard";
import Footer from "../components/common/Footer";

const Catalog = () => {
  const [categorizedCourses, setCategorizedCourses] = useState({
    mostPopular: [],
    newCourses: [],
    trending: [],
  });
  const [categorizedDiffCourses, setCategorizedDiffCourses] = useState({
    mostPopular: [],
  });
  const [active, setActive] = useState(1);
  const { catalogName } = useParams();
  const [catalogPagedata, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  async function fetchCatagories() {
    const response = await fetchCourseCategories();
    const category = response.filter(
      (c) => c.name.split(" ").join("-").toLowerCase() === catalogName
    )[0]._id;
    setCategoryId(category);
  }
  async function fetchCatalog() {
    setLoading(true);
    const response = await fetchCatalogData(categoryId);
    setCatalogPageData(response);
    setLoading(false);
  }
  const categorizeCourses = (courses) => {
    const hasStudentData = courses.some(
      (course) => course.courseStudents?.length > 0
    );

    const mostPopular = [...courses].sort((a, b) => {
      if (hasStudentData) {
        return (
          (b.courseStudents?.length || 0) - (a.courseStudents?.length || 0)
        );
      }
      return b.coursePrice - a.coursePrice;
    });

    const newCourses = [...courses].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const trending = [...courses].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    return { mostPopular, newCourses, trending };
  };

  useEffect(() => {
    fetchCatagories();
  }, [catalogName]);
  useEffect(() => {
    if (categoryId) {
      fetchCatalog();
    }
  }, [categoryId]);
  useEffect(() => {
    if (catalogPagedata) {
      setCategorizedCourses(
        categorizeCourses(catalogPagedata?.selectedCategory?.courses)
      );
      setCategorizedDiffCourses(
        categorizeCourses(catalogPagedata?.diffCategory?.courses)
      );
    }
  }, [catalogPagedata]);

  if (loading) return <Spinner />;
  return (
    <div className="flex flex-col">
      <div className="bg-richblack-800 py-8 md:py-11">
        <div className="w-11/12 max-w-maxContent mx-auto flex gap-6 md:flex-row flex-col">
          <div className="flex flex-col gap-3 w-full  md:w-[70%]">
            <div className="text-sm text-richblack-300">
              <Link to="/" className="">
                Home
              </Link>{" "}
              /{" "}
              <Link
                to={`/catalog/${catalogPagedata?.selectedCategory?.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
              >
                Catalog /{" "}
                <span className="text-yellow-50 font-medium">
                  {catalogPagedata?.selectedCategory?.name}
                </span>
              </Link>
            </div>
            <h2 className="text-richblack-5 font-medium text-3xl">
              {catalogPagedata?.selectedCategory?.name}
            </h2>
            <p className="text-richblack-200 text-sm">
              {catalogPagedata?.selectedCategory?.description}
            </p>
          </div>
          <div className="border border-richblack-700"></div>
          <div className="flex flex-col shadow-[12px_12px_0px_0px_#161D291A] flex-grow">
            <h4 className="text-richblack-5 font-semibold text-lg">
              Related resources
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-richblack-100 list-inside list-disc">
              <li>Doc {catalogPagedata?.selectedCategory?.name}</li>
              <li>Cheatsheets</li>
              <li>Articles</li>
              <li>Community Forums</li>
              <li>Projects</li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" w-11/12 max-w-maxContent mx-auto">
        <div className="md:py-11 py-8 flex flex-col gap-5 md:gap-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-richblack-5 font-semibold text-3xl">
              Courses to get you started
            </h3>
            <div className="flex">
              <button
                onClick={() => setActive(1)}
                className={`py-2 px-3 ${
                  active === 1
                    ? "text-yellow-100 border-b-yellow-100 font-medium"
                    : "text-richblack-200 border-b-richblack-600"
                } border-b transition-all duration-200`}
              >
                Most popular
              </button>
              <button
                onClick={() => setActive(2)}
                className={`py-2 px-3 ${
                  active === 2
                    ? "text-yellow-100 border-b-yellow-100 font-medium"
                    : "text-richblack-200 border-b-richblack-600"
                } border-b transition-all duration-200`}
              >
                New
              </button>
              <button
                onClick={() => setActive(3)}
                className={`py-2 px-3 ${
                  active === 3
                    ? "text-yellow-100 border-b-yellow-100 font-medium"
                    : "text-richblack-200 border-b-richblack-600"
                } border-b transition-all duration-200`}
              >
                Trending
              </button>
              <div className="border-b border-b-richblack-600 flex-grow"></div>
            </div>
          </div>
          <CourseSlider
            courses={
              active === 1
                ? categorizedCourses.mostPopular
                : active === 2
                ? categorizedCourses.newCourses
                : categorizedCourses.trending
            }
            active={active}
          />
        </div>
        <div className="flex flex-col gap-5 md:gap-10">
          <h3 className="text-richblack-5 font-semibold text-3xl">
            Top courses in {catalogPagedata?.diffCategory?.name}
          </h3>
          <CourseSlider
            courses={catalogPagedata?.diffCategory?.courses}
            diffBest={categorizedDiffCourses?.mostPopular[0]?._id}
          />
        </div>
        <div className="flex flex-col gap-5 md:gap-10 py-8 md:py-16">
          <h3 className="text-richblack-5 font-semibold text-3xl">
            Frequently Bought Together
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {catalogPagedata?.mostSellingCourses?.slice(0, 4).map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                height="h-72 sm:h-[304px]"
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
