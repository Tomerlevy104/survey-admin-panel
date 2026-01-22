import "./QuestionTypeSelect.css";

export default function QuestionTypeSelect({ value, onChange }) {
  return (
    <div className="question-type-select">
      <select
        className="question-type-select__select"
        value={value}
        onChange={onChange}
      >
        <option value="TEXT">Text</option>
        <option value="SINGLE_CHOICE">Single Choice</option>
      </select>
    </div>
  );
}
