import toast from "react-hot-toast";
import { setLoading } from "../../redux/slices/authSlice";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../redux/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { logoutFn } from "./authAPI";
const {
  UPDATE_DISPLAY_PICTURE_API,
  REMOVE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;
export function updateProfilePicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    // console.log("TOKEN BEING SENT:", token);
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("UPDATE_PROFILE_API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.user));
      toast.success("Profile Picture Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile Picture");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function removeProfilePicture(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PUT",
        REMOVE_DISPLAY_PICTURE_API,
        {},
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("REMOVE_PROFILE_API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const userImage = response.data?.user?.image
        ? response.data?.user?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data?.user?.firstName} ${response.data?.user?.lastName}`;
      // console.log(userImage);

      dispatch(setUser({ ...response.data.user, image: userImage }));
      toast.success("Profile Picture Removed Successfully");
    } catch (error) {
      console.log("REMOVE_PROFILE_API ERROR............", error);
      toast.error("Could Not Remove Profile Picture");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    // console.log("TOKEN BEING SENT:", token);
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

      console.log("UPDATE_PROFILE_API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const userImage = response.data?.user?.image
        ? response.data?.user?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data?.user?.firstName} ${response.data?.user?.lastName}`;
      // console.log(userImage);

      dispatch(setUser({ ...response?.data?.user, image: userImage }));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function updatePassword(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    // console.log("TOKEN BEING SENT:", token);
    try {
      const response = await apiConnector(
        "POST",
        CHANGE_PASSWORD_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("UPDATE_PASSWORD_API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PASSWORD_API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    // console.log("TOKEN BEING SENT:", token);
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_PROFILE_API,
        {},
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("DELETE ACCOUNT_API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Account Deleted Successfully");
      dispatch(logoutFn(navigate));
    } catch (error) {
      console.log("DELETE ACCOUNT_API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
