import "./CreateNewSurveyCard.css";
import Icon from "../Icon";

export default function CreateNewSurveyCard({ onClick }) {
  return (
    <button
      type="button"
      className="create-new-survey-button"
      onClick={onClick}
    >
      <Icon name="add" />
      <span className="create-new-survey-button__text">Create New Survey</span>
    </button>
  );
}
