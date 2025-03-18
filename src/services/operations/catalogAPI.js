import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

const { CATALOGPAGEDATA_API } = catalogData;

export async function fetchCatalogData(data) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
      categoryId: data,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("CATALOG_DATA API RESPONSE............", response);
    result = response?.data;
  } catch (error) {
    console.log("CATALOG_DATA API ERROR............", error);
    toast.error("Could Not Get Catalog Data");
  }
  toast.dismiss(toastId);
  return result;
}
