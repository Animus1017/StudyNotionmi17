const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const mediaUpload = async (file, folder, quality, height) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: folder,
      resource_type: "auto",
      quality: quality,
      height: height,
    });
    return result;
  } catch (error) {
    return error;
  }
};
module.exports = mediaUpload;
