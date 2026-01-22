import React, { useState } from "react";
import "./RegistrationPage.css";
import TextField from "../components/TextField";
import PasswordField from "../components/PasswordField";
import PrimaryButton from "../components/PrimaryButton";
import AuthFooter from "../components/AuthFooter";
import { register } from "../api/authApi";
import ApiKeyWindow from "../components/ApiKeyWindow";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState("");
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
      const response = await register(email.trim(), password, confirmPassword);
      // Handle successful registration
      if (response.jwt) {
        localStorage.setItem("jwt", response.jwt);
        console.log("Registration successful:", response);
        setApiKey(response.apiKey ?? "");
        console.log("Your API Key:", response.apiKey);
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      setError(msg);
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

    if (password !== confirmPassword) return "Passwords do not match.";

    return null;
  }

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-title">
          <h1>Create Your Account</h1>
        </div>
        <form className="registration-form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <TextField
            label="Email Address"
            type="text"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Field */}
          <PasswordField
            label="PASSWORD"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Confirm Password Field */}
          <PasswordField
            label="CONFIRM PASSWORD"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* Submit Button */}
          <div className="register-submit">
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </PrimaryButton>
          </div>
          {/* Error Message */}
          {error && <div className="registration-error">{error}</div>}
          {/* API Key Display */}
          {apiKey && (
            <ApiKeyWindow
              apiKey={apiKey}
              onClose={() => {
                setApiKey("");
                // Navigate to dashboard
                navigate("/dashboard");
              }}
            />
          )}

          <AuthFooter />
        </form>
      </div>
    </div>
  );
}
