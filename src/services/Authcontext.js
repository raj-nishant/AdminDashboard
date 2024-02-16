import { createContext, useContext, useEffect, useReducer } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";

// Initial state
const initialState = {
  user: null,
  loading: true, // Add loading state to track asynchronous loading
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    logoutUser(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

// Action creators
export const { loginUser, logoutUser } = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;

// Create Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// AuthContext
const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(loginUser(storedUser)); // Dispatch loginUser action if user data exists in localStorage
    }
  }, []);

  const login = (userData) => {
    // Store user data in Redux
    dispatch(loginUser(userData));
    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    // Clear user data from Redux
    dispatch(logoutUser());
    // Clear user data from localStorage
    localStorage.removeItem("user");
  };

  const value = { user: state.user, login, logout };

  return React.createElement(Authcontext.Provider, { value }, children);
};

export function useAuth() {
  return useContext(Authcontext);
}

export default store;
