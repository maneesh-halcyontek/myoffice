import { createContext, useContext } from "react";

// 1. Create the Context
const LoginContext = createContext();

// 2. Create a custom hook for easy access
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

export default LoginContext;
