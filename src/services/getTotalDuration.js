export const getTotalDuration = (course) => {
  if (!course?.courseContent || !Array.isArray(course.courseContent)) {
    return "0 min"; // Return default if courseContent is missing
  }

  const totalSeconds = course.courseContent.reduce((total, section) => {
    if (!section?.subSections || !Array.isArray(section.subSections)) {
      return total; // Skip sections without valid subSections
    }
    return (
      total +
      section.subSections.reduce(
        (subTotal, sub) => subTotal + (parseFloat(sub?.timeDuration) || 0),
        0
      )
    );
  }, 0);

  // Convert seconds into hours, minutes, and remaining seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return hours > 0
    ? `${hours}h ${minutes}m ${seconds}s`
    : minutes > 0
    ? `${minutes}m ${seconds}s`
    : `${seconds}s`;
};
