import { createSlice } from "@reduxjs/toolkit";
import { loadUserFromCookie, login } from "../../services/authService";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.data = null;

      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(loadUserFromCookie.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
