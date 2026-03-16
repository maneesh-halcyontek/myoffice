import { createContext, useContext } from "react";

// 1. Create the Context
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  // 2. Create state to hold login status and user info
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 3. Function to log in (for demo purposes, it just sets a dummy user)
  const login = (username) => {
    setIsLoggedIn(true);
    setUser({ name: username });
  };

  // 4. Function to log out
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // 5. Provide the context value to children
  return (
    <LoginContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook for easy access to the LoginContext
const useLogin = () => useContext(LoginContext);

export { LoginProvider, useLogin };
