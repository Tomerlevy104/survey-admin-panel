import Icon from "../Icon";
import PrimaryButton from "../PrimaryButton";
import "./CreateSurveyHeader.css";
import SaveSurveyButton from "./SaveSurveyButton";

export default function CreateSurveyHeader({ onSave, saving }) {
  return (
    <header className="create-survey-header">
      <div className="create-survey-header__inner">
        <div className="create-survey-header__brand">
          <div className="create-survey-header__logo" aria-hidden="true">
            <Icon name="poll" />
          </div>
          <h2 className="create-survey-header__title">Smart Survey</h2>
        </div>

        <SaveSurveyButton onClick={onSave} disabled={saving}>
          <span>{saving ? "Saving..." : "Save Survey"}</span>
        </SaveSurveyButton>
      </div>
    </header>
  );
}
