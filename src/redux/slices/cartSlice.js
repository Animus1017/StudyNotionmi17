import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalPrice: localStorage.getItem("totalPrice")
    ? JSON.parse(localStorage.getItem("totalPrice"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);
      if (index >= 0) {
        toast.error("Course already in cart");
        return;
      }
      state.cart.push(course);
      state.totalPrice += course.coursePrice;
      state.totalItems++;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      toast.success("Course added to cart");
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);
      if (index >= 0) {
        state.totalPrice -= state.cart[index].coursePrice;
        state.totalItems--;
        state.cart.splice(index, 1);
        if (state.totalItems === 0) {
          localStorage.removeItem("cart");
          localStorage.removeItem("totalPrice");
          localStorage.removeItem("totalItems");
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        toast.success("Course removed from cart");
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
      state.totalItems = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("totalItems");
    },
    getTotalItems(state, value) {
      state.totalItems = value.payload;
    },
  },
});

export const { getTotalItems, addToCart, removeFromCart, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
