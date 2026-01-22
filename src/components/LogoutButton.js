import Icon from "./Icon";
import "./LogoutButton.css";

export default function LogoutButton({ onLogout }) {
  return (
    <button type="button" className="logout-button" onClick={onLogout}>
      <Icon name="logout" ariaHidden />
      <span>Logout</span>
    </button>
  );
}
