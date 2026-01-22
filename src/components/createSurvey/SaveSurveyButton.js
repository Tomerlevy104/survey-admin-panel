import "./SaveSurveyButton.css";
import Icon from "../Icon";

export default function SaveSurveyButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      className="save-survey-button"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon name="save" />
      <span className="save-survey-button__text">Save Survey</span>
    </button>
  );
}
