import Icon from "../Icon";
import TextField from "../TextField";
import "./ChoiceOptionsEditor.css";

export default function ChoiceOptionsEditor({ options, onChangeOptions }) {
  function updateOption(index, value) {
    const next = [...options];
    next[index] = value;
    onChangeOptions(next);
  }

  function removeOption(index) {
    const next = options.filter((_, i) => i !== index);
    onChangeOptions(next);
  }

  function addOption() {
    onChangeOptions([...(options ?? []), ""]);
  }

  return (
    <div className="choice-options-editor">
      {(options ?? []).map((opt, idx) => (
        <div key={idx} className="choice-options-editor__row">
          <Icon name="radio_button_unchecked" ariaHidden />
          <TextField
            label={null}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => updateOption(idx, e.target.value)}
          />
          <button type="button" onClick={() => removeOption(idx)}>
            <Icon name="close" ariaHidden />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addOption}
        className="choice-options-editor__add"
      >
        <Icon name="add" ariaHidden />
        <span>Add Option</span>
      </button>
    </div>
  );
}
