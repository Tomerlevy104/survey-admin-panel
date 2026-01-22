import { useState } from "react";
import "./LoginPage.css";

import TextField from "../components/TextField";
import PasswordField from "../components/PasswordField";
import PrimaryButton from "../components/PrimaryButton";
import AuthFooter from "../components/AuthFooter";

import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

/**
 * LoginPage
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);

    try {
      const response = await login(email, password);
      // Handle successful login
      if (response.jwt) {
        localStorage.setItem("jwt", response.jwt);
        console.log("Login successful:", response);
        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  // Validation fields
  function validateFields() {
    const emailTrimmed = email.trim();

    if (!emailTrimmed) return "Please enter your email.";

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed);
    if (!emailOk) return "Please enter a valid email.";

    if (password.length < 6) return "Password must be at least 6 characters.";

    return null;
  }

  const handleCreateAnAccount = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-title">
          <h1>Welcome To Smart Survey Panel</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="text"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="login-password">
            <PasswordField
              label="Password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-submit">
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </PrimaryButton>
          </div>
        </form>

        <div className="login-bottom-text">
          <span>Don't have an account?</span>
          <button
            type="button"
            className="login-link"
            onClick={() => {
              // Navigate to registration page
              handleCreateAnAccount();
              console.log("Create account clicked");
            }}
          >
            Create an account
          </button>
        </div>
        {error && <div className="login-error">{error}</div>}

        <AuthFooter />
      </div>
    </div>
  );
}
