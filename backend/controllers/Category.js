const Category = require("../models/Category");
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name)
      return res.status(400).json({
        success: false,
        error: "Please provide both name and description",
      });
    const categoryExists = await Category.findOne({ name });
    if (categoryExists)
      return res.status(400).json({
        success: false,
        error: "Category with the same name already exists",
      });
    const category = new Category({ name, description });
    await category.save();
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      category: category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to create category",
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      {
        name: true,
        description: true,
      }
    ).populate("courses");
    res.status(200).json({
      success: true,
      categories: categories,
      message: "Categories fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to get all categories",
    });
  }
};
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "ratingAndReview" }, { path: "courseInstructor" }],
      })
      .exec();
    if (!selectedCategory)
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    if (selectedCategory.courses.length === 0)
      return res.status(404).json({
        success: false,
        message: "No courses available in this category",
      });
    // const selectedCourse = selectedCategory.courses;
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "ratingAndReview" }, { path: "courseInstructor" }],
      })
      .exec();
    const nonEmptyCategory = categoriesExceptSelected.filter(
      (c) => c.courses.length > 0
    );
    if (!nonEmptyCategory.length)
      return res.status(404).json({
        success: false,
        message: "No other categories available to compare with",
      });
    let diffCategory = nonEmptyCategory[getRandomInt(nonEmptyCategory.length)];

    // let diffCourses = [];
    // diffCategories.forEach((category) => {
    //   diffCourses.push(...category.courses);
    // });
    const allcategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "ratingAndReview" }, { path: "courseInstructor" }],
      })
      .exec();
    const allCourses = allcategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort(
        (a, b) =>
          (b.courseStudents?.length || 0) - (a.courseStudents?.length || 0)
      )
      .slice(0, 10);
    res.status(200).json({
      success: true,
      message: "Courses details fetched successfully",
      selectedCategory,
      diffCategory,
      mostSellingCourses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to get category details",
    });
  }
};
