import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import CreateSurveyHeader from "../components/createSurvey/CreateSurveyHeader";
import QuestionCard from "../components/createSurvey/QuestionCard";
import Icon from "../components/Icon";
import "./CreateSurveyPage.css";
import { createSurvey } from "../api/surveyApi";

export default function CreateSurveyPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: crypto.randomUUID(),
      type: "SINGLE_CHOICE",
      prompt: "",
      options: ["", ""],
    },
    { id: crypto.randomUUID(), type: "TEXT", prompt: "", options: [] },
  ]);

  ////////////////////////////////////////////////////////////////////////////////////////
  // Add Question
  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: "TEXT", prompt: "", options: [] },
    ]);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // Update Question
  function updateQuestion(id, nextQuestion) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? nextQuestion : q)));
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Delete Question
  function deleteQuestion(id) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }
  //////////////////////////////////////////////////////////////////////////////////////
  // Save Survey
  async function handleSave() {
    // API call
    setSaveError(null);
    setSaving(true);
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        setSaveError("User not authenticated");
        return;
      }
      const surveyPayload = buildSurveyPayload();
      if (!surveyPayload.title) {
        setSaveError("Survey title is required");
        return;
      }
      if (surveyPayload.questions.length === 0) {
        setSaveError("At least one question is required");
        return;
      }
      if (surveyPayload.questions.some((q) => !q.prompt)) {
        setSaveError("All questions must have a prompt");
        return;
      }
      const savedSurvey = await createSurvey(jwt, surveyPayload);
      console.log("Survey created:", savedSurvey);
      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      const errMsg = error.message || "Failed to save survey";
      setSaveError(errMsg);
    } finally {
      setSaving(false);
    }
    console.log("SAVE survey:", { title, questions });
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // Build the payload to send to the API
  function buildSurveyPayload() {
    return {
      title: title.trim(),
      questions: questions.map((que) => ({
        id: null,
        type: que.type,
        prompt: que.prompt.trim(),
        options:
          que.type === "SINGLE_CHOICE"
            ? (que.options ?? []).map((o) => o.trim()).filter(Boolean)
            : [],
      })),
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="create-survey-page">
      <CreateSurveyHeader onSave={handleSave} saving={saving} />

      <main className="create-survey-main">
        <section className="create-survey-card">
          <h1>Create New Survey</h1>
          <p>Define your survey title and start adding your questions below.</p>
          {saveError && <div className="create-survey-error">{saveError}</div>}

          <TextField
            label="Survey Title"
            placeholder="e.g., Annual Customer Satisfaction 2026"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>

        <section className="create-survey-questions">
          <div className="create-survey-questions__top">
            <h3>Questions ({questions.length})</h3>
          </div>

          <div className="create-survey-questions__list">
            {questions.map((q, idx) => (
              <QuestionCard
                key={q.id}
                index={idx}
                question={q}
                onChange={(next) => updateQuestion(q.id, next)}
                onDelete={() => deleteQuestion(q.id)}
              />
            ))}
          </div>

          <button
            type="button"
            className="add-question-button"
            onClick={addQuestion}
          >
            <Icon name="add" ariaHidden />
            <span>ADD NEW QUESTION</span>
          </button>
        </section>
      </main>
    </div>
  );
}
