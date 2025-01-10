import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
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

      console.log(response);

      const { tokens, encryptedUser } = response.data;

      // Save tokens and encrypted user in localStorage
      localStorage.setItem("accessToken", tokens.access.token);
      localStorage.setItem("refreshToken", tokens.refresh.token);
      localStorage.setItem("encryptedUser", encryptedUser);

      return {
        user: response.data.user,
        tokens: response.data.tokens,
      };
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
    restoreSession(state) {
      const token = localStorage.getItem("accessToken");
      const encryptedUser = localStorage.getItem("encryptedUser");

      if (token && encryptedUser) {
        state.token = token;
        state.user = JSON.parse(atob(encryptedUser.split('.')[1])); // Decode JWT payload
        state.isAuthenticated = true;
      }
    },
    logout(state) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("encryptedUser");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    }
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
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle login actions
      .addCase(login.pending, (state) => {
        console.log("Login pending...");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Login fulfilled:", action.payload);
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.token = action.payload.tokens.access.token;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Login rejected:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
      });

  },
});

export const { logout, restoreSession } = authSlice.actions;


export const authReducer = authSlice.reducer;

