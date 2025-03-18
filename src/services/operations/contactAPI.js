import { toast } from "react-hot-toast";
import { setLoading } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { contactusEndpoint } from "../apis";
const { CONTACT_US_API } = contactusEndpoint;
export function sendMessage(
  firstName,
  lastName,
  email,
  phoneNo,
  countryCode,
  message
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CONTACT_US_API, {
        firstName,
        lastName,
        email,
        phoneNo,
        countryCode,
        message,
      });

      console.log("CONTACTUS RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Message Sent");
    } catch (error) {
      console.log("CONTACTUS ERROR............", error);
      toast.error("Failed To Send Message");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}
