import { useState } from "react";
import "./PasswordField.css";

/**
 * PasswordField
 * Password input with a show/hide toggle button.
 */
export default function PasswordField({
  label,
  placeholder = "",
  value,
  onChange,
}) {
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisibility() {
    setIsVisible((prev) => !prev);
  }

  return (
    <div className="password-field">
      {label && <label className="password-field__label">{label}</label>}

      <div className="password-field__wrapper">
        <input
          className="password-field__input"
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <button
          className="password-field__toggle"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
