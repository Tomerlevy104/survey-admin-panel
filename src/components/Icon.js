export default function Icon({ name, className = "", ariaHidden = true }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      aria-hidden={ariaHidden}
    >
      {name}
    </span>
  );
}
