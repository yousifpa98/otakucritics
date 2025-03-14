import React, { useState } from "react";
import UserIcon from "../assets/icons/user.svg?react";
import { useAuth } from "../contexts/AuthContext";
import "./ProfileMenu.css";
import { Link } from "react-router";
import ThemeToggle from  "./ThemeToggle"

const ProfileMenu = () => {
  const { user, login, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleMenu = () => setOpen(!open);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.username, formData.password);
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-menu">
      <button className="profile-button" onClick={toggleMenu}>
        <UserIcon className="user-icon" />
      </button>

      {open && (
        <div className="dropdown">
          <ThemeToggle />
          {user ? (
            <>
              <p className="welcome">Welcome, {user.username}!</p>
              <ul className="profile-nav">
                <li className="profile-nav-item">
                  <Link to={"/watchlist"}>Watchlist</Link>
                </li>
                <li className="profile-nav-item">
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li className="profile-nav-item">
                  <Link to="/profile/settings">Settings</Link>
                </li>
              </ul>
              <button className="menu-item logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="login-form">
              {error && <p className="error-message">{error}</p>}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="menu-item login"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="register-text">
                No account yet? <a href="/register">Sign up</a>
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
