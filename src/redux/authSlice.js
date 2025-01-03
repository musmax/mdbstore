import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null, // Stores user details
  token: null, // Stores JWT token
  isAuthenticated: false, // Tracks if the user is logged in
  isLoading: false,
};

export const register = createAsyncThunk(
  "auth/sign-up",
  async (userObject, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://mdbstorebe-express.onrender.com/v1/auth/register",
        userObject
      );
      // console.log(response.data.success);
      return response.data.user;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.errors || "An error occurred",
      });
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { setCredentials, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
