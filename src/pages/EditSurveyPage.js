import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateSurveyPage.css"; // Same style like Create survey page
import CreateSurveyHeader from "../components/createSurvey/CreateSurveyHeader";
import QuestionCard from "../components/createSurvey/QuestionCard";
import Icon from "../components/Icon";
import { fetchSurveyById, updateSurvey } from "../api/surveyApi";
import TextField from "../components/TextField";

export default function EditSurveyPage() {
  const { surveyId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  ///////////////////////////////////////////////////////////////////////////////////////
  // Load existing survey
  useEffect(() => {
    async function load() {
      setError(null);
      setLoading(true);

      try {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) throw new Error("Not authenticated. Please login again.");

        const survey = await fetchSurveyById(jwt, surveyId);

        setTitle(survey.title ?? "");
        setQuestions(
          (survey.questions ?? []).map((q) => ({
            id: q.id ?? crypto.randomUUID(),
            type: q.type ?? "TEXT",
            prompt: q.prompt ?? "",
            options: q.options ?? [],
          })),
        );
      } catch (e) {
        setError(e?.message || "Failed to load survey");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [surveyId]);

  ///////////////////////////////////////////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////////////////////////////
  // Delete Question
  function deleteQuestion(id) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // Build Survey Payload
  function buildSurveyPayload() {
    return {
      id: surveyId,
      title: title.trim(),
      questions: questions.map((q) => ({
        id: q.id,
        type: q.type,
        prompt: q.prompt.trim(),
        options:
          q.type === "SINGLE_CHOICE"
            ? (q.options ?? []).map((o) => o.trim()).filter(Boolean)
            : [],
      })),
    };
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // Save Survey
  async function handleSave() {
    setError(null);

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setError("Not authenticated. Please login again.");
      return;
    }

    const payload = buildSurveyPayload();

    if (!payload.title) {
      setError("Please enter a survey title.");
      return;
    }
    if (payload.questions.length === 0) {
      setError("Please add at least one question.");
      return;
    }
    if (payload.questions.some((q) => !q.prompt)) {
      setError("Please fill all question prompts.");
      return;
    }

    setSaving(true);
    try {
      const updated = await updateSurvey(jwt, surveyId, payload);
      console.log("Updated survey:", updated);
      navigate("/dashboard");
    } catch (e) {
      setError(e?.message || "Failed to update survey");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="create-survey-page">
        <CreateSurveyHeader onSave={() => {}} saving={true} />
        <main className="create-survey-main">
          <section className="create-survey-card">
            <h1>Loading...</h1>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="create-survey-page">
      <CreateSurveyHeader onSave={handleSave} saving={saving} />

      <main className="create-survey-main">
        <section className="create-survey-card">
          <h1>Edit Survey</h1>
          <p>Update the survey title and questions, then save your changes.</p>

          <TextField
            label="Survey Title"
            placeholder="e.g., Annual Customer Satisfaction 2024"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {error && <div className="create-survey-error">{error}</div>}
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
