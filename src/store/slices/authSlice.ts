import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types/auth";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false, // Track if auth state has been rehydrated
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | any>) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isInitialized = true;
    },
    logoutUser: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
        state.isInitialized = action.payload;
    },
    clearError: (state) => {
        state.error = null;
    }
  },
});


export const { setUser, logoutUser, clearError, setInitialized } = authSlice.actions;
export default authSlice.reducer;
