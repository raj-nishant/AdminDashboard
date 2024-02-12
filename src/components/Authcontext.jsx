import React, { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
