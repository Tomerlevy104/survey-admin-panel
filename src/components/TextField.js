import "./TextField.css";

/**
 * TextField
 */
export default function TextField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
}) {
  return (
    <div className="text-field">
      {label && <label className="text-field__label">{label}</label>}
      <input
        className="text-field__input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
