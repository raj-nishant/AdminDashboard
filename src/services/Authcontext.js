import React, { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  user: null,
  loading: true, // Add loading state to track asynchronous loading
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        loading: false, // Set loading to false after user data is set
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        loading: false, // Set loading to false after logout
      };
    default:
      return state;
  }
};
const Authcontext = createContext();
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      // If user data exists, dispatch LOGIN action with stored user data
      dispatch({ type: "LOGIN", payload: storedUser });
    } else {
      // If no user data in localStorage, set loading to false
      dispatch({ type: "SET_LOADING_FALSE" });
    }
  }, []);

  const login = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const value = { user: state.user, login, logout };
  return React.createElement(Authcontext.Provider, { value }, children);
};
export function useAuth() {
  return useContext(Authcontext);
}
