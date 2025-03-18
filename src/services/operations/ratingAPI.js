import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { ratingsEndpoints } from "../apis";

const { REVIEWS_DETAILS_API } = ratingsEndpoints;

export async function getRatings() {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", REVIEWS_DETAILS_API);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("ALL_RATINGS API RESPONSE............", response);
    result = response?.data?.ratings;
  } catch (error) {
    console.log("ALL_RATINGS API ERROR............", error);
    toast.error("Could Not Get Ratings");
  }
  toast.dismiss(toastId);
  return result;
}
