import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import "./ThemeToggle.css"

const ThemeToggle = () => {
  const {theme, toggleTheme} = useTheme();
  return <button onClick={toggleTheme} className={`theme-toggle ${theme === "light" ? "" : "dark"}`}>
    <div className={`thumb ${theme === "light" ? "" : "dark"}`}></div>
  </button>;
};

export default ThemeToggle;
