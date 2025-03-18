import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../redux/slices/courseSlice";
import { resetCart } from "../../redux/slices/cartSlice";
const {
  COURSE_VERIFY_API,
  COURSE_PAYMENT_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
  GET_ALL_PAYMENTS_DATA,
} = studentEndpoints;
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}
export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay script failed to load");
      return;
    }
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: orderResponse.data.message.amount,
      currency: orderResponse.data.message.currency,
      name: "StudyNotion",
      description: "Thankyou for Purchasing the course",
      image: rzpLogo,
      order_id: orderResponse.data.message.id,
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.message.amount,
          token
        );
        verifyPayment(
          { ...response, amount: orderResponse.data.message.amount, courses },
          token,
          navigate,
          dispatch
        );
      },
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Payment Failed");
      console.log(response.error);
    });
  } catch (error) {
    console.log("COURSE_PAYMENT_API ERROR............", error);
    toast.error("Failed To Purchase Course");
  }
  toast.dismiss(toastId);
}
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("SEND_PAYMENT_SUCCESS_EMAIL_API ERROR............", error);
    toast.error("Failed To Send Payment Success Email");
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful,you are enrolled to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("COURSE_VERIFY_API ERROR............", error);
    toast.error("Failed To Verify Payment");
  }
  dispatch(setPaymentLoading(false));
  toast.dismiss(toastId);
}

export async function fetchPaymentsHistoryData(token) {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_PAYMENTS_DATA, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("GET_ALL_PAYMENTS_DATA API RESPONSE............", response);
    result = response.data?.payments;
  } catch (error) {
    console.log("GET_ALL_PAYMENTS_DATA API ERROR............", error);
    toast.error("Could Not Get Payment History");
  }
  return result;
}
