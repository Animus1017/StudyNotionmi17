export const formatDateToMonthYear = (isoDate) => {
  const date = new Date(isoDate);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed, add 1
  const year = date.getUTCFullYear();
  return `${month}/${year}`;
};
