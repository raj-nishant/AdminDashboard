import React, { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        dispatch({ type: "LOGIN", payload: storedUser });
      } else {
        dispatch({ type: "SET_LOADING_FALSE" });
      }
    };

    fetchUser();
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
