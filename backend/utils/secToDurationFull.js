function convertSecondsToDurationFull(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);
  if (hours > 0) {
    return `${hours}hr ${minutes}mins`;
  } else if (minutes > 0) {
    if (seconds === 0) return `${minutes}mins`;
    else return `${minutes}mins ${seconds}sec`;
  } else {
    return `${seconds}sec`;
  }
}
module.exports = { convertSecondsToDurationFull };
