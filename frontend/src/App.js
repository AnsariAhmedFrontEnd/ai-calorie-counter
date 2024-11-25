import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LogMeal from "./components/LogMeal";
import Navbar from "./components/Navbar";
import LoginSignup from "./components/LoginSignup";
import { UserProvider } from "./authContext";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Navbar />
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/log-meal" />
              ) : (
                <LoginSignup onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/log-meal"
            element={isLoggedIn ? <LogMeal /> : <Navigate to="/" />}
          />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
