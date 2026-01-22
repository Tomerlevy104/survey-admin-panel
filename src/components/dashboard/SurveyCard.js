import Icon from "../Icon";
import "./SurveyCard.css";
import { useState } from "react";
import { fetchSurveyResponses } from "../../api/surveyApi";
import { useEffect } from "react";

export default function SurveyCard({ survey, onEdit, onDelete, onOpen }) {
  const [responsesCount, setResponsesCount] = useState(null);
  const createdDate = survey.createdDate
    ? new Date(survey.createdDate).toLocaleDateString("en-GB")
    : "—";
  ///////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    let isMounted = true;

    async function loadResponsesCount() {
      try {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          if (isMounted) {
            setResponsesCount(0);
          }
          return;
        }

        const data = await fetchSurveyResponses(jwt, survey.id);
        const count = Array.isArray(data) ? data.length : 0;

        if (isMounted) setResponsesCount(count);
      } catch (err) {
        console.error("Failed to load survey responses:", err);
        if (isMounted) setResponsesCount(0);
      }
    }

    loadResponsesCount();

    return () => {
      isMounted = false;
    };
  }, [survey.id]);
  ///////////////////////////////////////////////////////////////////////////////////////

  return (
    <article
      className="survey-card"
      onClick={() => onOpen?.(survey)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen?.(survey);
      }}
    >
      <div className="survey-card__body">
        <h3 className="survey-card__title">{survey.title}</h3>

        <div className="survey-card__meta">
          <div className="survey-card__meta-row">
            <Icon name="calendar_month" className="survey-card__meta-icon" />
            <span>Created at: {createdDate}</span>
          </div>

          <div className="survey-card__meta-row">
            <Icon name="groups" className="survey-card__meta-icon" />
            <span>
              {responsesCount === null
                ? "…"
                : `${responsesCount.toLocaleString()} Responses`}
            </span>
          </div>
        </div>
      </div>

      <div className="survey-card__actions">
        <button
          type="button"
          className="survey-card__edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Icon name="edit" />
          <span>Edit</span>
        </button>

        <button
          type="button"
          className="survey-card__delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Icon name="delete" />
        </button>
      </div>
    </article>
  );
}
