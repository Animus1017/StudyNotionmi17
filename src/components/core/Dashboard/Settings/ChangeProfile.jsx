import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProfilePicture,
  updateProfilePicture,
} from "../../../../services/operations/settingsAPI";
import { PiUploadSimpleBold } from "react-icons/pi";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
const ChangeProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const [change, setChange] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [previewSource, setPreviewSource] = useState(null);
  const [imgFile, setImageFile] = useState(null);
  const fileRef = useRef(null);
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    } else {
      setChange(false);
      toast.error("No Picture Selected");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!imgFile) {
      setChange(false);
      toast.error("No Picture Selected");
      return;
    }
    const formData = new FormData();
    formData.append("displayPicture", imgFile);
    dispatch(updateProfilePicture(token, formData)).then(() => {
      setChange(false);
      setImageFile(null);
    });
    console.log("photo", user);
  };
  const handleFileRemove = async (e) => {
    e.preventDefault();
    dispatch(removeProfilePicture(token));
  };
  useEffect(() => {
    if (imgFile) {
      previewFile(imgFile);
    }
  }, [imgFile]);
  return (
    <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex gap-3 md:gap-5 border border-richblack-700 items-center w-full">
      <img
        src={previewSource || user?.image}
        alt={`profile-${user?.firstName}`}
        className="object-cover w-14 md:w-[78px] aspect-square rounded-full"
      />
      <div className="flex flex-col gap-3 ">
        <h3 className="text-richblack-25 font-medium">
          Change Profile Picture
        </h3>
        <div className="">
          {change ? (
            <div className="flex gap-3">
              <input
                type="file"
                className="hidden"
                ref={fileRef}
                accept="image/png,image/jpeg,image/jpg,image/gif"
                onChange={handleChange}
              />
              <button
                className="rounded-lg font-medium py-[6px] px-[18px] transition-all duration-200 hover:scale-95 bg-richblack-600 shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset] text-richblack-50"
                onClick={() => {
                  fileRef.current?.click();
                }}
                disabled={loading}
              >
                Select
              </button>
              <button
                className={`flex gap-1 items-center rounded-lg font-medium py-[6px] px-[18px] transition-all duration-200 hover:scale-95 bg-yellow-50 text-richblack-900 shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset]`}
                onClick={handleFileUpload}
              >
                {loading ? "Uploading..." : "Upload"}
                {!loading && (
                  <PiUploadSimpleBold className="text-lg text-richblack-900" />
                )}
              </button>
            </div>
          ) : (
            <div className="flex gap-3 flex-wrap">
              <button
                className={`flex gap-1 items-center rounded-lg font-medium py-[6px] px-[18px] transition-all duration-200 hover:scale-95 bg-yellow-50 text-richblack-900 shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset]`}
                onClick={() => setChange(true)}
              >
                Change
              </button>
              <button
                className="flex gap-1 items-center rounded-lg font-medium py-[6px] px-[18px] transition-all duration-200 hover:scale-95 bg-richblack-600 shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset] text-richblack-50"
                onClick={handleFileRemove}
              >
                {loading ? "Removing..." : "Remove"}
                {!loading && (
                  <TiDeleteOutline className="text-lg text-richblack-50" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
