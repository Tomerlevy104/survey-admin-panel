import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchSurveyResponses } from "../api/surveyApi";
import TextField from "../components/TextField";
import Icon from "../components/Icon";
import "./SurveyResponsesPage.css";
import DashboardHeader from "../components/dashboard/DashboardHeader";

////////////////////////////////////////////////////////////////////////////////////
// Helper functions
function formatDateTime(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleString("en-GB");
}
////////////////////////////////////////////////////////////////////////////////////
// Normalize response object to have consistent fields
function normalizeResponse(resp) {
  const submittedAt =
    resp?.submittedAt || resp?.createdAt || resp?.createdDate || null;

  const answers = Array.isArray(resp?.answers) ? resp.answers : [];

  return { submittedAt, answers, __raw: resp };
}

////////////////////////////////////////////////////////////////////////////////////
export default function SurveyResponsesPage() {
  const navigate = useNavigate();
  const { surveyId } = useParams();
  const { state } = useLocation();

  const surveyTitle = state?.surveyTitle || "Survey Responses";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [responses, setResponses] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");

  ////////////////////////////////////////////////////////////////////////////////////
  // Fetch survey responses on mount or when surveyId changes
  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) throw new Error("Not authenticated. Please login again.");

        const data = await fetchSurveyResponses(jwt, surveyId);
        if (!alive) return;

        setResponses(Array.isArray(data) ? data : []);
        setPageIndex(0);
      } catch (e) {
        if (alive) setError(e.message || "Failed to load survey responses");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [surveyId]);

  ////////////////////////////////////////////////////////////////////////////////////
  const totalPages = responses.length;
  const currentRaw = totalPages ? responses[pageIndex] : null;
  const current = currentRaw ? normalizeResponse(currentRaw) : null;
  const submittedAtText = current ? formatDateTime(current.submittedAt) : null;
  const answers = current?.answers || [];

  const filteredAnswers = !search.trim()
    ? answers
    : answers.filter((a) => {
        const q = search.trim().toLowerCase();
        return (
          String(a?.questionText || a?.questionTitle || a?.question || "")
            .toLowerCase()
            .includes(q) ||
          String(a?.answerText || a?.answer || a?.value || "")
            .toLowerCase()
            .includes(q)
        );
      });
  ////////////////////////////////////////////////////////////////////////////////////
  // Pagination handlers
  function goPrev() {
    setPageIndex((p) => Math.max(0, p - 1));
  }
  ////////////////////////////////////////////////////////////////////////////////////
  // Pagination handlers
  function goNext() {
    setPageIndex((p) => Math.min(totalPages - 1, p + 1));
  }
  ////////////////////////////////////////////////////////////////////////////////////
  // handle Logout
  function handleLogout() {
    localStorage.removeItem("jwt");
    navigate("/login");
  }
  ////////////////////////////////////////////////////////////////////////////////////
  // Navigate to Create new survey
  function handleCreateSurvey() {
    // navigate to survey creation page
    console.log("Create New Survey");
    navigate("/surveys/new");
  }
  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="sr-page">
      <header className="sr-header">
        <DashboardHeader
          onCreate={handleCreateSurvey}
          onLogout={handleLogout}
        />

        <button type="button" className="sr-back" onClick={() => navigate(-1)}>
          <span className="sr-back__icon" aria-hidden="true">
            <Icon name="west" />
          </span>
          <span>Back to Surveys</span>
        </button>

        <h1 className="sr-title">{surveyTitle}</h1>

        <div className="sr-subrow">
          {loading ? (
            <span className="sr-muted">Loading…</span>
          ) : error ? (
            <span className="sr-error">{error}</span>
          ) : totalPages === 0 ? (
            <span className="sr-muted">No responses yet</span>
          ) : (
            <>
              <span className="sr-muted">
                Response {pageIndex + 1} of {totalPages}
              </span>
              {submittedAtText && <span className="sr-dot">•</span>}
              {submittedAtText && (
                <span className="sr-muted">Submitted: {submittedAtText}</span>
              )}
            </>
          )}
        </div>

        <div className="sr-search">
          <TextField
            label="Search in this response"
            placeholder="Type to filter answers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="sr-main">
        <div className="sr-content">
          {!loading && !error && current && (
            <>
              {filteredAnswers.length === 0 ? (
                <div className="sr-empty">
                  {search.trim()
                    ? "No matches for your search."
                    : "No answers found in this response."}
                </div>
              ) : (
                filteredAnswers.map((a, idx) => {
                  const answerText =
                    a?.answerText || a?.answer || a?.value || "";

                  return (
                    <div key={idx}>
                      <section className="sr-qblock">
                        <h3 className="sr-qnum">Question {idx + 1}</h3>

                        <div className="sr-answer">
                          <p className="sr-atext">
                            {String(answerText) || "—"}
                          </p>
                        </div>
                      </section>

                      {idx !== filteredAnswers.length - 1 && (
                        <div className="sr-divider" />
                      )}
                    </div>
                  );
                })
              )}

              {!answers.length && (
                <details className="sr-debug">
                  <summary>Show raw response (debug)</summary>
                  <pre>{JSON.stringify(current.__raw, null, 2)}</pre>
                </details>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="sr-footer">
        <div className="sr-footer__inner">
          <button
            type="button"
            className="sr-navbtn"
            onClick={goPrev}
            disabled={loading || totalPages === 0 || pageIndex === 0}
          >
            <span className="sr-navbtn__icon" aria-hidden="true">
              <Icon name="chevron_left" />
            </span>
          </button>

          <div className="sr-pager" aria-live="polite">
            <span className="sr-pager__current">
              Page {totalPages ? pageIndex + 1 : 0}
            </span>
            <span className="sr-pager__sep">of</span>
            <span className="sr-pager__total">{totalPages}</span>
          </div>

          <button
            type="button"
            className="sr-navbtn"
            onClick={goNext}
            disabled={
              loading || totalPages === 0 || pageIndex === totalPages - 1
            }
          >
            <span className="sr-navbtn__icon" aria-hidden="true">
              <Icon name="chevron_right" />
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
}
