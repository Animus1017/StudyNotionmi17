export function convertSecondsToDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);
  if (hours > 0) {
    return `${hours}hr ${minutes}min`;
  } else if (minutes > 0) {
    if (seconds > 0) {
      return `${minutes}min ${seconds}sec`;
    }
    return `${minutes}min`;
  } else {
    return `${seconds}sec`;
  }
}
export function convertSecondsToDurationShort(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}
export function convertSubsectionTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);
  if (hours > 0) {
    return `${hours}:${minutes}:00`;
  } else if (minutes > 0) {
    return `${minutes > 9 ? `${minutes}` : `0${minutes}`}:${
      seconds > 9 ? `${seconds}` : `0${seconds}`
    }`;
  } else {
    return `00:${seconds}`;
  }
}
export const convertDurationToReadable = (duration) => {
  // Step 1: Parse shorthand duration to total seconds
  let totalSeconds = typeof duration === "number" ? duration : 0;
  if (typeof duration === "string") {
    const hoursMatch = duration.match(/(\d+)h/);
    const minutesMatch = duration.match(/(\d+)m/);
    const secondsMatch = duration.match(/(\d+)s/);
    if (hoursMatch) totalSeconds += parseInt(hoursMatch[1]) * 3600;
    if (minutesMatch) totalSeconds += parseInt(minutesMatch[1]) * 60;
    if (secondsMatch) totalSeconds += parseInt(secondsMatch[1]);
  }

  // Step 2: Convert to fractional minutes with rounding
  const totalMinutes = totalSeconds / 60; // e.g., 76s / 60 = 1.2667 minutes
  const hours = Math.floor(totalMinutes / 60); // e.g., 0 hours
  const remainingMinutes = totalMinutes % 60; // e.g., 1.2667 minutes

  let result = [];
  if (hours > 0) {
    result.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  }

  if (remainingMinutes > 0) {
    // Round to 1 decimal place (e.g., 1.2667 → 1.3 minutes)
    const roundedMinutes = Math.round(remainingMinutes * 10) / 10;
    result.push(`${roundedMinutes} minute${roundedMinutes !== 1 ? "s" : ""}`);
  }

  // If no hours or minutes, show seconds
  if (totalMinutes === 0) {
    result.push(`${totalSeconds} second${totalSeconds !== 1 ? "s" : ""}`);
  }

  return result.join(" ");
};
export const secondsToReadable = (seconds) => {
  // Ensure input is a valid number, default to 0 if not
  const validSeconds =
    typeof seconds === "number" && !isNaN(seconds) ? seconds : 0;

  // Calculate hours (fractional)
  const totalHours = validSeconds / 3600; // 3600 seconds = 1 hour
  if (totalHours >= 1) {
    const roundedHours = Math.round(totalHours * 10) / 10; // 1 decimal place
    return `${roundedHours}hr`;
  }

  // Calculate minutes (fractional) if less than 1 hour
  const totalMinutes = validSeconds / 60; // 60 seconds = 1 minute
  if (totalMinutes >= 1) {
    const roundedMinutes = Math.round(totalMinutes * 10) / 10; // 1 decimal place
    return `${roundedMinutes}min`;
  }

  // Use seconds (fractional) if less than 1 minute
  const roundedSeconds = Math.round(validSeconds * 10) / 10; // 1 decimal place
  return `${roundedSeconds}sec`;
};
