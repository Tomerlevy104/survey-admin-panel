import "./PrimaryButton.css";

/**
 * Primary Button
 */
export default function PrimaryButton({
  children,
  type = "button",
  disabled = false,
  onClick,
}) {
  return (
    <button
      className="primary-button"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
