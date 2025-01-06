import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Thunk for user registration
export const register = createAsyncThunk(
  "auth/register",
  async (userObject, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://mdbstorebe-express.onrender.com/v1/auth/register",
        userObject
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "An error occurred"
      );
    }
  }
);

// Thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async (userObject, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://mdbstorebe-express.onrender.com/v1/auth/login",
        userObject
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "An error occurred"
      );
    }
  }
);

// Single authSlice to handle both login and register
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle register actions
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user = action.payload;
        // state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle login actions
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;


export const authReducer = authSlice.reducer;

