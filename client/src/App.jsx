import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import { useAuth } from "./contexts/AuthContext";
import Hero from "./Views/Hero/Hero";
import "./App.css";
import AnimeDisplayPage from "./Components/AnimeDisplayPage";

const App = () => {
  const user = useAuth();

  return (
    <main>
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* {console.log(user.user)} */}
        <Route
          path="/register"
          element={user.user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/search/:animeName" element={<AnimeDisplayPage />} />
      </Routes>
    </main>
  );
};

export default App;
