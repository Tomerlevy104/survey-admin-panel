import "./StartNewSurveyCard.css";

export default function StartNewSurveyCard({ onClick }) {
  return (
    <button type="button" className="start-new-survey-card" onClick={onClick}>
      <div className="start-new-survey-card__icon" aria-hidden="true">
        +
      </div>
      <div className="start-new-survey-card__text">Start New Survey</div>
    </button>
  );
}
