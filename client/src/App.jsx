import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const user = useAuth();

  return (
    <Routes>
      <Route path="/" element={<div>App</div>} />
      <Route 
        path="/register" 
        element={user ? <Navigate to="/" /> : <Register />} 
      />
    </Routes>
  );
};

export default App;
