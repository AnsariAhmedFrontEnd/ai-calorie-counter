import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from 'jwt-decode';

// Create User Context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({ userId: decodedToken.id });
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const logout = () => {
    // Clear token from cookie and state
    document.cookie = "token=; max-age=0"; // Expire the cookie immediately
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
