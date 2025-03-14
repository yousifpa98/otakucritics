import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./Register.css";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newsletterOptIn: true, // Tricky: Default ist TRUE, um Mails senden zu dürfen
    dsgvoAccepted: false, // Muss explizit aktiviert werden
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.dsgvoAccepted) {
      setError("You must accept the privacy policy to register.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/users/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        newsletterOptIn: formData.newsletterOptIn, // Speichern
      });

      await login(formData.username, formData.password);
      navigate("/"); // Nach erfolgreicher Registrierung weiterleiten
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="register-form">
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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

        {/* DSGVO Opt-in (Pflicht) */}
        <label className="checkbox-container">
          <input
            type="checkbox"
            name="dsgvoAccepted"
            checked={formData.dsgvoAccepted}
            onChange={handleChange}
            required
          />
          I accept the <a href="/privacy-policy">privacy policy</a>.
        </label>

        {/* Newsletter Opt-in (Tricky) */}
        <label className="checkbox-container">
          <input
            type="checkbox"
            name="newsletterOptIn"
            checked={formData.newsletterOptIn}
            onChange={handleChange}
          />
          I do <b> not </b> want to receive emails and updates.
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>
      <p className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Register;
