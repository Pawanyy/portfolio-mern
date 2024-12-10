import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  tokenDetails: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.tokenDetails = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.tokenDetails = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
