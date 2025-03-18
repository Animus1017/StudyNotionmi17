import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import "video-react/dist/video-react.css";
import { Player } from "video-react";

const UploadForm = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  const previewFile = (file) => {
    // console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleCancel = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPreviewSource(""); // Clear the preview
    setSelectedFile(null); // Clear the selected file
    setValue(name, null); // Set the value in the form to null
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset file input value
    }
  };

  useEffect(() => {
    register(name, { required: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue]);

  return (
    <label className="flex flex-col gap-[6px] w-full h-full pointer-events-none">
      <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
        {label}
        {!viewData && <sup className="text-pink-200">*</sup>}
      </p>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : " bg-richblack-700"
        } rounded-lg border-dashed border py-8 px-3  border-richblack-600 transition-all duration-200  overflow-hidden pointer-events-auto cursor-pointer `}
      >
        {previewSource ? (
          <div className="flex flex-col gap-2 items-center justify-center">
            {video ? (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            ) : (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={handleCancel}
                className="text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex flex-col gap-2 items-center justify-center cursor-pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} className="hidden" />
            <div className="p-3 rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="text-xs text-richblack-200 text-center">
              Drag and drop an {video ? "video" : "image"}, or{" "}
              <span className="text-yellow-50 font-semibold">Browse</span>{" "}
              <br /> Max 6MB each (12MB for videos)
            </p>
            <ul className="p-[10px] gap-6 md:gap-8 lg:gap-[52px] text-xs font-semibold text-richblack-400 flex list-disc list-inside">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="-mt-1 text-xs text-pink-200">
          {label} is required**
        </span>
      )}
    </label>
  );
};

export default UploadForm;
