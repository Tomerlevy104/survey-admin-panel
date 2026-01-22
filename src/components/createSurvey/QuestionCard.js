import Icon from "../Icon";
import TextField from "../TextField";
import QuestionTypeSelect from "./QuestionTypeSelect";
import ChoiceOptionsEditor from "./ChoiceOptionsEditor";
import "./QuestionCard.css";

export default function QuestionCard({ index, question, onChange, onDelete }) {
  const isChoice = question.type === "SINGLE_CHOICE";

  function update(patch) {
    onChange({ ...question, ...patch });
  }

  return (
    <div className="question-card">
      <div className="question-card__left">
        <Icon name="drag_indicator" ariaHidden />
        <span className="question-card__number">Q{index + 1}</span>
      </div>

      <div className="question-card__main">
        <div className="question-card__top">
          <div className="question-card__prompt">
            <TextField
              label={null}
              placeholder="Question prompt"
              value={question.prompt}
              onChange={(e) => update({ prompt: e.target.value })}
            />
          </div>

          <QuestionTypeSelect
            value={question.type}
            onChange={(e) => {
              const nextType = e.target.value;

              // if switching to TEXT, clear options
              if (nextType === "TEXT") {
                update({ type: nextType, options: [] });
              } else {
                // switching to SINGLE_CHOICE - ensure at least 2 options
                update({
                  type: nextType,
                  options: question.options?.length
                    ? question.options
                    : ["", ""],
                });
              }
            }}
          />
        </div>
        {isChoice ? (
          <ChoiceOptionsEditor
            options={question.options ?? []}
            onChangeOptions={(opts) => update({ options: opts })}
          />
        ) : (
          <div className="question-card__text-preview">
            Respondents will see a text box here.
          </div>
        )}
      </div>

      <button
        type="button"
        className="question-card__delete"
        onClick={onDelete}
      >
        <Icon name="delete" ariaHidden />
      </button>
    </div>
  );
}
