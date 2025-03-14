import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import { useAuth } from "./contexts/AuthContext";
import Hero from "./Views/Hero/Hero";
import "./App.css";

const App = () => {
  const user = useAuth();

  return (
    <main>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </main>
  );
};

export default App;
